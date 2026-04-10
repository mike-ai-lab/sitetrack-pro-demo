# GridLayer

### Usage example

| Function                                                                                                    | Returns  | Description                                                                                                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `**geometryToLayer**(<Object>*featureData*,<GeoJSON options>*options?*)`                                    | `Layer`  | Creates a`Layer`from a given GeoJSON feature. Can use a custom`pointToLayer`and/or`coordsToLatLng`functions if provided as options.                                                                                                                    |
| `**coordsToLatLng**(<Array>*coords*)`                                                                       | `LatLng` | Creates a`LatLng`object from an array of 2 numbers (longitude, latitude) or 3 numbers (longitude, latitude, altitude) used in GeoJSON for points.                                                                                                      |
| `**coordsToLatLngs**(<Array>*coords*,<Number>*levelsDeep?*,<Function>*coordsToLatLng?*)`                    | `Array`  | Creates a multidimensional array of`LatLng`s from a GeoJSON coordinates array.`levelsDeep`specifies the nesting level (0 is for an array of points, 1 for an array of arrays of points, etc., 0 by default). Can use a custom`coordsToLatLng`function. |
| `**latLngToCoords**(<LatLng>*latlng*,<Number|false>*precision?*)`                                           | `Array`  | Reverse of`coordsToLatLng`Coordinates values are rounded with`formatNum`function.                                                                                                                                                                      |
| `**latLngsToCoords**(<Array>*latlngs*,<Number>*levelsDeep?*,<Boolean>*closed?*,<Number|false>*precision?*)` | `Array`  | Reverse of`coordsToLatLngs``closed`determines whether the first point should be appended to the end of the array to close the feature, only used when`levelsDeep`is 0. False by default. Coordinates values are rounded with`formatNum`function.       |
| `**asFeature**(<Object>*geojson*)`                                                                          | `Object` | Normalize GeoJSON geometries/features into GeoJSON features.                                                                                                                                                                                           |

Generic class for handling a tiled grid of HTML elements. This is the base class for all tile layers and replaces`TileLayer.Canvas`. GridLayer can be extended to create a tiled grid of HTML elements like`<canvas>`,`<img>`or`<div>`. GridLayer will handle creating and animating these DOM elements for you.
Synchronous usage

To create a custom layer, extend GridLayer and implement the`createTile()`method, which will be passed a`Point`object with the`x`,`y`, and`z`(zoom level) coordinates to draw your tile.

```
var CanvasLayer = L.GridLayer.extend({
    createTile: function(coords){
        // create a <canvas> element for drawing
        var tile = L.DomUtil.create('canvas', 'leaflet-tile');

        // setup tile width and height according to the options
        var size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;

        // get a canvas context and draw something on it using coords.x, coords.y and coords.z
        var ctx = tile.getContext('2d');

        // return the tile so it can be rendered on screen
        return tile;
    }
});

```
Asynchronous usage

Tile creation can also be asynchronous, this is useful when using a third-party drawing library. Once the tile is finished drawing it can be passed to the

### Creation

### Options

### Events

### Methods

`done()`callback.

```
var CanvasLayer = L.GridLayer.extend({
    createTile: function(coords, done){
        var error;

        // create a <canvas> element for drawing
        var tile = L.DomUtil.create('canvas', 'leaflet-tile');

        // setup tile width and height according to the options
        var size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;

        // draw something asynchronously and pass the tile to the done() callback
        setTimeout(function() {
            done(error, tile);
        }, 1000);

        return tile;
    }
});

```

| Factory                                          | Description                                                    |
| ------------------------------------------------ | -------------------------------------------------------------- |
| `**L.gridLayer**(<GridLayer options>*options?*)` | Creates a new instance of GridLayer with the supplied options. |

