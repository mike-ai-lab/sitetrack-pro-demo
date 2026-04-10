# Control.Zoom

| Option          | Type     | Default | Description                                                                                                                                                                    |
| --------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `**imagePath**` | `String` | ``      | `Icon.Default`will try to auto-detect the location of the blue icon images. If you are placing these images in a non-standard way, set this option to point to the right path. |

Represents a lightweight icon for markers that uses a simple`<div>`element instead of an image. Inherits from`Icon`but ignores the`iconUrl`and shadow options.

```
var myIcon = L.divIcon({className: 'my-div-icon'});
// you can set .my-div-icon styles in CSS

L.marker([50.505, 30.57], {icon: myIcon}).addTo(map);

```

By default, it has a 'leaflet-div-icon' CSS class and is styled as a little white square with a shadow.

| Factory                                     | Description                                        |
| ------------------------------------------- | -------------------------------------------------- |
| `**L.divIcon**(<DivIcon options>*options*)` | Creates a`DivIcon`instance with the given options. |

| Option      | Type                 | Default  | Description                                                                                                   |
| ----------- | -------------------- | -------- | ------------------------------------------------------------------------------------------------------------- |
| `**html**`  | `String|HTMLElement` | `''`     | Custom HTML code to put inside the div element, empty by default. Alternatively, an instance of`HTMLElement`. |
| `**bgPos**` | `Point`              | `[0, 0]` | Optional relative position of the background, in pixels                                                       |

▶Options inherited fromIcon

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

▶Methods inherited fromIcon

| Method                                      | Returns       | Description                                                                                                    |
| ------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------- |
| `**createIcon**(<HTMLElement>*oldIcon?*)`   | `HTMLElement` | Called internally when the icon has to be shown, returns a`<img>`HTML element styled according to the options. |
| `**createShadow**(<HTMLElement>*oldIcon?*)` | `HTMLElement` | As`createIcon`, but for the shadow beneath it.                                                                 |

A basic zoom control with two buttons (zoom in and zoom out). It is put on the map by default unless you set its`zoomControl`optionto

### Creation

### Options

### Methods
