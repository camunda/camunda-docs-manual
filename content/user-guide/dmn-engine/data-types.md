---

title: "Data Types in the DMN Engine"
weight: 40

menu:
  main:
    name: "Data Types"
    identifier: "user-guide-dmn-engine-data-types"
    parent: "user-guide-dmn-engine"
    pre: "Specify the Types of Input/Output Data"

---

# Supported Data Types

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

## Working with Dates

# Setting the Data Type of an Input

# Setting the Data Type of an Output

# Implement a custom Data Type


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
