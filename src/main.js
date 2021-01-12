var zoom = 3;
var tileset = 'WINGED';
var depth = 3;
var porosity = 0.4;
var layers = [];
var origTileList;

var map = L.map('map', {
	zoomControl: false
}).setView([51.505, -0.09], 10);

update();
updateImageSelection();

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
    var options = copy(CONFIG.TILESETS[tileset]);

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
    // undo image selections
    CONFIG.TILESETS[tileset].tileList = origTileList;
    tileset = tilesetSelect.value.toUpperCase();
    update();
    updateImageSelection();
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

var imageContainer = document.getElementById('imageSelectionBox');

function updateImageSelection() {
    if (!imageContainer) {
        return setTimeout(updateImageSelection, 1000);
    }
    while (imageContainer.firstChild) {
        imageContainer.removeChild(imageContainer.firstChild);
    }

    origTileList = copy(CONFIG.TILESETS[tileset].tileList);

    CONFIG.TILESETS[tileset].tileList.forEach(function(tile) {
        var image = document.createElement('img');

        image.src = CONFIG.TILESETS[tileset].urls[0] + '/' + tile + '.png'; 
        image.alt = tile;
        image.className = 'tileSelectionImage';
        image.onclick = function() {
            if (image.className.indexOf(' disabled') >= 0) {
                image.className = image.className.replace(' disabled', '');
                CONFIG.TILESETS[tileset].tileList.push(tile);
            } else {
                image.className += ' disabled';
                CONFIG.TILESETS[tileset].tileList.splice(CONFIG.TILESETS[tileset].tileList.indexOf(tile), 1);
            }
            update();
        }

        imageContainer.appendChild(image)
    });
}

function copy(elem) {
    return JSON.parse(JSON.stringify(elem));
}