| Option                  | Type           | Default      | Description                                                                                                                                                                                                                                                                         |
| ----------------------- | -------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**tileSize**`          | `Number|Point` | `256`        | Width and height of tiles in the grid. Use a number if width and height are equal, or`L.point(width, height)`otherwise.                                                                                                                                                             |
| `**opacity**`           | `Number`       | `1.0`        | Opacity of the tiles. Can be used in the`createTile()`function.                                                                                                                                                                                                                     |
| `**updateWhenIdle**`    | `Boolean`      | `(depends)`  | Load new tiles only when panning ends.`true`by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.`false`otherwise in order to display new tiles*during*panning, since it is easy to pan outside the`keepBuffer`option in desktop browsers. |
| `**updateWhenZooming**` | `Boolean`      | `true`       | By default, a smooth zoom animation (during atouch zoomor a`flyTo()`) will update grid layers every integer zoom level. Setting this option to`false`will update the grid layer only when the smooth animation ends.                                                                |
| `**updateInterval**`    | `Number`       | `200`        | Tiles will not update more than once every`updateInterval`milliseconds when panning.                                                                                                                                                                                                |
| `**zIndex**`            | `Number`       | `1`          | The explicit zIndex of the tile layer.                                                                                                                                                                                                                                              |
| `**bounds**`            | `LatLngBounds` | `undefined`  | If set, tiles will only be loaded inside the set`LatLngBounds`.                                                                                                                                                                                                                     |
| `**minZoom**`           | `Number`       | `0`          | The minimum zoom level down to which this layer will be displayed (inclusive).                                                                                                                                                                                                      |
| `**maxZoom**`           | `Number`       | `undefined`  | The maximum zoom level up to which this layer will be displayed (inclusive).                                                                                                                                                                                                        |
| `**maxNativeZoom**`     | `Number`       | `undefined`  | Maximum zoom number the tile source has available. If it is specified, the tiles on all zoom levels higher than`maxNativeZoom`will be loaded from`maxNativeZoom`level and auto-scaled.                                                                                              |
| `**minNativeZoom**`     | `Number`       | `undefined`  | Minimum zoom number the tile source has available. If it is specified, the tiles on all zoom levels lower than`minNativeZoom`will be loaded from`minNativeZoom`level and auto-scaled.                                                                                               |
| `**noWrap**`            | `Boolean`      | `false`      | Whether the layer is wrapped around the antimeridian. If`true`, the GridLayer will only be displayed once at low zoom levels. Has no effect when themap CRSdoesn't wrap around. Can be used in combination with`bounds`to prevent requesting tiles outside the CRS limits.          |
| `**pane**`              | `String`       | `'tilePane'` | `Map pane`where the grid layer will be added.                                                                                                                                                                                                                                       |
| `**className**`         | `String`       | `''`         | A custom class name to assign to the tile layer. Empty by default.                                                                                                                                                                                                                  |
| `**keepBuffer**`        | `Number`       | `2`          | When panning the map, keep this many rows and columns of tiles before unloading them.                                                                                                                                                                                               |

▶Options inherited fromLayer

| Option            | Type     | Default | Description                                                                                                                                                                                   |
| ----------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**attribution**` | `String` | `null`  | String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers. |

| Event               | Data             | Description                                                          |
| ------------------- | ---------------- | -------------------------------------------------------------------- |
| `**loading**`       | `Event`          | Fired when the grid layer starts loading tiles.                      |
| `**tileunload**`    | `TileEvent`      | Fired when a tile is removed (e.g. when a tile goes off the screen). |
| `**tileloadstart**` | `TileEvent`      | Fired when a tile is requested and starts loading.                   |
| `**tileerror**`     | `TileErrorEvent` | Fired when there is an error loading a tile.                         |
| `**tileload**`      | `TileEvent`      | Fired when a tile loads.                                             |
| `**load**`          | `Event`          | Fired when the grid layer loaded all visible tiles.                  |

▶Events inherited fromLayer

| Event        | Data    | Description                                 |
| ------------ | ------- | ------------------------------------------- |
| `**add**`    | `Event` | Fired after the layer is added to a map     |
| `**remove**` | `Event` | Fired after the layer is removed from a map |

▶Popup events inherited fromLayer

| Event            | Data         | Description                                      |
| ---------------- | ------------ | ------------------------------------------------ |
| `**popupopen**`  | `PopupEvent` | Fired when a popup bound to this layer is opened |
| `**popupclose**` | `PopupEvent` | Fired when a popup bound to this layer is closed |

