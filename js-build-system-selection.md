# JS Project Build System 도입

## Overview

안녕하세요. 강승철입니다. 제가 본격적으로 프론트엔드로 넘어 온지도 반년이 다 되어 가는군요. 그간 저희 솔류션을 고도화하면서 이런저런 테스트를 하면서 느낀 점은 프론트엔드의 개발 트렌드가 굉장히 빠르게 바꾼다고 있다는 점입니다. 이에 발맞춰서 저희 솔류션에도 몇몇 최신 기술(또는 방법론)이 도입/활용되고 있습니다. 그 중에서 오늘 소개할 내용은 빌드 시스템 도입에 대한 내용입니다.

## Grunt Vs Gulp?
자바스크립트 프로젝트의 빌드 시스템은 다음과 같이 대표적으로 2가지가 있습니다.
<div style="text-align:center;">
	<img src="./grunt_vs_gulp.jpeg"></img>
	<p style="margin: 0">[그림1] Grunt Vs Gulp</p>
</div>

이 시스템이 하는 업무는 다음과 같은데, 

- livereload를 활용하여 자동으로 수정된 이력을 browser에서 리로딩 시켜준다.
- altJS를 js로 컴파일한다.
- SASS를 css로 컴파일한다.
- 작성된 js를 테스트한다.
- js 모듈을 uglify를 하거나, 하나의 js파일로 만든다.
- 기타 등등...

위 작업을 task로 등록(작성)하여 작동되도록 합니다. 그런 이유로 이러한 시스템을 ***Task Runner***라는 이름으로도 부릅니다.

이 중, 저희 솔류션에 도입된 build system은 ***[Gulp]*** 입니다. Gulp를 선택한 이유는 다음과 같습니다.

- Grunt처럼 파일IO를 사용하지 않고, 메모리 상에서 플러그인 방식으로 처리하기 때문에 빠르다.
- JS 코드(정확히는 Node.js)를 읽고 사용할 수 있다면, 설정으로 끝나는 Grunt보다 훨씬 더 명확하게 task를 정의할 수 있다.
- task를 병렬처리하여 더욱 빠르게 동작한다.

다음으로 Gulp 환경 구축에 대해서 알아보도록 하겠습니다.

## Node.js 설치
Gulp를 사용하기 위해서는 Node.js가 설치가 되어야 합니다. 

