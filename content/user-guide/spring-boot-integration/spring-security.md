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

Camunda's integration comes with multiple components and configurations. In the next sections you can find more details to each of them.

# Activate OAuth2

## Spring Boot

In order to enable the Spring Security OAuth2 integration in Spring Boot, add the following dependency to your project:

```xml
<dependency>
  <groupId>org.camunda.bpm.springboot</groupId>
  <artifactId>camunda-bpm-spring-boot-starter-security</artifactId>
</dependency>
```

## Camunda Run

Camunda Run already contains the required libraries, all you need to do is to activate them.
In order to enable the Spring Security OAuth2 integration in Camunda Run, start Run with an extra `--oauth2` argument:

```shell
./start.sh --webapps --rest --oauth2
```

# Auto Configuration

The Camunda integration has two default auto configurations. Depending on the OAuth2 client
registration in the application properties (`spring.security.oauth2.client.registration`) either the
`CamundaSpringSecurityOAuth2AutoConfiguration` or the `CamundaBpmSpringSecurityDisableAutoConfiguration` will be activated.

## OAuth2 Enabled Configuration

Configuration activates if there is OAuth2 client registration configured. This class configures the Spring
Security filter chain to secure the Camunda Webapps.

Spring auto configuration class: {{< javadocref page="org/camunda/bpm/spring/boot/starter/security/oauth2/impl/CamundaSpringSecurityOAuth2AutoConfiguration.html" text="CamundaSpringSecurityOAuth2AutoConfiguration" >}}

## Spring Security Disabled Auto Configuration

Configuration activates if there is **no** OAuth2 client registration configured. This class configures the Spring
Security filter chain to a permit all mode.

Spring auto configuration class: {{< javadocref page="org/camunda/bpm/spring/boot/starter/security/oauth2/impl/CamundaBpmSpringSecurityDisableAutoConfiguration.html" text="CamundaBpmSpringSecurityDisableAutoConfiguration" >}}

# OAuth2 Client Registration

For the client registration, please refer to the official Spring
Security's [OAuth2 Core Configuration][OAuth2Config] documentation to configure your choice of
identity provider.

Once there is an OAuth2 client registration configured and the Camunda Spring Security OAuth2
integration is enabled, the Webapps will use the configured OAuth2 provider for
authentication.

# User Name Mapping

Camunda's integration uses the **name** field from Spring Security's principal object as the User ID
in the Webapps.

Spring Security by default uses the subject (`sub`) claim as the principal name. As the User ID in Camunda is
an important part for authorizations, it's important that the right claim is used. 

Spring Security provides a way to change the default attribute used for the username.
This is the `spring.security.oauth2.client.provider.[providerId].user-name-attribute` from the
above-mentioned [OAuth2 Core Configuration][OAuth2Config].

{{< note title="Heads Up!" class="info" >}}
Make sure to correctly configure which token attribute should be used as the User ID.
{{< /note >}}

## Configuring Initial Authorizations

For creating initial authorizations in your application, you have the following options available:

1. The `camunda.bpm.admin-user` property to create an administrator user with authorizations:
   ```yaml
   camunda.bpm:
     admin-user:
       id: demo
       password: demo
       firstName: Demo
       lastName: Demo
   ```

  - See [Camunda Engine Properties]({{< ref "/user-guide/spring-boot-integration/configuration#camunda-engine-properties" >}}) documentation for more details.
2. The [Administrator Authorization Plugin]({{< ref "/user-guide/process-engine/authorization-service.md#the-administrator-authorization-plugin" >}})
to grant administrator authorizations for a particular OAuth2 user or group.

# OAuth2 Identity Provider

Additionally to the OAuth2 login, Camunda also provides support to use groups from OAuth2.
This is achieved with a custom [identity service]({{< ref "/user-guide/process-engine/identity-service.md" >}}), called {{< javadocref page="org/camunda/bpm/spring/boot/starter/security/oauth2/impl/OAuth2IdentityProvider.html" text="OAuth2IdentityProvider" >}}.

This is a read-only identity provider that configures user's groups from the [Spring Security's granted authorities][Authorities].
This identity provider also supports the default Camunda Database Identity Service as a fallback for authentications for the REST API.

