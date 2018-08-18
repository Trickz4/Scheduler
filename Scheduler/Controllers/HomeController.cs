using Scheduler.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Scheduler.Controllers
{
    public class HomeController : Controller
    {
        private ISchedulerRepository _repo;

        public HomeController(ISchedulerRepository repo) /* IRepository i svi njegovi dependenciji ce
            se kreirati pri pozivu ( npr context )
            */
        {
            _repo = repo;
        }
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
        public ActionResult Test()
        {
            ViewBag.Message = "Moj test";

            // za mvc @model na test viewu, ne treba ako necemo koristiti @model
            var events = _repo.GetEvents()
                .OrderByDescending(t => t.From)
                .Take(25)
                .ToList(); // uzet ce te eventove iz baze podataka(ne uzima vise iqueryable, vec samo
            // IEnumerable 

            return View(events);
        }
        public ActionResult Kalendar()
        {
            ViewBag.Message = "Moj Kalendar";

            var events = _repo.GetEvents()
                .OrderByDescending(t => t.From)
                .Take(25)
                .ToList(); // uzet ce te eventove iz baze podataka(ne uzima vise iqueryable, vec samo
            // IEnumerable 

            return View(events);
        }
    }
}