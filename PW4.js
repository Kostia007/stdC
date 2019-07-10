function GetValueFromField()
{
    debugger
    AggregateFetch1();
    //SortingFetch();
    //AggregateFetch2();// ResultsRetrived1
}
function AggregateFetch1()
{

        var id = Xrm.Page.data.entity.getId();
        var name = Xrm.Page.data.entity.getPrimaryAttributeValue();
        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" aggregate="true">\
        <entity name="new_testentityfornn">\
            <attribute name="new_money" alias="money_sum" aggregate="sum"/>\
            <attribute name="new_money" alias="money_avg" aggregate="avg"/>\
            <link-entity name="new_new_testentityfornn_new_testentity" from="new_testentityfornnid" to="new_testentityfornnid" visible="false" intersect="true">\
                <link-entity name="new_testentity" from="new_testentityid" to="new_testentityid" alias="aj">\
                    <filter type="and">\
                        <condition attribute="new_testentityid" operator="eq" uiname="' + name + '" uitype="new_testentity" value= "' + id + '" />\
                    </filter>\
                </link-entity>\
            </link-entity>\
        </entity>\
    </fetch>';


    var ResultsRetrived1 = XrmServiceToolkit.Soap.Fetch(fetchXml);

//}
//function AggregateFetch2()
//{

        var id = Xrm.Page.data.entity.getId();
        var name = Xrm.Page.data.entity.getPrimaryAttributeValue();
        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false" aggregate="true">\
        <entity name="new_testentityfornn">\
            <attribute name="new_optionsetnn" alias="new_optionsetnn" groupby="true" />\
            <attribute name="new_money" alias="new_money" groupby="true" />\
            <link-entity name="new_new_testentityfornn_new_testentity" from="new_testentityfornnid" to="new_testentityfornnid" visible="false" intersect="true">\
                <link-entity name="new_testentity" from="new_testentityid" to="new_testentityid" alias="aj">\
                    <filter type="and">\
                        <condition attribute="new_testentityid" operator="eq" uiname="' + name + '" uitype="new_testentity" value= "' + id + '" />\
                    </filter>\
                </link-entity>\
            </link-entity>\
        </entity>\
    </fetch>';


    var ResultsRetrived2 = XrmServiceToolkit.Soap.Fetch(fetchXml);
//}
//function SortingFetch()
//{

        var id = Xrm.Page.data.entity.getId();
        var name = Xrm.Page.data.entity.getPrimaryAttributeValue();
        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">\
        <entity name="new_testentityfornn">\
            <attribute name="new_money"/>\
            <attribute name="new_optionsetnn"/>\
            <order attribute="new_money"  descending="false" />\
            <link-entity name="new_new_testentityfornn_new_testentity" from="new_testentityfornnid" to="new_testentityfornnid" visible="false" intersect="true">\
                <link-entity name="new_testentity" from="new_testentityid" to="new_testentityid" alias="aj">\
                    <filter type="and">\
                        <condition attribute="new_testentityid" operator="eq" uiname="' + name + '" uitype="new_testentity" value= "' + id + '" />\
                    </filter>\
                </link-entity>\
            </link-entity>\
        </entity>\
    </fetch>';


    var ResultsRetrived3 = XrmServiceToolkit.Soap.Fetch(fetchXml);
    debugger
}
function switchProcess()
{
    debugger
    //var activeProcess = Xrm.Page.data.process.getActiveProcess();
    //var processName = activeProcess.getName();
    var switchprocess = Xrm.Page.getAttribute("new_switchprocess").getValue();
    //var t = Xrm.Page.data.process.getProcessInstances();
    //var t = Xrm.Page.data.process();
    //var allProcess = Xrm.Page.data.process.getEnabledProcesses();
    if(switchprocess == true )
    {
        var fiel = Xrm.Page.getAttribute("new_lookup");
        var field = fiel.getValue();
        if (field == null)
        {
            var lookUpArray = [];
            var LookUpValForInsert = {};
            LookUpValForInsert.id = "{DF1A0463-0D86-E911-8121-00155D06F203}";
            LookUpValForInsert.entityType = "account";
            LookUpValForInsert.name = "dfdf";
            lookUpArray.push(LookUpValForInsert);
            Xrm.Page.getAttribute("new_lookup").setValue(lookUpArray);
        }

        Xrm.Page.data.process.setActiveProcess("{B73246F4-55F0-46FE-8A14-165B6B6B7055}", callbackFunction);
        Xrm.Page.data.entity.save();
        Xrm.Page.data.refresh();

    }
    else
    {
        var fiel = Xrm.Page.getAttribute("new_testtextfield");
        var field = fiel.getValue();
        if (field== null)
        {
            var text = "safsaf";
            Xrm.Page.getAttribute("new_testtextfield").setValue(text);
        }
        Xrm.Page.data.process.setActiveProcess("{0EBA3CDD-1CBA-4716-B531-E9353BBEB3E5}", callbackFunction);
        Xrm.Page.data.entity.save();
        Xrm.Page.data.refresh();
    }

}
function switchStep()
{
    debugger
    var activeProcess = Xrm.Page.data.process.getActiveProcess();
    var processName = activeProcess.getName();
    var activePathCollection = Xrm.Page.data.process.getActivePath();
    var StageSelect = Xrm.Page.data.process.getSelectedStage();
    var StageName1 = StageSelect.getName();
    var idstages = StageSelect.getId();
    var switchstage = Xrm.Page.getAttribute("new_switchstage").getValue();
    var activeStage= Xrm.Page.data.process.getActiveStage();
    var stageName = activeStage.getName();
    var stageId = activeStage.getId();
    Xrm.Page.data.entity.save();
    //Xrm.Page.data.process.addOnStageChange();
    //Xrm.Page.data.process.addOnStageSelected();

    if (processName == "Test BP Flow")
    {
        if (switchstage == true)
        {
            Xrm.Page.data.process.setActiveStage("24f038c5-2a10-40ba-9806-bf8787b5bf1b", callbackFunction);
        }
        else
        {
            Xrm.Page.data.process.setActiveStage("1ecdeb63-0cd4-451c-91f4-d0ba78a653d9", callbackFunction);
        }
    }
    else
    {
        if (switchstage == true)
        {
            Xrm.Page.data.process.setActiveStage("42c86588-6994-47e3-b602-407f3ea4b90b", callbackFunction);
        }
        else
        {
            Xrm.Page.data.process.setActiveStage("509a18b2-11c0-4f2f-89dd-efb261623b0c", callbackFunction);
        }
    }
}
function callbackFunction(result)
{
    if(result == "success")
    {
        alert("success");
    }
    else if (result == "invalid")
    {
        alert("invalid");
    }
    else if (result == "unreachable")
    {
        alert("unreachable");
    }
    else if (result == "dirtyForm")
    {
        alert("dirtyForm");
    }

}