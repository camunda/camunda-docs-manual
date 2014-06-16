----
title: 'Migrate your cockpit plugins'
category: 'Migrate from camunda bpm 7.1 to 7.2'

----

In the 7.2 version, updated (and unpatched) versions of angular (1.2.16) and bootstrap (3.1.1) are used.    
However, those updates bring some breaking changes in some heavily used features, such as JS promises, modal windows and a few more things described in detail below.    
You might want to have a look at the [angular changelog](https://github.com/angular/angular.js/blob/master/CHANGELOG.md) and the [bootstrap migration guide](http://getbootstrap.com/getting-started/#migration).    
First of all, __bootstrap.js is not used anymore__ (it has been replaced by the angular-ui/bootstrap project), only the CSS parts are kept (and they are being rewritten in order to leverage less compilation and avoid unnecessary declarations).

### JS promises

The most critical change is probably the way JS promises are implemented/used. If you had something like this in the 7.1 release:

````javascript
SomeResource.$then(function(response) {
  var bar = response.data.something;
});
````

in the 7.2 release, it should look like:

````javascript
// the resource returns an object having "$promise" (which has a method "then")
SomeResource.$promise.then(function(response) {
  // and the response does not have a "data" property
  var bar = response.something;
});
````

### Dialogs / modal windows

Also widely used in the web interfaces, the dialogs (a.k.a. modal windows) were completely rewritten, in the 7.1 release you might have had something like:

````javascript
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
````

now, in the 7.2 release - using the angular-ui/bootstrap thingy - you will have something like this:

````javascript
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
````

Now.. the bad news is: in some cases, I had to "rewire" the scopes (kind of) but I could not find any rule to describe why and how I did it. Happy debugging! (smile)

### Tooltips

Less complicated than the others changes (but still needing some work), in the 7.1 release, you could add tooltips using a "help" attribute like this:

````html
<div class="yada-yada"
     help
     help-text="The text shown when mouse comes over this DIV"
     help-placement="'top'">
  ...
</div>
````

in the 7.2 release, the attributes would be:

````html
<div class="yada-yada"
     tooltip="The text shown when mouse comes over this DIV"
     tooltip-placement="top">
  ...
</div>
````

Note the "tooltip-placement" value is not wrapped between single quotes anymore.


### Pagers

Pagers need special attention because you might need to adapt some setup and change your HTML. But generally speaking if you have something like this in your 7.1 release:

````javascript
$scope.pages = {
  size: 10,
  total: 0,
  current: 1
};
// ...
$http.post(Uri.appUri('plugin://base/:engine/incident/count'), params).success(function(data) {
  pages.total = Math.ceil(data.count / pages.size);
});
````

````html
<div paginator total-pages="pages.total" current-page="pages.current"></div>
````

Then you will have something like this in the 7.2 release:

````javascript
$scope.pages = {
  size: 10,
  total: 0,
  current: 1
};
// ...
$http.post(Uri.appUri('plugin://base/:engine/incident/count'), params).success(function(data) {
  pages.total = data.count;
});
````

````html
<pagination ng-if="pages.total > pages.size"
            class="pagination-sm"
            page="pages.current"
            ng-model="pages.current"
            total-items="pages.total"
            items-per-page="pages.size"
            max-size="7"
            boundary-links="true"></pagination>
````
