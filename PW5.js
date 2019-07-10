function GetValueFromField()
{

}
function CheckRole()
{
    debugger
    var CMRole = CheckUserRole("5988d4f3-5393-e911-8121-00155d06f203"); //role id: Customer manager
    if (CMRole)
    {
       //alert("true");
       return true; //true to enable buttons
    }
    else
    {
       //alert("false");
       return false;//false to disable buttons
    }
}
function CheckUserRole(roleName)
{
    var currentUserRoles = Xrm.Page.context.getUserRoles();
    for (var i = 0; i < currentUserRoles.length; i++)
    {
        var userRoleId = currentUserRoles[i];
        //var userRoleName = getRoleName(userRoleId);
        if (userRoleId == roleName)
        {
            return true;
        }
    }
    return false;
}
function GetSetEmail()
{
    if (CheckRole()==false) return;
    if (Xrm.Page.getAttribute("new_lookup")==null) return;
    var lookUpVal = Xrm.Page.getAttribute("new_lookup").getValue();
    if (lookUpVal== null) return;
    var id= lookUpVal[0].id;
    var name= lookUpVal[0].name;
    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="true">\
        <entity name="account">\
            <attribute name="emailaddress1" />\
            <order attribute="name" descending="false" />\
            <link-entity name="new_testentity" from="new_lookup" to="accountid" alias="ac">\
                <filter type="and">\
                    <condition attribute="new_lookup" operator="eq" uiname="'+name+'" uitype="account" value="'+id+'" />\
                </filter>\
            </link-entity>\
        </entity>\
    </fetch>';
    var ResultsRetrived = XrmServiceToolkit.Soap.Fetch(fetchXml);
    if (ResultsRetrived!= null && ResultsRetrived.length>0)
    {
        if (ResultsRetrived[0].attributes["emailaddress1"] != null)
        {
            var text = ResultsRetrived[0].attributes["emailaddress1"].value;
            if (text != null)
            {
                Xrm.Page.getAttribute("new_textforemail").setValue(text);
                Xrm.Page.data.entity.save();
            }
        }
    }

}
function confirmEvent(selectedRows) {
    debugger
    var conf = false;
    //var retrievedResult = [];
    var idd= [];
    for (var i in selectedRows)
    {
        idd[i] = selectedRows[i].Id;
        var col = ["new_lookup","statecode"];
         var retrievedResult = XrmServiceToolkit.Soap.Retrieve("new_testentity", idd[i], col);
        if (retrievedResult != null)
        {
            if (retrievedResult.attributes["new_lookup"] != null)
            {
                conf = true;
            }
        }
    }
    if (conf)
    {
        if (!confirm("Selected records contain account. Continue to deactivate?"))
        {
            //user has changed their mind
           alert("Denied");
           return false;
        }
        alert("Confirmed");
    }
    for (var i in selectedRows)
    {
        XrmServiceToolkit.Soap.SetState("new_testentity",idd[i],1,2);
    }
}


