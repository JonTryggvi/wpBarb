const FrontPage = {
  namespace: 'frontpage',

  onEnter: function () {
    // The new Container is ready and attached to the DOM.


  },
  onEnterCompleted: function () {
    $('.marketing').addClass('expand')
    // The Transition has just finished.
  },
  onLeave: function () {
    // $('.marketing').removeClass('expand')

    // A new Transition toward a new page has just started.
  },
  onLeaveCompleted: function () {
    // The Container has just been removed from the DOM.
  }
}

module.exports = FrontPage;
