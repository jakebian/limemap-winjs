(function () {
    "use strict";
    WinJS.Binding.optimizeBindingReferences = true;

    WinJS.UI.Pages.define("/pages/submap/submap.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        ready: function (element, options) {
            // TODO: Initialize the page here.
            var dataURL = "http://limemap.com/places/json/9";
            var page;
            ajaxRequest("GET", dataURL, function (result) {
                console.log(result);
                var data = JSON.parse(result.responseText);
                makeList(data, "itemTemplate", "listTarget", function (element, data) {
                    bindNavigate(element, ".place-thumb", "/pages/place/place.html", { data: data });
                });
                page = {
                    name: "A SUBMAP",
                    desc: "BLAH",
                    bg_img:"#",
                    placeCount: data.length,
                    nearbyCount: 5,
                }
                var headerTemplate = document.getElementById('headerTemplate').winControl;
                headerTemplate.render(page).done(function (result) {
                    $('.submap-header').append(result);
                });
                

            });
            $('.map-page-content').parent().addClass('map-page');

            function initMap() {
                var map = new Map();
                map.init();
                var data = [{ pos: [50, 50] }, { pos: [60, 60] }];
                map.addPlaces(data);
             
            }

            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en-us", homeRegion: "US" });
        }
    });
})();
