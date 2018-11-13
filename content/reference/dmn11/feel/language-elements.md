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
note that the equals operator is empty and *not* `=`. Also, a non equal operator such as `!=` 
does *not* exist. To express this, [negation] has to be used.

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
    <td>Test that the input value is equal to the given value.</td>
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
    <td>Test that the input value is less than or equal to the given value.</td>
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
    <td>Test that the input value is greater than or equal to the given value.</td>
  </tr>
</table>

# Range

Some [FEEL data types], such as numeric types and date types, can be tested against
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
      Test that the input value is greater than or equal to the start value and
      less than or equal to the end value.
    </td>
  </tr>
  <tr>
    <td>exclude</td>
    <td>include</td>
    <td><code>]1..10]</code> or <code>(1..10]</code></td>
    <td>
      Test that the input value is greater than the start value and less than
      or equal to the end value.
    </td>
  </tr>
  <tr>
    <td>include</td>
    <td>exclude</td>
    <td><code>[1..10[</code> or <code>[1..10)</code></td>
    <td>
      Test that the input value is greater than or equal to the start value and
      less than the end value.
    </td>
  </tr>
  <tr>
    <td>exclude</td>
    <td>exclude</td>
    <td><code>]1..10[</code> or <code>(1..10)</code></td>
    <td>
      Test that the input value is greater than the start value and less than
      the end value.
    </td>
  </tr>
</table>

# Disjunction

A FEEL simple unary test can be specified as conjunction of expressions. These
expressions have to either have [comparisons] or [ranges]. The test is `true` if 
at least one of conjunct expressions is `true`.

Examples:

- `3,5,7`: Test if the input is either 3, 5 or 7
- `<2,>10`: Test if the input is either less than 2 or greater than 10
- `10,[20..30]`: Test if the input is either 10 or between 20 and 30
- `"Spareribs","Steak","Stew"`: Test if the input is either the String
  Spareribs, Steak or Stew
- `date and time("2015-11-30T12:00:00"),date and time("2015-12-01T12:00:00")]`:
  Test if the input is either the date November 30th, 2015 at 12:00:00 o'clock or
  December 1st, 2015 at 12:00:00 o'clock
- `>customer.age,>21`: Test if the input is either greater than the `age`
  property of the variable `customer` or greater than 21

# Negation

A FEEL simple unary test can be negated with the `not` function. This means if
the containing expression returns `true`, the test will return `false`. Please
*note* that only one negation as first operator is allowed but it can contain
a [disjunction].

Examples:

- `not("Steak")`: Test if the input is not the String Steak
- `not(>10)`: Test if the input is not greater than 10, which means it is less
  than or equal to 10
- `not(3,5,7)`: Test if the input is neither 3, 5 nor 7
- `not([20..30])`: Test if the input is not between 20 and 30

# Qualified Names

FEEL simple unary tests can access variables and object properties by
qualified names.

Examples:

- `x`: Test if the input is equal to the variable `x`
- `>= x`: Test if the input is greater than or equal to the variable `x`
- `< customer.age`: Test if the input is less than the `age` property of the
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
[FEEL data types]: {{< ref "/reference/dmn11/feel/data-types.md" >}}
[date types]: {{< ref "/reference/dmn11/feel/data-types.md#date" >}}
[input entries]: {{< ref "/reference/dmn11/decision-table/rule.md#input-entry-condition" >}}