The identity provider is activated by default. You can override this with the following properties:
```yaml
camunda.bpm.oauth2:
  identity-provider:
    enabled: false
```

See [Configuration](#configuration) section for more information.

## Granted Authorities Mapper

We also provide a default granted authorities mapper, that can override the Spring Security
authorities, that are by default populated with the scope (`scp`) claim.

This mapper can be enabled with the `group-name-attribute` property:
```yaml
camunda.bpm.oauth2:
  identity-provider:
    enabled: true
    group-name-attribute: cognito:groups
```

The mapper is only activated if the property is configured.
It supports claims with types of collection of `String`s and `String`.
If the claim is a `String`, it will try to split it with a delimiter which is comma by default.
You can override the default delimiter with the `group-name-delimiter` property.

See [Configuration](#configuration) section for more information.

### Custom Granted Authorities Mapper

Alternatively, you can also define your own [GrantedAuthoritiesMapper][GrantedAuthoritiesMapper], if you need more customization.

In Spring Boot this can be done by registering your own `GrantedAuthoritiesMapper` bean.

In Camunda Run a JAR file needs to be built and copied into the `userlib` folder.
This needs to contain a [Spring auto configuration][AutoConfig] with the custom granted authorities mapper bean.

## Configuration

All configuration properties of the identity provider start with the prefix `camunda.bpm.oauth2.identity-provider`.
The following properties are available:

<table class="table table-striped">
  <tr>
    <th style="min-width: 150px">Property name</th>
    <th>Description</th>
    <th style="min-width: 100px">Default value</th>
  </tr>
  <tr>
    <th>enabled</th>
    <td>
      Enables the OAuth2 identity provider.<br/>
      <b>Enabled by default!</b>
    </td>
    <td><code>true</code></td>
  </tr>
  <tr>
    <th>group-name-attribute</th>
    <td>Enables and configures the OAuth2 Granted Authorities Mapper.</td>
    <td>-</td>
  </tr>
  <tr>
    <th>group-name-delimiter</th>
    <td>
      Configures the delimiter used in the OAuth2 Granted Authorities Mapper.
      It's only used if the configured <code>group-name-attribute</code> contains <code>String</code> value.
    </td>
    <td><code>,</code> (comma)</td>
  </tr>
</table>

## Limitations

As previously mentioned, this provider is a read-only provider, so creating users, groups or memberships is not available.
Due to the fallback to DB Identity Service this provider is still defined as writeable which means the create buttons are still visible on the Admin pages, but are non-functional.

OAuth2 doesn't return information about other users or groups. This means users and even admins can only see their own user and groups on the Admin pages.

Furthermore, it only shows groups from OAuth2 and doesn't show groups configured in Camunda database.

## Disabling Identity Provider

With the [above-mentioned property](#configuration), the identity provider can be deactivated.
Without identity provider OAuth2 is only used for authentication. This means, that the user needs to
be also configured with the matching User ID in Camunda database.

If the user is not available or doesn't have sufficient authorizations, they won't be able to access
the Webapps.

# Logout

We provide support for local and client initiated SSO logout as well.
In order to support both logouts, the Camunda integration also contains a Frontend Plugin that overrides the Webapps default logout behaviour.
As a consequence, when the Webapp user clicks on the logout, it invokes Spring's logout endpoint (`/logout`) instead of Camunda's.

## Client Initiated SSO Logout

We support client initiated OIDC SSO logout.
Please refer Spring's [OpenID Connect 1.0 Client-Initiated Logout][SSOLogout] section for more information.

In order to configure this feature, use the following properties:

```yaml
camunda.bpm.oauth2:
  sso-logout:
    enabled: true
    postLogoutRedirectUri: https://camunda.com/
```

## Configuration

All configuration properties of the identity provider start with the prefix `camunda.bpm.oauth2.sso-logout`.
The following properties are available:

<table class="table table-striped">
  <tr>
    <th style="min-width: 150px">Property name</th>
    <th>Description</th>
    <th style="min-width: 100px">Default value</th>
  </tr>
  <tr>
    <th>enabled</th>
    <td>Activates the client initiated OIDC logout feature.</td>
    <td><code>false</code></td>
  </tr>
  <tr>
    <th>post-logout-redirect-uri</th>
    <td>Configures the URI the user is redirected after SSO logout from the provider.</td>
    <td><code>{baseUrl}</code></td>
  </tr>
</table>

## Limitations

Currently, it's not possible to change the default Spring logout endpoint, which is `/logout`.

# Security Recommendations

Camunda's integration heavily relies on Spring Security's OAuth2 support.

If you decide to use OAuth2 for login in Camunda, we highly recommend to consult and implement the current industry recommended security standards.
Additionally, also follow the security recommendations specified by your identity provider.

## Token Lifetime

As OAuth2 works with the exchange of tokens and tokens are valid until the specified expiration (`exp`),
it is inevitable that in a few cases tokens might outlive the main SSO session.
Meaning, the user might be already logged out but still have valid tokens on other pages.

In order to minimize the risk of this, we recommend the use of short-lived access tokens along with
refresh tokens.
Refresh tokens can be revoked, and issuing new access tokens require interaction with the provider,
which means the user session can be revalidated more frequently.

# Logging

You can switch the level of the following logger to track bean registrations, user authentication or logout, and token authorizations.
Logging can be enabled for the package via the following property:

```yaml
logging:
  level:
    org.camunda.bpm.spring.boot.starter.security.oauth2: DEBUG
```

# Example

In this section we provide an example configuration with OKTA as OIDC provider.
Additionally, we also mark and explain a few lines:

```yaml
camunda.bpm.oauth2:
 sso-logout: # 1
   enabled: true
   postLogoutRedirectUri: https://camunda.com/
 identity-provider:
   group-name-attribute: okta-groups # 2

spring.security: # 3
 oauth2:
   client:
     registration:
       okta:
         clientId: <clientId>
         clientSecret: <clientSecret>
         scope: openid,profile,email,offline_access # 4
     provider:
       okta:
         issuerUri: <issuerUri>
         user-name-attribute: preferred_username # 5
```

1. Client initiated SSO activated, redirect uri overridden.
2. Identity provider groups loaded from custom `okta-groups` claim.
   - This also needs to be configured on the provider page in order for the id token to contain the claim.
3. Uses the traditional Spring Security properties.
   - Alternatively, `okta-spring-security-oauth2` library and its properties could be used too.
4. Defines the `openid,profile,email,offline_access` scopes.
   - Scopes are provider dependent. `openid` is required usually.
   - In case of OKTA, `profile` and `email` are useful to access firstname, lastname and email in Camunda but not mandatory.
   - `offline_access` activates the refresh_token grant, not mandatory.
5. Configures the `preferred_username` as the username attribute, which is also used as the Camunda User ID.

# Disable Auto Configuration

If you wish to use Spring Security but without Camunda's integration classes, you can do so by
excluding the two auto configuration classes:

Either with the `@EnableAutoConfiguration` annotation:

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

For more information, please refer to Spring's [Disabling Specific Auto-configuration Classes][DisableAutoConfig] documentation.

[SpringSecurity]: https://docs.spring.io/spring-security/reference/index.html
[SpringSecurityOAuth2]: https://docs.spring.io/spring-security/reference/servlet/oauth2/index.html
[OAuth2Config]: https://docs.spring.io/spring-security/reference/servlet/oauth2/login/core.html
[Authorities]: https://docs.spring.io/spring-security/reference/servlet/authorization/architecture.html
[GrantedAuthoritiesMapper]: https://docs.spring.io/spring-security/reference/servlet/oauth2/login/advanced.html#oauth2login-advanced-map-authorities
[DisableAutoConfig]: https://docs.spring.io/spring-boot/reference/using/auto-configuration.html#using.auto-configuration.disabling-specific
[AutoConfig]: https://docs.spring.io/spring-boot/reference/features/developing-auto-configuration.html#features.developing-auto-configuration.locating-auto-configuration-candidates
[SSOLogout]: https://docs.spring.io/spring-security/reference/reactive/oauth2/login/logout.html#oauth2login-advanced-oidc-logout

