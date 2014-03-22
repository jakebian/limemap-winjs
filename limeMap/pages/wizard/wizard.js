(function () {
    "use strict";
    WinJS.Binding.optimizeBindingReferences = true;

    function upVotePlace(place) {
        var dataURL = "http://limemap.com/place/" + place.id + "/upvote";
        ajaxRequest("POST", dataURL, function (result) { place.score++; });
    }
    function downVotePlace(place) {
        var dataURL = "http://limemap.com/place/" + place.id + "/downvote";
        ajaxRequest("POST", dataURL, function (result) { place.score--; });
    }

    WinJS.UI.Pages.define("/pages/wizard/wizard.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        
        ready: function (element, options) {
            // TODO: Initialize the page here.
            //  var thisObject = options.data;

            Microsoft.Maps.loadModule('Microsoft.Maps.Map', { callback: initMap, culture: "en-us", homeRegion: "US" });

            var submap = parseInt($('#submap-id').text());
            function initMap() {
                var map = new Map();
                map.init();
                return map;
            }
            var map = initMap();
            newWizard(submap, map);


        }
    });


})();
