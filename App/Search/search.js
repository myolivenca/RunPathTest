angular.module('app')
    .controller('SearchCtrl', ['$http','$timeout', function ($http,$timeout) {
        var vm = this;
        var timer;

        vm.focus = false;
        vm.tags = "";
        var isotope = $(".jq_grid").isotope();
        
        var onError = function() {
            $(document.body).ec_alertsToaster({
                message: 'error reading data',
                type: 'state-warning',
                toastLife: 3000
            });
        }

        var onComplete = function(response) {
            $(document.body).ec_alertsToaster({
                message: 'data successful loaded',
                type: "state-success",
                toastLife: 2000
            });
            vm.feeds = response.data.items;
            
            isotope.isotope('destroy');

            $timeout(function () {
                isotope.isotope({
                    itemSelector: '.item',
                    masonry: {
                        gutter: 20
                    }
                });
            }, 100);
        }
        var getRepo = function () {
            var url = 'http://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK&tags=' + vm.tags;
            return $http.jsonp(url)
                .then(onComplete, onError);
        }
        getRepo();

        vm.keyupSearch = function () {
            $timeout.cancel(timer);
            timer = $timeout(function () {
                getRepo();
            }, 1000);
        };

        vm.setFocus = function () {
            vm.focus = true;
        };
        vm.setBlur = function () {
            console.log(vm.tags)
            if (vm.tags == "") {
                vm.focus = false;
            }
        };

        vm.loadImage = function () {
            if (isotope) {
                isotope.isotope('layout');
            }
        };
    }])
    .directive('resultSection', function () {
        return {
            restrict: "A",
            scope: {
                block: "=",
                onLoad: "&onLoad"
            },
            templateUrl: 'App/Search/section.html',
            link: function (scope, element, attrs) {
                element.bind('load', function (e) {
                    scope.onLoad();
                });
            }
        };
    })
    .directive('imgLoad', function () {
        return {
            link: function (scope, element, attrs) {
                element.bind('load', function (e) {
                    scope.onLoad();
                    scope.load = true;
                });
            }
        };
    });
