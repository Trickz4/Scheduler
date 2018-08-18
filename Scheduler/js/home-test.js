// angular home test controller
var module = angular.module("homeTest", []) // homeTest- ime modula koji se koristi u test.cshtml, [] - configuration data



function homeTestController($scope, $http) { // http - ima get,post, itd metode na server
    $scope.DataCount = 0;
    $scope.data = [];
   
    $scope.test;


    $(function () {
        $('#datetimepicker1').datetimepicker({
            // format: 'YYYY-MM-DD'
        });
    });

    // TODO pitat juru za definitivno kako ovo radi
    $http.get("/api/v1/events") // zovemo get na taj url , a specificirali smo u Api configu da kad smo na tom urlu da koristi eventsController i onda nade Get() u tom kontroleru i onda ide dalje tamo?
        // kad netko zove ovu rutu onda izvrsava se get i dobiva podatke events od EventsControllera ( get metode )
        // izvrsava se asinkrono, moramo zvati nazad kad get je obavljen do kraja
        .then(function (result) { // result - sadrzava podatke od get metode i neke ostale dijelove rezultata
            //Kad izvrši successful

            console.log("123");
            angular.copy(result.data, $scope.data) // koristi se kad se koriste nizovi  



            $scope.myFunc = function () {
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

            };

        },
        function () {
            //kad je error
           // $scope.newEvent.from = moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss');
            alert("Error u hvatanju podataka preko API");
        });

    $scope.podaci = {};

    $scope.save = function () {

        $(function () {
            $("#datetimepicker1").data("DateTimePicker").date()
        });

        $scope.newEvent = [{
            from: '',
            until: '',
            description: $scope.podaci.description
          
        }];
        var selectedDate = $('#datetimepicker1').data('DateTimePicker').date();
        $scope.newEvent[0].from = moment(selectedDate).format('YYYY-MM-DDTHH:mm:ss')

        $http.post("/api/v1/events", $scope.newEvent) // second parameter is the data that represents the Event being sent(posted)
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