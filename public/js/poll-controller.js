fccVote.controller('PollController', function($scope, $http, $routeParams, $window){
	$scope.test = 'Poll controller is working';
	$scope.selectedOption = null;
    $scope.poll = {};
    $scope.poll.id = $routeParams.id;
    $scope.myChartObject = {};    
    $scope.myChartObject.type = "PieChart";
    $scope.myChartObject.options = {
        'title': 'How many votes!!',
        is3D:true,
    };
    $scope.myChartObject.data = {};
    $scope.myChartObject.data.rows = [];
    $scope.myChartObject.data.cols = [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ];    
	
    $scope.chartDataValues = function(data){
        for(var i=0; i< data.length; i++){
            $scope.myChartObject.data.rows.push({c: [{v: data[i].option}, {v: parseInt(data[i].votes)}]});                
        }
    };

	$scope.load = function(){
		$http.get('/api/poll/'+$routeParams.id).then(function(response){
            $scope.myChartObject.data.rows = [];
			$scope.poll.pollName = response.data.result.poll_name;
			$scope.poll.pollOptions = response.data.result.poll_options;

            $scope.chartDataValues($scope.poll.pollOptions);            
		});	
	};

	$scope.load();
    
    $scope.hideError = function(){
        if($scope.error){
            $scope.error = !$scope.error;
        }
    };

	$scope.submit = function(){
        var user = $window.localStorage.user || null;
		$http.post('/api/vote', {'id' : $routeParams.id, 'choosed_option' : $scope.selectedOption, 'user' : user}).then(function(response){			           
            $scope.load();
		}, function(error){
            $scope.error = error.data;
        });		
	};    
});









