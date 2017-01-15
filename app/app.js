require('angular');
require('angular-ui-router');

const catApp = angular.module('catApp', ['ui.router']);


//config

catApp.config(['$stateProvider', function($stateProvider) {
	$stateProvider
	.state('login', {
		url: '',
		templateUrl: './login.html',
		controller: 'loginController',
		controllerAs: 'logCtrl'
	})
	.state('catalogue', {
		url: '/:login',
		templateUrl: './catalogue.html',
		controller: 'catalogueController',
		controllerAs: 'catCtrl'
	})
	.state('item', {
		url: '/:login/:itemId',
		templateUrl: './details.html',
		controller: 'detailsController',
		controllerAs: 'detCtr'
	});
}]);


// controllers

catApp.controller('loginController', ['$scope', '$location', '$http', function($scope, $location, $http) {
	$scope.login = function() {
		$location.path('/' + $scope.name);
	}
}]);

catApp.controller('catalogueController', ['$scope', '$location', '$http', '$stateParams', function($scope, $location, $http, $stateParams) {
	$scope.name = $stateParams.login;
	$http.get('https://jsonplaceholder.typicode.com/albums', {cache: true}).then(function(res) {
		$scope.catalogue = res.data;
	}, function(res) {
		console.log(res);
	});
	$scope.details = function() {
		$location.path('/' + $stateParams.login + '/' + (this.$index + 1));
	}
}]);

catApp.controller('detailsController', ['$scope', '$stateParams', '$http', '$location', function($scope, $stateParams, $http, $location) {
	$scope.itemId = $stateParams.itemId;
	$http.get('https://jsonplaceholder.typicode.com/photos', {cache: true}).then(function(res) {
		$scope.photos = [];
		res.data.forEach(function(photo) {
			if (photo.albumId == $scope.itemId)
				$scope.photos.push(photo);
		});
	});
	$scope.showPic = function(photo) {
		$scope.photo = photo;
		$scope.photo.show = true;
	};
	$scope.goBack = function() {
		$location.path('/' + $stateParams.login);
	}
}])