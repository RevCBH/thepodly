# The Podly
Resurrect Podly

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
