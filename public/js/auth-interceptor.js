fccVote.factory('AuthInterceptor', function($window, $q){
	
	return {
		request : request
	};

	function request(config){
		config.headers = config.headers || {};
		if($window.localStorage.token){
			config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
		}
		return config;
	}

	// function response(response){
	// 	if($window.localStorage.token && !AuthFactory.auth.isLoggedIn){
	// 		AuthFactory.auth.isLoggedIn = true;			
	// 	}
	// 	// if(response.data.status === 401){
	// 	// 	AuthFactory.auth.isLoggedIn = false;			
	// 	// }
	// 	return response || $q.when(response);
	// }

	// function responseError(rejection){
	// 	if (rejection.status === 401 || rejection.status === 403) {
	//     	delete $window.localStorage.token;
	//       	AuthFactory.auth.isLoggedIn = false;
	//       	$location.path('/');
	//     }
	//     return $q.reject(rejection);
	// }


	
});