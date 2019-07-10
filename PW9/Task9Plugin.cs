using System;
using Microsoft.Xrm.Sdk;

namespace Task9Plugin
{
    public class Task9Plugin : Plugin
    {
        public Task9Plugin()
            : base(typeof(Task9Plugin))
        {
            
            base.RegisteredEvents
                .Add(new Tuple<int, string, string, Action<LocalPluginContext>>((int)PluginStage.PreOperation, "Update",
                    "new_task_9_10",
                    PullThePlugin));
        }

        protected void PullThePlugin(LocalPluginContext localContext)
        {
            if (!localContext.PluginExecutionContext.InputParameters.Contains("Target"))
            {
                return;
            }
            Entity target = (Entity)localContext.PluginExecutionContext.InputParameters["Target"];
            EntityReference client_post = target.GetAttributeValue<EntityReference>("new_clientid");
            EntityReference contact_post = target.GetAttributeValue<EntityReference>("new_contactid");
            IOrganizationService service = localContext.OrganizationService;
            if (((client_post != null))||(client_post != null && contact_post != null))
            {
                if (client_post.Id != null)
                {
                    Entity acc = service.Retrieve(client_post.LogicalName, client_post.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("primarycontactid"));
                    EntityReference primary_contact = acc.GetAttributeValue<EntityReference>("primarycontactid");
                    target["new_contactid"] = primary_contact;
                }
                else
                {
                    target["new_contactid"] = null;
                }
            }
            else if ((contact_post != null))
            {
                if (contact_post.Id != null)
                {
                    Entity con = service.Retrieve(contact_post.LogicalName, contact_post.Id, new Microsoft.Xrm.Sdk.Query.ColumnSet("parentcustomerid"));
                    EntityReference client_con = con.GetAttributeValue<EntityReference>("parentcustomerid");
                    target["new_clientid"] = client_con;
                }
                else
                {
                    target["new_clientid"] = null;
                }
            }
            else
            {
                target["new_contactid"] = null;
                target["new_clientid"] = null;
            }
            
        }
    }
}
