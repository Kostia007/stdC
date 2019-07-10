function GetValueFromField()
{
    debugger
    Xrm.Page.ui.tabs.get("{a4315980-efcf-41dc-bd45-f2cc65dd2883}").setVisible(true);
    Xrm.Page.ui.tabs.get("{a4315980-efcf-41dc-bd45-f2cc65dd2883}").sections.get("{c7596b56-ad21-405d-8e77-bb083600bb5d}").setVisible(true);
    //Xrm.Page.ui.tabs.get("Info_tab").sections.get("tab_2_section_1").setVisible(true);
   // sectiondisable ("{c7596b56-ad21-405d-8e77-bb083600bb5d}", true);
    tabdisable ("{a4315980-efcf-41dc-bd45-f2cc65dd2883}", true);
    //sectiondisable ("tab_2_section_1", true);
    //tabdisable ("Info_tab", true);
    Xrm.Page.ui.controls.get("new_testtextfield").setVisible(true);
    formswitch();
    //Xrm.Page.ui.controls.get("new_secondwholenumber").setVisible(true);


}
function sectiondisable (sectionname, disablestatus)
{
    var ctrlName = Xrm.Page.ui.controls.get();
    for(var i in ctrlName) {
        var ctrl = ctrlName[i];
        if(ctrl.getParent() != null) {
            var ctrlSection = ctrl.getParent().getName();
            if (ctrlSection == sectionname) {
                ctrl.setDisabled(disablestatus);
            }
        }
    }
}
function tabdisable (tabname, disablestatus)
{
    var tab = Xrm.Page.ui.tabs.get(tabname);
    if (tab == null) alert("Error: The tab: " + tabname + " is not on the form");
    else {
        var tabsections =  tab.sections.get();
        for (var i in tabsections) {
            var secname = tabsections[i].getName();
            sectiondisable(secname, disablestatus);
        }
    }
}
function formswitch()
{
    var type = Xrm.Page.ui.getFormType();
    if (type==1)
    {
        var formlist = Xrm.Page.ui.formSelector.items.get();
        for(var i in formlist)
        {
            var formlable = formlist[i].getLabel();
            if (formlable == "Second test form")
            {
                var formid = formlist[i].getId();
                Xrm.Page.ui.formSelector.items.get(formid).navigate();
                console.log("Form switched.")
                break;
            }

        }
    }
}