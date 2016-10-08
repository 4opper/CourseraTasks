(function () {
'use strict';

angular.module('MenuApp')
.component('itemsList', {
  templateUrl: 'js/templates/itemsList.template.html',
  bindings: {
    items: '<'
  }
});

})();