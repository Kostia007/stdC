using System;
using Microsoft.Xrm.Sdk;

namespace Task72Plugin
{
    public class Task72 : Plugin
    {
        public Task72()
            : base(typeof(Task72))
        {
            base.RegisteredEvents
                .Add(new Tuple<int, string, string, Action<LocalPluginContext>>((int)PluginStage.PreOperation, "Update",
                    "new_testentity",
                    PullThePlugin));
        }

        protected void PullThePlugin(LocalPluginContext localContext)
        {
            if (!localContext.PluginExecutionContext.InputParameters.Contains("Target"))
            {
                return;
            }
            IOrganizationService service = localContext.OrganizationService;
            Entity target = (Entity)localContext.PluginExecutionContext.InputParameters["Target"];
            EntityReference lookupRef = target.GetAttributeValue<EntityReference>("new_lookup");
            if (lookupRef != null)
            {
                Entity acc = service.Retrieve(lookupRef.LogicalName, lookupRef.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("emailaddress1"));
                string email = acc.GetAttributeValue<string>("emailaddress1");
                if (email == null)
                {
                    target["new_textforemail"] = "";
                    localContext.Trace("Trace error Trace error Trace error Trace error");
                    throw new InvalidPluginExecutionException("Client`s email is empty!");
                }
                else
                {
                    ITracingService tracingService = localContext.TracingService;
                    tracingService.Trace("Trace success Trace success Trace success Trace success");
                    target["new_textforemail"] = "Customer meets the requirements.";
                }
            }


        }
    }
}
