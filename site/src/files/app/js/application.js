// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function() {

    var running = 0;

    var $window = $(window),
        $body = $(document.body),
        path = window.location.pathname,
        base = $("base").attr('app-base');

    // refresh scrollspy on load
    $window.on('load', function () {
      $body.scrollspy('refresh');
    });

    // refresh scrollspy on resize
    $window.resize(function() {
      $body.scrollspy('refresh');
      $body.scrollspy('process');
    });        

    $('[data-bpmn-diagram]').each(function() {
      var e = $(this),
          name = e.attr('data-bpmn-diagram'),
          uri = base + "assets/bpmn/" + name;
      
      e.addClass('bpmn-diagram-container');
      
      bpmn(uri, e);
    });

    $('[data-bpmn-symbol]').each(function() {

      var e = $(this),
          bpmnSymbol = e.attr('data-bpmn-symbol'),
          bpmnSymbolName = e.attr('data-bpmn-symbol-name');

      e.addClass('bpmn-symbol-container');

      drawBpmnSymbol(bpmnSymbol, bpmnSymbolName, e);
    });

    /*
     * Append modal dialog to enlarge the image.
     */
    $('[data-img-thumb]').each(function () {
      var element = $(this),
          id = 'dialog-' + (element.attr('id') || ('generated-id-' + (running++))),
          selector = '#' + id,
          image = element.attr('src');

      var container = element.parent();

      element.wrap('<a data-toggle="modal" href="' + selector + '" class="thumbnail"></a>');

      var parent = element.parent();

      parent.appendTo(container);
      
      container.append(
        '<div class="link-img-thumb-enlarge">' +
        '  <a data-toggle="modal" href="' + selector + '">' +
        '    <i class="glyphicon glyphicon-zoom-in"></i> click to enlarge' +
        '  </a>' +
        '</div>');

      container.append(
        '<div class="modal" id="' + id +'" tabindex="-1" role="dialog" aria-hidden="true">' +
        '  <div class="modal-dialog">' +
        '    <div class="modal-content">' +
        '      <div class="modal-body">' +
        '        <img class="img-responsive" src="' + image + '" />' +
        '      </div>' +
        '      <div class="modal-footer">' +
        '        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
        '      </div>' +
        '    </div>' +
        '  </div>' +
        '</div>');
    });

    /*
     =======================================
     Display source code and popover explanations
     =======================================
     */
    (function() {

      var indent = function(text, spaces) {
        if (!text) return text;
        var lines = text.split(/\r?\n/);
        var prefix = '      '.substr(0, spaces || 0);
        var i;

        // remove any leading blank lines
        while (lines.length && lines[0].match(/^\s*$/)) lines.shift();
        // remove any trailing blank lines
        while (lines.length && lines[lines.length - 1].match(/^\s*$/)) lines.pop();
        var minIndent = 999;
        for (i = 0; i < lines.length; i++) {
          var line = lines[0];
          var indent = line.match(/^\s*/)[0];
          if (indent !== line && indent.length < minIndent) {
            minIndent = indent.length;
          }
        }

        for (i = 0; i < lines.length; i++) {
          lines[i] = prefix + lines[i].substring(minIndent);
        }
        lines.push('');
        return lines.join('\n');
      };

      var escape = function(text) {
        return text.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;').replace(/"/g, '&quot;');
      };

      var fetchCode = function(elementId) {
        var escapedElementId = elementId.replace(/\./, '\\\.');
        return indent($('#' + escapedElementId).html(), 0);
      };

      $('[data-source-code]').each(function() {
        var element = $(this),
            filename = element.attr('data-source-code'),
            content = fetchCode(filename),
            annotation = element.attr('annotate') && JSON.parse(fetchCode(element.attr('annotate'))) || {};


        // hack around incorrect tokenization
        content = content.replace('.done-true', 'doneTrue');
        if(filename.indexOf('Project-Layout')==-1) {
          content = prettyPrintOne(escape(content), undefined, true);
        }

        // hack around incorrect tokenization
        content = content.replace('doneTrue', '.done-true');

        var popovers = {},
            counter = 0;

        //Object length check with alternative for IE8 and below
        var annotationObjectLength = 0;
        if(typeof Object.keys == 'function') {
          if(Object.keys(annotation).length > 0) {
            if(typeof annotation[filename] != "undefined") {
              annotationObjectLength = Object.keys(annotation[filename]).length;
            }
          }
        } else {
          var count = 0;
          var i;
          for (i in annotation) {
            if (annotation.hasOwnProperty(i)) {
              count++;
            }
          }
          if(count > 0) {
            for(i in annotation[filename]) {
              if(annotation[filename].hasOwnProperty(i)) {
                annotationObjectLength++
              }
            }
          }
        }

        if(annotationObjectLength > 0) {
          $.each(annotation[filename], function(key, text) {
            // search for key-words and add explanation popover
            var regexp = new RegExp('(\\W|^)(' + key.replace(/([\W\-])/g, '\\$1') + ')(\\W|$)');
            content = content.replace(regexp, function(_, before, token, after) {
              token = "__" + (counter++) + "__";
              popovers[token] =
                  '<code class="nocode" rel="popover" data-trigger="hover" title="' + escape('<code>' + key + '</code>') +
                      '" data-content="' + escape(text) + '" data-html=\"true\">' + escape(key) + '</code>';
              return before + token + after;
            });
          });
        }

        $.each(popovers, function(token, text) {
          content = content.replace(token, text);
        });

        element.html('<pre class="linenums nocode">' + content +'</pre>');
        element.find('[rel=popover]').popover();
      });
    })();

    /*
     * Append a anchor to be able to get a link to current section.
     */
    $("h1[id], h2[id], h3[id], h4[id]").each(function() {
      var current = $(this),
          id = current.attr('id');

      if (!current.text()) {
        return;
      }

      current.append(
        '<a class="anchor" href="#' + id + '" title="Link to current section">¶</a>'
      );
    });

    /*
     * Set active class at navbar
     */
    $('header nav ul li').each(function () {
      var current = $(this),
          link = current.attr('data-active-link');

      if (link) {

        if (path.indexOf(link) !== -1) {
          current.addClass('active');
        }

      }

    });


    /*
     * Listen to the event 'activate', which will be triggered
     * from bootstrap scrollspy, and append the active sections
     * to the breadcrumb. 
     */
    $(document).on('activate', function (e) {

      var categoryElement = $('.nav.docs-sidenav > li.active'),
          category = categoryElement.find('> a'),
          categoryLabel = category.text(),
          categoryHref = category.attr('href'),

          sectionElement = categoryElement.find('> ul > li.active'),
          section = sectionElement.find('> a'),
          sectionLabel = section.text(),
          sectionHref = section.attr('href'),

          breadcrumb = $('.breadcrumb');

      // if there does not exist a breadcrumb, then do nothing
      if (!breadcrumb) {
        return;
      }

      // remove all breadcrumb with the class 'breadcrumb-section'
      breadcrumb.find('> li.breadcrumb-section').remove();

      if (categoryElement.length) {
        breadcrumb.append(
          '<li class="breadcrumb-section">' + 
          '  <a href="' + categoryHref + '">' + categoryLabel + '</a>' + 
          '</li>'
        );

        if (sectionElement.length) {
          breadcrumb.append(
            '<li class="breadcrumb-section">' + 
            '  <a href="' + sectionHref + '">' + sectionLabel + '</a>' + 
            '</li>'
          );
        }
      }
    });

});

}(window.jQuery)
