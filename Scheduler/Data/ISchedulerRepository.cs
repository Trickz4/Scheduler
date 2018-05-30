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
        IQueryable<Event> GetEventById(int eventId);
        bool Save();
        bool AddEvent(Event newEvent);
        //TODO dodati add i delete
    }
}


