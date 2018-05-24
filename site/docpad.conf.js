// DocPad Configuration
var hljs = require('highlight.js');

module.exports = {

  plugins: {
    marked: {
      markedOptions: {
        pedantic: true,
        gfm: true,
        highlight: function (code, lang) {
          if (lang === undefined) {
            return code;
          } else {
            return hljs.highlight(lang, code).value;
          }
        }
      }
    },
    links: {
      validate: {
        failOnError: process.env.FAIL_ON_ERROR || false,
        ignoreTargetPattern: /\/api-references\/javadoc\/.*/
      },
      process: {
        headings: [ 'h1', 'h2', 'h3' ],
        include: [ 'links' ]
      }
    }
  },

  // Use to define your own template data and helpers that will be accessible to your templates
  // Complete listing of default values can be found here: http://docpad.org/docs/template-data
  templateData: {

    //// Site Properties /////////////////////////////////////
    site: {

      versions: {
        current: process.env.DOCS_VERSION || '7.2',
        all: [
          { id: 'latest', name: 'Latest' },
          { id: '7.9', name: '7.9 (stable)' },
          { id: '7.8', name: '7.8 (stable)' },
          { id: '7.7', name: '7.7 (stable)' },
          { id: '7.6', name: '7.6 (stable)' },
          { id: '7.5', name: '7.5 (stable)' },
          { id: '7.4', name: '7.4 (stable)' },
          { id: '7.3', name: '7.3 (stable)' },
          { id: '7.2', name: '7.2 (stable)' },
          { id: '7.1', name: '7.1 (stable)' },
          { id: '7.0', name: '7.0 (stable)' },
          { id: 'develop', name: 'develop (unstable)' }
        ]
      },

      // The production url of our website
      url: "http://docs.camunda.org",

      styles: [
        "assets/vendor/bootstrap/css/bootstrap.min.css",
        "assets/vendor/google-code-prettify/prettify.css",
        "assets/vendor/camunda/cabpmn/cabpmn.css",
        "assets/vendor/highlight.js/github.css",
        "app/css/style.css"
      ],

      scripts: [
        "assets/vendor/jquery/jquery.min.js",

        "assets/vendor/raphaeljs/raphael.js",
        "assets/vendor/camunda/bpmn/Executor.js",
        "assets/vendor/camunda/cabpmn/cabpmn.js",

        "assets/vendor/google-code-prettify/prettify.min.js",

        "assets/vendor/bootstrap/js/bootstrap.min.js",

        "assets/vendor/jquery/scrollTo/jquery.scrollTo.js",
        "assets/vendor/jquery/typeahead/typeahead.jquery.js",

        "app/js/application.js",


        // not important, load last
        "assets/vendor/analytics/analytics.js"
      ],

      title: "camunda BPM docs",

      description: "documentation of the camunda BPM platform",

      // website keywords (separated by commas)
      keywords: "camunda, open source, free, Apache License, Apache 2.0, workflow, BPMN, BPMN 2.0, camunda.org, bpm, BPMS, engine, platform, process, automation, community, documentation",

      author: "camunda BPM community",
      email: "community@camunda.org",

      copyright: "© camunda services GmbH 2014"
    },

    //// Helper Functions /////////////////////////////////////

    /**
     * Returns a description for a document part.
     *
     *   {
     *     name: 'partName',
     *     categories: [ { name: 'someName', pages: [ .. ] } ],
     *     categoriesByName: { 'someName': { name: 'someName', pages: [ .. ] } }
     *   }
     */
    getPages: function(doc) {

      var part = doc.part;

      var pages,
          categories = [],
          categoriesByName = {};

      pages = this.getCollection('html')
                       .findAllLive({ url: { $startsWith: '/' + part }}, [{ relativeBase: 1 }])
                         .toJSON();

      function getCategory(name) {
        var category = categoriesByName[name];

        if (!category) {
          category = categoriesByName[name] = { name: name, pages: [] };
          categories.push(category);
        }

        return category;
      }

      for (var i = 0, page; !!(page = pages[i]); i++) {
        if (page.layout || !page.title) {
          continue;
        }

        page.shortTitle = page.shortTitle || page.title;
        getCategory(page.category || 'main').pages.push(page);
      }

      return {
        name: part,
        categories: categories,
        categoriesByName: categoriesByName
      };
    },

    linkify: function() {
      var parts = Array.prototype.slice.apply(arguments);
      var str = '';

      if (this.document.category) {
        parts.unshift(this.document.title);
        parts.unshift(this.document.category);
      }

      for (var i = 0, part; !!(part = parts[i]); i++) {
        if (i) {
          str += ' ';
        }
        str += part;
      }

      return str.replace(/\s+/g, '-')
                .replace(/[^\w-]+/g, '')
                .toLowerCase();
    },

    getPreparedHeadline: function() {
      var document = this.document,
          documentTitle = document.title,
          documentHeadline = document.h1;

      return documentHeadline || documentTitle;
    },

    getPreparedTitle: function() {
      var document = this.document,
          documentTitle = document.title,
          site = this.site,
          siteTitle = site.title;

      if (documentTitle) {
        return documentTitle + " | " + siteTitle;
      } else {
        return siteTitle;
      }
    },

    getPreparedDescription: function() {
      var document = this.document,
          documentDescription = document.description,
          site = this.site,
          siteDescription = site.description;

      return documentDescription || siteDescription;
    },

    getPreparedKeywords: function() {
      var document = this.document,
          documentKeywords = document.keywords,
          site = this.site,
          siteKeywords = site.keywords;

      return (siteKeywords || []).concat(documentKeywords || []).join(", ");
    },

    pathSeparator: function(url) {

      if (!url) {
        url = this.documentUrl();
      }

      if (url.indexOf("/") === 0) {
        url = url.substring(1);
      }

      // windows bug: must split by / and \
      var uriParts = url.split("/");

      function repeat(s, n) {

        var a = [];

        for (var i = 0; i < n; i++) {
          a.push(s);
        }

        return a.join('');
      }

      var depth = 0;

      if (uriParts.length) {

        depth = uriParts.length - 1;
      }

      return repeat('../', depth);
    },

    pathToParent: function (index) {

      var document = this.document,
          parent = '../',
          depth = document.parents.length - index;

      if (!depth || depth === 0) {
        return this.pathSeparator();
      }

       for (var i = depth-1; i > 0; i--) {
        parent = parent + parent;
      }

      return this.pathSeparator(parent);

    },

    docUrl: function(url) {
      var documentUrl = this.documentUrl();
      return this.pathSeparator(documentUrl) + url;
    },

    stringEndsWith: function(str, ending) {
      return str.indexOf(ending) == str.length - ending.length;
    },

    documentUrl: function() {
      var document = this.document;
      var urls = document.urls;

      var url = document.url;

      for (var i = 0, u; !!(u = urls[i]); i++) {
        u = u.replace(/[\\]+/g, "/");

        if (this.stringEndsWith(u, ".html")) {
          if (this.stringEndsWith(u, "/index.html")) {
            url = u.replace("index.html", "");
          } else {
            url = u;
          }
        }
      }

      return url;
    },

    relativize: function(paths, separator) {
      var a = [];

      for (var i = 0; i < paths.length; i++) {
        var p = paths[i];
        if (/^\//.test(p)) {
          a.push(p);
        } else {
          a.push(separator + p);
        }
      }

      return a;
    },

    commonStyles: function() {
      return this.relativize(this.site.styles, this.pathSeparator());
    },

    commonScripts: function() {
      var site = this.site,
          document = this.document;

      return this.relativize([].concat(site.scripts, (document.scripts || [])), this.pathSeparator());
    }
  },

  // =================================
  // Event Configuration

  // render foo.md -> foo.html
  renderSingleExtensions: true,

  // render multiple times
  renderPasses: 2,

  // disable prompts
  prompts: false,
  // Locale Code
  // The code we shall use for our locale (e.g. `en`, `fr`, etc)
  // If not set, we will attempt to detect the system's locale, if the locale can't be detected or if our locale file is not found for it, we will revert to `en`
  localeCode: null,

  // Environment
  // Which environment we should load up
  // If not set, we will default the `NODE_ENV` environment variable, if that isn't set, we will default to `development`
  env: null,

  // Environments
  // Allows us to set custom configuration for specific environments
  environments: null,
  development: null,

  // documentation port: 9779, main page port: 9778
  port: 9779,

  maxAge: false // default

};
