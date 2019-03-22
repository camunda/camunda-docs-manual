---

title: "Validate Password"
weight: 30

menu:
  main:
    name: "Validate Password"
    identifier: "rest-api-password-policy-validate"
    parent: "rest-api-password-policy"
    pre: "POST `/password-policy`"

---
A password policy consists of a list of rules that new passwords must follow to be policy compliant. A password can be checked for compliancy via this endpoint.

More information on password policies in Camund can be found in the password policy [user guide]({{< ref "/user-guide/process-engine/password-policy.md" >}}) and in the [security instructions]({{< ref "/user-guide/security.md" >}}).

# Method

POST `/password-policy`

# Result

If the password is not compliant with the password policy a JSON object corresponding to the `PasswordPolicy` interface in the engine will be returned.
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
    <td>204</td>
    <td></td>
    <td>Request successful. The password matches all policy rules and thus is compliant with the policy.</td>
  </tr>
  <tr>
    <td>400</td>
    <td>application/json</td>
    <td>The password does not match at least one policy rule. The password is not policy-compliant. The returned JSON contains a description of the password policy.</td>
  </tr>
</table>

# Example

This example uses the default password policy that enforces a minimum password length and some complexity rules. The checked password is `myPassword` which is not complex enough so the response contains a description of the enforced rules.

## Request

POST `/password-policy`

Request Body:
```
{
  "password": "myPassword"
}
```

## Response
```
{
    "rules": [
        {
            "placeholder": "LENGTH",
            "parameter": {"minLength": "10"}
        },
        {
            "placeholder": "LOWERCASE",
            "parameter": {"minLowerCase": "1"}
        },
        {
            "placeholder": "UPPERCASE",
            "parameter": {"minUpperCase": "1"}
        },
        {
            "placeholder": "DIGIT",
            "parameter": {"minDigit": "1"}
        },
        {
            "placeholder": "SPECIAL",
            "parameter": {"minSpecial": "1"}
        }
    ]
}
```