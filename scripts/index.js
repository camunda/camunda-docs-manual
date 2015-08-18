'use strict';
/*jshint browser: true*/

/*global require: false, console: false*/

require('./classList');

function toArray(thing) {
  var arr = [];
  if (!thing.length) { return arr; }
  for (var i = 0; i < thing.length; i++) {
    arr.push(thing[i]);
  }
  return arr;
}

function attr(node, name, value) {
  if (value === null) {
    node.removeAttribute(name);
  }
  else if (typeof value !== 'undefined') {
    node.setAttribute(name, value);
  }
  return node.getAttribute(name);
}

function offset(node) {
  var parent = node;
  var obj = {
    top: parent.offsetTop,
    left: parent.offsetLeft,
  };

  while ((parent = parent.offsetParent)) {
    obj.top += parent.offsetTop;
    obj.left += parent.offsetLeft;
  }

  return obj;
}

function query(selector, context) {
  context = (context || document.body);
  return context.querySelector(selector);
}

function queryAll(selector, context) {
  context = (context || document.body);
  return toArray(context.querySelectorAll(selector));
}

function openParentItem(childItem, className) {
  childItem.classList.add(className || 'open');

  var parentItem = childItem.parentNode.parentNode;
  if (parentItem.tagName.toLowerCase() === 'li') {
    openParentItem(parentItem, className);
  }
}



var toc = query('#TableOfContents');
var navBar = query('.navbar-fixed-top');
var tocWrapper;
var tocLinks;
var tocTargets;
var tocTargetPositions;

var currentLink = query('.site-menu a[href="' + location.pathname + '"]');
var currentMenuItem;

if (toc) {
  tocWrapper = toc.parentNode;

  tocLinks = queryAll('a[href]', toc);

  tocTargets = tocLinks.map(function (node) {
    return document.getElementById(attr(node, 'href').slice(1));
  });

  tocTargetPositions = tocTargets.map(function (node) {
    return offset(node);
  });
}

if (currentLink) {
  currentMenuItem = currentLink.parentNode;
  currentMenuItem.classList.add('active');
  openParentItem(currentLink.parentNode);
  openParentItem(currentLink.parentNode, 'active-trail');
}



var siteMenuToggle = query('.site-menu-toggle');
if (siteMenuToggle) {
  siteMenuToggle.addEventListener('click', function () {
    document.body.classList.toggle('site-menu-open');
  });
}

var siteMenuSubmenus = queryAll('.site-menu ul ul');

function setSubmenuClasses(span, nope) {
  if (!nope) {
    span.parentNode.classList.toggle('open');
  }
  var open = span.parentNode.classList.contains('open');
  span.classList[open ? 'add' : 'remove']('open');
}

function makeToggleBtn(ul) {
  var span = document.createElement('span');
  span.className = 'submenu-toggle';
  span.addEventListener('click', function () {
    setSubmenuClasses(span);
  });

  ul.parentNode.insertBefore(span, ul);
  return span;
}

siteMenuSubmenus.forEach(function (ul) {
  var toggleBtn = makeToggleBtn(ul);
  setSubmenuClasses(toggleBtn, true);
});


function scrolling() {
  if (!toc) { return; }

  var top = window.scrollY;

  tocLinks.forEach(function (node) {
    node.parentNode.classList.remove('open');
  });

  for (var i = 0; i < tocTargetPositions.length; i++) {
    if (tocTargetPositions[i].top >= top) {
      tocLinks[i].parentNode.classList.add('open');
      openParentItem(tocLinks[i].parentNode);
      i = tocTargetPositions.length;
    }
  }
}

window.addEventListener('scroll', scrolling);
scrolling();

function shiftWindow() {
  if (!navBar) { return; }
  window.scrollBy(0, 0 - (navBar.clientHeight + 15));
}

if (location.hash) {
  shiftWindow();
}
window.addEventListener('hashchange', shiftWindow);


queryAll('.gs-download-step-panel').forEach(function (panel) {
  var btn = query('.toggle-instructions', panel);
  if (!btn) { return; }
  btn.addEventListener('click', function () {
    panel.classList.toggle('open');
  });
});



var lightbox = document.createElement('div');
var lightboxContent = document.createElement('div');
var lightboxImg = document.createElement('img');
lightbox.appendChild(lightboxContent);
lightbox.addEventListener('click', function () {
  lightbox.classList.remove('open');
});
lightboxContent.appendChild(lightboxImg);
attr(lightbox, 'class', 'lightbox');
attr(lightboxContent, 'class', 'content');

document.body.appendChild(lightbox);

function showBigger(evt) {
  var img = evt.target.src ? evt.target : query('img', evt.target);
  attr(lightboxImg, 'src', img.src);
  var style = lightboxContent.style;
  if (img.naturalWidth < document.body.clientWidth) {
    style.marginLeft = (-4 - (img.naturalWidth / 2)) + 'px';
  }
  else {
    style.marginLeft = (0 - (document.body.clientWidth / 2)) + 'px';
  }
  style.marginTop = (-4 - (img.naturalHeight / 2)) + 'px';
  lightbox.classList.add('open');
}

queryAll('.page-content figure.image img').forEach(function (img) {
  if (img.clientWidth < img.naturalWidth) {
    var figure = img.parentNode.parentNode;
    figure.classList.add('clickable');
    figure.addEventListener('click', showBigger);
  }
});

var siteMenuMeta = query('.site-menu .meta');
var metaToggle = query('.toggle', siteMenuMeta);
var metaHeader = query('.header', siteMenuMeta);
function toggleMenuMeta() {
  var mcl = siteMenuMeta.classList;
  var tcl = metaToggle.classList;

  mcl.toggle('open');
  if (mcl.contains('open')) {
    tcl.remove('glyphicon-chevron-up');
    tcl.add('glyphicon-chevron-down');
  }
  else {
    tcl.add('glyphicon-chevron-up');
    tcl.remove('glyphicon-chevron-down');
  }
}
query('.site-menu .version a').addEventListener('click', toggleMenuMeta);
metaHeader.addEventListener('click', toggleMenuMeta);


var prismjs = require('prismjs');
require('prismjs/components/prism-bash');
require('prismjs/components/prism-css');
require('prismjs/components/prism-css-extras');
require('prismjs/components/prism-git');
require('prismjs/components/prism-http');
require('prismjs/components/prism-java');
require('prismjs/components/prism-less');
require('prismjs/components/prism-markup');
require('prismjs/components/prism-yaml');
prismjs.languages.json = prismjs.languages.javascript;
prismjs.languages.js = prismjs.languages.javascript;
prismjs.languages.xml = prismjs.languages.markup;
prismjs.languages.html = prismjs.languages.markup;
