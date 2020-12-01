# Bootstrap cheat sheet

* [CSS](#css)
* [JS](#js)
* [Browsers](#browsers)
* [Utilities](#utilities)
  + [Layout utilities](#layout-utilities)
  + [Typography utilities](#typography-utilities)
  + [Color utilities](#color-utilities)
  + [Other utilities](#other-utilities)
* [Components](#components)



## CSS


### Box-sizing

```scss
//global
*, *::before, *::after { box-sizing: border-box; }

//override
.selector-for-some-widget { box-sizing: content-box; }
```


### Headings and paragraphs

* All heading elements — e.g., ``<h1>`` — and ``<p>`` are reset to have their ``margin-top`` removed
* Headings have ``margin-bottom: .5rem`` added and paragraphs ``margin-bottom: 1rem`` for easy spacing


### Lists

* All lists — ``<ul>``, ``<ol>``, and ``<dl>`` — have their ``margin-top`` removed and a ``margin-bottom: 1rem``
* Nested lists have no ``margin-bottom``


### Misc

* ``<address>`` element is updated to reset the browser default ``font-style`` from italic to normal. ``line-height`` is also now inherited, and ``margin-bottom: 1rem`` has been added (so it behavies like ``<p>``, generally)
* Various form elements have been rebooted

> :collision:
> * ***Native ``date`` and ``time`` input types are NOT supported by all IE and Safari***
> * ***``position: sticky`` (Edge 12+) is tricky: https://medium.com/@elad/css-position-sticky-how-it-really-works-54cd01dc2d46***
> * ***CSS ``--variables`` does NOT work in IE and old Edge, supported in Edge 16+***
> * ***``inherit`` does NOT work on IE < 8***


### Grid

* In a grid layout, **CONTENT MUST BE PLACED IN COLUMNS** and **ONLY COLUMNS** may be **IMMEDIATE** children of ``row``s!
* If **more than 12 column**s are placed within a single row, **each group of extra columns will, as one unit, wrap** onto a new line.
* To nest your content with the default grid, **add a new ``.row`` and set of ``.col-*`` columns** within an existing ``.col-*`` column

```
|<-- 1/2 gutter padding -->|            .container            |<-- 1/2 gutter padding -->|
|<--- 1/2 gutter negative margin        .row              1/2 gutter negative margin --->|
|<-- 1/2 gutter padding -->|            .col                  |<-- 1/2 gutter padding -->|
                           |<       ... content ...          >|
```

#### ``.row.no-gutters``

```
|<-- 1/2 gutter padding -->|            .container            |<-- 1/2 gutter padding -->|
|<--- 1/2 gutter negative margin        .row.no-gutters   1/2 gutter negative margin --->|
|       no padding                      .col                            no padding       |
|<                                  ... content ...                                     >|
```


### Z-indexes

```scss
$zindex-dropdown:          1000;
$zindex-sticky:            1020;
$zindex-fixed:             1030;
$zindex-modal-backdrop:    1040;
$zindex-modal:             1050;
$zindex-popover:           1060;
$zindex-tooltip:           1070;
```


### Modules

* **Bootstrap functions** are required to parse variables ``node_modules/bootstrap/scss/functions`` (5 kB) :heavy_check_mark:
* **Custom Bootstrap variables** are in <a href="./_variables.scss"><code>./variables</code></a> (cca 11 kB) :heavy_check_mark:
  + It also loads **original Bootstrap variables** ``node_modules/bootstrap/scss/variables`` (48 kB) :heavy_check_mark:
* See [``/src/scss/bootstrap/_bootstrap.scss``](./_bootstrap.scss)

<table>
<tr><th> # </th><th> Module </th><th> Purpose </th><th> <a href="./_bootstrap.scss" title="src/scss/bootstrap/_bootstrap.scss"><code>@import</code> path</a> </th><th> SCSS size </th><th> JRkit default </th></tr>
<tr><td>0.1</td><td> <b>Mixins</b> </td><td> mandatory module </td><td> <code>node_modules/bootstrap/scss/mixins</code> </td><td> 32 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>0.2</td><td> <b>Root</b> </td><td> fills <code>:root</code> CSS variables </td><td> <code>node_modules/bootstrap/scss/root</code> </td><td> 1 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>0.3</td><td> <b>Reboot</b> </td><td> mandatory module, <a href="https://getbootstrap.com/docs/4.5/content/reboot/">CSS reset</a> </td><td> <code>node_modules/bootstrap/scss/reboot</code> </td><td> 12 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>1</td><td> <b>Type</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/content/typography/">content / typography</a> </td><td> <code>node_modules/bootstrap/scss/type</code> </td><td> 3 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>2</td><td> <b>Images</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/content/images/">content / images</a> </td><td> <code>node_modules/bootstrap/scss/images</code> </td><td> 2 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>3</td><td> <b>Code</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/content/code/">content / code</a> </td><td> <code>node_modules/bootstrap/scss/code</code> </td><td> 1 kB </td><td bgcolor=red> :no_entry: NO </td></tr>
<tr><td>4</td><td> <b>Grid</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/layout/grid/">layout / grid</a> </td><td> <code>node_modules/bootstrap/scss/grid</code> </td><td> 2 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>5</td><td> <b>Tables</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/content/tables/">content / tables</a> </td><td> <code>node_modules/bootstrap/scss/tables</code> </td><td> 4 kB </td><td> :no_entry: NO </td></tr>
<tr><td>6</td><td> <b>Forms</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/forms/">components / forms</a> </td><td> <code>node_modules/bootstrap/scss/forms</code> </td><td> 10 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>7</td><td> <b>Buttons</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/buttons/">components / buttons</a> </td><td> <code>node_modules/bootstrap/scss/buttons</code> </td><td> 3 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>8</td><td> <b>Transitions</b> </td><td> global / transitions </td><td> <code>node_modules/bootstrap/scss/transitions</code> </td><td> 1 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>9</td><td> <b>Dropdowns</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/dropdowns/">components / dropdowns</a> </td><td> <code>node_modules/bootstrap/scss/dropdown</code> </td><td> 5 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>10</td><td> <b>Button group</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/button-group/">series of single buttons</a> </td><td> <code>node_modules/bootstrap/scss/button-group</code> </td><td> 4 kB </td><td> :no_entry: NO </td></tr>
<tr><td>11</td><td> <b>Input group</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/input-group/">grouping inputs with buttons etc.</a> </td><td> <code>node_modules/bootstrap/scss/input-group</code> </td><td> 6 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>12</td><td> <b>Custom forms</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/forms/#custom-forms">custom checkbox, radio, file etc.</a> </td><td> <code>node_modules/bootstrap/scss/custom-forms</code> </td><td> 16 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>13</td><td> <b>Navs</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/navs/">components / navigations, tabs</a> </td><td> <code>node_modules/bootstrap/scss/nav</code> </td><td> 3 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>14</td><td> <b>Navbar</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/navbar/">navbar with dropdowns etc.</a> </td><td> <code>node_modules/bootstrap/scss/navbar</code> </td><td> 8 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>15</td><td> <b>Cards</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/card/">components / cards</a> </td><td> <code>node_modules/bootstrap/scss/card</code> </td><td> 6 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>16</td><td> <b>Breadcrumb</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/breadcrumb/">components / breadcrumbs</a> </td><td> <code>node_modules/bootstrap/scss/breadcrumb</code> </td><td> 2 kB </td><td> :no_entry: NO </td></tr>
<tr><td>17</td><td> <b>Pagination</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/pagination/">components / pagination</a> </td><td> <code>node_modules/bootstrap/scss/pagination</code> </td><td> 2 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>18</td><td> <b>Badges</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/badge/">components / badges</a> </td><td> <code>node_modules/bootstrap/scss/badge</code> </td><td> 2 kB </td><td> :no_entry: NO </td></tr>
<tr><td>19</td><td> <b>Jumbotron</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/jumbotron/">components / jumbotron</a> </td><td> <code>node_modules/bootstrap/scss/jumbotron</code> </td><td> 1 kB </td><td> :no_entry: NO </td></tr>
<tr><td>20</td><td> <b>Alerts</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/alerts/">components / alerts</a> </td><td> <code>node_modules/bootstrap/scss/alert</code> </td><td> 2 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>21</td><td> <b>Progress</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/progress/">components / progress bars</a> </td><td> <code>node_modules/bootstrap/scss/progress</code> </td><td> 2 kB </td><td> :no_entry: NO </td></tr>
<tr><td>22</td><td> <b>Media object</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/media-object/">components / media object</a> </td><td> <code>node_modules/bootstrap/scss/media</code> </td><td> 1 kB </td><td> :no_entry: NO </td></tr>
<tr><td>23</td><td> <b>List group</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/list-group/">components / list groups</a> </td><td> <code>node_modules/bootstrap/scss/list-group</code> </td><td> 4 kB </td><td> :no_entry: NO </td></tr>
<tr><td>24</td><td> <b>Close</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/alerts/#dismissing">alerts dismissing</a> </td><td> <code>node_modules/bootstrap/scss/close</code> </td><td> 1 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>25</td><td> <b>Toasts</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/toasts/">components / toasts</a> </td><td> <code>node_modules/bootstrap/scss/toasts</code> </td><td> 2 kB </td><td> :no_entry: NO </td></tr>
<tr><td>26</td><td> <b>Modal</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/modal/">components / modal</a> </td><td> <code>node_modules/bootstrap/scss/modal</code> </td><td> 7 kB </td><td> :no_entry: NO </td></tr>
<tr><td>27</td><td> <b>Tooltips</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/tooltips/">components / tooltips</a> </td><td> <code>node_modules/bootstrap/scss/tooltip</code> </td><td> 3 kB </td><td> :no_entry: NO </td></tr>
<tr><td>28</td><td> <b>Popovers</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/popovers/">components / popovers</a> </td><td> <code>node_modules/bootstrap/scss/popover</code> </td><td> 5 kB </td><td> :no_entry: NO </td></tr>
<tr><td>29</td><td> <b>Carousel</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/carousel/">components / carousel</a> </td><td> <code>node_modules/bootstrap/scss/carousel</code> </td><td> 5 kB </td><td> :no_entry: NO </td></tr>
<tr><td>31</td><td> <b>Spinners</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/components/spinners/">components / spinners</a> </td><td> <code>node_modules/bootstrap/scss/spinners</code> </td><td> 2 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>31</td><td> <b>Utilities</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/utilities/borders/">global utilities</a> </td><td> <code>node_modules/bootstrap/scss/utilities</code> </td><td> 13 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>32</td><td> <b>Print</b> </td><td> <a href="https://getbootstrap.com/docs/4.5/getting-started/browsers-devices/#printing">global / printing</a> </td><td> <code>node_modules/bootstrap/scss/print</code> </td><td> 3 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
</table>

----



## JS

* Using **jQuery slim** (229 kB) :heavy_check_mark:
* ``bootstrap.bundle.js`` and ``bootstrap.bundle.min.js`` include **Popper**, but not jQuery
* Loading order: ``[jq, popper, bs]`` or ``[popper, jq, bs]``
* What requires JS (11 modules + required ``bootstrap/js/dist/util`` (6 kB) before) :heavy_check_mark:
* See [``/src/js/bootstrap/bootstrap.js``](./../../js/bootstrap/bootstrap.js)

<table>
<tr><th> # </th><th> Module </th><th> Purpose/Requires </th><th> <a href="./../../js/bootstrap/bootstrap.js" title="src/js/bootstrap/bootstrap.js"><code>import</code> path</a> </th><th> RAW size </th><th> JRkit default </th></tr>
<tr><td>1</td><td> <b>Alerts</b> </td><td> dismissing </td><td> <code>bootstrap/js/dist/alert</code> </td><td> 4 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td>2</td><td> <b>Buttons</b> </td><td> toggling checkbox/radio styled as buttons </td><td> <code>bootstrap/js/dist/button</code> </td><td> 7 kB </td><td> :no_entry: NO </td></tr>
<tr><td>3</td><td> <b>Carousel</b> </td><td> all carousel functions </td><td> <code>bootstrap/js/dist/carousel</code> </td><td> 17 kB </td><td> :no_entry: NO </td></tr>
<tr><td>4</td><td> <b>Collapse</b> </td><td> toggling visibility of content (required by Navbar) </td><td> <code>bootstrap/js/dist/collapse</code> </td><td> 11 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr>
<tr><td rowspan=2>5</td><td rowspan=2> <b>Dropdowns</b> </td><td> displaying and positioning </td><td> <code>bootstrap/js/dist/dropdown</code> </td><td> 15 kB </td><td> :heavy_check_mark: <b>YES</b> </td></tr><tr><!-- rowspans --><td> requires <b>Popper</b> (not in Navbar) </td><td> <code>popper.js/dist/esm/popper</code> </td><td colspan=2> 87 kB </td></tr>
<tr><td>6</td><td> <b>Modals</b> </td><td> all modals functions </td><td> <code>bootstrap/js/dist/modal</code> </td><td> 18 kB </td><td> :no_entry: NO </td></tr>
<tr><td rowspan=2>7</td><td rowspan=2> <b>Tooltips</b> </td><td> displaying and positioning </td><td> <code>bootstrap/js/dist/tooltip</code> </td><td> 19 kB </td><td> :no_entry: NO </td></tr><tr><!-- rowspans --><td> requires <b>Popper</b> </td><td> <code>popper.js/dist/esm/popper</code> </td><td colspan=2> 87 kB </td></tr>
<tr><td rowspan=3>8</td><td rowspan=3> <b>Popovers</b> </td><td> displaying and positioning </td><td> <code>bootstrap/js/dist/popover</code> </td><td> 5 kB </td><td> :no_entry: NO </td></tr><tr><!-- rowspans --><td> requires <b>Tooltips</b> </td><td> <code>bootstrap/js/dist/tooltip</code> </td><td colspan=2> 26 kB </td></tr><tr><!-- rowspans --><td> requires <b>Popper</b> </td><td> <code>popper.js/dist/esm/popper</code> </td><td colspan=2> 87 kB </td></tr>
<tr><td>9</td><td> <b>Scrollspy</b> </td><td> for scroll behavior </td><td> <code>bootstrap/js/dist/scrollspy</code> </td><td> 9 kB </td><td> :no_entry: NO </td></tr>
<tr><td>10</td><td> <b>Navs &rarr; Tabs</b> </td><td> tabs toggle </td><td> <code>bootstrap/js/dist/tab</code> </td><td> 7 kB </td><td> :no_entry: NO </td></tr>
<tr><td>11</td><td> <b>Toasts</b> </td><td> displaying and dismissing </td><td> <code>bootstrap/js/dist/toast</code> </td><td> 6 kB </td><td> :no_entry: NO </td></tr>
</table>

* Be sure to only use one set of data attributes on a single element (e.g., you cannot trigger a tooltip and modal from the same button)

> :collision: <br>
> ***Bootstrap’s plugins don’t fall back particularly gracefully when JavaScript is disabled. If you care about the user experience in this
> case, use ``<noscript>`` to explain the situation (and how to re-enable JavaScript) to your users, and/or add your own custom fallbacks. The issue includes:***
> * ***Collapse***
> * ***Dropdowns***
> * ***Modals***
> * ***Tabs***

----


## Browsers

* We support Internet Explorer 10-11 / Microsoft Edge

```javascript
>= 1%
last 1 major version
not dead
Chrome >= 45
Firefox >= 38
Edge >= 12
Explorer >= 10
iOS >= 9
Safari >= 9
Android >= 4.4
Opera >= 30
```

* Some limitations: https://getbootstrap.com/docs/4.5/getting-started/browsers-devices/#modals-and-dropdowns-on-mobile
* Sticky ``:hover``/``:focus`` on iOS shim: https://getbootstrap.com/docs/4.5/getting-started/browsers-devices/#sticky-hoverfocus-on-ios

----



## Utilities

### Layout utilities

#### Grid

##### Containers and wrappers

| Class | Optional variable part | Purpose
| - | - | -
| ``.container``                | | which sets a ``max-width`` at each responsive breakpoint
| ``.container-fluid``          | | which is ``width: 100%`` at all breakpoints
| ``.container-{breakpoint}``   | ``-sm`` ``-md`` ``-lg`` ``-xl`` | which is fluid until the specified breakpoint
| ``.row``                         | | columns direct parent
| ``.row.no-gutters``              | | removes padding from direct child ``>`` columns

##### :collision: Responsive SASS

```scss
@include media-breakpoint-up(sm) {}          // -> @media (min-width: 576px) {}
@include media-breakpoint-up(md) {}          // -> @media (min-width: 768px) {}
@include media-breakpoint-up(lg) {}          // -> @media (min-width: 992px) {}
@include media-breakpoint-up(xl) {}          // -> @media (min-width: 1200px) {}

@include media-breakpoint-between(md,xl) {}  // -> @media (min-width: 768px) and (max-width: 1199.98px) {}

@include media-breakpoint-only(lg) {}        // -> @media (min-width: 992px) and (max-width: 1199.98px) {}

@include media-breakpoint-down(sm) {}        // -> @media (max-width: 767.98px) {}
@include media-breakpoint-down(xs) {}        // -> @media (max-width: 575.98px) {}

//example
@include media-breakpoint-up(sm) {
  .some-class { ... }
}
```

##### Columns

| Class | Optional variable part | Purpose
| - | - | -
| ``.col``                         | | like ``col-xs-12`` (max columns number)
| ``.col-{breakpoint}``            | ``-sm`` ``-md`` ``-lg`` ``-xl`` | like ``col-{breakpoint}-12`` (max columns number)
| ``.col-*``                       | ``1`` – max columns number | span over columns
| ``.col-{breakpoint}-*``          | ``1`` – max columns number, ``-sm`` ``-md`` ``-lg`` ``-xl`` | responsive span over columns
| ``.col-{breakpoint}-auto``       | ``-sm`` ``-md`` ``-lg`` ``-xl`` | sizes column to the natural **width of its content**
| ``.row.row-cols-*``              | ``1`` – max columns number | shortcut for all columns (``col-*`` has priority)
| ``.row.row-cols-{breakpoint}-*`` | ``-sm`` ``-md`` ``-lg`` ``-xl``, columns number | responsive shortcut for all columns

#### Alignment

| Class | Optional variable part | Purpose
| - | - | -
| ``.align-{items\|self}-{keyword}``               | ``-start`` ``-center`` ``-end`` ``-baseline`` ``-stretch`` | [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) vertical alignment
| ``.align-{items\|self}-{breakpoint}-{keyword}``  | ``-start`` ``-center`` ``-end`` ``-baseline`` ``-stretch`` | responsive vertical alignment
| ``.align-content-{keyword}``               | ``-start`` ``-center`` ``-end`` ``-around`` ``-between`` ``-stretch`` | [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) vertical alignment
| ``.align-content-{breakpoint}-{keyword}``      | ``-start`` ``-center`` ``-end`` ``-around`` ``-between`` ``-stretch`` | responsive vertical alignment
| ``.justify-content-{keyword}``     | ``-start`` ``-center`` ``-end`` ``-around`` ``-between`` | [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) horizontal justify
| ``.justify-content-{breakpoint}-{keyword}``     | ``-start`` ``-center`` ``-end`` ``-around`` ``-between`` | responsive horizontal justify
| ``.float-{keyword}``              | ``-left`` ``-right`` ``-none`` | floats
| ``.float-{breakpoint}-{keyword}`` | dtto | responsive floats
| ``.clearfix`` |  | clearfix

> :collision: <br>
> Internet Explorer 10-11 do not support vertical alignment of flex items when the flex container has a ``min-height``

#### Offsetting and ordering

| Class | Optional variable part | Purpose
| - | - | -
| ``.offset-*``                         | number from ``0`` to ``(cols number) - 1`` | moves columns to the right
| ``.offset-{breakpoint}-*``            | dtto | dtto responsive
| ``.order-*``                         | number from ``1`` through ``12`` | [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) visual ordering
| ``.order-{breakpoint}-*``            | dtto | responsive [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) visual ordering

#### Spacing

* The classes are named using the format ``{property}{sides}-{size}`` for ``xs``
* ... and ``{property}{sides}-{breakpoint}-{size}`` for ``sm``, ``md``, ``lg``, and ``xl``
* Sizes are customized via custom Bootstrap variables in <a href="./_variables.scss"><code>./variables</code></a>

```scss
$spacer: 1rem;
$spacers: (
   0: 0,
   1: ($spacer *  0.25),  2: ($spacer *  0.50),  3: ($spacer *  0.75),  4: ($spacer *  1.00),  5: ($spacer *  1.25),  6: ($spacer *  1.50),
   7: ($spacer *  2.00),  8: ($spacer *  2.50),  9: ($spacer *  3.00),
  -1: ($spacer * -0.25), -2: ($spacer * -0.50), -3: ($spacer * -0.75), -4: ($spacer * -1.00), -5: ($spacer * -1.50), -6: ($spacer * -1.25),
  -7: ($spacer * -2.00), -8: ($spacer * -2.50), -9: ($spacer * -3.00),
);
```

| Class | Optional variable part | Purpose
| - | - | -
| ``.m-{size}``                         | number from ``-9`` to ``9`` | margins
| ``.m-{breakpoint}-{size}``            | dtto | responsive margins
| ``.m{sides}-{size}``                  | ``t-`` ``r-`` ``b-`` ``l-`` ``x-`` ``y-``, number | top, right, bottom, left, x-axe and y-axe margins
| ``.m{sides}-{breakpoint}-{size}``     | dtto | dtto responsive margins
| ``.p-{size}``                         | number from ``-9`` to ``9`` | paddings
| ``.p-{breakpoint}-{size}``            | dtto | responsive paddings
| ``.p{sides}-{size}``                  | ``t-`` ``r-`` ``b-`` ``l-`` ``x-`` ``y-``, number | top, right, bottom, left, x-axe and y-axe paddings
| ``.p{sides}-{breakpoint}-{size}``     | dtto | dtto responsive paddings

#### Sizing

| Class | Optional variable part | Purpose
| - | - | -
| ``.w-{size}``     | ``-25`` ``-50`` ``-75`` ``-100`` | width relative to the parent
| ``.w-auto``     | – |
| ``.h-{size}``     | ``-25`` ``-50`` ``-75`` ``-100`` | height relative to the parent
| ``.h-auto``     | – |
| ``.mw-100``     | – | ``max-width: 100%;``
| ``.mh-100``     | – | ``max-height: 100%;``
| ``.vw-100``     | – | 100% width of viewport
| ``.vh-100``     | – | 100% height of viewport
| ``.min-vw-100``     | – | ``min-width: 100vw;``
| ``.min-vh-100``     | – | ``min-height: 100vh;``

#### Borders

| Class | Optional variable part | Purpose
| - | - | -
| ``.border``                | –                                         | ``border: 1px solid #dee2e6 !important`` all sides
| ``.border-{side}``     | ``-top`` ``-right`` ``-bottom`` ``-left`` | specific sides
| ``.border-0``             | –                                         | removes all borders
| ``.border-{side}-0``   | ``-top`` ``-right`` ``-bottom`` ``-left`` | removes all borders on specific sides
| ``.rounded``            | –                                          | ``border-radius: .25rem !important;`` all corners
| ``.rounded-{side}``     | ``-top`` ``-right`` ``-bottom`` ``-left`` | rounded corners for specific sides
| ``.rounded-circle``  | –                                          | ``border-radius: 50% !important;`` creates ellipse
| ``.rounded-pill``  | –                                          | ``border-radius: 50rem !important;``
| ``.rounded-sm``  | –                                          | ``border-radius: .2rem !important;``
| ``.rounded-lg``  | –                                          | ``border-radius: .3rem !important;``
| ``.rounded-0``  | –                                          | ``border-radius: 0 !important;``

#### Display

As such, the classes are named using the format:

* ``.d-{value}`` for ``xs``
* ``.d-{breakpoint}-{value}`` for ``sm``, ``md``, ``lg``, and ``xl``
* ``.d-print-{value}`` for print

| Class | Optional variable part
| - | -
| ``.d-{value}``                   | ``-none`` ``-inline`` ``-inline-block`` ``-block`` ``-table`` ``-table-cell`` ``-table-row`` ``-flex`` ``-inline-flex``
| ``.d-{breakpoint}-{value}``      | dtto
| ``.d-print-{value}``             | dtto

#### Flexbox

| Class | Optional variable part | Purpose
| - | - | -
| ``.flex-{keyword}``     | ``-row`` ``-row-reverse`` ``-column`` ``-column-reverse`` | [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) directions
| ``.flex-{breakpoint}-{keyword}``              | dtto | dtto responsive
| ``.flex-fill``                                | –  | [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) widths
| ``.flex-{breakpoint}-fill``                   | –  | dtto responsive
| ``.flex-{grow\|shrink}-{0\|1}``               | –  | toggle [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) widths
| ``.flex-{breakpoint}-{grow\|shrink}-{0\|1}``  | –  | dtto responsive
| ``.flex-{keyword}``               | ``-nowrap`` ``-wrap`` ``-wrap-reverse`` | [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) wrapping
| ``.flex-{breakpoint}-{keyword}``  | dtto | dtto responsive

#### Position

| Class | Optional variable part | Purpose
| - | - | -
| ``.position-{value}``     | ``-static`` ``-relative`` ``-absolute`` ``-fixed`` ``-sticky`` | common values
| ``.fixed-top``     | – | top of the viewport, from edge to edge
| ``.fixed-bottom``     | – | bottom of the viewport, from edge to edge
| ``.sticky-top``     | – | wrapped in ``@supports`` query

> :collision:
> * ***IE11 and IE10 will render ``position: sticky`` as ``position: relative``***
> * ***``position: sticky`` (Edge 12+) is tricky: https://medium.com/@elad/css-position-sticky-how-it-really-works-54cd01dc2d46***

#### Visibility

| Class | Purpose
| - | -
| ``.visible``    | has ``visibility: visible !important;``
| ``.invisible``    | has ``visibility: hidden !important;``
| ``.overflow-auto`` | ``overflow: auto !important;``, not responsive
| ``.overflow-hidden`` | ``overflow: hidden !important;``, not responsive
| ``.sr-only``    | hidden from all devices except screen readers
| ``.sr-only-focusable``    | shown again when focused

> :collision: <br>
> Use ``.sr-only.sr-only-focusable`` for skiplinks


### Typography utilities

#### Text

| Class | Optional variable part | Purpose
| - | - | -
| ``.text-{keyword}``     | ``-justify`` ``-left`` ``-center`` ``-right`` |
| ``.text-{breakpoint}-{keyword}``     | dtto | responsive
| ``.text-wrap``     | – | ``white-space: normal !important;``
| ``.text-nowrap``     | – | ``white-space: nowrap !important;``
| ``.text-truncate``     | – | ellipsis
| ``.text-break``     | – | ``word-break`` & ``overflow-wrap`` to ``break-word``
| ``.text-{keyword}``     |  ``-lowercase`` ``-uppercase`` ``-capitalize`` |
| ``.font-weight-{keyword}``     |  ``-bold`` ``-bolder`` ``-normal`` ``-light`` ``-lighter`` | ``700``, ``bolder``, ``400``, ``300``, ``lighter``
| ``.font-italic``     | – |
| ``.text-monospace``     | – |  to ``$font-family-monospace`` value
| ``.text-reset``     | – |  ``color: inherit !important``
| ``.text-decoration-none``     | – |  ``text-decoration: none !important``

#### Links

| Class | Purpose
| - | -
| ``.stretched-link``     | link stretched via its ``::after`` over parent

#### Text selection

| Class | Purpose
| - | -
| ``.user-select-all``     | sets ``user-select: all !important;``
| ``.user-select-none``    | sets ``user-select: none!important;``
| ``.user-select-auto``    | resets default select behavior


### Color utilities

#### Background colors

| Class | Optional variable part | Purpose
| - | - | -
| ``.bg-{color}``     | colors from ``$theme-colors`` map |
| ``.bg-transparent``     | – | ``background-color: transparent !important;``

#### Foreground (text) colors

| Class | Optional variable part | Purpose
| - | - | -
| ``.text-{color}``     | colors from ``$theme-colors`` map  |
| ``.text-body``     | – | uses color from ``$body-color``
| ``.text-muted``     | – | uses ``$gray-600`` color

> :collision: <br>
> * In **JRkit**, all custom colors from ``$colors`` map are also used for utilities
> * All ``.text-{color}`` except ``-white`` and ``-muted`` use ``darken(${color}, 15%)`` for ``link:hover`` and ``link:focus``
> * ``link:focus`` does not apply ``text-decoration``


### Other utilities

#### Image replacement

| Class |  Purpose
| - | -
| ``.text-hide``     | sets text as ``0px`` and ``transparent``

#### Embeds

* Rules are directly applied to ``<iframe>``, ``<embed>``, ``<video>``, and ``<object>`` elements; optionally use an explicit descendant class ``.embed-responsive-item`` when you want to match the styling for other attributes.
* Pro-Tip! You don’t need to include ``frameborder="0"`` in your <iframe>s as we override that for you.

```html
<!-- example -->

<div class="embed-responsive embed-responsive-16by9">
  <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
</div>
````

| Class | Optional variable part  | Purpose
| - | - | -
| ``.embed-responsive``     | –  | 100% block with ``overflow: hidden;``
| ``.embed-responsive-{ratio}``     | ``-21by9`` ``-16by9`` ``-4by3`` ``-1by1``  | sets ratio using ``padding-top``
| ``.embed-responsive-item``     | –  | absolute positioned over parent

Ratios are from map ``$embed-responsive-aspect-ratios``:

```scss
$embed-responsive-aspect-ratios: (
  (21 9),
  (16 9),
  (4 3),
  (1 1)
) !default;
```

#### Close icon

```html
<!-- example -->

<button type="button" class="close" aria-label="Close">
  <span aria-hidden="true">&times;</span>
</button>
```

#### Shadows

| Class | Optional variable part
| - | -
| ``.shadow``     |
| ``.shadow-{size}``     | ``-sm``  ``-lg``
| ``.shadow-none``     |

Shadow sizes are in <a href="./_variables.scss"><code>./variables</code></a>


## Components

### :heavy_check_mark: Alerts

| Class | Optional variable part  | Purpose
| - | - | -
| ``.alert.alert-{color}``     | colors from ``$theme-colors`` map  |
| ``.alert-link``     | –  | bold link matching to alert
| ``.alert-heading``     | –  | heading matching to alert
| ``.alert-dismissible``     | –  | enables [close](#close-icon) button with ``data-dismiss="alert"`` inside


### :no_entry: Badges

| Class | Optional variable part  | Purpose
| - | - | -
| ``.badge.badge-{color}``     | colors from ``$theme-colors`` map  |
| ``.badge-pill``     |   |  badges more rounded


### :no_entry: Breadcrumb

```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item active" aria-current="page">Library</li>
  </ol>
</nav>
```

```scss
//changing the separator
$breadcrumb-divider: quote(">");
$breadcrumb-divider: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGQ9Ik0yLjUgMEwxIDEuNSAzLjUgNCAxIDYuNSAyLjUgOGw0LTQtNC00eiIgZmlsbD0iY3VycmVudENvbG9yIi8+PC9zdmc+);
$breadcrumb-divider: none;
```


### :heavy_check_mark: Buttons

| Class | Optional variable part  | Purpose
| - | - | -
| ``.btn.btn-{color}``     | colors from ``$theme-colors`` map  |
| ``.btn.btn-outline-{color}``     | dtto  | outline buttons
| ``.btn-{size}``     | ``-lg`` ``-sm``  | sizing
| ``.btn-block``     | –  | block level button
| ``.active``     | –  | active state
| ``<button disabled aria-disabled="true" tabindex="-1" >``     | –  | disabled state

> :collision: <br>
> * If you don’t want the button text to wrap, you can add the ``.text-nowrap`` class to the button

#### :no_entry: Button group

```html
<!-- instead of applying button sizing classes to every button, use .btn-group-{size} -->
<div class="btn-group btn-group-lg btn-group-vertical" role="group" aria-label="Switch position">
  <button type="button" class="btn btn-primary">Top</button>
  <button type="button" class="btn btn-primary">Middle</button>
  <button type="button" class="btn btn-primary">Bottom</button>
</div>
```


### :heavy_check_mark: Cards

* @see https://getbootstrap.com/docs/4.5/components/card/
* Example: https://codepen.io/honza108/pen/QWELmGL

```html
<!-- just quick example, @see https://getbootstrap.com/docs/4.5/components/card/ -->
<div class="card">
  <img src="https://via.placeholder.com/360x200" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="card-link">Card link</a>
  </div>
</div>
```


### :no_entry: Carousel
Not used


### :heavy_check_mark: Collapse (JS module)

* @see https://getbootstrap.com/docs/4.5/components/collapse/
* Example: https://codepen.io/honza108/pen/zYBOWNN

```html
<a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">Link with href</a>
<button class="btn btn-primary" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">Button with data-target</button>
<div class="collapse" id="collapseExample">
  <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.</p>
</div>
```


### :heavy_check_mark: Dropdowns

* @see https://getbootstrap.com/docs/4.5/components/dropdowns/
* Example: https://codepen.io/honza108/pen/OJXLvJB

```html
<div class="dropdown">
  <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown link</a>
  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink" style="max-width:20rem">
    <h6 class="dropdown-header">Dropdown header</h6>
    <!-- you’ll likely need additional sizing styles to constrain the menu width -->
    <p class="text-muted pl-4 pr-4 mb-1">Some example text that's free-flowing within the dropdown menu.</p>
    <a class="dropdown-item" href="#">Action</a>
    <a class="dropdown-item active" href="#">Another action</a>
    <div class="dropdown-divider"></div>
    <span class="dropdown-item-text">Dropdown item text</span>
  </div>
</div>
```

| Class | Optional variable part  | Purpose
| - | -  | -
| ``<div class="{direction}">``     | ``dropup`` ``dropright`` ``dropleft``   |
| ``.dropdown-menu.dropdown-menu-right``     | –   | aligned from right
| ``.dropdown-menu.dropdown-menu-{breakpoint}-right``     | ``-sm`` ``-md`` ``-lg`` ``-xl``   | responsive aligned from right
| ``.dropdown-menu.dropdown-menu-{breakpoint}-left``     | dtto   | responsive aligned from left
| ``.dropdown-item-text``     | –   | non-interactive dropdown item
| ``.dropdown-item.active``     | –   | active item
| ``.dropdown-item.disabled``     | –   | disabled item


### :heavy_check_mark: Navbar

* @see https://getbootstrap.com/docs/4.5/components/navbar/
* Example: https://codepen.io/honza108/pen/XWKrEVR

```html
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <a class="navbar-brand" role="banner" href="/" accesskey="2" rel="home" title="Na úvodní stránku">
      <img src="https://via.placeholder.com/400x200" alt="Brand" class="img-fluid" width="100" height="50">
    </a>
    <button class="navbar-toggler" data-toggle="collapse" data-target="#nbColl" aria-expanded="false" aria-label="Zobrazit menu">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="nbColl">
      <form class="input-group">
        <input type="search" placeholder="Hledání zde" aria-label="Hledání" class="form-control" id="s">
        <div class="input-group-append"><button type="submit" class="btn btn-secondary">Hledej</button></div>
      </form>
      <nav role="navigation" id="navigation">
        <ul class="navbar-nav">
          <li class="nav-item active"><a href="/" class="nav-link">Primary</a></li>
          <li class="nav-item"><a href="/" class="nav-link">Primary</a></li>
          <li class="nav-item dropdown">
            <a href="/" class="nav-link dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Primary</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item active" href="/">Primary</a></li>
              <li><a class="dropdown-item" href="/">Primary</a></li>
            </ul>
          </li>
          <li class="nav-item"><a href="/" class="nav-link">Primary</a></li>
        </ul>
      </nav>
      <nav role="navigation">
        <ul class="navbar-nav">
          <li class="nav-item"><a href="/link" class="nav-link">Secondary</a></li>
          <li class="nav-item"><a href="/link" class="nav-link">Secondary</a></li>
          <li class="nav-item"><a href="/link" class="nav-link">Secondary</a></li>
        </ul>
      </nav>
      <nav role="navigation">
        <ul class="navbar-nav d-flex flex-row">
          <li class="nav-item"><a href="/link" class="nav-link">Tertiary</a></li>
          <li class="nav-item"><a href="/link" class="nav-link">Tertiary</a></li>
        </ul>
      </nav>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container -->
</nav><!-- /.navbar -->
```

| Class | Optional variable part  | Purpose
| - | - | -
| ``.navbar ``     | –  | wrapper has ``flex``, ``wrap``, ``center``, ``space-between`` and ``padding``
| ``.navbar-expand-{breakpoint}``     | ``-sm`` ``-md`` ``-lg`` ``-xl``  | responsive collapsing
| ``.navbar-brand``     | –  | logo wrapper
| ``.navbar-toggler``     | –  | toggler padding
| ``.navbar-toggler-icon``     | –  | toggler svg icon
| ``.navbar-text``     | –  | just for coloring
| ``.collapse.navbar-collapse``     | –  | responsive collapse, no spacing
| ``.navbar-nav``     | –  | navigation ``ul`` wrapper
| ``.nav-item``     | –  | navigation ``li`` item
| ``.nav-link``     | –  | navigation ``a`` link
| ``.nav-item.active``     | –  | active item


### :heavy_check_mark: Navs

@see https://getbootstrap.com/docs/4.5/components/navs/


### :heavy_check_mark: Forms

* @see https://getbootstrap.com/docs/4.5/components/forms/

#### :heavy_check_mark: Input group

@see https://getbootstrap.com/docs/4.5/components/input-group/


### :no_entry: Jumbotron
Not used


### :no_entry: List group
Not used


### :no_entry: Media object
Not used


### :no_entry: Modal
Not used


### :heavy_check_mark: Pagination

@see https://getbootstrap.com/docs/4.5/components/pagination/


### :no_entry: Popovers
Not used


### :no_entry: Progress
Not used


### :no_entry: Scrollspy
Not used


### :heavy_check_mark: Spinners

@see https://getbootstrap.com/docs/4.5/components/spinners/


### :no_entry: Toasts
Not used


### :no_entry: Tooltips
Not used

----
KISS & DRY! — until needed :))
