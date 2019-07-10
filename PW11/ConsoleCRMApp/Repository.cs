using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace ConsoleCRMApp
{
    public class Repository
    {
        private IOrganizationService _service;
        private const string EntityName = "new_task11a";
        public Repository(IOrganizationService service)
        {
            _service = service;
        }

        public EntityCollection GetA(Guid accId)
        {
            QueryExpression qe = new QueryExpression(EntityName)
            {
                ColumnSet = new ColumnSet(true),
                LinkEntities =
                {
                    new LinkEntity("new_task11a", "new_new_task11a_new_task11b", "new_task11aid", "new_task11aid", JoinOperator.Inner)
                    {
                        LinkEntities =
                        {
                            new LinkEntity("new_new_task11a_new_task11b", "new_task11b", "new_task11bid", "new_task11bid", JoinOperator.Inner)
                            {
                                LinkCriteria = new FilterExpression(LogicalOperator.And)
                                {
                                    Conditions =
                                    {
                                        new ConditionExpression("new_accountb11id",ConditionOperator.Equal,accId)
                                    }
                                }
                            }
                        }
                    }
                },
                Criteria = new FilterExpression()
                {
                    FilterOperator = LogicalOperator.And,
                    Conditions =
                  {
                      new ConditionExpression("new_accounta11id",ConditionOperator.Equal,accId), //
                      new ConditionExpression("createdon",ConditionOperator.OlderThanXDays,2),
                      new ConditionExpression("statecode", ConditionOperator.Equal, 0)

                  }
                },
                
        };
            EntityCollection a_records = _service.RetrieveMultiple(qe);
            if (a_records.Entities.Count > 0)
            {
                return a_records;
            }
            return null;
        }
    }
}
