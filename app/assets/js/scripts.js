/*!
 * boilerplate
 * Quick way to setup your Gulp + SASS front-end environment
 * https://devign.it/boilerplate
 * @author Daan van der Zwaag
 * @version 1.0.1
 * Copyright 2017. MIT licensed.
 */
/*!
 * internsite
 * Internsite
 * https://internsite.dvdz.design
 * @author Daan van der Zwaag
 * @version 1.0.0
 * Copyright 2016. MIT licensed.
 */
(function($, window, document, undefined) {

  'use strict';

  $(function() {

    // Little big details
    var messagesGone = ['Don\'t ditch me', 'Come back please', 'Ignoring me?', 'I\'m gonna cry', 'Getting drunk brb'];
    var messagesLink = ['Nice one', 'Check it out', 'Personal fav', 'Random', 'Ayyy lmao'];
    var original;

    $(window).focus(function() {
      if (original) {
        document.title = original;
      }
    }).blur(function() {
      var title = $('title').text();
      var choosenMessage = messagesGone[Math.floor(Math.random() * messagesGone.length)];
      if (title !== choosenMessage) {
        original = title;
      }
      document.title = choosenMessage;
    });

    // HoverImage


  });

})(jQuery, window, document);
