/* Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

"use strict";

var CAM = {};

/**
 * The core process engine.
 *
 */
(function(CAM) {

  var ExecutionException = (function () {

    function ExecutionException(message, activityExecution) {
      this.message = message;
      this.activityExecution = activityExecution;
      throw message;
    }

    return ExecutionException;
  })(); 

  /** 
   * the activity types to be used by the process engine.
   * An activity type realizes the process language specific 
   * behavior of an activity.
   * 
   */
  var activityTypes = { };

  var LISTENER_START = "start";
  var LISTENER_END = "end";
  var LISTENER_TAKE = "take";

  // static utility functions ////////////////////////////////////

  var getActivitiesByType = function(activityDefinition, type, recursive) {
    var baseElements = [];
    for (var i = 0; i < activityDefinition.baseElements.length; i++) { 
      var childActivity = activityDefinition.baseElements[i];
      if(!!childActivity.type && childActivity.type == type){
        baseElements.push(childActivity);
        if(recursive) {
          baseElements = baseElements.concat(getActivitiesByType(childActivity, type, recursive));
        }
      }        
    }
    return baseElements;
  };

  var getActivityById = function(activityDefinition, id) {
    for (var i = 0; i < activityDefinition.baseElements.length; i++) { 
      var chidActivity = activityDefinition.baseElements[i];
      if(!!chidActivity.id && chidActivity.id == id){
        return chidActivity;
      }        
    }
    return null;
  };

  var getActivityType = function(activityDefinition) {
    var type = activityDefinition.type;
    if(!!type) {
      return activityTypes[type];
    } else {
      return null;
    }      
  };

  var getSequenceFlows = function(activityDefinition, scopeActivity) {
    var result = [];
    if(!!activityDefinition.outgoing) {
      var outgoingSequenceFlowIds = activityDefinition.outgoing;
      
      for (var i = 0; i < outgoingSequenceFlowIds.length; i++) { 
        var sequenceFlowId = outgoingSequenceFlowIds[i];
        result.push(getActivityById(scopeActivity, sequenceFlowId));      
      }
    }

    return result;
  };


  ///////////////////////////////////////////////////////////////
  
  var ActivityExecution = (function () {

    // constructor
    function ActivityExecution(activityDefinition, parentExecution) { 

      if(!activityDefinition) {
        throw new ExecutionException("Activity definition cannot be null", this);
      }
          
      this.activityDefinition = activityDefinition;    
      // a list of child activity executions
      this.activityExecutions = [];
      // indicates whether the execution has been ended
      this.isEnded = false;
      // the parent execution
      this.parentExecution = parentExecution;   
      // the variables of this execution
      this.variables = {};  

      this.startDate = null; 
      this.endDate = null; 
    }

    ActivityExecution.prototype.bindVariableScope = function(scope) {
      if(!!this.parentExecution) {
        this.parentExecution.bindVariableScope(scope);
      }
      var variables = this.variables;
      for(var varName in variables) {
        scope[varName] = variables[varName];
      }
    }

    ActivityExecution.prototype.executeActivities = function(activities) {
      for (var i = 0; i < activities.length; i++) {
        this.executeActivity(activities[i]);        
      }; 
    };

    ActivityExecution.prototype.executeActivity = function(activity, sequenceFlow) {          
      var childExecutor = new ActivityExecution(activity, this);                 
      this.activityExecutions.push(childExecutor);
       if(!!sequenceFlow) {
        childExecutor.incomingSequenceFlowId = sequenceFlow.id; 
      }
      childExecutor.start();
    };

    ActivityExecution.prototype.invokeListeners = function(type, sequenceFlow) {      
      var listeners = this.activityDefinition.listeners;
      if(!!listeners) {
        for(var i = 0; i < listeners.length; i++) {
          var listener = listeners[i];
          if(!!listener[type]) {
            listener[type](this, sequenceFlow);
          }
        }
      }
    };
   
    ActivityExecution.prototype.start = function() {   
      this.startDate = new Date();

      // invoke listeners on activity start
      this.invokeListeners(LISTENER_START);  

      // if the activity is async, we do not execute it right away 
      // but simpley return. Execution can be continued using the 
      // doContinue() function
      if(!!this.activityDefinition.asyncCallback) {
        this.activityDefinition.asyncCallback(this);
      } else {
        this.doContinue();
      }
    };

    ActivityExecution.prototype.doContinue = function() {
   
      // execute activity type
      var activityType = getActivityType(this.activityDefinition);
      activityType.execute(this);      
    };

    ActivityExecution.prototype.end = function(notifyParent) {
      this.isEnded = true;
      this.endDate = new Date();

      // invoke listeners on activity end
      this.invokeListeners(LISTENER_END);      
      
      if(!!this.parentExecution) {
        // remove from parent
        var parent = this.parentExecution;
        // notify parent
        if(notifyParent) {
          parent.hasEnded(this);   
        }        
      }   
    };

    ActivityExecution.prototype.takeAll = function(sequenceFlows) {
      for(var i = 0; i < sequenceFlows.length; i++) {
        this.take(sequenceFlows[i]);
      }
    };

    ActivityExecution.prototype.take = function(sequenceFlow) {
      var toId = sequenceFlow.targetRef;
      var toActivity = getActivityById(this.parentExecution.activityDefinition, toId);
      if(!toActivity) {
        throw new ExecutionException("cannot find activity with id '"+toId+"'");
      }      
      // end this activity
      this.end(false);

      // invoke listeners on sequence flow take      
      this.invokeListeners(LISTENER_TAKE, sequenceFlow);     

      // have the parent execute the next activity
      this.parentExecution.executeActivity(toActivity, sequenceFlow);
    };

    ActivityExecution.prototype.signal = function() {
      if(this.isEnded) {
        throw new ExecutionException("cannot signal an ended activity instance", this);
      }
      var type = getActivityType(this.activityDefinition);      
      if(!!type.signal) {
        type.signal(this);
      } else {
        this.end();
      }
    };

    /**
     * called by the child activity executors when they are ended
     */
    ActivityExecution.prototype.hasEnded = function(activityExecution) {
      var allEnded = true;
      for(var i; i < this.activityExecutions.length; i++) {
        allEnded &= this.activityExecutions[i].isEnded;
      }

      if(allEnded) {
        var activityType = getActivityType(this.activityDefinition);
        if(!!activityType.allActivitiesEnded) {
          activityType.allActivitiesEnded(this);
        } else {
          this.end();
        }
      }
    };

    /**
     * an activity instance is a java script object that holds the state of an 
     * ActivityExecution. It can be regarded as the serialized representation
     * of an execution tree. 
     */
    ActivityExecution.prototype.getActivityInstance = function() {      
      var activityInstance = {
        "activityId" : this.activityDefinition.id,
        "isEnded" : this.isEnded,
        "startDate" : this.startDate,
        "endDate" : this.endDate,
      }
      if(this.activityExecutions.length > 0) {
        activityInstance["activities"] = [];
        for(var i = 0; i < this.activityExecutions.length; i++) {
          activityInstance.activities.push(this.activityExecutions[i].getActivityInstance());
        }  
      }      
      return activityInstance;
    };

    return ActivityExecution;
  })();


  // export public APIs 
  CAM.ActivityExecution = ActivityExecution;
  CAM.ExecutionException = ExecutionException;
  CAM.activityTypes = activityTypes;
  CAM.getActivitiesByType = getActivitiesByType;
  CAM.getActivityById = getActivityById;
  CAM.getActivityType = getActivityType;
  CAM.getSequenceFlows = getSequenceFlows;

  CAM.LISTENER_START = LISTENER_START;
  CAM.LISTENER_END = LISTENER_END;
  CAM.LISTENER_TAKE = LISTENER_TAKE;

})(CAM);


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////

