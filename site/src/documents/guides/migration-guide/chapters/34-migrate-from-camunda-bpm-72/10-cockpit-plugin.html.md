---

title: 'Migrating a Cockpit Plugin'
category: 'Migrate from Camunda BPM 7.2 to 7.3'

---

As of version 7.3, the use of [ngDefine](http://nikku.github.io/requirejs-angular-define/) in Cockpit and Admin Plugins is deprecated. You are encouraged to use [requireJS](http://requirejs.org/) instead. For information about the use of requireJS in plugins, see the [How to develop a Cockpit Plugin](ref:/real-life/how-to/#cockpit-how-to-develop-a-cockpit-plugin) Tutorial or the migration information below.

ngDefine remains part of the Cockpit and Admin app for backwards compatability, but may be removed in the future. ngDefine is not part of the Tasklist app. Tasklist plugins must be written using requireJS.

This change only affects the client side of the plugins. The server side does not have to be changed.

### Replace ngDefine with define call

With ngDefine, you could create an angular module with its dependencies using the ngDefine call:

```javascript
ngDefine('cockpit.plugin.myPlugin', [
  'jquery',
  'angular',
  'http://some-url/some-library.js',
  'module:some.other.angularModule:./someOtherModule.js'
], function(ngModule, $, angular) {
  // ...
});
```

From 7.3 onwards, you have to load dependencies using a define call and create and return the angular module in the callback:

```javascript
define([
  'jquery',
  'angular',
  'http://some-url/some-library.js',
  './someOtherModule.js'
], function($, angular) {

  var ngModule = angular.module('cockpit.plugin.myPlugin', ['some.other.angularModule']);

  // ...

  return ngModule;
});
```
