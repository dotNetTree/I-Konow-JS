# Module Pattern 그리고...
안녕하세요. 강승철입니다. 이제부터는 본격적으로 JS OOP의 세계로 들어가 보겠습니다. 

일단 제 생각에 JS OOP 세계로 들어가기 위한 key는.. **Module Pattern**이라고 생각합니다. 이 패턴에 대해서 저희 회사 개발자들과 이야기를 해본 결과 매우 생소해 하였고, 적응이 안된다는 이야기도 했습니다. 하지만, 이 패턴을 구글에서 검색해보면 꽤나 오래전부터 회자가 되고 있던 패턴이고, 무수한 JS 오픈소스 라이브러리(또는 framework)에서 사용되고 있음을 쉽게 알 수 있습니다.

## 기본 패턴 익히기
먼저 **factory function**에 대해서 알아보겠습니다. **factory function**은 뭔가 거창한 내용이 있는게 아니라, 어떠한 객체를 생성해서 반환해주는 `function`입니다.

```
function factory () {

	var info = {
		name: "강승철",
		age: 37
	};

	return info;

}

```

이 **factory function**의 리턴값을 모듈이라 생각하고 모듈명 myInfo로 지어보겠습니다.

```
function factory () {

	var info = {
		name: "강승철",
		age: 37
	};

	return info;

}

var myInfo = factory();

```

이걸로 모듈이 하나 탄생했습니다. 참 쉽죠? 이 코드를 조금 더 깔끔하게 정리 하겠습니다.


```
function factory () {

	var info = {
		name: "강승철",
		age: 37
	};

	return info;

}

var myInfo = factory();
factory = null;

```

마지막 factory에 null이 추가가 됬습니다. **factory function**을 한번만 쓰고 버린다는 의미입니다. 이 코드를 조금 더 변형을 가해 보겠습니다.

```
var myInfo = function factory () {

	var info = {
		name: "강승철",
		age: 37
	};

	return info;

}();
factory = null;

```
이전 코드와의 차이는 **factory function** 선언함과 동시에 실행을 시키도록 바꾸었습니다. 이 코드를 더욱 간결하게 바꾸면...


```
var myInfo = (function () {

	var info = {
		name: "강승철",
		age: 37
	};

	return info;

})();

```

이쯤에서 "이게 뭐지?"라고 생각하실겁니다. 이전 코드와 다른점은 factory라는 function 선언 대신, **anonymous function(익명함수)**으로 바꾸고 **anonymous function**바로 실행시키도록 한 것입니다.

그리고, 이러한 표현식을 **IIFE(immediately invoked function expression, 즉시 실행 함수 표현식)**라 부르며 이 표현식을 이용해서 다양한 형태의 모듈을 작성할 수 있습니다.

그럼 **IIFE**에 대해서 조금 더 알아보겠습니다.

```
var someModule = (function () {

	/* 1번 */

	return ... /* 2번 */

})();
```
1번 영역 **anonymous function** 밖에서 접근을 할 수 없는 공간이며, 용도는 민감한 정보를 감추거나, 다른 개발자가 임의로 중요한 코드를 외부에서 수정못하도록 합니다. 

2번은 노출시키고 싶은 정보입니다. 즉, 모듈이 될 객체입니다.

이렇게 설명을 해도 이해가 잘 안되시는 분들을 위해 예를 들어 설명하겠습니다.

```
var myInfo = (function () {

	// 1
	function getDesc () {
		return "안쪽에 있는 function에서 얻은 문자열 입니다.";
	}

	// 2
	var innerDesc = getDesc();
	
	var info = {
		name: "강승철",
		age: 37,
		desc: innerDesc		// 3
	};

	return info;

})();

console.log(myInfo.desc);	// 4 출력 - "안쪽에 있는 function에서 얻은 문자열 입니다."
console.log(getDesc);		// 5 에러 - "Uncaught ReferenceError: getDesc is not defined"
console.log(innerDesc);		// 6 에러 - "Uncaught ReferenceError: innerDesc is not defined"
```
1. **anonymous function** 안쪽에서 getDesc function을 선언합니다.
2. **anonymous function** 안쪽에서 변수 innerDesc를 선언한 후, getDesc function을 실행한 값을 넣어준다.
3. 외부로 노출 시킬 info 객체의 desc property에 innerDesc를 넣어 줌.
4. 외부로 노출 시킨 info가 myInfo이므로 desc의 값, 즉 innerDesc의 값을 출력.
5. **anonymous function** 안쪽에서 정의한 getDesc function은 외부에서 직접 접근할 수 없습니다.
6. **anonymous function** 안쪽에서 정의한 변수 innerDesc은 외부에서 직접 접근할 수 없습니다.

