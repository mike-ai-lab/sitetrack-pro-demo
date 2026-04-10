# Bounds

`x`and`y`coordinates in pixels.

```
var point = L.point(200, 300);

```

All Leaflet methods and options that accept`Point`objects also accept them in a simple Array form (unless noted otherwise), so these lines are equivalent:

```
map.panBy([200, 300]);
map.panBy(L.point(200, 300));

```

Note that`Point`does not inherit from Leaflet's`Class`object, which means new classes can't inherit from it, and new methods can't be added to it with the`include`function.

| Factory                                                  | Description                                                                                                             |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `**L.point**(<Number>*x*,<Number>*y*,<Boolean>*round?*)` | Creates a Point object with the given`x`and`y`coordinates. If optional`round`is set to true, rounds the`x`and`y`values. |
| `**L.point**(<Number[]>*coords*)`                        | Expects an array of the form`[x, y]`instead.                                                                            |
| `**L.point**(<Object>*coords*)`                          | Expects a plain object of the form`{x: Number, y: Number}`instead.                                                      |

| Method                                | Returns   | Description                                                                                                                                                    |
| ------------------------------------- | --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `**clone**()`                         | `Point`   | Returns a copy of the current point.                                                                                                                           |
| `**add**(<Point>*otherPoint*)`        | `Point`   | Returns the result of addition of the current and the given points.                                                                                            |
| `**subtract**(<Point>*otherPoint*)`   | `Point`   | Returns the result of subtraction of the given point from the current.                                                                                         |
| `**divideBy**(<Number>*num*)`         | `Point`   | Returns the result of division of the current point by the given number.                                                                                       |
| `**multiplyBy**(<Number>*num*)`       | `Point`   | Returns the result of multiplication of the current point by the given number.                                                                                 |
| `**scaleBy**(<Point>*scale*)`         | `Point`   | Multiply each coordinate of the current point by each coordinate of`scale`. In linear algebra terms, multiply the point by thescaling matrixdefined by`scale`. |
| `**unscaleBy**(<Point>*scale*)`       | `Point`   | Inverse of`scaleBy`. Divide each coordinate of the current point by each coordinate of`scale`.                                                                 |
| `**round**()`                         | `Point`   | Returns a copy of the current point with rounded coordinates.                                                                                                  |
| `**floor**()`                         | `Point`   | Returns a copy of the current point with floored coordinates (rounded down).                                                                                   |
| `**ceil**()`                          | `Point`   | Returns a copy of the current point with ceiled coordinates (rounded up).                                                                                      |
| `**trunc**()`                         | `Point`   | Returns a copy of the current point with truncated coordinates (rounded towards zero).                                                                         |
| `**distanceTo**(<Point>*otherPoint*)` | `Number`  | Returns the cartesian distance between the current and the given points.                                                                                       |
| `**equals**(<Point>*otherPoint*)`     | `Boolean` | Returns`true`if the given point has the same coordinates.                                                                                                      |
| `**contains**(<Point>*otherPoint*)`   | `Boolean` | Returns`true`if both coordinates of the given point are less than the corresponding current point coordinates (in absolute values).                            |
| `**toString**()`                      | `String`  | Returns a string representation of the point for debugging purposes.                                                                                           |

| Property | Type     | Description                   |
| -------- | -------- | ----------------------------- |
| `**x**`  | `Number` | The`x`coordinate of the point |
| `**y**`  | `Number` | The`y`coordinate of the point |

Represents a rectangular area in pixel coordinates.

### Usage example

### Creation

### Methods

### Properties
