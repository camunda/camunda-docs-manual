'use strict';

// =========================================================================== //

angular
  .module('camundaorg', [
    'ng',
    'bootstrap',
    'ngResource',
    'camundaorg.controllers',
    'camundaorg.filters',
    'camundaorg.services',
    'camundaorg.directives',
    'camundaorg.pages' ]);

/** ============================================================== */
/** ============================================================== */

angular.module('camundaorg.controllers', [])
.config(function($locationProvider) {
  $locationProvider.hashPrefix('!');
})
.controller("DefaultController", function ($scope, $location) {

  // Bread Crumb 
  var breadCrumbs = $scope.breadCrumbs = [];

  $scope.$on("navigation-changed", function(event, navigationItem) {
    if (!navigationItem) {
      breadCrumbs.splice(0, breadCrumbs.length);
    } else {
      var contains = false;
      var remove = 0;
      angular.forEach(breadCrumbs, function(item) {
        if (item.name == navigationItem.name) {
          contains = true;
        }
        if (item.href.indexOf($location.path())) {
          remove++;
        }
      });

      for (var i = 0; i < remove; i++) {
        breadCrumbs.pop();
      }

      if (!contains) {
        breadCrumbs.push({name:navigationItem.name, href: $location.path()});
      }
    }
  });
  // end Bread Crumb
})


.controller('NavigationController', function ($scope, $location) {

  $scope.activeClass = function(link) {
    var path = $location.absUrl();      
    return path.indexOf(link) != -1 ? "active" : "";
  };
})


/** implement **/
.controller('ImplementHeroUnit', function ($scope) {

    $scope.activeSection = "overview";

    $scope.setAciveSection = function(newSection) {
        $scope.activeSection = newSection;
    }

    $scope.isActiveSection = function(section) {
        return $scope.activeSection == section ? "active" : "inactive";
    }

})

.controller('AnimateProjectSetupController', function ($scope) {

    function translateElement( element, distance, i)
    {
     
        setTimeout( function( ) {
          var x = distance.x * i / 100;
          var y = distance.y * i / 100;
          element.transform.baseVal.getItem( 0 ).setTranslate( x, y );

          i++;

          if(y <= distance.y && x <= distance.x) {
            translateElement(element, distance, i);
          }

        }, i*0.18);
      
    }

    $scope.animateProjectSetup = function() {

        var element1 = document.getElementById( "bpmn-container" );
        var element2 = document.getElementById( "java-container" );
        var element3 = document.getElementById( "taskForms-container" );

        element1.transform.baseVal.getItem( 0 ).setTranslate( 0, 0 );
        element2.transform.baseVal.getItem( 0 ).setTranslate( 0, 0 );
        element3.transform.baseVal.getItem( 0 ).setTranslate( 0, 0 );


        setTimeout( function() {
            translateElement(element1, {x:0,y:200}, 0);

            setTimeout( function() {
                translateElement(element2, {x:0,y:200}, 0);

                    setTimeout( function() {
                        translateElement(element3, {x:0,y:200}, 0);

        /*              setTimeout( function() {
                            var element4 = document.getElementById( "maven-container" );
                            translateElement(element4, {x:232,y:0}, 0);                 
                        }, 1000);
        */

                    }, 1000);

            }, 1000);
        }, 1000);

    };

    $scope.animateProjectSetup();

})

.controller('RuntimeContainers', function ($scope) {

    $scope.selectedContainer = "NOTHING";

    $scope.toggleContainer = function(container) {
        if(container == $scope.selectedContainer) {
            $scope.selectedContainer = "NOTHING";
        } else {
            $scope.selectedContainer = container;
        }
    }

    $scope.cssClass = function(container) {
        return "container-" + (container == $scope.selectedContainer ? (container+"-glow") : container);
    }
}) 

/**
 * numberguess controller 
 */

