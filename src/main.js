var current;
var zoom = 2;
var tileset = 'CURVES_FILLED';
var depth = 3;
var porosity = 0.4;
var layers = [];

var map = L.map('map', {
	zoomControl: false
}).setView([51.505, -0.09], 10);

update();

function update() {
    // clear map
    layers.forEach(map.removeLayer.bind(map));
    layers = [];

    // create new layers
    for(var i = 0; i < depth; i += 1) {
        layers.push(L.truchetPattern(i));

        layers[i].setCurrent(getOptions(i + 1 < depth));
        layers[i].setTileZoomValue(zoom / Math.pow(2, i));
    }

    // add them to map
    layers.reverse().forEach(map.addLayer.bind(map));
}

function getOptions(allowPorosity) {
    var options = JSON.parse(JSON.stringify(CONFIG.TILESETS[tileset]));

    options.porosity = allowPorosity ? porosity : 0;  //(index === 0) ? 0 : porosity;
    
    return options;
}

var zoomSelect = document.getElementById('zoom');
zoomSelect.onchange = function() {
    zoom = parseFloat(zoomSelect.value);
    update();
};

var tilesetSelect = document.getElementById('tileset');
tilesetSelect.onchange = function() {
    tileset = tilesetSelect.value.toUpperCase();
    update();
};

var depthSelect = document.getElementById('depth');
depthSelect.onchange = function() {
    depth = parseInt(depthSelect.value);
    update();
};

var porositySelect = document.getElementById('porosity');
porositySelect.onchange = function() {
    porosity = parseFloat(porositySelect.value);
    update();
};
