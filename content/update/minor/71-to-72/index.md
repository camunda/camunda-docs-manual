---

title: "Update from 7.1 to 7.2"
weight: 110

menu:
  main:
    name: "7.1 to 7.2"
    identifier: "migration-guide-71"
    parent: "migration-guide-minor"

---

The following guide covers these use cases:

1. For administrators and developers: Migrate the database
2. For administrators and developers: Migrating a shared process engine setting
3. For administrators and developers: Migrating an embedded process engine setting
4. For developers: Migrating embedded task forms
5. For developers: Migrating a Cockpit plugin

This guide covers mandatory migration steps as well as optional steps that can be carried out to enable or disable new functionality included in Camunda BPM 7.2. The following concepts were introduced with Camunda BPM 7.2:

* **CMMN:** [Case Management Model And Notation][cmmn-ref] (CMMN) is a modelling standard similar to BPMN that focuses on human-centric processes. Camunda BPM 7.2 implements this standard and therefore extends the database schema during upgrade. If you do not plan to use CMMN, these tables will stay empty.
* **Spin/Connect:** Camunda [Spin][spin-ref] and [Connect][connect-ref] are optional Camunda extensions that ease the use of text-based data formats and connectivity in processes. Spin and Connect are separate modules that have to be explicitly added to and configured in an existing installation. This guide shows you how to enable/disable the usage of Spin and Connect.
* **Freemarker:** This optional Camunda extension provides a [scripting engine for the templating language Freemarker][freemarker-ref] that allows to use Freemarker as scripts in process constructs.

Before migrating, decide whether you additionally want to enable Spin/Connect and Freemarker. Based on this decision, you may have to carry out additional migration steps.

[cmmn-ref]: ref:/api-references/cmmn10/
[connect-ref]: ref:/guides/user-guide/#process-engine-connectors
[spin-ref]: /guides/user-guide/#data-formats-xml-json-other
[freemarker-ref]: /guides/user-guide/#process-engine-templating


# Migrate your Database

For migration from **Camunda BPM 7.1** to **Camunda BPM 7.2**, the provided upgrade scripts that match your database have to be executed. With a pre-built distribution, the upgrade scripts are located in the folder `$DISTRIBUTION_PATH/sql/upgrade`.

If you migrate from a version < 7.1.4 or have not previously executed the 7.1.5 patch script, you have to execute the SQL script `$DATABASE_engine_7.1_patch_7.1.4_to_7.1.5.sql` first, where `$DATABASE` corresponds to the database platform you use.

If you migrate from a version < 7.1.10, you will have to execute the SQL script `$DATABASE_engine_7.1_patch_7.1.9_to_7.1.10.sql`.