/**
 * The BPMN 2.0 activity type module.
 *
 * This module provides the BPMN 2.0 specific runtime behavior
 */
(function(CAM) {

  // variables & conditions //////////////////////////////////////////

  var VariableScope = (function () {

    function VariableScope(activityExecution) {
      activityExecution.bindVariableScope(this);      
    };

    VariableScope.prototype.evaluateCondition = function(condition) {            
      return eval(condition);
    };

    return VariableScope;
  })(); 

  function evaluateCondition(condition, activityExecution) {
    return new VariableScope(activityExecution).evaluateCondition(condition);    
  }

  // the default outgoing behavior for BPMN 2.0 activities //////////

  function leave(activityExecution) {

    // SEPC p.427 §13.2.1
    // Multiple outgoing Sequence Flows behaves as a parallel split. 
    // Multiple outgoing Sequence Flows with conditions behaves as an inclusive split. 
    // A mix of multiple outgoing Sequence Flows with and without conditions is considered as a combination of a parallel and an inclusive split
    
    var sequenceFlowsToTake = [];
    var availableSequenceFlows = CAM.getSequenceFlows(activityExecution.activityDefinition, 
                                                  activityExecution.parentExecution.activityDefinition);
    var defaultFlowId = activityExecution.activityDefinition["default"];

    var defaultFlow = null;
    var noConditionalFlowActivated = true;    
    
    for(var i =0; i<availableSequenceFlows.length; i++) {
      var sequenceFlow = availableSequenceFlows[i];

      if(!!defaultFlowId && defaultFlowId == sequenceFlow.id) {
        defaultFlow = sequenceFlow;

      } else if(!sequenceFlow.condition) {
        sequenceFlowsToTake.push(sequenceFlow);
        
      } else if(evaluateCondition(sequenceFlow.condition, activityExecution)) {
        sequenceFlowsToTake.push(sequenceFlow);
        noConditionalFlowActivated = false;
      }
      
    }
    
    // the default flow is only activated if all conditional flows are false
    if(noConditionalFlowActivated && !!defaultFlow) {
      sequenceFlowsToTake.push(defaultFlow);
    }
    
    activityExecution.takeAll(sequenceFlowsToTake);
  }

  // actual activity types //////////////////////////////////////////

  var process = {
    "execute" : function(activityExecution) {
  
      // find start events        
      var startEvents = CAM.getActivitiesByType(activityExecution.activityDefinition, "startEvent");
      
      if(startEvents.length == 0) {
        throw "process must have at least one start event";
      }
      
      // activate all start events
      activityExecution.executeActivities(startEvents);        
    }      
  };

  var startEvent = {
    "execute" : function(activityExecution) {
      leave(activityExecution);
    }
  };

  var intermediateThrowEvent = {
    "execute" : function(activityExecution) {
      leave(activityExecution);
    }
  };

  var endEvent = {
    "execute" : function(activityExecution) {
      activityExecution.end(true);
    }
  };

  var task = {
    "execute" : function(activityExecution) {
      leave(activityExecution);
    }
  };

  var userTask = {
    "execute" : function(activityExecution) {
      // wait state
    },
    "signal" : function(activityExecution) {
      leave(activityExecution);
    }
  };

  var serviceTask = {
    "execute" : function(activityExecution) {
      leave(activityExecution);
    }
  };

  /**
   * implementation of the exclusive gateway
   */
  var exclusiveGateway = {
    "execute" : function(activityExecution) {
      var outgoingSequenceFlows = activityExecution.activityDefinition.sequenceFlows;

      var sequenceFlowToTake,
        defaultFlow;

      for(var i = 0; i<outgoingSequenceFlows.length; i++) {
        var sequenceFlow = outgoingSequenceFlows[i];
        if(!sequenceFlow.condition) {
          // we make sure at deploy time that there is only a single sequence flow without a condition
          defaultFlow = sequenceFlow;          
        } else if(evaluateCondition(sequenceFlow.condition, activityExecution)) {
          sequenceFlowToTake = sequenceFlow;
          break;
        }
      }

      if(!sequenceFlowToTake) {
        if(!defaultFlow) {
          throw "Cannot determine outgoing sequence flow for exclusive gateway '"+activityExecution.activityDefinition+"': " +
            "All conditions evaluate to false and a default sequence flow has not been specified."
        } else {
          sequenceFlowToTake = defaultFlow;
        }
      }

      activityExecution.take(sequenceFlowToTake);
    }
  };

  /**
   * implementation of the parallel gateway
   */
  var parallelGateway = {
    "execute" : function(activityExecution) {
      var outgoingSequenceFlows = CAM.getSequenceFlows(activityExecution.activityDefinition, 
                                                   activityExecution.parentExecution.activityDefinition);

      // join 
      var executionsToJoin = [];      
      var parent = activityExecution.parentExecution;
      for(var i=0; i<parent.activityExecutions.length; i++) {
        var sibling = parent.activityExecutions[i];
        if(sibling.activityDefinition == activityExecution.activityDefinition && !sibling.isEnded) {
          executionsToJoin.push(sibling);
        }
      }

      if(executionsToJoin.length == activityExecution.activityDefinition.cardinality) {
        // end all joined executions but this one,
        for(var i=0; i<executionsToJoin.length; i++) {
          var joinedExecution = executionsToJoin[i];
          if(joinedExecution != activityExecution) {
            joinedExecution.end(false);
          }
        }
        // continue with this execution
        activityExecution.takeAll(outgoingSequenceFlows);  
      }

    }
  };

  // register activity types
  CAM.activityTypes["startEvent"] = startEvent;
  CAM.activityTypes["intermediateThrowEvent"] = intermediateThrowEvent;
  CAM.activityTypes["endEvent"] = endEvent;
  CAM.activityTypes["exclusiveGateway"] = exclusiveGateway;
  CAM.activityTypes["task"] = task;
  CAM.activityTypes["userTask"] = userTask;
  CAM.activityTypes["serviceTask"] = serviceTask;
  CAM.activityTypes["process"] = process; 
  CAM.activityTypes["parallelGateway"] = parallelGateway;

})(CAM);




