# Savana Helloworld
Exemple: savana.helloWorld.js:
```
!(function($savana, undefined) {

    'use strict';

    $savana.fn.helloworld = function(params) {

        var target = this[0]; // Selector

        var config = savana.extend({
            msg: 'Hello World!'
        }, params);

        // Overall control of the form, which is called in your startup
        // Your code here
        // Use simple singleton
        var controlGeneral = {
            init: function(){
                $savana(target).content("text", config.msg)
            }
     
        };

        controlGeneral.init();

    };

})($savana);
```
##Use:
```
$savana("body").helloworld({
     msg: "Hello new world!"
});
```
