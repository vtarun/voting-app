fccVote.factory('AuthFactory', function($window){
		
	var auth = {
		isLoggedIn: $window.localStorage.token || false
	};
	
	return {
		auth : auth
	};

	
});