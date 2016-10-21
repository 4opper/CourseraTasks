(function () {

'use strict'

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['commonDataFactory']
function MyInfoController(commonDataFactory) {
	var $ctrl = this;

	$ctrl.haveInfo = commonDataFactory.haveInfo;
	$ctrl.user = commonDataFactory.user;

}

})();