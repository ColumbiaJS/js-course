(function () {
  'use strict';

  describe('variable declaration', function() {

    it(
      'variables declared with var not set to a value are undefined',
      function() {
        var a;
        expect(a).toBe(undefined);
      }
    );

    it('variables set to a value are not undefined', function() {
      var a = 3;
      expect(a).not.toBe(undefined);
      expect(a).toEqual(3);
    });
  });

  describe('primitive data types', function() {

    /* Number, String, Boolean, undefined, null */
    var number = 7.12,
        string = 'string',
        bool = true,
        notDefined = undefined,
        nullValue = null;

    it('JavaScript has 5 primitive data types', function() {
      expect(typeof number).toBe('number');
      expect(typeof string).toBe('string');
      expect(typeof bool).toBe('boolean');
      expect(typeof notDefined).toBe('undefined');
      expect(typeof nullValue).not.toBe('null');
    });

    describe('null is a primitive data type', function() {
      describe('but null is also an object', function() {
        it('null is an object', function() {
          expect(typeof null).toBe('object');
        });
      });
    });

    /**
     * In JavaScript, ints, floats, exponents, hexadecimal, octal, etc.
     * are all numbers (they're all of type number)
     * so are Infinity, -Infinity, and NaN
     */
    describe('number', function() {
      it(
        'The JavaScript type system does not distinguish between floats, ' +
        'ints, etc.', function() {
          var someNumber = 1;
          expect(typeof someNumber).toBe('number');
          someNumber = 1.34;
          expect(typeof someNumber).toBe('number');
          someNumber = 2e+3;
          expect(typeof someNumber).toBe('number');
          someNumber = 2E+3;
          expect(typeof someNumber).toBe('number');
          someNumber = 2E3;
          expect(typeof someNumber).toBe('number');
          someNumber = 2e3;
          expect(typeof someNumber).toBe('number');
          console.log('someNumber (2e3): ' + someNumber);
          someNumber = 0xff;  // 0x before a number signifies a hexadecimal value
          expect(typeof someNumber).toBe('number');
          console.log('someNumber (0xff): ' + someNumber);
          someNumber = 'Now I\'m a string';
          expect(typeof someNumber).toBe('string');
        }
      );

      it('Infinity is a number in JavaScript', function() {
        var infiniteVal = Infinity;
        expect(typeof Infinity).toBe('number');
        expect(typeof infiniteVal).toBe('number');
        console.log('infiniteVal: ' + infiniteVal);
      });

      it('JavaScript can handle 1.7976931348623157e+308 and 5e-324', function() {
        var max = 1.7976931348623157e+308,
            min = 5e-324;
        expect(typeof max).toBe('number');
        expect(typeof min).toBe('number');

        expect(max).not.toEqual(Infinity);
        expect(min).not.toEqual(-Infinity);

        console.log('min: ' + min);
        console.log('max: ' + max);
      });

      it('JavaScript cannot handle 1e309', function() {
        var tooBig = 1e309;
        expect(typeof tooBig).toBe('number');
        expect(tooBig).toEqual(Infinity);
        console.log('tooBig: ' + tooBig);
      });

      it('You cannot add or subtract infinity from itself', function() {
        var number = Infinity - Infinity;
        expect(isNaN(number)).toBe(true);
        number = -Infinity + Infinity;
        expect(isNaN(number)).toBe(true);
      });

      it('Operating on infinity with another number results in Infinity', function() {
        expect(Infinity - 20).toBe(Infinity);
        expect(Infinity / 40).toBe(Infinity);
        expect(Infinity - 99999999999999).toBe(Infinity);
      });

      it('The type of NaN (not a number) is number', function() {
        var notANumber = NaN;
        expect(typeof notANumber).toBe('number');
      });

      it('you can distinguish NaN with isNaN', function() {
        var notANumber = NaN;
        console.log('notANumber: ' + notANumber);
        expect(isNaN(notANumber)).toBe(true);
      });

      it('NaN does not equal itself', function() {
        expect(NaN).not.toBe(NaN);
        expect(NaN == NaN).toBe(false);
        expect(NaN === NaN).toBe(false);
      });

      it('JavaScript returns NaN when an operation fails', function() {
        var invalidOperationResult = 10 * "string";
        console.log('invalidOperationResult: ' + invalidOperationResult);
        expect(isNaN(invalidOperationResult)).toBe(true);
      });
    });


    describe('Strings', function() {
      var string = 'I\'m a string!',
          numberString = '50',
          emptyString = '';

      it('Quoted strings, number-like strings, and empty strings ' +
          'should all be strings', function() {
        expect(typeof string).toBe('string');
        expect(typeof numberString).toBe('string');
        expect(typeof emptyString).toBe('string');
      });

      it('tries to convert number-like strings to numbers for you', function() {
        var numString = '50',
            result = numString * 20;
        expect(result).toBe(1000);
        expect(typeof result).toBe('number');

      });

      it('concatenating anything with the empty string converts it to a string', function() {
        var someBigNumber = 10000;

        expect('' + someBigNumber).toBe('10000');
        expect(typeof ('' + someBigNumber)).toBe('string');
      });
    });
  });

  describe('null', function() {
    it('', function() {
      expect(1 * null).toBe(0);
      expect(!!null).toBe(false);
      expect('' + null).toBe('null');
    });
  });

  describe('undefined', function() {
    it('', function() {
      expect(isNaN(1 * undefined)).toBe(true);
      expect(!!undefined).toBe(false);
      expect('' + undefined).toBe('undefined');
    });
  });

  describe('all other values', function() {
    describe('anything that is not a primitive data type is an object', function() {
      var a = {};

      it('is an object', function() {
        expect(typeof a).toBe('object');
      });
    });
  });



  describe('Operators', function() {
    // Operators take values or variables, perform an operation on them,
    // and return a value

    // 1 + 2
    // + is the operator, addition is the operation,
    // the operands, or input values, are 1 and 2
    // the result, the value returned, is 3
    var a, b;

    beforeEach(function () {
      a = 1;
      b = 2;
    });


    it('JavaScript uses the +,-,*,/,%,++, and -- operators', function() {
      var c = a + b;
      expect(c).toBe(3);
    });

    it('JavaScript can combine these operators with =', function() {
      a += b;
      expect(a).toBe(3);
    });
  });
})();
