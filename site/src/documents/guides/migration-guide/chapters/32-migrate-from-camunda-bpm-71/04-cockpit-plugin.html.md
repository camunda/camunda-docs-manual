---

title: 'Migrating a Cockpit Plugin'
category: 'Migrate from camunda BPM 7.1 to 7.2'

---

As of version 7.2, Cockpit uses updated (and unpatched) versions of AngularJS (1.2.16) and Twitter Bootstrap (3.1.1). These updates introduce breaking changes in some heavily used features, such as JS promises, modal windows and a few more things described in detail below. Confer the [AngularJS changelog](https://github.com/angular/angular.js/blob/master/CHANGELOG.md) and the [Bootstrap migration guide](http://getbootstrap.com/getting-started/#migration) for details.

First of all, __bootstrap.js is not used anymore__ (it has been replaced by the angular-ui/bootstrap project), Only the CSS parts are kept (and they are being rewritten in order to leverage less compilation and avoid unnecessary declarations).

### JS promises

The most critical change is probably the way Javascript promises are implemented/used. If you had something like this in the 7.1 release:

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
