require('bootstrap/dist/css/bootstrap.css');
require('./styles/style.scss');

var angular = require('angular');
var uirouter = require('angular-ui-router');

const catApp = angular.module('catApp', [uirouter]);


//config 

catApp.config(['$stateProvider', function($stateProvider) {
	$stateProvider
	.state('login', {
		url: '',
		template: require('./temp/login.pug'),
		controller: 'loginController',
		controllerAs: 'logCtrl'
	})
	.state('catalogue', {
		url: '/:login',
		template: require('./temp/catalogue.pug'),
		controller: 'catalogueController',
		controllerAs: 'catCtrl'
	})
	.state('item', {
		url: '/:login/:itemId',
		template: require('./temp/details.pug'),
		controller: 'detailsController',
		controllerAs: 'detCtr'
	});
}]);


// controllers

catApp.controller('loginController', ['$scope', '$http', '$state', function($scope, $http, $state) {
	$scope.login = function() {
		$state.go('catalogue', {login: $scope.name});
	};
}]);

catApp.controller('catalogueController', ['$scope', '$http', '$stateParams', '$state', function($scope, $http, $stateParams, $state) {
	if (!$stateParams.login) $state.go('login');
	$scope.name = $stateParams.login;
	$http.get('https://jsonplaceholder.typicode.com/albums', {cache: true}).then(function(res) {
		$scope.catalogue = res.data;
	}, function(res) {
		console.log(res);
	});

	$scope.details = function() {
		$state.go('item', {login: $stateParams.login, itemId: this.$index + 1});
	};

	$scope.logout = function() {
		$state.go('login');
	};

}]);

catApp.controller('detailsController', ['$scope', '$stateParams', '$http', '$state', function($scope, $stateParams, $http, $state) {

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
		$scope.show = true;
	};

	$scope.goBack = function() {
		$state.go('catalogue', {login: $stateParams.login});
	};

	$scope.showNext = function() {
		$scope.photo = $scope.photos[$scope.photos.indexOf($scope.photo) + 1];
	};

	$scope.showPrev = function() {
		$scope.photo = $scope.photos[$scope.photos.indexOf($scope.photo) - 1];
	};

}])