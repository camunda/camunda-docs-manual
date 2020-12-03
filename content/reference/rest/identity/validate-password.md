---

title: "Validate Password"
weight: 40

menu:
  main:
    name: "Validate Password"
    identifier: "rest-api-identity-password-policy-validate"
    parent: "rest-api-identity"
    pre: "POST `/identity/password-policy`"

---
A password policy consists of a list of rules that new passwords must follow to be policy compliant. A password can be checked for compliancy via this end point.

More information on password policies in Camunda can be found in the password policy [user guide]({{< ref "/user-guide/process-engine/password-policy.md" >}}) and in the [security instructions]({{< ref "/user-guide/security.md" >}}).

# Method

POST `/identity/password-policy`

# Parameters

## Request Body

A JSON object with the following properties:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>password</td>
    <td>String</td>
    <td>The candidate password to be check against the password policy.</td>
  </tr>
  <tr>
    <td>profile</td>
    <td>Object</td>
    <td>
        A JSON object containing variable key-value pairs. <br>
        The object can contain the following properties: 
        id (String), firstName (String), lastName (String) and email (String).</td>
  </tr>
</table>

# Result

The response contains a JSON object corresponding to the `PasswordPolicyResult` interface in the engine.
Its properties are as follows:

<table class="table table-striped">
  <tr>
    <th>Name</th>
    <th>Value</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>valid</td>
    <td>Boolean</td>
    <td>true if the password is compliant with the policy, otherwise false</td>
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
        <td>parameters</td>
        <td>Object</td>
        <td>A map of parameters that can be used to display a parameterized message to the user.</td>
      </tr>
      <tr>
        <td>valid</td>
        <td>Boolean</td>
        <td>true if the password is compliant with this rule, otherwise false</td>
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
    <td></td>
    <td>Request successful.</td>
  </tr>
  <tr>
    <td>404</td>
    <td>application/json</td>
    <td>No password policy was found to check the password against.</td>
  </tr>
</table>

# Example

This example uses the built-in password policy that enforces a minimum password length, and some complexity rules. The checked password is `myPassword` which is not complex enough to match all of the policy rules.

## Request

POST `/identity/password-policy`

Request Body:
```
{
   "password": "myPassword",
   "profile": {
      "id": "jonny1",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jonny@camunda.org"
   }
}
```

## Response
```
{
    "rules": [
        {
           "placeholder": "PASSWORD_POLICY_USER_DATA",
           "parameter": null,
           "valid": true
        },
        {
            "placeholder": "PASSWORD_POLICY_LOWERCASE",
            "parameter": {"minLowerCase": "1"},
            "valid": true
        },
        {
            "placeholder": "PASSWORD_POLICY_LENGTH",
            "parameter": {"minLength": "10"},
            "valid": false
        },
        {
            "placeholder": PASSWORD_POLICY_UPPERCASE",
            "parameter": {"minUpperCase": "1"},
            "valid": false
        },
        {
            "placeholder": "PASSWORD_POLICY_DIGIT",
            "parameter": {"minDigit": "1"},
            "valid": false
        },
        {
            "placeholder": "PASSWORD_POLICY_SPECIAL",
            "parameter": {"minSpecial": "1"},
            "valid": false
        }
    ],
    "valid": false
}
```