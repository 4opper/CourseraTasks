(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesListController', CategoriesListController);


CategoriesListController.$inject = ['categories'];
function CategoriesListController(categories) {
  var mainList = this;
  mainList.categories = categories;
}

})();