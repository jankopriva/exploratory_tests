buster.spec.expose();

describe("Array functions", function () {
    describe("#reduce", function() {
        it("should give the same result as using forEach", function () {
            var array = ['A', 'B', 'C'];
            var taggedItemsFixture = array.reduce(function(tags, letter) {
                tags[letter] = letter + "tag";
                return tags;
            }, {});

            var taggedItems = {};
            array.forEach(function(letter) {
                taggedItems[letter] = letter + "tag";
            });

            assert.equals(taggedItems, taggedItemsFixture, "${0} expected to be equal to ${1}");
        });
    });
});


describe("argument object", function() {
    it("should create argument object when function does have parameters defined", function() {
        var runner = function() {
            obj.func.apply(obj, Array.prototype.slice.apply(arguments));
        };

        var obj = {
            func: function() {
                return arguments;
            }
        };

        var funcSpy = this.spy(obj, 'func');

        runner(1);

        assert(funcSpy.returned(sinon.match({0: 1})));
    });
});

describe("object properties iteration", function() {
    it("should ignore newly added keys to object during iteration", function(){
        obj = {
            0: '0',
            1: '1'
        };

        var current;

        for (var key in obj) {
            if (key === '1') {
                obj['2'] = '2';
            }

            current = obj[key];
        }

        // This should fail in IE8
        assert.equals('1', current, 'Object has been modified during properties iteration');
    });
});