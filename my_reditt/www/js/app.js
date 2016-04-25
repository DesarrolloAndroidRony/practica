(function(){

var app = angular.module('starter', ['ionic','angularMoment'])

app.controller('reditControler',function($scope, $http){
    $scope.posts = [];
    $http.get('https://www.reddit.com/r/gaming/new/.json')   
        .success(function(posts){
          //  console.log(posts);
            angular.forEach(posts.data.children, function(post){    
                $scope.posts.push(post.data);
            });
                            
        });
    
        $scope.refresh = function(){
            var params2 = {};
            if($scope.posts.length > 0){
                params2['after'] = $scope.posts[$scope.posts.length - 1].name;  
            }
            $http.get('https://www.reddit.com/r/gaming/new/.json', {params:params2})   
            .success(function(posts){   
                angular.forEach(posts.data.children, function(post){    
                $scope.posts.push(post.data);
            });
             $scope.$broadcast('scroll.infiniteScrollComplete');
    });                
            
        };
    
        $scope.doRefresh = function(){
            var params3 = {'before': $scope.posts[0].name};
            $http.get('https://www.reddit.com/r/gaming/new/.json', {params:params3})
            .success(function(posts) {
            angular.forEach(posts.data.children, function(post){    
                $scope.posts.push(post.data);
            });
            })
                .finally(function() {
                // Stop the ion-refresher from spinning
                $scope.posts = params3
                $scope.$broadcast('scroll.refreshComplete');
     })
  };
    });

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
}());