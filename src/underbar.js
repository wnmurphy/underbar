(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n > array.length) return array;
    return n === undefined ? array[array.length-1] : array.slice(array.length-n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if(Array.isArray(collection)){
      for(var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    }else{
      for(var key in collection){
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var filtered =[];
    _.each(collection, function(x){
      if(test(x)){
        filtered.push(x);
      }
    });
    return filtered;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, function(x){
      return test(x) == false;
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(arr) {
    var previousElement, uniqued = [];
    arr.sort();  
    _.each(arr, function(x){
      if(x !== previousElement){
        uniqued.push(x);
      }
      previousElement = x;
    });    
    return uniqued;
};

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var mapped = [];
    _.each(collection, function(x){mapped.push(iterator(x))});
    return mapped;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  _.reduce = function(collection, iterator, accumulator) {
      _.each(collection, function(x){
        if(accumulator === undefined){
          accumulator = x;
          return accumulator;
        };

        accumulator = iterator(accumulator, x);
      });
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, cb) {
    if(arguments.length === 1){
      var allTrue = true;
      _.each(collection, function(x){
        allTrue = (x === true);
      });
      return Boolean(allTrue);
    }
    return _.reduce(collection, function(stillTrue, item){
      if(!stillTrue){
        return Boolean(false);
      }
      return Boolean(cb(item));
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    var anyTrue = false;
    if(arguments.length === 1){
      _.each(collection, function(x){
        if(Boolean(x) === true){
          anyTrue = true;
        }
      });
      return Boolean(anyTrue);
    }
    _.each(collection, function(x){
      if(Boolean(iterator(x)) === true){
        anyTrue = true;
      }
      
    });
    return Boolean(anyTrue);
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    for(var i = 1; i < arguments.length; i++){
      for(var key in arguments[i]){
        obj[key] = arguments[i][key];
      }
    }
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    for(var i = 1, key, currentAddObj = arguments[i]; i < arguments.length; i++){
      for(key in currentAddObj){
        if(key in obj){
          break;
        }else if(obj[currentAddObj[key]] === undefined){
          obj[key] = currentAddObj[key];
        }else if(currentAddObj[key] in obj){
          break;
        }
      }
    }
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  _.memoize = function(func){
    var memoized = {};
    return function memoize(){
      var args = Array.prototype.slice.call(arguments);
      if(memoized[args]){
        return memoized[args];
      }else{
        memoized[args] = func.apply(this, args);
        return memoized[args];
      }
    }
  };
  
  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = [];
    for(var i = 2; i < arguments.length; i++){
      args.push(arguments[i]);
    }
    console.log(args);
    setTimeout(function(){
      func.apply(null, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

  _.shuffle = function(array) {
    var shuffled = array.slice();
    
    shuffled.sort(function(a, b){
        return (Math.random() - 0.5);
    });  
    
    return shuffled;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  /*
  _.invoke(['dog', 'cat'], 'toUpperCase'); //['DOG', 'CAT']
  */
  _.invoke = function(collection, functionOrKey, args) {
    var invoked = [];
    _.each(collection, function(x){
      if(typeof functionOrKey === 'function'){
        invoked.push(functionOrKey.apply(x, args));
      }else{
        var method = eval('"' + x + '"' + '.' + functionOrKey + '(' + args + ')');
        invoked.push(method);
      }
    });
    return invoked;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    var sorted = [];
    if(typeof iterator === 'string'){
      _.each(collection, function(x){
        sorted.push(x[iterator]);
      });
    }
    if(typeof iterator === 'function'){
      sorted = collection;
      _.each(collection, function(x){
        sorted.sort(iterator);
      });
    }
    return sorted;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]

  _.zip = function() {
    var zipped = [], len, currentArr=[];
    var args = Array.prototype.slice.call(arguments);
    var numOfArrays = args.length;

    // iterate over arguments to get the greatest length
    var greatestLength = 0;
    for(var i = 0; i < numOfArrays; i++){
      if (args[i].length > greatestLength){
        greatestLength = args[i].length;
      } 
    }
    
    for(var j = 0; j < greatestLength; j++){
     //clear out the last set of jth elements from currentArr 
      currentArr = [];
      // stay on the jth element for all arrays
      for(var k = 0; k < numOfArrays; k++){
        // get the jth element from the kth array and push it to currentArr
        currentArr.push(args[k][j]);
      }
    // push the currentArr to zipped
      zipped.push(currentArr);
    }
    return zipped;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray){
    var flattened = [];
    
    function pusher(arr){
      if(Array.isArray(arr)){
        for(var i = 0; i < arr.length; i++){
          if(Array.isArray(arr[i])){
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
  _.intersection = function(arr1, arr2) {
    var results = [];
    for(var i = 0; i < arr1.length; i++){
        for(var j = 0; j < arr2.length; j++){
            if(arr2[j] === arr1[i]){
                results.push(arr1[i]);
            }
        }   
    }  
    return results;
};

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(arr1, arr2, arr3) {
    var results = [];
    if(arr3){
        arr2 = arr2.concat(arr3);
    }
    for(var i = 0; i < arr1.length; i++){
        var presentInBoth = false;
        for(var j = 0; j < arr2.length; j++){
            if(arr1[i] === arr2[j]){presentInBoth = true;}
        }
        if(presentInBoth === false){
                results.push(arr1[i]);
        }
    }
    return results;
};
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
    // add a triggered flag, set to false
    // execute the given function
    // set triggered to true
    // execute a setTimeout function which sets the flag to true after the wait period
    // 
  };
}());