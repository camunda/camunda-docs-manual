---

title: "DMN Engine"
weight: 200

menu:
  main:
    identifier: "user-guide-dmn-engine"
    parent: "user-guide"

---

The Camunda DMN engine is a Java library which can evaluate DMN decision tables.
It implements version 1.3 of the OMG [DMN](http://www.omg.org/spec/DMN/1.3) standard to the extent documented in the [DMN reference].

The DMN engine can be used as library embedded in an
application or in combination with Camunda 7. This section
covers how to embed the library and use it to evaluate decisions. For more
information on the integration in Camunda 7, please see the
[corresponding section][platform]. You can read more about the DMN 1.3 standard
in the [DMN reference].

A complete example how to embed the decision engine and test
decisions can be found on [GitHub].


[platform]: {{< ref "/user-guide/process-engine/decisions/_index.md" >}}
[DMN reference]: {{< ref "/reference/dmn/_index.md" >}}
[GitHub]: https://github.com/camunda/camunda-bpm-examples/tree/master/dmn-engine/dmn-engine-java-main-method
