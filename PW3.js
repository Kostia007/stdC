function GetValueFromField()
{
    debugger
    CreateContact();
    updateFieldContact("{010BAA80-7492-E911-8121-00155D06F203}"); // Task3 test - contact
    deactivateContact("{010BAA80-7492-E911-8121-00155D06F203}");
    giveAcess("{1cdcee27-9583-e911-8120-00155d06f203}", "{010BAA80-7492-E911-8121-00155D06F203}");
    var roles =  new XrmServiceToolkit.Soap.GetCurrentUserRoles();
    retrieveContacts();

}
function CreateContact()
{
    var createContact = new XrmServiceToolkit.Soap.BusinessEntity("contact");
    var name = Xrm.Page.getAttribute("new_lookup").getValue()[0].name;
    var id = Xrm.Page.getAttribute("new_lookup").getValue()[0].id;
    id = id.replace("{","");
    id = id.replace("}","");
    createContact.attributes["lastname"]= "Task3" + " "+ name;
    createContact.attributes["parentcustomerid"]= { id : id, logicalName : Xrm.Page.getAttribute("new_lookup").getValue()[0].entityType, type : 'EntityReference' };
    contactId = XrmServiceToolkit.Soap.Create(createContact);

}
function updateFieldContact(namefield)
{
    var updateContact = new XrmServiceToolkit.Soap.BusinessEntity("contact",namefield);
    updateContact.attributes["jobtitle"]= "Task3.1";
    CUpdated = XrmServiceToolkit.Soap.Update(updateContact);
}
function deactivateContact(namefield)
{
    XrmServiceToolkit.Soap.SetState("contact",namefield,1,2);
}
function activateContact(namefield)
{
    XrmServiceToolkit.Soap.SetState("contact",namefield,0,1);
}
function giveAcess(userId, contactId)
{
    var accessOptions = {
        targetEntityName: "contact",
        targetEntityId: contactId,
        principalEntityName: "systemuser",
        principalEntityId: userId,
        accessRights: ["ReadAccess", "WriteAccess", "DeleteAccess"]
    };
    var grantAccessResponse = XrmServiceToolkit.Soap.GrantAccess(accessOptions);
    if (grantAccessResponse != "GrantAccess") Xrm.Page.ui.setFormNotification('The current user should have the listed access to the contact', 'WARNING', 'warnId');
}
function retrieveContacts()
{
    var fetchXml = '<fetch version="1.0" output-format="xml-platform" mapping="logical" distinct="false">\
        <entity name="contact">\
            <attribute name="fullname" />\
            <attribute name="telephone1" />\
            <attribute name="contactid" />\
            <order attribute="fullname" descending="false" />\
            <filter type="and">\
                <filter type="or">\
                    <condition attribute="address1_composite" operator="not-null" />\
                    <condition attribute="address2_composite" operator="not-null" />\
                    <condition attribute="address3_composite" operator="not-null" />\
                </filter>\
            </filter>\
            <link-entity name="account" from="accountid" to="parentcustomerid" alias="an">\
                <filter type="and">\
                    <condition attribute="createdon" operator="on-or-after" value="2019-06-12" />\
                </filter>\
            </link-entity>\
        </entity>\
    </fetch>';
    var ResultsRetrived = XrmServiceToolkit.Soap.Fetch(fetchXml);
}
