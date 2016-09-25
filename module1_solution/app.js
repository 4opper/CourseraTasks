(function () {
'use strict';

angular.module('LunchCheck', [])
	   .controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
	$scope.dishes = "";
	$scope.messageToShow = "";

	$scope.checkDishes = function () {
		if ($scope.dishes) {
			$scope.isEmpty = false;

// Make array from inputed string
			var dishesArray = $scope.dishes.split(',');

// Make var to decrease it if there is an empty item inputed
			var dishesArrayLenght = dishesArray.length;

// Runs over array of items and if finds empty item e.g. ", ," decrease dishesArrayLenght by 1
			for (var i = 0; i < dishesArray.length; i++) {
				if (dishesArray[i].toString() == false) {
					dishesArrayLenght = dishesArrayLenght - 1;
				}
			}

			if (dishesArrayLenght < 4) {
				$scope.messageToShow = "Enjoy!";
			} else {
				$scope.messageToShow = "Too much!";
			}
		} else {
			$scope.isEmpty = true;
			$scope.messageToShow = "Please enter data first";
		}
	}
}

})();