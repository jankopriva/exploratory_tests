buster.spec.expose();

describe("Array functions", function () {
    describe("#reduce", function() {
        it("should give the same result as using map", function () {
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