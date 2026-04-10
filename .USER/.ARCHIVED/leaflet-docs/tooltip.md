# Tooltip

### Usage example

Methods inherited fromEvented

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

Used to display small texts on top of map layers.

If you want to just bind a tooltip to marker:

```
marker.bindTooltip("my tooltip text").openTooltip();

```

Path overlays like polylines also have a`bindTooltip

### Creation

### Options

`method.

A tooltip can be also standalone:

```
var tooltip = L.tooltip()
	.setLatLng(latlng)
	.setContent('Hello world!<br />This is a nice tooltip.')
	.addTo(map);

```

or

```
var tooltip = L.tooltip(latlng, {content: 'Hello world!<br />This is a nice tooltip.'})
	.addTo(map);

```

Note about tooltip offset. Leaflet takes two options in consideration for computing tooltip offsetting:

- the`offset`Tooltip option: it defaults to [0, 0], and it's specific to one tooltip. Add a positive x offset to move the tooltip to the right, and a positive y offset to move it to the bottom. Negatives will move to the left and top.
- the`tooltipAnchor`Icon option: this will only be considered for Marker. You should adapt this value if you use a custom icon.

| Factory                                                       | Description                                                                                                                                                                                                               |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**L.tooltip**(<Tooltip options>*options?*,<Layer>*source?*)` | Instantiates a`Tooltip`object given an optional`options`object that describes its appearance and location and an optional`source`object that is used to tag the tooltip with a reference to the Layer to which it refers. |
| `**L.tooltip**(<LatLng>*latlng*,<Tooltip options>*options?*)` | Instantiates a`Tooltip`object given`latlng`where the tooltip will open and an optional`options`object that describes its appearance and location.                                                                         |

| Option          | Type      | Default         | Description                                                                                                                                                                                               |
| --------------- | --------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**pane**`      | `String`  | `'tooltipPane'` | `Map pane`where the tooltip will be added.                                                                                                                                                                |
| `**offset**`    | `Point`   | `Point(0, 0)`   | Optional offset of the tooltip position.                                                                                                                                                                  |
| `**direction**` | `String`  | `'auto'`        | Direction where to open the tooltip. Possible values are:`right`,`left`,`top`,`bottom`,`center`,`auto`.`auto`will dynamically switch between`right`and`left`according to the tooltip position on the map. |
| `**permanent**` | `Boolean` | `false`         | Whether to open the tooltip permanently or only on mouseover.                                                                                                                                             |
| `**sticky**`    | `Boolean` | `false`         | If true, the tooltip will follow the mouse instead of being fixed at the feature center.                                                                                                                  |
| `**opacity**`   | `Number`  | `0.9`           | Tooltip container opacity.                                                                                                                                                                                |

▶Options inherited fromDivOverlay

| Option            | Type                          | Default | Description                                                                                                                                                                                                     |
| ----------------- | ----------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**interactive**` | `Boolean`                     | `false` | If true, the popup/tooltip will listen to the mouse events.                                                                                                                                                     |
| `**className**`   | `String`                      | `''`    | A custom CSS class name to assign to the overlay.                                                                                                                                                               |
| `**content**`     | `String|HTMLElement|Function` | `''`    | Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be passed to the function. The function should return a`String`or`HTMLElement`to be used in the overlay. |

▶Options inherited fromInteractive layer

| Option                    | Type      | Default | Description                                                                                                                 |
| ------------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `**bubblingMouseEvents**` | `Boolean` | `true`  | When`true`, a mouse event on this layer will trigger the same event on the map (unless`L.DomEvent.stopPropagation`is used). |

▶Options inherited fromLayer

### Events

### Methods

| Option            | Type     | Default | Description                                                                                                                                                                                   |
| ----------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**attribution**` | `String` | `null`  | String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers. |

▶DivOverlay events inherited fromDivOverlay

| Event               | Data    | Description                                      |
| ------------------- | ------- | ------------------------------------------------ |
| `**contentupdate**` | `Event` | Fired when the content of the overlay is updated |

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

▶Methods inherited fromDivOverlay

| Method                                                       | Returns              | Description                                                                                                                                                                                  |
| ------------------------------------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**openOn**(<Map>*map*)`                                     | `this`               | Adds the overlay to the map. Alternative to`map.openPopup(popup)`/`.openTooltip(tooltip)`.                                                                                                   |
| `**close**()`                                                | `this`               | Closes the overlay. Alternative to`map.closePopup(popup)`/`.closeTooltip(tooltip)`and`layer.closePopup()`/`.closeTooltip()`.                                                                 |
| `**toggle**(<Layer>*layer?*)`                                | `this`               | Opens or closes the overlay bound to layer depending on its current state. Argument may be omitted only for overlay bound to layer. Alternative to`layer.togglePopup()`/`.toggleTooltip()`.  |
| `**getLatLng**()`                                            | `LatLng`             | Returns the geographical point of the overlay.                                                                                                                                               |
| `**setLatLng**(<LatLng>*latlng*)`                            | `this`               | Sets the geographical point where the overlay will open.                                                                                                                                     |
| `**getContent**()`                                           | `String|HTMLElement` | Returns the content of the overlay.                                                                                                                                                          |
| `**setContent**(<String|HTMLElement|Function>*htmlContent*)` | `this`               | Sets the HTML content of the overlay. If a function is passed the source layer will be passed to the function. The function should return a`String`or`HTMLElement`to be used in the overlay. |
| `**getElement**()`                                           | `String|HTMLElement` | Returns the HTML container of the overlay.                                                                                                                                                   |
| `**update**()`                                               | `null`               | Updates the overlay content, layout and position. Useful for updating the overlay after something inside changed, e.g. image loaded.                                                         |
| `**isOpen**()`                                               | `Boolean`            | Returns`true`when the overlay is visible on the map.                                                                                                                                         |
| `**bringToFront**()`                                         | `this`               | Brings this overlay in front of other overlays (in the same map pane).                                                                                                                       |
| `**bringToBack**()`                                          | `this`               | Brings this overlay to the back of other overlays (in the same map pane).                                                                                                                    |

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
