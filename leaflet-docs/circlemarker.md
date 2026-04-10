# CircleMarker

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

A circle of a fixed size with radius specified in pixels. Extends

### Creation

### Options

### Events

`Path`.

| Factory                                                                 | Description                                                                                     |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `**L.circleMarker**(<LatLng>*latlng*,<CircleMarker options>*options?*)` | Instantiates a circle marker object given a geographical point, and an optional options object. |

| Option       | Type     | Default | Description                            |
| ------------ | -------- | ------- | -------------------------------------- |
| `**radius**` | `Number` | `10`    | Radius of the circle marker, in pixels |

▶Options inherited fromPath

| Option                    | Type       | Default     | Description                                                                                                                            |
| ------------------------- | ---------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `**stroke**`              | `Boolean`  | `true`      | Whether to draw stroke along the path. Set it to`false`to disable borders on polygons or circles.                                      |
| `**color**`               | `String`   | `'#3388ff'` | Stroke color                                                                                                                           |
| `**weight**`              | `Number`   | `3`         | Stroke width in pixels                                                                                                                 |
| `**opacity**`             | `Number`   | `1.0`       | Stroke opacity                                                                                                                         |
| `**lineCap**`             | `String`   | `'round'`   | A string that definesshape to be used at the endof the stroke.                                                                         |
| `**lineJoin**`            | `String`   | `'round'`   | A string that definesshape to be used at the cornersof the stroke.                                                                     |
| `**dashArray**`           | `String`   | `null`      | A string that defines the strokedash pattern. Doesn't work on`Canvas`-powered layers insome old browsers.                              |
| `**dashOffset**`          | `String`   | `null`      | A string that defines thedistance into the dash pattern to start the dash. Doesn't work on`Canvas`-powered layers insome old browsers. |
| `**fill**`                | `Boolean`  | `depends`   | Whether to fill the path with color. Set it to`false`to disable filling on polygons or circles.                                        |
| `**fillColor**`           | `String`   | `*`         | Fill color. Defaults to the value of the`color`option                                                                                  |
| `**fillOpacity**`         | `Number`   | `0.2`       | Fill opacity.                                                                                                                          |
| `**fillRule**`            | `String`   | `'evenodd'` | A string that defineshow the inside of a shapeis determined.                                                                           |
| `**bubblingMouseEvents**` | `Boolean`  | `true`      | When`true`, a mouse event on this path will trigger the same event on the map (unless`L.DomEvent.stopPropagation`is used).             |
| `**renderer**`            | `Renderer` | ``          | Use this specific instance of`Renderer`for this path. Takes precedence over the map'sdefault renderer.                                 |
| `**className**`           | `String`   | `null`      | Custom class name set on an element. Only for SVG renderer.                                                                            |

▶Options inherited fromInteractive layer

| Option            | Type      | Default | Description                                                                                   |
| ----------------- | --------- | ------- | --------------------------------------------------------------------------------------------- |
| `**interactive**` | `Boolean` | `true`  | If`false`, the layer will not emit mouse events and will act as a part of the underlying map. |

▶Options inherited fromLayer

| Option            | Type     | Default         | Description                                                                                                                                                                                   |
| ----------------- | -------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**pane**`        | `String` | `'overlayPane'` | By default the layer will be added to the map'soverlay pane. Overriding this option will cause the layer to be placed on another pane by default.                                             |
| `**attribution**` | `String` | `null`          | String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers. |

| Event      | Data    | Description                                                                                                                    |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `**move**` | `Event` | Fired when the marker is moved via`setLatLng`. Old and new coordinates are included in event arguments as`oldLatLng`,`latlng`. |

▶Mouse events inherited fromInteractive layer

| Event             | Data         | Description                                                                                                                                                                                                                            |
| ----------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**click**`       | `MouseEvent` | Fired when the user clicks (or taps) the layer.                                                                                                                                                                                        |
| `**dblclick**`    | `MouseEvent` | Fired when the user double-clicks (or double-taps) the layer.                                                                                                                                                                          |
| `**mousedown**`   | `MouseEvent` | Fired when the user pushes the mouse button on the layer.                                                                                                                                                                              |
| `**mouseup**`     | `MouseEvent` | Fired when the user releases the mouse button pushed on the layer.                                                                                                                                                                     |
| `**mouseover**`   | `MouseEvent` | Fired when the mouse enters the layer.                                                                                                                                                                                                 |
| `**mouseout**`    | `MouseEvent` | Fired when the mouse leaves the layer.                                                                                                                                                                                                 |
| `**contextmenu**` | `MouseEvent` | Fired when the user right-clicks on the layer, prevents default browser context menu from showing if there are listeners on this event. Also fired on mobile when the user holds a single touch for a second (also called long press). |

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

▶

### Methods

Tooltip events inherited fromLayer

| Event              | Data           | Description                                         |
| ------------------ | -------------- | --------------------------------------------------- |
| `**tooltipopen**`  | `TooltipEvent` | Fired when a tooltip bound to this layer is opened. |
| `**tooltipclose**` | `TooltipEvent` | Fired when a tooltip bound to this layer is closed. |

| Method                                      | Returns  | Description                                                                                                                                                       |
| ------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**toGeoJSON**(<Number|false>*precision?*)` | `Object` | Coordinates values are rounded with`formatNum`function with given`precision`. Returns a`GeoJSON`representation of the circle marker (as a GeoJSON`Point`Feature). |
| `**setLatLng**(<LatLng>*latLng*)`           | `this`   | Sets the position of a circle marker to a new location.                                                                                                           |
| `**getLatLng**()`                           | `LatLng` | Returns the current geographical position of the circle marker                                                                                                    |
| `**setRadius**(<Number>*radius*)`           | `this`   | Sets the radius of a circle marker. Units are in pixels.                                                                                                          |
| `**getRadius**()`                           | `Number` | Returns the current radius of the circle                                                                                                                          |

▶Methods inherited fromPath

| Method                                | Returns | Description                                                                               |
| ------------------------------------- | ------- | ----------------------------------------------------------------------------------------- |
| `**redraw**()`                        | `this`  | Redraws the layer. Sometimes useful after you changed the coordinates that the path uses. |
| `**setStyle**(<Path options>*style*)` | `this`  | Changes the appearance of a Path based on the options in the`Path options`object.         |
| `**bringToFront**()`                  | `this`  | Brings the layer to the top of all path layers.                                           |
| `**bringToBack**()`                   | `this`  | Brings the layer to the bottom of all path layers.                                        |

▶Methods inherited fromLayer

| Method                                | Returns       | Description                                                                                                          |
| ------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------- |
| `**addTo**(<Map|LayerGroup>*map*)`    | `this`        | Adds the layer to the given map or layer group.                                                                      |
| `**remove**()`                        | `this`        | Removes the layer from the map it is currently active on.                                                            |
| `**removeFrom**(<Map>*map*)`          | `this`        | Removes the layer from the given map                                                                                 |
| `**removeFrom**(<LayerGroup>*group*)` | `this`        | Removes the layer from the given`LayerGroup`                                                                         |
| `**getPane**(<String>*name?*)`        | `HTMLElement` | Returns the`HTMLElement`representing the named pane on the map. If`name`is omitted, returns the pane for this layer. |
| `**getAttribution**()`                | `String`      | Used by the`attribution control`, returns theattribution option.                                                     |

▶
