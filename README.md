`ay-confetti` Web Component
========================

This is a web component for creating a "confetti" animation on your webpage

Usage:
--------------

```
<ay-confetti></ay-confetti>
```

Advanced Usage
--------------

### Fading confetti

By default, the confetti will flutter down until it is all off-screen. If
you prefer it to gradually become transparent as it falls, add the `fading`
attribute to the element:

```
<ay-confetti fading></ay-confetti>
```

### Color customization

The recommended way to control the confetti colours is using CSS variables
as described below. However, the colours can also be specified as
attributes. Any valid CSS colour syntax is permitted.

The confetti will be shown using as many colours as are specified, to a
maximum of 6. If no colours are specified, it will default to 6 bright
primary colours.

Attribute names are `color1` through `color6`. The singular `color` can also
be used to set the `color1` value.

```
<ay-confetti color1="purple" color2="green" color3="blue" color4="yellow" color5="pink" color7="red"></ay-confetti>
```

### Styling

The confetti colours are defined using CSS variables named
`--confetti-color-1` through `--confetti-color-6`.

The confetti will be shown using as many colours as are specified, to a
maximum of 6. If no colours are specified, it will default to 6 bright
primary colours.

Contributing
------------

Contributions of bug reports, feature requests, and pull requests are greatly
appreciated!

Please note that this project is released with a [Contributor Code of
Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to
abide by its terms.


Licence
-------

Released under the [MIT Licence](LICENCE).

Copyright © 2021 – 2023 Ayogo Health Inc.
