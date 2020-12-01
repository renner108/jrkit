# JRkit principles

* [Terminology](#terminology)
* [BEM flavor](#bem-flavor)
* [Structure](#structure)
* [Basics](#basics)
* [Layout](#layout)
* [Typography](#typography)
* [Colors](#colors)
* [Links](#links)
* [Transitions](#transitions)
* [Borders](#borders)


## Terminology

### Terms

<dl>
<dt>HTML wrapper</dt>
<dd>HTML wrapper for every page. Consists from <code>__html-header.html</code>, <code>__html-footer.html</code> and <code>__html-meta-{name}.html</code>s containing
  <code>&lt;head&gt;</code> metadata, scripts and other atomic HTML parts.</dd>
 
<dt>Top wrapper</dt>
<dd>Top <code>&lt;div id="top" class="wrapper-top"&gt;</code> wrapper. Is placed between <code>&lt;body&gt;</code> and any other HTML content element. 
  Code is in <code>__html-header.html</code> and <code>__html-footer.html</code>.</dd>

<dt>Top division</dt>
<dd>Main HTML content divisions. <code>&lt;header class="header" id="header"&gt;</code>, <code>&lt;main id="main" class="main" role="main"&gt;</code> 
  and <code>&lt;footer id="footer" class="footer" role="contentinfo"&gt;</code> tags are used as <em>top wrapper</em> immediate children. 
  Code is in <code>_header.tpl</code> and <code>_footer.tpl</code>.</dd>

<dt>Module</dt>
<dd><em>Modules</em> are mixing Bootstrap modules as <strong>Buttons</strong>, <strong>Cards</strong> etc. and JRkit custom modules. In terms of 
  <a href="https://bradfrost.com/blog/post/atomic-web-design/">atomic design</a>, <em>modules</em> are defining atoms, molecules and organisms. In terms
  of <a href="http://getbem.com/">BEM methodology</a>, <em>module</em> <strong>may</strong> define one or more <code>.block</code>s or <code>.block--element</code>s.</dd>

<dt>Component</dt>
<dd><strong>Component</strong> is (1) base JRkit custom module or (2) encapsulated reusable package consisting of HTML, (S)CSS and JavaScript. So <em>component</em> 
  means either <strong>Component</strong> module or generally any custom component which is using <strong>Component</strong> or any other JRkit or Bootstrap module. 
  In <a href="https://bradfrost.com/blog/post/atomic-web-design/">atomic design</a>, a <em>component</em> can be molecule or organism. </em> has usually 
  <code>&lt;section&gt;</code> wrapper. Within the <a href="http://getbem.com/">BEM method</a>, <em>component</em> is usually <code>.block</code>.</dd>

<dt>(Component) subsection</dt>
<dd>Component's <em>subsection</em> is a significant part of a <em>component</em>. It can represent e.g. one <code>&lt;div class="row"&gt;</code> in a multi-row component. 
  Subsection is usually <code>&lt;div&gt;</code>. In <a href="http://getbem.com/">BEM</a>, a subsection is usually ``component--element``.</dd>

<dt>Page</dt>
<dd>A template for type of pages or specific instance of final project page. In <a href="https://bradfrost.com/blog/post/atomic-web-design/">atomic design</a>,
  a <em>page</em> represents a template or page.</dd>
</dl>

### Terms in project hierarchy

* **Base** (global CSS) 
  + &rarr; **Module** (abstract CSS) 
    + &rarr; **Component** (specific CSS + corresponding ``_*.html`` file) 
      + &rarr; **Page** (bunch of components + specific CSS + corresponding ``*.html`` file)

----


## BEM flavor

JRkit uses **``block--element__modifier``** naming system to allow keeping our snake_case ``component_names`` for identifying an block. This way is how ``component_name``
can be used across the whole ecosystem with consistency. 

It also allows to distinguish between JRkit modular CSS ``.class_names`` and vendor or utility ``.classes``.

```css
/* base */
.block {}
.block--element {}
.block__modifier {}

.block_name--element-name__modifier-name { /* is preferred for JRkit components */ } 
.block-name--element-name__modifier-name { /* also allowed */ } 

/* this all is correct */
.block_name {}
.block-name {}
.block_name--element-name {}
.block-name--element-name {}
.block_name__modifier-name {}
.block-name__modifier-name {}
.block_name--element-name__modifier-name {}
.block-name--element-name__modifier-name {}
```

----


## Structure

### Folder hierarchy

```
jrkit/
├── dist/                               // reserved for compiled assets #ignored (ignore can be removed)
│   ├── assets/                         // automatically published and optimized images and other static files
│   │   └── ...                         // folder strucure for static files as copied from src/assets/*
│   ├── css/                            // automatically compiled CSS files
│   │   ├── index.css                   // main CSS file to be linked in HTML
│   │   └── ...                         // source maps etc.
│   └── js/                             // automatically compiled CSS files
│       ├── index.js                    // main JS file to be linked in HTML
│       └── ...                         // partial JS bundles, source maps etc.
│
├── html/                               // HTML initial, source and compiled files
│   ├── init/                           // reserved for initial files
│   │   ├── scripts/                    // init scripts to be used in Gulp init task
│   │   └── ...                         // initial HTML and other template files to be used in Gulp init task
│   ├── preps/                          // reserved for preprepared (micro)components and snippets
│   ├── static/                         // reserved for compiled HTML and other files #ignored (ignore can be removed)
│   │   ├── gtm_container.json          // to be imported as https://tagmanager.google.com/ project default container
│   │   └── ...                         // compiled HTML and other files
│   └── ...                             // HTML source files (see HTML hierarchy below)
│
├── node_modules/                       // reserved for development environment and vendor source files #ignored
│
├── src/                                // other than HTML source files
│   ├── assets/                         // all assets/ files will be published to dist/assets/, keeping folder structure
│   │   ├── brand/
│   │   │   ├── color_scheme.fw.png     // edit according to your project
│   │   │   ├── icon.transparent.png    // used as MASTER source file for Gulp https://realfavicongenerator.net/ task
│   │   │   ├── icon__reverse.fw.png    // used as iOS and Android source file in Gulp https://realfavicongenerator.net/ task
│   │   │   ├── thumbnail.fw.png        // for use in <meta name="image_src"> tag
│   │   │   └── ...                     // dtto etc. (*.fw.png files are multilayered Adobe Fireworks PNGs)
│   │   ├── common/                     // generally, globally and/or frequently used pictures
│   │   ├── modules/                    // images or other static files tied with specific module
│   │   │   │── {module_name}/          // create your folders as needed
│   │   │   │   │                       // -- naming convention for image files:
│   │   │   │   │                       // -- {purpose}[[__{modifier_eg_color}]__{intrinsic_dimension}[__2x_{intended_dimension}]].{extension}
│   │   │   │   └── ...                 // -- examples: box_bg.png, box_bg_left__white__96x972__2x_48x486.png, ...
│   │   │   └── ...                     // create your folders as needed
│   │   ├── components/                 // images or other static files tied with specific component
│   │   │   │── {component_name}/       // create your folders as needed
│   │   │   │   └── ...                 // -- naming convention dtto
│   │   │   └── ...                     // create your folders as needed
│   │   ├── pages/                      // images or other static files tied with specific page
│   │   │   │── {page_name}/            // create your folders as needed
│   │   │   │   └── ...                 // -- naming convention dtto
│   │   │   └── ...                     // create your folders as needed
│   │   ├── cover/                      // used in <meta itemprop="image"> tag
│   │   ├── facebook/                   // for use as default "og:image" and "twitter:image"
│   │   ├── qr/                         // QR code images
│   │   └── ...                         // create your folders as needed
│   │
│   ├── js/
│   │   ├── bootstrap/
│   │   │   └── bootstrap.js            // loads Bootstrap prerequisities and arbitrary modules
│   │   ├── modules/                    // custom and vendor implementation modules to be loaded in main.js
│   │   │   ├── translate.js            // translation utility
│   │   │   ├── typography.js           // typographic utility
│   │   │   ├── navigation.js           // translation utility
│   │   │   ├── tables.js               // utilities for tables
│   │   │   ├── forms.js                // utilities and enhancements for forms
│   │   │   ├── modals.js               // modals implementation
│   │   │   └── ...
│   │   ├── tools/
│   │   │   ├── test.js                 // for development only
│   │   │   └── utilities.js            // miscellaneous custom utilities
│   │   ├── vendor/
│   │   │   ├── jquery/                 // jQuery custom builds (https://jquery.com/download/#build-from-git)
│   │   │   │   └── jquery.minimal.js
│   │   │   ├── lodash/                 // Lodash custom builds (https://lodash.com/custom-builds)
│   │   │   │   └── lodash.custom.js
│   │   │   └── modernizr/              // Modernizr custom builds (https://modernizr.com/download)
│   │   │       └── modernizr-custom.js
│   │   ├── index.js                    // loads vendor.js and main.js
│   │   ├── main.js                     // loads my tools/* and modules/* as needed
│   │   └── vendor.js                   // loads vendor scripts (including Bootstrap) as needed
│   │
│   └── scss/
│       ├── base/
│       │   ├── _layout.scss            // global layout basics
│       │   ├── _typography.scss        // the whole project typography
│       │   ├── _colors.scss            // project colors system
│       │   ├── _links.scss             // links behaviour
│       │   ├── _transitions.scss       // transitions behaviour
│       │   └── _translate.scss         // language-specific CSS
│       ├── bootstrap/
│       │   ├── _bootstrap.scss         // Bootstrap prerequisities and arbitrary modules loader
│       │   └── _variables.scss         // Bootstrap and JRkit variables customization (also loads original BS variables)
│       ├── layout/                     // layout components CSS
│       │   ├── _header.scss
│       │   ├── _footer.scss
│       │   └── ...
│       ├── modules/                    // JRkit custom modules and Bootstrap/vendor modules customization and implementation
│       │   ├── _component.scss
│       │   ├── _cards.scss
│       │   ├── _buttons.scss
│       │   ├── _fancybox.scss
│       │   └── ...
│       ├── pages/                      // specific project pages/types CSS
│       │   └── ...
│       ├── print/                      // printing CSS
│       │   └── ...
│       ├── tools/
│       │   ├── _functions.scss         // general functions for further use
│       │   ├── _mixins.scss            // layout, typography, colors, links and transitions mixins for further use
│       │   ├── _utilities.scss         // layout, display, visibility, typography, colors, links and transitions utilities
│       │   └── _fixes.scss
│       ├── index.scss                  // loads vendor.scss and main.scss
│       ├── main.scss                   // loads my SCSS tools and modules
│       └── vendor.scss                 // loads vendor SCSS modules and snippets
│    
├── .ftpignore                          // ignore list of files to not publish online
├── .gitignore                          // Git ignore list (edit according to your project)
├── gulpfile.js                         // Gulp scripts
├── index.html                          // index of compiled HTML files served from html/static/*
├── package.json                        // NPM install file
├── package-lock.json                   // NPM dependencies lock file
├── project.json                        // your project basic settings
└── ...                                 // other compiled and published web root files as icons etc. (#ignore can be removed)
```

### HTML hierarchy

```
html/
├── static/                             // reserved for compiled HTML and other files #ignored (ignore can be removed)
│
├── example.html                        // full pages HTML source files (listed in index.html as Pages)
├── {page_name}.html                    // -- loads service components as __html-*.html and components as _*.tpl
│
├── __html-header.html                  // service components source files (listed in index as Service components)
├── __html-footer.html                  // -- loads service meta components as __html-meta-*.html
│
├── __html-meta-fonts.html              // service meta components
├── __html-meta-socials_facebook.html   // -- dynamically filled with data from project.json
├── __html-meta-{meta_name}.html
│
├── _example.tpl                        // components, partial HTML source files
├── _example.html                       // just an accompanion for components partials, wraps partial in HTML to be listed in index
├── _{component_name}.tpl               // -- can dynamically load data from project.json or other sources
│
├── error-404.html                      // a special case of a full page, HTTP errors pages
├── error-500.html
├── error-{code}.html
│
├── ___example.html                     // a special case of a full page, for system pages and documentation
├── ___colors.html
└── ___{service_page_name}.html
```

### HTML page structure (base template)

```html
<!doctype html>
<html class="no-js document-loading document-preloading" lang="{{project.lang[0]}}" itemscope itemtype="http://schema.org/WebSite" prefix="og: http://ogp.me/ns#">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- ... -->
    <link rel="stylesheet" href="{{project.devel.root}}/dist/css/index.css">
  </head>
  <body id="{{project.id}}">
    <div id="top" class="wrapper-top">

      <header id="header" class="header">
        <!-- ... -->
      </header><!-- /#header -->

      <main id="main" class="main" role="main">
        <!-- ... -->
      </main><!-- /#main -->

      <footer id="footer" class="footer" role="contentinfo">
        <!-- ... -->
      </footer><!-- /#footer -->

    </div><!-- /#top.wrapper-top -->
    <script src="{{project.devel.root}}/dist/js/index.js"></script>
  </body>
</html>
```

#### Dtto in ``gulp-file-include`` template system

```html
@@include('__html-header.html')
@@include('_header.tpl')
  <!-- HTML content or including components -->
@@include('_footer.tpl')
@@include('__html-footer.html')
```

#### ``homepage.html`` example

```html
<!-- LOAD GLOBAL DATA -->
@@if ((() => context.DATA = DATA)()) {}

<!--
  This is an example complete page file. It should include HTML header and footer and can include any other files.
  The rendered result will be copied to /static.
-->

@@include('__html-header.html')
<!-- We have to include .tpl file, not .html, as .html file already contains HTML header and footer -->
@@include('_header.tpl')

<!-- AKTUÁLNĚ -->
@@include('_aktualne.tpl')

<!-- STUDIO YPSILON -->
@@include('_studio_ypsilon.tpl')

<!-- KDE NÁS NAJDETE -->
@@include('_kde_nas_najdete.tpl')

<!-- We have to include .tpl file, not .html, as .html file already contains HTML header and footer -->
@@include('_footer.tpl')
@@include('__html-footer.html')
```

#### Component anatomy

```
jrkit/
├── html/
|   ├── _example_component.tpl
|   └── _example_component.html
└── src/
    ├── assets/
    │   └── components/
    │       └── example_component/
    │           └── bg__white.svg
    ├── js/
    │   └── components/
    │       └── example_component.js
    └── scss/
        └── components/
            └── _example_component.scss
```

##### TODO

```
jrkit/
├── src/
│   ├── assets/
│   │   └── components/
│   │       └── example_component/
│   │           └── bg__white.svg           //component asset
│   ├── html/
│   |   └── components/
│   |       ├── example_component.html      //component HTML wrappers
│   |       └── example_component.tpl       //component HTML template
│   ├── js/
│   │   └── components/
│   │       └── example_component.js        //component JS
│   └── scss/
│       └── components/
│           └── _example_component.scss     //component SCSS
└── dist/
    ├── assets/
    │   └── components/
    │       └── example_component/
    │           └── bg__white.svg           //published optimized asset
    ├── css/
    │   └── index.css                       //bundled minified CSS with compiled _example_component.scss 
    ├── html/
    |   └── components/
    |       └── example_component.html      //compiled component HTML inside HTML wrappers
    └── js/
        └── index.js                        //bundled minified JS with compiled example_component.js
```

----


## Basics

Bootstrap reboot (https://getbootstrap.com/docs/4.5/content/reboot/) is unchanged. Font faces are set within [Typography](#typography) module.

----


## Layout

#### Grid

Grid classes (https://getbootstrap.com/docs/4.5/layout/overview/, https://getbootstrap.com/docs/4.5/layout/grid/) and utilities (https://getbootstrap.com/docs/4.5/layout/utilities-for-layout/) from Bootstrap are unchanged. 

Just grid tiers can be changed in [_variables.scss](./_variables.scss)

```scss
// Grid
//-------
$grid-breakpoints: (
  xs: 0,
  sm: 576px,  //576px
  md: 768px,  //768px
  lg: 992px,  //992px
  xl: 1200px  //1200px
);

//containers
//be aware of scrollbar width!
$container-max-widths: (
  sm: 540px,  //540px
  md: 720px,  //720px
  lg: 960px,  //960px
  xl: 1140px  //1140px
);

//columns
$grid-columns:        12;   //12
$grid-gutter-width:   30px; //30px
```

See also [readme-bootstrap.md#layout-utilities](readme-bootstrap.md#layout-utilities)


#### Display

| Class | Optional variable part
| - | -
| ``.d-{value}``                   | ``-none`` ``-inline`` ``-inline-block`` ``-block`` ``-table`` ``-table-cell`` ``-table-row`` ``-flex`` ``-inline-flex``
| ``.d-{breakpoint}-{value}``      | ``-sm`` ``-md`` ``-lg`` ``-xl``, dtto
| ``.d-{value}-if-js``                   |  dtto
| ``.d-{value}-if-no-js``                |  dtto
| ``.d-{breakpoint}-{value}-if-js``      |  dtto, dtto
| ``.d-{breakpoint}-{value}-if-no-js``   |  dtto, dtto
| ``.d-none-if-cookies``  |  hidden if cookies enabled
| ``.d-none-if-no-cookies``  |  hidden if cookies disabled
| ``.d-none-if-preloading``  |  hidden until DOM completed
| ``.d-none-if-preloaded``  |  hidden if DOM completed
| ``.d-none-if-loading``  |  hidden until ``document.load``
| ``.d-none-if-loaded``  |  hidden after ``document.load``
| ``.d-print-{value}``    | ``-sm`` ``-md`` ``-lg`` ``-xl``, for printing, e.g. ``.d-print-none``

#### Visibility

| Class | Purpose
| - | -
| ``.visible``    | has ``visibility: visible !important;``
| ``.invisible``    | has ``visibility: hidden !important;``
| ``.visible-if-js``    | same as above but JavaScript conditional
| ``.invisible-if-js``    | same as above but JavaScript conditional
| ``.visible-if-no-js``    | same as above but no JavaScript conditional
| ``.invisible-if-no-js``    | same as above but no JavaScript conditional
| ``.invisible-if-preloading``  |  invisible until DOM completed
| ``.invisible-if-preloaded``  |  invisible if DOM completed
| ``.invisible-if-loading``  |  invisible until ``document.load``
| ``.invisible-if-loaded``  |  invisible after ``document.load``
| ``.overflow-auto`` | ``overflow: auto !important;``
| ``.overflow-hidden`` | ``overflow: hidden !important;``
| ``.sr-only``    | hidden from all devices except screen readers
| ``.sr-only-focusable``    | shown again when focused
| ``.text-hide`` | sets text as ``0px/0`` and ``transparent`` (for image replacement, :x: deprecated)

> :collision: <br>
> Visibility utilities are NOT responsive

#### Sizing

* See https://getbootstrap.com/docs/4.5/utilities/sizing/
* See also https://github.com/janrenn/jrkit/blob/master/src/scss/bootstrap/readme-bootstrap.md#sizing

#### Spacing

* See https://getbootstrap.com/docs/4.5/utilities/spacing/
* See also https://github.com/janrenn/jrkit/blob/master/src/scss/bootstrap/readme-bootstrap.md#spacing

#### Alignment

* See https://getbootstrap.com/docs/4.5/utilities/position/
* See https://getbootstrap.com/docs/4.5/utilities/flex/
* See https://getbootstrap.com/docs/4.5/utilities/float/
* See https://getbootstrap.com/docs/4.5/utilities/vertical-align/
* See also https://github.com/janrenn/jrkit/blob/master/src/scss/bootstrap/readme-bootstrap.md#alignment

----


## Typography

#### Font

* See https://getbootstrap.com/docs/4.5/content/typography/
* See also https://github.com/janrenn/jrkit/blob/master/src/scss/bootstrap/readme-bootstrap.md#typography-utilities

| Class | Optional variable part | Purpose
| - | - | -
| ``.font-weight-{keyword}``     |  ``-bold`` ``-normal`` ``-light`` | ``700``, ``400``, ``300``
| ``.font-weight-{keyword}``     |  ``-bolder`` ``-lighter`` | ``bolder``, ``lighter``
| ``.font-weight-semibold``  | –  | ``font-weight: 500 !important;``
| ``.font-italic``  | –  | sets ``font-style: italic !important;``
| ``.font-base``  | –  | sets ``$font-family-base``, ``$base-letter-spacing``, ``$base-word-spacing``, <br> ``$font-size-base`` and ``$line-height-base``
| ``.font-alt``  | –  | sets ``$font-family-alt``, ``$alt-letter-spacing`` and ``$alt-word-spacing`` <br> (inherits ``font-size`` and ``line-height``)
| ``.font-small``  | –  | sets ``font-size`` and ``line-height`` specified in ``src/scss/base/_typography.scss`` <br> (inherits ``family`` properties)
| ``.font-smaller``  | –  | dtto
| ``.font-x-small``  | –  | dtto
| ``.font-xx-small``  | –  | dtto
| ``.font-big``  | –  | dtto
| ``.font-bigger``  | –  | dtto
| ``.font-x-big``  | –  | dtto
| ``h1`` – ``h6``, ``.h1`` – ``.h6``  | –  | dtto
| ``.thin-space``  | –  | sets small ``font-size`` for thin space character
| ``.hair-space``  | –  | sets smaller ``font-size`` for thinner space character
| ``.thin-spacing``  | –  | sets ``word-spacing`` for thin spaces
| ``.hair-spacing``  | –  | sets ``word-spacing`` for thinner spaces
| ``.divider``  | –  | sets ``padding`` and ``opacity`` for dividing characters

#### Text

* See https://getbootstrap.com/docs/4.5/content/reboot/
* See https://getbootstrap.com/docs/4.5/content/typography/
* See also https://github.com/janrenn/jrkit/blob/master/src/scss/bootstrap/readme-bootstrap.md#typography-utilities

| Class | Optional variable part | Purpose
| - | - | -
| ``small``  | –  | rewritten with ``.font-x-small`` @see above
| ``h1 small`` – ``h4 small``, <br> ``.h1 small`` – ``.h4 small``  | –  | ``font-size: $small-font-size;``, ``font-weight: 400;`` and ``color: $text-muted;``
| ``.lead``  | –  | sets ``font-size: $lead-font-size;`` and ``font-weight: $lead-font-weight;``
| ``.text-monospace``  | –  | sets ``font-family: $font-family-monospace;``
| ``.text-lowercase``  | –  | sets ``text-transform: lowercase !important;``
| ``.text-uppercase``  | –  | sets ``text-transform: uppercase !important;``
| ``.text-capitalize``  | –  | sets ``text-transform: capitalize !important;``
| ``.text-left``  | –  | sets ``text-align: left !important;``
| ``.text-{breakpoint}-left``  | ``-sm`` ``-md`` ``-lg`` ``-xl``  | dtto responsive
| ``.text-center``  | –  | sets ``text-align: center !important;``
| ``.text-{breakpoint}-center``  | ``-sm`` ``-md`` ``-lg`` ``-xl``  | dtto responsive
| ``.text-right``  | –  | sets ``text-align: right !important;``
| ``.text-{breakpoint}-right``  | ``-sm`` ``-md`` ``-lg`` ``-xl``  | dtto responsive
| ``.text-break``  | –  | prevents long strings breaking layout
| ``.text-wrap``  | –  | sets ``white-space: normal !important;``
| ``.text-nowrap``  | –  | sets ``white-space: nowrap !important;``
| ``.nobr``  | –  | alias for ``.text-nowrap``

#### Lists

See https://getbootstrap.com/docs/4.5/content/typography/#inline

| Class | Optional variable part | Purpose
| - | -  | - 
| ``.list-unstyled``   | –  | removes default ``list-style`` and left ``margin`` on list items <br> (immediate children only)
| ``.list-inline``  | –   | removes default ``list-style`` and left ``margin`` on list items <br> (immediate children only), in **JRkit**, immediate children have <br> ``display: inline-block;`` automatically
| ``.list-inline-item``  | –   | sets ``display: inline-block;`` and ``margin-right: .5rem;`` <br> (not for ``:last-child``)
| ``.list-inline-bullets``  | –   | same as ``.list-inline`` with bullets "&bull;" as ``.divider`` between items
| ``.list-{breakpoint}-inline-bullets``  | ``-sm`` ``-md`` ``-lg`` ``-xl``  | dtto responsive
| ``.list-inline-pipes``  | –   | same as ``.list-inline`` with pipes "\|" as ``.divider`` between items
| ``.list-{breakpoint}-inline-pipes``  | ``-sm`` ``-md`` ``-lg`` ``-xl`` | dtto responsive

----


## Colors

> :collision: <br>
> In **JRkit**, all custom colors from ``$colors`` map are also used for color utility variations

#### Background and borders

| Class | Optional variable part | Purpose
| - | - | -
| ``.bg-{color}``  | colors from ``$theme-colors`` and ``$colors`` maps  | sets ``background-color: {color} !important;``
| ``.bg-transparent``  | –  | sets ``background-color: transparent!important;``
| ``.border-{color}``  | colors from ``$theme-colors`` and ``$colors`` maps  | sets ``border-color: {color} !important;``

#### Foreground (text)

| Class | Optional variable part | Purpose
| - | - | -
| ``.text-body``  | –  | sets ``color: $body-color !important;``
| ``.text-{color}``  | colors from ``$theme-colors`` and ``$colors`` maps  | sets ``color: {color} !important;``
| ``.text-black-50``  | –  | sets ``color: rgba($black, .5) !important;``
| ``.text-white-50``  | –  | sets ``color: rgba($white, .5) !important;``
| ``.text-muted``  | –  | sets ``color: $text-muted !important;``
| ``.text-reset``  | –  | adds ``color: inherit !important;``

#### Links colors

| Class | Optional variable part | Purpose
| - | - | -
| ``a``  | –  | has ``color: $link-color;`` set
| ``a:hover``, ``a:focus``  | –  | has ``color: $link-hover-color;`` set
| ``.page--content a:visited``  | –  | has ``color: $link-visited-color;`` set

----


## Links

#### Decoration

| Class | Purpose
| - | - 
| ``.link-decoration-swap``  | sets ``text-decoration: $link-hover-decoration`` on nested ``a``s <br> and ``text-decoration: $link-decoration`` on nested ``a:hover`` and ``a:focus``
| ``.link-decoration-base``  | resets ``text-decoration: $link-decoration`` on nested ``a``s <br> and ``text-decoration: $link-hover-decoration`` on nested ``a:hover`` and ``a:focus``
| ``h1 a`` – ``h6 a``, ``.h1 a`` – ``.h6 a``  | behavior is set in ``src/scss/base/_links.scss``
| ``.link-decoration-none``  | sets ``text-decoration: none !important;`` on nested ``a``s
| ``.text-decoration-none``  | sets ``text-decoration: none !important;``

----


## ``.inverted`` class

> :collision: <br>
> Sets selected properties to easily switch some layout parts from default to inverted color scheme

| Class | Purpose
| - | -
| ``.inverted``  | sets ``background: $bg-inv;`` and ``color: $text-inv;``
| ``.inverted a``  | has ``color: inherit;`` set
| ``.inverted a:hover``, ``.inverted a:focus``  | has ``color: $links-inv-hover;`` set
| ``.inverted h1`` – ``.inverted h6``  | has ``color: $headings-color-inv;`` set

----


## Transitions

> :collision: <br>
> * Basic transitions values are set in ``@mixin trans`` in ``src/scss/tools/\_mixins.scss``
> * Transitions utilities are in ``src/scss/tools/\_utilities.scss``
> * Specific elements behavior is in ``src/scss/base/\_transitions.scss``
> * All transitions are disabled during DOM rendering

| Class | Optional variable part | Purpose
| - | - | -
| ``.trans``  | –  | sets transitions for ``color``, ``opacity``, ``background-color``, ``border-color``, ``box-shadow``
| ``.no-trans``, ``.notrans``  | –  | removes all transitions with ``transition: none !important;``

----


## Borders

* See https://getbootstrap.com/docs/4.5/utilities/borders/
* See also https://github.com/janrenn/jrkit/blob/master/src/scss/bootstrap/readme-bootstrap.md#borders

| Class | Optional variable part | Purpose
| - | - | -
| ``.rounded-pill``  | –  |  creates "pill"
| ``.rounded-pill-left``  | –  | sets "pill" radius only on left
| ``.rounded-pill-right``  | –  | sets "pill" radius only on right

----
KISS & DRY!
