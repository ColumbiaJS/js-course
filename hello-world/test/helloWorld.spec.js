(function () {
  /* jshint globalstrict: true */
  /* global HelloWorld: false */
  'use strict';

  describe('Hello World', function() {
    var coolFunction = function (func) {
      return func();
    };
    it('should store a string variable using the var keyword', function() {
      var hello = 'Hello World';
      console.log(hello);
      expect(hello).toEqual('Hello World');
    });

    it('stores hello world in the HelloWorld function', function() {
      var hw = new HelloWorld();
      expect(hw.hello).toEqual('Hello World');
    });

    it('can pass functions around', function() {
      var a = 2;

      var add3 = function (value) {
        return value + 3;
      };

      var doSomeMath = function (anotherValue, func) {
        return anotherValue + func(7);
      };
      // function add3(val) {
      //   return val + 3;
      // }

      add3(a);
      doSomeMath(9, add3);
      expect(add3(a)).toEqual(5);
      expect(doSomeMath(9, add3)).toEqual(19);

    });
  });
})();
