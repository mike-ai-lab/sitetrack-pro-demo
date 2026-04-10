# Marker

### Usage example

### Creation

### Options

Pan options

| Option              | Type      | Default | Description                                                                                                                                                                     |
| ------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**duration**`      | `Number`  | `0.25`  | Duration of animated panning, in seconds.                                                                                                                                       |
| `**easeLinearity**` | `Number`  | `0.25`  | The curvature factor of panning animation easing (third parameter of theCubic Bezier curve). 1.0 means linear animation, and the smaller this number, the more bowed the curve. |
| `**noMoveStart**`   | `Boolean` | `false` | If`true`, panning won't fire`movestart`event on start (used internally for panning inertia).                                                                                    |

| Option                   | Type    | Default  | Description                                                                                                                                                                                                                                                                |
| ------------------------ | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**paddingTopLeft**`     | `Point` | `[0, 0]` | Sets the amount of padding in the top left corner of a map container that shouldn't be accounted for when setting the view to fit bounds. Useful if you have some control overlays on the map like a sidebar and you don't want them to obscure objects you're zooming to. |
| `**paddingBottomRight**` | `Point` | `[0, 0]` | The same for the bottom right corner of the map.                                                                                                                                                                                                                           |
| `**padding**`            | `Point` | `[0, 0]` | Equivalent of setting both top left and bottom right padding to the same value.                                                                                                                                                                                            |

| Option        | Type     | Default | Description                       |
| ------------- | -------- | ------- | --------------------------------- |
| `**maxZoom**` | `Number` | `null`  | The maximum possible zoom to use. |

▶Options inherited fromZoom options

| Option        | Type      | Default | Description                                                                                                                                                                                                                                                 |
| ------------- | --------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**animate**` | `Boolean` | ``      | If not specified, zoom animation will happen if the zoom origin is inside the current view. If`true`, the map will attempt animating zoom disregarding where zoom origin is. Setting`false`will make it always reset the view completely without animation. |

▶Options inherited fromPan options

| Option              | Type      | Default | Description                                                                                                                                                                     |
| ------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**duration**`      | `Number`  | `0.25`  | Duration of animated panning, in seconds.                                                                                                                                       |
| `**easeLinearity**` | `Number`  | `0.25`  | The curvature factor of panning animation easing (third parameter of theCubic Bezier curve). 1.0 means linear animation, and the smaller this number, the more bowed the curve. |
| `**noMoveStart**`   | `Boolean` | `false` | If`true`, panning won't fire`movestart`event on start (used internally for panning inertia).                                                                                    |

▶Options inherited fromPadding options

| Option                   | Type    | Default  | Description                                                                                                                                                                                                                                                                |
| ------------------------ | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**paddingTopLeft**`     | `Point` | `[0, 0]` | Sets the amount of padding in the top left corner of a map container that shouldn't be accounted for when setting the view to fit bounds. Useful if you have some control overlays on the map like a sidebar and you don't want them to obscure objects you're zooming to. |
| `**paddingBottomRight**` | `Point` | `[0, 0]` | The same for the bottom right corner of the map.                                                                                                                                                                                                                           |
| `**padding**`            | `Point` | `[0, 0]` | Equivalent of setting both top left and bottom right padding to the same value.                                                                                                                                                                                            |

L.Marker is used to display clickable/draggable icons on the map. Extends`Layer`.

```
L.marker([50.5, 30.5]).addTo(map);

```

| Factory                                                     | Description                                                                               |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `**L.marker**(<LatLng>*latlng*,<Marker options>*options?*)` | Instantiates a Marker object given a geographical point and optionally an options object. |

| Option                    | Type      | Default        | Description                                                                                                                                                                                                                           |
| ------------------------- | --------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**icon**`                | `Icon`    | `*`            | Icon instance to use for rendering the marker. SeeIcon documentationfor details on how to customize the marker icon. If not specified, a common instance of`L.Icon.Default`is used.                                                   |
| `**keyboard**`            | `Boolean` | `true`         | Whether the marker can be tabbed to with a keyboard and clicked by pressing enter.                                                                                                                                                    |
| `**title**`               | `String`  | `''`           | Text for the browser tooltip that appear on marker hover (no tooltip by default).Useful for accessibility.                                                                                                                            |
| `**alt**`                 | `String`  | `'Marker'`     | Text for the`alt`attribute of the icon image.Useful for accessibility.                                                                                                                                                                |
| `**zIndexOffset**`        | `Number`  | `0`            | By default, marker images zIndex is set automatically based on its latitude. Use this option if you want to put the marker on top of all others (or below), specifying a high value like`1000`(or high negative value, respectively). |
| `**opacity**`             | `Number`  | `1.0`          | The opacity of the marker.                                                                                                                                                                                                            |
| `**riseOnHover**`         | `Boolean` | `false`        | If`true`, the marker will get on top of others when you hover the mouse over it.                                                                                                                                                      |
| `**riseOffset**`          | `Number`  | `250`          | The z-index offset used for the`riseOnHover`feature.                                                                                                                                                                                  |
| `**pane**`                | `String`  | `'markerPane'` | `Map pane`where the markers icon will be added.                                                                                                                                                                                       |
| `**shadowPane**`          | `String`  | `'shadowPane'` | `Map pane`where the markers shadow will be added.                                                                                                                                                                                     |
| `**bubblingMouseEvents**` | `Boolean` | `false`        | When`true`, a mouse event on this marker will trigger the same event on the map (unless`L.DomEvent.stopPropagation`is used).                                                                                                          |
| `**autoPanOnFocus**`      | `Boolean` | `true`         | When`true`, the map will pan whenever the marker is focused (via e.g. pressing`tab`on the keyboard) to ensure the marker is visible within the map's bounds                                                                           |

