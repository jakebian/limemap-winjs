function BMap() {
    var map;
    /**
     * Initializees the map
     * @param  pos - center of the map, the type Pos is specified by the pos function in this class
     * @param  {float} zoom - zoom level
     */
    var markers = [];

    this.init = function (pos,zoom) {

        var mapOptions =
        {
            credentials: "Am56LgK9pqHGKdnTIf8fdXYNpUksCPovjIMVOzoPXK_mHAImKghIfBv0I5eNQ_xa"
        };

        map = new Microsoft.Maps.Map(document.getElementById("mapDiv"), mapOptions);
        var options = map.getOptions();
        // mapTypeId: Microsoft.Maps.MapTypeId.road;
        options.center = pos;
        options.zoom = zoom;

        map.setView(options);

    }

    /**
     * Attaches a infobox to a marker
     * @param {new Microsoft.Maps.Pushpin} marker
     * @param {string} content
     */
    this.addBox = function (marker, content) {

        var infoOptions = {
            description: content,
            visible: true,
        };

        var Infobox = new Microsoft.Maps.Infobox( marker.getLocation(), infoOptions);

        map.entities.push(Infobox);

    }

    /* This function is used to determine when the map is fully loaded
    */

    this.ready = function (callback) {
        callback();
    }

    /**
     * Clears all markers
     */
    this.clear = function () {
        map.entities.clear();
    }

    /**
     * A representation of position used by the map API
     * @param  {float} lat - lattitude
     * @param  {float} lng - Longitude
     * @return {google.maps.LatLng} 
     */

    // Defines coordinates as a Microsoft Maps Object
    this.pos = function (lat, lng) {
        return new Microsoft.Maps.Location(lat, lng);
    }


    /**
     * Adds a list of places to the maps
     * @param {array} list - must contain objects {LatLng,String}
     */
    this.addPlaces = function (list) {
        for (var i = 0; i < list.length; i++) {
            this.addPlace(list[i]);
        }
    }

    /**
     * adds a draggable pin
     * @param {Pos} pos
     */
    this.addDragPin = function (pos) {

        var pushpinOptions = { Title:"Drag Me", draggable: true };
        var marker = new Microsoft.Maps.Pushpin(pos, pushpinOptions);

        map.entities.push(marker);
       
        //this.addBox(marker, 'drag me');

        return new this.marker(marker);
    }



    this.marker = function (marker) {
        this.marker = marker;
        this.pos = function () {
            var p = marker.getLocation();
            return [p.latitude, p.longitude];
        }
    }

    /**
     * Adds a a marker with content box given position and content
     * @param {LatLng,String} data
     */
    this.addPlace = function (data) {
        var marker = new Microsoft.Maps.Pushpin(this.pos(data.pos[0], data.pos[1]));
        map.entities.push(marker);
        markers[markers.length] = marker;
    }


    this.getCenter = function () {
        return map.getCenter();
    }
    this.getMap = function () {
        return map
    }
}
