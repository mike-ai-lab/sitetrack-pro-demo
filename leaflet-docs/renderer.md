# Renderer

Map projection.

| Method                          | Returns  | Description                                                                                                                                                                                                                                                                                                                                     |
| ------------------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**project**(<LatLng>*latlng*)` | `Point`  | Projects geographical coordinates into a 2D point. Only accepts actual`L.LatLng`instances, not arrays.                                                                                                                                                                                                                                          |
| `**unproject**(<Point>*point*)` | `LatLng` | The inverse of`project`. Projects a 2D point into a geographical location. Only accepts actual`L.Point`instances, not arrays.Note that the projection instances do not inherit from Leaflet's`Class`object, and can't be instantiated. Also, new classes can't inherit from them, and methods can't be added to them with the`include`function. |

| Property     | Type     | Description                                                       |
| ------------ | -------- | ----------------------------------------------------------------- |
| `**bounds**` | `Bounds` | The bounds (specified in CRS units) where the projection is valid |

Leaflet comes with a set of already defined Projections out of the box:

| Projection                           | Description                                                                                                                                                                                                                                     |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**L.Projection.LonLat**`            | Equirectangular, or Plate Carree projection — the most simple projection, mostly used by GIS enthusiasts. Directly maps`x`as longitude, and`y`as latitude. Also suitable for flat worlds, e.g. game maps. Used by the`EPSG:4326`and`Simple`CRS. |
| `**L.Projection.Mercator**`          | Elliptical Mercator projection — more complex than Spherical Mercator. Assumes that Earth is an ellipsoid. Used by the EPSG:3395 CRS.                                                                                                           |
| `**L.Projection.SphericalMercator**` | Spherical Mercator projection — the most common projection for online maps, used by almost all free and commercial tile providers. Assumes that Earth is a sphere. Used by the`EPSG:3857`CRS.                                                   |

| Method                                               | Returns        | Description                                                                                                                                                                |
| ---------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**latLngToPoint**(<LatLng>*latlng*,<Number>*zoom*)` | `Point`        | Projects geographical coordinates into pixel coordinates for a given zoom.                                                                                                 |
| `**pointToLatLng**(<Point>*point*,<Number>*zoom*)`   | `LatLng`       | The inverse of`latLngToPoint`. Projects pixel coordinates on a given zoom into geographical coordinates.                                                                   |
| `**project**(<LatLng>*latlng*)`                      | `Point`        | Projects geographical coordinates into coordinates in units accepted for this CRS (e.g. meters for EPSG:3857, for passing it to WMS services).                             |
| `**unproject**(<Point>*point*)`                      | `LatLng`       | Given a projected coordinate returns the corresponding LatLng. The inverse of`project`.                                                                                    |
| `**scale**(<Number>*zoom*)`                          | `Number`       | Returns the scale used when transforming projected coordinates into pixel coordinates for a particular zoom. For example, it returns`256 * 2^zoom`for Mercator-based CRS.  |
| `**zoom**(<Number>*scale*)`                          | `Number`       | Inverse of`scale()`, returns the zoom level corresponding to a scale factor of`scale`.                                                                                     |
| `**getProjectedBounds**(<Number>*zoom*)`             | `Bounds`       | Returns the projection's bounds scaled and transformed for the provided`zoom`.                                                                                             |
| `**distance**(<LatLng>*latlng1*,<LatLng>*latlng2*)`  | `Number`       | Returns the distance between two geographical coordinates.                                                                                                                 |
| `**wrapLatLng**(<LatLng>*latlng*)`                   | `LatLng`       | Returns a`LatLng`where lat and lng has been wrapped according to the CRS's`wrapLat`and`wrapLng`properties, if they are outside the CRS's bounds.                           |
| `**wrapLatLngBounds**(<LatLngBounds>*bounds*)`       | `LatLngBounds` | Returns a`LatLngBounds`with the same size as the given one, ensuring that its center is within the CRS's bounds. Only accepts actual`L.LatLngBounds`instances, not arrays. |

| Property       | Type       | Description                                                                                                                                                                                                                        |
| -------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**code**`     | `String`   | Standard code name of the CRS passed into WMS services (e.g.`'EPSG:3857'`)                                                                                                                                                         |
| `**wrapLng**`  | `Number[]` | An array of two numbers defining whether the longitude (horizontal) coordinate axis wraps around a given range and how. Defaults to`[-180, 180]`in most geographical CRSs. If`undefined`, the longitude axis does not wrap around. |
| `**wrapLat**`  | `Number[]` | Like`wrapLng`, but for the latitude (vertical) axis.                                                                                                                                                                               |
| `**infinite**` | `Boolean`  | If true, the coordinate space will be unbounded (infinite in both axes)                                                                                                                                                            |

