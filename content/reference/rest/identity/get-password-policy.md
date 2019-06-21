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
        <td>A placeholder string that can be used to display an internationalized message to the user.</td>
      </tr>
      <tr>
        <td>parameter</td>
        <td>Object</td>
        <td>A map of parameters that can be used to display a parameterized message to the user.</td>
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

This example uses the default password policy that enforces a minimum password length and some complexity rules.

## Request

GET `/identity/password-policy`

## Response
```
{
    "rules": [
        {
            "placeholder": "PASSWORD_POLICY_LENGTH",
            "parameters": {"minLength": "10"}
        },
        {
            "placeholder": "PASSWORD_POLICY_LOWERCASE",
            "parameters": {"minLowerCase": "1"}
        },
        {
            "placeholder": "PASSWORD_POLICY_UPPERCASE",
            "parameters": {"minUpperCase": "1"}
        },
        {
            "placeholder": "PASSWORD_POLICY_DIGIT",
            "parameters": {"minDigit": "1"}
        },
        {
            "placeholder": "PASSWORD_POLICY_SPECIAL",
            "parameters": {"minSpecial": "1"}
        }
    ]
}
```