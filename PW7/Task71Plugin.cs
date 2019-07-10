using System;
using Microsoft.Xrm.Sdk;

namespace Task71Plugin
{
    public class Task71 : Plugin
    {
        public Task71()
            : base(typeof(Task71))
        {
            base.RegisteredEvents
                .Add(new Tuple<int, string, string, Action<LocalPluginContext>>((int)PluginStage.PreOperation, "Create",
                    "new_testentity",
                    PullThePlugin));
        }

        protected void PullThePlugin(LocalPluginContext localContext)
        {
            if (!localContext.PluginExecutionContext.InputParameters.Contains("Target"))
            {
                return;
            }
            Entity target = (Entity)localContext.PluginExecutionContext.InputParameters["Target"];
            string textfield = target.GetAttributeValue<string>("new_testtextfield");
            IOrganizationService service = localContext.OrganizationService;
            Random rand = new Random();
           target["new_testtextfield"] = rand.Next().ToString();
        }
    }
}
