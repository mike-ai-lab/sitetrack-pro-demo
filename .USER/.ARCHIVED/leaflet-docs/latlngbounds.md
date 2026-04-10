# LatLngBounds

### Usage example

```
var latlng = L.latLng(50.5, 30.5);

```

All Leaflet methods that accept LatLng objects also accept them in a simple Array form and simple object form (unless noted otherwise), so these lines are equivalent:

```
map.panTo([50, 30]);
map.panTo({lng: 30, lat: 50});
map.panTo({lat: 50, lng: 30});
map.panTo(L.latLng(50, 30));

```

Note that`LatLng`does not inherit from Leaflet's`Class`object, which means new classes can't inherit from it, and new methods can't be added to it with the`include`function.

| Factory                                                                    | Description                                                                                                          |
| -------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `**L.latLng**(<Number>*latitude*,<Number>*longitude*,<Number>*altitude?*)` | Creates an object representing a geographical point with the given latitude and longitude (and optionally altitude). |
| `**L.latLng**(<Array>*coords*)`                                            | Expects an array of the form`[Number, Number]`or`[Number, Number, Number]`instead.                                   |
| `**L.latLng**(<Object>*coords*)`                                           | Expects an plain object of the form`{lat: Number, lng: Number}`or`{lat: Number, lng: Number, alt: Number}`instead.   |

| Method                                                   | Returns        | Description                                                                                                                                                                    |
| -------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `**equals**(<LatLng>*otherLatLng*,<Number>*maxMargin?*)` | `Boolean`      | Returns`true`if the given`LatLng`point is at the same position (within a small margin of error). The margin of error can be overridden by setting`maxMargin`to a small number. |
| `**toString**()`                                         | `String`       | Returns a string representation of the point (for debugging purposes).                                                                                                         |
| `**distanceTo**(<LatLng>*otherLatLng*)`                  | `Number`       | Returns the distance (in meters) to the given`LatLng`calculated using theSpherical Law of Cosines.                                                                             |
| `**wrap**()`                                             | `LatLng`       | Returns a new`LatLng`object with the longitude wrapped so it's always between -180 and +180 degrees.                                                                           |
| `**toBounds**(<Number>*sizeInMeters*)`                   | `LatLngBounds` | Returns a new`LatLngBounds`object in which each boundary is`sizeInMeters/2`meters apart from the`LatLng`.                                                                      |

| Property  | Type     | Description                   |
| --------- | -------- | ----------------------------- |
| `**lat**` | `Number` | Latitude in degrees           |
| `**lng**` | `Number` | Longitude in degrees          |
| `**alt**` | `Number` | Altitude in meters (optional) |

Represents a rectangular geographical area on a map.

```
var corner1 = L.latLng(40.712, -74.227),
corner2 = L.latLng(40.774, -74.125),
bounds = L.latLngBounds(corner1, corner2);

```

All Leaflet methods that accept LatLngBounds objects also accept them in a simple Array form (unless noted otherwise), so the bounds example above can be passed like this:

```
map.fitBounds([
	[40.712, -74.227],
	[40.774, -74.125]
]);

```

Caution: if the area crosses the antimeridian (often confused with the International Date Line), you must specify corners

### Creation

### Methods
