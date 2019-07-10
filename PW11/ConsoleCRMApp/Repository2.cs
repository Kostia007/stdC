using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Query;

namespace ConsoleCRMApp
{
    public class Repository2
    {
        private IOrganizationService _service;
        private const string EntityName = "account";
        public Repository2(IOrganizationService service)
        {
            _service = service;
        }

        public EntityCollection GetAcc()
        {
            QueryExpression qe = new QueryExpression(EntityName)
            {
                ColumnSet = new ColumnSet("accountid", "name"),
                LinkEntities =
                {
                    new LinkEntity("account","new_task11a", "accountid","new_accounta11id",  JoinOperator.Inner),
                   
                    new LinkEntity("account","new_task11b", "accountid", "new_accountb11id",  JoinOperator.Inner)    
                },
            };
            EntityCollection acc_records = _service.RetrieveMultiple(qe);
            if (acc_records.Entities.Count > 0)
            {
                return acc_records;
            }
            return null;
        }
    }
}
