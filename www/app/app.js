//Initializing the module
var app = angular.module('aat', ['ngRoute','infinite-scroll','ngSanitize']);


//Setting Routez
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      
      .when('/', {
        title: 'Home',
        templateUrl: 'partials/home.html',
        controller: 'home'
      })

      .when('/home', {
        title: 'Home',
        templateUrl: 'partials/home.html',
        controller: 'home'
      })

      .when('/about', {
        title: 'About us',
        templateUrl: 'partials/about.html',
        // controller: 'listCtrl'
      })


      .when('/blog', {
        title: 'Blog',
        templateUrl: 'partials/blog.html',
        controller: 'blog',
         resolve: {
                postt: function(services) {
                        para = {page: 1, count: 4};
                        return services.master('cvin/blog_data',para);

                }
            }
      })

  

      .when('/blog_categories', {
        title: 'Blog',
        templateUrl: 'partials/blogcategories.html',
        controller: 'blog_categories'
      })



      // .when('/blog-category/:cid', {
      .when('/blog-category/:cid', {
        title: 'Blog',
        templateUrl: 'partials/blog.html',
        controller: 'blog-category'
      })


       .when('/blog-detail/:bid', {
        title: 'Blog',
        templateUrl: 'partials/blog_detail.html',
        controller: 'blog_detail'
      })



       .when('/gallery', {
        title: 'gallery',
        templateUrl: 'partials/gallery.html',
        controller: 'gallery',
        controllerAs: 'gal',
        resolve: {
                imgs: function(services) {
                        thedatas ={};
                        thedatas.tabl = 'aat_image';
                        return services.master('caat/select_gallery',thedatas);

                }
            }


      })

      


    .when('/pagein', {
        title: 'Blog',
        templateUrl: 'partials/pagin.html',
        // controller: 'DemoController'
      })




      .when('/contact', {
        title: 'Contact us',
        templateUrl: 'partials/contact.html',
        controller: 'contact'
      })
      

      .otherwise({
        redirectTo: '/'
      });
}]);





app.controller('blog_categories', function ($scope, $rootScope, $routeParams, $location, $http, services,$sce) {
   

      //initially set those objects to null to avoid undefined error
        $scope.base_url     = base_url;
      $scope.thedatas              = {};
      $scope.thedatas.tabl         = 'aat_blog';
      
      $scope.over =  0; 
      $scope.show_over = "<i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i>";
      $scope.cat            = {};
      $scope.cat.tabl       = 'aat_blog_category';
      //############################Fetching datas##################################//
      

          
          $scope.para = {page: 1, count: 4};

          //   console.log($scope.para);

          services.master('cvin/select_datas',$scope.cat).then(function(result){
                 $scope.cats = result.data;
          });

         

});



app.controller('gallery',function($http,$route,$scope,services,$location,imgs){

  $scope.thedatas ={};
  $scope.thedatas.tabl = 'aat_image';
  $scope.base_url     = base_url;
  
  $scope.images = imgs.data;


});



// app.controller('blogaa', function($scope) {
//   $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

//   $scope.loadMore = function() {
//     var last = $scope.images[$scope.images.length - 1];
//     for(var i = 1; i <= 8; i++) {
//       $scope.images.push(last + i);
//     }
//   };
// });


app.controller('home',function($http,$route,$scope,services,$location,$rootScope){

        $scope.base_url     = base_url;
    
    services.master('caat/three_post',$scope.thedatas).then(function(result){
                $scope.posts = result.data;
                console.log(result.data);
    });

    $rootScope.menu = 1;

});



//Controller to post

app.controller('blog', function ($scope, $rootScope, $routeParams, $location, $http, services,$sce,postt) {
   

      //initially set those objects to null to avoid undefined error
        $scope.base_url     = base_url;
      $scope.thedatas              = {};
      $scope.thedatas.tabl         = 'aat_blog';
      $scope.refList               = {};
      $scope.imag =  {};  
      $scope.imag.name =  {}; 
      $scope.over =  0; 
      $scope.show_over = "<i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i>";
      $scope.cat            = {};
      $scope.cat.tabl       = 'aat_blog_category';
      //############################Fetching datas##################################//
      

          
          $scope.para = {page: 1, count: 4};

          //   console.log($scope.para);

          services.master('cvin/select_datas',$scope.cat).then(function(result){
                 $scope.cats = result.data;
          });

          //  services.master('cvin/blog_data',$scope.para).then(function(result){
          //        $scope.posts = result.data.result;
          // });
          $scope.posts = postt.data.result;



            $scope.loadMore = function() {

                    if($scope.over==0)
                    {
                        $scope.para.page = parseFloat($scope.para.page)+parseFloat(1);
                                         services.master('cvin/blog_data',$scope.para).then(function(result){
                                              $scope.posts_loaded = result.data.result;
                                              if($scope.posts_loaded=="")
                                              {
                                                  $scope.over=1;   
                                              }
                                              $scope.posts.push.apply($scope.posts, $scope.posts_loaded);
                                        });
                    }
                    else
                    {
                      $scope.show_over = "Thats it! No More Posts!";
                    }
            

            };






             $scope.trustedHtml = function (plainText) {
                return $sce.trustAsHtml(plainText);
            }


});

