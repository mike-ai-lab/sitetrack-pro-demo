# Canvas

### Usage example

### Creation

### Options

### Events

| Function                                               | Returns      | Description                                                                                                                                  |
| ------------------------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `**create**(<String>*name*)`                           | `SVGElement` | Returns a instance ofSVGElement, corresponding to the class name passed. For example, using 'line' will return an instance ofSVGLineElement. |
| `**pointsToPath**(<Point[]>*rings*,<Boolean>*closed*)` | `String`     | Generates a SVG path string for multiple rings, with each ring turning into "M..L..L.." instructions                                         |

Allows vector layers to be displayed with`<canvas>`. Inherits`Renderer`.

Due totechnical limitations, Canvas is not available in all web browsers, notably IE8, and overlapping geometries might not display properly in some edge cases.

Use Canvas by default for all paths in the map:

```
var map = L.map('map', {
	renderer: L.canvas()
});

```

Use a Canvas renderer with extra padding for specific vector geometries:

```
var map = L.map('map');
var myRenderer = L.canvas({ padding: 0.5 });
var line = L.polyline( coordinates, { renderer: myRenderer } );
var circle = L.circle( center, { renderer: myRenderer } );

```

| Factory                                      | Description                                       |
| -------------------------------------------- | ------------------------------------------------- |
| `**L.canvas**(<Renderer options>*options?*)` | Creates a Canvas renderer with the given options. |

| Option          | Type     | Default | Description                                                             |
| --------------- | -------- | ------- | ----------------------------------------------------------------------- |
| `**tolerance**` | `Number` | `0`     | How much to extend the click tolerance around a path/object on the map. |

▶Options inherited fromRenderer

| Option        | Type     | Default | Description                                                                                                                     |
| ------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `**padding**` | `Number` | `0.1`   | How much to extend the clip area around the map view (relative to its size) e.g. 0.1 would be 10% of map view in each direction |

▶Options inherited fromLayer

| Option            | Type     | Default         | Description                                                                                                                                                                                   |
| ----------------- | -------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**pane**`        | `String` | `'overlayPane'` | By default the layer will be added to the map'soverlay pane. Overriding this option will cause the layer to be placed on another pane by default.                                             |
| `**attribution**` | `String` | `null`          | String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers. |

▶Events inherited fromRenderer

| Event        | Data    | Description                                                                                     |
| ------------ | ------- | ----------------------------------------------------------------------------------------------- |
| `**update**` | `Event` | Fired when the renderer updates its bounds, center and zoom, for example when its map has moved |

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
