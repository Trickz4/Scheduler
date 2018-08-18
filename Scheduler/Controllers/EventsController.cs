using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Scheduler.Controllers
{
    public class EventsController : ApiController // <-- bitno, ovo je ApiController, ime prije "Controller" mora biti
        // isto kao i pattern koji trazis u URL-u , tj mora se zvati 'EVENTS'controller ako trazimo na /v1/'EVENTS' 
        // jer tako trazi api kontroler koji koristi na tom url-u
    {
        private ISchedulerRepository _repo;

        public EventsController(ISchedulerRepository repo)
        {
            _repo = repo;
        }
        // kako get radi - > plural // building the API // your first api controller // 3:57
        public IEnumerable<Event> Get() // defaultno mu daje atribut HTTPget ( kojeg angular poziva) zbog imena metode "Get"?
        {
            var events = _repo.GetEvents()
                .OrderByDescending(t => t.From)
                .Take(25)
                .ToList(); // uzet ce te eventove iz baze podataka(ne uzima vise iqueryable, vec samo
            // IEnumerable 

            return events;
        }
        [HttpPost]
        public HttpResponseMessage Post(Event newEvent) // kada pokrene post request, uzima Request Body od post requesta i mapira ga u newEvent
            { // nekad se moze dodati i [frombody] ispred Event newEvent da garantira da primamo body
            if (newEvent.From == default(DateTime)) // ako filla sa glupom vrijednoscu da se popravi date
            {
                newEvent.From = DateTime.UtcNow;
            }
            
            if (_repo.AddEvent(newEvent) && _repo.Save()) // ako je uspjesno prosa addEvent i Save( pogledaj context)
            {
                return Request.CreateResponse(HttpStatusCode.Created, newEvent); // vracamo i objekt
                // jer dobivamo neke propertise od objekta koji ce biti mapirani u novu instancu od
                // tog objekta i kad se izvrsi Add() i Save(), ispuniti ce se prazne vrijednosti sa
                // defaultnim vrijednostima ( popravit ce i ID jer je generiran na serveru )

                // no npr fillat ce date time sa defaultnim pa moramo ga popravit malo^ , pogl gore if
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
         
        public IEnumerable<Event> Get(int Id) // uzima ID iz webApiConfiga(parametar ovdje(Id) i parametar u api configu(id) se moraju zvati isto inace ga nece prepoznati (no nije case sensitive)
            // kad url izgleda ovako : /v1/events/'12' - 12 je id parametar koji se ovdje prosljeduje,
            // zna da treba doci ovdje preko url-a jer smo rekli u webApiConfigu da koristi ovaj kontroler
        {
            return _repo.GetEventById(Id); // vraca ovaj podatak requestu
        }
   
    }
}
