(function () {
'use strict'

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['$http', 'ApiPath', 'commonDataFactory', '$scope'];
function SignUpController($http, ApiPath, commonDataFactory, $scope) {
	var $ctrl = this;

	$ctrl.user = {};
	commonDataFactory.user = $ctrl.user;
	$ctrl.dishDoesntExist;

	$ctrl.submit = function () {
		$ctrl.haveInfo = true;
		commonDataFactory.haveInfo = $ctrl.haveInfo;
		$scope.signUpForm.$setPristine();
		$scope.signUpForm.$setUntouched();
		$ctrl.user = {};
		$ctrl.favouritedish = "";
		// console.log("User in common data: ", commonDataFactory.user);
		// console.log("User in this ctrl: ", $ctrl.user);
	};

	$ctrl.checkFaveDish = function (query) { 
		if (query) {
			return $http.get(ApiPath + '/menu_items/' + query + '.json').then(function (response) {
				if (response.data.id) {
					$ctrl.dishDoesntExist = false;
					commonDataFactory.user.faveDish = response.data;
				}
	    	}, function (response) {
		        	$ctrl.dishDoesntExist = true;
		    	});
		}
		
	};
}

})();