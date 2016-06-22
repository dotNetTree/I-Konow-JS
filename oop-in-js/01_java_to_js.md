# Java 개발자를 위한 JS OOP
안녕하세요. 강승철입니다. 요즘 회사에서 교육을 진행해보면서 제가 생각하는 것과 교육을 받는 입장의 분들의 생각이 너무 다르다는 것을 느꼇습니다. 그 중 하나가 Java와 JS는 크게 다르지 않다는 것인데... (이건 제 생각) 다른 분들은 그렇지 않으신 모양입니다. 그래서 Java 문법이 어떻게 JS로 변환이 되는지 소개를 해드릴까합니다. 

그 전에 이 글을 읽는 초보 개발자분들도 계실 수 있으니, 몇가지 가정을 하고 진행하겠습니다. 이 예제를 따라 하시는 여러분들은 신(GOD)이 되는 겁니다. 그리고 여러분들이 해야 하는 업무는 (에덴 동산같은) 어떠한 세계를 만드는 것입니다. 저는 예제로 에덴 동산에 개와 인간를 만들 예정입니다.

그리고, ES6 spec이 아닙니다.

## 기초 준비
먼저 Eden 동산을 만듭시다.

```
// java

public class Eden {

	public static void main(String[] args) {
		

	}

}
```


```
 // js
 <script>

 </script>
```

## 클래스 선언
바로 인간을 빚어봅시다. 

```
// java

class Human {
	
}

public class Eden {

	public static void main(String[] args) {
		
	}

}

```

```
// js

 <script>
	
	function Human () {
	
	}
	
 </script>

```
JS에서 Java의 `class`에 대응하는 것은 `function`입니다. 보통 Java 개발자들이 이 부분을 납득을 하지 못하는데, 그 이유는 function = method라는 공식이 머리 속에 있기 때문입니다. 이제 알고 있는 공식에 이것도 집어넣읍시다. **function명의 첫번째 문자가 대문자**라면 `class`다. (완벽하진 않지만... 정신건강상 유리합니다.)

## 인스턴스 생성
에덴 동산에 사람을 한명 만들어 봅시다.

```
// java

class Human {
	
}
	
public class Eden {
	
	public static void main(String[] args) {
	
		Human human = new Human();	// Human instance 생성
		System.out.println(human);	// 확인
	
	}

}

```

```
// js

 <script>
	
	function Human () {
	
	}
	
	var human = new Human(); // Human instace 생성
	console.log(human);		  // 확인
	
 </script>

```

## 생성자 메소드 정의
Java에서는 `class`가 instance화 되는 시점에 불리우는 method를 생성자 메소드(constructor method)라 합니다. 에덴 동산에 인간 한명이 생성될 때마다 콘솔에 "인간이 생성되었습니다."라는 메세지가 나오도록 하겠습니다.

```
// java

class Human {
	
	public Human () {	// 생성자 메소드
		System.out.println("인간이 생성되었습니다.");
	}
	
}
	
public class Eden {
	
	public static void main(String[] args) {
		Human human = new Human();
		
		System.out.println(human);
	}

}

```

```
// js

 <script>
	
	function Human () {	
		console.log("인간이 생성되었습니다.");
	}
	
	var human = new Human(); // Human instace 생성
	console.log(human);		  // 확인
	
 </script>

```

이 부분 또한 Java 개발자들이 견딜 수 없는 문법입니다. JS는 `class`처럼 사용한 `function`이 이번엔 생성자 메소드가 되었습니다! 이것도 공식에 넣어놓읍시다.


## private 변수 선언 / public method 선언
인간은 이름을 가질 수도 있고 불리울 수도 있습니다. setName과 getName을 선언하겠습니다. 이 메소드들이 사용하는 지역 변수도 선언하겠습니다.

```
// java

class Human {
	
	private String _name;	// 지역변수 선언
	
	public Human () {	// 생성자 메소드
		System.out.println("인간이 생성되었습니다.");
	}
	
	// setter
	public void setName(String name) {	
		this._name = name;
	}
	
	// getter
	public String getName() {
		return this._name;
	}
	
}
	
public class Eden {
	
	public static void main(String[] args) {
		Human human = new Human();
		
		System.out.println(human);
		human.setName("아담");
		System.out.println(human.getName());	// 출력 - 아담
	}

}

```


