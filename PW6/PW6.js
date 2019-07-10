function getXrmFrame() {
    for (var i = 0; i <= parent.frames.length; i++) {
        var frame = parent.frames[i];
        if (frame.Xrm && frame.Xrm.Page && frame.Xrm.Page.data && frame.Xrm.Page.data.entity) {
            return frame;
        }
    }
    return null;
}
function OpenWindow()
{
    debugger
    var lookVal = Xrm.Page.getAttribute("new_lookup").getValue();
    var stringVal = Xrm.Page.getAttribute("new_testtextfield").getValue();
    var dataVal = Xrm.Page.getAttribute("new_date").getValue();
    var intVal = Xrm.Page.getAttribute("new_wholenumber").getValue();
    var opset = Xrm.Page.getAttribute("new_optionset").getValue();
    Xrm.Utility.openWebResource("new_test/index.html",null,100,100);
}
function ChangeState()
{
    debugger
    var selector = document.getElementById("id_for_select");
    var field = selector[selector.selectedIndex].value;
    switch(field) {
        case "new_lookup":
            window.opener.Xrm.Page.getAttribute("new_lookup").setRequiredLevel("required")();
            break;
        case "new_testtextfield":
            window.opener.Xrm.Page.getAttribute("new_testtextfield").setRequiredLevel("required");
            break;
        case "new_date":
            window.opener.Xrm.Page.getAttribute("new_date").setRequiredLevel("required");
            break;
        case "new_wholenumber":
            window.opener.Xrm.Page.getAttribute("new_wholenumber").setRequiredLevel("required");
            break;
        case "new_optionset":
            window.opener.Xrm.Page.getAttribute("new_optionset").setRequiredLevel("required");
            break;
    }
    window.close();

}