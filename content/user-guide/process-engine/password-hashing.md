---

title: 'Password Hashing'
weight: 150

menu:
  main:
    identifier: "user-guide-process-engine-password-hashing"
    parent: "user-guide-process-engine"

---

This chapter is about how cryptographic password hashing is done in the Camunda platform. In particular, the hashing algorithm that is beeing used and the salt generation. If you are not familiar with these topics, we recommend reading the articles about [cryptographic hash function](https://en.wikipedia.org/wiki/Cryptographic_hash_function), [salt](https://en.wikipedia.org/wiki/Salt_(cryptography)) and [secure password hashing](https://crackstation.net/hashing-security.htm). 

The Camunda version 7.6 and earlier use the cryptographic hash function [SHA-1](https://en.wikipedia.org/wiki/SHA-1). It is a standard used in many applications. The reason for SHA-1 as default setting is to have a fast algorithm that provides minimum security. Using SHA-1 for cryptographic purposes is not recommended anymore since it is becoming cheaper to find hash collisions (i.e. any two values that produce the same hash). Therefore, since Camunda version 7.7 the more secure hash function [SHA-512](https://en.wikipedia.org/wiki/SHA-2) is used. In gerenal, this algorithm is considered to be secure for most casese. However, if there is a need for another custom hash function, it is possible to plugin a [custom password hashing algorithm](#customize-the-hashing-algorithm) in Camunda.

For each password is also a randomized salt beeing created and non-secretly stored to the database. Before the password is encrypted the salt is concatenated to the password. To ensure secure randomization of the salt, the [SecureRandom](http://docs.oracle.com/javase/6/docs/api/java/security/SecureRandom.html) class was used. The default length of the salt is 16 byte. This length is mostly considered to be secure. However, it is possible to [customizing the salt generation](#customize-the-salt-generation) if desired.

# Customize the Hashing Algorithm

If it is necessary to use a more secure hash algorithm, one can provide its own implementation.

You can do this by implementing the `PasswordEncryptor` interface from the `org.camunda.bpm.engine.impl.digest` package. The interface ensures that all necessary functions for password hashing are implemented. You can have a look at the classes `Base64EncodedHashDigest` and `ShaHashDigest` from the `org.camunda.bpm.engine.impl.digest` package on how this is done in Camunda. A template for your own implementation could look like the following:


```java
public class MyPasswordEncryptor implements PasswordEncryptor {

  @Override
  public String encrypt(String password) {
    // do something
  }

  @Override
  public boolean check(String password, String encrypted) {
    // do something
  }
  
  @Override
  public String hashAlgorithmName() {
	// This name is used to resolve the algorithm used for the encryption of a password.
	return "NAME_OF_THE_ALGORITHM";
  }
}
```

Once this is done, you can use the process engine configuration to plug in the custom implementation by the setting the `passwordEncryptor` property to your custom implmentation, e.g., `MyPasswordEncryptor`. See [Process Engine Bootstrapping](../process-engine-bootstrapping) on where you have to set the property for your Camunda environment. 

Note that, even if, you have already users created with passwords hashed by other algorithms, e.g., old custom algorithms or the Camunda default hash algorithm `SHA-512`, they can still automatically be resolved by the engine although you have added you custom algorithm afterwards. The property `customPasswordChecker` is a list of hashing algrithms to be used for checking of (older) passwords. The Camunda default hashing algorithms are automatically added, so please only add your previous custom `passwordEncryptor` implementation to that list.

{{< note title="Heads Up!" class="info" >}}

Please do not use your own implementation of a hash function, but rather a standard that has been peer reviewed!

{{< /note >}}


# Customize the Salt generation

Similar to the hashing algorithm, can the salt generation be adjusted. First, implement the `SaltGenerator` interface from the `org.camunda.bpm.engine.impl.digest`. This ensures that all necessary function are being implemented. You can have a look at the classes `Base64EncodedSaltGenerator` and `Default16ByteSaltGenerator` from the `org.camunda.bpm.engine.impl.digest` package on how this is done in Camunda. A template for your own implementation could look like the following:

```java
public class MyCustomSaltGenerator implements SaltGenerator {

  @Override
  public String generateSalt() {
    // do something
  }
}
```

Once this is done, you can use the process engine configuration to plug in the custom implementation by the setting the `saltGenerator` property to your custom implmentation, e.g., `MyCustomSaltGenerator`. See [Process Engine Bootstrapping](../process-engine-bootstrapping) on where you have to set the property for your Camunda environment.




