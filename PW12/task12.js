function Start()
{
    if (!confirm("Are you sure you want to deactivate all related entries 'Child Entity'?"))
    {
        return false;
    }
    Ok();

}
function GetUrl(){
    if (typeof Xrm.Page.context == "object"){
        clientUrl = Xrm.Page.context.getClientUrl();
    }
    var ServicePath = "/XRMServices/2011/Organization.svc/web";
    return clientUrl + ServicePath;
}
function Ok()
{
    var testId = Xrm.Page.data.entity.getId(); //{DE4B6AB0-7F9A-E911-8122-00155D06F203}
    var requestXml ='<s:Envelope xmlns:s="http://schemas.xmlsoap.org/soap/envelope/">\
        <s:Body>\
            <Execute xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">\
                <request xmlns:a="http://schemas.microsoft.com/xrm/2011/Contracts">\
                    <a:Parameters xmlns:b="http://schemas.datacontract.org/2004/07/System.Collections.Generic">\
                        <a:KeyValuePairOfstringanyType>\
                            <b:key>RecordId</b:key>\
                            <b:value i:type="c:string" xmlns:c="http://www.w3.org/2001/XMLSchema">' + testId + '</b:value>\
                        </a:KeyValuePairOfstringanyType>\
                    </a:Parameters>\
                    <a:RequestId i:nil="true" />\
                    <a:RequestName>new_Taction</a:RequestName>\
                </request>\
            </Execute>\
        </s:Body>\
    </s:Envelope>';
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",GetUrl(),false);
    xmlhttp.setRequestHeader("Accept","application/xml, text/xml, */*");
    xmlhttp.setRequestHeader("Content-Type","text/xml; charset=utf-8");
    xmlhttp.setRequestHeader("SOAPAction","http://schemas.microsoft.com/xrm/2011/Contracts/Services/IOrganizationService/Execute");
    debugger
    var result2 = xmlhttp.send(requestXml);
    var result = xmlhttp.responseXML;

    if (result.error) {
        alert(result.text);
    }
    else {
        var res = result.all[8].innerHTML;
        alert(res + " records.");
    }
}