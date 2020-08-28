/* Use this as helper to determine the overlay % / regions
const img = document.querySelector(".no-lightbox img");

function offset(element) {
    const rect = element.getBoundingClientRect(),
    const left = window.pageXOffset || document.documentElement.scrollLeft,
    const top = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + top, left: rect.left + left }
}

img.addEventListener("click", (e) => {
  console.log(`top: ${(e.pageY - offset(img).top) / img.height * 100}`);
  console.log(`left: ${(e.pageX - offset(img).left) / img.width * 100}`);
}); */


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
    title: 'Decision Name',
    href: '#decision-name',
    coords: [
      {
        top: 0,
        left: 0.5,
        width: 13.5,
        height: 5.5
      },
      {
        top: 7,
        left: 0.7,
        width: 12,
        height: 14.5
      }
    ]
  },

  hitPolicy: {
    title: 'Hit policy',
    href: 'hit-policy/',
    coords: [
      {
        top: 3.6,
        left: 19,
        width: 8,
        height: 5
      },
      {
        top: 10,
        left: 13,
        width: 20,
        height: 9.5
      }
    ]
  },

  rule: {
    title: 'Rule',
    href: 'rule',
    coords: [
      {
        top: 95,
        left: 30,
        width: 4,
        height: 5.5
      },
      {
        top: 52,
        left: 0,
        width: 100,
        height: 7.5
      }
    ]
  },

  conditions: {
    title: 'Input Entry (Condition)',
    href: 'rule/#input-entry-condition',
    coords: [
      {
        top: 95,
        left: 6,
        width: 20.5,
        height: 5.5
      },
      {
        top: 65,
        left: 6,
        width: 18,
        height: 7.5
      }
    ]
  },

  conclusions: {
    title: 'Output Entry (Conclusion)',
    href: 'rule/#output-entry-conclusion',
    coords: [
      {
        top: 95,
        left: 41.5,
        width: 23,
        height: 5.5
      },
      {
        top: 66,
        left: 43,
        width: 19.0,
        height: 6.5
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
