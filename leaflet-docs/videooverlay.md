# VideoOverlay

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

Used to load and display a video player over specific bounds of the map. Extends`ImageOverlay`.

A video overlay uses the`<video>`HTML5 element.

### Usage example

### Creation

### Options

### Events

```
var videoUrl = 'https://www.mapbox.com/bites/00188/patricia_nasa.webm',
	videoBounds = [[ 32, -130], [ 13, -100]];
L.videoOverlay(videoUrl, videoBounds ).addTo(map);

```

| Factory                                                                                                              | Description                                                                                                                                            |
| -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `**L.videoOverlay**(<String|Array|HTMLVideoElement>*video*,<LatLngBounds>*bounds*,<VideoOverlay options>*options?*)` | Instantiates an image overlay object given the URL of the video (or array of URLs, or even a video element) and the geographical bounds it is tied to. |

| Option                | Type      | Default | Description                                                                                                              |
| --------------------- | --------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `**autoplay**`        | `Boolean` | `true`  | Whether the video starts playing automatically when loaded. On some browsers autoplay will only work with`muted: true`   |
| `**loop**`            | `Boolean` | `true`  | Whether the video will loop back to the beginning when played.                                                           |
| `**keepAspectRatio**` | `Boolean` | `true`  | Whether the video will save aspect ratio after the projection. Relevant for supported browsers. Seebrowser compatibility |
| `**muted**`           | `Boolean` | `false` | Whether the video starts on mute when loaded.                                                                            |
| `**playsInline**`     | `Boolean` | `true`  | Mobile browsers will play the video right where it is instead of open it up in fullscreen mode.                          |

▶Options inherited fromImageOverlay

| Option                | Type             | Default | Description                                                                                                                                                                                                                                                           |
| --------------------- | ---------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**opacity**`         | `Number`         | `1.0`   | The opacity of the image overlay.                                                                                                                                                                                                                                     |
| `**alt**`             | `String`         | `''`    | Text for the`alt`attribute of the image (useful for accessibility).                                                                                                                                                                                                   |
| `**interactive**`     | `Boolean`        | `false` | If`true`, the image overlay will emitmouse eventswhen clicked or hovered.                                                                                                                                                                                             |
| `**crossOrigin**`     | `Boolean|String` | `false` | Whether the crossOrigin attribute will be added to the image. If a String is provided, the image will have its crossOrigin attribute set to the String provided. This is needed if you want to access image pixel data. Refer toCORS Settingsfor valid String values. |
| `**errorOverlayUrl**` | `String`         | `''`    | URL to the overlay image to show in place of the overlay that failed to load.                                                                                                                                                                                         |
| `**zIndex**`          | `Number`         | `1`     | The explicitzIndexof the overlay layer.                                                                                                                                                                                                                               |
| `**className**`       | `String`         | `''`    | A custom class name to assign to the image. Empty by default.                                                                                                                                                                                                         |

▶Options inherited fromInteractive layer

| Option                    | Type      | Default | Description                                                                                                                 |
| ------------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------- |
| `**bubblingMouseEvents**` | `Boolean` | `true`  | When`true`, a mouse event on this layer will trigger the same event on the map (unless`L.DomEvent.stopPropagation`is used). |

▶Options inherited fromLayer

| Option            | Type     | Default         | Description                                                                                                                                                                                   |
| ----------------- | -------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**pane**`        | `String` | `'overlayPane'` | By default the layer will be added to the map'soverlay pane. Overriding this option will cause the layer to be placed on another pane by default.                                             |
| `**attribution**` | `String` | `null`          | String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers. |

| Event      | Data    | Description                                               |
| ---------- | ------- | --------------------------------------------------------- |
| `**load**` | `Event` | Fired when the video has finished loading the first frame |

▶Events inherited fromImageOverlay

| Event       | Data    | Description                                               |
| ----------- | ------- | --------------------------------------------------------- |
| `**error**` | `Event` | Fired when the ImageOverlay layer fails to load its image |

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

▶Popup events inherited from

### Methods

Layer

| Event            | Data         | Description                                      |
| ---------------- | ------------ | ------------------------------------------------ |
| `**popupopen**`  | `PopupEvent` | Fired when a popup bound to this layer is opened |
| `**popupclose**` | `PopupEvent` | Fired when a popup bound to this layer is closed |

▶Tooltip events inherited fromLayer

| Event              | Data           | Description                                         |
| ------------------ | -------------- | --------------------------------------------------- |
| `**tooltipopen**`  | `TooltipEvent` | Fired when a tooltip bound to this layer is opened. |
| `**tooltipclose**` | `TooltipEvent` | Fired when a tooltip bound to this layer is closed. |

| Method             | Returns            | Description                                                    |
| ------------------ | ------------------ | -------------------------------------------------------------- |
| `**getElement**()` | `HTMLVideoElement` | Returns the instance of`HTMLVideoElement`used by this overlay. |

▶Methods inherited fromImageOverlay

| Method                                  | Returns        | Description                                     |
| --------------------------------------- | -------------- | ----------------------------------------------- |
| `**setOpacity**(<Number>*opacity*)`     | `this`         | Sets the opacity of the overlay.                |
| `**bringToFront**()`                    | `this`         | Brings the layer to the top of all overlays.    |
| `**bringToBack**()`                     | `this`         | Brings the layer to the bottom of all overlays. |
| `**setUrl**(<String>*url*)`             | `this`         | Changes the URL of the image.                   |
| `**setBounds**(<LatLngBounds>*bounds*)` | `this`         | Update the bounds that this ImageOverlay covers |
| `**setZIndex**(<Number>*value*)`        | `this`         | Changes thezIndexof the image overlay.          |
| `**getBounds**()`                       | `LatLngBounds` | Get the bounds that this ImageOverlay covers    |
| `**getCenter**()`                       | `LatLng`       | Returns the center of the ImageOverlay.         |

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
