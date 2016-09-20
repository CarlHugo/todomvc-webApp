/**
 * Created by Carl_Hugo on 2016/9/19.
 */
(function(angular){
	'use strict'

	//独立的模块
	var controllers=angular.module('app.controllers.main',['app.services.main']);

	controllers.controller('MainController',[
		'$scope',
		'$routeParams',
		'$route',
		'MainService',
		function($scope,$routeParams,$route,MainService){
			//输入文本框
			$scope.text='';

			//任务列表 结构 {id:1,text:'吃饭',completed:false}
			$scope.todos=MainService.get();

			//添加todo
			$scope.add=function(){
				//参数校验 界面逻辑
				if(!$scope.text){
					return;
				}
				MainService.add($scope.text);
				console.log('ddd');
				//清空输入栏
				$scope.text='';
			};

			//处理删除
			$scope.remove=MainService.remove;

			//清除已完成
			$scope.clear=function(){
				var newTodos=MainService.clearCompleted();
				$scope.todos=newTodos;
			};


			//是否有已经完成的
			$scope.existCompleted=MainService.existCompleted;

			//当前编辑哪个元素
			//-1代表没有任何元素被编辑
			$scope.currentEditingId=-1;

			$scope.editing=function(id){
				$scope.currentEditingId=id;
			}

			$scope.save=function(){
				$scope.currentEditingId=-1;
			}

			$scope.toggleAll=MainService.toggleAll;

			$scope.toggle=function(){
				MainService.save();
			}

			//状态筛选
			$scope.selector={};
			//取出路由中匹配出的数据
			var status=$routeParams.status;
			switch(status){
				case 'active':
					$scope.selector={completed:false};
					break;
				case 'completed':
					$scope.selector={completed:true};
					break;
				default:
					$route.updateParams({status:''});
					$scope.selector={};
					break;
			}

			//自定义比较函数,默认filter使用的是模糊匹配
			$scope.equalCompare=function(source,target){
				return source===target;
			}
	}]);

})(angular);
