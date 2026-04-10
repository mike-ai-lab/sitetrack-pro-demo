# Control.Scale

`overlays`parameters are object literals with layer names as keys and`Layer`objects as values:

```
{
    "<someName1>": layer1,
    "<someName2>": layer2
}

```

The layer names can contain HTML, which allows you to add additional styling to the items:

```
{"<img src='my-layer-icon' /> <span class='my-layer-item'>My Layer</span>": myLayer}

```

| Factory                                                                                              | Description                                                                                                                                                                                                                                                                               |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**L.control.layers**(<Object>*baselayers?*,<Object>*overlays?*,<Control.Layers options>*options?*)` | Creates a layers control with the given layers. Base layers will be switched with radio buttons, while overlays will be switched with checkboxes. Note that all base layers should be passed in the base layers object, but only one should be added to the map during map instantiation. |

| Option               | Type       | Default | Description                                                                                                                                                                                                                                                         |
| -------------------- | ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**collapsed**`      | `Boolean`  | `true`  | If`true`, the control will be collapsed into an icon and expanded on mouse hover, touch, or keyboard activation.                                                                                                                                                    |
| `**autoZIndex**`     | `Boolean`  | `true`  | If`true`, the control will assign zIndexes in increasing order to all of its layers so that the order is preserved when switching them on/off.                                                                                                                      |
| `**hideSingleBase**` | `Boolean`  | `false` | If`true`, the base layers in the control will be hidden when there is only one.                                                                                                                                                                                     |
| `**sortLayers**`     | `Boolean`  | `false` | Whether to sort the layers. When`false`, layers will keep the order in which they were added to the control.                                                                                                                                                        |
| `**sortFunction**`   | `Function` | `*`     | Acompare functionthat will be used for sorting the layers, when`sortLayers`is`true`. The function receives both the`L.Layer`instances and their names, as in`sortFunction(layerA, layerB, nameA, nameB)`. By default, it sorts layers alphabetically by their name. |

▶Options inherited fromControl

| Option         | Type     | Default      | Description                                                                                                                       |
| -------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `**position**` | `String` | `'topright'` | The position of the control (one of the map corners). Possible values are`'topleft'`,`'topright'`,`'bottomleft'`or`'bottomright'` |

| Method                                            | Returns | Description                                                                |
| ------------------------------------------------- | ------- | -------------------------------------------------------------------------- |
| `**addBaseLayer**(<Layer>*layer*,<String>*name*)` | `this`  | Adds a base layer (radio button entry) with the given name to the control. |
| `**addOverlay**(<Layer>*layer*,<String>*name*)`   | `this`  | Adds an overlay (checkbox entry) with the given name to the control.       |
| `**removeLayer**(<Layer>*layer*)`                 | `this`  | Remove the given layer from the control.                                   |
| `**expand**()`                                    | `this`  | Expand the control container if collapsed.                                 |
| `**collapse**()`                                  | `this`  | Collapse the control container if expanded.                                |

▶Methods inherited fromControl

| Method                                | Returns       | Description                                                 |
| ------------------------------------- | ------------- | ----------------------------------------------------------- |
| `**getPosition**()`                   | `string`      | Returns the position of the control.                        |
| `**setPosition**(<string>*position*)` | `this`        | Sets the position of the control.                           |
| `**getContainer**()`                  | `HTMLElement` | Returns the HTMLElement that contains the control.          |
| `**addTo**(<Map>*map*)`               | `this`        | Adds the control to the given map.                          |
| `**remove**()`                        | `this`        | Removes the control from the map it is currently active on. |

A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems. Extends

### Usage example

### Creation

### Options

### Methods
