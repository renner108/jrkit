# Example usage

## Initialization

1. clone JRkit
1. create project repository
1. remove ``# JRkit development only`` from ``.gitignore``
1. commit project

## Installation

1. run ``npm install``

## Customization

1. collect project data (incl. color schema, servers URLs, socials URLs, Facebook app ID, Universal Analytics ID, ...)
1. create GTM container
1. update ``project.json``
1. update ``README.md`` header *(TODO: automate within ``gulp init``)*
1. update ``package.json`` header *(TODO: automate within ``gulp init``)*
1. update ``src/assets/*``
1. update ``project.json`` color system objects *(TODO: generate ``___colors.html`` page content from SASS variables)*
1. run ``gulp init``
1. run ``gulp dist --verbose``
1. commit project settings and assets
1. import ``GTM-default-container`` from ``html/static/gtm_container.json`` to GTM container
1. update IDs in ``index.html`` according to ``html/static/___colors.html`` *(TODO: automate within ``gulp init``)*
1. run ``gulp w`` and check index page in browser
1. collect design data (typographic system, required Bootstrap modules, ...)
1. customize [``src/scss/bootstrap/_bootstrap.scss``](./_bootstrap.scss)
1. customize [``src/scss/bootstrap/_variables.scss``](./_variables.scss)
1. customize [``src/js/bootstrap/bootstrap.js``](./../../js/bootstrap/bootstrap.js)
1. run ``gulp w`` and check generated pages in browser
1. commit customized boilerplate

## Development

...

----
