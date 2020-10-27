({
    openTabWithSubtab : function(component, event, helper) {
        var workspaceAPI = component.find("workspace");
        workspaceAPI.openTab({
            url: '/lightning/r/Account/0017F000009g43c/view',
            focus: true
        }).then(function(response) {
            workspaceAPI.openSubtab({
                parentTabId: response,
                url: '/lightning/r/Contact/0037F0000067A3x/view',
                focus: true
            });
        })
        .catch(function(error) {
            console.log(error);
        });
    }
})