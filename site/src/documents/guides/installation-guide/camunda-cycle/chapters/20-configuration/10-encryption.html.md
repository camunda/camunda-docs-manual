---

title: 'Configuring Connector Password Encryption'
category: 'Configuration'

---

Connector passwords are encrypted before they are stored in the Cycle database using the PBEWithMD5AndDES algorithm implementation.

<div class="alert alert-info">
  <strong>Encryption key</strong>
  <br/>
  Cycle uses a default key to encrypt passwords (contained in the source code and hence not really secure).
  If you want to improve security you can exchange the encryption password by creating a file <code>$USER_HOME/cycle.password</code>
  containing a self chosen plain ASCII password.
</div>