.controller('NumberguessAppController',  function ($scope, $http, $element, $timeout) {

  // list of currently suspended activities (activites waiting in an async continuation 
  // ie. waiting for a trigger. Could be more than one even though we do not have concurrency 
  // in this simple example.)
  $scope.suspendedActivities = [];

  // a list of activites that are currently active
  $scope.activeActivities = [];

  $scope.guess = undefined;

  $scope.isProcessDefinitionConfigured = false;

  $scope.guessCounter = 0;

  $scope.startProcess = function(processId) {

    var processDefinition = $scope.processDefinition;

    if(!processDefinition) {
      throw "could not find process definition with id " + processId +" in current scope.";
    }
    
    if(!$scope.isProcessDefinitionConfigured) {
      // configure the process definition
      for (var i = 0; i < processDefinition.baseElements.length; i++) {
        var activity = processDefinition.baseElements[i];

        // attach execution listener to all activities in the process definition
        var listeners = activity.listeners;
        if(!!activity.listeners) {
          listeners.push({
            "start" : function(activityExecution) {
              var actId = activityExecution.activityDefinition.id;
              var isSkip = actId == "exclusiveGW" && $scope.guessCounter > 1;

              // if we have an incoming sequence flow: animate!
              if(!!activityExecution.incomingSequenceFlowId) {
                var e = $scope.paper.getById(activityExecution.incomingSequenceFlowId);     

                $scope.paper.customAttributes.along = function (a, cid) {                          
                  l = e.getTotalLength();
                  to = 1;                  
                  var p = e.getPointAtLength(a * l);  
                  return {                                  
                    transform: "t" + [p.x, p.y-8] 
                  }
                };

                var set = $scope.paper.set();
                
                var token = $scope.paper.ellipse(0, 0, 8, 8);
                token.attr({"fill":"#b72a37", "stroke":"none"}).attr({
                  along: [0,token.id]
                });
                set.push(token);

                // adding Robert's idea with the guess 
                // being displayed inside the token!
                if(!!$scope.lastGuess) {
                  var guessNumner = $scope.paper.text(0, 0, $scope.lastGuess);
                  guessNumner.attr({"stroke":"white", "fill":"none", "font-size":"14pt"}).attr({
                    along: [0,guessNumner.id]
                  });
                  set.push(guessNumner);
                }

                var timeout = 1500;

                set.animate({
                  along: [to,set.id]
                }, timeout, function() {
                  set.remove();
                  if(isSkip) {
                    activityExecution.doContinue();                    
                  }
                });       

                // do this via angular timeout function 
                // to make sure scope rerenders itself
                if(!isSkip) {
                  $timeout(function(){               
                    $scope.$emit("activityStart", actId);                                     
                  },timeout);         
                }

              } else {
                $scope.$emit("activityStart", actId);
              }

              
            },
            "end" : function(activityExecution) {
              var actId = activityExecution.activityDefinition.id;
              $scope.$emit("activityEnd", actId);      
            }
          });
        }
        
        // make activities async
        if(activity.type != "userTask" && activity.type != "process") {
          activity.asyncCallback = function(activityExecution) {
            $scope.suspendedActivities.push(activityExecution);                    
          }
        }      
      }
      $scope.isProcessDefinitionConfigured = true;
    }

    // create a new ActivityExecution for the process definition & start it
    $scope.processInstance = new CAM.ActivityExecution(processDefinition);
    $scope.processInstance.variables.secret = Math.floor((Math.random()*5)+1);
    $scope.processInstance.start();
  };

  $scope.isGuessWrong = function() {
    return !$scope.guess && $scope.guessCounter > 0;
  }

  $scope.isGuessValid = function() {
    return !!$scope.guess && $scope.guess >= 1 && $scope.guess <= 5;
  }

  $scope.isFirstGuess = function() {
    return $scope.guessCounter == 0;
  }

  $scope.cancel = function() {
    $scope.processInstance = undefined;
    $scope.suspendedActivities = [];    
    $scope.activeActivities = [];
    $scope.guessCounter = 0;
    $scope.lastGuess = undefined;

    // remove remaining highlights
    for (var i = 0; i < $scope.processDefinition.baseElements.length; i++) {
      var activity = $scope.processDefinition.baseElements[i];
      $scope.paper.getById(activity.id).attr({"stroke":"#808080"});
    }
  }

  $scope.doContinue = function(activityId) {
    for (var i = 0; i < $scope.suspendedActivities.length; i++) {
      if($scope.suspendedActivities[i].activityDefinition.id == activityId) {
        $scope.suspendedActivities[i].doContinue();
        $scope.suspendedActivities.splice(i,1);
      }
    };
  };

  $scope.signal = function(activityId) {

    if(!$scope.isGuessValid()) {
      return;
    }

    for (var i = 0; i < $scope.processInstance.activityExecutions.length; i++) {
      var execution = $scope.processInstance.activityExecutions[i];
      if(execution.activityDefinition.id == activityId && !execution.isEnded) {
        $scope.processInstance.variables.guess = $scope.guess;
        $scope.lastGuess = $scope.guess;
        $scope.guess = undefined;
        $scope.guessCounter++;
        execution.signal();
        break;
      }
    };
    
  };

  $scope.inactive = function() {
    return !$scope.processInstance;
  };

  $scope.active = function(activityId) {
    return $scope.activeActivities.indexOf(activityId) > -1;
  }

  /* here we get notified when an activity is started */
  $scope.$on("activityStart", function(event, activityId, execution) {
    // add activity to list of active activites
    $scope.activeActivities.push(activityId);  
    $scope.paper.getById(activityId).attr({"stroke":"#b72a37"});
  });

  /* here we get notified when an activity is ended */
  $scope.$on("activityEnd", function(event, activityId) {
    $scope.activeActivities.splice($scope.activeActivities.indexOf(activityId), 1);
    $scope.paper.getById(activityId).attr({"stroke":"#808080"});
  });

})

