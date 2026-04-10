# Control.Attribution

`false`. Extends`Control`.

| Factory                                               | Description            |
| ----------------------------------------------------- | ---------------------- |
| `**L.control.zoom**(<Control.Zoom options>*options*)` | Creates a zoom control |

| Option             | Type     | Default                                      | Description                             |
| ------------------ | -------- | -------------------------------------------- | --------------------------------------- |
| `**zoomInText**`   | `String` | `'<span aria-hidden="true">+</span>'`        | The text set on the 'zoom in' button.   |
| `**zoomInTitle**`  | `String` | `'Zoom in'`                                  | The title set on the 'zoom in' button.  |
| `**zoomOutText**`  | `String` | `'<span aria-hidden="true">&#x2212;</span>'` | The text set on the 'zoom out' button.  |
| `**zoomOutTitle**` | `String` | `'Zoom out'`                                 | The title set on the 'zoom out' button. |

▶Options inherited fromControl

| Option         | Type     | Default      | Description                                                                                                                       |
| -------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `**position**` | `String` | `'topright'` | The position of the control (one of the map corners). Possible values are`'topleft'`,`'topright'`,`'bottomleft'`or`'bottomright'` |

▶Methods inherited fromControl

| Method                                | Returns       | Description                                                 |
| ------------------------------------- | ------------- | ----------------------------------------------------------- |
| `**getPosition**()`                   | `string`      | Returns the position of the control.                        |
| `**setPosition**(<string>*position*)` | `this`        | Sets the position of the control.                           |
| `**getContainer**()`                  | `HTMLElement` | Returns the HTMLElement that contains the control.          |
| `**addTo**(<Map>*map*)`               | `this`        | Adds the control to the given map.                          |
| `**remove**()`                        | `this`        | Removes the control from the map it is currently active on. |

The attribution control allows you to display attribution data in a small text box on a map. It is put on the map by default unless you set its`attributionControl`optionto`false`, and it fetches attribution texts from layers with the`getAttribution`methodautomatically. Extends Control.

### Creation

### Options

### Methods
