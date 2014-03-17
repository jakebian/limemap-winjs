(function () {
    "use strict";
    WinJS.Binding.optimizeBindingReferences = true;

    WinJS.UI.Pages.define("/pages/list/list.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var thisObject = {id:7};
            var dataURL="http://mappet.dev/places/json/" + thisObject.id;
            ajaxRequest("GET", dataURL, function (result) {
                var data = JSON.parse(result.responseText);
                makeList(data, "itemTemplate", "listTarget", function (element, data) {
                    bindNavigate(element, ".navigate", "/pages/item/item.html", { data: data });
                });
            })
            
        }
    });


})();
