---

title: 'Logging'
category: 'Overview'

---

camunda Connect uses [camunda-commons-logging][] which itself uses [SLF4J][] as
a logging backend. To enable logging a SLF4J implementation has to be part of
your classpath. For example `slf4j-simple`, `log4j12` or `logback-classic`.

To also enable logging for the Apache HTTP client you can use a [SLF4J
bridge][] like `jcl-over-slf4j` as the Apache HTTP Client doesn't support
SLF4J.


[camunda-commons-logging]: https://github.com/camunda/camunda-commons/tree/master/logging
[SLF4J]: http://slf4j.org
[SLF4J bridge]: http://www.slf4j.org/legacy.html
