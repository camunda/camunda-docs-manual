---

title: 'Password Policy'
weight: 155

menu:
  main:
    identifier: "user-guide-process-engine-password-policy"
    parent: "user-guide-process-engine"

---
This chapter is about configuring and using a password policy for engine-managed user accounts. A password policy makes sure that only passwords that meet certain criteria are allowed. A policy can consist of any number of rules. Violation of one of the policy's rules results in an error and the user not being saved.

Since version 7.11.0, the engine comes with a standard password policy that is disabled by default and must be configured to use.

**Note:** This only applies to users that are managed within the Camunda engine. If you use LDAP for your user management a password policy has no effect on these users.

# Built-In Password Policy

The built-in password policy requires all passwords to meet the following criteria:

* user data (i.e., user id, first name, last name, email) must not be contained
* minimum length of 10 characters
* at least 1 upper case character
* at least 1 lower case character
* at least 1 digit
* at least 1 special character

# Customize the Password Policy

You can use the process engine configuration to enable / disable the password policy or plug in a custom policy. See [Process Engine Bootstrapping](../process-engine-bootstrapping) on how to set properties for your Camunda environment.

To enable or disable the password policy checks you need to set the `enablePasswordPolicy` property.

If you want to use a custom password policy you can do this by implementing the `PasswordPolicy` and `PasswordPolicyRule` interfaces from the `org.camunda.bpm.engine.identity` package and provide your implementation to the process engine configuration by setting the `passwordPolicy` property.

```java
public class MyPasswordPolicy implements PasswordPolicy {

  @Override
  public List<PasswordPolicyRule> getRules() {
    // create rules
  }
}
```
```java
public class MyPasswordPolicyRule implements PasswordPolicyRule {

  @Override
  public String getPlaceholder() {
    // This placeholder can be used to display internationalized error messages.
    return "PASSWORD_POLICY_RULE_PLACEHOLDER";
  }

  @Override
  public Map<String, String> getParameters() {
    // These parameters can be injected into error messages.
  }

  @Override
  public boolean execute(String candidatePassword, User user) {
    // validate the candidate password
    // return true if valid or false if invalid
  }
}
```
By providing a rule placeholder and parameters via `getPlaceholder` and `getParameters` a custom front end can display error messages based on the rules and their configuration. (e.g. "The password must at least have a length of X characters" with X being configurable and passed within the parameter map)

A rules `execute` method checks if the entered password meets this rule or not. It is executed when trying to save a user.