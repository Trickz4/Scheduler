﻿using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Scheduler.Data
{
    public class SchedulerContext : DbContext // za komunikaciju izmedu koda i databasea
    {
        public SchedulerContext() : base("DefaultConnection") // ime konekcije na koju se spaja na database
        {

        }

        public DbSet<Event> Events { get; set; } // representa table koji cemo spremiti u database
// --- kada kreiramo instancu ove klase potraziti ce table "Events" 
// u databaseu, te ako ne nade kreirati ce taj table( bazirano na strukturi koji smo mu dali -> klasa <Event>)


        // postoji i sintaksa(kod) koji specificno govori entity frameworku da kreira bazu , i drugi kod koji
        // govori samo da uspostavi vezu ako zelimo bolju strukturu baze ( no tu koristimo generički koji radi oboje, pa nije tu napisano)
    }
}