```
// js

 <script>
	
	function Human () {
		this._name = null;	// 지역 변수 선언
		console.log("인간이 생성되었습니다.");
	}
	
	// setter
	Human.prototype.setName = function (name) {
		this._name = name;
	};
	
	// getter
	Human.prototype.getName = function () {
		return this._name;
	};
	
	var human = new Human(); // Human instace 생성
	console.log(human);		  // 확인
	human.setName("아담");
	console.log(human.getName());	// 출력 - 아담
	
 </script>
```
JS는 Java와 다르게 `class`처럼 쓰인 `function`의 prototype에 메소드를 정의합니다. 이상하다고 느끼시겠지만 문법입니다. 

## 새로운 클래스 선언
에덴 동산에 인간만 있으니 쓸쓸하니, 개(Dog)를 추가하겠습니다. 지금까지 했던 것을 복습한다고 생각하시고 작성 하시면 됩니다.


```
// java

class Human {
	
	private String _name;	// 지역변수 선언
	
	public Human () {	// 생성자 메소드
		System.out.println("인간이 생성되었습니다.");
	}
	
	// setter
	public void setName(String name) {	
		this._name = name;
	}
	
	// getter
	public String getName() {
		return this._name;
	}
	
}

class Dog {

	public Dog () {
		System.out.println("개가 생성되었습니다.");
	}
	
	public void bark () {
		System.out.println("왕왕");
	}

}
	
public class Eden {
	
	public static void main(String[] args) {
		Human human = new Human();
		
		System.out.println(human);
		human.setName("아담");
		System.out.println(human.getName());	// 출력 - 아담
		
		Dog dog = new Dog();
		System.out.println(dog);
		dog.bark();		// 출력 - 왕왕
	}

}

```


```
// js

 <script>
	
	function Human () {
		this._name = null;	// 지역 변수 선언
		console.log("인간이 생성되었습니다.");
	}
	
	// setter
	Human.prototype.setName = function (name) {
		this._name = name;
	};
	
	// getter
	Human.prototype.getName = function () {
		return this._name;
	};
	
	function Dog () {
	}
	
	Dog.prototype.bark = function () {
		console.log("왕왕");
	};
	
	var human = new Human(); // Human instace 생성
	console.log(human);		  // 확인
	human.setName("아담");
	console.log(human.getName());	// 출력 - 아담
	
	var dog = new Dog();
	console.log(dog);
	dog.bark();	// 출력 - 왕왕
	
 </script>
```

## 상속
인간과 개는 동물(Animal)임을 상기합시다. 여기에서 동물이 할 수 있는 **행위(behavior)**는 무엇이 있을까요? 저는 "숨을 쉴 수 있다"라는 행위라고 생각합니다.

```
// java

class Animal {

	public Animal() {
		System.out.println("동물이 생성되었습니다.");
	}
	
	public void breathe() {
		System.out.println("숨을 쉽니다.");
	}

}

class Human extends Animal {	// Human은 Animal을 상속함.
	
	private String _name;	// 지역변수 선언
	
	public Human () {	// 생성자 메소드
		System.out.println("인간이 생성되었습니다.");
	}
	
	// setter
	public void setName(String name) {	
		this._name = name;
	}
	
	// getter
	public String getName() {
		return this._name;
	}
	
}

class Dog extends Animal {	// Dog은 Animal을 상속함.

	public Dog () {
		System.out.println("개가 생성되었습니다.");
	}
	
	public void bark () {
		System.out.println("왕왕");
	}

}
	
public class Eden {
	
	public static void main(String[] args) {
		Human human = new Human();
		
		System.out.println(human);
		human.setName("아담");
		System.out.println(human.getName());	// 출력 - 아담
		human.breathe();	// 출력 - 숨을 쉽니다.
		
		Dog dog = new Dog();
		System.out.println(dog);
		dog.bark();		// 출력 - 왕왕
		dog.breathe();	// 출력 - 숨을 쉽니다.
	}

}

```


```
// js

 <script>
 
 	function Animal () {
 		console.log("동물이 생성되었습니다.");
 	}
 	Animal.prototype.breathe = function () {
 		console.log("숨을 쉽니다.")
 	}
	
	function Human () {
		this._name = null;	// 지역 변수 선언
		console.log("인간이 생성되었습니다.");
	}
	
	Human.prototype = new Animal();		// Human은 Animal을 상속함.
	
	// setter
	Human.prototype.setName = function (name) {
		this._name = name;
	};
	
	// getter
	Human.prototype.getName = function () {
		return this._name;
	};
	
	function Dog () {
	}
	
	Dog.prototype = new Animal();		// Dog은 Animal을 상속함.
	Dog.prototype.bark = function () {
		console.log("왕왕");
	};
	
	var human = new Human(); // Human instace 생성
	console.log(human);		  // 확인
	human.setName("아담");
	console.log(human.getName());	// 출력 - 아담
	human.breathe();	// 출력 - 숨을 쉽니다.
	
	var dog = new Dog();
	console.log(dog);
	dog.bark();	// 출력 - 왕왕
	dog.breathe();	// 출력 - 숨을 쉽니다.
	
 </script>
```

