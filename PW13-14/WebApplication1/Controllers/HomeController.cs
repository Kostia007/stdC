using System;
using System.Collections.Generic;
using System.Text;
using System.ServiceModel;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using KostenVoranSchlagConsoleParser.Helpers;
using Microsoft.Xrm.Sdk;
using Microsoft.Xrm.Sdk.Client;
using Microsoft.Xrm.Sdk.Query;
using System.ComponentModel.DataAnnotations;
using System.IO;

namespace WebApplication1.Controllers
{

    public class HomeController : Controller
    {
        //public HttpPostedFileBase ImageFile { get; set; }
        //public List<Records> records { get; set; }
        public static string EntityName { get; set; }
        public static EntityCollection EntityRecords { get; set; }

        public class Records
        {
            public int ID { get; set; }
            public string RecordsName { get; set; }
            public bool IsSelected { get; set; }
        }
        public class RecordsList
        {
            public List<Records> recordss { get; set; }
            [Required(ErrorMessage = "Please select file.")]
            [RegularExpression(@"([a-zA-Z0-9\s_\\.\-:])+(.docx|.doc|.txt)$", ErrorMessage = "Only Text files allowed.")]
            public HttpPostedFileBase PostedFile { get; set; }
        }
        public class FileModel
        {
            
        }

        public ActionResult Index(Guid? mainEntityId)
        {
            if (mainEntityId.HasValue)
            {
                
                Guid entityGuid = mainEntityId.Value;
                OrganizationServiceProxy serviceProxy = ConnectHelper.CrmService;
                var service = (IOrganizationService)serviceProxy;
                try
                {
                    Entity mainEntity = service.Retrieve("invoice", entityGuid, new ColumnSet(true));
                    ViewBag.name = mainEntity.GetAttributeValue<string>("name");
                    var sum =mainEntity.GetAttributeValue<Money>("totalamount").Value;
                    ViewBag.Decimal = sum.ToString();
                }
                catch (Exception e)
                {
                    ViewBag.Message = "There is no Invoice with ID:"+mainEntityId;
                }
                
            }
            else
            {
                ViewBag.Message = "Enter MainEntity guid as parameter";
            }
            
            return View();
        }

        public ActionResult About(string mainEntityName)
        {
            
            if (mainEntityName != null)
            {
                //Guid entityGuid = mainEntityId.;
                EntityName = mainEntityName;
                OrganizationServiceProxy serviceProxy = ConnectHelper.CrmService;
                var service = (IOrganizationService)serviceProxy;
                try
                {
                    var queryExpression = new QueryExpression()
                    {
                        Distinct = false,
                        EntityName = mainEntityName,
                        ColumnSet = new ColumnSet(true)
                    };
                    var mainEntity = service.RetrieveMultiple(queryExpression);
                    EntityRecords = mainEntity;
                    if (EntityRecords == null)
                        return null;
                    string[] names = new string[20];
                    var records = new List<Records>();
                    for (int i = 0; i < mainEntity.Entities.Count; i++)
                    {
                        var name = mainEntity[i].GetAttributeValue<string>("new_name");  //http://localhost:51304/Home/About?mainEntityName=new_task12main
                        names[i] = name;
                        records.Insert(i,new Records { ID = i, RecordsName = names[i], IsSelected = false });
                    }
                    RecordsList relist = new RecordsList();
                    relist.recordss = records;
                    return View(relist);
                }
                catch (Exception e)
                {
                    ViewBag.Message = "There is no Invoice with Name:" + mainEntityName;
                }

            }
            else
            {
                ViewBag.Message = "Enter MainEntity name as parameter";
                return null;
            }
            ViewBag.Message = "Your application description page.";

            return View();
        }
        [HttpPost]
        public ActionResult About(RecordsList rec)
        {
            OrganizationServiceProxy serviceProxy = ConnectHelper.CrmService;
            var service = (IOrganizationService)serviceProxy;
            string PPath = Server.MapPath("~/Uploads/");
            if (!Directory.Exists(PPath))
            {
                Directory.CreateDirectory(PPath);
            }
            string fileName = Path.GetFileName(rec.PostedFile.FileName);
            rec.PostedFile.SaveAs(PPath + fileName);
            //string FilePath = Path.GetFullPath(rec.PostedFile.FileName);
            string FilePath = PPath + fileName;
            
            foreach (var item in rec.recordss)
            {
                if (item.IsSelected)
                {

                    string path = FilePath;
                    fileName = Path.GetFileName(path); 
                    ColumnSet attributes = new ColumnSet(new string[] { "annotationid", "filename", "documentbody", "isdocument", "mimetype" });
                    Entity annotation = new Entity("annotation");
                    annotation["objectid"] = new EntityReference(EntityName, EntityRecords[item.ID].Id); //and attach to a record, e.g. contact
                    annotation["objecttypecode"] = EntityName;
                    annotation["subject"] = fileName;

                    annotation["filename"] = fileName; //the annotation has fields which contain the attachment information
                    annotation["mimetype"] = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                    annotation["documentbody"] = Convert.ToBase64String(System.IO.File.ReadAllBytes(path)); 
                    service.Create(annotation);
                }
            }
            return View(rec);
        }
        

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}