using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KostenVoranSchlagConsoleParser.Helpers;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Sdk.Query;
using Microsoft.Xrm.Sdk.Messages;
namespace ConsoleCRMApp
{
    class Program
    {
        static void Main(string[] args)
        {
            OrganizationServiceProxy serviceProxy = ConnectHelper.CrmService;
            var service = (IOrganizationService)serviceProxy;
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
            request.Target = new EntityReference { Id = new Guid("{DE4B6AB0-7F9A-E911-8122-00155D06F203}"), LogicalName = "new_task12main" };
            request.RelatedEntitiesQuery = relatedEntity; 

            
            RetrieveResponse response = (RetrieveResponse)service.Execute(request);

            
            Console.WriteLine("NameMain: " + response.Entity["new_name"]);

            
            DataCollection<Entity> RelatedEntitis = 
                ((DataCollection<Relationship, EntityCollection>)
                (((RelatedEntityCollection)(response.Entity.RelatedEntities))))
                [new Relationship("new_new_task12child_new_task12main")].Entities;


            Console.WriteLine("Related Childs:");
            foreach (var RelatedEntity in RelatedEntitis)
            {
                Console.WriteLine(" - " + RelatedEntity["new_name"] + "Id: "+ RelatedEntity.Id);
            }


            Console.WriteLine("Press Enter");
            Console.ReadLine();
        }
    }
}
