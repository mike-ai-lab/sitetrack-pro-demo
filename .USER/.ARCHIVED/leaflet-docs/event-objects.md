# Event objects

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

Whenever a class inheriting from

### Event

### KeyboardEvent

### MouseEvent

### LocationEvent

### ErrorEvent

### LayerEvent

### LayersControlEvent

`Evented`fires an event, a listener function will be called with an event argument, which is a plain object containing information about the event. For example:

```
map.on('click', function(ev) {
    alert(ev.latlng); // ev is an event object (MouseEvent in this case)
});

```

The information available depends on the event type:
The base event object. All other event objects contain these properties too.

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |
| `**layer**`          | `Object` | **Deprecated.**The same as`propagatedFrom`.                                                                            |

| Property            | Type       | Description                                                      |
| ------------------- | ---------- | ---------------------------------------------------------------- |
| `**originalEvent**` | `DOMEvent` | The originalDOM`KeyboardEvent`that triggered this Leaflet event. |

▶Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |
| `**layer**`          | `Object` | **Deprecated.**The same as`propagatedFrom`.                                                                            |

| Property             | Type       | Description                                                                                  |
| -------------------- | ---------- | -------------------------------------------------------------------------------------------- |
| `**latlng**`         | `LatLng`   | The geographical point where the mouse event occurred.                                       |
| `**layerPoint**`     | `Point`    | Pixel coordinates of the point where the mouse event occurred relative to the map layer.     |
| `**containerPoint**` | `Point`    | Pixel coordinates of the point where the mouse event occurred relative to the map сontainer. |
| `**originalEvent**`  | `DOMEvent` | The originalDOM`MouseEvent`orDOM`TouchEvent`that triggered this Leaflet event.               |

▶Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |
| `**layer**`          | `Object` | **Deprecated.**The same as`propagatedFrom`.                                                                            |

| Property               | Type           | Description                                                                                    |
| ---------------------- | -------------- | ---------------------------------------------------------------------------------------------- |
| `**latlng**`           | `LatLng`       | Detected geographical location of the user.                                                    |
| `**bounds**`           | `LatLngBounds` | Geographical bounds of the area user is located in (with respect to the accuracy of location). |
| `**accuracy**`         | `Number`       | Accuracy of location in meters.                                                                |
| `**altitude**`         | `Number`       | Height of the position above the WGS84 ellipsoid in meters.                                    |
| `**altitudeAccuracy**` | `Number`       | Accuracy of altitude in meters.                                                                |
| `**heading**`          | `Number`       | The direction of travel in degrees counting clockwise from true North.                         |
| `**speed**`            | `Number`       | Current velocity in meters per second.                                                         |
| `**timestamp**`        | `Number`       | The time when the position was acquired.                                                       |

▶Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |
| `**layer**`          | `Object` | **Deprecated.**The same as`propagatedFrom`.                                                                            |

| Property      | Type     | Description                 |
| ------------- | -------- | --------------------------- |
| `**message**` | `String` | Error message.              |
| `**code**`    | `Number` | Error code (if applicable). |

▶Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |
| `**layer**`          | `Object` | **Deprecated.**The same as`propagatedFrom`.                                                                            |

| Property    | Type    | Description                          |
| ----------- | ------- | ------------------------------------ |
| `**layer**` | `Layer` | The layer that was added or removed. |

▶Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |

| Property    | Type     | Description                                      |
| ----------- | -------- | ------------------------------------------------ |
| `**layer**` | `Layer`  | The layer that was added or removed.             |
| `**name**`  | `String` | The name of the layer that was added or removed. |

▶

### TileEvent

### TileErrorEvent

### ResizeEvent

### GeoJSONEvent

### PopupEvent

### TooltipEvent

### DragEndEvent

Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |

| Property     | Type          | Description                                                          |
| ------------ | ------------- | -------------------------------------------------------------------- |
| `**tile**`   | `HTMLElement` | The tile element (image).                                            |
| `**coords**` | `Point`       | Point object with the tile's`x`,`y`, and`z`(zoom level) coordinates. |

▶Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |
| `**layer**`          | `Object` | **Deprecated.**The same as`propagatedFrom`.                                                                            |

| Property     | Type          | Description                                                          |
| ------------ | ------------- | -------------------------------------------------------------------- |
| `**tile**`   | `HTMLElement` | The tile element (image).                                            |
| `**coords**` | `Point`       | Point object with the tile's`x`,`y`, and`z`(zoom level) coordinates. |
| `**error**`  | `*`           | Error passed to the tile's`done()`callback.                          |

▶Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |
| `**layer**`          | `Object` | **Deprecated.**The same as`propagatedFrom`.                                                                            |

| Property      | Type    | Description                          |
| ------------- | ------- | ------------------------------------ |
| `**oldSize**` | `Point` | The old size before resize event.    |
| `**newSize**` | `Point` | The new size after the resize event. |

▶Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |
| `**layer**`          | `Object` | **Deprecated.**The same as`propagatedFrom`.                                                                            |

| Property           | Type     | Description                                                       |
| ------------------ | -------- | ----------------------------------------------------------------- |
| `**layer**`        | `Layer`  | The layer for the GeoJSON feature that is being added to the map. |
| `**properties**`   | `Object` | GeoJSON properties of the feature.                                |
| `**geometryType**` | `String` | GeoJSON geometry type of the feature.                             |
| `**id**`           | `String` | GeoJSON ID of the feature (if present).                           |

▶Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |

| Property    | Type    | Description                          |
| ----------- | ------- | ------------------------------------ |
| `**popup**` | `Popup` | The popup that was opened or closed. |

▶Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |
| `**layer**`          | `Object` | **Deprecated.**The same as`propagatedFrom`.                                                                            |

| Property      | Type      | Description                            |
| ------------- | --------- | -------------------------------------- |
| `**tooltip**` | `Tooltip` | The tooltip that was opened or closed. |

▶Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |
| `**layer**`          | `Object` | **Deprecated.**The same as`propagatedFrom`.                                                                            |

| Property       | Type     | Description                                                |
| -------------- | -------- | ---------------------------------------------------------- |
| `**distance**` | `Number` | The distance in pixels the draggable element was moved by. |

▶

### ZoomAnimEvent
