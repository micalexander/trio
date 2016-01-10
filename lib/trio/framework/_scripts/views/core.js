/*global Backbone, jQuery, _ */
var app = app || {};

(function ($) {
  'use strict';

  app.CoreView = Backbone.View.extend({
    el : function() {
      return document.getElementById( 'container' );
    },

    events : {
      'click .mask-control' : 'initRouter'
    },

    initRouter : function ( evt ) {
      evt.preventDefault();

      // Get the link
      var pathname = evt.target.pathname;

      // Trigger the router
      app.router.navigate( pathname, { trigger: true } );
    },

    initialize : function() {
        this.$posts = $( '#posts' );
        this.listenTo( app.archive, 'reset', this.addAll );
    },

    addAll : function() {
      this.$posts.html( '' );
      app.archive.each( this.addOne, this );
    },

    addOne: function ( post ) {
      var view = new app.PostView( { model: post } );
      this.$posts.append( view.render().el );
    }
  });
})(jQuery);