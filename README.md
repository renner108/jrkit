# <!-- {{project.devel.name -->JRkit<!-- }} -->
## <!-- {{project.devel.description -->Front-end templates & mockup boilerplate<!-- }} -->

<img src="src/assets/brand/icon.fw.png" width="200" alt="project icon" align="right">

* [Bootstrap cheat sheet](src/scss/bootstrap/readme-bootstrap.md)
* [JRkit principles](src/scss/bootstrap/readme-jrkit.md)
* [Example usage](src/scss/bootstrap/readme-example.md)

----


### Installation (Windows)

1. Download and install Node.js https://nodejs.org/en/download/ (all options default)
2. Run ``npm install sass -g``
3. Run ``npm install gulp-cli -g``
4. Run ``npm install`` in project folder

#### Tested on

* Windows 10 Pro v1909
* Node.js v12.18.3 with NPM v6.14.6
* SASS v1.26.10 compiled with dart2js 2.8.4
* Gulp CLI version: 2.3.0

----


### Usage

#### New project initialization

1. Edit ``project.json`` according to project
2. Edit all files in ``src/assets/{brand,cover,facebook}/`` according to project
3. **``gulp init``** builds the project boilerplate

Everytime later you run ``gulp init``, it updates all main project settings, Bootstrap settings, ``README.md`` and
Color system page ``html/___colors.html``. It **won't update** ``index.html`` or existing sitemap items.

----


#### Deployment

**``gulp dist``** prepares all files for production and publish them to ``dist/`` and ``html/static/``

----


#### Development

##### Code

**``gulp watch``** ``gulp w`` enters watchmode upon all ``src/scss/**/*.scss``, ``src/js/**/*.js`` and ``./**/*.html``
files and runs **browserSync** server. On change runs ``dev`` and reloads browserSync

``gulp style`` ``gulp s`` compiles your ``src/scss/index.php`` file to ``dist/css/index.css`` <br>
``gulp compile`` ``gulp c`` compiles your ``src/js/index.js`` file to ``dist/js/index.js``

``gulp dev`` compiles your CSS and JS index files to ``dist/`` <br>
``gulp prod`` compiles CSS index file and all JS src files to ``dist/``, autoprefixed and minified

``gulp serve`` ``gulp srv`` ``gulp w --so`` ``gulp w --s`` ``gulp w --o`` runs server and browserSync only

``gulp prod`` and ``gulp dist`` accepts ``--verbose`` parameter

##### Assets

**``gulp publish``** ``gulp p`` copies all doc and web image file types from ``src/`` to ``dist/`` <br>
``gulp optimize`` ``gulp o`` optimizes images in ``dist/assets/`` (may take few minutes, depending on CPU performance) <br>
``gulp assets`` ``gulp a`` copies all doc and web image file types from ``src/`` to ``dist/`` and optimizes images in ``dist/assets/``

**``gulp favicon``** ``gulp fi`` ``gulp f`` completes all favicons tasks and checks for updates <br>
``gulp figen`` generates icons for all devices <br>
``gulp fihtm`` relocates HTML code for icons to ``html/__html-meta-icons.html`` <br>
``gulp fiu`` checks for **gulp-real-favicon** updates

``gulp optimize`` and ``gulp assets`` accept
* ``--zi <integer>`` as number of [Zopfli](https://github.com/google/zopfli) iterations, default is 4
* ``--jq <integer>`` as [Mozjpeg](https://github.com/mozilla/mozjpeg) quality, default is 73

``gulp clear`` clearing the gulp cache

##### Templating

**``gulp html``** ``gulp h`` compiles HTML templates from ``html/*.html`` to ``html/static/``
using **gulp-file-include** https://www.npmjs.com/package/gulp-file-include

``gulp make`` compiles HTML to ``html/static/`` without copying error pages to project root <br>
``gulp validate`` ``gulp v`` validates HTML files in ``html/static/`` with W3C Nu Html Checker

``gulp make`` accepts ``--rp`` parameter to force producing ``<meta name="robots" content="all">`` to static HTML, so
example of running final deploy task is ``gulp dist --zi 1 --jq 70 --rp --verbose``

----


#### ``project.json`` documentation

##### ``gtm`` object example

``gulp html`` or ``gulp gtm`` also prepares JSON file for import to GTM, see https://github.com/janrenn/GTM-default-container

```js
"gtm": {
  "id": "GTM-ABC1234", // GTM-XXXXXXX
  "account": "1234567890", // GTM account id (1st integer from URL https://tagmanager.google.com/#/container/accounts/XXXXXXXXXX/containers/XXXXXXXX/workspaces/)
  "cid": "12345678", // GTM container id (2nd integer from URL https://tagmanager.google.com/#/container/accounts/XXXXXXXXXX/containers/XXXXXXXX/workspaces/)
  "name": "www.example.com", // GTM container name usually www.example.com
  "host": "example.com", // w/o www (example.com, subdomain.example.com)
  "ua": "UA-12345678-9" // Universal Analytics id UA-XXXXXXXX-X
}
```

----
KISS & DRY!
