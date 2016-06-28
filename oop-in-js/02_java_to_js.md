# Java 개발자를 위한 JS OOP (2)
안녕하세요. 강승철입니다. [지난번 자료](01_java_to_js.md)는 도움이 되셨는지 모르겠습니다. 이번에 소개해드릴 내용은 지난번 내용에 이어서 누락된 몇몇 표현법을 이어서 소개해드리려고 합니다.

## static 변수 선언

인간(Human)이 에덴 동산에 생성되면 디폴트로 "아담"으로 설정합니다.


```
// java

...

class Human extends Animal {
	
	public static String DEFAULT_NAME = "아담";	// static 변수 선언
	
	public Human () {
		this.setName(Human.DEFAULT_NAME);
		System.out.println("인간이 생성되었습니다.");
	}
	
	public void walk() {
		super.walk();
		System.out.println("이족보행을 합니다.");
	}
}

...

public class Eden {

	public static void main(String[] args) {
		
		Human human = new Human();
		
		System.out.println(human);
		System.out.println(human.getName());	// 출력 - 아담
        human.setName("이브");
        System.out.println(human.getName());	// 출력 - 이브
        
        ....
		

	}

}
```


```
// js

 <script>
 
 	...
	
	function Human () {
		this.setName(Human.defaultName);
		console.log("인간이 생성되었습니다.");
	}
	Human.defaultName = "아담";			// static 변수 선언
	Human.prototype = Object.extend(new Animal(), {
		walk: function () {
			Animal.prototype.walk.call(this);
			console.log("이족보행을 합니다.");
		}
	});
	
	...
	
	var huamn = new Huamn();
	console.log(human);
	console.log(human.getName);		// 출력 - 아담
	human.setName("이브");
	console.log(human.getName);		// 출력 - 이브
	
	...
	
 </script>

```
JS에서 Java의 static 변수는 `class`에 해당하는 `function`의 property로 설정합니다.

## static 메소드 선언
Human class에 Human instance를 변수로 하는 static method를 선언합니다.


```
// java

...

class Human extends Animal {
	
	public static String DEFAULT_NAME = "아담";	// static 변수 선언
	
	public static void whoAmI(Human human) {	// static 메소드 선언
		System.out.println("저의 이름은 " + human.getName() + "입니다.");
	}
	
	public Human () {
		this.setName(Human.DEFAULT_NAME);
		System.out.println("인간이 생성되었습니다.");
	}
	
	public void walk() {
		super.walk();
		System.out.println("이족보행을 합니다.");
	}
}

...

public class Eden {

	public static void main(String[] args) {
		
		Human human = new Human();
		
		System.out.println(human);
		System.out.println(human.getName());	// 출력 - 아담
		Human.whoAmI(human);					// 출력 - 저의 이름은 아담입니다.
        human.setName("이브");
        System.out.println(human.getName());	// 출력 - 이브
        Human.whoAmI(human);					// 출력 - 저의 이름은 이브입니다.
        
        ....
		

	}

}
```

```
// js

 <script>
 
 	...
	
	function Human () {
		this.setName(Human.defaultName);
		console.log("인간이 생성되었습니다.");
	}
	Human.defaultName = "아담";			// static 변수 선언
	Human.whoAmI = function (human) {
		console.log("저의 이름은" + human.getName() + "입니다.");
	};
	Human.prototype = Object.extend(new Animal(), {
		walk: function () {
			Animal.prototype.walk.call(this);
			console.log("이족보행을 합니다.");
		}
	});
	
	...
	
	var huamn = new Huamn();
	console.log(human);
	console.log(human.getName);		// 출력 - 아담
	Human.whoAmI(human);			// 출력 - 저의 이름은 아담입니다.
	human.setName("이브");
	console.log(human.getName);		// 출력 - 이브
	Human.whoAmI(human);			// 출력 - 저의 이름은 이브입니다.
	
	...
	
 </script>

```
JS에서 Java의 static 메소드는 static 변수 선언과 같이 class에 해당하는 function의 property로 설정합니다.

