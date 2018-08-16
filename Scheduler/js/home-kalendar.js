// angular home test controller
var module = angular.module("homeKalendar", []) // homeTest- ime modula koji se koristi u test.cshtml, [] - configuration data



function homeKalendarController($scope, $http) { // http - ima get,post, itd metode na server


    $scope.DataCount = 0;
    $scope.events = []; // test

    // primjer kako izgleda objekt u fullcalendar.js
    //var events = [{
    //    title: 'Meeting',
    //    start: '2015-02-12T10:30:00',
    //    end: '2015-02-12T12:30:00'
    //}];
    var _EVENTS = [];

    $http.get("/api/v1/events") // izvrsava se asinkrono, moramo zvati nazad kad get je obavljen do kraja
       .then(function (result) { // result - sadrzava podatke od get metode i neke ostale dijelove rezultata
           //Kad izvrši successful
           console.log(result.data[0].name); // !!!!!!!!!!!!!!!!!!!!!! // kada se koristi izvan .then onda se ne moze ucitati samo 1 po 1 element ( baca undefined error) ali moze ucitati cijeli array odjednom ??
           angular.copy(result.data, _EVENTS) // rjesenje - prebaci document ready ( fullcalendar od ispod ) unutar http.get, tj. ovdje
           console.log("1. console log unutar get metode ||", _EVENTS[1].name);

           var events2 = [{
               title: result.data[0].name,
               start: '2018-08-16T10:30:00',
               end: '2018-08-17T12:30:00'
           }];
           
           angular.copy(result.data, $scope.events) // koristi se kad se koriste nizovi
           console.log("4. console log unutar get metode ||", $scope.events[2].name);
       },
       function () {
           //kad je error
           alert("Error u hvatanju podataka preko API");
       });

    console.log("2. console log izvan get metode ||",$scope.events);
    //console.log("3. console log izvan get metode ||", _EVENTS[1].name);

    var _events = $scope.events;
    //console.log($scope.events[0].id);

    
   
  

    var __events = [{
        title: 'Testni event',
        start: '2018-08-16T10:30:00',
        end: '2018-08-17T12:30:00'
    }];




    // $scope.data = [{ ime: 'tino' }, { ime: 'roko' }]; //test

    //eventsRepo.query().toList(function (events) { // spremljeni eventovi u array,  alert(events[0].Name);
    //    angular.copy(events.data, $scope.data) // ne hvata podatke iz eventsa

    //});

    $(document).ready(function () {

        // console.log("BU");

        $('#calendar').fullCalendar({
            eventClick: function (event, jsEvent, view) {
                alert('ID eventa je ' + event.id + ', pocinje od: ' + event.start.format() +
                    ', završava u ' + event.end.format());
                // Prevent browser context menu:
                return false;
            },
            defaultDate: '2018-08-16',
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: __events
        });

    });

};