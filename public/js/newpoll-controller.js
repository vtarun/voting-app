fccVote.controller('NewpollController' , function($scope, $http, $location){	
	$scope.poll = {};
	$scope.tempPollOption = null;
	$scope.error = null;
	$scope.poll.pollName = null;
	$scope.poll.pollOptions = [];

	var flage = false;

	$scope.addPollOption = function(){
		for(var i=0; i < $scope.poll.pollOptions.length; i++){
			if($scope.poll.pollOptions[i].option == $scope.tempPollOption){
				flage = true;
			};
		};
		if(!flage){
			$scope.poll.pollOptions.push({'option' : $scope.tempPollOption, 'votes' : 0});
			$scope.tempPollOption = null;
		}
		flage = false;		
	};
	$scope.deleteOption = function(index){
		$scope.poll.pollOptions.splice(index,1);		
	}

	$scope.createPoll = function(){
		$http.post('/api/newpoll', $scope.poll).then(function(response){			
			// $location.path('/allpolls/'+response.data.result._id);
			$location.path('/allpolls');
		},function(error){
			$scope.error = error.data;
		});
	};

	$scope.hideError = function(){
		if($scope.error){
			$scope.error = !$scope.error;
		}
	}
});