# TileLayer.WMS

Popup methods inherited fromLayer

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

▶Tooltip methods inherited fromLayer

| Method                                                                                        | Returns   | Description                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**bindTooltip**(<String|HTMLElement|Function|Tooltip>*content*,<Tooltip options>*options?*)` | `this`    | Binds a tooltip to the layer with the passed`content`and sets up the necessary event listeners. If a`Function`is passed it will receive the layer as the first argument and should return a`String`or`HTMLElement`. |
| `**unbindTooltip**()`                                                                         | `this`    | Removes the tooltip previously bound with`bindTooltip`.                                                                                                                                                             |
| `**openTooltip**(<LatLng>*latlng?*)`                                                          | `this`    | Opens the bound tooltip at the specified`latlng`or at the default tooltip anchor if no`latlng`is passed.                                                                                                            |
| `**closeTooltip**()`                                                                          | `this`    | Closes the tooltip bound to this layer if it is open.                                                                                                                                                               |
| `**toggleTooltip**()`                                                                         | `this`    | Opens or closes the tooltip bound to this layer depending on its current state.                                                                                                                                     |
| `**isTooltipOpen**()`                                                                         | `boolean` | Returns`true`if the tooltip bound to this layer is currently open.                                                                                                                                                  |
| `**setTooltipContent**(<String|HTMLElement|Tooltip>*content*)`                                | `this`    | Sets the content of the tooltip bound to this layer.                                                                                                                                                                |
| `**getTooltip**()`                                                                            | `Tooltip` | Returns the tooltip bound to this layer.                                                                                                                                                                            |

▶Methods inherited fromEvented

| Method                                                           | Returns   | Description                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**on**(<String>*type*,<Function>*fn*,<Object>*context?*)`       | `this`    | Adds a listener function (`fn`) to a particular event type of the object. You can optionally specify the context of the listener (object the this keyword will point to). You can also pass several space-separated types (e.g.`'click dblclick'`).                           |
| `**on**(<Object>*eventMap*)`                                     | `this`    | Adds a set of type/listener pairs, e.g.`{click: onClick, mousemove: onMouseMove}`                                                                                                                                                                                             |
| `**off**(<String>*type*,<Function>*fn?*,<Object>*context?*)`     | `this`    | Removes a previously added listener function. If no function is specified, it will remove all the listeners of that particular event from the object. Note that if you passed a custom context to`on`, you must pass the same context to`off`in order to remove the listener. |
| `**off**(<Object>*eventMap*)`                                    | `this`    | Removes a set of type/listener pairs.                                                                                                                                                                                                                                         |
| `**off**()`                                                      | `this`    | Removes all listeners to all events on the object. This includes implicitly attached events.                                                                                                                                                                                  |
| `**fire**(<String>*type*,<Object>*data?*,<Boolean>*propagate?*)` | `this`    | Fires an event of the specified type. You can optionally provide a data object — the first argument of the listener function will contain its properties. The event can optionally be propagated to event parents.                                                            |
| `**listens**(<String>*type*,<Boolean>*propagate?*)`              | `Boolean` | Returns`true`if a particular event type has any listeners attached to it. The verification can optionally be propagated, it will return`true`if parents have the listener attached to it.                                                                                     |
| `**once**(*…*)`                                                  | `this`    | Behaves as`on(…)`, except the listener will only get fired once and then removed.                                                                                                                                                                                             |
| `**addEventParent**(<Evented>*obj*)`                             | `this`    | Adds an event parent - an`Evented`that will receive propagated events                                                                                                                                                                                                         |
| `**removeEventParent**(<Evented>*obj*)`                          | `this`    | Removes an event parent, so it will stop receiving propagated events                                                                                                                                                                                                          |
| `**addEventListener**(*…*)`                                      | `this`    | Alias to`on(…)`                                                                                                                                                                                                                                                               |
| `**removeEventListener**(*…*)`                                   | `this`    | Alias to`off(…)`                                                                                                                                                                                                                                                              |
| `**clearAllEventListeners**(*…*)`                                | `this`    | Alias to`off()`                                                                                                                                                                                                                                                               |
| `**addOneTimeEventListener**(*…*)`                               | `this`    | Alias to`once(…)`                                                                                                                                                                                                                                                             |
| `**fireEvent**(*…*)`                                             | `this`    | Alias to`fire(…)`                                                                                                                                                                                                                                                             |
| `**hasEventListeners**(*…*)`                                     | `Boolean` | Alias to`listens(…)`                                                                                                                                                                                                                                                          |

Used to display

