(function () {
    "use strict";
    WinJS.Binding.optimizeBindingReferences = true;

    WinJS.UI.Pages.define("/pages/root/root.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        updateLayout:function(){
            initImg();
        },
        ready: function (element, options) {
            
            // TODO: Initialize the page here.
            var navBar = document.getElementById('main-nav').winControl;
            $('.menu-trigger').click(function (e) {
                e.preventDefault();
                navBar.show();
            })
            
            var thisObject = { id: 7 };
            var featuredURL = "http://mappet.dev/submaps/json/featured";
            ajaxRequest("GET", featuredURL, function (result) {
                var data = JSON.parse(result.responseText);
                $('.main-prompt').addClass('ready');
                makeList(data, "featuredTemplate", "featuredTarget", function (element, data) {
                    processImg(element);
                    $(element).hover(function () {
                        $(this).toggleClass('hover');
                    });
                    element.addEventListener("pointerdown", function () {
                        $(element).addClass('selected');
                    }, false);
                    document.addEventListener("pointerup", function () {
                        $('.selected').removeClass('selected');
                    }, false);

                    bindNavigate(element, ".submap-thumb", "/pages/submap/submap.html", { data: data });
                })
                loadItems();

            });
            var dataURL = "http://mappet.dev/submaps/json/home";

            function loadItems(){
                ajaxRequest("GET", dataURL, function (result) {
                    var data = JSON.parse(result.responseText);

                    makeList(data, "itemTemplate", "itemsTarget", function (element, data) {
                        bindNavigate(element, ".submap-thumb", "/pages/submap/submap.html", { data: data });
                        processImg(element);
                        $(element).hover(function () {
                            $(this).toggleClass('hover');

                        })
                        element.addEventListener("pointerdown", function () {
                            $(element).addClass('selected');
                        }, false);
                        
                    });
                    
                    $('.thumb-utils').fadeIn();
                })
            }
            $('.full-content').parent().addClass('full-page');
        }
    });

})();
function initImg() {
    $('.img-fill').each(function () {
        var $this = $(this)
        var thisimg = $(this).find('img');
        var theImage = new Image();
        theImage.src = thisimg.attr("src");
        theImage.onload = function () {
            thisimg.width('auto');
            thisimg.height('auto');
            var rat1 = (parseInt($this.outerWidth()) / parseInt($this.outerHeight()));
            var rat2 = (parseInt(theImage.width) / parseInt(theImage.height));

            if (rat1 > rat2) {
                thisimg.width('100%');
                thisimg.height('auto');
            }
            else {
                thisimg.height('100%');
                thisimg.width('auto');
            }
        }
    })
}
function processImg(element) {
    $(element).find('.img-fill').each(function () {
        var $this = $(this)
        var thisimg = $(this).find('img');
        var theImage = new Image();
        theImage.src = thisimg.attr("src");
        theImage.onload = function () {
            var rat1 = (parseInt($this.outerWidth()) / parseInt($this.outerHeight()));
            var rat2 = (parseInt(theImage.width) / parseInt(theImage.height));
            thisimg.width('auto');
            thisimg.height('auto');
            if (rat1 > rat2) {
                thisimg.width('100%');
                thisimg.height('auto');
            }
            else {
                thisimg.height('100%');
                thisimg.width('auto');
            }
        }
    })
}