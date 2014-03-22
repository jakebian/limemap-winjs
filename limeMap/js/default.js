// For an introduction to the Navigation template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232506
(function () {
    "use strict";

    var activation = Windows.ApplicationModel.Activation;
    var app = WinJS.Application;
    var nav = WinJS.Navigation;
    var sched = WinJS.Utilities.Scheduler;
    var ui = WinJS.UI;

    app.addEventListener("activated", function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }

            nav.history = app.sessionState.history || {};
            nav.history.current.initialPlaceholder = true;

            // Optimize the load of the application and while the splash screen is shown, execute high priority scheduled work.
            ui.disableAnimations();
            var p = ui.processAll().then(function () {
                return nav.navigate(nav.location || Application.navigator.home, nav.state);
            }).then(function () {
                return sched.requestDrain(sched.Priority.aboveNormal + 1);
            }).then(function () {
                ui.enableAnimations();
            });

            args.setPromise(p);
        }
    });

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. If you need to 
        // complete an asynchronous operation before your application is 
        // suspended, call args.setPromise().
        app.sessionState.history = nav.history;
    };

    app.start();
})();

//helpers

function makeList(datalist, templateID, targetID, callback) {
    var template = document.getElementById(templateID);
    var target = document.getElementById(targetID);
    renderList(datalist, template, target, callback);
}

function renderList(datalist, template, target, callback) {
    for (var i = 0; i < datalist.length; i++) {
        renderTemplate(datalist[i], template, target, callback);
    }
}
function renderTemplate(data, template, target,callback) {
    template.winControl.render(data).done(function (result) {
        var anim = WinJS.UI.Animation.createAddToListAnimation(result, target);
        var element = target.appendChild(result);
        anim.execute()
       if( typeof (callback) == "function"){
           callback(element,data);
       }
    })
}
function bindNavigate(element, trigger, url, options) {
    $(element).find(trigger).click(function (e) {
        e.preventDefault();
        WinJS.Navigation.navigate(url, options);
    })
}

function ajaxRequest(type, url, success, fail,loading) {
    WinJS.xhr({
        type: type,
        url: url,
        data: {},
    }).done(
        function completed(result) {
            call(success, result);
        },
        function error(request) {
            call(fail, request);
        },
        function progress(request) {
            call(loading, request);
        }
    )
}

function call(callback, result) {
    if (typeof (callback) == "function") {
        callback(result);
    }
}