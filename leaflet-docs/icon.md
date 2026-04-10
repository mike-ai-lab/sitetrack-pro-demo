# Icon

```
var p1 = L.point(10, 10),
p2 = L.point(40, 60),
bounds = L.bounds(p1, p2);

```

All Leaflet methods that accept`Bounds`objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:

```
otherBounds.intersects([[10, 10], [40, 60]]);

```

Note that`Bounds`does not inherit from Leaflet's`Class`object, which means new classes can't inherit from it, and new methods can't be added to it with the`include`function.

| Factory                                           | Description                                                |
| ------------------------------------------------- | ---------------------------------------------------------- |
| `**L.bounds**(<Point>*corner1*,<Point>*corner2*)` | Creates a Bounds object from two corners coordinate pairs. |
| `**L.bounds**(<Point[]>*points*)`                 | Creates a Bounds object from the given array of points.    |

| Method                                  | Returns   | Description                                                                                                                                                                                                                |
| --------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**extend**(<Point>*point*)`            | `this`    | Extends the bounds to contain the given point.                                                                                                                                                                             |
| `**extend**(<Bounds>*otherBounds*)`     | `this`    | Extend the bounds to contain the given bounds                                                                                                                                                                              |
| `**getCenter**(<Boolean>*round?*)`      | `Point`   | Returns the center point of the bounds.                                                                                                                                                                                    |
| `**getBottomLeft**()`                   | `Point`   | Returns the bottom-left point of the bounds.                                                                                                                                                                               |
| `**getTopRight**()`                     | `Point`   | Returns the top-right point of the bounds.                                                                                                                                                                                 |
| `**getTopLeft**()`                      | `Point`   | Returns the top-left point of the bounds (i.e.`this.min`).                                                                                                                                                                 |
| `**getBottomRight**()`                  | `Point`   | Returns the bottom-right point of the bounds (i.e.`this.max`).                                                                                                                                                             |
| `**getSize**()`                         | `Point`   | Returns the size of the given bounds                                                                                                                                                                                       |
| `**contains**(<Bounds>*otherBounds*)`   | `Boolean` | Returns`true`if the rectangle contains the given one.                                                                                                                                                                      |
| `**contains**(<Point>*point*)`          | `Boolean` | Returns`true`if the rectangle contains the given point.                                                                                                                                                                    |
| `**intersects**(<Bounds>*otherBounds*)` | `Boolean` | Returns`true`if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.                                                                                                 |
| `**overlaps**(<Bounds>*otherBounds*)`   | `Boolean` | Returns`true`if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.                                                                                                              |
| `**isValid**()`                         | `Boolean` | Returns`true`if the bounds are properly initialized.                                                                                                                                                                       |
| `**pad**(<Number>*bufferRatio*)`        | `Bounds`  | Returns bounds created by extending or retracting the current bounds by a given ratio in each direction. For example, a ratio of 0.5 extends the bounds by 50% in each direction. Negative values will retract the bounds. |
| `**equals**(<Bounds>*otherBounds*)`     | `Boolean` | Returns`true`if the rectangle is equivalent to the given bounds.                                                                                                                                                           |

| Property  | Type    | Description                               |
| --------- | ------- | ----------------------------------------- |
| `**min**` | `Point` | The top left corner of the rectangle.     |
| `**max**` | `Point` | The bottom right corner of the rectangle. |

Represents an icon to provide when creating a marker.

### Usage example

### Creation

### Options

### Methods

### Icon.Default

```
var myIcon = L.icon({
    iconUrl: 'my-icon.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

```

`L.Icon.Default`extends`L.Icon`and is the blue icon Leaflet uses for markers by default.

| Factory                               | Description                                      |
| ------------------------------------- | ------------------------------------------------ |
| `**L.icon**(<Icon options>*options*)` | Creates an icon instance with the given options. |

| Option                | Type             | Default  | Description                                                                                                                                                                                                                                                            |
| --------------------- | ---------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**iconUrl**`         | `String`         | `null`   | **(required)**The URL to the icon image (absolute or relative to your script path).                                                                                                                                                                                    |
| `**iconRetinaUrl**`   | `String`         | `null`   | The URL to a retina sized version of the icon image (absolute or relative to your script path). Used for Retina screen devices.                                                                                                                                        |
| `**iconSize**`        | `Point`          | `null`   | Size of the icon image in pixels.                                                                                                                                                                                                                                      |
| `**iconAnchor**`      | `Point`          | `null`   | The coordinates of the "tip" of the icon (relative to its top left corner). The icon will be aligned so that this point is at the marker's geographical location. Centered by default if size is specified, also can be set in CSS with negative margins.              |
| `**popupAnchor**`     | `Point`          | `[0, 0]` | The coordinates of the point from which popups will "open", relative to the icon anchor.                                                                                                                                                                               |
| `**tooltipAnchor**`   | `Point`          | `[0, 0]` | The coordinates of the point from which tooltips will "open", relative to the icon anchor.                                                                                                                                                                             |
| `**shadowUrl**`       | `String`         | `null`   | The URL to the icon shadow image. If not specified, no shadow image will be created.                                                                                                                                                                                   |
| `**shadowRetinaUrl**` | `String`         | `null`   |                                                                                                                                                                                                                                                                        |
| `**shadowSize**`      | `Point`          | `null`   | Size of the shadow image in pixels.                                                                                                                                                                                                                                    |
| `**shadowAnchor**`    | `Point`          | `null`   | The coordinates of the "tip" of the shadow (relative to its top left corner) (the same as iconAnchor if not specified).                                                                                                                                                |
| `**className**`       | `String`         | `''`     | A custom class name to assign to both icon and shadow images. Empty by default.                                                                                                                                                                                        |
| `**crossOrigin**`     | `Boolean|String` | `false`  | Whether the crossOrigin attribute will be added to the tiles. If a String is provided, all tiles will have their crossOrigin attribute set to the String provided. This is needed if you want to access tile pixel data. Refer toCORS Settingsfor valid String values. |

| Method                                      | Returns       | Description                                                                                                    |
| ------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| `**createIcon**(<HTMLElement>*oldIcon?*)`   | `HTMLElement` | Called internally when the icon has to be shown, returns a`<img>`HTML element styled according to the options. |
| `**createShadow**(<HTMLElement>*oldIcon?*)` | `HTMLElement` | As`createIcon`, but for the shadow beneath it.                                                                 |

A trivial subclass of`Icon`, represents the icon to use in`Marker`s when no icon is specified. Points to the blue marker image distributed with Leaflet releases.

In order to customize the default icon, just change the properties of`L.Icon.Default.prototype.options`(which is a set of`Icon options`).

If you want to*completely*replace the default icon, override the`L.Marker.prototype.options.icon`with your own icon instead.
