buster.spec.expose();


describe("Computed property behavior", function() {
    it("calling #property without arguments should create cacheable property", function() {
        var obj = Em.Object.create({
            cp: function(key, value) {
                if (value !== undefined) {
                    this._value = value + 1;
                }

                this._value++;

                return this._value;
            }.property()
        });

        obj.set('cp', 0);

        assert.equals(2, obj.get('cp'));
        assert.equals(2, obj.get('cp'), "Value should be cached");

    });
});

describe("Observers", function() {
    it("should notify observer again if setting different value to the observable inside that observer", function() {
        var obj = Em.Object.create({
            prop: undefined,
            propObserver: function() {
                console.log('Observer fired');
                // Triggers change only if the new value is different from the old one
                this.set('prop', 'BBB');
            }.observes('prop')
        });

        this.spy(obj, 'propObserver');
        obj.set('prop', 'AAA');
        assert.calledTwice(obj.propObserver, "Observer should be called only once");
    });
});

describe("Bindings", function() {
    it("should create array on the both ends of the binding", function() {
        var App = Em.Application.create();

        App.obj1 = Em.Object.create({
            arr: []
        });


        App.obj2 = Em.Object.create({
            arryBinding: 'App.obj1.arr'
        });

        Em.run.sync();

        App.obj1.set('arr', [1,2,3]);

        Em.run.sync();
        assert.equals([1,2,3], App.obj2.get('arry'), "Binding should be established between objects");
    });
});