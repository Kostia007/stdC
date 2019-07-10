using System;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Messages;
using Microsoft.Crm.Sdk.Messages;

namespace Task12Plugin
{
    public class Task12Plugin : Plugin
    {
        public Task12Plugin()
            : base(typeof(Task12Plugin))
        {
            base.RegisteredEvents
                .Add(new Tuple<int, string, string, Action<LocalPluginContext>>((int)PluginStage.PostOperation, "new_Taction",
                    null,
                    PullThePlugin));
        }

        protected void PullThePlugin(LocalPluginContext localContext)
        {
            if (!localContext.PluginExecutionContext.InputParameters.Contains("RecordId"))
            {
                return;
            }
            string RecordId = (string)localContext.PluginExecutionContext.InputParameters["RecordId"];
            IOrganizationService service = localContext.OrganizationService;
            Relationship relationship = new Relationship();
            relationship.SchemaName = "new_new_task12child_new_task12main";
            QueryExpression query = new QueryExpression();
            query.EntityName = "new_task12child"; 
            query.ColumnSet = new ColumnSet(true); 
            query.Criteria = new FilterExpression(); 
            query.Criteria.AddCondition(new ConditionExpression("statecode", ConditionOperator.Equal, "Active"));
          
            RelationshipQueryCollection relatedEntity = new RelationshipQueryCollection();
            relatedEntity.Add(relationship, query);
           
            RetrieveRequest request = new RetrieveRequest();
            request.ColumnSet = new ColumnSet("new_name"); 
            request.Target = new EntityReference { Id = new Guid(RecordId), LogicalName = "new_task12main" };
            request.RelatedEntitiesQuery = relatedEntity; 
            
            RetrieveResponse response = (RetrieveResponse)service.Execute(request);


            
            DataCollection<Entity> RelatedEntitis =
                ((DataCollection<Relationship, EntityCollection>)
                (((RelatedEntityCollection)(response.Entity.RelatedEntities))))
                [new Relationship("new_new_task12child_new_task12main")].Entities;
            foreach (var RelatedEntity in RelatedEntitis)
            {
                SetStateRequest setStateRequest = new SetStateRequest()
                {
                    EntityMoniker = new EntityReference
                    {
                        Id = RelatedEntity.Id,
                        LogicalName = RelatedEntity.LogicalName,
                    },
                    State = new OptionSetValue(1),
                    Status = new OptionSetValue(2)
                };
                service.Execute(setStateRequest);
            }
            localContext.PluginExecutionContext.OutputParameters["Out"] =
                string.Format("Deativated {0} ", RelatedEntitis.Count);
        }
    }
}
