// empty stub function
function cemNoop(){}

// Avoid 'console' errors in browsers that lack a console.
if(typeof console==="undefined"){console={};}
['log','debug','error','warn'].forEach(function(m){
    if(typeof console[m]==='undefined') console[m]=cemNoop;
});

/**
 * @param {string} path
 * @param {boolean} [isAsync]
 */
function cemInjectDOMScript (path, isAsync) {
    var n = document.createElement('script');
    if (isAsync !== false) n.async = true;
    n.src = path;
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(n, s);
}

/**
 * At least for now, this serves simply for global dependency injection, not for version management etc.
 * Usage:
 *   cemRequire(
 *     [{'_', 'path/to/_.js'}, {'$','cem-dom.js'}],
 *     initApp
 *   );
 * @param {Array<object>} dependencies
 * @param {function} callback
 */
function cemRequire (dependencies, callback) {
    var allLoaded = true,
        // TODO: add validation that deps type === array of maps like {'namespace':'path'}, e.g.{'$': 'path/to/cem-dom.js'}
        deps = [].slice.call(dependencies,0), depName;

    deps.forEach(function injectIfNeeded(dep){
        depName = Object.keys(dep)[0];
        if (typeof window[depName] === 'undefined') {
            allLoaded = false;
            cemRequire.pending[depName] = {waitedTime: 1};
            cemInjectDOMScript(dep[depName]);
        }
    });

    if (allLoaded) callback();
    else cemRequire.poll(callback);
}

// registry for components pending load, with names as keys and values as approx. how long we've waited, in millisecs.
cemRequire.pending = {};
cemRequire.timeout = 10000;// millisecs

cemRequire.poll = function (callback) {
    var interval = 20;
    var pending = Object.getOwnPropertyNames(cemRequire.pending);
    pending.forEach(function(depName){
        if (typeof window[depName] !== 'undefined') delete cemRequire.pending[depName];
        else {
            if (cemRequire.pending[depName].waitedTime > cemRequire.timeout) delete cemRequire.pending[depName];
            else cemRequire.pending[depName].waitedTime += interval;
        }
    });

    if (pending.length === 0) callback();
    else {
        setTimeout(function(){
            cemRequire.poll(callback);
        }, interval);
    }
};

// find a script tag with a src that ends with the given path
cemGetScriptWithSrc = function (path) {
    var match = false,
        scripts = document.getElementsByTagName('script'),
        regx = new RegExp(path+'$'),
        i=0, l=scripts.length;
    for (; i<l; i++) {
        if (regx.test(scripts[i].src)) {
            match = true;
            break;
        }
    }
    return match;
};


