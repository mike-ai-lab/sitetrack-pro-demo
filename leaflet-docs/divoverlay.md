# DivOverlay

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

Interaction handlersInteraction handlers are properties of a marker instance that allow you to control interaction behavior in runtime, enabling or disabling certain features such as dragging (see`Handler`methods). Example:
```
marker.dragging.disable();

```

| Property       | Type      | Description                                                                                                                            |
| -------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `**dragging**` | `Handler` | Marker dragging handler (by both mouse and touch). Only valid when the marker is on the map (Otherwise set`marker.options.draggable`). |

Base model for L.Popup and L.Tooltip. Inherit from it for custom overlays like plugins.

### Options

### Events

### Methods

| Option            | Type                          | Default       | Description                                                                                                                                                                                                     |
| ----------------- | ----------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**interactive**` | `Boolean`                     | `false`       | If true, the popup/tooltip will listen to the mouse events.                                                                                                                                                     |
| `**offset**`      | `Point`                       | `Point(0, 0)` | The offset of the overlay position.                                                                                                                                                                             |
| `**className**`   | `String`                      | `''`          | A custom CSS class name to assign to the overlay.                                                                                                                                                               |
| `**pane**`        | `String`                      | `undefined`   | `Map pane`where the overlay will be added.                                                                                                                                                                      |
| `**content**`     | `String|HTMLElement|Function` | `''`          | Sets the HTML content of the overlay while initializing. If a function is passed the source layer will be passed to the function. The function should return a`String`or`HTMLElement`to be used in the overlay. |

▶Options inherited fromInteractive layer

| Option                    | Type      | Default | Description                                                                                                                 |
| ------------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `**bubblingMouseEvents**` | `Boolean` | `true`  | When`true`, a mouse event on this layer will trigger the same event on the map (unless`L.DomEvent.stopPropagation`is used). |

▶Options inherited fromLayer

| Option            | Type     | Default | Description                                                                                                                                                                                   |
| ----------------- | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**attribution**` | `String` | `null`  | String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers. |

DivOverlay events

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
