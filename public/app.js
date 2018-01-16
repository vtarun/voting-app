var fccVote = angular.module('myApp', ['ngRoute', 'googlechart']);

fccVote.config(function($routeProvider, $locationProvider){	
	$locationProvider.html5Mode(true);
	$routeProvider
		.when('/login', {
			templateUrl : 'templates/login.html' 
		})
		.when('/polls', {
			templateUrl : 'templates/home.html',
			controller : 'HomeController'
		})
		.when('/polls/:id', {
			templateUrl : 'templates/poll.html',
			controller : 'PollController'
		})
		.when('/mypolls', {
			templateUrl : 'templates/mypolls.html',
			controller : 'MypollsController'
		})
		.when('/newpoll', {
			templateUrl : 'templates/newpoll.html',
			controller : 'NewpollController'
		})
		.otherwise({
			redirectTo : '/polls'
		});
});

fccVote.directive('loginModal', function(){
	return{
		restrict: 'E',
		templateUrl: './templates/login-modal.html'
	}
});