Check [available SQL patch scripts](ref:/guides/migration-guide/#patch-level-upgrade-upgrade-your-database-available-sql-patch-scripts) for an overview of available SQL patch scripts for your current version.

Regardless of the version you are migrating from, the main upgrade script is `$DATABASE_engine_7.1_to_7.2.sql` and has to be executed next.


# Migrating a Shared Process Engine Setting

When migrating a Camunda BPM shared engine installation, i.e., a scenario in which the process engine is configured as a central service on the application server, the following steps are required:

1. Upgrade of the Camunda libraries on the application server and optional configuration
2. Migrate process applications

Prerequisites:

* Before starting, make sure that you have downloaded the Camunda BPM 7.2 distribution for the application server you use. It contains the SQL scripts and libraries required for upgrade. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## 1. Upgrade of the Camunda Libraries on the Application Server and Optional Configuration

Please choose the application server you are working with from the following list. You will be redirected to Camunda's installation guide.

* [Apache Tomcat][tomcat-migration]
* [JBoss][jboss-migration]
* [Glassfish][glassfish-migration]
* [IBM WebSphere][websphere-migration]
* [Oracle WebLogic][weblogic-migration]

## 2. Migration Process Applications

For every process application, the Camunda dependencies should be upgraded to the new Camunda version you are using. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies. That means, upgrading the version should suffice to migrate a process application in terms of dependencies.

[tomcat-migration]: ref:/guides/installation-guide/tomcat/#migration-migrate-from-camunda-bpm-71-to-camunda-bpm-72
[jboss-migration]: ref:/guides/installation-guide/jboss/#migration-migrate-from-camunda-bpm-71-to-camunda-bpm-72
[glassfish-migration]: ref:/guides/installation-guide/glassfish/#migration-migrate-from-camunda-bpm-71-to-camunda-bpm-72
[websphere-migration]: ref:/guides/installation-guide/was/#migration-migrate-from-camunda-bpm-71-to-camunda-bpm-72
[weblogic-migration]: ref:/guides/installation-guide/wls/#migration-migrate-from-camunda-bpm-71-to-camunda-bpm-72


# Migrating an Embedded Process Engine Setting

When migrating a Camunda BPM embedded engine, i.e., a process engine that is managed entirely within an application and bound to that application's lifecycle, the following steps are required:

1. Configure process engines (*optional*)
2. Upgrade Camunda dependencies

Prerequisites:

* Before starting, make sure that you have downloaded the Camunda BPM 7.2 distribution for the application server you use. It contains the SQL scripts required for upgrade. This guide assumes you have unpacked the distribution to a path named `$DISTRIBUTION_PATH`.

## 1. Configure Process Engines

This section describes a change in the engine's default behavior. While the change is reasonable, your implementation may rely on the previous default behavior. Thus, the previous behavior can be restored by explicitly setting a configuration option. Accordingly, this section applies to any embedded process engine but is not required for a successful upgrade.

#### Script Variable Storing

As of 7.2, the default behavior of script variables has changed. Script variables are set in e.g., a BPMN Script Task that uses a language such as JavaScript or Groovy. In previous versions, the process engine automatically stored all script variables as process variables. Starting with 7.2, this behavior has changed and the process engine does not automatically store script variables any longer. You can re-enable the legacy behavior by setting the boolean property `autoStoreScriptVariables` to `true` in your process engines' configurations. Depending on your scenario, this may involve updating a `camunda.cfg.xml` file, a `processes.xml` file or a programmatic configuration. For example, in a `camunda.cfg.xml` file, the property can be set as follows:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpm-platform ...>
  ...
  <process-engine name="default">
    ...
    <properties>
      ... existing properties ...
      <property name="autoStoreScriptVariables">true</property>
    </properties>
    ...
  </process-engine>
  ...
</bpm-platform>
```

As an alternative, script code can be migrated by replacing all implicit declarations of process variables in scripts with an explicit call to `execution.setVariable('varName', 'value')`.


## 2. Upgrade Camunda Dependencies

Upgrade the dependencies declared in your application's `pom.xml` file to the new Camunda version you are using. Which dependencies you have is application- and server-specific. Typically, the dependencies consist of any of the following:

* `camunda-engine`
* `camunda-bpmn-model`
* `camunda-engine-spring`
* `camunda-engine-cdi`
* `camunda-ejb-client`
* ...

There are no new mandatory dependencies. That means, upgrading the version should suffice to migrate a process application in terms of dependencies.


# Migrating Embedded Task Forms

Embedded form support has been redesigned in Camunda BPM 7.2 and existing forms must be migrated.

> Documentation on embedded forms support in 7.2 can be found in the [Embedded Forms Reference](ref:/api-references/embedded-forms/)

# Overview

The following APIs / behavior has changed:

* The `form-field` directive has been replaced with `cam-variable-name` and `cam-variable-type`.
* The form now has a defined lifecycle (`form-loaded`, `variables-fetched`, ...) for which callbacks / event listeners can be provided.
* In 7.1, all process instance scope variables were fetched. In 7.2 only the variables used in the form are fetched. The variables are retrieved from the task scope and its parent scopes.

In the remainder of this section, we walk through these changes in detail.

# The `form-field` directive

The form field directive is not supported in 7.2. HTML controls using the `form-field` directive need to be migrated.

The `form-field` directive was replaced by

* `cam-variable-name`: provides the name of the variable.
* `cam-variable-type`: provides the type of the variable.

### The `form-field` directive on Input Fields

In 7.1, the `form-field` directive was used on input fields of the following form

```html
<input form-field name="[variableName]" type="[type]" />
```

#### The `name` Attribute

In 7.2, the HTML `name` attribute is not used anymore for providing the name of the process variable. In 7.2, the `cam-variable-name` attribute must be used:

```html
<input name="someName"
       cam-variable-name="[variableName]" />
```

#### The `type` Attribute

In 7.2 the HTML `type` attribute is not used anymore for providing the type of the variable. Instead, the `cam-variable-type` attribute is used:

```html
<input name="someName"
       type="text|checkbox|hidden|..."
       cam-variable-name="[variableName]"
       cam-variable-type="[variableType]" />
```

> Note: The `cam-variable-type` attribute is only required if the variable does not yet exist. If the variable already exists in the process, the attribute is not required.

##### Boolean

In 7.1 a boolean input field looked like this:

```html
<input form-field name="VAR_NAME" type="boolean" />
```

In 7.2 it looks like this:

```html
<input type="checkbox"
       cam-variable-name="VAR_NAME"
       cam-variable-type="Boolean" />
```

##### String

In 7.1 a string input field looked like this:

```html
<input form-field name="VAR_NAME" type="string" />
```

In 7.2 it looks like this:

```html
<input type="text"
       cam-variable-name="VAR_NAME"
       cam-variable-type="String" />
```

##### Number

In 7.1 a number input field looked like this:

```html
<input form-field name="VAR_NAME" type="number" />
```

In 7.2 it looks like this:

```html
<input type="text"
       cam-variable-name="VAR_NAME"
       cam-variable-type="Integer|Long|Short|Float|Double" />
```

##### Date

In 7.1 a date input field looked like this:

```html
<input form-field name="VAR_NAME" type="date" />
```

In 7.2 it looks like this:

```html
<input type="text"
       cam-variable-name="VAR_NAME"
       cam-variable-type="Date" />
```

> See this [Note on Datepickers](ref:/api-references/embedded-forms/#supported-html-controls-date-inputs-using-a-date-picker)

### The `form-field` Directive on Select Boxes

In 7.1, select boxes had the following form:

```html
<select form-field
        name="[variableName]"
        type="[type]"
        form-values="[optionsVarName]">
  <option value="[value]">[label]</option>
  <option value="[value]">[label]</option>
</select>
```

In 7.2, select boxes have the following form:

```html
<select cam-variable-name="[variableName]"
        cam-variable-type="[type]"
        cam-choices="[optionsVarName]">
  <option value="[value]">[label]</option>
  <option value="[value]">[label]</option>
</select>
```

#### Serialized List and Map

In 7.1 a serialized `java.util.List` and `java.util.Map` instance could be used for populating the `form-values="[optionsVarName]"`. In 7.2, this is possible in combination with the `cam-choices="[optionsVarName]"` directive. However, the lists and maps need to be serialized using the `application/json` dataformat:

```java
Map<String, String> productTypes = new HashMap<String, String>();
productTypes.put("001", "Notebook");
productTypes.put("002", "Server");
productTypes.put("003", "Workstation");

execution.setVariable("AVAILABLE_PRODUCT_TYPES",
  objectValue(customerData)
    .serializationDataFormat(SerializationDataFormats.JSON)
    .create());
```

### The `form-field` Directive on a Textarea

In 7.1 a textarea control had the following form:

```html
<textarea form-field name="[variableName]"></textarea>
```

In 7.2, it has the following form:

```html
<textarea name="someName"
          cam-variable-name="[variableName]"
          cam-variable-type="String"></textarea>
```

# Fetching additional variables

In 7.1 all variables from the process instance scope were fetched. In 7.2 the form needs to declare the variables it wants to fetch. This can be achieved declaratively or programmatically.

## Fetching a variable using `cam-variable-name`

If you use the `cam-variable-name` directive, the corresponding process variable will be fetched.

## Fetching a variable using JavaScript

Additional variables can be fetched by hooking into the form lifecycle.

```html
<form role="form">

Value: {{customValue}}.

<script cam-script type="text/form-script">
var variableManager = camForm.variableManager;

camForm.on('form-loaded', function() {
  // this callback is executed *before* the variables are loaded from the server.
  // if we declare a variable here, its value will be fetched as well
  variableManager.fetchVariable('customVariable');
});

camForm.on('variables-fetched', function() {
  // this callback is executed *after* the variables have been fetched from the server
  $scope.customValue = variableManager.variableValue('customVariable');

});
</script>

</form>
```


# Migrating a Cockpit Plugin

As of version 7.2, Cockpit uses updated (and unpatched) versions of AngularJS (1.2.16) and Twitter Bootstrap (3.1.1). These updates introduce breaking changes in some heavily used features, such as JS promises, modal windows and a few more things described in detail below. Confer the [AngularJS changelog](https://github.com/angular/angular.js/blob/master/CHANGELOG.md) and the [Bootstrap migration guide](http://getbootstrap.com/getting-started/#migration) for details.

First of all, __bootstrap.js is not used anymore__ (it has been replaced by the angular-ui/bootstrap project), Only the CSS parts are kept (and they are being rewritten in order to leverage less compilation and avoid unnecessary declarations).

### JS promises

The most critical change is probably the way JavaScript promises are implemented/used. If you had something like this in the 7.1 release:

```javascript
SomeResource.$then(function(response) {
  var bar = response.data.something;
});
```

in the 7.2 release, it should look like:

```javascript
// the resource returns an object having "$promise" (which has a method "then")
SomeResource.$promise.then(function(response) {
  // and the response does not have a "data" property
  var bar = response.something;
});
```

### Dialogs / modal windows

Also widely used in web interfaces, the dialogues (a.k.a. modal windows) were completely rewritten. With the 7.1 release, you might have something like:

```javascript
// a controller to open the dialog
module.controller('YadaYada', [
        'BimBamBum', '$dialog', '$scope',
function(BimBamBum,   $dialog,   $scope) {
  var dialogInstance = $dialog.dialog({
    // and a controller for the dialog content
    resolve: {
      foo: function() {
        return $scope.foo;
      },
      bar: function() {
        return BimBamBum.bar;
      }
    },
    // for the example, I wrote the dialog controller here
    // but it was generally found in a separate file (could have been "BimBamBum" for instance)
    controller: [
    // here "dialog" is the dialogInstance and "foo" and "bar" are _resolved_ (see above)
            'dialog', 'foo', 'bar',
    function(dialog,   foo,   bar) {
      // ...
    }]
  });

  // and finally, you would have open the dialog...
  dialogInstance.open().then(function() {
    // ...
  });
}];
```

From 7.2 onwards - using angular-ui/bootstrap - you have something like this:

```javascript
// a controller to open the dialog
module.controller('YadaYada', [
        'BimBamBum', '$modal', '$scope',
function(BimBamBum,   $modal,   $scope) {
  // calling the "open" method of the "$modal" will create an instance
  $modal.open({
    // and a controller for the dialog content
    resolve: {
      // .. you know what comes here, right?
    },
    // again, for the example, I wrote the dialog controller here
    controller: [
            '$modalInstance', 'foo', 'bar',
    function($modalInstance,   foo,   bar) {
      // ...
    }]
  });
}];
```

### Tooltips

In the 7.1 release, you could add tool tips using a *help* attribute like this:

```html
<div class="yada-yada"
     help
     help-text="The text shown when mouse comes over this DIV"
     help-placement="'top'">
  ...
</div>
```

With the 7.2 release, the attributes would be:

```html
<div class="yada-yada"
     tooltip="The text shown when mouse comes over this DIV"
     tooltip-placement="top">
  ...
</div>
```

Note the *tooltip-placement* value is not wrapped between single quotes anymore.


### Pagers

Pagers need special attention because you might need to adapt setup and change your HTML. But generally speaking, if you have something like this with the 7.1 release:

```javascript
$scope.pages = {
  size: 10,
  total: 0,
  current: 1
};
// ...
$http.post(Uri.appUri('plugin://base/:engine/incident/count'), params).success(function(data) {
  pages.total = Math.ceil(data.count / pages.size);
});
```

```html
<div paginator total-pages="pages.total" current-page="pages.current"></div>
```

Then you will have something like this with the 7.2 release:

```javascript
$scope.pages = {
  size: 10,
  total: 0,
  current: 1
};
// ...
$http.post(Uri.appUri('plugin://base/:engine/incident/count'), params).success(function(data) {
  pages.total = data.count;
});
```

```html
<pagination ng-if="pages.total > pages.size"
            class="pagination-sm"
            page="pages.current"
            ng-model="pages.current"
            total-items="pages.total"
            items-per-page="pages.size"
            max-size="7"
            boundary-links="true"></pagination>
```
