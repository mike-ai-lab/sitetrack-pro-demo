# version

Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |
| `**layer**`          | `Object` | **Deprecated.**The same as`propagatedFrom`.                                                                            |

| Property       | Type      | Description                                                   |
| -------------- | --------- | ------------------------------------------------------------- |
| `**center**`   | `LatLng`  | The current center of the map                                 |
| `**zoom**`     | `Number`  | The current zoom level of the map                             |
| `**noUpdate**` | `Boolean` | Whether layers should update their contents due to this event |

▶Properties inherited fromEvent

| Property             | Type     | Description                                                                                                            |
| -------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `**type**`           | `String` | The event type (e.g.`'click'`).                                                                                        |
| `**target**`         | `Object` | The object that fired the event. For propagated events, the last object in the propagation chain that fired the event. |
| `**sourceTarget**`   | `Object` | The object that originally fired the event. For non-propagated events, this will be the same as the`target`.           |
| `**propagatedFrom**` | `Object` | For propagated events, the last object that propagated the event to its event parent.                                  |
| `**layer**`          | `Object` | **Deprecated.**The same as`propagatedFrom`.                                                                            |

Global switches are created for rare cases and generally make Leaflet to not detect a particular browser feature even if it's there. You need to set the switch as a global variable to true before including Leaflet on the page, like this:

```
<script>L_NO_TOUCH = true;</script>
<script src="leaflet.js"></script>

```

| Switch         | Description                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `L_NO_TOUCH`   | Forces Leaflet to not use touch events even if it detects them.                                                                                                  |
| `L_DISABLE_3D` | Forces Leaflet to not use hardware-accelerated CSS 3D transforms for positioning (which may cause glitches in some rare environments) even if they're supported. |

This method restores the`L`global variable to the original value it had before Leaflet inclusion, and returns the real Leaflet namespace so you can put it elsewhere, like this:

```
<script src='libs/l.js'>
<!-- L points to some other library -->

<script src='leaflet.js'>
<!-- you include Leaflet, it replaces the L variable to Leaflet namespace -->

<script>
var Leaflet = L.noConflict();
// now L points to that other library again, and you can use Leaflet.Map etc.
</script>

```

A constant that represents the Leaflet version in use.

```
L.version; // contains "1.0.0" (or whatever version is currently in use)

```
