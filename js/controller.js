var easterApp = angular.module("EasterApp", []);

easterApp.controller('RabbitsHole', ['$scope', 'EggService', function($scope, EggService) {

		var limitOfEggs = 100;
		var noOfBaskets = 1;
		$scope.baskets = EggService.RabbitsBaskets;

		$scope.PaintEgg = function(idx, factor) {
			return EggService.PaintEgg(idx, factor);
		};

		$scope.fillBaskets = function() {
			for (var i = 0; i < noOfBaskets; i++) {
				EggService.RabbitsBaskets[i] = [];
			}
			EggService.getEggs(EggService.RabbitsBaskets, limitOfEggs);
		};

		$scope.identity = angular.identity;
	}]);

easterApp.controller('Meadow', ['$scope', 'EggService', function($scope, EggService) {

		var limitOfEggs = 10;
		var noOfBaskets = 30;

		$scope.baskets = [];

		$scope.activeFilter = null;
		$scope.activeFilterDescription = 'none';

		$scope.setShowAll = function() {
			$scope.activeFilter = null;
			$scope.activeFilterDescription = 'none';
		}

		$scope.setShowMatchingOne = function() {
			$scope.activeFilter = $scope.intersectOne;
			$scope.activeFilterDescription = 'match one';
		}

		$scope.setShowMatchingAll = function() {
			$scope.activeFilter = $scope.intersectAll;
			$scope.activeFilterDescription = 'match all';
		}

		$scope.intersectOne = function(value) {
			return EggService.intersect(value, EggService.RabbitsBaskets[0]).length === 1;
		};

		$scope.intersectAll = function(value) {
			return EggService.intersect(value, EggService.RabbitsBaskets[0]).length === value.length;
		};

		$scope.PaintEgg = function(idx, factor) {
			return EggService.PaintEgg(idx, factor);
		};

		$scope.fillBaskets = function() {
			for (var i = 0; i < noOfBaskets; i++) {
				$scope.baskets[i] = [];
			}
			EggService.getEggs($scope.baskets, limitOfEggs);
		};

		$scope.identity = angular.identity;
	}]);

easterApp.factory("EggService", function($http) {

	var valueLimit = 999;

	var recursive = function(baskets, basket_idx, egg_limit) {
		$http({method: 'GET', url: 'http://localhost:3000/basket/1/' + valueLimit + '/' + egg_limit}).
						success(function(data, status) {
							console.log('got basket', data);
							baskets[basket_idx] = data;
							basket_idx++;
							if (basket_idx < baskets.length) {
								recursive(baskets, basket_idx, egg_limit);
							}
						}).
						error(function(data, status) {
							console.log('request failed');
							recursive(baskets, basket_idx, egg_limit);
						});
	}

	return {
		getEggs: function(baskets, egg_limit) {
			recursive(baskets, 0, egg_limit);
		},
		RabbitsBaskets: [],
		PaintEgg: function(idx, factor) {
			var val1 = idx % 255;
			var val2 = Math.pow(idx, 2) % 255;
			var val3 = Math.pow(idx, 3) % 255;
			return '' + Math.round(val1 / factor).toString(16).lpad('0', 2) + Math.round(val2 / factor).toString(16).lpad('0', 2) + Math.round(val3 / factor).toString(16).lpad('0', 2);
		},
		intersect: function(arr1, arr2) {
			var temp = [];
			for (var i = 0; i < arr1.length; i++) {
				for (var k = 0; k < arr2.length; k++) {
					if (arr1[i] === arr2[k]) {
						temp.push(arr1[i]);
						break;
					}
				}
			}
			return temp;
		}

	};
});

String.prototype.lpad = function(padString, length) {
	var str = this;
	while (str.length < length)
		str = padString + str;
	return str;
}

