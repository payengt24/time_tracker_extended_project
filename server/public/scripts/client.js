var app = angular.module('timeTrackerApp', ['ngRoute', 'ngMaterial', 'ngAnimate', 'ngMessages', 'ngAria', 'ngSanitize']);

app.config(function($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: '/views/entry.html',
        controller: 'EntryController as vm'
    })
    .when('/project', {
        templateUrl: `/views/project.html`,
        controller: 'ProjectController as vm'
    })
    .when('/report', {
        templateUrl: `/views/report.html`,
        controller: 'ReportController as vm'
    }).otherwise({
        template: '<h1>404</h1>'
    });
});