.controller('RoadmapController', function ($scope, $resource, CSV) {
  var getResource   = $resource('./assets/csv/roadmap.csv');
    var roadmapResource = new getResource();
    roadmapResource.$get({sid: Math.random()}, //generate a random string to prevent proxy caching
        function(data) {
            var i = 0;
            var e = null;
            var string = "";
      $scope.roadmapErrorText = "";
      
            for(e in data) {
                i++;
            }
            for(var n = 0; n<= i; n++) {
                if(typeof data[n] === "undefined") {
                    
                } else {
                    string = string + data[n];
                }
            }
            $scope.roadmapRows = CSV.csv2json(string, { delim: ';', textdelim: '"'});
        },
        function() {
            $scope.roadmapErrorText = "The roadmap is currently unavailable!";
        }
    );
    
    $scope.isNotNull = function(value) {
        if(value == 0 || typeof value === undefined || value == "" || value == "" || value == null) {
            return false;
        } else {
            return true;
        }
    };
})

/** forum boards controller */
.controller('ForumController', function ($scope) {

  var FORUM_1 = "forum1";
  var FORUM_2 = "forum2";
  var FORUM_3 = "forum3";

  $scope.activeForum = FORUM_2;

  $scope.activeClass = function(test) {
    return $scope.isActive(test) ? '' : '-false';
  };

  $scope.setActive = function(forum) {
    $scope.activeForum = forum;
  };

  $scope.isActive = function(test) {
    return test == $scope.activeForum;
  };

});


/** ============================================================== */
/** ============================================================== */    

/* services */

