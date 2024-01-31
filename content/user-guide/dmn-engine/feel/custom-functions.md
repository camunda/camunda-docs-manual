---

title: 'FEEL Engine Custom Functions'
weight: 20

menu:
  main:
    name: "Custom Functions"
    identifier: "user-guide-dmn-engine-feel-custom-functions"
    parent: "user-guide-dmn-engine-feel"
    pre: "Implement Custom Functions which can be called in expressions"

---

Camunda 7 provides a wrapper for the FEEL Scala Engine to implement Custom Functions, which can be 
called in expressions and unary tests. 

{{< note title="Custom Function Behavior" class="warning" >}}
Please note that the Custom Function Mechanism of the Standalone FEEL Scala Engine might behave differently.
{{< /note >}}

You can add Custom Functions to the Process Engine (or the Standalone DMN Engine) only programmatically 
through a [Process Engine Plugin]. Read more about it in the section about how to 
[Register Custom Function Providers].

## Implement a Custom Function

To implement a Custom Function, create a sub-class of `FeelCustomFunctionProvider`.

The following code example shows how to implement a Custom Function:

```java
import org.camunda.bpm.dmn.feel.impl.scala.function.CustomFunction;
import org.camunda.bpm.dmn.feel.impl.scala.function.FeelCustomFunctionProvider;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class CustomFunctionProvider implements FeelCustomFunctionProvider {

  protected Map<String, CustomFunction> functions = new HashMap<>();

  public CustomFunctionProvider() {
    CustomFunction function = CustomFunction.create()
        .setParams("x", "y")
        .setFunction(args -> { 
          long argX = (long) args.get(0);
          long argY = (long) args.get(1);
          
          return argX + argY; 
        })
        .build();

    functions.put("myFunction", function);
  }

  @Override
  public Optional<CustomFunction> resolveFunction(String functionName) {
    return Optional.ofNullable(functions.get(functionName));
  }

  @Override
  public Collection<String> getFunctionNames() {
    return functions.keySet();
  }

}
```

When calling `CustomFunction.create()`, a builder is returned that you can use to configure the Custom Function.

The builder has the following configuration options:

* `#setParams(String... params)`
   * Defines the parameter names of the Custom Function
   * Passed arguments in FEEL must not follow a strict order when calling the parameter name explicitly: `myFunction(y: 5, x: 3)`
* `#enableVarargs()`
    * Enables variable arguments
    * When enabled, the function can have variable arguments for the last parameter 
    * The last argument is of type list
* `#setFunction(Function<List<Object>, Object> function)`
   * Passes an object of type <code>java.util.function.Function</code> with a list of objects as 
     arguments and an object as the return value
   * Cannot be used together with `#setReturnValue`
* `#setReturnValue(Object result)`
   * Sets the return value
   * The return value is defined on the registration of the function and cannot be changed later on
   * Cannot be used together with `#setFunction`

## Register Custom Function Providers

You can register the Custom Function Providers using a configuration property.

### Process Engine

You can register Custom Function Providers in the Process Engine Configuration with the help of
the property [dmnFeelCustomFunctionProviders] using a [Process Engine Plugin].

### Standalone DMN Engine

The DMN Engine has a property `feelCustomFunctionProviders` of type `List` in the 
`DefaultDmnEngineConfiguration` to register Custom Function Providers.

## Type Handling

This section describes which argument types are passed into a Custom Function and which types 
you can return.

### Argument Types

All Java types listed in the "Return Types" section of the [FEEL Type Handling] documentation can be 
passed into a Custom Function.

### Return Types

All Java types listed in the "Return Types" section of the [FEEL Type Handling] documentation plus 
the types listed in the [FEEL Data Types] documentation can be returned by a Custom Function.

[FEEL Type Handling]: {{< ref "/user-guide/dmn-engine/feel/type-handling.md#return-types" >}}
[FEEL Data Types]: https://camunda.github.io/feel-scala/1.11/feel-data-types
[Process Engine Plugin]: {{< ref "/user-guide/process-engine/process-engine-plugins.md" >}}
[dmnFeelCustomFunctionProviders]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#dmnFeelCustomFunctionProviders" >}}
[Register Custom Function Providers]: #register-custom-function-providers
