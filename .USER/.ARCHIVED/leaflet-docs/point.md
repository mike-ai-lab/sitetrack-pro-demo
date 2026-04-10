# Point

*outside*the [-180, 180] degrees longitude range.

Note that`LatLngBounds`does not inherit from Leaflet's`Class`object, which means new classes can't inherit from it, and new methods can't be added to it with the`include`function.

| Factory                                                   | Description                                                                                                                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**L.latLngBounds**(<LatLng>*corner1*,<LatLng>*corner2*)` | Creates a`LatLngBounds`object by defining two diagonally opposite corners of the rectangle.                                                                         |
| `**L.latLngBounds**(<LatLng[]>*latlngs*)`                 | Creates a`LatLngBounds`object defined by the geographical points it contains. Very useful for zooming the map to fit a particular set of locations with`fitBounds`. |

| Method                                                         | Returns        | Description                                                                                                                                                                                                                |
| -------------------------------------------------------------- | -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**extend**(<LatLng>*latlng*)`                                 | `this`         | Extend the bounds to contain the given point                                                                                                                                                                               |
| `**extend**(<LatLngBounds>*otherBounds*)`                      | `this`         | Extend the bounds to contain the given bounds                                                                                                                                                                              |
| `**pad**(<Number>*bufferRatio*)`                               | `LatLngBounds` | Returns bounds created by extending or retracting the current bounds by a given ratio in each direction. For example, a ratio of 0.5 extends the bounds by 50% in each direction. Negative values will retract the bounds. |
| `**getCenter**()`                                              | `LatLng`       | Returns the center point of the bounds.                                                                                                                                                                                    |
| `**getSouthWest**()`                                           | `LatLng`       | Returns the south-west point of the bounds.                                                                                                                                                                                |
| `**getNorthEast**()`                                           | `LatLng`       | Returns the north-east point of the bounds.                                                                                                                                                                                |
| `**getNorthWest**()`                                           | `LatLng`       | Returns the north-west point of the bounds.                                                                                                                                                                                |
| `**getSouthEast**()`                                           | `LatLng`       | Returns the south-east point of the bounds.                                                                                                                                                                                |
| `**getWest**()`                                                | `Number`       | Returns the west longitude of the bounds                                                                                                                                                                                   |
| `**getSouth**()`                                               | `Number`       | Returns the south latitude of the bounds                                                                                                                                                                                   |
| `**getEast**()`                                                | `Number`       | Returns the east longitude of the bounds                                                                                                                                                                                   |
| `**getNorth**()`                                               | `Number`       | Returns the north latitude of the bounds                                                                                                                                                                                   |
| `**contains**(<LatLngBounds>*otherBounds*)`                    | `Boolean`      | Returns`true`if the rectangle contains the given one.                                                                                                                                                                      |
| `**contains**(<LatLng>*latlng*)`                               | `Boolean`      | Returns`true`if the rectangle contains the given point.                                                                                                                                                                    |
| `**intersects**(<LatLngBounds>*otherBounds*)`                  | `Boolean`      | Returns`true`if the rectangle intersects the given bounds. Two bounds intersect if they have at least one point in common.                                                                                                 |
| `**overlaps**(<LatLngBounds>*otherBounds*)`                    | `Boolean`      | Returns`true`if the rectangle overlaps the given bounds. Two bounds overlap if their intersection is an area.                                                                                                              |
| `**toBBoxString**()`                                           | `String`       | Returns a string with bounding box coordinates in a 'southwest_lng,southwest_lat,northeast_lng,northeast_lat' format. Useful for sending requests to web services that return geo data.                                    |
| `**equals**(<LatLngBounds>*otherBounds*,<Number>*maxMargin?*)` | `Boolean`      | Returns`true`if the rectangle is equivalent (within a small margin of error) to the given bounds. The margin of error can be overridden by setting`maxMargin`to a small number.                                            |
| `**isValid**()`                                                | `Boolean`      | Returns`true`if the bounds are properly initialized.                                                                                                                                                                       |

Represents a point with

### Usage example

### Creation

### Methods

### Properties
