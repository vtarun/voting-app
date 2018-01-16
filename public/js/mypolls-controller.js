fccVote.controller('MypollsController' , function($scope, $http){
	
	$scope.loadMyPolls = function(){
		$http.get('/api/mypolls/tarun').then(function(response){
			$scope.myAllPolls = response.data.result;
		});
	};

	$scope.deletePoll = function(pollId){
		$http.delete('/api/mypolls/delete/'+pollId).then(function(response){
			$scope.loadMyPolls();
		})
	};

	$scope.loadMyPolls();	
});