// angular home test controller
var module = angular.module("homeTest", []) // homeTest- ime modula koji se koristi u test.cshtml, [] - configuration data



function homeTestController($scope, $http) { // http - ima get,post, itd metode na server
   

    $scope.data = [];
    $scope.placeholder = [];
   // $scope.test;


    $(function () {
        $('#datetimepicker1').datetimepicker({
            format: 'YYYY-MM-DD HH:mm'
        });
    });

    $(function () {
        $('#datetimepicker2').datetimepicker({
            format: 'YYYY-MM-DD HH:mm'
        });
    });

    
    $http.get("/api/v1/events") // zovemo get na taj url , a specificirali smo u Api configu da kad smo na tom urlu da koristi eventsController i onda nade Get() u tom kontroleru i onda ide dalje tamo?
        // kad netko zove ovu rutu onda izvrsava se get i dobiva podatke events od EventsControllera ( get metode )
        // izvrsava se asinkrono, moramo zvati nazad kad get je obavljen do kraja
        .then(function (result) { // result - sadrzava podatke od get metode i neke ostale dijelove rezultata
            //Kad izvrši successful

            console.log("123");
            angular.copy(result.data, $scope.data) // data scope koristim da se ispisu podaci u tablici na test.cshtml
            angular.copy(result.data, $scope.placeholder)
            console.log($scope.data[0].from)

            $scope.data = _.map(result.data, function (e) { // da se ubace podaci iz schedulerEventsa u _events jer se mora prilagoditi za fullcalendar js sintaksu (events, pogledaj dolje))
                return { // foreach
                    id: e.id,
                    name: e.name,
                    from: moment(e.from).format('HH:mm || DD.MM.YYYY'),  //TODO: format?
                    until: moment(e.until).format('HH:mm || DD.MM.YYYY'),
                    description: e.description
                };
            });

            console.log($scope.data[0].from)

           // $scope.myFunc = function () {
            //    // TESTIRANJE 

            //    // $('#datetimepicker1').data('DateTimePicker').date([]);
              // var selectedDate = $('#datetimepicker1').data('DateTimePicker').date();
            //    // selectedDate.toJSON();

            //    //moment(selectedDate).format('MM/dd/YYYY');
            
                
               
            //   console.log("test", $scope.newEvent[0].from);
            //   $scope.test = moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss');
            //    console.log($scope.test);
               //$scope.newEvent = [{
               //    from: '',
               //    until: '',
               //    description:''
               //}];
              // $scope.newEvent[0].from = moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss');
              // console.log($scope.newEvent[0].from);

           // };

        },
        function () {
            //kad je error
           // $scope.newEvent.from = moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss');
            alert("Error u hvatanju podataka preko API");
        });

    $scope.podaci = {}; // Scope kreiran cisto da prima podatke od viewa ( prima name i description preko angulara(pogledaj html kod kako šalje u test.cshtml))

    $scope.save = function () {


        // data from View(html) to model(javascript) for 1. DateTimePicker
        //$(function () {
        //    $("#datetimepicker1").data("DateTimePicker").date()
        //});
        var selectedDate1 = $('#datetimepicker1').data('DateTimePicker').date();
        var selectedDate2 = $('#datetimepicker2').data('DateTimePicker').date();
        // id se pridodjeljuje priko servera (poprilicno sam siguran)
        $scope.newEvent = {
        name: $scope.podaci.name,
        from: moment(selectedDate1).format('YYYY-MM-DDTHH:mm:ss'),
        until: moment(selectedDate2).format('YYYY-MM-DDTHH:mm:ss'),
        description: $scope.podaci.description
    };
        //var selectedDate1 = $('#datetimepicker1').data('DateTimePicker').date();
        //$scope.newEvent[0].from = moment(selectedDate1).format('YYYY-MM-DDTHH:mm:ss')
        console.log($scope.newEvent)

        //// data from View(html) to model(javascript) for 2. DateTimePicker
        
        //var selectedDate2 = $('#datetimepicker2').data('DateTimePicker').date();
        //$scope.newEvent[0].until = moment(selectedDate2).format('YYYY-MM-DDTHH:mm:ss')

        console.log("test 1", $scope.newEvent)

        // primaj sa servera podatke i salji na backend (prvo na EventsController.cs)
        $http.post("/api/v1/events", $scope.newEvent) // second parameter is the data that represents the Event being sent(posted)
        .then(function (result) {
            console.log("test 2", $scope.newEvent)
            //successful
            // var newEvent = result.data;
            alert("uspjesno postan!");
        },
        function () {
            //error

            alert("Ne radi angular post");
        });
    }
}