▶Tooltip events inherited fromLayer

| Event              | Data           | Description                                         |
| ------------------ | -------------- | --------------------------------------------------- |
| `**tooltipopen**`  | `TooltipEvent` | Fired when a tooltip bound to this layer is opened. |
| `**tooltipclose**` | `TooltipEvent` | Fired when a tooltip bound to this layer is closed. |

| Method                              | Returns       | Description                                                                 |
| ----------------------------------- | ------------- | --------------------------------------------------------------------------- |
| `**bringToFront**()`                | `this`        | Brings the tile layer to the top of all tile layers.                        |
| `**bringToBack**()`                 | `this`        | Brings the tile layer to the bottom of all tile layers.                     |
| `**getContainer**()`                | `HTMLElement` | Returns the HTML element that contains the tiles for this layer.            |
| `**setOpacity**(<Number>*opacity*)` | `this`        | Changes theopacityof the grid layer.                                        |
| `**setZIndex**(<Number>*zIndex*)`   | `this`        | Changes thezIndexof the grid layer.                                         |
| `**isLoading**()`                   | `Boolean`     | Returns`true`if any tile in the grid layer has not finished loading.        |
| `**redraw**()`                      | `this`        | Causes the layer to clear all the tiles and request them again.             |
| `**getTileSize**()`                 | `Point`       | Normalizes thetileSize optioninto a point. Used by the`createTile()`method. |

Extension methodsLayers extending`GridLayer`shall reimplement the following method.

| Method                                               | Returns       | Description                                                                                                                                                                                                                                  |
| ---------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**createTile**(<Object>*coords*,<Function>*done?*)` | `HTMLElement` | Called only internally, must be overridden by classes extending`GridLayer`. Returns the`HTMLElement`corresponding to the given`coords`. If the`done`callback is specified, it must be called when the tile has finished loading and drawing. |

▶Methods inherited fromLayer

| Method                                | Returns       | Description                                                                                                          |
| ------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `**addTo**(<Map|LayerGroup>*map*)`    | `this`        | Adds the layer to the given map or layer group.                                                                      |
| `**remove**()`                        | `this`        | Removes the layer from the map it is currently active on.                                                            |
| `**removeFrom**(<Map>*map*)`          | `this`        | Removes the layer from the given map                                                                                 |
| `**removeFrom**(<LayerGroup>*group*)` | `this`        | Removes the layer from the given`LayerGroup`                                                                         |
| `**getPane**(<String>*name?*)`        | `HTMLElement` | Returns the`HTMLElement`representing the named pane on the map. If`name`is omitted, returns the pane for this layer. |
| `**getAttribution**()`                | `String`      | Used by the`attribution control`, returns theattribution option.                                                     |

▶Popup methods inherited fromLayer

| Method                                                                                  | Returns   | Description                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**bindPopup**(<String|HTMLElement|Function|Popup>*content*,<Popup options>*options?*)` | `this`    | Binds a popup to the layer with the passed`content`and sets up the necessary event listeners. If a`Function`is passed it will receive the layer as the first argument and should return a`String`or`HTMLElement`. |
| `**unbindPopup**()`                                                                     | `this`    | Removes the popup previously bound with`bindPopup`.                                                                                                                                                               |
| `**openPopup**(<LatLng>*latlng?*)`                                                      | `this`    | Opens the bound popup at the specified`latlng`or at the default popup anchor if no`latlng`is passed.                                                                                                              |
| `**closePopup**()`                                                                      | `this`    | Closes the popup bound to this layer if it is open.                                                                                                                                                               |
| `**togglePopup**()`                                                                     | `this`    | Opens or closes the popup bound to this layer depending on its current state.                                                                                                                                     |
| `**isPopupOpen**()`                                                                     | `boolean` | Returns`true`if the popup bound to this layer is currently open.                                                                                                                                                  |
| `**setPopupContent**(<String|HTMLElement|Popup>*content*)`                              | `this`    | Sets the content of the popup bound to this layer.                                                                                                                                                                |
| `**getPopup**()`                                                                        | `Popup`   | Returns the popup bound to this layer.                                                                                                                                                                            |

▶
