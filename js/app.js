(function (angular) {
	'use strict';

	/*创建模块*/
	var myApp=angular.module('app',['ngRoute','app.controllers.main']);

	/*路由配置*/
	myApp.config(['$routeProvider',function($routeProvider){
		$routeProvider
			.when('/:status?',{
				controllers:'MainController',
				templateUrl:'main_tmpl'
			})
			.otherwise({ redirectTo:'/' });
	}]);


})(angular);
