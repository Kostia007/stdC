using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KostenVoranSchlagConsoleParser.Helpers;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Sdk.Query;

namespace ConsoleCRMApp
{
    class Program
    {
        static void Main(string[] args)
        {
            OrganizationServiceProxy serviceProxy = ConnectHelper.CrmService;
            var service = (IOrganizationService)serviceProxy;
            ServiceClass serviceClass = new ServiceClass(service);
            serviceClass.MainMethod();
            string var = null;
        }
    }
}