app.controller('blog-category', function ($scope, $rootScope, $routeParams, $location, $http, services,$sce, $route) {
   
      this.cid = $route.current.params.cid;
  $scope.base_url     = base_url;
      //initially set those objects to null to avoid undefined error
      $scope.thedatas              = {};
      $scope.thedatas.tabl         = 'aat_blog';
      $scope.refList               = {};
      $scope.imag                  = {};  
      $scope.imag.name             = {}; 
      $scope.over                  = 0; 
      $scope.show_over             = "<i class='fa fa-cog fa-spin fa-3x fa-fw margin-bottom'></i>";
      $scope.cat                   = {};
      $scope.cat.tabl              = 'aat_blog_category';
      
      $scope.categ                 = {};
      $scope.categ.tabl            = 'aat_blog_category';
      $scope.categ.prnm            = 'cat_id';
      $scope.categ.prky            =  this.cid;
      //############################Fetching datas##################################//
      

          
          $scope.para = {page: 1, count: 1, cat: this.cid};


          services.master('cvin/select_datas',$scope.cat).then(function(result){
                 $scope.cats = result.data;
          });


          services.master('cvin/select_data',$scope.categ).then(function(result){
                 $scope.categ = result.data;
                  console.log($scope.categ);

          });


           services.master('cvin/blog_data_cat',$scope.para).then(function(result){
                 $scope.posts = result.data.result;
                 if(result.data.total==0)
                  $scope.show_over             = "No Posts found in this category!";
          });



            $scope.loadMore = function() {

                    if($scope.over==0)
                    {
                        $scope.para.page = parseFloat($scope.para.page)+parseFloat(1);
                                         services.master('cvin/blog_data_cat',$scope.para).then(function(result){
                                              $scope.posts_loaded = result.data.result;
                                              if($scope.posts_loaded=="")
                                              {
                                                  $scope.over=1;   
                                              }
                                              $scope.posts.push.apply($scope.posts, $scope.posts_loaded);
                                        });
                    }
                    else
                    {
                      $scope.show_over = "Thats it! No More Posts!";
                    }
            

            };


             $scope.trustedHtml = function (plainText) {
                return $sce.trustAsHtml(plainText);
            }

});



app.controller('blog_detail',function($http,$route,$scope,services,$location){

    this.bid = $route.current.params.bid;
  $scope.base_url     = base_url;
 $scope.thedatas ={};
 $scope.thedatasimage ={};
 $scope.thedatas.tabl = 'aat_blog';
 $scope.thedatas.prnm = 'post_id';
 $scope.thedatas.prky =  this.bid;



 $scope.thedatasimage.tabl = 'aat_blog_image';
 $scope.thedatasimage.prnm = 'post_id';
 $scope.thedatasimage.prky =  this.bid;


 
  services.master('cvin/select_data',$scope.thedatas).then(function(result){
                $scope.posts = result.data;
                console.log($scope.posts);
    });



    services.master('cvin/select_data',$scope.thedatasimage).then(function(result){
                $scope.images = result.data;
                console.log($scope.images);
    });


});





//Factory for web service+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

app.factory("services", ['$http', function($http) {

    var serviceBase = base_url+'/admin_panel/api/ci_api/index.php/'
    // var serviceBase = 'http://192.168.43.3/temple/aat/admin_panel/api/ci_api/index.php/cvin/'
    var obj = {};



    obj.master = function(func_name,post_data){
        return $http.post(serviceBase + func_name, post_data);
    }


    return obj;   


}]);



  //Controller to add post+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
app.controller('contact', function ($scope,$http, services) {
      

      //***************initially set those objects to null to avoid undefined error*****************//
      $scope.subForm               = {};
      $scope.insdata               = {};
      $scope.button_show           = true;
      $scope.button_load           = false;

      //################initially set those objects to null to avoid undefined error################//



      //*****************************Inserting datas******************************//
      $scope.subForm  = function (insdata) {

                    $scope.button_load           = true;
                    $scope.button_show           = false;

              console.log(insdata);

                      services.master('cvin/mailer',insdata).then(function(result){
                        $scope.insdata               = {};
                                alert("Mail sent successfully! We will contact you soon");
                      });


            $scope.button_load           = false;
            $scope.button_show           = true;

      };
      //############################Inserting datas#################################//

});







app.filter('ellipsis', function () {
    return function (text, length) {
        if (text.length > length) {
            return text.substr(0, length) + "........";
        }
        return text;
    }
});





  var routeLoadingIndicator = function($rootScope) {
    return {
      restrict: 'E',
      // template:,
      templateUrl: 'partials/loading.html',
      link: function(scope, elem, attrs) {
        scope.isRouteLoading = false;

        $rootScope.$on('$routeChangeStart', function() {
          scope.isRouteLoading = true;
        });

        $rootScope.$on('$routeChangeSuccess', function() {
          scope.isRouteLoading = false;
        });
      }
    };
  };
  routeLoadingIndicator.$inject = ['$rootScope'];

  app.directive('routeLoadingIndicator', routeLoadingIndicator);

app.directive('fancybox',function($compile, $timeout){
    return {
        link: function($scope, element, attrs) {
            element.fancybox({
                hideOnOverlayClick:false,
                hideOnContentClick:false,
                enableEscapeButton:false,
                showNavArrows:false,
                width: "100%",
       

                onComplete: function(){
                    $timeout(function(){
                        $compile($("#fancybox-content"))($scope);
                        $scope.$apply();
                        $.fancybox.resize();
                    })
                }
            });
        }
    }
});





