// DogHuman.js
(function (root, factory) {

  root.DogHuman = factory(root.Human, root.DogBehavior);

})(this, function (Human, DogBehavior) {

  function DogHuman () {}
  DogHuman.prototype = Object.extend(new Human(), DogBehavior);

  return DogHuman;

});
