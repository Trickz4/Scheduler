﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Scheduler.Data
{
    public class Event
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }

    }
}