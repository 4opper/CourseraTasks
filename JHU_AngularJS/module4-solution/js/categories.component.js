(function () {
'use strict';

angular.module('MenuApp')
.component('categoriesList', {
  templateUrl: 'js/templates/categoriesList.template.html',
  bindings: {
    categories: '<'
  }
});

})();