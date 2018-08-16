using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Scheduler.Data
{
    public interface ISchedulerRepository
    {
        IQueryable<Event> GetEvents();
        IQueryable<Event> GetEventById(int topicId);
        bool Save();
        bool AddEvent(Event newEvent);
        // dodati update i delete
        // za delete
       // _ctx.Events.Remove(newEvent); - ovo ide u schedulerRepository ( u funkciju DeleteEvent - treba je napisati )
       // i onda valjda naci preko ID-a koji cemo element izbrisati
    }
}


