(function () {
    "use strict";
    WinJS.Binding.optimizeBindingReferences = true;

    function upVotePlace(place) {
        var dataURL = "http://mappet.dev/place/" + place.id + "/upvote";
        ajaxRequest("POST", dataURL, function (result) { place.score++; });
    }
    function downVotePlace(place) {
        var dataURL = "http://mappet.dev/place/" + place.id + "/downvote";
        ajaxRequest("POST", dataURL, function (result) { place.score--; });
    }

    WinJS.UI.Pages.define("/pages/place/place.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var thisObject = options.data;
            $('.pagetitle').html(thisObject.name);
            var dataURL = "http://mappet.dev/visits/json/" + thisObject.id;
            ajaxRequest("GET", dataURL, function (result) {
                var data = JSON.parse(result.responseText);
                makeList(data, "itemTemplate", "listTarget");
            });
            $('.map-page-content').parent().addClass('map-page');

            var scoreSection = document.getElementById("score-section");
            var place = WinJS.Binding.as(thisObject);
            WinJS.Binding.processAll(scoreSection, place);

            $("#place-upvote").click(function (e) {
                e.preventDefault();
                upVotePlace(place);
            })
            $("#place-downvote").click(function (e) {
                e.preventDefault();
                downVotePlace(place);
            })

        }
    });


})();
