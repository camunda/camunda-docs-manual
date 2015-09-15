---

title: 'Item Definitions'
weight: 50

menu:
  main:
    identifier: "user-guide-decision-engine-item-definitions"
    parent: "user-guide-decision-engine"

---

In DMN, the inputs and output of decisions are data items whose value, at the decision logic level, is assigned to variables or represented by value expressions.

A data item is represented as ```ItemDefinition``` element inside the DMN. The ```ItemDefinition``` elements are defined at the top level inside the ```Definitions``` element. An ```ItemDefinition``` has an ```id``` attribute by which the ```ItemDefinition``` can be referenced.

```xml
<Definitions>
  <ItemDefinition id="customerStatus">
    <typeDefinition>string</typeDefinition>    
    <allowedValue id="statusGold">    
      <text>gold</text>
    </allowedValue>
    <allowedValue id="statusSilver">    
      <text>silver</text>
    </allowedValue>
  </ItemDefinition>
  <!-- ... -->
</Definitions>
```

{{< note title="Current Limitations" class="warning" >}}
The ```allowedValue``` elements inside an ```ItemDefinition``` are currently ignored. So it is not possible to specify the possible values.
{{< /note >}}

# Item Definition of Input Clause

An ```ItemDefinition``` may be references by an ```inputExpression``` of an input clause. The ```itemDefinition``` element inside the ```inputExpression``` have an attribute ```href``` which contains the id of the ```ItemDefinition```. The ```ItemDefinition``` specifies the type and possible values of the evaluated input expression.

```xml
<Definitions>
  <!-- ... -->
  <Decision>
    <DecisionTable>      
      <clause>
        <inputExpression>
          <itemDefinition href="#customerStatus" />
          <text>status</text>
        </inputExpression>    
        <!-- ... -->
      </clause>    
    </decisionTable>
  </decision>
</Definitions>
```

# Item Definition of Output Clause

Additionally, an output clause may also reference an ```ItemDefinition``` by an ```outputDefinition```. The ```outputDefinition``` element have an attribute ```href``` which contains the id of the ```ItemDefinition```. The ```ItemDefinition``` specifies the type and possible values of the output clause.

```xml
<Definitions>
  <!-- ... -->
  <Decision>
    <DecisionTable> 
      <clause>
        <outputDefinition href="#customerStatus" />
        <!-- ... -->
      </clause>    
    </decisionTable>
  </decision>
</Definitions>
```

# Type Definition

An ```ItemDefinition``` element may have a ```typeDefinition``` element, which contains a String that defines the data structure. The String must references a built-in data type. 

By default, the following built-in data types are supported:

* string
* boolean
* integer
* long
* double

The type definition is used to transform an input or output value of a clause. For example, an input clause has an input expression which is bind to a process variable. The variable is of type String and the input expression have an ```integer``` type definition. When the input expression is evaluated then the String value is transformed into an Integer value and is used to evaluate the rules.

```xml
<Definitions>

  <ItemDefinition id="orderSum">
    <typeDefinition>integer</typeDefinition>   
  </ItemDefinition>
  
  <Decision>
    <DecisionTable>      
      <clause>
        <inputExpression>
          <itemDefinition href="#orderSum" />
          <text>sum</text>
        </inputExpression>    
        <inputEntry id="lessThanLimit">        
          <text><![CDATA[ < 1000 ]]></text>
        </inputEntry>
        <inputEntry id="moreThanLimit">        
          <text><![CDATA[ >= 1000 ]]></text>
        </inputEntry>
      </clause>
      <!-- ... -->    
    </decisionTable>
  </decision>
</Definitions>
```

Notice that the type definition is ignored if the referenced data type does not match a build-in data type.

## Custom Data Types

To support custom data types or change the build-in data type transformation the default ```DataTypeTransformerFactory``` can be replaced in the ```DmnEngineConfiguration```. The ```DataTypeTransformerFactory``` is used  to resolve the ```DataTypeTransformer``` for a ```typeDefinition``` while parsing a decision. The ```DataTypeTransformer``` is invoked to transform the value when an input or output clause is evaluated.

The following example shows how to provide a custom data type for input and output values.

```java
public class CustomDataTypeTransformerFactory implements DataTypeTransformerFactory  {

  private final DataTypeTransformerFactory defaultFactory = new DefaultDataTypeTransformerFactory();

  public DataTypeTransformer getTransformerForType(String typeName) {
    if(typeName.equals("custom")) {
      return new CustomDataTypeTransformer();
    } else {
      return defaultFactory.getTransformerForType(typeName);
    }
  }
}

public class CustomDataTypeTransformer implements DataTypeTransformer {

  public Object transform(Object value) throws IllegalArgumentException {
    // transform the value into a custom data type
    return customValue;
  }
}
```
