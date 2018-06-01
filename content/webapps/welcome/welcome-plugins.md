---

title: 'Plugins'
weight: 60

menu:
  main:
    identifier: "webapps-welcome-plugins"
    parent: "webapps-welcome"

---

In addition to the [configurable custom links]({{< relref "webapps/welcome/configuration.md" >}}), plugins can be used to add functionality to the Welcome application.


# Plugin point

The Welcome application offers a _front-end only_ plugin point.

**Name:** `welcome.dashboard`.

{{< img src="../img/welcome-dashboard-plugin.png" title="Plugin Point" >}}

**Name:** `welcome.profile`.

{{< img src="../img/welcome-profile-plugin.png" title="Plugin Point" >}}


## Example

```javascript
var ngModule = angular.module('acme.welcome.plugin.sample', []);

ngModule.config(['ViewsProvider', function(ViewsProvider) {
  ViewsProvider.registerDefaultView('welcome.dashboard', {
    id: 'welcome-dashboard-sample-plugin',

    label: 'Just a sample plugin',

    // this is how the HTML scaffolding should look like
    // in order to follow the styling of the page
    template: '<section class="col-xs-12"><div class="inner">' +
                '<header><h3 class="section-title">Sample plugin</h3></header>' +
                '<div class="inner">{{ content }}</div>' +
              '</div></section>',

    controller: ['$scope', function($scope) {
      $scope.content = 'Sample plugin content';
    }],

    priority: 50
  });
}]);
```