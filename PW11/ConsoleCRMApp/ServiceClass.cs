using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Xrm.Sdk;
using Microsoft.Crm.Sdk.Messages;


namespace ConsoleCRMApp
{
    public class ServiceClass
    {
        private IOrganizationService _service;
        public ServiceClass(IOrganizationService service)
        {
            _service = service;
        }

        public void MainMethod()
        {
            Repository ARepository = new Repository(_service);
            Repository2 AccRepository = new Repository2(_service);
            EntityCollection acc_records = AccRepository.GetAcc();
            string log = "";
            for ( int i=0; i< acc_records.Entities.Count; i++)
            {
                Guid x_acc = acc_records[i].Id;
                EntityCollection a_records = ARepository.GetA(x_acc);
                if (a_records != null)
                {
                    for (int j =0; j< a_records.Entities.Count;j++)
                    {
                        Guid x_a = a_records[j].Id;
                        string t = "Inactivate record #"+ a_records[j].GetAttributeValue<string>("new_name") + "";
                        Console.WriteLine(t);
                        log += t;
                        
                        SetStateRequest setStateRequest = new SetStateRequest()
                        {
                            EntityMoniker = new EntityReference
                            {
                                Id = x_a,
                                LogicalName = "new_task11a",                //deactivate
                            },
                            State = new OptionSetValue(1),
                            Status = new OptionSetValue(2)
                        };
                        _service.Execute(setStateRequest);
                    }
                }
                else
                {
                    break;
                }
            }
            FileLog.Write(log);
            /**/
            Console.WriteLine("End. Click Enter.");
            Console.ReadLine();
        }
    }
}
