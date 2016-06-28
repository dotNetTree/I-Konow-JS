// Human.js
(function (root, factory) {

    // root는 window입니다.
    root.Human = factory(root.Animal);  // Human은 Animal에 대해 의존성을 가지고 있습니다.

})(this, function (Animal) {

  function makeIntro() {
    return "저는 " + this.getName() + "입니다. 잘 부탁드립니다.";
  }

  function Human () {
    this.setName(Human.defaultName);
    console.log("인간이 생성되었습니다.");
  }
  Human.defaultName = "아담";
  Human.prototype = Object.extend(new Animal(), {
    walk: function () { // Override
      Animal.prototype.walk.call(this);
      console.log("이족보행을 합니다.");
    },
    introducingMe: function () {
      console.log(makeIntro.call(this));
    }
  });

  return Human;

});
