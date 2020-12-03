---

title: "Get Password Policy"
weight: 30

menu:
  main:
    name: "Get Password Policy"
    identifier: "rest-api-identity-password-policy-get"
    parent: "rest-api-identity"
    pre: "GET `/identity/password-policy`"

---

A password policy consists of a list of rules that new passwords must follow to be policy compliant. This end point returns a JSON representation of the list of policy rules.

More information on password policies in Camunda can be found in the password policy [user guide]({{< ref "/user-guide/process-engine/password-policy.md" >}}) and in the [security instructions]({{< ref "/user-guide/security.md" >}}).

# Method

GET `/identity/password-policy`

# Result

A JSON object corresponding to the `PasswordPolicy` interface in the engine.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>rules</td>
    <td>Array</td>
    <td>A JSON array of password policy rules. Each element of the array is a JSON object representing one rule of the policy.
    <table class="table table-striped">
      <tr>
        <th>Name</th>
        <th>Value</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>placeholder</td>
        <td>String</td>
        <td>A placeholder string that contains the name of a password policy rule.</td>
      </tr>
      <tr>
        <td>parameter</td>
        <td>Object</td>
        <td>A map that describes the characteristics of a password policy rule, such as the minimum number of digits.</td>
      </tr>
    </table>
    </td>
  </tr>
</table>

# Response Codes

<table class="table table-striped">
  <tr>
    <th>Code</th>
    <th>Media Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>200</td>
    <td>application/json</td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
  <td>No password policy was found.</td>
  </tr>
</table>

# Example

This example uses the built-in password policy that enforces a minimum password length, and some complexity rules.

## Request

GET `/identity/password-policy`

## Response
```
{
    "rules": [
        {
           "placeholder": "PASSWORD_POLICY_USER_DATA",
           "parameter": null
        },
        {
            "placeholder": "PASSWORD_POLICY_LENGTH",
            "parameter": {"minLength": "10"}
        },
        {
            "placeholder": "PASSWORD_POLICY_LOWERCASE",
            "parameter": {"minLowerCase": "1"}
        },
        {
            "placeholder": "PASSWORD_POLICY_UPPERCASE",
            "parameter": {"minUpperCase": "1"}
        },
        {
            "placeholder": "PASSWORD_POLICY_DIGIT",
            "parameter": {"minDigit": "1"}
        },
        {
            "placeholder": "PASSWORD_POLICY_SPECIAL",
            "parameter": {"minSpecial": "1"}
        }
    ]
}
```