이런식으로 return되는 객체만이 접근 가능하게되어, 마치 OOPL에서 이야기하는 **정보 은닉(information hiding)**의 효과를 얻을 수 있게 됩니다. 

## Module Pattern의 잇점
Module Pattern은 IIFE를 사용하는데, 이는 기존의 개발 방식에서 얻을 수 없는 잇점이 있습니다. 일단 예제 코드를 먼저 보겠습니다.

```
// 누군가가 작성한 showPopup function
function showPopup () {
	console.log("첫번째 showPopup입니다.");
}

// 사용...
showPopup();

...

// 또 다른 누군가가 작성한 showPopup function
function showPopup () {
	console.log("두번째 showPopup입니다.");
}

// 사용
showPopup();

```

위 예제의 출력 결과는 아마 이렇게 생각하실 것입니다.
 
* 첫번째 showPopup입니다.
* 두번째 showPopup입니다.

하지만, 불행하게도 실제 출력 결과는 다음과 같습니다.

* 두번째 showPopup입니다.
* 두번째 showPopup입니다.
 
이러한 실수는 실무에서 꽤 많이 발생합니다. 특히 대규모 인원이 투입되어 작업하는 금융권 SI에서는 매우 빈번히 발생하곤 합니다. 이유는 hoisting(호이스팅)과 override(오버라이드) 때문인데, 위 코드는 자바스크립트 엔진에 의해서 다음과 같이 해석됩니다.

```

// 누군가가 작성한 showPopup function
function showPopup () {
	console.log("첫번째 showPopup입니다.");
}

// 또 다른 누군가가 작성한 showPopup function
function showPopup () {		
	console.log("두번째 showPopup입니다.");
}

// 사용...
showPopup();

...

// 사용
showPopup();

```
hoisting에 의해 두번째 showPopup function이 context의 상단으로 올라오면서 정렬이 되는데 정렬 순서는 function 선언 순으로 정렬이 됩니다. JS 특성중에 동일한 이름의 function이 있으면 이전 function을 대체해버리는 override가 일어납니다. 이러한 이유로 첫번째 작성한 showPopup은 사용할 수 없게 됩니다.

대규모 SI 프로젝트에서는 자신이 짠 코드를 가장 밑으로 위치하게 하려는 다툼을 자주합니다. 아마 이 글을 읽는 분중에 간단히 function 명을 바꾸면 될 것이라 생각하시는 분도 계실겁니다. 하지만 그건 정말 무른 생각입니다. 실제 작업을 해보다 보면 서로 같이 작업하는 사람들 코드 뿐만 아니라 3rd-party, 각종 솔루션들이 뒤엉키면서 말도 못하는 **ovevrride 지옥**을 맛보시게 됩니다.

위 코드를 **module pattern**를 사용하여 정리를 해보도록 하겠습니다.

```
// 누군가가 작성한 showPopup function
var showPopup = (function () {
	function showPopup () {
		console.log("첫번째 showPopup입니다.");
	}
	return showPopup;
})();

// 사용...
showPopup();

...

// 또 다른 누군가가 작성한 showPopup function
var showPopup = (function () {
	function showPopup () {
		console.log("두번째 showPopup입니다.");
	}
	return showPopup;
})();

// 사용...
showPopup();
```
위 예제의 출력 결과는 다음과 같습니다.

* 첫번째 showPopup입니다.
* 두번째 showPopup입니다.

이번에는 정확히 의도한대로 순서대로 로그가 출력 되었습니다. 이 경우에는 showPopup function의 hoisting이 **anonymous function** 내부에서 일어났기 때문에 정상적인 출력 결과를 얻을 수 있습니다. 이는 실제로 **module pattern**를 사용했기 때문이 얻은 효과는 아닙니다만, (실제론 hoisting을 막아서 얻은 효과) **anonymous function** 내부에서 정의하는 모든 변수와 function은 **외부의 다른 변수와 function을 override를 하지 않습니다**.