### Usage example

### Creation

### Options

### Events

WMSservices as tile layers on the map. Extends`TileLayer`.

```
var nexrad = L.tileLayer.wms("http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi", {
	layers: 'nexrad-n0r-900913',
	format: 'image/png',
	transparent: true,
	attribution: "Weather data © 2012 IEM Nexrad"
});

```

| Factory                                                                   | Description                                                                                                   |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `**L.tileLayer.wms**(<String>*baseUrl*,<TileLayer.WMS options>*options*)` | Instantiates a WMS tile layer object given a base URL of the WMS service and a WMS parameters/options object. |

If any custom options not documented here are used, they will be sent to the WMS server as extra parameters in each request URL. This can be useful fornon-standard vendor WMS parameters.

| Option            | Type      | Default        | Description                                                                                                                       |
| ----------------- | --------- | -------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `**layers**`      | `String`  | `''`           | **(required)**Comma-separated list of WMS layers to show.                                                                         |
| `**styles**`      | `String`  | `''`           | Comma-separated list of WMS styles.                                                                                               |
| `**format**`      | `String`  | `'image/jpeg'` | WMS image format (use`'image/png'`for layers with transparency).                                                                  |
| `**transparent**` | `Boolean` | `false`        | If`true`, the WMS service will return images with transparency.                                                                   |
| `**version**`     | `String`  | `'1.1.1'`      | Version of the WMS service to use                                                                                                 |
| `**crs**`         | `CRS`     | `null`         | Coordinate Reference System to use for the WMS requests, defaults to map CRS. Don't change this if you're not sure what it means. |
| `**uppercase**`   | `Boolean` | `false`        | If`true`, WMS request parameter keys will be uppercase.                                                                           |

▶Options inherited fromTileLayer

| Option               | Type              | Default | Description                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------- | ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**minZoom**`        | `Number`          | `0`     | The minimum zoom level down to which this layer will be displayed (inclusive).                                                                                                                                                                                                                                                                                                                    |
| `**maxZoom**`        | `Number`          | `18`    | The maximum zoom level up to which this layer will be displayed (inclusive).                                                                                                                                                                                                                                                                                                                      |
| `**subdomains**`     | `String|String[]` | `'abc'` | Subdomains of the tile service. Can be passed in the form of one string (where each letter is a subdomain name) or an array of strings.                                                                                                                                                                                                                                                           |
| `**errorTileUrl**`   | `String`          | `''`    | URL to the tile image to show in place of the tile that failed to load.                                                                                                                                                                                                                                                                                                                           |
| `**zoomOffset**`     | `Number`          | `0`     | The zoom number used in tile URLs will be offset with this value.                                                                                                                                                                                                                                                                                                                                 |
| `**tms**`            | `Boolean`         | `false` | If`true`, inverses Y axis numbering for tiles (turn this on forTMSservices).                                                                                                                                                                                                                                                                                                                      |
| `**zoomReverse**`    | `Boolean`         | `false` | If set to true, the zoom number used in tile URLs will be reversed (`maxZoom - zoom`instead of`zoom`)                                                                                                                                                                                                                                                                                             |
| `**detectRetina**`   | `Boolean`         | `false` | If`true`and user is on a retina display, it will request four tiles of half the specified size and a bigger zoom level in place of one to utilize the high resolution.                                                                                                                                                                                                                            |
| `**crossOrigin**`    | `Boolean|String`  | `false` | Whether the crossOrigin attribute will be added to the tiles. If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data. Refer toCORS Settingsfor valid String values.                                                                                                                            |
| `**referrerPolicy**` | `Boolean|String`  | `false` | Whether the referrerPolicy attribute will be added to the tiles. If a String is provided, all tiles will have their referrerPolicy attribute set to the String provided. This may be needed if your map's rendering context has a strict default but your tile provider expects a valid referrer (e.g. to validate an API token). Refer toHTMLImageElement.referrerPolicyfor valid String values. |

▶Options inherited fromGridLayer

| Option                  | Type           | Default      | Description                                                                                                                                                                                                                                                                         |
| ----------------------- | -------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**tileSize**`          | `Number|Point` | `256`        | Width and height of tiles in the grid. Use a number if width and height are equal, or`L.point(width, height)`otherwise.                                                                                                                                                             |
| `**opacity**`           | `Number`       | `1.0`        | Opacity of the tiles. Can be used in the`createTile()`function.                                                                                                                                                                                                                     |
| `**updateWhenIdle**`    | `Boolean`      | `(depends)`  | Load new tiles only when panning ends.`true`by default on mobile browsers, in order to avoid too many requests and keep smooth navigation.`false`otherwise in order to display new tiles*during*panning, since it is easy to pan outside the`keepBuffer`option in desktop browsers. |
| `**updateWhenZooming**` | `Boolean`      | `true`       | By default, a smooth zoom animation (during atouch zoomor a`flyTo()`) will update grid layers every integer zoom level. Setting this option to`false`will update the grid layer only when the smooth animation ends.                                                                |
| `**updateInterval**`    | `Number`       | `200`        | Tiles will not update more than once every`updateInterval`milliseconds when panning.                                                                                                                                                                                                |
| `**zIndex**`            | `Number`       | `1`          | The explicit zIndex of the tile layer.                                                                                                                                                                                                                                              |
| `**bounds**`            | `LatLngBounds` | `undefined`  | If set, tiles will only be loaded inside the set`LatLngBounds`.                                                                                                                                                                                                                     |
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

