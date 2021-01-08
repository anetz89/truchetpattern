var map = L.map('map', {
	zoomControl: false
}).setView([51.505, -0.09], 13);

mapLink = 
    '<a href="https://christophercarlson.com/portfolio/multi-scale-truchet-patterns/">Christopher Carlson</a>';


L.TileLayer.TruchetPattern = L.TileLayer.extend({
    getTileUrl: function(coords) {
        var i = Math.ceil( Math.random() * 9 );
        return "./tiles/0" + i + ".png";
    }
});

L.TileLayer.truchetPattern = function() {
	return new L.TileLayer.TruchetPattern();
}

new L.TileLayer.TruchetPattern('./tiles/', {
    attribution: 'Inspired by ' + mapLink,
    maxZoom: 13,
    minZoom: 13,
    tileSize: 74
}).addTo(map);