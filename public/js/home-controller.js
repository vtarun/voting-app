fccVote.controller('HomeController', function($scope, $http){	
	$scope.allPolls = [];
	$http.get('/api/all-polls').then(function(response){
		$scope.allPolls = response.data.result;
		console.table($scope.allPolls);
	})
});