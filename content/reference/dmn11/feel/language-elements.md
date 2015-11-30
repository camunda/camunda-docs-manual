---

title: 'FEEL Language Elements'
weight: 20

menu:
  main:
    name: "Language Elements"
    identifier: "dmn-ref-feel-language-elements"
    parent: "dmn-ref-feel"
    pre: "Supported FEEL Language Elements"

---

The Camunda DMN engine supports FEEL for [input entries]. The FEEL term for
expression in input entires is simple unary tests. These simple unary tests
test an input value against an expression and return either `true` if the test
is satisfied or `false` otherwise. The expression can contain different
elements which are described in this sections.

# Comparison

FEEL simple unary tests support the following comparison operators. Please
note that the equals operator is empty and *not* `=`. Also it does *not*
exist an not equal operator like `!=`. To express this [negation] has to be
used.

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Operator</th>
    <th>Example</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Equal</td>
    <td><code></code></td>
    <td><code>"Steak"</code></td>
    <td>Test that the input value is equal the given value.</td>
  </tr>
  <tr>
    <td>Less</td>
    <td><code><</code></td>
    <td><code>< 10</code></td>
    <td>Test that the input value is less than the given value.</td>
  </tr>
  <tr>
    <td>Less or Equal</td>
    <td><code><=</code></td>
    <td><code><= 10</code></td>
    <td>Test that the input value is less or equal than the given value.</td>
  </tr>
  <tr>
    <td>Greater</td>
    <td><code>></code></td>
    <td><code>> 10</code></td>
    <td>Test that the input value is greater than the given value.</td>
  </tr>
  <tr>
    <td>Greater or Equal</td>
    <td><code>>=</code></td>
    <td><code>>= 10</code></td>
    <td>Test that the input value is greater or equal than the given value.</td>
  </tr>
</table>

# Range

Some [FEEL data types] like numeric types and date types can be tested against
a range of values. These ranges consist of a start value and an end value. The
range specifies if the start and end value is included in the range.

<table class="table table-striped">
  <tr>
    <th>Start</th>
    <th>End</th>
    <th>Example</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>include</td>
    <td>include</td>
    <td><code>[1..10]</code></td>
    <td>
      Test that the input value is greater then or equals the start value and
      less then or equals the end value.
    </td>
  </tr>
  <tr>
    <td>exclude</td>
    <td>include</td>
    <td><code>]1..10]</code> or <code>(1..10]</code></td>
    <td>
      Test that the input value is greater then the start value and less then
      or equals the end value.
    </td>
  </tr>
  <tr>
    <td>include</td>
    <td>exclude</td>
    <td><code>[1..10[</code> or <code>[1..10)</code></td>
    <td>
      Test that the input value is greater then or equal the start value and
      less then the end value.
    </td>
  </tr>
  <tr>
    <td>exclude</td>
    <td>exclude</td>
    <td><code>]1..10[</code> or <code>(1..10)</code></td>
    <td>
      Test that the input value is greater then the start value and less then
      the end value.
    </td>
  </tr>
</table>

# Disjunction

A FEEL simple unary test can be specified as conjunction of expressions. These
expression have to either [comparisons] or [ranges]. The test is `true`
at least one of conjunct expressions is `true`.

Examples:

- `3,5,7`: Test if the input is either 3, 5 or 7
- `<2,>10`: Test if the input is either less then 2 or greater then 10
- `10,[20..30]`: Test if the input is either 10 or between 20 and 30

# Negation

A FEEL simple unary tests can be negated with the `not` function. This means if
the containing expression returns `true` the test will return `false`. Please
*note* that only one negation as first operator is allowed but it can contain
a [disjunction].

Examples:

- `not("Steak")`: Test if the input is not the String Steak
- `not(>10)`: Test if the input is not greater than 10, which means it is less
  then or equals 10
- `not(3,5,7)`: Test if the input is neither 3, 5 nor 7
- `not([20..30])`: Test if the input is not between 20 and 30

# Qualified Names

FEEL simple unary tests can access variables and object properties by
qualified names.

Examples:

- `x`: Test if the input is equal the variable `x`
- `>= x`: Test if the input is greater then or equal the variable `x`
- `< customer.age`: Test if the input is less then the `age` property of the
  variable `customer`

# Date Functions

FEEL simple unary tests provide functions to create [date types]. The Camunda
DMN engine supports the following date functions:

- `date and time("...")`: Creates a date and time value from a String with the
  format `yyyy-MM-dd'T'HH:mm:ss`

Examples:

- `date and time("2015-11-30T12:00:00")`: Test if the input is the date
  November 30th, 2015 at 12:00:00 o'clock
- `[date and time("2015-11-30T12:00:00")..date and
  time("2015-12-01T12:00:00")]`: Test if the input is between the date
  November 30th, 2015 at 12:00:00 o'clock and December 1st, 2015 at 12:00:00
  o'clock



[comparisons]: #comparison
[ranges]: #range
[disjunction]: #disjunction
[negation]: #negation
[FEEL data types]: {{< relref "reference/dmn11/feel/data-types.md" >}}
[date types]: {{< relref "reference/dmn11/feel/data-types.md#date" >}}
