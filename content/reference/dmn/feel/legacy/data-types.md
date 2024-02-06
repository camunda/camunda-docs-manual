---

title: 'FEEL Data Types'
weight: 10

menu:
  main:
    name: "Data Types"
    identifier: "dmn-ref-feel-data-types"
    parent: "dmn-ref-feel-legacy"
    pre: "Supported Data Types in FEEL"

aliases: [reference/dmn11/feel/legacy/data-types/]
---

{{< note title="Heads Up!" class="info" >}}
This page provides information on the legacy FEEL Engine, that was used before the 
current <a href="{{< ref "/user-guide/dmn-engine/feel/_index.md" >}}">Scala-based FEEL Engine</a>
was integrated into Camunda 7.
{{< /note >}}

The Camunda DMN engine supports the following FEEL data types.

# String

{{< img src="../../img/string-type.png" title="String" class="no-lightbox" >}}

FEEL supports Strings. They must be encapsulated in double quotes. They
support only the equal [comparison] operator.

# Numeric Types

{{< img src="../../img/integer-type.png" title="Integer" class="no-lightbox" >}}

FEEL supports numeric types like integer. In the Camunda DMN engine the
following numeric types are available:

- integer
- long
- double

Numeric types support all [comparison] operators and [ranges].

# Boolean

{{< img src="../../img/boolean-type.png" title="Boolean" class="no-lightbox" >}}

FEEL supports the boolean value `true` and `false`. The boolean type only
supports the equal [comparison] operator.

# Date

{{< img src="../../img/date-type.png" title="Date" class="no-lightbox" >}}

FEEL supports date types. In the Camunda DMN engine the following date types
are available:

- date and time

To create a date and time value, the function `date and time` has to be used
with a single String parameter. The parameter specifies the date and time in
the format `yyyy-MM-dd'T'HH:mm:ss`.

Date types support all [comparison] operators and [ranges].


[comparison]: {{< ref "/reference/dmn/feel/legacy/language-elements.md#comparison" >}}
[ranges]: {{< ref "/reference/dmn/feel/legacy/language-elements.md#range" >}}