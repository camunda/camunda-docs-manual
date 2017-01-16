---

title: 'Password Hashing'
weight: 150

menu:
  main:
    identifier: "user-guide-process-engine-password-hashing"
    parent: "user-guide-process-engine"

---

Cryptographic password hashing is used to reduce the danger of a security breach, when the database is compromised. Assuming that the user passwords would be stored as cleartext, then an attacker that has access to the database could retrieve all credentials in Camunda and log in as an arbitrary user. To prevent such a breach, all passwords in Camunda:

* are [hashed](#default-password-hashing-algorithm)
* are [salted](#salt)

If the default implementation does not correspond to certain security demands, it is possible to [customize the hashing mechanism](#customize-password-hashing).

# Default Password Hashing Algorithm

A hash function is always a one-way function, that maps an amount of data to fixed size value that cannot be reversed. In terms of password verification is the cleartext password tranformed into hash digest. Thus, given the hash value it is in theory not possible to retrieve the original password.

By default Camunda uses the cryptographic hash function [SHA-1](https://en.wikipedia.org/wiki/SHA-1). It is a standard used in many applications. The reason for SHA-1 as default setting is to have a fast algorithm that provides minimum security. 

# Salt

If all passwords are hashed the same way, it is possbile to acquire the passwords using [dictionary attacks](https://en.wikipedia.org/wiki/Dictionary_attack) or [rainbox tables](https://en.wikipedia.org/wiki/Rainbow_table). The idea behind those attacks is to precompute a set of hashes or compute the hashes instantly with enormous speed so the original password can be retrieved. 

The danger of those attacks can be reduced by using salt. For each password randomized data, called salt, is created and non-secretly stored to the database. Before the password is encrypted the salt is concatenated to the password, making it harder to compromise the password. To ensure secure randomization of the salt, the [SecureRandom](http://docs.oracle.com/javase/6/docs/api/java/security/SecureRandom.html) class was used. The default length of the salt is 16 byte.

# Customize Password Hashing

Using SHA-1 for cryptographic purposes is not recommended anymore since it is becoming cheaper to find hash collisions (i.e. any two values that produce the same hash). This is not an acute problem, since this is not equivalent to finding a clear text password that produces the same hash for a given hash, or even finding the clear text password for a hash. Yet, it is an indicator for SHA-1 becoming weaker and if maximum security is an objective, you should think about providing your [custom password hashing algorithm](#customize-the-hashing-algorithm).

Apart from the hashing algorithm is the salt length a major concern for password protection. If the length is too short, precomputing lookup tables can be very easy. A salt length of 16 byte is mostly considered to be secure. However, to make the creation of rainbow tables even harder, it is possible to [increase the salt length](#customize-the-salt-length).

## Customize the Hashing Algorithm

If it is necessary to use a more secure hash algorithm, one can provide its own implementation.

You can do this by implementing the `PasswordEncryptor` interface and extending the abstract class `Base64EncodedHashDigest` from the `org.camunda.bpm.engine.impl.digest` package. The interface ensures that all necessary functions for password hashing are implemented and the abstract class encodes the password to the Base64 encoding. An example could for example look like the following:


```java
public class MyCustomPasswordEncryptor extends Base64EncodedHashDigest implements PasswordEncryptor {

  protected ShaHashDigest digest = new ShaHashDigest();
  
  protected String getAlgorithmName() {
    return "YOUR_CUSTOM_ALGORITHM";
  }
  
  @Override
  public String encrypt(String password) {
    return "{YOUR_CUSTOM_ALGORITHM}" + super.encrypt(password);
  }
  
  @Override
  public boolean check(String password, String encrypted) {
    if(encrypted.startsWith("{SHA}")){
      return digest.check(password, encrypted);
    }
    return super.check(password, encrypted);
  }

}
```

Make sure you replace `YOUR_CUSTOM_ALGORITHM` with one of the values from the [MessageDigest](https://docs.oracle.com/javase/7/docs/technotes/guides/security/StandardNames.html#MessageDigest) section of the Java Cryptography Architecture Standard Algorithm Name Documentation. Examples would be `SHA-256` or `SHA-512`. Note that the prefix `{YOUR_CUSTOM_ALGORITHM}` is used to identify the algorithm. By default, the value is `{SHA}`, which can be used compare old passwords by overwriting the `check` method.

Once this is done, you can use the process engine configuration plug in the custom implementation. In the given example the custom password encryptor could now be deployed as follows:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration">
	<!-- Your property definitions! -->
					....

	<property name="passwordEncryptor">
			<bean class="com.mycompany.path.to.MyCustomPasswordEncryptor" />
	</property>
</bean>

```
where you should adapt the path and name of `com.mycompany.path.to.MyCustomPasswordEncryptor`.

{{< note title="Heads Up!" class="info" >}}

Please do not use your own implementation of a hash function, but rather a standard that has been review!

{{< /note >}}


## Customize the Salt Length

Similar to the hashing algorithm, can the salt length be adjusted.

First, extend the `Base64EncodedSaltGenerator` from the `org.camunda.bpm.engine.impl.digest`. This ensures that the salt correctly encoded and all necessary function are being implemented. An example could look like the following:

```java
public class MyCustomSaltGenerator extends Base64EncodedSaltGenerator {

  @Override
  Integer getSaltLengthInByte() {
    return YOUR_SALT_LENGTH;
  }
}
```

Make sure to replace `YOUR_SALT_LENGTH` with the desired value, e.g., `32`. 

Once this is done, you can use the process engine configuration plug in the custom implementation. In the given example the custom password encryptor could now be deployed as follows:

```xml
<bean id="processEngineConfiguration" class="org.camunda.bpm.engine.impl.cfg.StandaloneInMemProcessEngineConfiguration">
	<!-- Your property definitions! -->
					....

	<property name="saltGenerator">
			<bean class="com.mycompany.path.to.MyCustomSaltGenerator" />
	</property>
</bean>

```
where you should adapt the path and name of `com.mycompany.path.to.MyCustomPasswordEncryptor`.



