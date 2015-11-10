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
    coords: {
      top: 1.5,
      left: 0.5,
      width: 9.2,
      height: 15
    }
  },
  id: {
    title: 'Table ID',
    href: '#the-id-of-the-decision-table',
    coords: {
      top: 16,
      left: 0.5,
      width: 9.2,
      height: 7
    }
  },
  hitPolicy: {
    title: 'Hit policies',
    href: 'hit-policy/',
    coords: {
      top: 23,
      left: 0.5,
      width: 5,
      height: 29
    }
  },
  inputExpression: {
    title: 'Input Expression',
    href: 'input/#input-expressions',
    coords: {
      top: 38,
      left: 5,
      width: 47.5,
      height: 7
    }
  },
  inputTypeDefinition: {
    title: 'Input Type Definition',
    href: 'input/#input-type-definitions',
    coords: {
      top: 45,
      left: 5,
      width: 47.5,
      height: 7
    }
  },
  conditions: {
    title: 'Input Entries (Conditions)',
    href: 'rule/#input-entries-conditions',
    coords: {
      top: 51,
      left: 5,
      width: 47.5,
      height: 41
    }
  },
  conclusions: {
    title: 'Output Entries (Conclusions)',
    href: 'rule/#output-entries-conclusions',
    coords: {
      top: 51,
      left: 52,
      width: 24,
      height: 41
    }
  },
  outputName: {
    title: 'Output Name',
    href: 'output/#output-name',
    coords: {
      top: 38,
      left: 52,
      width: 24,
      height: 7
    }
  },
  outputTypeDefinition: {
    title: 'Output Type Definition',
    href: 'output/#output-type-definitions',
    coords: {
      top: 45,
      left: 52,
      width: 24,
      height: 7
    }
  }
};

var fig = query('figure.no-lightbox');
var img = query('img', fig);

var wrapper = mkEl('div', {
  style: 'transition:all 0.218s linear;position:absolute;' +
          'width:'+img.clientWidth+'px;' +
          'height:'+img.clientHeight+'px;'
});

var style = 'transition:all 0.218s linear;position:absolute;background-color:rgba(255,255,255,0.7);';
var els = {};

els.top = mkEl('div', {
  class: 'top',
  style: style + 'top:0;width:100%'
});
els.bottom = mkEl('div', {
  class: 'bottom',
  style: style + 'bottom:0;width:100%'
});
els.left = mkEl('div', {
  class: 'left',
  style: style + 'left:0'
});
els.right = mkEl('div', {
  class: 'right',
  style: style + 'right:0'
});
els.borders = mkEl('div', {
  class: 'borders',
  style: 'transition:all 0.218s linear;position:absolute;border:2px solid #b5152b;'
});

eachKeys(els, function (key, val) {
  wrapper.appendChild(val);
});
var span = query('span', fig);
span.style.position = 'relative';
span.style.overflow = 'hidden';
span.appendChild(wrapper);

var links = mkEl('ul');
eachKeys(regions, function (name, info) {
  var coords = info.coords;
  var li = mkEl('li');
  var a = mkEl('a', {href: info.href});
  a.textContent = info.title;
  li.appendChild(a);

  li.addEventListener('mouseover', function () {
    wrapper.style.top = img.offsetTop + 'px';
    wrapper.style.left = img.offsetLeft + 'px';
    wrapper.style.opacity = 1;

    els.borders.style.top = coords.top + '%';
    els.borders.style.left = coords.left + '%';
    els.borders.style.width = coords.width + '%';
    els.borders.style.height = coords.height + '%';

    els.top.style.height = coords.top + '%';

    els.bottom.style.height = (100 - (coords.top + coords.height)) + '%';

    els.left.style.top = coords.top + '%';
    els.left.style.width = coords.left + '%';
    els.left.style.height = coords.height + '%';

    els.right.style.top = coords.top + '%';
    els.right.style.width = (100 - (coords.left + coords.width)) + '%';
    els.right.style.height = coords.height + '%';
  });

  li.addEventListener('mouseout', function () {
    wrapper.style.opacity = 0;
  });

  links.appendChild(li);
});

fig.appendChild(links);
})();
