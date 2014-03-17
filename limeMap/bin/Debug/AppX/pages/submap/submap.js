(function () {
    "use strict";
    WinJS.Binding.optimizeBindingReferences = true;

    WinJS.UI.Pages.define("/pages/submap/submap.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        ready: function (element, options) {
            // TODO: Initialize the page here.
            var thisObject = options.data;
            var dataURL = "http://mappet.dev/places/json/" + thisObject.id;
            var page;
            ajaxRequest("GET", dataURL, function (result) {
                var data = JSON.parse(result.responseText);
                makeList(data, "itemTemplate", "listTarget", function (element, data) {
                    bindNavigate(element, ".place-thumb", "/pages/place/place.html", { data: data });
                });
                page = {
                    name: thisObject.name,
                    desc: thisObject.desc,
                    bg_img:thisObject.bg_img,
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
                var map;

                var mapOptions =
                {
                    credentials: "Am56LgK9pqHGKdnTIf8fdXYNpUksCPovjIMVOzoPXK_mHAImKghIfBv0I5eNQ_xa"
                };

                map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);
                var options = map.getOptions();
                options.zoom = 5;
                map.setView(options);
            }
            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en-us", homeRegion: "US" });
        }
    });
})();
