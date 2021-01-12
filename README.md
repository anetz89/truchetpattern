# Truchet Pattern

## About

This page visualizes several patterns using the [truchet tiles](https://en.wikipedia.org/wiki/Truchet_tiles) concept.

![example result produced by this project](./docs/result.png "example result produced by this project")

The implementation was inspired by [Christopher Carlson's multi-scale truchet patterns](https://christophercarlson.com/portfolio/multi-scale-truchet-patterns/), which was mentioned in the [Operation Mindfuck #4](https://www.youtube.com/watch?v=ywYBT0xM7so) talk of the Chaos Computer Club #rc3 in 2020.

## Installation

Just clone this repository and open the index.html page in your browser

## Dependencies

This implementation heavily relies on [Leaflet](https://leafletjs.com/), an open-source JavaScript library for mobile-friendly interactive maps. The LICENSE of this project follows Leaflet's BSD 2-Clause License.

## Future plans

- Improve performance, as all tiles (of deeper layers) are drawn, although only the visible ones are necessary.

- Improve performance whenever multiple tiles are selected/removed in the settings (wait before rendering the result instead of instantly rendering and freezing the UI)

- Allow custom transparency patterns next to drawing randomly. This may also solve the issue of "mismatching" tiles, as the tile needs to have a different pattern whenever a smaller tile is next to it ('dot-issue')

- Provide more high resolution images to avoid blurry results when using higher zoomlevels.
