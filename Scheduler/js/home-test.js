﻿// angular home test controller
var module = angular.module("homeTest", []) // homeTest- ime modula koji se koristi u test.cshtml, [] - configuration data

 

function homeTestController($scope, $http)
{ // http - ima get,post, itd metode na server
    $scope.DataCount = 0;
    $scope.data = [];

    $http.get("/api/v1/events") // izvrsava se asinkrono, moramo zvati nazad kad get je obavljen do kraja
        .then(function (result) { // result - sadrzava podatke od get metode i neke ostale dijelove rezultata
            //Kad izvrši successful
            angular.copy(result.data, $scope.data) // koristi se kad se koriste nizovi  
           
        },
        function () {
            //kad je error
            alert("Error u hvatanju podataka preko API");
        });

    $scope.newEvent = {};

    $scope.save = function () {

        $http.post("/api/v1/events", $scope.newEvent)
        .then(function (result) {
            //successful
            // var newEvent = result.data;
            alert("post pokusaj");
        },
        function () {
            //error
            alert("Ne radi angular post");
        });
    }
}