using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web.Http;

namespace Scheduler
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // ubaceno, mijenja od property-ja velika i mala slova ( zelimo da je prvo slovo maleno
            // zbog javascripta )
            // koristi camel casing umjesto default Capital casing
            // kazemo da kad nade taj formatter da koristi Camel case resolver za contract
            var jsonFormatter = config.Formatters.OfType<JsonMediaTypeFormatter>().First();
            jsonFormatter.SerializerSettings.ContractResolver =
              new CamelCasePropertyNamesContractResolver();

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/v1/{controller}/{id}", // sa {} se oznacavaju parametri
                defaults: new { id = RouteParameter.Optional }
            );

            // SAM ubacio da se može gledati u JSON formatu
            var appXmlType = config.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(t => t.MediaType == "application/xml");
            config.Formatters.XmlFormatter.SupportedMediaTypes.Remove(appXmlType);
        }
    }
}
