// NOTICE!! DO NOT USE ANY OF THIS JAVASCRIPT
// IT'S ALL JUST JUNK FOR OUR DOCS!
// ++++++++++++++++++++++++++++++++++++++++++

!function ($) {

  $(function(){

    var $window = $(window),
        path = window.location.pathname,
        $body = $(document.body);

    $window.on('load', function () {
      $body.scrollspy('refresh')
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
