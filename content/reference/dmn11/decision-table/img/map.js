(function () {
'use strict';
var keys = Object.keys;

function eachKeys(obj, ite) {
  keys(obj).forEach(function (key) {
    ite(key, obj[key]);
  });
}

function query(sel, ctx) {
  ctx = ctx || document;
  return ctx.querySelector(sel);
}

function mkEl(tagName, attrs) {
  attrs = attrs || {};
  var el = document.createElement(tagName);
  eachKeys(attrs, function (key, val) {
    el.setAttribute(key, val);
  });
  return el;
}

var regions = {
  name: {
    title: 'Decision Name & ID',
    href: '#decision-name',
    coords: [
      {
        top: 0,
        left: 9.5,
        width: 23,
        height: 4
      },
      {
        top: 13,
        left: 0,
        width: 14,
        height: 15
      }
    ]
  },

  hitPolicy: {
    title: 'Hit policy',
    href: 'hit-policy/',
    coords: [
      {
        top: 7,
        left: 12,
        width: 11,
        height: 4
      },
      {
        top: 28,
        left: 0,
        width: 7,
        height: 20
      }
    ]
  },

  inputExpression: {
    title: 'Input Expression',
    href: 'input/#input-expression',
    coords: [
      {
        top: 14,
        left: 22,
        width: 19,
        height: 4
      },
      {
        top: 38.5,
        left: 7,
        width: 23,
        height: 5
      }
    ]
  },

  inputTypeDefinition: {
    title: 'Input Type Definition',
    href: 'input/#input-type-definition',
    coords: [
      {
        top: 20,
        left: 30,
        width: 24,
        height: 4
      },
      {
        top: 43,
        left: 30,
        width: 23,
        height: 5
      }
    ]
  },

  rule: {
    title: 'Rule',
    href: 'rule',
    coords: [
      {
        top: 96,
        left: 46,
        width: 5,
        height: 4
      },
      {
        top: 53,
        left: 0,
        width: 100,
        height: 5
      }
    ]
  },

  conditions: {
    title: 'Input Entry (Condition)',
    href: 'rule/#input-entry-condition',
    coords: [
      {
        top: 96,
        left: 1,
        width: 27,
        height: 4
      },
      {
        top: 66,
        left: 6,
        width: 24,
        height: 5
      }
    ]
  },

  conclusions: {
    title: 'Output Entry (Conclusion)',
    href: 'rule/#output-entry-conclusion',
    coords: [
      {
        top: 96,
        left: 64,
        width: 30,
        height: 4
      },
      {
        top: 66,
        left: 53,
        width: 24,
        height: 5
      }
    ]
  },

  outputName: {
    title: 'Output Name',
    href: 'output/#output-name',
    coords: [
      {
        top: 14,
        left: 59,
        width: 16,
        height: 4
      },
      {
        top: 38,
        left: 53,
        width: 24,
        height: 5
      }
    ]
  },

  outputTypeDefinition: {
    title: 'Output Type Definition',
    href: 'output/#output-type-definition',
    coords: [
      {
        top: 20,
        left: 67,
        width: 26,
        height: 4
      },
      {
        top: 43,
        left: 53,
        width: 24,
        height: 5
      }
    ]
  }
};

var fig = query('figure.no-lightbox');
var img = query('img', fig);

var wrapper = mkEl('div', {
  style: 'transition:all 0.218s linear;position:absolute;' +
         'top:0;left:0;' +
         'width:100%;' +
         'height:100%;'
});

var holder = img.parentNode;
holder.appendChild(wrapper);
holder.style.position = 'relative';

keys(regions).forEach(function (name) {
  regions[name].coords.forEach(function (coords/*, c*/) {
    var el = mkEl('a', {
      href:   regions[name].href,
      title:  regions[name].title,
      style:  'position:absolute;' +
              'display:block;' +
              // 'background-color:rgba('+ (c ? '0,122' : '122,0') +',0,0.5);' +
              'cursor:pointer;' +
              'top:' + coords.top + '%;' +
              'left:' + coords.left + '%;' +
              'width:' + coords.width + '%;' +
              'height:' + coords.height + '%;'
    });
    wrapper.appendChild(el);
  });
});
})();
