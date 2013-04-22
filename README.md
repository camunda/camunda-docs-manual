docs.camunda.org
================

The sources of the docs.camunda.org site.

The page is built using [docpad.org](http://docpad.org).


Overview
--------

The `site/src/` folder contains the sources for the website.


Start hacking
-------------

In order to start hacking the docs.camunda.org site, you first need to setup docpad.

1. install [node.js](http://nodejs.org/) if you haven't already got it
2. inside your terminal, navigate to the `site/` folder inside the repository. Type `npm update`
3. run docpad using `./node_modules/.bin/docpad run` or install docpad via `npm install -g docpad` if you want to have it globally available in your path

Go to [http://localhost:9779/](http://localhost:9779/).

Have fun.


Writing documentation
---------------------

Whenever possible, documentation should be written in [Markdown](http://daringfireball.net/projects/markdown/)

Some special notes on how to write it (view the source of this document for the actual markdown source code): 


### Code

```
Use a sequence of three backticks (```) in the lines before and after your code.
```

When used 

* During an enumeration, indent the code (including the backticks)

  ```
  Like this to let the code block be properly rendered as part of the enum item.
  ```

  and to allow other text to follow after the code snipped as part of the enum, too.


### Spacing of elements

Use a single empty line between enumerations / paragraphs / headings / code snippets.

Use a double empty line before headings to make a document more readable.


### When to use HTML markup

Use HTML markup with [Twitter Bootstrap flavour](http://twitter.github.io/bootstrap/)

* for [notes](http://twitter.github.io/bootstrap/components.html#alerts)

  ```
  <div class="{alert|info|error|success}">
    <strong>{summary}</strong> {description message}
  </div>
  ```

* for [tables](http://twitter.github.io/bootstrap/base-css.html#tables)

  ```
  <table class="table">
    <thead>
      <tr>
        <th>col2</th>
        <th>col1</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>foo</td>
        <td>bar</td>
      </tr>
      <tr>
        <td>asdf</td>
        <td>gh</td>
      </tr>
    </tbody>
  </table>
  ```