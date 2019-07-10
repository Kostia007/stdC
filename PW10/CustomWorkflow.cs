using System;
using System.Activities;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Workflow;

namespace Task9Plugin
{
    public class CustomStep : CodeActivity
    {
        #region Workflow parameters
        
        [RequiredArgument]
        [Input("TextToAdd")]
        public InArgument<string> TextParam { get; set; }

        [RequiredArgument]
        [Input("IntToAdd")]
        public InArgument<int> IntParam { get; set; }
        [RequiredArgument]
        [Input("EmailToAdd")]
        public InArgument<string> EmailParam { get; set; }

        [RequiredArgument]
        [Output("OuterString")]
        public OutArgument<string> OutParam { get; set; }

        #endregion

        protected override void Execute(CodeActivityContext executionContext)
        {
            var context = executionContext.GetExtension<IWorkflowContext>();
            var serviceFactory = executionContext.GetExtension<IOrganizationServiceFactory>();
            var service = serviceFactory.CreateOrganizationService(context.UserId);

            var textPar = TextParam.Get<string>(executionContext);
            var intPar = IntParam.Get<int>(executionContext);
            var email = EmailParam.Get<string>(executionContext);

            Entity updatedEntity = new Entity(context.PrimaryEntityName);
            updatedEntity.Id = context.PrimaryEntityId;
            updatedEntity["new_textin"] = textPar;
            updatedEntity["new_number"] = intPar;
            {
                OutParam.Set(executionContext, email);
            }
            service.Update(updatedEntity);
        }

    }
}