(function(CAM) {

  // XML namespaces
  var NS_BPMN_SEMANTIC = "http://www.omg.org/spec/BPMN/20100524/MODEL";
  var NS_BPMN_DIAGRAM_INTERCHANGE = "http://www.omg.org/spec/BPMN/20100524/DI";
  var NS_OMG_DC = "http://www.omg.org/spec/DD/20100524/DC";
  var NS_OMG_DI = "http://www.omg.org/spec/DD/20100524/DI";

  /** the parse listeners are callbacks that are invoked by the transformer
   * when activity definitions are created */
  var parseListeners = [];

  function getXmlObject(source) {
    // use the browser's DOM implemenation
    var xmlDoc;
    if (window.DOMParser) {
      var parser = new DOMParser();
      xmlDoc = parser.parseFromString(source,"text/xml");
    } else {
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
      xmlDoc.async=false;
      xmlDoc.loadXML(source);
    }
    return xmlDoc;
  }

  function Transformer () {
  }

  Transformer.prototype.parseListeners = parseListeners;

  Transformer.prototype.transform =  function(source) {

    var doc;
    if( source instanceof Document) {
      doc = source;
    } else {
      doc = getXmlObject(source);
    }

    var definitions = doc.getElementsByTagNameNS(NS_BPMN_SEMANTIC, "definitions");

    if(definitions.length == 0) {
      throw "A BPMN 2.0 XML file must contain at least one definitions element";
    }

    // the generated Elements
    var generatedElements = [];
    var isExecutable = false;
    var lastGeneratedId = 0;

    function createBpmnObject(element, scope, bpmnDiElementIndex) {

      var bpmnObject = {};

      if(!!scope) {
        // add it to the parent activity definition
        scope.baseElements.push(bpmnObject);
      }

      var attributes = element.attributes;

      // set the type
      bpmnObject.type = element.localName;

      // copy all attributes from the xml element to the json object
      for(var i = 0; attributes != null && i < attributes.length; i++) {
        var attribute = attributes[i];
        bpmnObject[attribute.nodeName] = attribute.nodeValue;
      }

      // TODO an we do this better?
      if (bpmnObject.type == "textAnnotation") {
        var text = element.getElementsByTagName("text")[0].firstChild.data;
        bpmnObject["text"] = text;
      }

      var bpmnDiObject = bpmnDiElementIndex[bpmnObject.id];
      if(!!bpmnDiObject) {
        bpmnObject.bpmndi = bpmnDiObject;
      }

      // generate ID if not present:
      if(!bpmnObject.id) {
        bpmnObject.id = bpmnObject.type + "_" + lastGeneratedId;
        lastGeneratedId++;
      }

      return bpmnObject;

    }

    /** creates an ActivityDefinition and adds it to the scope activity.
     * 'element' is a DOMElement
     * 'scope' is an ActivityDefinition
     */
    function createFlowElement(element, scope, sequenceFlows, bpmnDiElementIndex) {
      // the ActivityDefinition to be built

      var bpmnObject = createBpmnObject(element, scope, bpmnDiElementIndex);

      bpmnObject.outgoing = [];
      bpmnObject.listeners = [];
      bpmnObject.properties = {};

      var attributes = element.attributes;

      // set and validate sequenceFlows
      if(!!sequenceFlows) {
        var outgoingFlows = sequenceFlows[bpmnObject.id];
        if(!!outgoingFlows) {

          for(var i =0; i < outgoingFlows.length; i++) {
            bpmnObject.outgoing.push(outgoingFlows[i].id);
          }

          if(!!bpmnObject["default"] && isExecutable) {

            var conditionalFlowFound = false;

            for(var i =0; i < outgoingFlows.length; i++) {
              var sequenceFlow = outgoingFlows[i];

              if(!!sequenceFlow.condition) {

                if(bpmnObject.defaultFlowId == sequenceFlow.id) {
                  throw "Sequence flow with id '" + sequenceFlow.id + "' is configured to be the default flow but has a condition";
                } else {
                  // if a default flow is configured, there needs to be at least one conditional flow:
                  conditionalFlowFound = true;
                }
              }
            }

            if(!conditionalFlowFound) {
              throw "Activity with id '"+bpmnObject.id+"' declares default flow with id '" + bpmnObject["default"] + "' but has no conditional flows.";
            }
          }
        }
      }

      return bpmnObject;
    };

    function transformTask(element, scope, sequenceFlows, bpmnDiElementIndex) {
      // the ActivityDefinition to be built

      var taskObject = createFlowElement(element, scope, sequenceFlows, bpmnDiElementIndex);
      return taskObject;
    };

    function transformLaneSet(laneSetElement, scope, bpmnDiElementIndex) {
      // TODO not creating a seperate bpmn object for the lane set, adding lanes to the process directly
      var element = laneSetElement.firstChild;
      do {
        var elementType = element.nodeName;
        if (elementType == "lane") {
          createBpmnObject(element, scope, bpmnDiElementIndex);
        }
      }
      while (element = element.nextSibling)
    };


    function transformEvent(element, scope, sequenceFlows, bpmnDiElementIndex) {
      // the ActivityDefinition to be built

      var eventObject = createFlowElement(element, scope, sequenceFlows, bpmnDiElementIndex);
      eventObject.eventDefinitions = [];

      var child = element.firstChild;
      if(!!child) {
        do {
          if (!!child.nodeName) {
            if(child.nodeName.indexOf("EventDefinition") != -1) {
              eventObject.eventDefinitions.push({
                type : child.nodeName
              });
            }
          }
        } while(child = child.nextSibling);
      }

      return eventObject;
    };

    function createSequenceFlow(element, scopeActivity, bpmnDiElementIndex, index) {

      var sequenceFlow = createBpmnObject(element, scopeActivity, bpmnDiElementIndex);

      if(!!sequenceFlow.sourceRef) {
        // add to the index
        if(!index[sequenceFlow.sourceRef]) {
          index[sequenceFlow.sourceRef] = [];
        }
        index[sequenceFlow.sourceRef].push(sequenceFlow);
      }

      // extract conditions:
      var conditions = element.getElementsByTagNameNS(NS_BPMN_SEMANTIC, "conditionExpression");
      if(!!conditions && conditions.length >0) {
        var condition = conditions[0];
        sequenceFlow.condition = condition.textContent;
      }

      sequenceFlow.properties = {};

      return sequenceFlow;
    }

    /** loops over all <sequenceFlow .. /> elements and builds up a map of SequenceFlows
     */
    function createSequenceFlows(element, scopeActivity, bpmnDiElementIndex) {
      element = element.firstChild;

      var index = {};

      if (!element) {
        // no children
        return index;
      }

      do {
        if(element.nodeName == "sequenceFlow" || element.localName == "sequenceFlow") {
          createSequenceFlow(element, scopeActivity, bpmnDiElementIndex, index);
        }
      } while(element = element.nextSibling);

      return index;
    };

    /** transform <parallelGateway ... /> elements */
    function transformParallelGateway(element, scopeActivity, sequenceFlows, bpmnDiElementIndex) {
      var bpmnObject = createFlowElement(element, scopeActivity, sequenceFlows, bpmnDiElementIndex);

      // count incoming sequence flows
      var incomingFlows = 0;
      for (var prop in sequenceFlows) {
        var flows = sequenceFlows[prop];
        for(var i=0; i<flows.length; i++) {
          if(flows[i].targetRef == bpmnObject.id) {
            incomingFlows++;
          }
        }
      }
      // set the number of sequenceFlows to be joined in the parallel gateway
      bpmnObject.cardinality = incomingFlows;

      return bpmnObject;
    };

    /** transform <exclusiveGateway ... /> elements */
    function transformExclusiveGateway(element, scopeActivity, sequenceFlows, bpmnDiElementIndex) {
      var bpmnObject = createFlowElement(element, scopeActivity, null, bpmnDiElementIndex);
      var outgoingFlows = bpmnObject.sequenceFlows;
      var defaultFlowId = bpmnObject["default"];

      // custom handling of sequence flows for exclusive GW:
      if(!!sequenceFlows && isExecutable) {
        var outgoingFlows = sequenceFlows[bpmnObject.id];
        if(!!outgoingFlows) {
          bpmnObject.sequenceFlows = outgoingFlows;
        }
        if(!!outgoingFlows) {
          if(outgoingFlows.length == 1) {
            if(!!outgoingFlows[0].condition) {
              throw "If an exclusive Gateway has a single outgoing sequence flow, the sequence flow is not allowed to have a condition.";
            }
          } else if(outgoingFlows.length > 1) {
            for (var i = 0; i < outgoingFlows.length; i++) {
              var sequenceFlow = outgoingFlows[i];

              if (!!sequenceFlow.condition) {
                if (!!defaultFlowId && defaultFlowId == sequenceFlow.id) {
                  throw "Sequence flow with id '" + sequenceFlow.id + "' is configured to be the default flow but has a condition";
                }

              } else {
                if(defaultFlowId != sequenceFlow.id) {
                  throw "Sequence flow with id '" + sequenceFlow.id + "' has no conditions but it is not configured to be the default flow.";
                }
              }
            }
          }
        }
      }
      return bpmnObject;
    };

    /** invokes all parse listeners */
    function invokeParseListeners(bpmnObject, element, scopeActivity, scopeElement) {
      for(var i=0; i<parseListeners.length; i++) {
        var parseListener = parseListeners[i];
        parseListener(bpmnObject, element, scopeActivity, scopeElement);
      }
    }

    /** transforms all activites inside a scope into ActivityDefinitions */
    function transformScope(scopeElement, scopeActivity, bpmnDiElementIndex) {

      scopeActivity.baseElements = [];

      // first, transform the sequenceflows
      var sequenceFlows = createSequenceFlows(scopeElement, scopeActivity, bpmnDiElementIndex);

      var element = scopeElement.firstChild;

      if (!element) {
        // no children
        return;
      }

      do {

        var bpmnObject = null;

        var elementType = element.nodeName;

        var taskElementTypes = ["task", "manualTask", "serviceTask", "scriptTask", "userTask", "sendTask", "recieveTask", "businessRuleTask"];
        var eventElementTypes = ["startEvent", "endEvent",  "intermediateThrowEvent", "intermediateCatchEvent", "boundaryEvent"];

        if(elementType == "exclusiveGateway") {
          bpmnObject = transformExclusiveGateway(element, scopeActivity, sequenceFlows, bpmnDiElementIndex);

        } else if(elementType == "parallelGateway") {
          bpmnObject = transformParallelGateway(element, scopeActivity, sequenceFlows, bpmnDiElementIndex);

        } else if(taskElementTypes.indexOf(elementType) != -1) {
          bpmnObject = transformTask(element, scopeActivity, sequenceFlows, bpmnDiElementIndex);

        } else if(eventElementTypes.indexOf(elementType) != -1) {
          bpmnObject = transformEvent(element, scopeActivity, sequenceFlows, bpmnDiElementIndex);

        } else if(elementType == "laneSet") {
          bpmnObject = transformLaneSet(element, scopeActivity, bpmnDiElementIndex);

        } else if(elementType == "subProcess") {
          bpmnObject = transformElementsContainer(element, scopeActivity, sequenceFlows, bpmnDiElementIndex);

        } else if(!!element && element.nodeName != "sequenceFlow" && element.nodeType == 1 /* (nodeType=1 => element nodes only) */ ) {  
          bpmnObject = createBpmnObject(element, scopeActivity, bpmnDiElementIndex);

        }

        if(!!bpmnObject) {
          invokeParseListeners(bpmnObject, element, scopeActivity, scopeElement);
        }

      } while(element = element.nextSibling);
    };

    /** transforms a <process ... /> element into the corresponding Javascript Object */
    function transformProcess(processElement, bpmnDiElementIndex) {

      var bpmnObject = createFlowElement(processElement, null, null, bpmnDiElementIndex);

      if(!!bpmnObject.isExecutable) {
        isExecutable = bpmnObject.isExecutable=="true";
      } else {
        isExecutable = false;
      }

      // transform a scope
      transformScope(processElement, bpmnObject, bpmnDiElementIndex);

      generatedElements.push(bpmnObject);

      invokeParseListeners(bpmnObject, processElement);
    };

    function transformElementsContainer(containerElement, scope, sequenceFlows, bpmnDiElementIndex) {
      var containerObject = createFlowElement(containerElement, scope, sequenceFlows, bpmnDiElementIndex);

      // transform a scope
      transformScope(containerElement, containerObject, bpmnDiElementIndex);

      generatedElements.push(containerObject);

      invokeParseListeners(containerObject, containerElement);
    };

    function transformDiElementToObject(element, object) {
      var properties = {};

      properties["type"] = element.localName;
      for(var i=0; element.attributes != null && i<element.attributes.length; i++) {
        var attribute = element.attributes.item(i);
        if(attribute.nodeName != "bpmnElement") {
          properties[attribute.nodeName] = attribute.nodeValue;
        }
      }

      var childObjects = [];
      var childElement = element.firstChild;
      if(!!childElement) {
        do{
          transformDiElementToObject(childElement, childObjects);
        } while(childElement = childElement.nextSibling);
      }
      if(childObjects.length > 0) {
        properties['children'] = childObjects;
      }

      object.push(properties);
    }

    function createBpmnDiElementIndex(bpmnDiElement, bpmnDiElementIndex) {
      var bpmnElement;
      if(!!bpmnDiElement.namespaceURI && bpmnDiElement.namespaceURI == NS_BPMN_DIAGRAM_INTERCHANGE) {
        bpmnElement = bpmnDiElement.getAttribute("bpmnElement");
      }

      var element = bpmnDiElement.firstChild;
      if(!!element) {
        do {
          if(bpmnDiElement.localName == "BPMNDiagram" || bpmnDiElement.localName ==  "BPMNPlane") {
            createBpmnDiElementIndex(element, bpmnDiElementIndex);
          } else {
            var diElements = [];

            transformDiElementToObject(bpmnDiElement, diElements);

            bpmnDiElementIndex[bpmnElement] = diElements;
          }
        } while(element = element.nextSibling);
      }
    }

    /** transforms a <definitions ... /> element into a set of activity definitions */
    function transformDefinitions(definitionsElement) {

      // first, we walk the DI and index DI elements by their "bpmnElement"-id references.
      // this allows us to walk the semantic part second and for each element in the semantic-part
      // efficiently retreive the corresponding DI element
      var bpmnDiagrams = definitionsElement.getElementsByTagNameNS(NS_BPMN_DIAGRAM_INTERCHANGE, "BPMNDiagram");

      var bpmnDiElementIndex = {};
      for(var i=0; i < bpmnDiagrams.length; i++) {
        createBpmnDiElementIndex(bpmnDiagrams[i], bpmnDiElementIndex);
      }

      var participants = definitionsElement.getElementsByTagNameNS(NS_BPMN_SEMANTIC, "participant");
      var processNames = {};

      if (participants.length != 0) {
        for (var index = 0; index < participants.length; index++) {
          var participant = participants[index];
          var processRef = participant.getAttribute("processRef");
          var participantId = participants[index].getAttribute("id");
          // map participant shape to process shape for resolution in transform process
          bpmnDiElementIndex[processRef] = bpmnDiElementIndex[participantId];
          processNames[processRef] = participant.getAttribute("name");
        }
      }

      var processes = definitionsElement.getElementsByTagNameNS(NS_BPMN_SEMANTIC, "process");

      for(var i =0; i < processes.length; i++) {
        processes[i].setAttributeNS(NS_BPMN_SEMANTIC, "name" , processNames[processes[i].getAttribute("id")]);
        transformProcess(processes[i], bpmnDiElementIndex);
      }

    };

    transformDefinitions(definitions[0]);

    return generatedElements;
  };

 CAM.Transformer = Transformer;

})(CAM);