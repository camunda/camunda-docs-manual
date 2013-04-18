/**
 * Docs Navigation and Docs linking specific stuff
 *
 * Inspired by angular js docs
 *
 * @author nico.rehwaldt
 */

(function(angular, $) {
  "use strict";

  var module = angular.module("camundaorg.pages", []);

  var PagesProducer = function(App) {

    var Pages = function(pages, modules) {
      this.pages = pages;
      this.modules = this.buildSections(pages, modules);
    };

    Pages.prototype.buildSections = function(pages, modules) {

      modules = modules || {};

      for (var name in modules) {
        var m = modules[name];

        angular.extend(m, {
          name: name,
          pages: [],
          pageById: {}
        });
      }

      for (var i = 0, p; !!(p = pages[i]); i++) {
        var module = getModule(p.module);

        module.pages.push(p);
        module.pageById[p.id] = p;

        p.partialUrl = App.appBase() + (module.baseUrl || "") + p.url + ".html";
      }

      function getModule(name) {
        var module = modules[name];
        if (!module) {
          modules[name] = module = {
            name: name,
            pages: [],
            pageById: {}
          };
        }

        return module;
      }

      return modules;
    };

    Pages.prototype.getAll = function(moduleId) {
      var module = this.modules[moduleId];

      if (!module) {
        return null;
      }

      return module.pages;
    };

    Pages.prototype.get = function(moduleId, pageId) {
      var module = this.modules[moduleId];

      if (!module) {
        return null;
      }

      return module.pageById[pageId];
    };

    Pages.prototype.getIndexPage = function(moduleId) {
      var module = this.modules[moduleId];

      if (!module) {
        return null;
      }

      if (module.mainPage) {
        return module.pageById[module.mainPage];
      }

      return null;
    };

    return new Pages(CAM_PAGES, CAM_MODULES);
  };

  var DocsNavigationController = function DocsNavigationController($scope, $location, Pages) {

    $scope.currentPage = null;

    $scope.$watch(function getUrl() { return $location.path(); }, function(newValue) {
      updateSearch(newValue);
      updatePage(newValue);
    });

    $scope.updateSearch = function() {
      updateSearch();
    };

    $scope.navClass = function(page) {
      return page == $scope.currentPage ? "active" : "";
    };

    $scope.submitForm = function() {
      updateSearch();

      var currentPage = $scope.currentPage,
          bestMatch = $scope.bestMatch,
          bestMatchPage = $scope.bestMatch.page;

      $scope.search = "";

      if (bestMatch.rank && currentPage != bestMatchPage) {
        $location.url($scope.bestMatch.page.url);
      }

      updateSearch();
    };

    function getDocPages() {
      return Pages.getAll($scope.module);
    }

    function getIndexPage() {
      return Pages.getIndexPage($scope.module);
    }

    function updatePage(path) {
      if (!path) {
        $scope.currentPage = getIndexPage();
      }

      if (path.indexOf("/") === 0) {
        path = path.substring(1);
      }

      updateSearch();

      angular.forEach(getDocPages(), function(page) {
        if (page.url == path) {
          $scope.currentPage = page;
        }
      });
    }

    function updateSearch(path) {
      var allPages = getDocPages(),
          categories = $scope.categories = [],
          cache = {},
          pages = $scope.pages = [],
          search = $scope.search,
          bestMatch = { rank: 0, page: null };

      angular.forEach(allPages, function(page) {
        var match = rank(page, search);
        if (!match) {
          return;
        }

        if (match.rank > bestMatch.rank) {
          bestMatch = match;
        }

        var category = getCategory(page.category);
        if (category) {
          category.pages.push(page);
        } else {
          pages.push(page);
        }
      });

      function getCategory(categoryName) {
        var category;

        if (categoryName) {
          category = cache[categoryName];
          if (!category) {
            category = cache[categoryName] = {
              name: categoryName,
              pages: []
            };

            categories.push(category);
          }
        }

        return category;
      }

      function rank(page, terms) {
        var ranking = { page: page, rank:0 },
          keywords = page.keywords || "",
          title = (page.shortName || page.name || "").toLowerCase();

        if (!terms) {
          return ranking;
        }

        angular.forEach(terms.toLowerCase().split(' '), function(term) {
          var idx = keywords.indexOf(term);

          if (ranking) {
            if (idx == -1) {
              ranking = null;
            } else {
              // one point for each term found
              ranking.rank++;

              // one additional point for every term starting with search
              if (idx === 0) {
                ranking.rank++;
              }

              if ((idx = title.indexOf(term)) != -1) {
                ranking.rank += 20 - idx; // ten points if you match title
              }
            }
          }
        });

        return ranking;
      }

      $scope.bestMatch = bestMatch;
    }
  };

  var DocsNavigationDirective = function DocsNavigationDirective() {
    return {
      restrict: 'EAC',
      controller: DocsNavigationController,

      link: function(scope, element, attributes) {
        scope.module = attributes["section"] || attributes["module"];
      }
    };
  };

  module
    .service("Pages", PagesProducer)
    .controller("DocsNavigationController", DocsNavigationController)
    .directive("formSearch", DocsNavigationDirective);

})(window.angular, window.jQuery);