1. Node.js를 설치하기 위해서 [https://nodejs.org](https://nodejs.org/ko/)에 접속하신 후 v4.4.5를 다운로드 합니다. <br>(불행히도 아직 6버전에서 gulp가 정상동작하지 않습니다.) <div style="text-align:center;">
	<a href="https://nodejs.org/ko/"><img src="./node_1.png"></img></a>
	<p style="margin: 0">[그림2] https://nodejs.org</p>
</div>

2. 다운받은 파일을 실행한 후, `Next`버튼을 눌러 라이센스 동의 화면으로 넘어갑니다.<div style="text-align:center;">
	<img src="./node_2.png"></img>
	<p style="margin: 0">[그림3] Wellcome to the Node.js Setup Wizard</p>
</div>

3. 라이센스를 읽은 후, 라이센스 동의를 체크한 후 `Next`버튼을 눌러 다음 화면으로 넘어갑니다.<div style="text-align:center;">
	<img src="./node_3.png"></img>
	<p style="margin: 0">[그림4] End-User License Agreement</p>
</div>

4. 설치할 경로를 설정합니다. 원하는 위치로 변경 후 `Next`버튼을 눌러 다음 화면으로 넘어갑니다.<div style="text-align:center;">
	<img src="./node_4.png"></img>
	<p style="margin: 0">[그림5] Destination Folder</p>
</div>

5. 설치할 항목을 선택합니다. 선택 후 `Next`버튼을 눌러 다음 화면으로 넘어갑니다.<div style="text-align:center;">
	<img src="./node_5.png"></img>
	<p style="margin: 0">[그림6] Custom Setup</p>
</div>

6. `Install` 버튼을 눌러 설치를 합니다.<div style="text-align:center;">
	<img src="./node_6.png"></img>
	<p style="margin: 0">[그림7] Ready to install Node.js</p>
</div>

7. 설치가 완료 되면 "명령 프롬프트"를 실행하여 정상적으로 설치가 되었는지 확인합니다.<div style="text-align:center;">
	<img src="./node_7.png"></img>
	<p style="margin: 0">[그림8] 명령 프롬프트에서 확인</p>
</div>

## Atom Editor 설치 (opt) 

실제론 Atom Editor를 설치하지 않아도 되지만, 파일 작성 부분이 있기 때문에 소개합니다.

1. Atom Editor를 설치하기 위해서 [https://atom.io](https://atom.io)에 접속하신 후 Installer를 다운로드 합니다.<div style="text-align:center;">
	<a href="https://atom.io"><img src="./atom_1.png"></img></a>
	<p style="margin: 0">[그림9] https://atom.io</p>
</div>

2. 다운 받은 Installer를 실행합니다.<div style="text-align:center;">
	<img src="./atom_2.png"></img>
	<p style="margin: 0">[그림10] Installer 실행 중</p>
</div>

3. 설치가 완료되면 다음과 같이 Atom Editor가 화면에 나타납니다.<div style="text-align:center;">
	<img src="./atom_3.png"></img>
	<p style="margin: 0">[그림10] Atom 실행 화면</p>
</div>

## Gulp 데모 사이트 구축
드디어 Gulp를 구동시킬 수 있는 기본 준비가 되었습니다. 이제 간단한 예제를 하면서 익혀보도록 하겠습니다.

1. 테스트 프로젝트용 폴더를 만듭니다. 저는 C:\Dev\JS\gulpTest라고 만들었습니다.<div style="text-align:center;">
	<img src="./gulp_1.png"></img>
	<p style="margin: 0">[그림11] gulp 데모 폴더 작성</p>
</div>

2. 생성한 폴더의 정확한 path는 다음과 같습니다. <div style="text-align:center;">
	<img src="./gulp_2.png"></img>
	<p style="margin: 0">[그림12] gulp 데모 폴더 작성</p>
</div>

3. 명령 프롬프트를 실행한 후 위에서 만든 폴더로 이동합니다. <div style="text-align:center;">
	<img src="./gulp_3.png"></img>
	<p style="margin: 0">[그림13] gulp 데모 폴더 작성</p>
</div>

4. 이제 테스트 프로젝트의 패키지 관리를 위한 package.json을 작성합니다. 일반적으로 Node.js의 프로젝트는 package.json을 활용하며, 이는 Node.js 환경에서 구동되는 Gulp도 해당됩니다. (정확히 말해서 우리는 지금 Node.js를 하고 있는 것입니다.) package.json을 작성하는 방법은 의외로 간단하며 명령 프롬프트에서 `npm init`이라 치고 실행을 시키면, 대화형 인터페이스가 등장하여 파일 작성을 도와줍니다. [그림 14]와 실행되며 세부 항목은 다음과 같습니다.<div style="text-align:center;">
	<img src="./gulp_4.png"></img>
	<p style="margin: 0">[그림14] package.json 생성</p>
</div>
	- name: 프로젝트 이름입니다. 기본값은 프로젝트의 디렉토리입니다.
	- version: 프로젝트의 버전입니다.
	- description: 프로젝트의 구체적인 설명입니다.\
	- entry point: 이 프로젝트의 첫 실행 js파일을 설정합니다. entry point에 설정된 js는 명령 프롬프트에서 `node .`으로 실행 시킬 수 있게 됩니다.
	- test command: test를 실행하기 위한 스크립트를 작성합니다. (이 부분은 추후 다시 소개하도록 하겠습니다.)
	- git repository: git repository를 설정합니다.
	- keywords: 패키지를 설명하는 키워드입니다. 여기에 지정된 키워드는 npm search 명령으로 패키지를 검색할 때 검색어로 사용됩니다.
	- author: 작성자입니다.
	- license: 라이센스를 지정합니다.
	
5. 만약 Atom Editor를 설치하셨다면, `npm init`이 끝나면 해당 폴더에 package.json이 생기는데 탐색기에서 package.json을 우클릭하여 Open with Atom으로 파일을 엽니다.

6. 파일을 열면 다음과 같이 작성되어 있음을 확인 하실 수 있습니다.<div style="text-align:center;">
	<img src="./gulp_5.png"></img>
	<p style="margin: 0">[그림15] 생성된 package.json</p>
</div>

7. 이제 Gulp를 설치합니다. Gulp는 Node.js의 package이므로 `npm install`로 설치하게 됩니다. `npm install`은 다음과 같은 옵션을 제공합니다.
	- global(전역 패키지): `npm install -g`를 사용하는데, 이 옵션을 사용하면 시스템 전체에서 사용할 수 있도록 패키지를 설치합니다. 쉽게 이야기하면 명령 프롬프트에서 설치한 패키지를 직접 실행시키기 위해서 이 방식으로 설치를 해야 합니다. 
	> note:
	>명령 프롬프트에 gulp 명령을 내렸을 때, 내부 또는 외부 명령이 아니라는 오류가 나온다면 이 작업을 해주셔야 합니다.
	- local(지역 패키지): `npm install`를 사용합니다.(-g를 빼면 됨) 이 옵션으로 패키지를 설치하면 require('패키지명')으로만 사용가능하게 됩니다.
	
	Gulp를 명령 프롬프트에서 명령어로 사용하고 싶으므로 global로 먼저 설치합니다.

	```
	npm install -g gulp
	```
	
	이번에는 지역 패키지를 설치합니다.
	
	```
	npm install --save-dev gulp gulp-webserver
	```
	여기서 새로운 옵션이 나왔는데 `--save--dev` 입니다. 이 옵션을 의존성 명시 옵션이라 부르며, 설치하는 package를 package.json의 devDependencies에 등록합니다. 추후 `npm install` 명령만으로 의존성 전체설치를 하게 되는데 package.json의 devDependencies의 정보로 패키지를 설치합니다. 다른 의존성 명시 옵션으로 `--save`가 있습니다만 이에 대한 설명은 하지 않도록 하겠습니다.
	
8. 지금까지 문제 없이 왔다면 Atom Editor에서 다음과 같이 보일 것입니다.<div style="text-align:center;">
	<img src="./gulp_6.png"></img>
	<p style="margin: 0">[그림16] 생성된 package.json</p>
</div>

9. 이제 Atom Editor에서 gulpTest 폴더에 우클릭을 한 후 New File을 누른 후, gulpfile.js를 생성합니다.

10. gulpfile.js에 다음과 같이 코드를 작성합니다.

	```
	var gulp = require('gulp');
	var webserver = require('gulp-webserver');

	gulp.task('webserver', function() {
  		gulp.src('./app/')					// app folder가 시작위치가 됨.
    		.pipe(webserver({
      			host: '0.0.0.0',
      			livereload: true
    		}));
	});

	gulp.task('default', ['webserver']);
	``` 

11. 명령 프롬프트로 돌아와서 `gulp` 명령을 내려 실행 gulpfile.js를 실행시킵니다. 처음 실행을 시키면 방화벽이 작동하면서 액세스 허용을 요구하게 되며, 실행 결과는 다음과 같습니다.<div style="text-align:center;">
	<img src="./gulp_7.png"></img>
	<p style="margin: 0">[그림17] gulpfile.js 실행</p>
</div>

12. 10번 항목에서 app folder가 시작위치라고 하였으므로, Atom Editor에서 gulpTest 폴더를 우클릭 한 후 New Folder를 눌러 app 폴더를 생성합니다.
13. app 폴더에 index.html 파일을 생성한 후 다음과 같이 코딩을 합니다.

	```
	<!doctype html>
	<html>
	<head><title>gulp test</title>
	<body>
		<p>hello gulp</p>
	</body>
	</html>
	```

14. browser를 실행 시킨 후, 주소창에 다음과 같이 입력합니다. [http://localhost:8000](http://localhost:8000)

15. 아마 정상적으로 browser에 나타나지 않을 것입니다. 그 이유는 gulp-webserver가 실행된 이후에 app folder가 추가가 되어 실시간 리로드 대상에서 빠져 있기 때문입니다. 다시 명령 프롬프트로 돌아가서 `ctrl+c`를 눌러 gulp를 중단 시키고, 다시 `gulp`명령을 실행해 gulp를 구동 시킵니다.

16. 이제 browser를 refresh를 시키면 화면에 "hello gulp"라는 페이지 화면이 보일 것입니다.

17. 이 상태로 Atom Editor에서 "hello gulp"를 "livereload is working"으로 변경하고 저장을 합니다. browser가 저절로 refresh가 되면서 "livereload is working"으로 바뀔 것입니다.

18. (개인 취향이지만) 개발화면 분활은 다음과 같이 하면 보다 빠른 개발을 할 수 있을 것 같아 소개 해드립니다.<div style="text-align:center;">
	<img src="./gulp_8.png"></img>
	<p style="margin: 0">[그림18] 화면분활 </p>
</div>

## 마치며...
이번에 소개해드린 내용은 빌드 시스템 도입에서 기본 셋팅에 해당하는 부분입니다. 추후에 js 압축 또는 sass 컴파일에 대한 내용도 소개 하도록 하겠습니다.
