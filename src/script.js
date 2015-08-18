(function() {
  'use strict';

  function byID(id) {
    return document.getElementById(id);
  }

  var Modal = {
    buyTab: byID('buy-tab'),
    dlTab: byID('dl-tab'),
    tabForm1: byID('tb-content-1'),
    tabForm2: byID('tb-content-2'),
    modal: byID('modal'),
    actionIDs: ['navbar', 'mobile-nav', 'main-actions']
  };


  Modal.showBuyTab = function() {
    classie.addClass(this.buyTab, 'tab--active');
    classie.removeClass(this.dlTab, 'tab--active');
    classie.removeClass(this.tabForm1, 'tab-hide');
    classie.addClass(this.tabForm2, 'tab-hide');
  };

  Modal.showDLTab = function() {
    classie.addClass(this.dlTab, 'tab--active');
    classie.removeClass(this.buyTab, 'tab--active');
    classie.removeClass(this.tabForm2, 'tab-hide');
    classie.addClass(this.tabForm1, 'tab-hide');
  };

  Modal.addTabEvents = function() {
    this.buyTab.addEventListener('click', function() { Modal.showBuyTab(); });
    this.dlTab.addEventListener('click', function() { Modal.showDLTab(); });
  };

  Modal.addModalEvents = function(el) {
    if (!el) return; // if element null, dont add events
    el.addEventListener('click', function(e) {
      var action = e.target.getAttribute('data-action');
      if (action == "dl") {
        e.preventDefault();
        Modal.showDLTab();
        classie.toggleClass(Modal.modal, 'md-show');
      } else if (action == "buy") {
        e.preventDefault();
        Modal.showBuyTab();
        classie.toggleClass(Modal.modal, 'md-show');
      }
    });
  };

  Modal.initEvents = function() {
    this.actionIDs.map(byID).forEach(this.addModalEvents);
    ['md-close', 'md-overlay'].map(byID).forEach(function(el) {
      el.addEventListener('click', function() {
        classie.removeClass(Modal.modal, 'md-show');
      });
    });
    this.addTabEvents();
  };

  document.addEventListener('DOMContentLoaded', function() {
    Modal.initEvents();
  });
}());
