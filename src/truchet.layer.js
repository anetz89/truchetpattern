
L.TileLayer.TruchetPattern = L.TileLayer.extend({
    getTileUrl: function(coords) {
        if (Math.random() < this.options.current.porosity) {
            return 'tiles/transparent.png';
        }
        var i = Math.floor(Math.random() * this.options.current.tileList.length );

        return this.options.current.urls[this._url % 2] + '/' + this.options.current.tileList[i] + ".png";
    },
    setTileZoomValue: function(zoomValue) {
        var size = zoomValue * this.options.current.tileSize;

    	this.options.tileSize = L.point(size, size);
    },
    setCurrent: function(current) {
        this.options.current = current;
    }
});

L.truchetPattern = function(index, options) {
    if (!options) { options = {}; }
    if (!options.minZoom) { options.minZoom = 10; }
    if (!options.maxZoom) { options.maxZoom = 10; }
    if (!options.attribution) { options.attribution = 'Inspired by <a target="_blank" href="https://christophercarlson.com/portfolio/multi-scale-truchet-patterns/">Christopher Carlson</a>'; }

	return new L.TileLayer.TruchetPattern(index, options);
}