| CRS                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**L.CRS.Earth**`    | Serves as the base for CRS that are global such that they cover the earth. Can only be used as the base for other CRS and cannot be used directly, since it does not have a`code`,`projection`or`transformation`.`distance()`returns meters.                                                                                                                                                                                                                                                                                                                   |
| `**L.CRS.EPSG3395**` | Rarely used by some commercial tile providers. Uses Elliptical Mercator projection.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `**L.CRS.EPSG3857**` | The most common CRS for online maps, used by almost all free and commercial tile providers. Uses Spherical Mercator projection. Set in by default in Map's`crs`option.                                                                                                                                                                                                                                                                                                                                                                                         |
| `**L.CRS.EPSG4326**` | A common CRS among GIS enthusiasts. Uses simple Equirectangular projection.Leaflet 1.0.x complies with theTMS coordinate scheme for EPSG:4326, which is a breaking change from 0.7.x behaviour. If you are using a`TileLayer`with this CRS, ensure that there are two 256x256 pixel tiles covering the whole earth at zoom level zero, and that the tile coordinate origin is (-180,+90), or (-180,-90) for`TileLayer`s withthe`tms`optionset.                                                                                                                 |
| `**L.CRS.Base**`     | Object that defines coordinate reference systems for projecting geographical points into pixel (screen) coordinates and back (and to coordinates in other units forWMSservices). Seespatial reference system.Leaflet defines the most usual CRSs by default. If you want to use a CRS not defined by default, take a look at theProj4Leafletplugin.Note that the CRS instances do not inherit from Leaflet's`Class`object, and can't be instantiated. Also, new classes can't inherit from them, and methods can't be added to them with the`include`function. |
| `**L.CRS.Simple**`   | A simple CRS that maps longitude and latitude into`x`and`y`directly. May be used for maps of flat surfaces (e.g. game maps). Note that the`y`axis should still be inverted (going from bottom to top).`distance()`returns simple euclidean distance.                                                                                                                                                                                                                                                                                                           |

Base class for vector renderer implementations (`SVG`,`Canvas

### Options

### Events

`). Handles the DOM container of the renderer, its bounds, and its zoom animation.

A`Renderer`works as an implicit layer group for all`Path`s - the renderer itself can be added or removed to the map. All paths use a renderer, which can be implicit (the map will decide the type of renderer and use it automatically) or explicit (using the`renderer`option of the path).

Do not use this class directly, use`SVG`and`Canvas`instead.

| Option        | Type     | Default | Description                                                                                                                     |
| ------------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `**padding**` | `Number` | `0.1`   | How much to extend the clip area around the map view (relative to its size) e.g. 0.1 would be 10% of map view in each direction |

▶Options inherited fromLayer

| Option            | Type     | Default         | Description                                                                                                                                                                                   |
| ----------------- | -------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**pane**`        | `String` | `'overlayPane'` | By default the layer will be added to the map'soverlay pane. Overriding this option will cause the layer to be placed on another pane by default.                                             |
| `**attribution**` | `String` | `null`          | String to be shown in the attribution control, e.g. "© OpenStreetMap contributors". It describes the layer data and is often a legal obligation towards copyright holders and tile providers. |

| Event        | Data    | Description                                                                                     |
| ------------ | ------- | ----------------------------------------------------------------------------------------------- |
| `**update**` | `Event` | Fired when the renderer updates its bounds, center and zoom, for example when its map has moved |

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

▶

### Methods

Tooltip events inherited fromLayer

| Event              | Data           | Description                                         |
| ------------------ | -------------- | --------------------------------------------------- |
| `**tooltipopen**`  | `TooltipEvent` | Fired when a tooltip bound to this layer is opened. |
| `**tooltipclose**` | `TooltipEvent` | Fired when a tooltip bound to this layer is closed. |

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