JS에서의 상속은 자식 `class`에 해당하는 `function`의 prototype에 부모의 function을 new로 생성해서 넣어주는 것으로 끝납니다.

## 리팩토링
여기서 생각을 해봅시다. 이름을 갖는 것이 인간(Human)만이 가능한 것인지... 저는 개도 가능하다고 봅니다. 즉, 동물은 이름을 가질 수 있다는 것입니다. 이로써 인간(Human)만이 가지던 setName과 getName이 동물(Animal)로 옮겨가는 겁니다. 추가적으로 동물은 걸을 수 있다(walk)라는 것도 정의해봅시다.

```
// java

class Animal {

	private String _name;	// 지역변수 선언
	
	public Animal() {
		System.out.println("동물이 생성되었습니다.");
	}
	
	// setter
	public void setName(String name) {	
		this._name = name;
	}
	
	// getter
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

class Human extends Animal {	// Human은 Animal을 상속함.
	
	public Human () {	// 생성자 메소드
		System.out.println("인간이 생성되었습니다.");
	}
	
}

class Dog extends Animal {	// Dog은 Animal을 상속함.

	public Dog () {
		System.out.println("개가 생성되었습니다.");
	}
	
	public void bark () {
		System.out.println("왕왕");
	}

}
	
public class Eden {
	
	public static void main(String[] args) {
		Human human = new Human();
		
		System.out.println(human);
		human.setName("아담");
		System.out.println(human.getName());	// 출력 - 아담
		human.breathe();	// 출력 - 숨을 쉽니다.
		human.walk();		// 출력 - 걷습니다.
		
		Dog dog = new Dog();
		System.out.println(dog);
		dog.setName("예삐");	// 이젠 개도 이름을 가질 수 있습니다.
		System.out.println(dog.getName());	// 출력 - 예삐
		dog.bark();		// 출력 - 왕왕
		dog.breathe();	// 출력 - 숨을 쉽니다.
		dog.walk();		// 출력 - 걷습니다.
	}

}

```

```
// js

 <script>
 
 	function Animal () {
 		this._name = null;	// 지역 변수 선언
 		console.log("동물이 생성되었습니다.");
 	}
 	Animal.prototype.setName = function (name) {
 		this._name = name;
 	}
 	Animal.prototype.getName = function () {
 		return this._name;
 	}
 	Animal.prototype.breathe = function () {
 		console.log("숨을 쉽니다.")
 	}
 	 Animal.prototype.walk = function () {
 		console.log("걷습니다.")
 	}


	function Human () {
		console.log("인간이 생성되었습니다.");
	}
	Human.prototype = new Animal();		// Human은 Animal을 상속함.

	
	function Dog () {
	}
	Dog.prototype = new Animal();		// Dog은 Animal을 상속함.
	Dog.prototype.bark = function () {
		console.log("왕왕");
	};
	
	var human = new Human(); // Human instace 생성
	console.log(human);		  // 확인
	human.setName("아담");
	console.log(human.getName());	// 출력 - 아담
	human.breathe();	// 출력 - 숨을 쉽니다.
	human.walk();		// 출력 - 걷습니다.
	
	var dog = new Dog();
	console.log(dog);
	dog.setName("예삐");
	console.log(dog.getName());		// 출력 - 예삐
	dog.bark();	// 출력 - 왕왕
	dog.breathe();	// 출력 - 숨을 쉽니다.
	dog.walk();		// 출력 - 걷습니다.
	
 </script>
```

## 메소드 오버라이드
인간은 이족보행을 한다는게 일반적인 동물과 다른점입니다. 