Draggable marker options

| Option               | Type      | Default         | Description                                                                                            |
| -------------------- | --------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| `**draggable**`      | `Boolean` | `false`         | Whether the marker is draggable with mouse/touch or not.                                               |
| `**autoPan**`        | `Boolean` | `false`         | Whether to pan the map when dragging this marker near its edge or not.                                 |
| `**autoPanPadding**` | `Point`   | `Point(50, 50)` | Distance (in pixels to the left/right and to the top/bottom) of the map edge to start panning the map. |
| `**autoPanSpeed**`   | `Number`  | `10`            | Number of pixels the map should pan by.                                                                |

▶Options inherited fromInteractive layer

| Option            | Type      | Default | Description                                                                                   |
| ----------------- | --------- | ------- | --------------------------------------------------------------------------------------------- |
| `**interactive**` | `Boolean` | `true`  | If`false`, the layer will not emit mouse events and will act as a part of the underlying map. |

▶Options inherited from

### Events

### Methods

Layer

| Option            | Type     | Default | Description                                                                                                                                                                                   |
| ----------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**attribution**` | `String` | `null`  | String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers. |

| Event      | Data    | Description                                                                                                                                 |
| ---------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `**move**` | `Event` | Fired when the marker is moved via`setLatLng`or bydragging. Old and new coordinates are included in event arguments as`oldLatLng`,`latlng`. |

Dragging events

| Event           | Data           | Description                                                |
| --------------- | -------------- | ---------------------------------------------------------- |
| `**dragstart**` | `Event`        | Fired when the user starts dragging the marker.            |
| `**movestart**` | `Event`        | Fired when the marker starts moving (because of dragging). |
| `**drag**`      | `Event`        | Fired repeatedly while the user drags the marker.          |
| `**dragend**`   | `DragEndEvent` | Fired when the user stops dragging the marker.             |
| `**moveend**`   | `Event`        | Fired when the marker stops moving (because of dragging).  |

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

▶Tooltip events inherited fromLayer

| Event              | Data           | Description                                         |
| ------------------ | -------------- | --------------------------------------------------- |
| `**tooltipopen**`  | `TooltipEvent` | Fired when a tooltip bound to this layer is opened. |
| `**tooltipclose**` | `TooltipEvent` | Fired when a tooltip bound to this layer is closed. |

In addition toshared layer methodslike`addTo()`and`remove()`andpopup methodslike bindPopup() you can also use the following methods:

| Method                                  | Returns  | Description                                              |
| --------------------------------------- | -------- | -------------------------------------------------------- |
| `**getLatLng**()`                       | `LatLng` | Returns the current geographical position of the marker. |
| `**setLatLng**(<LatLng>*latlng*)`       | `this`   | Changes the marker position to the given point.          |
| `**setZIndexOffset**(<Number>*offset*)` | `this`   | Changes thezIndex offsetof the marker.                   |
| `**getIcon**()`                         | `Icon`   | Returns the current icon used by the marker              |
| `**setIcon**(<Icon>*icon*)`             | `this`   | Changes the marker icon.                                 |
| `**setOpacity**(<Number>*opacity*)`     | `this`   | Changes the opacity of the marker.                       |

Other methods

| Method                                      | Returns  | Description                                                                                                                                                |
| ------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**toGeoJSON**(<Number|false>*precision?*)` | `Object` | Coordinates values are rounded with`formatNum`function with given`precision`. Returns a`GeoJSON`representation of the marker (as a GeoJSON`Point`Feature). |

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

### Properties
