/**
 * Created by Carl_Hugo on 2016/9/19.
 */
(function(angular){
	//注册一个新模块
	angular.module('app.services.main',[])
		.service('MainService',['$window',function($window){
			//获取浏览器存储空间
			var storage=$window.localStorage;
			//将字符串数据解析成json对象
			var todos=storage['my_todo_list']?JSON.parse(storage['my_todo_list']):[];

			//获取唯一的ID
			function getId(){
			    var id=Math.random();
				for(var i=0;i<todos.length;i++){
					if(todos[i].id===id){
						id=getId();
						break;
					}
				}
				return id;
			}

			this.save=function(){
				//将json数据解析成字符串存入localStorage
				storage['my_todo_list']=JSON.stringify(todos);
			};

			this.get=function(){
				return todos;
			};

			//业务逻辑必须出现在字段中
			this.add=function(text){
				todos.push({
					//自动增长
					id:getId(),
				    text:text,
					completed:false
				});
				this.save();
			};


			// 处理删除
			this.remove = function(id) {
				for (var i = 0; i < todos.length; i++) {
					if (todos[i].id === id) {
						todos.splice(i, 1);
						break;
					}
				}
				this.save();
			};


			//清空已完成
			this.clearCompleted=function(){
                var result=[];
				for(var i=0;i<todos.length;i++){
					if(!todos[i].completed){
						result.push(todos[i]);
					}
				}
				todos=result;
				this.save();
				//将todos指向了一个新的地址
				return todos;
			};



			//是否有已经完成的
			this.existCompleted=function(){
				for(var i=0;i<todos.length;i++){
					if(todos[i].completed){
						return true;
					}
				}
				return false;
			};

			//更新
			this.update=function(){
				this.save();
			};

			var now=true;
			this.toggleAll=function(){
				for(var i=0;i<todos.length;i++){
					todos[i].completed=now;
				}
				now=!now;
				this.save();
			};

		}]);


})(angular);
