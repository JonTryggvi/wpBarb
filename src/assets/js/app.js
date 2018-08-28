import $ from 'jquery';
import whatInput from 'what-input';
import Barba from 'barba.js'
window.$ = $;

import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
//import './lib/foundation-explicit-pieces';

$(document).foundation();



var FadeTransition = Barba.BaseTransition.extend({
    start: function () {
        /**
         * This function is automatically called as soon the Transition starts
         * this.newContainerLoading is a Promise for the loading of the new container
         * (Barba.js also comes with an handy Promise polyfill!)
         */

        // As soon the loading is finished and the old page is faded out, let's fade the new page
        Promise
            .all([this.newContainerLoading, this.fadeOut()])
            .then(this.fadeIn.bind(this));
    },

    fadeOut: function () {
        /**
         * this.oldContainer is the HTMLElement of the old Container
         */

        return $(this.oldContainer).animate({ opacity: 0 }).promise();
    },

    fadeIn: function () {
        /**
         * this.newContainer is the HTMLElement of the new Container
         * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
         * Please note, newContainer is available just after newContainerLoading is resolved!
         */

        var _this = this;
        var $el = $(this.newContainer);

        $(this.oldContainer).hide();

        $el.css({
            visibility: 'visible',
            opacity: 0
        });

        $el.delay('188').animate({ opacity: 1 }, 400, function () {
            /**
             * Do not forget to call .done() as soon your transition is finished!
             * .done() will automatically remove from the DOM the old Container
             */

            _this.done();
        });
    }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function () {
    /**
     * Here you can use your own logic!
     * For example you can use different Transition based on the current page or link...
     */

    return FadeTransition;
};

var Homepage = Barba.BaseView.extend({
    namespace: 'frontpage',
  
    onEnter: function () {
        // The new Container is ready and attached to the DOM.
        
     
    },
    onEnterCompleted: function () {
        $('.marketing').addClass('expand')
        // The Transition has just finished.
    },
    onLeave: function () {
        $('.marketing').removeClass('expand')
       
        // A new Transition toward a new page has just started.
    },
    onLeaveCompleted: function () {
        // The Container has just been removed from the DOM.
    }
});

// Don't forget to init the view!
Homepage.init();

Barba.Pjax.start(); 
Barba.Prefetch.init();