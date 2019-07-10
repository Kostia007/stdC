function GetValueFromField()
{
    debugger
    updateSubGrid();
    SetFilterToSimpleLookup();
    ChangeColor();
}
function ChangeColor()
{
    //window.parent.document.getElementById("new_testtextfield").style.color = "Blue";
    window.parent.document.getElementById("new_testtextfield_cl").style.color = "Blue";
    window.parent.document.getElementById("Test Text Field_label").style.color = "Red";
    //parent.$("[data-for-id='new_testtextfield_label']:first-child").css("color", "red");
    //parent.$("#new_testtextfield_i").css("color", "blue");
}
function updateSubGrid()
{

    var gridcontacts = window.parent.document.getElementById("test_grid_contact");
    var parentAccount = Xrm.Page.getAttribute("new_lookup");
    if (parentAccount != null)
    {

        var parentAccountValue = parentAccount.getValue();
    }
    if (parentAccountValue != null)
    {
        var parentAccountId = parentAccountValue[0].id;
        var parentAccountName = parentAccountValue[0].name;
    }
    else
    {
        return;
    }
    if (gridcontacts == null)
    {
        setTimeout('updateSubGrid()', 2000);
        return;
    }
    else
    {
        var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">\
            <entity name="contact">\
            <attribute name="fullname" />\
            <attribute name="telephone1" />\
            <attribute name="contactid" />\
            <order attribute="fullname" descending="false" />\
            <filter type="and">\
                <condition attribute="parentcustomeridname" operator="eq" value="' + parentAccountName + '" />\
            </filter>\
            </entity>\
        </fetch>';
    if (gridcontacts.control != null) {
//Here i set the fetchxml directly to subgrid
        gridcontacts.control.SetParameter("fetchXml", fetchXml); //set the fetch xml to the sub grid
        gridcontacts.control.Refresh(); //refresh the sub grid using the new fetch xml
    }
    else {
        setTimeout('updateSubGrid()', 500);
    }

    }

}
function SetFilterToSimpleLookup(){
    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">\
        <entity name="contact">\
        <attribute name="fullname" />\
        <attribute name="telephone1" />\
        <attribute name="contactid" />\
        <order attribute="fullname" descending="false" />\
        <filter type="and">\
            <condition attribute="new_code" operator="eq" value="5" />\
        </filter>\
        </entity>\
    </fetch>';
    var viewId = "{8FBE1AAC-FE20-47E9-91D4-19F306B33421}";
    var viewDisplayName = "Contacts with code = 5";
    var viewIsDefault = true;
    //вид отображения результатов
    var layoutXml = "<grid name='resultset' object='2' jump='resId' select='1' icon='1' preview='1'>" +
        "<row name='result' id='resId'>" +
        "<cell name='fullname' width='200' />" +
        "<cell name='telephone1' width='150' />" +
        "</row>" +
        "</grid>";
    Xrm.Page.getControl("new_lookupcontuct").addCustomView(viewId, "contact", viewDisplayName, fetchXml, layoutXml, viewIsDefault);
    Xrm.Page.getControl("new_lookupcontuct").setDefaultView(viewId);
}
