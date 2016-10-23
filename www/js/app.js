// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('scheduling', ['ionic', 'firebase','scheduling.controllers', 'scheduling.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    $rootScope.userEmail = null;
    $rootScope.baseUrl = 'http://bucketlist-app.firebaseio.com';
    var authRef = new Firebase($rootScope.baseUrl);
    $rootScope.auth = $firebaseAuth(authRef);

    $rootScope.show = function(text) {
      $rootScope.loading = $ionicLoading.show({
        content: text ? text : 'Loading..',
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0
      });
    };

    $rootScope.hide = function() {
      $ionicLoading.hide();
    };

    $rootScope.notify = function(text) {
      $rootScope.show(text);
      $window.setTime(function(){
        $rootScope.hide();
      }, 1999);
    };

    $rootScope.logout = function() {
      $rootScope.auth.$logout();
      $rootScope.checkSession();
    };

    $rootScope.checkSession = function() {
      var auth = new FirebaseSimpleLogin(authRef, function(error, user) {
        if (error) {
          //no action yet.. redirect to default route
          $rootScope.userEmail = null;
          $window.location.href = '#/auth/signin';
        } else if (user) {
          // user authenticated with Firebase
          $rootScope.userEmail = user.email;
          $window.location.href = ('#/scheduling/list');
        } else {
        // user is logged out
          $rootScope.userEmail = null;
          $window.location.href = '#auth/signin';
        }
      });
    };
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the auth directive

  .state('auth', {
    url: "/auth",
    abstract: true,
    templateUrl: "templates/auth.html"
  })

  .state('auth.signin', {
    url: '/signin',
    views: {
      'auth-signin' :{
        templateUrl: 'templates/auth-signin.html',
        controller: 'SignInCtrl'
      }
    }
  })

  .state('auth.signup', {
    url: '/signup',
    views: {
      'auth-signup': {
        templateUrl: 'templates/auth-signup.html',
        controller: 'SignUpCtrl'
      }
    }
  })

.state ('bucket', {
  url: "/bucket",
  abstract: true,
  templateUrl: "templates/bucket.html"
})

.state('bucket.list', {
  url: '/list',
  views: {
    'bucket-list': {
    templateUrl: 'templates/bucket-list.html',
    controller: 'myListCtrl'
    }
  }
})

.state('bucket.completed', {
  url: '/completed',
  views: {
    'bucket-completed': {
      templateUrl: 'templates/bucket-completed.html',
      controller: 'completedCtrl'
    }
  }
})



  // // setup an abstract state for the tabs directive
  //   .state('tab', {
  //   url: '/tab',
  //   abstract: true,
  //   templateUrl: 'templates/tabs.html'
  // })

  // // Each tab has its own nav history stack:

  // .state('tab.dash', {
  //   url: '/dash',
  //   views: {
  //     'tab-dash': {
  //       templateUrl: 'templates/tab-dash.html',
  //       controller: 'DashCtrl'
  //     }
  //   }
  // })

  // .state('tab.chats', {
  //     url: '/chats',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/tab-chats.html',
  //         controller: 'ChatsCtrl'
  //       }
  //     }
  //   })
  //   .state('tab.chat-detail', {
  //     url: '/chats/:chatId',
  //     views: {
  //       'tab-chats': {
  //         templateUrl: 'templates/chat-detail.html',
  //         controller: 'ChatDetailCtrl'
  //       }
  //     }
  //   })

  // .state('tab.account', {
  //   url: '/account',
  //   views: {
  //     'tab-account': {
  //       templateUrl: 'templates/tab-account.html',
  //       controller: 'AccountCtrl'
  //     }
  //   }
  // });

  // if none of the above states are matched, use this as the fallback
  // $urlRouterProvider.otherwise('/tab/dash');
      $urlRouterProvider.otherwise('/auth/signin');
});
