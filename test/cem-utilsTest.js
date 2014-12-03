/*global require, describe, it, expect*/
(function(){
    describe("cem-utils", function(){

        describe("function to find a <script> with the given source", function(){

            it("returns the script", function(){
                var SRC = 'foo/bar.js';
                var el = document.createElement('script');
                el.src = SRC;
                document.body.appendChild(el);
                expect(cemGetScriptWithSrc(SRC)).toEqual(el);
            });

        });

        describe('cemRequire (async DOM script loader)', function(){

            it('adds a script with given source path to the DOM when a given global (window) object is not present', function(){
                expect(document.get)
            })
        });

    });
})();
