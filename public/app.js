var fccVote = angular.module('myApp', ['ngRoute', 'angular-jwt', 'googlechart']);

fccVote.config(function($routeProvider, $httpProvider, $locationProvider){	
	$httpProvider.interceptors.push('AuthInterceptor');
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/', {
			templateUrl : 'templates/home.html',
			controller :  'HomeController',
			access : {
				restricted : false
			}
		})		
		.when('/allpolls', {
			templateUrl : 'templates/allpolls.html',
			controller : 'AllPollsController',
			access : {
				restricted : false
			}
		})
		.when('/polls/:id', {
			templateUrl : 'templates/poll.html',
			controller : 'PollController',
			access : {
				restricted : false
			}
		})
		.when('/mypolls', {
			templateUrl : 'templates/mypolls.html',
			controller : 'MypollsController',
			access : {
				restricted : true
			}
		})
		.when('/newpoll', {
			templateUrl : 'templates/newpoll.html',
			controller : 'NewpollController',
			access: {
				restricted: true
			}
		})
		.when('/tutorial', {
			templateUrl : 'templates/tutorial.html',
			controller : 'TutorialController',
			access: {
				restricted: false
			}
		})		
		.otherwise({
			redirectTo : '/'
		});
});

fccVote.directive('loginModal', function(){
	return{
		restrict: 'E',
		templateUrl: './templates/login-modal.html'
	}
});

fccVote.directive('navBarDirective', function(){
	return{
		restrict: 'E',
		templateUrl: './templates/nav-bar-directive.html',
		controller: 'NavBarController'
	}
});

fccVote.run(function($rootScope, $window, AuthFactory, $location){
	$rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
		if(nextRoute.access !== undefined && nextRoute.access.restricted && $window.localStorage.token && !AuthFactory.auth.isLoggedIn){
			event.preventDefault();
			$location.path('/');
		}
	})
});





