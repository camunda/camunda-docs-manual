// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function() {

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
      var current = $(this),
          id = 'dialog_' + current.attr('id'),
          selector = '#' + id,
          image = current.attr('img-src');

      current.append(
        '<a data-toggle="modal" href="' + selector + '" class="thumbnail">' + 
        '  <img src="' + image + '"/>' + 
        '</a>' +
        '<div class="center">' + 
        '  <p style="padding-top: 5px; font-size: 90%">' +
        '    <i class="glyphicon glyphicon-zoom-in"></i> click to enlarge' +
        '  </p>' +
        '</div>'
      );

      current.append(
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
        '</div>'
      );

    });

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
