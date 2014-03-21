var MYLOC = false;
var GEOREADY = false;
function geoReady(callback) {
    console.log(navigator.geolocation);
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (loc) {
            console.log(loc);
            MYLOC = [loc.coords.latitude, loc.coords.longitude];
            callback();
        }, function () {
            console.log("not allowed");
        });
    } else {
        console.log('else');
        callback();
    }
}

function Map() {
    var map = new BMap(); //Using Gmap implementation
    var defPos = map.pos(50, 22);
    var defZoom = 12;
    var places = [];
    var ready = false;
    var showCurrentPos = true;

    var thismap = this;
    this.getMap = function () {
        return map.getMap();
    }
    /**
    * Attempts of find user location, initialize map.
    * @return {Map} this
    */
    this.init = function () {
        if (MYLOC) {
            defPos = map.pos(MYLOC[0], MYLOC[1]);
        }
        initMap(defPos, defZoom);
    }

    this.pos = function (lat, lng) {
        return map.pos(lat, lng);
    }


    var initMap = function (pos, zoom) {
        if (showCurrentPos) {
            places[places.length] = { pos: [pos.d, pos.e], content: 'you are here' };
        }
        map.init(pos, zoom);
    }

    /**
    * converts a 2-item array to a Pos object
    * @param {array} coords
    * @return {Pos}
    */
    this.toPos = function (coords) {
        if ($.isArray(coords)) {
            return map.pos(coords[0], coords[1])
        }
        return coords;
    }

    /**
    * adds a draggable pin
    * @param {Pos} pos
    */
    this.addDragPin = function (coords) {
        var marker = map.addDragPin(this.toPos(coords));
        return new this.pin(marker);
    }

    /**
    * Abstraction for a marker
    * @param {Marker} marker
    */
    this.pin = function (marker) {
        this.marker = marker;
        /**
        *returns the location
        * @return {array} [lat,lng]
        */
        this.pos = function () {
            return marker.pos();
        }
    }

    /**
    * Adds a marker at the position, with a infobox with given content
    * @param {Pos} pos
    * @param {String} content
    this.addBoxMarker=function(pos,content){
    map.addBox({pos:pos,content:content});
    return this;
    }
    
    
    /**
    * displays all places on the map.
    * @return {Map} this
    */
    this.showPlaces = function () {
        map.addPlaces(places);
        return this;
    }

    /**
    * clears the map and displays list of places
    * @return {Map} this
    */
    this.refresh = function () {
        map.clear();
        this.showPlaces();
        return this;
    }
    /**
    * clears all places.
    * @return {Map} this
    */
    this.clear = function () {
        places = [];
        this.refresh();
        return this;
    }

    /**
    * appends a list of places to places.
    * @param {array} items - a list of places
    * @return {Map} this
    */
    this.addPlaces = function (items) {
        places = places.concat(items);
        this.refresh();
        return this;
    }
    this.currentPosVisible = function (currentPosVisible) {
        this.showCurrentPos = currentPosVisible;
    }
    this.getCenter = function () {
        return map.getCenter();
    }
    this.init();
}
