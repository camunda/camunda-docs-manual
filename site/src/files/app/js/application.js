// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function() {

    var uid = 0;

    var $window = $(window),
        $body = $(document.body),
        path = window.location.pathname,
        base = $("base").attr('app-base');

    $body.scrollspy('refresh');

    $('[data-bpmn-diagram]').each(function() {
      var e = $(this),
          name = e.attr('data-bpmn-diagram'),
          uri = base + "assets/bpmn/" + name;
      
      e.addClass('bpmn-diagram-container');

      e.children().each(function() {
        var c = $(this);
        if (!c.attr('id')) {
          c.attr('id', 'generated' + uid++);
        }
      });
      
      bpmn(uri, e);
    });

    $('[data-bpmn-symbol]').each(function() {

      var e = $(this),
          bpmnSymbol = e.attr('data-bpmn-symbol'),
          bpmnSymbolName = e.attr('data-bpmn-symbol-name');

      e.addClass('bpmn-symbol-container');

      e.children().each(function() {
        var c = $(this);
        if (!c.attr('id')) {
          c.attr('id', 'generated' + uid++);
        }
      });

      drawBpmnSymbol (bpmnSymbol, bpmnSymbolName, e);
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

});

}(window.jQuery)
