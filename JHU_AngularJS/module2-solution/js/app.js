
(function () {
/**
* ShoppingListCheckOff Module
*
* Description
*/
angular.module('ShoppingListCheckOff', [])
	   .controller('ToBuyController', ToBuyController)
	   .controller('AlreadyBoughtController', AlreadyBoughtController)
	   .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

function ShoppingListCheckOffService () {
	var service = this;
	var bought = [];
	var toBuy = [
		{
			name: 'milks.',
			quantity: 3
		},
		{
			name: 'bananas.',
			quantity: 10
		},
		{
			name: 'chicken legs.',
			quantity: 4
		},
		{
			name: 'potatoes.',
			quantity: 15
		},
		{
			name: 'eggs.',
			quantity: 10
		}
	];

	service.buy = function (itemIdex) {
		if (toBuy[0]) {
			var yourItem = toBuy.splice(itemIdex, 1);
			bought.push(yourItem[0]);
			if (!toBuy[0]) {
				throw new Error("Everything is bought!");
			}
		}	
	};

	service.getItems = function () {
		return toBuy;
	};

	service.getBoughtItems = function () {
		return bought;
	};
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var bought = this;

	bought.items = ShoppingListCheckOffService.getBoughtItems();
}

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
	var needed = this;

	needed.items = ShoppingListCheckOffService.getItems();
	needed.buy = function (itemIdex) {
		try {
			ShoppingListCheckOffService.buy(itemIdex);	
		} catch(error) {
			needed.errorMessage = error.message;
		}		
	};
}	
})();