그리고, 한가지 더 얻을 수 있는 잇점은 **의존성(dependency)**을 설정할 수 있다는 것입니다. 예를 들어 자동차(Car)라는 class를 만들기 위해서 엔진(Engine)이라는 class가 필요하다고 합시다. 이 경우 자동차는 엔진에 대해서 의존성을 가지고 있다고 합니다. 코드는 다음과 같습니다.

```
// 1
var V8Engine = (function () {

	function V8Engine () {
		console.log("V8엔진이 생성되었습니다.");
	}
	V8Engine.prototype.start = function () {
		console.log("엔진 start!");
	}
	V8Engine.prototype.stop = function () {
		console.log("엔진 stop!");
	}
	
	return V8Engine;

})();

var Car = (function (Engine) {	// 2

	function Car () {
		this._engine = new Engine();
	
		console.log("자동차가 생성되었습니다.");
	}
	Car.prototype.boot = function () {
		this._engine.start();
	}
	
	return Car;

})(V8Engine);	// 3

var myCar = new Car();
myCar.boot();	// 출력 - 엔진 start!

```

* 1번에서 Engine class를 정의하였습니다.
* 1번에서 정의한 Engine class를 3번을 통해 **anonymous function**의 arguments(2번)로 넣어줍니다.

결과적으로 **anonymous function**에서 사용되어야하는 모듈을 **anonymous function** 외부에서 내부로 넣어줄 수 있습니다. 이런 식으로 각 모듈의 의존성이 매우 명확해지면서 **관심사 분리**에 탁월한 효과를 가져오게 됩니다.(혹시 모듈을 변경할 다른 모듈에 미치는 영향도 분석도 조금 더 쉽게 할 수 있습니다.)

## Module Pattern의 변형
최신 JS 오픈소스 라이브러리 등을 보면 지금까지 소개한 형태로 모듈을 정의하지 않음을 알 수 있습니다. UMD라 하는 형태로 모듈들을 정의합니다. **UMD**는 **AMD(Asynchronous Module Define)**과 **CommonJS**, **Browser Global Module Define**을 모두 지원하는 형태로 작성가능합니다. (지금 언급한 모듈 정의 방식은 다음에 자세히 설명하 예정) 

일단, 범용적으로 많이 사용하는 jQuery 중 최신 버전인 3.0.0의 코드의 시작 부분을 일부 보면 다음과 같습니다.

```
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

...

```

jQuery는 현재 **UMD(Universal Module Define)** 스타일로 모듈을 작성한 것입니다. AMD는 이곳에서 정의하지 않고 **Browser Global Module Define**과 **CommonJS** 스타일의 지원하는 형태로 모듈이 작성되어 있습니다. (AMD에 대한 정의는 jQuery 코드의 후반부에 등장함)

이 패턴을 사용하기 위해서는 2개의 function에 대한 이해가 필요합니다. 예를 들기 위해 Human이라는 class를 생성하는 코드를 작성하겠습니다.

```
// 1
function factory() {

	function Human () {
		console.log("인간이 생성되었습니다.");
	}
	
	return Human;

}

// 2
function moduleDefine(root, factory) {

	root.Human = factory();

}

// 3
moduleDefine(this, factory);

// 4
factory = null;
moduleDefine = null;

var me = new Human();	// 출력 - 인간이 생성되었습니다.
``` 

원리는 간단합니다. 모듈을 정의하는 **factory function**을 만들고(1번) 모듈을 정의하는 function을 정의(2번)한 후, 실행(3번)하는 것입니다. 더 이상 필요없는 function을 null 처리 합니다.(4번) 여기에서 3번의 moduleDefine에 this가 어떤 것인지 궁금하실텐데, 코드상으로는 window가 됩니다. 

위 코드를 조금 더 간결하게 정리 하겠습니다.

```
 
function moduleDefine(root, factory) {

	root.Human = factory();

}

moduleDefine(this, function () {

	function Human () {
		console.log("인간이 생성되었습니다.");
	}
	
	return Human;

});
moduleDefine = null;

var me = new Human();	// 출력 - 인간이 생성되었습니다.
```

