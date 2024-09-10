---

title: 'Spring Security OAuth2 Integration'
weight: 80

menu:
  main:
    identifier: "user-guide-spring-security-integration"
    parent: "user-guide-spring-boot-integration"

---


Camunda provides Spring Security OAuth2 integration with the `camunda-bpm-spring-boot-starter-security` library.
This library contains the Spring Security and Spring Security OAuth2 dependencies along with
configuration classes that integrate Spring Security with Camunda Webapp's authentication.

This is available both for Spring Boot and Camunda Run.

# Spring Boot

In order to enable the Spring Security OAuth2 integration in Spring Boot, add the following dependency to your project:

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-security</artifactId>
</dependency>
```

# Camunda Run

In order to enable the Spring Security OAuth2 integration in Camunda Run, start Run with an extra `--oauth2` argument:

```shell
./start.sh --webapps --rest --example --oauth2
```

# Auto Configuration

The Camunda integration has two default auto configurations. Depending on the OAuth2 client
registration in the application properties (`spring.security.oauth2.client.registration`) either the
`CamundaSpringSecurityOAuth2AutoConfiguration` or the `CamundaBpmSpringSecurityDisableAutoConfiguration` will be used.

## OAuth2 Auto Configuration


Starts if there is OAuth2 client registration configured. This class configures the Spring
Security filter chain to a permit all mode.

Spring auto configuration class: {{< javadocref page="org/camunda/bpm/spring/boot/starter/security/oauth2/impl/CamundaSpringSecurityOAuth2AutoConfiguration.html" text="CamundaSpringSecurityOAuth2AutoConfiguration" >}}

## Disable Auto Configuration

Starts if there is **no** OAuth2 client registration configured. This class configures the Spring
Security filter chain to a permit all mode.

Spring auto configuration class: {{< javadocref page="org/camunda/bpm/spring/boot/starter/security/oauth2/impl/CamundaBpmSpringSecurityDisableAutoConfiguration.html" text="CamundaBpmSpringSecurityDisableAutoConfiguration" >}}


# OAuth2 Integration

Once the Camunda Spring Security OAuth2 integration is active and there is an OAuth2 client
registration configured, the Webapps will use the configured OAuth2 identity provider for authentication.

For the client registration, please refer to the official Spring Security's [OAuth2 Core Configuration][OAuth2Config] documentation to configure your choice of identity provider.

Camunda's integration uses the **name** field from Spring Security's principal object for the user
authentication. This needs to match the User ID in Camunda.

{{< note title="Heads Up!" class="info" >}}
At this stage, OAuth2 is only used for authentication. Meaning, that the user needs to be
also configured with the matching User ID and proper authorizations in Camunda.

If the user is not available or doesn't have sufficient authorizations, they won't be able to access the Webapps.
{{< /note >}}

### User Name Mapping

Spring Security provides an attribute to override the default scope (`sub`) used for the username.
This is the `spring.security.oauth2.client.provider.[providerId].user-name-attribute` from the
above-mentioned [OAuth2 Core Configuration][OAuth2Config].

If you wish to use a default attribute (claim) as the username, then make sure to override the `user-name-attribute` in your application properties.

### Initial User

In order to create an initial user in your application, you can either use the `camunda.bpm.admin-user` property:

```yaml
camunda.bpm:
  admin-user:
    id: demo
    password: demo
    firstName: Demo
    lastName: Demo
```

Or the `AdministratorAuthorizationPlugin`, see [The Administrator Authorization Plugin]({{< ref "/user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}}) documentation for more details. 


## OAuth2 Identity Provider

Additionally to the OAuth2 login, Camunda also provides support to use groups from OAuth2.
This is achieved with a custom [identity service]({{< ref "/user-guide/process-engine/identity-service.md" >}}), called {{< javadocref page="org/camunda/bpm/spring/boot/starter/security/oauth2/impl/OAuth2IdentityProvider.html" text="OAuth2IdentityProvider" >}}

This is a read-only identity provider that configures user's groups from the [Spring Security's granted authorities][Authorities].
Additionally, the identity provider also contains the default Camunda Database Identity Service as a fallback.

TODO add more details

In order to activate this, add the following properties:
```yaml
camunda.bpm.oauth2:
  identity-provider:
    enabled: true
```

### Authorities mapping

We also provide a default granted authorities mapper, that can override the Spring Security
authorities, that are populated by default with the scope claim.

This mapper can be enabled with the `camunda.bpm.oauth2.identity-provider.group-name-attribute` property:
```yaml
camunda.bpm.oauth2:
  identity-provider:
    enabled: true
    group-name-attribute: cognito:groups
```

Alternatively, you can also define your own [GrantedAuthoritiesMapper][GrantedAuthoritiesMapper], if you need more customization.

## Security Recommendations

If you decide to use OAuth2 for login in Camunda, we highly recommend to consult and implement the current industry recommended security standards.
Additionally, also follow the security recommendations specified by your identity provider.

### Token Lifetime

As OAuth2 works with the exchange of tokens and tokens are valid until the specified expiration (
`exp` claim), it is inevitable that in a few cases tokens might outlive the main SSO session.
Meaning, the user might be already logged out but still have valid tokens on other pages.

In order to minimize the occurrence if this, we recommend the use of short-lived access tokens along with refresh tokens.

TODO add some links
? https://datatracker.ietf.org/doc/html/draft-ietf-oauth-security-topics


## Disabling Auto Configuration

If you wish to completely disable Camunda's integration, refer to Spring's [Disabling Specific Auto-configuration Classes][DisableAutoConfig] documentation.

With the `@EnableAutoConfiguration` annotation:

```java
@EnableAutoConfiguration(exclude={
    CamundaSpringSecurityOAuth2AutoConfiguration.class,
    CamundaBpmSpringSecurityDisableAutoConfiguration.class
});
```

Or in the application properties:

```yaml
spring:
  autoconfigure:
    exclude:
      - org.camunda.bpm.spring.boot.starter.security.oauth2.CamundaSpringSecurityOAuth2AutoConfiguration
      - org.camunda.bpm.spring.boot.starter.security.oauth2.CamundaBpmSpringSecurityDisableAutoConfiguration
```

[SpringSecurity]: https://docs.spring.io/spring-security/reference/index.html
[SpringSecurityOAuth2]: https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html
[OAuth2Config]: https://docs.spring.io/spring-security/reference/servlet/oauth2/login/core.html
[Authorities]: https://docs.spring.io/spring-security/reference/servlet/authorization/architecture.html
[GrantedAuthoritiesMapper]: https://docs.spring.io/spring-security/reference/servlet/oauth2/login/advanced.html#oauth2login-advanced-map-authorities
[DisableAutoConfig]: https://docs.spring.io/spring-boot/reference/using/auto-configuration.html#using.auto-configuration.disabling-specific

