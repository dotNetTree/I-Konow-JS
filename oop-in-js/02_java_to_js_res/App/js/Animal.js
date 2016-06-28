// Animal.js
(function (root, factory) {

  // root는 window입니다.
  root.Animal = factory();    // Animal은 의존성이 필요 없습니다.

})(this, function () {

  function Animal () {
    var _name = null;   // 지역 변수 선언

    this.setName = function (name) {
        _name = name;
    };
    this.getName = function () {
        return _name;
    };
    console.log("동물이 생성되었습니다.");
  }
  Animal.prototype = Object.extend(Animal.prototype, {
    breathe: function () {
        console.log("숨을 쉽니다.");
    },
    walk: function () {
        console.log("걷습니다.");
    }
  });

  return Animal;

});
