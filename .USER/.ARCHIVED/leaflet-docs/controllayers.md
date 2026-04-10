# Control.Layers

### Usage example

| Factory                                                             | Description                     |
| ------------------------------------------------------------------- | ------------------------------- |
| `**L.control.attribution**(<Control.Attribution options>*options*)` | Creates an attribution control. |

| Option       | Type           | Default     | Description                                                         |
| ------------ | -------------- | ----------- | ------------------------------------------------------------------- |
| `**prefix**` | `String|false` | `'Leaflet'` | The HTML text shown before the attributions. Pass`false`to disable. |

▶Options inherited fromControl

| Option         | Type     | Default      | Description                                                                                                                       |
| -------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `**position**` | `String` | `'topright'` | The position of the control (one of the map corners). Possible values are`'topleft'`,`'topright'`,`'bottomleft'`or`'bottomright'` |

| Method                                  | Returns | Description                                                           |
| --------------------------------------- | ------- | --------------------------------------------------------------------- |
| `**setPrefix**(<String|false>*prefix*)` | `this`  | The HTML text shown before the attributions. Pass`false`to disable.   |
| `**addAttribution**(<String>*text*)`    | `this`  | Adds an attribution text (e.g.`'&copy; OpenStreetMap contributors'`). |
| `**removeAttribution**(<String>*text*)` | `this`  | Removes an attribution text.                                          |

▶Methods inherited fromControl

| Method                                | Returns       | Description                                                 |
| ------------------------------------- | ------------- | ----------------------------------------------------------- |
| `**getPosition**()`                   | `string`      | Returns the position of the control.                        |
| `**setPosition**(<string>*position*)` | `this`        | Sets the position of the control.                           |
| `**getContainer**()`                  | `HTMLElement` | Returns the HTMLElement that contains the control.          |
| `**addTo**(<Map>*map*)`               | `this`        | Adds the control to the given map.                          |
| `**remove**()`                        | `this`        | Removes the control from the map it is currently active on. |

The layers control gives users the ability to switch between different base layers and switch overlays on/off (check out thedetailed example). Extends`Control`.

```
var baseLayers = {
	"Mapbox": mapbox,
	"OpenStreetMap": osm
};

var overlays = {
	"Marker": marker,
	"Roads": roadsLayer
};

L.control.layers(baseLayers, overlays).addTo(map);

```

The`baseLayers`and

### Creation

### Options

### Methods
