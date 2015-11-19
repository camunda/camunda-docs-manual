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
    title: 'Table name',
    href: '#the-name-of-the-decision-table',
    coords: [
      {
        top: 14,
        left: 0.5,
        width: 9.2,
        height: 17
      },
      {
        top: 0,
        left: 2.5,
        width: 21,
        height: 5
      }
    ]
  },

  hitPolicy: {
    title: 'Hit policies',
    href: 'hit-policy/',
    coords: [
      {
        top: 31,
        left: 0.5,
        width: 5,
        height: 23
      },
      {
        top: 8,
        left: 11,
        width: 11.2,
        height: 5
      }
    ]
  },

  inputExpression: {
    title: 'Input Expression',
    href: 'input/#input-expressions',
    coords: [
      {
        top: 42,
        left: 5,
        width: 24,
        height: 7
      },
      {
        top: 16,
        left: 23,
        width: 17.2,
        height: 5
      }
    ]
  },

  inputTypeDefinition: {
    title: 'Input Type Definition',
    href: 'input/#input-type-definitions',
    coords: [
      {
        top: 47.5,
        left: 28.5,
        width: 24,
        height: 7
      },
      {
        top: 23,
        left: 31,
        width: 21,
        height: 5
      }
    ]
  },

  rule: {
    title: 'Rule',
    href: 'rule',
    coords: [
      {
        top: 58,
        left: 0.5,
        width: 99,
        height: 7
      },
      {
        top: 95,
        left: 39,
        width: 5,
        height: 5
      }
    ]
  },

  conditions: {
    title: 'Input Entries (Conditions)',
    href: 'rule/#input-entries-conditions',
    coords: [
      {
        top: 69,
        left: 5,
        width: 24,
        height: 7
      },
      {
        top: 95,
        left: 5,
        width: 22,
        height: 5
      }
    ]
  },

  conclusions: {
    title: 'Output Entries (Conclusions)',
    href: 'rule/#output-entries-conclusions',
    coords: [
      {
        top: 73.5,
        left: 52,
        width: 24,
        height: 7
      },
      {
        top: 95,
        left: 52,
        width: 22,
        height: 5
      }
    ]
  },

  outputName: {
    title: 'Output Name',
    href: 'output/#output-name',
    coords: [
      {
        top: 42,
        left: 52,
        width: 24,
        height: 7
      },
      {
        top: 16,
        left: 56,
        width: 13.2,
        height: 5
      }
    ]
  },

  outputTypeDefinition: {
    title: 'Output Type Definition',
    href: 'output/#output-type-definitions',
    coords: [
      {
        top: 47.5,
        left: 52,
        width: 24,
        height: 7
      },
      {
        top: 23,
        left: 64,
        width: 22,
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
  regions[name].coords.forEach(function (coords) {
    var el = mkEl('a', {
      href:   regions[name].href,
      title:  regions[name].title,
      style:  'position:absolute;' +
              'display:block;' +
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
