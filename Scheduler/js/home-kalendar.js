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
    var _events;
    var events2 = [];

    $http.get("/api/v1/events") // izvrsava se asinkrono, moramo zvati nazad kad get je obavljen do kraja
       .then(function (result) { // result - sadrzava podatke od get metode i neke ostale dijelove rezultata
           //Kad izvrši successful

           console.log(result.data[0].name); // !!!!!!!!!!!!!!!!!!!!!! // kada se koristi izvan .then(function(result)) onda se ne moze ucitati samo 1 po 1 element ( baca undefined error) ali moze ucitati cijeli array odjednom ??
           // rjesenje - prebaci document ready ( fullcalendar od ispod ) unutar http.get, tj. ovdje

           angular.copy(result.data, $scope.events) // koristi se kad se koriste nizovi

           ////////// --------- NAPRAVITI NOVI objekt u Event.cs i dodati from,until i ostale stvari --------

           console.log("ree 1", _events)

           _events = _.map(result.data, function (e) { // da se ubace podaci iz schedulerEventsa u _events jer se mora prilagoditi za fullcalendar js sintaksu (events, pogledaj dolje))
               return { // foreach
                   id: e.id,
                   title: e.name,
                   start: e.from,  //TODO: format?
                   end: e.until
               };
           });

           console.log("ree 2", _events)

           //var events2 = [{
           //    title: result.data[0].name,
           //    start: '2018-08-16T10:30:00',
           //    end: '2018-08-17T12:30:00'
           //},
           //{
           //    title: result.data[1].name,
           //    start: '2018-08-18T17:30:00',
           //    end: '2018-08-19T19:30:00'
           //}];




           // ---------- FULLKALENDAR JQUERY ------------
           $(document).ready(function () {
               var _currentDate = new Date();
               // console.log("BU");

               $('#calendar').fullCalendar({
                   dayRightclick: function (date, jsEvent, view) {
                       alert('rightclicked on day ' + date.format());
                       // Prevent browser context menu:
                       return false;
                   },
                   eventClick: function (event, jsEvent, view) {
                       alert('ID eventa je ' + event.id + ', pocinje od: ' + event.start.format() +
                           ', završava u ' + event.end.format());
                       // Prevent browser context menu:
                       return false;
                   },
                   //eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {



                   //    // ----------- napravljeno u obicnom javascriptu : -----------
                   //    //var i = 0;
                   //    //while (schedulerEvents[i].id != event.id) { // vrti dok ne nade pravi ID
                   //    //    // umjesto whilea naci _underscore js i zamijeniti ( guglaj )
                   //    //    i++;
                   //    //}

                   //    // --- preko underscoreJS ---
                   //    var dropaniEvent = _.find(schedulerEvents, function (sEvent) {
                   //        return sEvent.id == event.id
                   //    });

                   //    console.log(dropaniEvent.id);
                   //    console.log(event.id);


                   //    // pridodijeli temp objektu nove vrijednosti koje cemo slati da backend spremi
                   //    dropaniEvent.from = moment(event.start).format(); // - defaultni format - [ zasto ne radi - moment(event.start).format('YYYY-MM-DDTHH:MM:SSZ');


                   //    // TODO - promijeniti nakon sto se uvede sati i sekunde jer nece raditi dobro
                   //    if (event.end == null) { // jer kad je samo 1 dan fullcalendarJS ne definira "end od daya"
                   //        dropaniEvent.until = moment(event.start).format();
                   //    }
                   //    else if (event != null) {
                   //        dropaniEvent.until = moment(event.end).format();
                   //    }

                   //    eventsRepo.update(dropaniEvent).then(function () { // saljemo mu event na backendu da update-jta


                   //    });
                   //    return false;
                   //},
                   header: {
                       left: 'prev,next today',
                       center: 'title',
                       right: 'month,basicWeek,basicDay,agendaWeek,agendaDay,listWeek'
                   },

                   buttonText: {
                       basicWeek: 'basicWeek',
                       basicDay: 'Day',
                       agendaWeek: 'agendaWeek',
                       agendaDay: 'agendaDay',
                       listWeek: 'List'
                   },
                   defaultDate: _currentDate,
                   editable: true,
                   eventLimit: true, // allow "more" link when too many events
                   events: _events
               });

           });

       },
       function () {
           //kad je error
           alert("Error u hvatanju podataka preko API");
       });

    console.log("monika ree", events2)

    var events2 = [{
        title: 'asd',
        start: '2018-08-16T10:30:00',
        end: '2018-08-17T12:30:00'
    },
         {
             title: 'monika je luda',
             start: '2018-08-18T17:30:00',
             end: '2018-08-19T19:30:00'
         }];



    // $scope.data = [{ ime: 'tino' }, { ime: 'roko' }]; //test




};