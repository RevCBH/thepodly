# The Podly
Resurrect Podly

# Dev Setup
I built a blank `[yo](http://yeoman.io/) [angular](https://github.com/yeoman/generator-angular)` and copied it into the project. The idea is to port the stuff under `angular/` over to `app/`

## Installing dependencies
Check if `ruby` is installed: `ruby -v`
Assuming it is, do (may need to run w/ sudo): `gem update --system && gem install compass`

Check if `brew` is installed: `which brew`
If it's not: `ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

Check if `node` is installed: `node -v`
If it's not: `brew install node`

Check if `n` is installed: `which n`
If it's not: `npm install -g n`
Install the correct version of node: `n v0.12.7`
Install npm dependencies: `npm install -g grunt-cli bower yo`

Install npm packages for the project: `npm install`
Install bower packages for the project: `bower install`

## Starting the Server
Run `grunt serve` and it should pop open a browser window. Right now, it will just show the yeoman generated page. To quit, type ctrl-c in the command line window.

# Legacy Stuff
  * old-yesod-models is a description of the database schema we were using
  * angular/ contains the coffeescript and HTML which made up most of the site functionality
    * .hamlet files are a bastard HTML format with no closing tags
    * both .hamlet and .coffee files might have Yesod (Haskell) snippets in them which will need to be fixed
    * we should consider ditching coffeescript and just converting it back to javascript or typescript
  * static/ has stuff we didn't render from the backend
    * images for icons
    * flash player
    * javascript libraries
    * bootstrap css

# Things That are Missing
  * Backend logic (in Haskell)
    * Validation
    * Database access
    * Login/permissions access
    * Probably other stuff
  * A way to render and server the assets
    * Probably should setup a simple node.js server for testing and deploy to S3 or Firebase CDN
