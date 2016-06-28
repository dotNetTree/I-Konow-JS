// eden.js
(function (root, factory) {

  root.eden = factory(root.Human, root.Dog, root.DogHuman);

})(this, function (Human, Dog, DogHuman) {

  return function () {
    var human = new Human();
    console.log(human);
    console.log(human._name);
    console.log(human.getName());
    human.breathe();
    human.walk();
    human.introducingMe();

    var dog = new Dog();
    console.log(dog);
    dog.setName("예삐");
    console.log(dog.getName());
    dog.bark();
    dog.breathe();
    dog.walk();

    var dogHuman = new DogHuman();
    dogHuman.walk();
    dogHuman.bark();
  };

});
