(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: 'js/templates/home.template.html',
			resolve: {
		      categories: ['MenuDataService', function (MenuDataService) {
		        return MenuDataService.getAllCategories();     
		      }]
		    }
		})

		.state('home.categories', {
		    url: 'categories',
		    templateUrl: 'js/templates/categories.template.html',
		    controller: 'CategoriesListController as mainList'
		})

		.state('items', {
			url: '/items/{categoryName}',
			templateUrl: 'js/templates/items.template.html',
			controller: 'ItemsListController as itemsCtrl',
			resolve: {
				items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
					var short_name = $stateParams.categoryName;
					return MenuDataService.getItemsForCategory(short_name);
				}]
			}
		})
}

})();