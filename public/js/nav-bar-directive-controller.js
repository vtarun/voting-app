fccVote.controller('NavBarController', function($scope, $http, AuthFactory, $window, jwtHelper, $location){
	$scope.user ={};
	$scope.user.username = null;
	$scope.user.password = null;

	if(AuthFactory.auth.isLoggedIn){
		$scope.isLoggedIn = AuthFactory.auth.isLoggedIn;
		var token = $window.localStorage.token;
		var decodedToken = jwtHelper.decodeToken(token);
		$scope.loggedInUser = decodedToken.username;
	}
	
	$scope.loginUser = function(){		
		$http.post('/api/login', $scope.user)
			.then(function(response){
				var token = response.data.token
				$scope.isLoggedIn = true;
				AuthFactory.auth.isLoggedIn = true;
				$scope.user.password = null;
				$window.localStorage.setItem('token', token);
				var decodedToken = jwtHelper.decodeToken(token);
				$scope.loggedInUser = decodedToken.username;
				$window.localStorage.setItem('user', $scope.loggedInUser);
		}, function(error){
			console.log(error);
			$scope.user.password = null;
		});
		
	};
	
	$scope.logout = function(){
		$window.localStorage.clear();
		$scope.isLoggedIn = false;
		AuthFactory.auth.isLoggedIn = false;
		$scope.user.username = null;
		$scope.user.password = null;
		$location.path('/');
	};		
});