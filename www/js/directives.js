


angular.module('YourApp').factory('$localstorage', ['$window', function ($window) {
  return {
    set: function (key, value) {
      $window.localStorage[key] = value;
    },
    get: function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function (key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function (key) {
      return JSON.parse($window.localStorage[key] || '{}');
    },
    remove: function(key) {
      $window.localStorage.removeItem(key);
    }
  }
}]);



app.directive('menuCloseKeepHistory', ['$ionicHistory', function($ionicHistory) {
    return {
        restrict: 'AC',
        link: function($scope, $element) {
            $element.bind('click', function() {
                var sideMenuCtrl = $element.inheritedData('$ionSideMenusController');
                if (sideMenuCtrl) {
                    $ionicHistory.nextViewOptions({
                        historyRoot: false,
                        disableAnimate: true,
                        expire: 300
                    });
                    sideMenuCtrl.close();
                }
            });
        }
    };
}]);



app.directive('dir', function($compile, $parse) {
 return {
	restrict: 'E',
	link: function(scope, element, attr) {
	  scope.$watch(attr.content, function() {
		 element.html($parse(attr.content)(scope));
		 $compile(element.contents())(scope);
	  }, true);
	}
 }
})


// filters
app.filter('cut', function () {
  return function (value, wordwise, max, tail) {
		if (!value) return '';

		max = parseInt(max, 10);
		if (!max) return value;
		if (value.length <= max) return value;

		value = value.substr(0, max);
		if (wordwise) {
			 var lastspace = value.lastIndexOf(' ');
			 if (lastspace != -1) {
				  value = value.substr(0, lastspace);
			 }
		}

		return value + (tail || ' …');
  };
});



app.directive("compareTo", function ()  
{  
    return {  
        require: "ngModel",  
        scope:  
        {  
            confirmPassword: "=compareTo"  
        },  
        link: function (scope, element, attributes, modelVal)  
        {  
            modelVal.$validators.compareTo = function (val)  
            {  
                return val == scope.confirmPassword;  
            };  
            scope.$watch("confirmPassword", function ()  
            {  
                modelVal.$validate();  
            });  
        }  
    };  
});  