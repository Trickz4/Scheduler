using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Scheduler.Controllers
{
    public class EventsController : ApiController
    {
        private ISchedulerRepository _repo;

        public EventsController(ISchedulerRepository repo)
        {
            _repo = repo;
        }
        
        public IEnumerable<Event> Get() // defaultno mu daje atribut HTTPget ( kojeg angular poziva) zbog imena "Get"???
        {
            var events = _repo.GetEvents()
                .OrderBy(t => t.Date)
                .Take(25)
                .ToList(); // uzet ce te eventove iz baze podataka(ne uzima vise iqueryable, vec samo
            // IEnumerable 

            return events;
        }
        [HttpPost]
        public HttpResponseMessage Post(Event newEvent) 
        {
            if (newEvent.Date == default(DateTime)) // ako filla sa glupom vrijednoscu da se popravi date
            {
                newEvent.Date = DateTime.UtcNow;
            }
            
            if (_repo.AddEvent(newEvent) && _repo.Save())
            {
                return Request.CreateResponse(HttpStatusCode.Created, newEvent); // vracamo i objekt
                // jer dobivamo neke propertise od objekta koji ce biti mapirani u novu instancu od
                // tog objekta i kad se izvrsi Add() i Save(), ispuniti ce se prazne vrijednosti sa
                // defaultnim vrijednostima ( popravit ce i ID jer je generiran na serveru )

                // no npr fillat ce date time sa defaultnim pa moramo ga popravit malo^ , pogl gore if
            }
            return Request.CreateResponse(HttpStatusCode.BadRequest);
        }
         
        public IEnumerable<Event> Get(int Id) // uzima ID iz webApiConfiga ( moraju se zvati isto?)
        {
            return _repo.GetEventById(Id);
        }
   
    }
}
