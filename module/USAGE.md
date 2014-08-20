Description:
    Creates a new module, route and template and adds it to app.js

# run this while in a ng-require root folder.

- yo ng-require:module

This will create:
    app/scripts/modules/name/templates/name.tpl.html
    app/scripts/modules/name/name_ctrl.js
    app/scripts/modules/name/name_route.js

And add routing to:
    app/scripts/app.js

And add tab (TODO optional)