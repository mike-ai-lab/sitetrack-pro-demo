# Transformation

`Control`.

```
L.control.scale().addTo(map);

```

| Factory                                                  | Description                                      |
| -------------------------------------------------------- | ------------------------------------------------ |
| `**L.control.scale**(<Control.Scale options>*options?*)` | Creates an scale control with the given options. |

| Option               | Type      | Default | Description                                                                                                     |
| -------------------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------- |
| `**maxWidth**`       | `Number`  | `100`   | Maximum width of the control in pixels. The width is set dynamically to show round values (e.g. 100, 200, 500). |
| `**metric**`         | `Boolean` | `True`  | Whether to show the metric scale line (m/km).                                                                   |
| `**imperial**`       | `Boolean` | `True`  | Whether to show the imperial scale line (mi/ft).                                                                |
| `**updateWhenIdle**` | `Boolean` | `false` | If`true`, the control is updated on`moveend`, otherwise it's always up-to-date (updated on`move`).              |

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

A namespace with static properties for browser/feature detection used by Leaflet internally.

```
if (L.Browser.ielt9) {
  alert('Upgrade your browser, dude!');
}

```

| Property             | Type       | Description                                                                                                                                                                                                            |
| -------------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**ie**`             | `Boolean`  | `true`for all Internet Explorer versions (not Edge).                                                                                                                                                                   |
| `**ielt9**`          | `Boolean`  | `true`for Internet Explorer versions less than 9.                                                                                                                                                                      |
| `**edge**`           | `Boolean`  | `true`for the Edge web browser.                                                                                                                                                                                        |
| `**webkit**`         | `Boolean;` | `true`for webkit-based browsers like Chrome and Safari (including mobile versions).                                                                                                                                    |
| `**android**`        | `Boolean`  | **Deprecated.**`true`for any browser running on an Android platform.                                                                                                                                                   |
| `**android23**`      | `Boolean`  | **Deprecated.**`true`for browsers running on Android 2 or Android 3.                                                                                                                                                   |
| `**androidStock**`   | `Boolean`  | **Deprecated.**`true`for the Android stock browser (i.e. not Chrome)                                                                                                                                                   |
| `**opera**`          | `Boolean`  | `true`for the Opera browser                                                                                                                                                                                            |
| `**chrome**`         | `Boolean`  | `true`for the Chrome browser.                                                                                                                                                                                          |
| `**gecko**`          | `Boolean`  | `true`for gecko-based browsers like Firefox.                                                                                                                                                                           |
| `**safari**`         | `Boolean`  | `true`for the Safari browser.                                                                                                                                                                                          |
| `**opera12**`        | `Boolean`  | `true`for the Opera browser supporting CSS transforms (version 12 or later).                                                                                                                                           |
| `**win**`            | `Boolean`  | `true`when the browser is running in a Windows platform                                                                                                                                                                |
| `**ie3d**`           | `Boolean`  | `true`for all Internet Explorer versions supporting CSS transforms.                                                                                                                                                    |
| `**webkit3d**`       | `Boolean`  | `true`for webkit-based browsers supporting CSS transforms.                                                                                                                                                             |
| `**gecko3d**`        | `Boolean`  | `true`for gecko-based browsers supporting CSS transforms.                                                                                                                                                              |
| `**any3d**`          | `Boolean`  | `true`for all browsers supporting CSS transforms.                                                                                                                                                                      |
| `**mobile**`         | `Boolean`  | `true`for all browsers running in a mobile device.                                                                                                                                                                     |
| `**mobileWebkit**`   | `Boolean`  | `true`for all webkit-based browsers in a mobile device.                                                                                                                                                                |
| `**mobileWebkit3d**` | `Boolean`  | `true`for all webkit-based browsers in a mobile device supporting CSS transforms.                                                                                                                                      |
| `**msPointer**`      | `Boolean`  | `true`for browsers implementing the Microsoft touch events model (notably IE10).                                                                                                                                       |
| `**pointer**`        | `Boolean`  | `true`for all browsers supportingpointer events.                                                                                                                                                                       |
| `**touchNative**`    | `Boolean`  | `true`for all browsers supportingtouch events.**This does not necessarily mean**that the browser is running in a computer with a touchscreen, it only means that the browser is capable of understanding touch events. |
| `**touch**`          | `Boolean`  | `true`for all browsers supporting eithertouchorpointerevents. Note: pointer events will be preferred (if available), and processed for all`touch*`listeners.                                                           |
| `**mobileOpera**`    | `Boolean`  | `true`for the Opera browser in a mobile device.                                                                                                                                                                        |
| `**mobileGecko**`    | `Boolean`  | `true`for gecko-based browsers running in a mobile device.                                                                                                                                                             |
| `**retina**`         | `Boolean`  | `true`for browsers on a high-resolution "retina" screen or on any screen when browser's display zoom is more than 100%.                                                                                                |
| `**passiveEvents**`  | `Boolean`  | `true`for browsers that support passive events.                                                                                                                                                                        |
| `**canvas**`         | `Boolean`  | `true`when the browser supports`<canvas>`.                                                                                                                                                                             |
| `**svg**`            | `Boolean`  | `true`when the browser supportsSVG.                                                                                                                                                                                    |
| `**vml**`            | `Boolean`  | `true`if the browser supportsVML.                                                                                                                                                                                      |
| `**mac**`            | `Boolean`  | `true`when the browser is running in a Mac platform`true`when the browser is running in a Linux platform                                                                                                               |

Various utility functions, used by Leaflet internally.

| Function                                                                         | Returns     | Description                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `**extend**(<Object>*dest*,<Object>*src?*)`                                      | `Object`    | Merges the properties of the`src`object (or multiple objects) into`dest`object and returns the latter. Has an`L.extend`shortcut.                                                                                                                                                                                                                                                                                               |
| `**create**(<Object>*proto*,<Object>*properties?*)`                              | `Object`    | Compatibility polyfill forObject.create                                                                                                                                                                                                                                                                                                                                                                                        |
| `**bind**(<Function>*fn*,*…*)`                                                   | `Function`  | Returns a new function bound to the arguments passed, likeFunction.prototype.bind. Has a`L.bind()`shortcut.                                                                                                                                                                                                                                                                                                                    |
| `**stamp**(<Object>*obj*)`                                                       | `Number`    | Returns the unique ID of an object, assigning it one if it doesn't have it.                                                                                                                                                                                                                                                                                                                                                    |
| `**throttle**(<Function>*fn*,<Number>*time*,<Object>*context*)`                  | `Function`  | Returns a function which executes function`fn`with the given scope`context`(so that the`this`keyword refers to`context`inside`fn`'s code). The function`fn`will be called no more than one time per given amount of`time`. The arguments received by the bound function will be any arguments passed when binding the function, followed by any arguments passed when invoking the bound function. Has an`L.throttle`shortcut. |
| `**wrapNum**(<Number>*num*,<Number[]>*range*,<Boolean>*includeMax?*)`            | `Number`    | Returns the number`num`modulo`range`in such a way so it lies within`range[0]`and`range[1]`. The returned value will be always smaller than`range[1]`unless`includeMax`is set to`true`.                                                                                                                                                                                                                                         |
| `**falseFn**()`                                                                  | `Function`  | Returns a function which always returns`false`.                                                                                                                                                                                                                                                                                                                                                                                |
| `**formatNum**(<Number>*num*,<Number|false>*precision?*)`                        | `Number`    | Returns the number`num`rounded with specified`precision`. The default`precision`value is 6 decimal places.`false`can be passed to skip any processing (can be useful to avoid round-off errors).                                                                                                                                                                                                                               |
| `**trim**(<String>*str*)`                                                        | `String`    | Compatibility polyfill forString.prototype.trim                                                                                                                                                                                                                                                                                                                                                                                |
| `**splitWords**(<String>*str*)`                                                  | `String[]`  | Trims and splits the string on whitespace and returns the array of parts.                                                                                                                                                                                                                                                                                                                                                      |
| `**setOptions**(<Object>*obj*,<Object>*options*)`                                | `Object`    | Merges the given properties to the`options`of the`obj`object, returning the resulting options. See`Class options`. Has an`L.setOptions`shortcut.                                                                                                                                                                                                                                                                               |
| `**getParamString**(<Object>*obj*,<String>*existingUrl?*,<Boolean>*uppercase?*)` | `String`    | Converts an object into a parameter URL string, e.g.`{a: "foo", b: "bar"}`translates to`'?a=foo&b=bar'`. If`existingUrl`is set, the parameters will be appended at the end. If`uppercase`is`true`, the parameter names will be uppercased (e.g.`'?A=foo&B=bar'`)                                                                                                                                                               |
| `**template**(<String>*str*,<Object>*data*)`                                     | `String`    | Simple templating facility, accepts a template string of the form`'Hello {a}, {b}'`and a data object like`{a: 'foo', b: 'bar'}`, returns evaluated string`('Hello foo, bar')`. You can also specify functions instead of strings for data values — they will be evaluated passing`data`as an argument.                                                                                                                         |
| `**isArray**(*obj*)`                                                             | `Boolean`   | Compatibility polyfill forArray.isArray                                                                                                                                                                                                                                                                                                                                                                                        |
| `**indexOf**(<Array>*array*,<Object>*el*)`                                       | `Number`    | Compatibility polyfill forArray.prototype.indexOf                                                                                                                                                                                                                                                                                                                                                                              |
| `**requestAnimFrame**(<Function>*fn*,<Object>*context?*,<Boolean>*immediate?*)`  | `Number`    | Schedules`fn`to be executed when the browser repaints.`fn`is bound to`context`if given. When`immediate`is set,`fn`is called immediately if the browser doesn't have native support for`window.requestAnimationFrame`, otherwise it's delayed. Returns a request ID that can be used to cancel the request.                                                                                                                     |
| `**cancelAnimFrame**(<Number>*id*)`                                              | `undefined` | Cancels a previous`requestAnimFrame`. See alsowindow.cancelAnimationFrame.                                                                                                                                                                                                                                                                                                                                                     |

| Property            | Type     | Description                                                                                                                                                                           |
| ------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**lastId**`        | `Number` | Last unique ID used by`stamp()`                                                                                                                                                       |
| `**emptyImageUrl**` | `String` | Data URI string containing a base64-encoded empty GIF image. Used as a hack to free memory from unused images on WebKit-powered mobile devices (by setting image`src`to this string). |

Represents an affine transformation: a set of coefficients`a`,

### Usage example

### Creation

### Methods