angular
  .module('camundaorg.services', [])
  .factory("App", function() {

    function getAppBase() {
      return $("base").attr("app-base");
    }

    return {
      appBase: getAppBase
    };
  })
  .factory('CSV', function() {  
        return {
            /**
             * splitCSV function (c) 2009 Brian Huisman, see http://www.greywyvern.com/?post=258
             * Works by spliting on seperators first, then patching together quoted values
             */
            splitCSV : function(string, seperator) {
                for (var value = string.split(seperator = seperator || ","), x = value.length - 1, tl; x >= 0; x--) {
                    if (value[x].replace(/"\s+$/, '"').charAt(value[x].length - 1) == '"') {
                        if ((tl = value[x].replace(/^\s+"/, '"')).length > 1 && tl.charAt(0) == '"') {
                            value[x] = value[x].replace(/^\s*"|"\s*$/g, '').replace(/""/g, '"');
                        } else if (x) {
                            value.splice(x - 1, 2, [value[x - 1], value[x]].join(sep));
                        } else value = value.shift().split(seperator).concat(value);
                    } else value[x].replace(/""/g, '"');
            } return value;
          },
            
            /**
             * Converts from CSV formatted data (as a string) to JSON returning
             *  an object.
             * @required csvdata {string} The CSV data, formatted as a string.
             * @param args.delim {string} The delimiter used to seperate CSV
             *  items. Defauts to ','.
             * @param args.textdelim {string} The delimiter used to wrap text in
             *  the CSV data. Defaults to nothing (an empty string).
             */
          csv2json : function(csvData, args) {
        args = args || {};
                var delim = null;
                
                if(typeof args.delim === "undefined") {
                    delim = ",";
                } else {
                    delim = args.delim;
                }
                
        // Linux line ending check
        var csvLines = (csvData.search("\r\n") != -1) ? csvData.split("\r\n") : csvData.split("\n");
                var csvHeaders = this.splitCSV(csvLines[0], delim);
                var csvRows = csvLines.slice(1, csvLines.length);
    
                var returnValue = {};
                returnValue.rows = [];
    
                for(var r in csvRows) {
                    if (csvRows.hasOwnProperty(r)) {
                        var row = csvRows[r];
                        var rowItems = this.splitCSV(row, delim);
    
                        // Break if we're at the end of the file
                        if(row.length == 0) break;
    
                        var rowObj = {};
                        for(var i in rowItems) {
                            if (rowItems.hasOwnProperty(i)) {
                                var item = rowItems[i];
    
                                rowObj[csvHeaders[i]] = item;
                            }
                        }
                        returnValue.rows.push(rowObj);
                    }
                }
                return returnValue;
            }
        };
  });


/** ============================================================== */
/** ============================================================== */    

/* filters */

angular.module('camundaorg.filters', []);


/** ============================================================== */
/** ============================================================== */    

/* directives */

angular
  .module('camundaorg.directives', [ ]); 


angular.module('camundaorg.directives')

  .value('indent', function(text, spaces) {
    if (!text) return text;
    var lines = text.split(/\r?\n/);
    var prefix = '      '.substr(0, spaces || 0);
    var i;

    // remove any leading blank lines
    while (lines.length && lines[0].match(/^\s*$/)) lines.shift();
    // remove any trailing blank lines
    while (lines.length && lines[lines.length - 1].match(/^\s*$/)) lines.pop();
    var minIndent = 999;
    for (i = 0; i < lines.length; i++) {
      var line = lines[0];
      var indent = line.match(/^\s*/)[0];
      if (indent !== line && indent.length < minIndent) {
        minIndent = indent.length;
      }
    }

    for (i = 0; i < lines.length; i++) {
      lines[i] = prefix + lines[i].substring(minIndent);
    }
    lines.push('');
    return lines.join('\n');
  })

  .value('escape', function(text) {
    return text.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/"/g, '&quot;');
  })

  .factory('script', function() {

    return {
    
    };
  })

  .factory('fetchCode', function(indent) {
    return function get(id, spaces) {
      return indent(angular.element(document.getElementById(id)).html(), spaces);
    }
  })

  .directive('code', function() {
    return {restrict: 'E', terminal: true};
  })

  .directive('appSource', function(fetchCode, escape, script) {
    return {
      terminal: true,
      link: function(scope, element, attrs) {
        var tabs = [],
            panes = [],
            annotation = attrs.annotate && angular.fromJson(fetchCode(attrs.annotate)) || {},
            TEMPLATE = {             
             
          };

    element.css('clear', 'both');

        angular.forEach(attrs.appSource.split(' '), function(filename, index) {
          var content;

          tabs.push(
            '<li class="' + (!index ? ' active' : '') + '">' +
              '<a href="#' + id(filename) + '" data-toggle="tab">' + filename  + '</a>' +
            '</li>');

          
          content = fetchCode(filename);
          

          // hack around incorrect tokenization
          content = content.replace('.done-true', 'doneTrue');
          if(filename.indexOf('Project-Layout')==-1) {
            content = prettyPrintOne(escape(content), undefined, false);
          }
          
          // hack around incorrect tokenization
          content = content.replace('doneTrue', '.done-true');

          var popovers = {},
              counter = 0;

          angular.forEach(annotation[filename], function(text, key) {
            var regexp = new RegExp('(\\W|^)(' + key.replace(/([\W\-])/g, '\\$1') + ')(\\W|$)');

            content = content.replace(regexp, function(_, before, token, after) {
              var token = "__" + (counter++) + "__";
              popovers[token] =
                '<code class="nocode" rel="popover" data-trigger="hover" title="' + escape('<code>' + key + '</code>') +
                '" data-content="' + escape(text) + '" data-html=\"true\">' + escape(key) + '</code>';
              return before + token + after;
            });
          });

          angular.forEach(popovers, function(text, token) {
            content = content.replace(token, text);
          });

          panes.push(
            '<div class="tab-pane' + (!index ? ' active' : '') + '" id="' + id(filename) + '">' +
              '<pre class="linenums nocode">' + content +'</pre>' +
            '</div>');
        });

        element.html(
          '<div class="tabbable">' +
            '<ul class="nav nav-tabs">' +
            tabs.join('') +
            '</ul>' +
            '<div class="tab-content">' +
            panes.join('') +
            '</div>' +
            '</div>');
        element.find('[rel=popover]').popover();
       

        function id(id) {
          return id.replace(/\W/g, '-');
        }
      }
    }
  })

  .directive('hint', function() {
    return {
      template: '<em>Hint:</em> hover over ' +
          '<code class="nocode" rel="popover" title="Hover" ' +
          'data-content="Place your mouse over highlighted areas in the code for explanations.">me</code>.'
    }
  })



  .directive('appSourceNoTabs', function(fetchCode, escape, script) {
    return {
      terminal: true,
      link: function(scope, element, attrs) {
        var TEMPLATE = {             
             
        };

        var tabs = [],
          panes = [],
          annotation = attrs.annotate && angular.fromJson(fetchCode(attrs.annotate)) || {},
          TEMPLATE = {             
           
        };

        element.css('clear', 'both');
        var filename = attrs.appSourceNoTabs;
        var content = fetchCode(filename);
          
        // hack around incorrect tokenization
        content = content.replace('.done-true', 'doneTrue');
        if(filename.indexOf('Project-Layout')==-1) {
          content = prettyPrintOne(escape(content), undefined, true);
        }
          
        // hack around incorrect tokenization
        content = content.replace('doneTrue', '.done-true');

        var popovers = {},
            counter = 0;

        angular.forEach(annotation[filename], function(text, key) {
          var regexp = new RegExp('(\\W|^)(' + key.replace(/([\W\-])/g, '\\$1') + ')(\\W|$)');

          content = content.replace(regexp, function(_, before, token, after) {
            var token = "__" + (counter++) + "__";
            popovers[token] =
              '<code class="nocode" rel="popover" data-trigger="hover" title="' + escape('<code>' + key + '</code>') +
              '" data-content="' + escape(text) + '" data-html=\"true\">' + escape(key) + '</code>';
            return before + token + after;
          });
        });

        angular.forEach(popovers, function(text, token) {
          content = content.replace(token, text);
        });

        element.html('<pre class="linenums nocode">' + content +'</pre>'); 
        element.find('[rel=popover]').popover();
      }
    }
  })


// ca_bpmn.js =========================================== //


.directive('bpmnRender', function() {
  require({
        baseUrl: "./",
        packages: [
             { name: "dojo", location: "assets/js/lib/dojo/dojo"},
             { name: "dojox", location: "assets/js/lib/dojo/dojox"},
             { name: "bpmn", location: "assets/js/app/bpmn"}]
  });
  return {
    link: function(scope, element, attrs) {
      var bpmnResource = attrs.bpmnRender;

      require(["bpmn/Bpmn"], function(Bpmn) {
            new Bpmn().renderUrl("assets/bpmn/" + bpmnResource + ".bpmn", {
                diagramElement : element[0].id,
                overlayHtml : '<div style="position: relative; top:100%"></div>',
                width : $(element).width(),
                height : $(element).height()
            }).then(function (bpmn){
                scope.bpmn = bpmn;
                //bpmn.zoom(0.8);
                //bpmn.annotate("reviewInvoice", '<span class="bluebox"  style="position: relative; top:100%">New Text</span>', ["highlight"]);
            });
        });
    }
  }
})
.directive('bpmnSrc', function(App) {
  return {
    link: function(scope, element, attrs) {

        var bpmnResource = App.appBase() + "assets/bpmn/" + attrs.bpmnSrc;
        
        bpmn(bpmnResource, element);
        //$('body').scrollspy('refresh');
    }
  }
})
.directive('bpmnSrc2', function(App) {
  return {
    link: function(scope, element, attrs) {

      var bpmnResource = attrs.bpmnSrc2;
      
      $.get(App.appBase() + "assets/bpmn/" + bpmnResource + ".bpmn", function(data){
      
        // create process definition
        scope.processDefinition = new CAM.Transformer().transform(data)[0];

        // render process & add paper to scope
        scope.paper = bpmnDirect(data, element);

      }, "text");
    }
  }
})
.directive('bpmnRun', function() {
  return {
    scope: true,
    transclude: true, 
    template: '<div><div ng-transclude></div><button class="btn btn-primary" ng-click="startProcess()"><i class="icon-play"></i> Play</button></div>',
    link: function(scope, element, attrs) {

      var bpmnResource = attrs.bpmnSrc;

      $.get(App.appBase() + "assets/bpmn/" + bpmnResource + ".bpmn", function(data){
        
        scope.processDefinition = CAM.transform(data)[0];

        if(!scope.startProcess) {
          scope.startProcess = function() {
             var execution = new CAM.ActivityExecution(scope.processDefinition);
             execution.variables["paperId"] = element.attr("id");
              execution.start();
          }
        }

    }, "text");
  }
}
})
.directive('bpmnReferenceList', function() {
  return {
    link: function(scope, element, attrs) {
    
    
    


    }
  }
})

.directive('docsToc', function() {

  return {
    link: function(scope, element, attrs) {

      function generateTocMarkDown(title, link, indent) {
        var space = "";

        for (var i = 0; i < indent - 1; i++) {
          space += "  ";
        }

        return space + "* [" + title+ "](#" + link + ")" + "\n";
      }

      $("h1, h2, h3, h4").each(function(i) {
        var current = $(this);

        var link = current.find("a");

        if (link.length && link.attr("id")) {

          // generate toc markdown from page structure
          // var indent = parseInt($(current).prop("tagName").substring(1));
          // $(element).append(generateTocMarkDown(current.text(), link.attr("id"), indent));
          
          // append copyable link
          $(current).append('<a class="headerlink" href="#' + link.attr("id") + '" title="Link to current section">¶</a>')
        }
      });
    }
  }; 
})

.directive('bpmnTutorial', function($location) {
  return {
    link: function(scope, element, attrs) {
    
    $('.tutPop', element).popover({
        "trigger": "hover",
        "placement": "bottom"
    });

    // update active entry in Breadcrumb

    var link = '#' + $location.path();

    // Remove any active entry marker from list
    $('.bpmnSymbolLink').parent().removeClass("active");

    if (link == '#/design/reference') {
      $('#breadcrumbOverview').text('Symbol Reference');
      $('#breadcrumbOverview').addClass('active');
      $('#breadcrumbSymbol').text('');
    } else {

      $('#breadcrumbOverview').removeClass('active');
      $('#breadcrumbOverview').html('<a href="#/design/reference">Symbol Reference</a> <span class="divider">/</span>');
      // Highlight active entry in list
      $('a[href="' + link + '"]').parent().addClass("active");
      // update Breadcrumb active entry
      $('#breadcrumbSymbol').text($('a[href="' + link + '"]').text());

    }



    }
  }
})
.directive('caAffix', function() {
  return {
    link: function(scope, element, attrs) {
        
        $(element).affix({"offset":250});
        //$('body').scrollspy({"target":"#navSide"});
    }
  }
})
.directive('bpmnSymbol', function() {
  return {
    link: function(scope, element, attrs) {
        var bpmnSymbol = attrs.bpmnSymbol;
        var bpmnSymbolName = attrs.bpmnSymbolName;
        drawBpmnSymbol (bpmnSymbol, bpmnSymbolName, element);
    }
  }
})
.directive('imgThumb', function() {
  return {
    link: function(scope, element, attrs) {
      //alert (attrs.imgSrc);
      
      $(element).append('<a href="#myModal_' + attrs.id +'" data-toggle="modal"><img src="' + attrs.imgSrc +'"/></a><div class="center"><p style="padding-top:5px; font-size:90%"><i class="icon-zoom-in"></i> click to enlarge</p></div>');
      $(element).append('<div id="myModal_' + attrs.id +'" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'
  + '<div class="modal-body">'
    + '<img src="' + attrs.imgSrc +'"/>'
    + '</div>'
    + '<div class="modal-footer">'
    + '<button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>'
    + '</div>'
    + '</div>');
    }
  }
})
.directive('camundaEvents', function(App) {
  return {
    link: function(scope, element, attrs) {

      $.getJSON('http://www.camunda.org/php/meeting.php', function(data) {
          $.each( data.events, function( key, value ) {

            var myDateString = value.meeting.date;

            var myRow = "<td>" + myDateString + "</td><td><img src='" + App.appBase() + "assets/img/app/community/meetings/" + value.meeting.country + ".png' > " + value.meeting.country + "</td><td>" + value.meeting.city + "</td><td>" + value.meeting.subject + "</td><td>" + value.meeting.attendees + " attendees</td><td>" + parseInt(value.meeting.seats - value.meeting.attendees)  + " seats left</td>";
            var selectDate = '<td><a style="color:black;" href="' + App.appBase() + 'community/meetings/register.html?id=' + value.meeting.id +'" role="button" class="btn">Register</a></td>';
         
            myRow = "<tr>" + selectDate + myRow + "</td></tr>";
            element.append(myRow);
          });
      });
    }
  }
})
.directive('camundaEventsHome', function() {
  return {
    link: function(scope, element, attrs) {

      $.getJSON('http://www.camunda.org/php/meeting.php', function(data) {

          $.each( data.events, function( key, value ) {

            var myDateString = value.meeting.date.substring(0,6);
            var myRow = myDateString + " | " + value.meeting.city + " | <a style='color:lightblue;' href='community/meetings/register.html?id=" + value.meeting.id + "'>" + value.meeting.subject + "</a><br/>";
            element.append(myRow);
            
          });

      });
    }
  }
})
.directive('meeting', function() {
    function updateAttendees  (meetingId) {
       $.getJSON('http://www.camunda.org/php/meeting.php?id=' + meetingId, function(data) {
          $.each( data.events, function( key, value ) {
            var freeSeats = parseInt(value.meeting.seats - value.meeting.attendees);
            if (freeSeats < 1) {
              $('.mSeats').text ('Sorry, there are no seats left :-(');
              $('#mSubmit').attr('disabled', 'true');
            } else {
              $('.mSeats').text('Currently we have ' + value.meeting.attendees + ' attendees. There are still ' + parseInt(value.meeting.seats - value.meeting.attendees) + ' seats left!');
            }

          });
        });
    }
  return {
    link: function(scope, element, attrs) {

      // Helper for getting Get param
      var HTTP_GET_VARS=new Array();
      var strGET=document.location.search.substr(1,document.location.search.length);
      if(strGET!='')
          {
          var gArr=strGET.split('&');
          for(var i=0;i<gArr.length;++i)
              {
              var v='';var vArr=gArr[i].split('=');
              if(vArr.length>1){v=vArr[1];}
              HTTP_GET_VARS[unescape(vArr[0])]=unescape(v);
              }
          }
        var meetingId = HTTP_GET_VARS["id"];


        $.getJSON('http://www.camunda.org/php/meeting.php?id=' + meetingId, function(data) {
        
          $.each( data.events, function( key, value ) {
          
          $('.mCountry').append(value.meeting.country);
          $('.mCity').text(value.meeting.city);
          $('.mDate').text(value.meeting.date);
          $('.mSubject').append(value.meeting.subject);
          $('.mText').append(value.meeting.text);
          $('.mPlace').append(value.meeting.place + ' (<a target="_blank" href="https://maps.google.de/maps?q=' + value.meeting.place + '">Google Maps</a>)');

            if (parseInt(value.meeting.seats - value.meeting.attendees) < 1) {
              $('.mSeats').text ('Sorry, there are no seats left :-(');
              $('#mSubmit').attr('disabled', 'true');
            } else {
              $('.mSeats').text('Currently we have ' + value.meeting.attendees + ' attendees. There are still ' + parseInt(value.meeting.seats - value.meeting.attendees) + ' seats left!');
            }

            jQuery.validator.setDefaults({
              debug: false,
              onsubmit: true,
              success: "valid"
            });;
             
                $("#registerForm_1").validate({
              rules: {
                mName: "required",
                mEmail: "required email"
              }
            });


            $('#mSubmit').on('click', function(meeting) {
              if ($("#registerForm_1").valid()) {
                var myName =  $('#mName').val();
                var myEmail = $('#mEmail').val();

                $('#formContainer').append('<p id="status">Processing...</p>');
                // alert (myName + myEmail);
               // HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");
                 $.ajax({
                 // pfad zur PHP Datei (ab HTML Datei)
                      url: "http://www.camunda.org/php/register.php",
                 // Daten, die an Server gesendet werden soll in JSON Notation
                      data: {id: value.meeting.id, name: myName, email: myEmail},
                      datatype: "jsonp",
                 // Methode POST oder GET
                 type: "POST",
                 // Callback-Funktion, die nach der Antwort des Servers ausgefuehrt wird
                      success: function(data) { 
                        $('#status').text(data);
                        $('#mName').val("");
                        $('#mEmail').val("");
                        updateAttendees  (meetingId);
                      }
                 });
              }             
            });   

          });

      });

     
  }
}
})
.directive('meetingsSubscribe', function() {
  return {
    link: function(scope, element, attrs) {
  
            jQuery.validator.setDefaults({
              debug: false,
              onsubmit: true,
              success: "valid"
            });;
             
                $("#subscribeForm").validate({
              rules: {
                email: "required email"
              }
            });

            $('#submit').on('click', function(event) {
              if ($("#subscribeForm").valid()) {
                
                var myEmail = $('#email').val();
                 $.ajax({
                 // pfad zur PHP Datei (ab HTML Datei)
                      url: "http://www.camunda.org/php/subscribeMeetings.php",
                 // Daten, die an Server gesendet werden soll in JSON Notation
                      data: {email: myEmail},
                      datatype: "jsonp",
                 // Methode POST oder GET
                 type: "POST",
                 // Callback-Funktion, die nach der Antwort des Servers ausgefuehrt wird
                      success: function(data) { 
                        $('#status').text(data);
                        $('#email').val('');                        
                      }
                 });
              }             
            });   

     
    }
  }
})
.directive('camTweets', function() {
  return {
    link: function(scope, element, attrs) {
      //alert (attrs.imgSrc);

    $(element).tweet({
          join_text: "auto",
          query: "#camunda",
          avatar_size: 30,
          count: 18,
          loading_text: "loading tweets..."
        });      
     
    }
  }
})
.directive('camBlogs', function() {
  return {
    link: function(scope, element, attrs) {
      //alert (attrs.imgSrc);

     $.getFeed({
        url: 'http://www.bpm-guide.de/feed/?lang_view=en',
        success: function(feed) {
        
            $(element).append('<h2>'
            + '<a href="'
            + feed.link
            + '">'
            + feed.title
            + '</a>'
            + '</h2>');
            
            var html = '';
            
            for(var i = 0; i < feed.items.length && i < 5; i++) {
            
                var item = feed.items[i];
                
                html += '<h3>'
                + '<a href="'
                + item.link
                + '">'
                + item.title
                + '</a>'
                + '</h3>';
                
                html += '<div class="updated">'
                + item.updated
                + '</div>';
                
                html += '<div>'
                + item.description
                + '</div>';
            }
            
            $(element).append(html);
        }    
    });     
     
    }
  }
})

.directive('vision', function() {
  return {
    link: function(scope, element, attrs) {
/*
    $('a').fadeIn('slow', function() {
        alert ("hi");
      });

    var controller = $.superscrollorama();
    controller.addTween('a', 
      TweenMax.from($('a'), .5, {css:{opacity:0}}));     
    
    controller.addTween('#fade2', 
      TweenMax.from($('#fade2'), .5, {css:{opacity:0}}));

    controller.addTween('#fade5', 
      TweenMax.from($('#fade5'), .5, {css:{opacity:0}}));    
  */

  
  $('#explainScalable').popover({
    "title":"Scalable Business Model",
    "trigger": "hover",
    "content": "<div class='explain' ><p>BPM can <b>not</b> help you inventing a great product or persuading your customers to buy it.</p><p>But if you do have the right product and a market to conquer, BPM can provide you with the infrastructure you need to turn a corner shop into a big yet profitable business.</p><p>Why BPM? To scale up your business model!</p></div>",
    "html": true
  });

  $('#explainBPM').popover({
    "title":"BPM",
    "trigger": "hover",
    "content": "<div class='explain' ><p>Business Process Management (BPM) is about the daily doing of your company, how to organize it in a smart and efficient way, and how to support it appropriately with IT solutions.</p><p>If you like it when things run smoothly, you are a potential BPM addict.</p></div>",
    "html": true
  });

  $('#explainAlign').popover({
    "title":"Business-IT-Alignment",
    "trigger": "hover",
    "content": "<div class='explain' ><p>Aligning people does not mean that one party commands and the other obeys. It neither means that one party gets rid of the other, thanks to fancy tools that suggest they could implement a complex application without programming.</p><p>Aligning is about communication. And if it comes to business processes, we can count on BPMN 2.0 as an excellent global standard for process diagrams that can serve both business people and software developers.</p><p>This is why BPMN 2.0 is a central element in our stack.</p></div>",
    "html": true
  });

  $('#explainIndividual').popover({
    "title":"Individual Process Applications",
    "trigger": "hover",
    "placement":"right",
    "content": "<div class='explain' ><p>We talk about scaling up your business model. Did you get your business model off-the-shelf?</p><p>So how could you possibly implement the process applications that actually execute your business model in some off-the-shelf BPM suite? Did the BPM vendor foresee all the software requirements that your business model demands?</p><p>We believe in the power of an open, flexible framework that allows your developers to implement what ever you need, and in what ever way you need.</p></div>",
    "html": true
  });

    }
  }
})

//======================================================= //

.directive('pipe', function ($http) {
  return {
    scope: {
      items : "&"
    },
    link: function (scope, element, attrs) {
      var url = attrs.pipeUrl;
      var truncate = attrs.truncate ? attrs.truncate :  150;

      scope.items = [];
      var element = $(element);
      scope.decode = function (theText) {
        return $('<div />').html(theText.substr(0, truncate)).text() + " ...";
      };

      // get pipe content via jsonp, using jquery because angular http seems to have a bug here:
      // getting a syntax error for our pipes
      $.getJSON(url+"&_callback=?",
        function(data) {
          scope.items = data.value.items;
          scope.$digest();
        }
      );

    }
  };
});

/**
 * Docs Navigation and Docs linking specific stuff
 */

(function(angular, $) {
  "use strict";

  var module = angular.module("camundaorg.directives");

  // copied from angular.js docs
  
  var FocusedDirective = function($timeout) {
    return function(scope, element, attrs) {
      element[0].focus();
      element.bind('focus', function() {
        scope.$apply(attrs.focused + '=true');
      });
      element.bind('blur', function() {
        // have to use $timeout, so that we close the drop-down after the user clicks,
        // otherwise when the user clicks we process the closing before we process the click.
        $timeout(function() {
          scope.$eval(attrs.focused + '=false');
        });
      });
      scope.$eval(attrs.focused + '=true');
    };
  };

  module
    .directive("focused", FocusedDirective);

})(window.angular, window.jQuery);

// ================================================================================================ //
// ================================================================================================ //