```
// java

...

class Human extends Animal {	// Human은 Animal을 상속함.
	
	public Human () {	// 생성자 메소드
		System.out.println("인간이 생성되었습니다.");
	}
	
	public void walk() {	// Override
		System.out.println("이족보행을 합니다.");
	} 
	
}

...
	
public class Eden {
	
	public static void main(String[] args) {
		Human human = new Human();
		
		System.out.println(human);
		human.setName("아담");
		System.out.println(human.getName());	// 출력 - 아담
		human.breathe();	// 출력 - 숨을 쉽니다.
		human.walk();		// 출력 - 이족보행을 합니다.    <---- 바뀜!!!
		
		...

	}

}

```


```
// js

 <script>
 
	...
	
	function Human () {
		console.log("인간이 생성되었습니다.");
	}
	Human.prototype = new Animal();		// Human은 Animal을 상속함.
	Human.prototype.walk = function () {	// Override
		console.log("이족보행을 합니다.")
	}
	
	...
	
	var human = new Human(); // Human instace 생성
	console.log(human);		  // 확인
	human.setName("아담");
	console.log(human.getName());	// 출력 - 아담
	human.breathe();	// 출력 - 숨을 쉽니다.
	human.walk();		// 출력 - 이족보행을 합니다.   <--- 바뀜!
	
	...
	
 </script>
```

## 오버라이드한 메소드에서 super 호출
Java로 개발을 하다보면 super를 활용하여 부모에 정의한 코드(method)를 실행하고 그 결과를 바탕으로 자식에 정의한 코드(method)를 실행시키는 식으로 개발을 할 수 있습니다. 하지만, JS에는 super라는 키워드가 없어서 좌절을 맛보게 되는데 다음과 같이 하시면 됩니다.

```
// java

...

class Human extends Animal {	// Human은 Animal을 상속함.
	
	public Human () {	// 생성자 메소드
		System.out.println("인간이 생성되었습니다.");
	}
	
	public void walk() {	// Override
		super.walk();							// 부모의 method를 호출!
		System.out.println("이족보행을 합니다.");
	} 
	
}
...

```


```
// js

...
 
	function Human () {
		console.log("인간이 생성되었습니다.");
	}
	Human.prototype = new Animal();		// Human은 Animal을 상속함.
	Human.prototype.walk = function () {	// Override
		Animal.prototype.walk.call(this);	// 부모의 method를 호출!
		console.log("이족보행을 합니다.")
	}
...

```

JS는 `super`라는 키워드가 없어서 부모에 해당하는 `function`의 prototype에 접근하여 호출해야 하는 `function`(여기서는 walk)을 직접 호출해야 합니다. Animal.prototype.walk(); 로 호출할 경우 이 예제에서는 실제로 문제가 발생하지 않습니다만, 만약 walk에서 this를 사용하는 코드가 존재한다면, this가 Animal.prototype이 되어 정상적인 동작을 하지 않게 됩니다. (실제론 다른 방법도 꽤 많이 존재하지만) 이걸 해결해주는게 `call`입니다. `call`에 대한 설명은 나중에 기회가 되면 다시 하도록 하겠습니다.


## JS코드 정리
JS코드는 정말 있는 그대로 코딩을 하게 되면 매우 지저분 해지면서 **코드의 가독성**이 급격하게 떨어지게 되는데, 이 또한 Java 개발자들이 견디지 못하는 괴로움 중에 하나입니다. 이것을 해결하기 위해 Object.extend를 구현합니다.

```
Object.extend = Object.extend || function (target, source) {
	for (var key in source) {
		target[key] = source[key];
	}
	return target; 
};
```
Object.extend는 source를 target으로 shallow copy를 해주는 코드입니다. 간단하게 이야기하면 target에 source를 넣어서 병합한 결과를 다시 target으로 만드는 code입니다. jQuery를 사용하신다면 $.extend를 사용하시면 됩니다.

이제 이 convenience function을 이용해서 그동안 작성한 JS 코드를 정리합시다.

