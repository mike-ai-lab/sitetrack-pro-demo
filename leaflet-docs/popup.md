# Popup

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

Used to open popups in certain places of the map. UseMap.openPopupto open popups while making sure that only one popup is open at one time (recommended for usability), or useMap.addLayerto open as many as you want.

If you want to just bind a popup to marker click and then open it, it's really easy:

```
marker.bindPopup(popupContent).openPopup();

```

Path overlays like polylines also have a

### Creation

### Options

### Events

`bindPopup`method.

A popup can be also standalone:

```
var popup = L.popup()
	.setLatLng(latlng)
	.setContent('<p>Hello world!<br />This is a nice popup.</p>')
	.openOn(map);

```

or

```
var popup = L.popup(latlng, {content: '<p>Hello world!<br />This is a nice popup.</p>'})
	.openOn(map);

```

| Factory                                                   | Description                                                                                                                                                                                                           |
| --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**L.popup**(<Popup options>*options?*,<Layer>*source?*)` | Instantiates a`Popup`object given an optional`options`object that describes its appearance and location and an optional`source`object that is used to tag the popup with a reference to the Layer to which it refers. |
| `**L.popup**(<LatLng>*latlng*,<Popup options>*options?*)` | Instantiates a`Popup`object given`latlng`where the popup will open and an optional`options`object that describes its appearance and location.                                                                         |

| Option                          | Type      | Default       | Description                                                                                                                                                                                      |
| ------------------------------- | --------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `**pane**`                      | `String`  | `'popupPane'` | `Map pane`where the popup will be added.                                                                                                                                                         |
| `**offset**`                    | `Point`   | `Point(0, 7)` | The offset of the popup position.                                                                                                                                                                |
| `**maxWidth**`                  | `Number`  | `300`         | Max width of the popup, in pixels.                                                                                                                                                               |
| `**minWidth**`                  | `Number`  | `50`          | Min width of the popup, in pixels.                                                                                                                                                               |
| `**maxHeight**`                 | `Number`  | `null`        | If set, creates a scrollable container of the given height inside a popup if its content exceeds it. The scrollable container can be styled using the`leaflet-popup-scrolled`CSS class selector. |
| `**autoPan**`                   | `Boolean` | `true`        | Set it to`false`if you don't want the map to do panning animation to fit the opened popup.                                                                                                       |
| `**autoPanPaddingTopLeft**`     | `Point`   | `null`        | The margin between the popup and the top left corner of the map view after autopanning was performed.                                                                                            |
| `**autoPanPaddingBottomRight**` | `Point`   | `null`        | The margin between the popup and the bottom right corner of the map view after autopanning was performed.                                                                                        |
| `**autoPanPadding**`            | `Point`   | `Point(5, 5)` | Equivalent of setting both top left and bottom right autopan padding to the same value.                                                                                                          |
| `**keepInView**`                | `Boolean` | `false`       | Set it to`true`if you want to prevent users from panning the popup off of the screen while it is open.                                                                                           |
| `**closeButton**`               | `Boolean` | `true`        | Controls the presence of a close button in the popup.                                                                                                                                            |
| `**autoClose**`                 | `Boolean` | `true`        | Set it to`false`if you want to override the default behavior of the popup closing when another popup is opened.                                                                                  |
| `**closeOnEscapeKey**`          | `Boolean` | `true`        | Set it to`false`if you want to override the default behavior of the ESC key for closing of the popup.                                                                                            |
| `**closeOnClick**`              | `Boolean` | `*`           | Set it if you want to override the default behavior of the popup closing when user clicks on the map. Defaults to the map's`closePopupOnClick`option.                                            |
| `**className**`                 | `String`  | `''`          | A custom CSS class name to assign to the popup.                                                                                                                                                  |

▶Options inherited fromDivOverlay

| Option            | Type                          | Default | Description                                                                                                                                                                                                     |
| ----------------- | ----------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**interactive**` | `Boolean`                     | `false` | If true, the popup/tooltip will listen to the mouse events.                                                                                                                                                     |
| `**content**`     | `String|HTMLElement|Function` | `''`    | Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be passed to the function. The function should return a`String`or`HTMLElement`to be used in the overlay. |

▶Options inherited fromInteractive layer

| Option                    | Type      | Default | Description                                                                                                                 |
| ------------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `**bubblingMouseEvents**` | `Boolean` | `true`  | When`true`, a mouse event on this layer will trigger the same event on the map (unless`L.DomEvent.stopPropagation`is used). |

▶Options inherited fromLayer

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

| Method                   | Returns | Description                                                                                  |
| ------------------------ | ------- | -------------------------------------------------------------------------------------------- |
| `**openOn**(<Map>*map*)` | `this`  | Alternative to`map.openPopup(popup)`. Adds the popup to the map and closes the previous one. |

▶Methods inherited fromDivOverlay

| Method                                                       | Returns              | Description                                                                                                                                                                                  |
| ------------------------------------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
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
