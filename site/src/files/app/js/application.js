// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

(function ($) {
/* global bpmn: false, drawBpmnSymbol: false, console: false */
/* jshint unused: false */
'use strict';
  $(function() {

    var running = 0;

    var $window = $(window),
        $body = $(document.body),
        $sideNav = $('.docs-sidenav.nav').css('overflow', 'auto'),
        path = window.location.pathname,
        base = $('base').attr('app-base'),
        _winHeight;




    function scrollToNavSection() {
      var $target = $('li.active', $sideNav);
      $sideNav.scrollTo($target, window._navScrollSpeed || 0, {offset: {left: 0, top: -10}});
    }

    function setNavHeight() {
      var winHeight = parseInt($window.height(), 10);
      if (_winHeight !== winHeight) {
        _winHeight = winHeight;
        var sideNavTop = $sideNav.position().top;
        var available = winHeight - (sideNavTop + 100);
        $sideNav.css('max-height', available +'px');
        scrollToNavSection();
      }
    }

    // refresh scrollspy on load
    $window.on('load', function () {
      $body.scrollspy('refresh');
      setNavHeight();
    });

    // refresh scrollspy on resize
    $window.resize(function() {
      $body.scrollspy('refresh');
      $body.scrollspy('process');
      setNavHeight();
    });

    $('[data-bpmn-diagram]').each(function() {
      var e = $(this),
          name = e.attr('data-bpmn-diagram'),
          uri = base + 'assets/bpmn/' + name;

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
     * Append a anchor to be able to get a link to current section.
     */
    $('h1[id], h2[id], h3[id], h4[id]').each(function() {
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
      console.info('activating', e.target);

      var categoryElement = $('.nav.docs-sidenav > li.active'),
          category = categoryElement.find('> a'),
          categoryLabel = category.text(),
          categoryHref = category.attr('href'),

          sectionElement = categoryElement.find('> ul > li.active'),
          section = sectionElement.find('> a'),
          sectionLabel = section.text(),
          sectionHref = section.attr('href'),

          breadcrumb = $('.breadcrumb');

      scrollToNavSection();

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

}(window.jQuery));