```
// js

 <script>
 	Object.extend = Object.extend || function (target, source) {
		for (var key in source) {
			target[key] = source[key];
		}
		return target; 
 	};
 
 	function Animal () {
 		this._name = null;	// 지역 변수 선언
 		console.log("동물이 생성되었습니다.");
 	}
 	Animal.prototype = Object.extend(Animal.prototype, {
 		setName: function (name) {
 			this._name = name;
 		},
 		getName: function () {
 			return this._name;
 		},
 		breathe: function () {
 			console.log("숨을 쉽니다.");
 		},
 		walk: function () {
 			console.log("걷습니다.");
 		}
 	});


	function Human () {
		console.log("인간이 생성되었습니다.");
	}
	Human.prototype = Object.extend(new Animal(), {
		walk: function () {	// Override
			Animal.prototype.walk.call(this);
			console.log("이족보행을 합니다.")
		}
	});

	
	function Dog () {
	}
	Dog.prototype = Object.extend(new Animal(), {
		bark: function () {
			console.log("왕왕");
		}
	});

	
	var human = new Human(); // Human instace 생성
	console.log(human);		  // 확인
	human.setName("아담");
	console.log(human.getName());	// 출력 - 아담
	human.breathe();	// 출력 - 숨을 쉽니다.
	human.walk();		// 출력 - 걷습니다. 이족보행을 합니다.
	
	var dog = new Dog();
	console.log(dog);
	dog.setName("예삐");
	console.log(dog.getName());		// 출력 - 예삐
	dog.bark();	// 출력 - 왕왕
	dog.breathe();	// 출력 - 숨을 쉽니다.
	dog.walk();		// 출력 - 걷습니다.
	
 </script>
```

이제 많이 정리된 것처럼 보입니다. 아닌가요? 

## 인터페이스 선언/구현
현재 Dog를 Aniaml을 상속하여 구현하였는데, Dog의 행위를 인터페이스로 분리시켜서 구현해보겠습니다.

```
// java

interface IDog {	// 인터페이스 선언
	void bark();
}

...

class Dog extends Animal implements IDog {	// Dog은 Animal을 상속하고 IDog interface를 구현함.

	public Dog () {
		System.out.println("개가 생성되었습니다.");
	}
	
	public void bark () {	// IDog의 method 구현
		System.out.println("왕왕");
	}

}

...
	

```


```
// js

 <script>
 	Object.extend = Object.extend || function (target, source) {
		for (var key in source) {
			target[key] = source[key];
		}
		return target; 
 	};
 	
 	var DogBehavior = {
 		bark: function () {
 			console.log("왕왕");
 		}
 	};
 	
 	...
 
	
	function Dog () {
	}
	Dog.prototype = Object.extend(new Animal(), DogBehavior);

	...

	
 </script>
```

... <br/>
아마 Java 개발자분들은 "이게 뭐야~" 라고 하실겁니다. 네, 그래요. JS에는 interface가 없습니다. 그리고 저 JS 코드는 위에 있는 Java 코드와 닮지도 않았습니다. 이 JS코드를 Java코드로 바꾼다면 다음과 같이 구현해야 비슷해집니다. 

```
// java

interface IDog {	// 인터페이스 선언
	void bark();
}

...

class DogImpl implements IDog {	

	public void bark () {	// IDog의 method 구현
		System.out.println("왕왕");
	}
	
}

class Dog extends Animal implements IDog {	// Dog은 Animal을 상속하고 IDog interface를 구현함.

	private IDog _dogBehavior = new DogImpl(); // 대리자를 생성

	public Dog () {
		System.out.println("개가 생성되었습니다.");
	}
	
	public void bark () {	// IDog의 method 구현
		this._dogBehavior.bark();
	}

}

...
	
```

## 클래스 확장
마지막으로 실제 에덴 동산에는 없을 것이라 생각하지만, 개인간(DogHuman)을 만들어보도록 하겠습니다. C++은 막강한 다중 상속이라는 편리한(?) 기능이 있어서 심플(?)하게 구현이 되긴 하지만, Java에서는 extend 뒤에 s가 붙어 있음에도 여러 클래스를 상속을 못받습니다. 그래서 다음과 같이 개발을 하게 됩니다.

```
// java

...

class DogHuman extends Human implements IDog {

	public void bark () {
		System.out.println("왕왕");
	}
}

public class Eden {
	
	public static void main(String[] args) {

		...
		
		DogHuman dogHuman = new DogHuman();
		
		dogHuman.walk();	// 출력 - 걷습니다. 이족보행을 합니다.
		dogHuman.bark();	// 출력 - 왕왕
	}

}

```
위 Java code를 JS로 바꾸면...

```
// js

 <script>

 	...
	
	function DogHuman () {
	}
	DogHuman.prototype = Object.extend(new Human(), DogBehavior);

	...
	
	var dogHuman = new DogHuman();
		
	dogHuman.walk();	// 출력 - 걷습니다. 이족보행을 합니다.
	dogHuman.bark();	// 출력 - 왕왕
	
	
 </script>
```

