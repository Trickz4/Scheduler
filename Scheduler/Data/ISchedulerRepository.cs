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
        // dodati add i delete
    }
}


