(function () {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument.
  _.identity = function (val) {
    return val;
  };

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function (array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function (array, n) {
    if (n > array.length) {
      return array;
    }
    return n === undefined ? array[array.length-1] : array.slice(array.length-n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function (collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function (array, target) {
    var result = -1;

    _.each(array, function (item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function (collection, test) {
    var filtered =[];
    _.each(collection, function (x) {
      if (test(x)) {
        filtered.push(x);
      }
    });
    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function (collection, test) {
    return _.filter(collection, function (x) {
      return test(x) === false;
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function (arr) {
    var previousElement, uniqued = [];
    arr.sort();
    _.each(arr, function (x) {
      if (x !== previousElement) {
        uniqued.push(x);
      }
      previousElement = x;
    });
    return uniqued;
};

  // Return the results of applying an iterator to each element.
  _.map = function (collection, iterator) {
    var mapped = [];
    _.each(collection, function (x) {
      mapped.push(iterator(x));
    });
    return mapped;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function (collection, key) {
    return _.map(collection, function (item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.

  _.reduce = function (collection, iterator, accumulator) {
      _.each(collection, function (x) {
        if (accumulator === undefined) {
          accumulator = x;
          return accumulator;
        }

        accumulator = iterator(accumulator, x);
      });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function (collection, target) {
    return _.reduce(collection, function (wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function (collection, cb) {
    if (arguments.length === 1) {
      var allTrue = true;
      _.each(collection, function (x) {
        allTrue = (x === true);
      });
      return Boolean(allTrue);
    }
    return _.reduce(collection, function (stillTrue, item) {
      if (!stillTrue) {
        return Boolean(false);
      }
      return Boolean(cb(item));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function (collection, iterator) {
    var anyTrue = false;
    if (arguments.length === 1) {
      _.each(collection, function (x) {
        if( Boolean(x) === true) {
          anyTrue = true;
        }
      });
      return Boolean(anyTrue);
    }
    _.each(collection, function (x) {
      if (Boolean(iterator(x)) === true) {
        anyTrue = true;
      }

    });
    return Boolean(anyTrue);
  };

  _.extend = function (obj) {
    for (var i = 1; i < arguments.length; i++) {
      for (var key in arguments[i]) {
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already exists in obj
  _.defaults = function (obj) {
    for (var i = 1, key, currentAddObj = arguments[i]; i < arguments.length; i++) {
      for (key in currentAddObj) {
        if (key in obj) {
          break;
        } else if (obj[currentAddObj[key]] === undefined) {
          obj[key] = currentAddObj[key];
        } else if (currentAddObj[key] in obj) {
          break;
        }
      }
    }
    return obj;
  };

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    var alreadyCalled = false;
    var result;

    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  // _.memoize returns a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function (func) {
    var memoized = {};
    return function memoize () {
      var args = Array.prototype.slice.call(arguments);
      if (memoized[args]) {
        return memoized[args];
      } else {
        memoized[args] = func.apply(this, args);
        return memoized[args];
      }
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = [];
    for (var i = 2; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    console.log(args);
    setTimeout(function(){
      func.apply(null, args);
    }, wait);
  };


  _.shuffle = function (array) {
    var shuffled = array.slice();

    shuffled.sort(function (a, b) {
        return (Math.random() - 0.5);
    });

    return shuffled;
  };


  _.invoke = function (collection, functionOrKey, args) {
    var invoked = [];
    _.each(collection, function (x) {
      if (typeof functionOrKey === 'function') {
        invoked.push(functionOrKey.apply(x, args));
      } else {
        var method = eval('"' + x + '"' + '.' + functionOrKey + '(' + args + ')');
        invoked.push(method);
      }
    });
    return invoked;
  };


  _.sortBy = function (collection, iterator) {
    var sorted = [];
    if (typeof iterator === 'string') {
      sorted = collection.sort(function (a, b) {
        return a[iterator] > b[iterator];
      });
    } else {
      for (var i = 0; i < collection.length; i++) {
        if (Object.prototype.toString.call(collection[i]) === '[object Object]') {
          sorted = collection.sort(iterator);
          break;
        } else if (typeof collection[i] === 'number') {
          sorted = collection.sort(function (a,b) {
            return a-b;
          });
        }
      }
    }
    return sorted;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  _.zip = function () {
    var zipped = [], len, currentArr=[];
    var args = Array.prototype.slice.call(arguments);
    var numOfArrays = args.length;

    // iterate over arguments to get the greatest length
    var greatestLength = 0;
    for (var i = 0; i < numOfArrays; i++) {
      if (args[i].length > greatestLength) {
        greatestLength = args[i].length;
      }
    }

    for (var j = 0; j < greatestLength; j++) {
     //clear out the last set of jth elements from currentArr
      currentArr = [];
      // stay on the jth element for all arrays
      for (var k = 0; k < numOfArrays; k++) {
        // get the jth element from the kth array and push it to currentArr
        currentArr.push(args[k][j]);
      }
    // push the currentArr to zipped
      zipped.push(currentArr);
    }
    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  _.flatten = function (nestedArray) {
    var flattened = [];

    function pusher (arr) {
      if (Array.isArray(arr)) {
        for (var i = 0; i < arr.length; i++) {
          if (Array.isArray(arr[i])) {
            pusher(arr[i]);
          }else{
            flattened.push(arr[i]);
          }
        }
      }
    }
    pusher(nestedArray);
    return flattened;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function (arr1, arr2) {
    var results = [];
    for (var i = 0; i < arr1.length; i++) {
        for (var j = 0; j < arr2.length; j++) {
            if (arr2[j] === arr1[i]) {
                results.push(arr1[i]);
            }
        }
    }
    return results;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function (arr1, arr2, arr3) {
    var results = [];
    if (arr3) {
        arr2 = arr2.concat(arr3);
    }
    for (var i = 0; i < arr1.length; i++) {
        var presentInBoth = false;
        for (var j = 0; j < arr2.length; j++) {
            if (arr1[i] === arr2[j]){
              presentInBoth = true;
            }
        }
        if (presentInBoth === false) {
                results.push(arr1[i]);
        }
    }
    return results;
  };
}());
