// DogBehavior.js
(function (root, factory) {

  root.DogBehavior = factory();

})(this, function () {

  return {
    bark: function () {
        console.log("왕왕");
    }
  };

});