이전 코드와 다른 점은 **factory function**을 **anonymous function**으로 바꾼 것입니다. 초등학교 교장 선생님 같지만... 한번 더 정리를 하면 다음과 같이 바뀝니다.

```
function moduleDefine(root, factory) {

	root.Human = factory();

}(this, function () {

	function Human () {
		console.log("인간이 생성되었습니다.");
	}
	
	return Human;

});
moduleDefine = null;

var me = new Human();	// 출력 - 인간이 생성되었습니다.

```
이전 코드와 다른 점은 moduleDefine 실행을 선언과 동시에 하도록 바꿨습니다. 자.. 이제 정말로 마지막입니다.

```
(function (root, factory) {

	root.Human = factory();
	
})(this, function () {

	function Human () {
		console.log("인간이 생성되었습니다.");
	}
	
	return Human;

});

var me = new Human();	// 출력 - 인간이 생성되었습니다.

```
moduleDefine를 **anonymous function**으로 바꿈으로써 보다 간결하게 되었습니다. 이런식으로 모듈을 정의하는 방식을 **UMD** 스타일이라 합니다. 

이 **UMD** 스타일로 위에서 정의한 엔진(V8Engine)과 자동차(Car)를 정의해 보겠습니다.

```
// V8Engine.js
(function (root, factory) {

	root.V8Engine = factory();

})(this, function () {

	function V8Engine () {
		console.log("V8엔진이 생성되었습니다.");
	}
	V8Engine.prototype.start = function () {
		console.log("엔진 start!");
	}
	V8Engine.prototype.stop = function () {
		console.log("엔진 stop!");
	}
	
	return V8Engine;

});

// Car.js
(function (root, factory) {

	root.Car = factory(root.V8Engine);		// 1

})(this, function (Engine) {

	function Car () {
		this._engine = new Engine();
	
		console.log("자동차가 생성되었습니다.");
	}
	Car.prototype.boot = function () {
		this._engine.start();
	}
	
	return Car;

});

var myCar = new Car();
myCar.boot();	// 출력 - 엔진 start!

```
**UMD** 스타일에서의 의존성은 1번 처럼 설정합니다. 그리고 지금까지 내용을 살펴보면, 기존의 일반적인 IIFE를 활용한 **Module Pattern**과 다른 점은 의존성을 설정하는 코드가 **anonymous function** 내부에 존재한다는 점인데 여기까지만 볼 때는 **UMD** 스타일이 이전 방식에 비해 큰 잇점을 가지지 못합니다.

## 마무리
이번에 소개해드린 내용은 JS OOP에서 반드시 필요한 패턴입니다. 언어차원에서 지원하지 않는 OOP 필수 요소를 이 패턴들이 커버를 해주게 됩니다. 간혹, JS는 functional language다. 왜 자꾸 OOP로 끌고 가냐고 묻습니다. 네. 그렇습니다. JS는 functional language입니다. 그리고, OOP language이기도 합니다. 그렇기 때문에 JS를 멀티 패러다임 language라 부릅니다.

functional language는 공부하면 할 수록 매력적인 언어입니다. 하지만 일반적인 개발자들의 뇌는 functional 하지 않습니다. 만약 개발자들의 뇌가 functional하다면 엔터프라이즈 시장은 Java가 아닌 C가 제압을 했을 겁니다.

JS에서의 OOP는 보신바와 같이 상당한 비용(클로져, 프로토타입 체인)을 지불하고 이뤄집니다. 이 또한 JS를 functional하게 개발해야 한다고 주장하는 개발자들에게 힘을 실어줍니다. 그렇지만, OOP로 접근시 설계가 가능해지고, 특히 협업과 유지보수에 탁월한 효과를 얻을 수 있게 됩니다. 그리고, ES2015에서는 spec 차원에서 `class`와 `extends`를 지원하기 때문에 더욱 활용도가 높아지게 됩니다.(vendor사의 퍼포먼스 최적화 코드를 사용하려면 `class`를 사용해야겠죠...)

다음번엔 **UMD** 스타일로 개발시 얻을 수 있는 잇점에 대한 내용으로 다시 찾아뵙도록 하겠습니다.

