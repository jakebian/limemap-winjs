(function () {
    "use strict";
    WinJS.Binding.optimizeBindingReferences = true;

    WinJS.UI.Pages.define("/pages/item/item.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            //var data = [{ name: "item 1", score: "1" }, { name: "item 2", score: "2" }];
            //makeList(data, "itemTemplate", "listTarget", function (element,data) {
            //    $(element).find('.navigate').click(function (e) {
            //        e.preventDefault();
            //        console.log(data.name);
            //    })
            //});
            var data = options.data;
            $('.pagetitle').html(data.name)
        }
    });

})();
