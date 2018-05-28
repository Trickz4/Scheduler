using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Scheduler.Data
{
    public class SchedulerRepository : ISchedulerRepository
    {
        SchedulerContext _ctx;
        public SchedulerRepository(SchedulerContext ctx)
        {
            _ctx = ctx;
            /*
             *  _ctx = new SchedulerRepository();
             *  Ne zelimo ovo jer onda radi jednu instancu ali onda ovaj repozitorij mora znati i za 
             *  desctruction te instance pa necemo.
             */
        }


        public IQueryable<Event> GetEvents()
        {
            return _ctx.Events;

           /* Umjesto da koristimo ovo ( jer ce svaki put kreirati novu instancu contexta
            * svaki put kad se zove GetEvents, sto nije jeftina operacija(svaki put zove bazu ili nesto
            *  slicno )) 
            * 
            * var ctx = new SchedulerContext();       
            * return ctx.Events
            */
        }

        public bool Save()
        {
            try
            {
                return _ctx.SaveChanges() > 0; // izvrsi saveChanges i vraca true ako se stvarno 
                                               // izvrsila neka promjena  

            }
            catch (Exception)
            {
                // TODO dovrsi
                return false;
            }
        }
        public bool AddEvent(Event newEvent)
        {
            try
            {
                 _ctx.Events.Add(newEvent);
                return true;
                // ne save-a odmah u bazu, tj dodaje u context
                // da se sejva, tako da ako ima vise eventova, da ih dodaje 1 po 1 , i onda pozovemo
                // save() da ih sve spremi u bazu
            }
            catch (Exception)
            {// TODO dovrsit loganje error-a
                return false;
            }
        }

      public IQueryable<Event> GetEventById(int eventId)
        {

            return _ctx.Events.Where(r => r.Id == eventId);

        }

       
    }
}