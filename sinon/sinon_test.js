buster.spec.expose();


describe ("Spies", function() {
    it("should wrap method called by the Ember observer", function() {
        var Dog = Em.Object.extend({
            color: undefined,

            colorObserver: function() {
                this.reportColor();
            }.observes('color'),

            reportColor: function() {
                console.log("Dog's color: " + this.get('color'));
            }
        });

        var dog = Dog.create();

        var dogColorReporterSpy = this.spy(dog, 'reportColor');

        dog.set('color', 'blue');

        assert.calledOnce(dogColorReporterSpy, "Dog's color should be reported");
    });

    it ("should call callback in 2nd argument and pass it a parameter", function() {
        var callback = sinon.spy();
        var callback2 = sinon.spy();

        var stub = sinon.stub().callsArgWith(2, 'Hello');

        stub(1, callback, callback2);

        assert.calledWith(callback2, 'Hello');
    });
});

describe ("Stubs", function() {
    describe("stubbing behavior", function() {

        it("returns value based on argument", function() {
            var stub = this.stub().withArgs(3).returns('Hello');

            console.log(stub(3));
        });

        it("should replace object's method", function() {
            var obj = Em.Object.create({
                log: function() {
                    console.log("Hi there!");
                }
            });

            var stub = this.stub(obj, 'log', function() {
                console.log("Hmm...");
            });

            obj.log();

            // obj#log is wrapped by the spy
            assert.calledOnce(obj.log);
        });
    });

    describe("#callsArg", function() {
        it("should call 2nd argument as a callback", function() {
            var callback = function() {
                console.log("I am invoked!");
            };

            var callbackSpy = this.spy(callback);

            var stub = this.stub().callsArg(1);

            stub(1, callbackSpy);

            assert.calledOnce(callbackSpy, "Stub should call callback once given as a parameter");
        });
    });

    describe("#yields", function(){
        it("should pass arguments to the callback", function() {
            var callback = function(str) {
                console.log(str);
            };

            var callbackSpy = this.spy();

            var stub = this.stub().yields("Hello", "World");

            stub(callbackSpy);

            assert.calledWith(callbackSpy, 'Hello', 'World');
        });
    });

    describe("#yield", function() {
        it("should invoke callback with given argument", function() {
            var callbackSpy = this.spy();
            var callback = function(str) {
                console.log("Got: ", str);
            };
            var stub = this.stub();

            stub(callbackSpy);

            stub.yield("Hello");

            assert.calledOnceWith(callbackSpy, "Hello");
        });
    });

    describe("#yieldTo", function() {
        it("should invoke callback specified in the config object", function() {
            var stub = this.stub();
            stub({
                'success': function(what) {
                    console.log(what + " successfull!");
                },
                'failure': function() {
                    console.log("Something wrong happened!");
                }
            });

            // Prints 'Request successfull!'
            stub.yieldTo('success', 'Request');
        });
    });
});

describe("Mocks", function() {
    describe("#mock", function() {
        it("should be needed to call method on mock in order to trigger the verification",
            function() {
                var dog = Em.Object.create({eat: function() {}});

                var mock = sinon.mock(dog).expects('eat').once();

                dog.eat();

                mock.verify();
        });

        it("should be able to pass parameters to function callback", function() {
            var spy = sinon.spy();

            var dog = Em.Object.create({
                eat: function(how) {}
            });

            var mock = sinon.mock(dog).expects("eat").yields("meat");
            dog.eat(spy);

            mock.verify();

            assert.calledWith(spy, "meat");
        });
    });


});