---

title: "DMN Engine"
weight: 200

menu:
  main:
    identifier: "user-guide-dmn-engine"
    parent: "user-guide"

---

The Camunda DMN engine is a Java library which can evaluate decision tables
based on the [DMN 1.1 OMG standard]. It can be used as library embedded in an
application or in combination with the Camunda BPM platform. This section
covers how to embed the library and use it to evaluate decisions. For more
information on the integration in the Camunda BPM platform, please see the
[corresponding section][platform]. You can read more about the DMN 1.1 standard
in the [reference].

A complete example how to embed the decision engine and test
decisions can be found on [GitHub].


[DMN 1.1 OMG standard]: http://www.omg.org/spec/DMN/
[platform]: {{< relref "user-guide/process-engine/decisions/index.md" >}}
[reference]: {{< relref "reference/dmn11/index.md" >}}
[GitHub]: https://github.com/camunda/camunda-bpm-examples/tree/master/dmn-engine/dmn-engine-java-main-method
