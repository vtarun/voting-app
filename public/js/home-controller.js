fccVote.controller('HomeController', function($scope, $http, $location){		
	$scope.user = {};
	$scope.user.username = null;
	$scope.user.password = null;

	$scope.registerUser = function(){				
		$http.post('/api/register', $scope.user).then(function(response){
			console.log(response.data.msg);
			//$modalInstance.close();
			$location.path('/');
		},function(error){
			console.log(error.data.msg);
		});
	}
});