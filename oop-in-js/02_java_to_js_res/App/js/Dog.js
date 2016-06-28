// Dog.js
(function (root, factory) {

  root.Dog = factory(root.Animal, root.DogBehavior);

})(this, function (Animal, DogBehavior) {

  function Dog () {}
  Dog.prototype = Object.extend(new Animal(), DogBehavior);

  return Dog;

});
