(function () {
	'use strict';

angular
	.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective)

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				items: '<',
				onRemove: '&'
			},
			controller: NarrowItDownController,
			controllerAs: 'ctrl',
			bindToController: true
		};

		return ddo;
	}

	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http) {
		var service = this;

		service.getMatchedMenuItems = function (searchTerm) {
			return $http.get('https://davids-restaurant.herokuapp.com/menu_items.json').then(function (result) {
			    // process result and only keep items that match
			    var items = [];

			    for(var i = 0; i < result.data.menu_items.length; i++){
			    	if (result.data.menu_items[i].description.indexOf(searchTerm) !== -1) {
			    		items.push(result.data.menu_items[i]);
			    	}
			    }

			    if (!items[0]) {
			    	service.error = true;
			    } 
			    // return processed items
			    return items;
			});
		}
		
		service.rightItems;	
	}
	
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController	(MenuSearchService) {
		var ctrl = this;
		
		ctrl.getFound = function () {
			ctrl.found = MenuSearchService.rightItems;
			ctrl.error = MenuSearchService.error;		
			
		};

		ctrl.makeFound = function (searchTerm) {
			MenuSearchService.rightItems = "";
			if (searchTerm) {
				MenuSearchService.rightItems = MenuSearchService.getMatchedMenuItems(searchTerm)
			} else {
				MenuSearchService.error = true;
			}			
			
			ctrl.getFound();			
		}

		ctrl.removeItem = function (index) {
			ctrl.getFound();
		    ctrl.found.$$state.value.splice(index.index, 1);
		 };
	}
})();


			