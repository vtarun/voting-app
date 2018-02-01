fccVote.controller('MypollsController' , function($scope, $http, $window){
	
	$scope.loadMyPolls = function(){
		$http.get('/api/mypolls').then(function(response){
			$scope.myAllPolls = response.data.result;
		},function(error){
			console.log(error.data);
		});
	};

	$scope.deletePoll = function(pollId){
		$http.delete('/api/mypolls/delete/'+pollId).then(function(response){
			$scope.loadMyPolls();
		})
	};

	$scope.loadMyPolls();	
});