▶Extension methods inherited fromTileLayer

| Event           | Data        | Description                                          |
| --------------- | ----------- | ---------------------------------------------------- |
| `**tileabort**` | `TileEvent` | Fired when a tile was loading but is now not wanted. |

▶Events inherited fromGridLayer

| Event               | Data             | Description                                                          |
| ------------------- | ---------------- | -------------------------------------------------------------------- |
| `**loading**`       | `Event`          | Fired when the grid layer starts loading tiles.                      |
| `**tileunload**`    | `TileEvent`      | Fired when a tile is removed (e.g. when a tile goes off the screen). |
| `**tileloadstart**` | `TileEvent`      | Fired when a tile is requested and starts loading.                   |
| `**tileerror**`     | `TileErrorEvent` | Fired when there is an error loading a tile.                         |
| `**tileload**`      | `TileEvent`      | Fired when a tile loads.                                             |
| `**load**`          | `Event`          | Fired when the grid layer loaded all visible tiles.                  |

▶

### Methods

Events inherited fromLayer

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

| Method                                                 | Returns | Description                                                                                                             |
| ------------------------------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------- |
| `**setParams**(<Object>*params*,<Boolean>*noRedraw?*)` | `this`  | Merges an object with the new parameters and re-requests tiles on the current screen (unless`noRedraw`was set to true). |

▶Methods inherited fromTileLayer

| Method                                               | Returns       | Description                                                                                                                                                                                         |
| ---------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**setUrl**(<String>*url*,<Boolean>*noRedraw?*)`     | `this`        | Updates the layer's URL template and redraws it (unless`noRedraw`is set to`true`). If the URL does not change, the layer will not be redrawn unless the noRedraw parameter is set to false.         |
| `**createTile**(<Object>*coords*,<Function>*done?*)` | `HTMLElement` | Called only internally, overrides GridLayer's`createTile()`to return an`<img>`HTML element with the appropriate image URL given`coords`. The`done`callback is called when the tile has been loaded. |

▶Methods inherited fromGridLayer

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

▶Tooltip methods inherited fromLayer

| Method                                                                                        | Returns   | Description                                                                                                                                                                                                         |
| --------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**bindTooltip**(<String|HTMLElement|Function|Tooltip>*content*,<Tooltip options>*options?*)` | `this`    | Binds a tooltip to the layer with the passed`content`and sets up the necessary event listeners. If a`Function`is passed it will receive the layer as the first argument and should return a`String`or`HTMLElement`. |
| `**unbindTooltip**()`                                                                         | `this`    | Removes the tooltip previously bound with`bindTooltip`.                                                                                                                                                             |
| `**openTooltip**(<LatLng>*latlng?*)`                                                          | `this`    | Opens the bound tooltip at the specified`latlng`or at the default tooltip anchor if no`latlng`is passed.                                                                                                            |
| `**closeTooltip**()`                                                                          | `this`    | Closes the tooltip bound to this layer if it is open.                                                                                                                                                               |
| `**toggleTooltip**()`                                                                         | `this`    | Opens or closes the tooltip bound to this layer depending on its current state.                                                                                                                                     |
| `**isTooltipOpen**()`                                                                         | `boolean` | Returns`true`if the tooltip bound to this layer is currently open.                                                                                                                                                  |
| `**setTooltipContent**(<String|HTMLElement|Tooltip>*content*)`                                | `this`    | Sets the content of the tooltip bound to this layer.                                                                                                                                                                |
| `**getTooltip**()`                                                                            | `Tooltip` | Returns the tooltip bound to this layer.                                                                                                                                                                            |

▶
