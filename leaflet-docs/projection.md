# Projection

| Option         | Type     | Default      | Description                                                                                                                       |
| -------------- | -------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `**position**` | `String` | `'topright'` | The position of the control (one of the map corners). Possible values are`'topleft'`,`'topright'`,`'bottomleft'`or`'bottomright'` |

Classes extending L.Control will inherit the following methods:

| Method                                | Returns       | Description                                                 |
| ------------------------------------- | ------------- | ----------------------------------------------------------- |
| `**getPosition**()`                   | `string`      | Returns the position of the control.                        |
| `**setPosition**(<string>*position*)` | `this`        | Sets the position of the control.                           |
| `**getContainer**()`                  | `HTMLElement` | Returns the HTMLElement that contains the control.          |
| `**addTo**(<Map>*map*)`               | `this`        | Adds the control to the given map.                          |
| `**remove**()`                        | `this`        | Removes the control from the map it is currently active on. |

Extension methodsEvery control should extend from`L.Control`and (re-)implement the following methods.

| Method                     | Returns       | Description                                                                                                                           |
| -------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `**onAdd**(<Map>*map*)`    | `HTMLElement` | Should return the container DOM element for the control and add listeners on relevant map events. Called on`control.addTo(map)`.      |
| `**onRemove**(<Map>*map*)` | ``            | Optional method. Should contain all clean up code that removes the listeners previously added in`onAdd`. Called on`control.remove()`. |

Abstract class for map interaction handlers

| Method          | Returns   | Description                            |
| --------------- | --------- | -------------------------------------- |
| `**enable**()`  | `this`    | Enables the handler                    |
| `**disable**()` | `this`    | Disables the handler                   |
| `**enabled**()` | `Boolean` | Returns`true`if the handler is enabled |

Extension methodsClasses inheriting from`Handler`must implement the two following methods:

| Method              | Returns | Description                                                                          |
| ------------------- | ------- | ------------------------------------------------------------------------------------ |
| `**addHooks**()`    | ``      | Called when the handler is enabled, should add event hooks.                          |
| `**removeHooks**()` | ``      | Called when the handler is disabled, should remove the event hooks added previously. |

There is static function which can be called without instantiating L.Handler:

| Function                               | Returns | Description                                              |
| -------------------------------------- | ------- | -------------------------------------------------------- |
| `**addTo**(<Map>*map*,<String>*name*)` | `this`  | Adds a new Handler to the given map with the given name. |

An object with methods for projecting geographical coordinates of the world onto a flat surface (and back). See

### Methods

### Properties

### Defined projections
