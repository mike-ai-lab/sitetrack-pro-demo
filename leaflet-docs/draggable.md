# Draggable

`HTMLElement`also work for SVG elements. The only difference is that classes refer to CSS classes in HTML and SVG classes in SVG.

| Function                                                                       | Returns        | Description                                                                                                                                                                                                                                                                             |
| ------------------------------------------------------------------------------ | -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**get**(<String|HTMLElement>*id*)`                                            | `HTMLElement`  | Returns an element given its DOM id, or returns the element itself if it was passed directly.                                                                                                                                                                                           |
| `**getStyle**(<HTMLElement>*el*,<String>*styleAttrib*)`                        | `String`       | Returns the value for a certain style attribute on an element, including computed values or values set through CSS.                                                                                                                                                                     |
| `**create**(<String>*tagName*,<String>*className?*,<HTMLElement>*container?*)` | `HTMLElement`  | Creates an HTML element with`tagName`, sets its class to`className`, and optionally appends it to`container`element.                                                                                                                                                                    |
| `**remove**(<HTMLElement>*el*)`                                                | ``             | Removes`el`from its parent element                                                                                                                                                                                                                                                      |
| `**empty**(<HTMLElement>*el*)`                                                 | ``             | Removes all of`el`'s children elements from`el`                                                                                                                                                                                                                                         |
| `**toFront**(<HTMLElement>*el*)`                                               | ``             | Makes`el`the last child of its parent, so it renders in front of the other children.                                                                                                                                                                                                    |
| `**toBack**(<HTMLElement>*el*)`                                                | ``             | Makes`el`the first child of its parent, so it renders behind the other children.                                                                                                                                                                                                        |
| `**hasClass**(<HTMLElement>*el*,<String>*name*)`                               | `Boolean`      | Returns`true`if the element's class attribute contains`name`.                                                                                                                                                                                                                           |
| `**addClass**(<HTMLElement>*el*,<String>*name*)`                               | ``             | Adds`name`to the element's class attribute.                                                                                                                                                                                                                                             |
| `**removeClass**(<HTMLElement>*el*,<String>*name*)`                            | ``             | Removes`name`from the element's class attribute.                                                                                                                                                                                                                                        |
| `**setClass**(<HTMLElement>*el*,<String>*name*)`                               | ``             | Sets the element's class.                                                                                                                                                                                                                                                               |
| `**getClass**(<HTMLElement>*el*)`                                              | `String`       | Returns the element's class.                                                                                                                                                                                                                                                            |
| `**setOpacity**(<HTMLElement>*el*,<Number>*opacity*)`                          | ``             | Set the opacity of an element (including old IE support).`opacity`must be a number from`0`to`1`.                                                                                                                                                                                        |
| `**testProp**(<String[]>*props*)`                                              | `String|false` | Goes through the array of style names and returns the first name that is a valid style name for an element. If no such name is found, it returns false. Useful for vendor-prefixed styles like`transform`.                                                                              |
| `**setTransform**(<HTMLElement>*el*,<Point>*offset*,<Number>*scale?*)`         | ``             | Resets the 3D CSS transform of`el`so it is translated by`offset`pixels and optionally scaled by`scale`. Does not have an effect if the browser doesn't support 3D CSS transforms.                                                                                                       |
| `**setPosition**(<HTMLElement>*el*,<Point>*position*)`                         | ``             | Sets the position of`el`to coordinates specified by`position`, using CSS translate or top/left positioning depending on the browser (used by Leaflet internally to position its layers).                                                                                                |
| `**getPosition**(<HTMLElement>*el*)`                                           | `Point`        | Returns the coordinates of an element previously positioned with setPosition.                                                                                                                                                                                                           |
| `**disableTextSelection**()`                                                   | ``             | Prevents the user from generating`selectstart`DOM events, usually generated when the user drags the mouse through a page with text. Used internally by Leaflet to override the behaviour of any click-and-drag interaction on the map. Affects drag interactions on the whole document. |
| `**enableTextSelection**()`                                                    | ``             | Cancels the effects of a previous`L.DomUtil.disableTextSelection`.                                                                                                                                                                                                                      |
| `**disableImageDrag**()`                                                       | ``             | As`L.DomUtil.disableTextSelection`, but for`dragstart`DOM events, usually generated when the user drags an image.                                                                                                                                                                       |
| `**enableImageDrag**()`                                                        | ``             | Cancels the effects of a previous`L.DomUtil.disableImageDrag`.                                                                                                                                                                                                                          |
| `**preventOutline**(<HTMLElement>*el*)`                                        | ``             | Makes theoutlineof the element`el`invisible. Used internally by Leaflet to prevent focusable elements from displaying an outline when the user performs a drag interaction on them.                                                                                                     |
| `**restoreOutline**()`                                                         | ``             | Cancels the effects of a previous`L.DomUtil.preventOutline`.                                                                                                                                                                                                                            |
| `**getSizedParentNode**(<HTMLElement>*el*)`                                    | `HTMLElement`  | Finds the closest parent node which size (width and height) is not null.                                                                                                                                                                                                                |
| `**getScale**(<HTMLElement>*el*)`                                              | `Object`       | Computes the CSS scale currently applied on the element. Returns an object with`x`and`y`members as horizontal and vertical scales respectively, and`boundingClientRect`as the result of`getBoundingClientRect()`.                                                                       |

| Property             | Type     | Description                                                               |
| -------------------- | -------- | ------------------------------------------------------------------------- |
| `**TRANSFORM**`      | `String` | Vendor-prefixed transform style name (e.g.`'webkitTransform'`for WebKit). |
| `**TRANSITION**`     | `String` | Vendor-prefixed transition style name.                                    |
| `**TRANSITION_END**` | `String` | Vendor-prefixed transitionend event name.                                 |

Used internally for panning animations, utilizing CSS3 Transitions for modern browsers and a timer fallback for IE6-9.

```
var myPositionMarker = L.marker([48.864716, 2.294694]).addTo(map);

myPositionMarker.on("click", function() {
	var pos = map.latLngToLayerPoint(myPositionMarker.getLatLng());
	pos.y -= 25;
	var fx = new L.PosAnimation();

	fx.once('end',function() {
		pos.y += 25;
		fx.run(myPositionMarker._icon, pos, 0.8);
	});

	fx.run(myPositionMarker._icon, pos, 0.3);
});

```

| Constructor            | Description                    |
| ---------------------- | ------------------------------ |
| `**L.PosAnimation**()` | Creates a`PosAnimation`object. |

| Event       | Data    | Description                              |
| ----------- | ------- | ---------------------------------------- |
| `**start**` | `Event` | Fired when the animation starts          |
| `**step**`  | `Event` | Fired continuously during the animation. |
| `**end**`   | `Event` | Fired when the animation ends.           |

| Method                                                                                    | Returns | Description                                                                                                                                                                                           |
| ----------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**run**(<HTMLElement>*el*,<Point>*newPos*,<Number>*duration?*,<Number>*easeLinearity?*)` | ``      | Run an animation of a given element to a new position, optionally setting duration in seconds (`0.25`by default) and easing linearity factor (3rd argument of thecubic bezier curve,`0.5`by default). |
| `**stop**()`                                                                              | ``      | Stops the animation (if currently running).                                                                                                                                                           |

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

A class for making DOM elements draggable (including touch support). Used internally for map and marker dragging. Only works for elements that were positioned with

### Usage example

### Constructor

### Options

### Events

### Methods
