var currentTileSize;
var currentTileList;
updateTileSet('WINGED');

var map = L.map('map', {
	zoomControl: false
}).setView([51.505, -0.09], 10);

L.TileLayer.TruchetPattern = L.TileLayer.extend({
    getTileUrl: function(coords) {
        var i = Math.floor( Math.random() * currentTileList.length );
        return this._url + "/" + currentTileList[i] + ".png";
    },
    setTileSize: function(size) {
    	this.options.tileSize = L.point(size, size);
    	this.redraw();
    }
});

L.TileLayer.truchetPattern = function() {
	return new L.TileLayer.TruchetPattern();
}

var truchetPattern = new L.TileLayer.TruchetPattern('./tiles/winged', {
    attribution: 'Inspired by <a href="https://christophercarlson.com/portfolio/multi-scale-truchet-patterns/">Christopher Carlson</a>',
    maxZoom: 10,  // fake; 4
    minZoom: 10,
    tileSize: currentTileSize
});

truchetPattern.addTo(map);

function updateTileSize() {
    truchetPattern.setTileSize(parseFloat(zoomSelect.value) * currentTileSize);
}
function updateTileSet(tileSet) {
	currentTileSize = CONFIG.TILESETS[tileSet].tileSize;
	currentTileList = CONFIG.TILESETS[tileSet].tileList;
}

var zoomSelect = document.getElementById('zoom');
zoomSelect.onchange = updateTileSize;


var tilesetSelect = document.getElementById('tileset');
tilesetSelect.onchange = function () {
	updateTileSet(tilesetSelect.value.toUpperCase());
    truchetPattern.setUrl('./tiles/' + tilesetSelect.value, false);
    updateTileSize();
}