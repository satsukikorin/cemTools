(function cemDOM(){

    console.log('loading cemDOM as $');

    function q$ (css) {
        return q$$(document.querySelectorAll(css));
    }

    function q$$ (nodeList) {
        return [].slice.call(nodeList,0);
    }

    function $$ (what) {
        var result = [];

        if (what instanceof Node) result = [what];
        else if (typeof what === 'string') result = q$(what);
        else if (what instanceof NodeList) result = q$$(what);
        else if (what instanceof Array && what[0] instanceof Node) result = what;
        else if (what instanceof Array && what[0] instanceof String) {
            what.forEach(function(cssSelector){
                result = result.concat(result, $$(cssSelector));
            });
        }

        return result;
    }

    $ = window.$ || function (what) {
        return document.querySelectorAll(what);
    };

    $.on = function (what, event, fn) {
        $$(what).forEach(function(el){
            el.addEventListener(event, fn);
        });
    };

    $.off = function (what, event, fn) {
        $$(what).forEach(function(el){
            el.removeEventListener(event, fn);
        });
    };

    $.once = function (what, event, fn) {
        var once = function(){
            fn.call(this);
            $.off(this, event, once);
        };
        $$(what).forEach(function(el){
            $.on(el, event, once);
        });
    };


})();
