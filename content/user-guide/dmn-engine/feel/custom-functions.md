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

Camunda BPM provides a wrapper for the FEEL Scala Engine to implement Custom Functions, which can be 
called in expressions and unary tests. 

Please note that the Custom Function Mechanism of the Standalone FEEL Scala Engine might behave differently.

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

When calling `CustomFunction.create()` a builder is returned you can use to configure the Custom Function.

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

[Process Engine Plugin]: {{< ref "/user-guide/process-engine/process-engine-plugins.md" >}}
[dmnFeelCustomFunctionProviders]: {{< ref "/reference/deployment-descriptors/tags/process-engine.md#dmnFeelCustomFunctionProviders" >}}

## Type Handling

This section describes which argument types are passed into a Custom Function and which types 
you can return.

### Argument Types

<table class="table table-striped">
  <tr>
    <th>Argument Type</th>
    <th>FEEL Expression</th>
  </tr>
  <tr>
    <td><code>null</code></td>
    <td><code>null</code></td>
  </tr>
  <tr>
    <td><code>java.lang.String</code></td>
    <td><code>"foo"</code></td>
  </tr>
  <tr>
    <td><code>java.lang.Double</code></td>
    <td><code>3.1415</code></td>
  </tr>
  <tr>
    <td><code>java.lang.Long</code></td>
    <td><code>3</code></td>
  </tr>
  <tr>
    <td><code>java.lang.Boolean</code></td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <td><code>java.time.LocalTime</code></td>
    <td><code>time("11:45:30")</code></td>
  </tr>
  <tr>
    <td><code>org.camunda.feel.syntaxtree.ZonedTime</code></td>
    <td>
        <code>time("11:45:30+02:00")</code><br>
        <code>time("10:31:10@Europe/Paris")</code>
    </td>
  </tr>
  <tr>
    <td><code>java.time.LocalDate</code></td>
    <td><code>date("2017-03-10")</code></td>
  </tr>
  <tr>
    <td><code>java.time.LocalDateTime</code></td>
    <td><code>date and time("2019-08-12T22:22:22")</code></td>
  </tr>
  <tr>
    <td><code>java.time.ZonedDateTime</code></td>
    <td>
        <code>date and time("2019-08-12T22:22:22+02:00")</code><br>
        <code>date and time("2019-08-12T22:22:22@Europe/Berlin")</code>
    </td>
  </tr>
  <tr>
    <td><code>java.time.Duration</code></td>
    <td><code>duration("P4D")</code></td>
  </tr>
  <tr>
    <td><code>java.time.Period</code></td>
    <td><code>duration("P1Y6M")</code></td>
  </tr>
  <tr>
    <td><code>java.util.Map</code></td>
    <td><code>{ "foo": "bar" }</code></td>
  </tr>
  <tr>
    <td><code>java.util.List</code></td>
    <td><code>[ "foo", "bar", "baz" ]</code></td>
  </tr>
</table>

### Return Types

All Java types listed in "Argument Types" plus the types listed in the [FEEL Data Types] 
documentation can be returned by a Custom Function.

[FEEL Data Types]: https://camunda.github.io/feel-scala/feel-data-types