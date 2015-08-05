(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/*jshint browser: true*/

/*global console: false*/

function query(selector, context) {
  context = context || document.body;
  return context.querySelector(selector);
}


function openParentItem(childItem) {
  childItem.className = 'open';

  var parentItem = childItem.parentNode.parentNode;
  if (parentItem.tagName.toLowerCase() === 'li') {
    openParentItem(parentItem);
  }
}


var currentLink = query('[href$="' + location.pathname + '"]');
var currentMenuItem;

if (currentLink) {
  currentMenuItem = currentLink.parentNode;
  openParentItem(currentLink.parentNode);
}

console.info(currentLink, currentMenuItem, location.path);

},{}]},{},[1]);
