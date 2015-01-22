(function () {
  'use strict';

  describe('Calculator', function() {
    describe('calculator functions', function() {
      it('adds, subtracts, divides, and multiplies', function() {
        function add(a, b) { return a + b; }
        function subtract(a, b) { return a - b; }
        function divide(a, b) { return a / b; }
        function multiply(a, b) { return a * b; }

        expect(add(3,2)).toEqual(5);
        expect(subtract(3,2)).toEqual(1);
        expect(divide(3,2)).toEqual(1.5);
        expect(multiply(3,2)).toEqual(6);
      });

      describe('A Calculator function', function() {

        it('can calculate with functions set on this', function() {

          // when we declare a function by beginning with the function keyword,
          // we don't use a semicolon at the end of the function definition
          // at all other times we do
          function Calculator() {
            this.lastResult = null; // notice the ;
            this.add = function(a, b) { return a + b; }; // notice the ;
            this.subtract = function(a, b) { return a - b; };
            this.divide = function(a, b) { return a / b; };
            this.multiply = function(a, b) { return a * b; };
          }

          var calc = new Calculator(); // create a new calculator object

          expect(calc.add(3,2)).toEqual(5);
          expect(calc.subtract(3,2)).toEqual(1);
          expect(calc.divide(3,2)).toEqual(1.5);
          expect(calc.multiply(3,2)).toEqual(6);

        });

        it('can calculate with functions set on the prototype', function() {

          function Calculator() {}

          Calculator.prototype.add = function(a, b) { return a + b; };
          Calculator.prototype.subtract = function(a, b) { return a - b; };
          Calculator.prototype.divide = function(a, b) { return a / b; };
          Calculator.prototype.multiply = function(a, b) { return a * b; };

          var calc = new Calculator();

          expect(calc.add(3,2)).toEqual(5);
          expect(calc.subtract(3,2)).toEqual(1);
          expect(calc.divide(3,2)).toEqual(1.5);
          expect(calc.multiply(3,2)).toEqual(6);


        });

        it('can keep track of the last result using a property', function() {

          function Calculator() {
            this.lastResult = null;
            // notice that whenever we use more than one line we keep the
            // opening braces on the right and start indented on the next line
            this.add = function(a, b) {
              var result = a + b;
              this.lastResult = result;
              return result;
            }; // notice the ;
            this.subtract = function(a, b) {
              this.lastResult = a - b; // we could also just set last result
                                       // immediately and return it
              return this.lastResult;
            };
            this.divide = function(a, b) {
              // we could even set this.lastResult in our return but this is
              // much less clear
              return this.lastResult = a / b;
            };
            // and making it one line makes it even less clear!
            this.multiply = function(a, b) { return this.lastResult = a * b; };
          }  // no ; here

          var calc = new Calculator();

          expect(calc.lastResult).toBe(null);
          expect(calc.add(3,2)).toEqual(5);
          expect(calc.lastResult).toEqual(5);
          expect(calc.subtract(3,2)).toEqual(1);
          expect(calc.lastResult).toEqual(1);
          expect(calc.divide(3,2)).toEqual(1.5);
          expect(calc.lastResult).toEqual(1.5);
          expect(calc.multiply(3,2)).toEqual(6);
          expect(calc.lastResult).toEqual(6);

        });

        it('can keep track of the last result using a variable and a getter', function() {

          function Calculator() {
            var lastResult = null; // this variable is not a property of the
                                   // object returned from new Calculator()
                                   // so we cannot access it from outside the
                                   // function

            // we need to use an accessor function like this to get it
            this.getLastResult = function () { return lastResult; };
            this.add = function(a, b) {
              var result = a + b;
              lastResult = result; // we no longer use this to set lastResult,
              return result;
            }; // notice the ;
            this.subtract = function(a, b) {
              lastResult = a - b; // we could also just set last result
                                       // immediately and return it
              return lastResult;
            };
            this.divide = function(a, b) {
              // we could even set lastResult in our return but this is
              // much less clear
              return lastResult = a / b;
            };
            // and making it one line makes it even less clear!
            this.multiply = function(a, b) { return lastResult = a * b; };
          }  // no ; here

          var calc = new Calculator();

          expect(calc.getLastResult()).toBe(null);
          expect(calc.add(3,2)).toEqual(5);
          expect(calc.getLastResult()).toEqual(5);
          expect(calc.subtract(3,2)).toEqual(1);
          expect(calc.getLastResult()).toEqual(1);
          expect(calc.divide(3,2)).toEqual(1.5);
          expect(calc.getLastResult()).toEqual(1.5);
          expect(calc.multiply(3,2)).toEqual(6);
          expect(calc.getLastResult()).toEqual(6);

        });

        it('can do the exact same thing using the prototype property ' +
            'and this.lastResult', function() {

          function Calculator() {
            this.lastResult = null;
          }

          Calculator.prototype.add = function(a, b) {
            var result = a + b;
            this.lastResult = result;
            return result;
          };
          Calculator.prototype.subtract = function(a, b) {
            this.lastResult = a - b;
            return this.lastResult;
          };
          Calculator.prototype.divide = function(a, b) {
            this.lastResult = a / b;
            return this.lastResult;
          };
          Calculator.prototype.multiply = function(a, b) {
            this.lastResult = a * b;
            return this.lastResult
          };

          var calc = new Calculator();

          expect(calc.lastResult).toBe(null);
          expect(calc.add(3,2)).toEqual(5);
          expect(calc.lastResult).toEqual(5);
          expect(calc.subtract(3,2)).toEqual(1);
          expect(calc.lastResult).toEqual(1);
          expect(calc.divide(3,2)).toEqual(1.5);
          expect(calc.lastResult).toEqual(1.5);
          expect(calc.multiply(3,2)).toEqual(6);
          expect(calc.lastResult).toEqual(6);

        });

        it('can not keep track of the last result using a variable and a ' +
           'getter with prototypal functions', function() {

          function Calculator() {
            var lastResult = null; // this variable is not accessible outside
                                   // this function
          }

          // NONE OF THESE FUNCTIONS WILL WORK, SINCE THEY ONLY HAVE ACCESS
          // TO PROPERTIES OF THE CALCULATOR FUNCTION (ACCESSED BY this)
          // AND NOT TO VARIABLES STORED WITHIN THE FUNCTION ITSELF
          Calculator.prototype.getLastResult = function() {
            return lastResult; // this causes an error at compile time
          };
          Calculator.prototype.add = function(a, b) {
            var result = a + b;
            lastResult = result;
            return result;
          };

          // we can no longer create a new Calculator objects without causing a
          // reference error (lastResult is not defined)
          // var calc = new Calculator();

        });

      });
    });
  });
})();