JS는 오히려 이러한 상황에서 더욱 코드가 심플해집니다. 뿌리가 어느쪽인지 보고 (저는 DogHuman의 뿌리는 Human이라 봄) 뿌리에 해당하는 `function`을 new로 생성하여 prototype으로 삼고 나머지 확장 기능을 prototype 확장으로 처리합니다. Java는 implements = code 작성인데 JS는 다시 코드를 작성하지 않고 저런식으로 단순화가 됩니다.

## 전체코드

```
// java

interface IDog {
	void bark();
}

class Animal {

	private String _name;
	
	public Animal() {
		System.out.println("동물이 생성되었습니다.");
	}
	
	// setter
	public void setName(String name) {	
		this._name = name;
	}
	
	// getter
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

class Human extends Animal {
	
	public Human () {
		System.out.println("인간이 생성되었습니다.");
	}
	
	public void walk() {
		super.walk();
		System.out.println("이족보행을 합니다.");
	} 
	
}

class DogImpl implements IDog {
	public void bark () {
		System.out.println("왕왕");
	}
}

class Dog extends Animal implements IDog {

	private IDog _dogBehavior = new DogImpl();
	
	public Dog () {
		
		System.out.println("개가 생성되었습니다.");
	}
	
	public void bark () {
		this._dogBehavior.bark();
	}

}

class DogHuman extends Human implements IDog {

	public void bark () {
		System.out.println("왕왕");
	}
}
	
public class Eden {
	
	public static void main(String[] args) {
		Human human = new Human();
		
		System.out.println(human);
		human.setName("아담");
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


```
// js
  </script>
  	Object.extend = Object.extend || function (target, source) {
		for (var key in source) {
			target[key] = source[key];
		}
		return target;
 	};

  	var DogBehavior = {
    	bark: function () {
      		console.log("왕왕");
    	}
  	};

 	function Animal () {
 		this._name = null;
 		console.log("동물이 생성되었습니다.");
 	}
 	Animal.prototype = Object.extend(Animal.prototype, {
 		setName: function (name) {
 			this._name = name;
 		},
 		getName: function () {
 			return this._name;
 		},
 		breathe: function () {
 			console.log("숨을 쉽니다.");
 		},
 		walk: function () {
 			console.log("걷습니다.");
 		}
 	});


	function Human () {
		console.log("인간이 생성되었습니다.");
	}
	Human.prototype = Object.extend(new Animal(), {
		walk: function () {	// Override
			Animal.prototype.walk.call(this);
			console.log("이족보행을 합니다.")
		}
	});

	function Dog () {
	}
	Dog.prototype = Object.extend(new Animal(), DogBehavior);

  	function DogHuman () {
	}
	DogHuman.prototype = Object.extend(new Human(), DogBehavior);

	var human = new Human();
	console.log(human);
	human.setName("아담");
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
  
  </script>


```

## 마무리
이러한 식으로 JS 코드를 작성하는 것이 생소하실 수도 있습니다. 아마 event listener를 설정하고 function에서 function으로 이동하는 형태로 개발을 하셨을 텐데, 제 눈에는 그런 식의 개발은 거의 (그 어렵다는) **C언어에 가까운 개발방식**입니다. 아마 해보신 분은 아시겠지만, C언어에서의 **관심사 분리**는 정말 힘든 논제입니다. 이 이야기는 코드를 작성하면 작성할 수록 **스파게티 코드화**가 될 가능성이 높아진다는 것을 의미하고, 결국 개발 퍼포먼스 하락과 유지보수 비용의 증가라는 악영향을 끼칠 가능성이 있습니다. (기술적 부채 증가)

이건 사견입니다만, 종국에는 JS쪽도 [OOA&D](https://en.wikipedia.org/wiki/Object-oriented_analysis_and_design)의 전장이 될 것이라 봅니다. (뭐 이미 server-side는...) Big-Picture를 누가 잘그리냐에 따라 성패가 갈리게 되는거죠. React니 Angular니 하는 굴찍한 [SPA framework](https://en.wikipedia.org/wiki/Single-page_application)를 도입하지 않아도 말이지요.

그리고, 이번에 소개 해드린 내용은 JS에서 사용하는 OOP 작성법 중 일부를 소개해 드린 것에 불과합니다. 은닉화, private method 선언법 등등 Java에서 사용되는 기본적인 내용과 JS 프로토 타입 확장시 퍼포먼스 향상을 위한 캐슁 활용법 또한 빠져있습니다. 이는 나중에 시간이 나면 차차 설명 드리는 것으로 하고 이번 글을 마치겠습니다.