## 은닉화(information hiding)
이미 Java code에서는 _name이 은닉화가 되어있습니다. human._name으로 접근을 하려 하면 컴파일러가 오류를 내뱉기 때문에 잘 알 수 있는 내용이죠. 하지만, JS에서는 human._name이 접근이 됩니다! 일단 이 부분 부터 확인을 해보겠습니다.

```
// java

...

public class Eden {

	public static void main(String[] args) {
		
		Human human = new Human();
		
        System.out.println(human._human);	// !에러 - This field Animal._name is not visible.
        ....
		

	}

}
```

```
// js

 <script>
 
	...
	
	var huamn = new Huamn();
	console.log(human._name);	// 출력 - 아담
	
	...
	
 </script>

```

JS의 경우 스펙차원에서 은닉화를 지원하지 않기 때문에 생기는 문제인데, 이를 두고 JS는 진정한 OOP 언어가 아니다라고 주장하는 분들의 좋은 먹이가 되곤 합니다. 이러한 문제에 대해서 [더글러스 클록포드(Douglas Crockford)](https://en.wikipedia.org/wiki/Douglas_Crockford)가 만든 용어 중에 [privileged 메소드](http://javascript.crockford.com/private.html)란 것이 있습니다. 이를 활용하면 은닉화를 처리할 수 있습니다. 현재 code에서 setName과 getName이 Animal에 존재하므로 Animal을 수정합니다.

```
// js

 <script>
 	
 	function Animal () {
 		
 		var _name = null; 	// 지역변수 선언  (this._name = null을 변경했음)
 		
 		this.setName = function (name) {
 			_name = name;
 		};
 		this.getName = function () {
 			return _name;
 		};
 		
 	}
 	Animal.prototype = Object.extend(Animal.prototype, {
 		breathe: function () {
 			console.log("숨을 쉽니다.");
 		},
 		walk: function () {
 			console.log("걷습니다.");
 		}
 	});
 	
	...
	
	var huamn = new Huamn();
	console.log(human._name);	// 출력 - undefined
	
	...
	
 </script>

```

원리는 constructor(Animal `function`)에서 클로저를 활용하여 내부 변수를 public method가 참조하는 것입니다. 이런식으로 작성을 하게 되면 완벽하게 외부로부터 직접접근을 막을 수 있게 되어 저희들이 원하는 **은닉화 효과**를 얻을 수 있습니다.

(단, 이 방식은 생각보다 많은 메모리를 소모시키므로 최소한으로 사용하실 것을 **권장**!합니다.)

## 파일 쪼개기
[SOLID](https://ko.wikipedia.org/wiki/SOLID)를 지켜 만든 하나의 class는 .java 하나의 파일이어야 함은 **당연**합니다.

```
// java

// IDog.java
interface IDog {
	void bark();
}

// Animal.java
class Animal {

	private String _name;

	public Animal() {
		System.out.println("동물이 생성되었습니다.");
	}

	public void setName(String name) {  
		this._name = name;
	}

	public String getName() {
		return this._name;
	}

	public void breathe() {
		System.out.println("숨을 쉽니다.");
	}

	public void walk() {
		System.out.println("걷습니다.");
	}

}

// Human.java
class Human extends Animal {

	public static String DEFAUT_NAME = "아담";
	
	public static void whoAmI(Human human) {
		System.out.println("저의 이름은 " + human.getName() + "입니다.");
	}
	
	public Human () {
		this.setName(Human.DEFAUT_NAME);
		System.out.println("인간이 생성되었습니다.");
	}

	public void walk() {
		super.walk();
		System.out.println("이족보행을 합니다.");
	} 

}

// DogImpl.java
class DogImpl implements IDog {
	public void bark () {
		System.out.println("왕왕");
	}
}

// Dog.java
class Dog extends Animal implements IDog {

	private IDog _dogBehavior = new DogImpl();

	public Dog () {
		System.out.println("개가 생성되었습니다.");
	}

	public void bark () {
		this._dogBehavior.bark();
	}

}

// DogHuman.java
class DogHuman extends Human implements IDog {
	public void bark () {
		System.out.println("왕왕");
	}
}

// Eden.java
public class Eden {

	public static void main(String[] args) {
		Human human = new Human();

		System.out.println(human);
		//human.setName("아담");
		Human.whoAmI(human);
		System.out.println(human.getName());
		human.breathe();
		human.walk();       

		Dog dog = new Dog();
		System.out.println(dog);
		dog.setName("예삐");
		System.out.println(dog.getName());
		dog.bark();
		dog.breathe();
		dog.walk();

		DogHuman dogHuman = new DogHuman();

		dogHuman.walk();
		dogHuman.bark();
	}

}

```

JS에서는 이유도 알려주지 않은 체로 하나의 파일에 모든 기능(또는 모든 모듈)을 작성하도록 강요받습니다. 이 또한 Java 개발자들이 미치는 이유 중에 하나 입니다. 실제 하나의 파일에 작성을 하라는 이유는 브라우져환경에서 JS 파일이 많아지면 많아 질수록 서버요청이 많아지고 그에 따른 latency 문제가 발생하기 때문에 그렇습니다. 이는 여러가지 모듈 번들러(또는 모듈로더)로 해결가능하므로 이젠 파일을 쪼개서 개발하셔도 무방하다 봅니다. 
(오히려 전 장려합니다...)

자, 이제 JS도 모듈을 파일 단위로 쪼개겠습니다.

```
// js

// extend.js
Object.extend = Object.extend || function (target, source) {
	for (var key in source) {
		target[key] = source[key];
	}
	return target;
};

// DogBehavior.js
var DogBehavior = {
	bark: function () {
		console.log("왕왕");
	}
};

// Animal.js
function Animal () {
	var _name = null;	// 지역 변수 선언

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

// Human.js
function Human () {
	this.setName(Human.defaultName);
	console.log("인간이 생성되었습니다.");
}
Human.defaultName = "아담";
Human.prototype = Object.extend(new Animal(), {
	walk: function () {	// Override
		Animal.prototype.walk.call(this);
		console.log("이족보행을 합니다.")
	}
});

// Dog.js
function Dog () {}
Dog.prototype = Object.extend(new Animal(), DogBehavior);

// DogHuman.js
function DogHuman () {}
DogHuman.prototype = Object.extend(new Human(), DogBehavior);

// eden.js
var human = new Human();
console.log(human);
console.log(human._name);
console.log(human.getName());
human.breathe();
human.walk();

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

```
이 처럼 파일을 나누면 됩니다...만, 실제론 window가 오염이 되면서 **의존성(Dependency)**이 흐트러지면서 정상적으로 code가 동작하지 않을 수 있습니다. 이를 module pattern이라는 방법으로 조금 더 깔끔하게 정리하는 방법이 있습니다.

## module pattern (JS)
모듈 패턴은 꽤 많은 JS 오픈소스에서 볼 수 있습니다. 방식은 다음과 같습니다.

```
// js
(function (dependency) {

	...
	return Module;	// 모듈을 반환한다.

})(dependency);
```

위와 같은 code를 [IIFE(즉시실행함수)](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression)라 부릅니다.  간단히 설명하면 ()(); 에서 왼쪽에 ()에 익명함수(Factory function이라 부름)를 선언하고 오른쪽 ()에는 익명함수가 정상동작하기 위한 parameter를 설정합니다. 이 패턴을 사용하면 익명함수가 즉시 실행되면서 return을 하게되고 이 return 값을 받아 이전에 사용한 것 처럼 사용하면 됩니다.

실제로 이 코드를 이용하여 Animal와 Human을 작성 하면 다음과 같이 작성 할 수 있습니다.

```
// js

// Animal.js
var Animal = (function () {

	function Animal () {
		var _name = null;	// 지역 변수 선언

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

})();

// Human.js
var Human = (function (Animal) {

	function Human () {
		this.setName(Human.defaultName);
		console.log("인간이 생성되었습니다.");
	}
	Human.defaultName = "아담";
	Human.prototype = Object.extend(new Animal(), {
		walk: function () {	// Override
			Base.prototype.walk.call(this);
			console.log("이족보행을 합니다.")
		}
	});
	
	return Human;

})(Animal);

``` 

Animal은 특이 사항이 없습니다만, Human의 경우 Animal이 있어야만 정상적으로 code가 동작하므로 의존성 설정에 Animal로 하였습니다. 

위 작성방법을 조금 더 다듬에서 var를 삭제하도록 하겠습니다.

```
// js

// Animal.js
(function (root, factory) {

	// root는 window입니다.
	root.Animal = factory();	// Animal은 의존성이 필요 없습니다.

})(this, function () {

	function Animal () {
		var _name = null;	// 지역 변수 선언

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

// Human.js
(function (root, factory) {
	
	// root는 window입니다.
	root.Human = factory(root.Animal);	// Human은 Animal에 대해 의존성을 가지고 있습니다.
	
})(this, function (Animal) {

	function Human () {
		this.setName(Human.defaultName);
		console.log("인간이 생성되었습니다.");
	}
	Human.defaultName = "아담";
	Human.prototype = Object.extend(new Animal(), {
		walk: function () {	// Override
			Animal.prototype.walk.call(this);
			console.log("이족보행을 합니다.")
		}
	});
	
	return Human;

});

```

이게 요즘 최근(?)에 유행하는 [UMD(Universal Module Definition) Pattern](https://github.com/umdjs/umd) 중 browser global 방식을 사용한 것입니다. ()(); 에서 왼쪽()에 의존성을 설정할 수 있도록 code를 수정하고 factory function을 오른쪽()에서 인자로 받도록 했습니다. 여기서 root는 browser에서 동작시 window가 됩니다.


## 코드 정리 (JS)
위에서 소개해드린 방식으로 JS를 재작성 합니다.

```
// js

// extend.js
Object.extend = Object.extend || function (target, source) {
	for (var key in source) {
		target[key] = source[key];
	}
	return target;
};

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

// Animal.js
(function (root, factory) {

	// root는 window입니다.
	root.Animal = factory();	// Animal은 의존성이 필요 없습니다.

})(this, function () {

	function Animal () {
		var _name = null;	// 지역 변수 선언

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

// Human.js
(function (root, factory) {
	
	// root는 window입니다.
	root.Human = factory(root.Animal);	// Human은 Animal에 대해 의존성을 가지고 있습니다.
	
})(this, function (Animal) {

	function Human () {
		this.setName(Human.defaultName);
		console.log("인간이 생성되었습니다.");
	}
	Human.defaultName = "아담";
	Human.prototype = Object.extend(new Animal(), {
		walk: function () {	// Override
			Animal.prototype.walk.call(this);
			console.log("이족보행을 합니다.")
		}
	});
	
	return Human;

});

// Dog.js
(function (root, factory) {
	
	root.Dog = factory(root.Animal, root.DogBehavior);
	
})(this, function (Animal, DogBehavior) {
	
	function Dog () {}
	Dog.prototype = Object.extend(new Animal(), DogBehavior);
	
	return Dog;
	
});


// DogHuman.js
(function (root, factory) {

	root.DogHuman = factory(root.Human, root.DogBehavior);

})(this, function (Human, DogBehavior) {

	function DogHuman () {}
	DogHuman.prototype = Object.extend(new Human(), DogBehavior);

	return DogHuman;

});


// eden.js
(function (root, factory) {

	root.eden = factory(root.Human, root.Dog, root.DogHuman);
	
})(function (this, Human, Dog, DogHuman) {

	return function () {
		var human = new Human();
		console.log(human);
		console.log(human._name);
		console.log(human.getName());
		human.breathe();
		human.walk();
	
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


```

## private 메소드
이 또한 은닉화(infomation hiding) 문제와 같이 언어 스펙차원에서 private method를 지원안하기 때문에 자바 개발자들이 꽤나 괴로워합니다. 하지만, 이 부분도 생각보다 간단히(?) 해결됩니다. 

Human `class`에 introducingMe (public method)를 구현하는데 introducingMe method 내부에서 private method인 makeIntro를 호출하여 소개글을 작성하도록 하겠습니다.

```
// java

// Human.java
class Human extends Animal {

	public static String DEFAUT_NAME = "아담";
	
	public static void whoAmI(Human human) {
		System.out.println("저의 이름은 " + human.getName() + "입니다.");
	}
	
	public Human () {
		this.setName(Human.DEFAUT_NAME);
		System.out.println("인간이 생성되었습니다.");
	}

	private String makeIntro () {	// private method 선언
		return "저는 " + this.getName() + "입니다. 잘 부탁드립니다.";
	}

	public void walk() {
		super.walk();
		System.out.println("이족보행을 합니다.");
	} 
	
	public void introducingMe () {
		System.out.println(this.makeIntro());	// private method 호출 
	}

}


// Eden.java
public class Eden {

	public static void main(String[] args) {
		Human human = new Human();
		human.introducingMe();	// 출력 - 저는 아담입니다. 잘 부탁드립니다.
		...
	}
	
}
```


```

// Human.js
(function (root, factory) {
	
	// root는 window입니다.
	root.Human = factory(root.Animal);	// Human은 Animal에 대해 의존성을 가지고 있습니다.
	
})(this, function (Animal) {

	function makeIntro() { 		// private method
	  return "저는 " + this.getName() + "입니다. 잘 부탁드립니다.";
	}

	function Human () {
		this.setName(Human.defaultName);
		console.log("인간이 생성되었습니다.");
	}
	Human.defaultName = "아담";
	Human.prototype = Object.extend(new Animal(), {
		walk: function () {	// Override
			Animal.prototype.walk.call(this);
			console.log("이족보행을 합니다.")
		},
		introducingMe: function () {
			console.log(makeIntro.call(this));	// call을 이용하여 호출.
		}
	});
	
	return Human;

});


// eden.js
(function (root, factory) {

	root.eden = factory(root.Human, root.Dog, root.DogHuman);
	
})(function (this, Human, Dog, DogHuman) {

	return function () {
		var human = new Human();
		human.introducingMe();		// 출력 - 저는 아담입니다. 잘 부탁드립니다.
		
		...
	};

});

```

... 역시 받아들이기 힘든 부분입니다만 JS는 Java처럼 무언가 큰 틀(class)안에 규격에 맞춰서 code를 작성하는게 아니라, 위 방식처럼 여기저기 흩어져 있는 function을 얼기설기 엮어서 code를 작성합니다. 네... 그냥 받아들이시면 편합니다.

## 예제 소스
JS full-source를 확인하시길 원하신다면 [여기](./02_java_to_js_res/)를 클릭하십시오.

## 마무리
마지막으로 [뷰티플 자바스크립트](http://bjpublic.tistory.com/254) 책의 "함수형 자바스크립트" 내용 중 마지막 부분을 발췌하여 소개해드리면서 마치도록 하겠습니다.

> 자바스크립트는 객체지향, 명령형, 함수형 프로그래밍 스타일을 가진 멀티 패러다임 언어다. 자바스크립트는 여러분이 다른 스타일을 섞고 맞출 수 있는 프레임워크를 제공한다.그래서 그 결과 우아한 프로그램을 작성할 수 있다. 그러나 몇몇 프로그래머들은 다른 모든 패러다임을 잊고 오직 자신이 좋아하는 스타일만 고수한다. 때로 이렇게 융통성이 없어지는 것은 편안한 장소를 떠날 때의 공포 때문이며 사수들의 지혜에 너무 의존하기 때문이다. 어떤 이유에서 간에 하던 대로 하거나 아니면 작은 공간에 스스로를 가둬 둠으로써 자신의 의견을 제한한다.
> 
> 각기 다른 프로그래밍 스타일 사이의 적절한 균형을 찾는 것은 어렵다. 이는 많은 실험과 실수를 필요로 한다. 그러나 그것은 가치가 있는 행동이며 여러분의 소스코드는 추론하기 쉬워지는데다가 더욱 유연해 질 것이다. 결국 여러분 스스로가 디버깅에 시간을 덜 할애하고 더 많은 새롭고 흥미로운 것을 만들고 있는 것을 발견하게 될 것이다.
>
>자, 다른 언어의 기능과 패러다임에 도전하는 것을 두려워하지 말라. 그것들은 사용하기위해 존재하고 어디에도 가지 않을 것이다. 단, 기억하자. 유일한 진짜 패러다임은 없다. 그리고 오랜 습관을 버리고 새로운 것을 배우는데 너무 늦은 시간 따위는 없다.
>



