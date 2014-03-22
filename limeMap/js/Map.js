var GEOREADY = false;


function Map() {
    var map = new BMap(); //Using Bmap implementation
    var defPos = map.pos(50, 22);
    var defZoom = 12;
    var places = [];
    var ready = false;
    var showCurrentPos = true;

    var thismap = this;
    this.getMap = function () {
        return map.getMap();
    }

    this.geoReady = function geoReady(callback) {
        map.geoReady(callback);
    }
    /**
    * Attempts of find user location, initialize map.
    * @return {Map} this
    */
    this.init = function (callback) {
        initMap(defPos, defZoom);
        this.geoReady(function (center, pos) {
            defPos = center.center;
            callback();
        })

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

    this.directions = function (endPoint) {
        map.getDirections(endPoint, defPos);
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


    this.computeDistance = function (lat, lng, defPos) {
        var x = defPos.latitude - lat;
        var y = defPos.longitude - lng;
        var raw = x * x + y * y;
        console.log(raw);
        return Math.sqrt();
    }

    /**
    * adds a draggable pin
    * @param {Pos} pos
    */
    this.addDragPin = function (coords) {
        var marker = map.addDragPin(this.toPos(coords));
 
        return new this.pin(marker);
    }
    this.addUserPin = function () {
        return this.addDragPin(defPos);
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
}