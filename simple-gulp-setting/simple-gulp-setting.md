1. npm 버전을 올린다.

	```
	$ sudo npm update -g npm
	```

2. gulp를 전역 패키지에 설치한다.

	```
	$ sudo npm install -g gulp
	```
3. minimatch, graceful-fs의 버전이 낮아서 deprecated 메세지가 나오는 경우 최신버전을 설치해준다.
	
	```
	$ sudo npm install -g  graceful-fs minimatch

	```
	
4. 프로젝트 폴더에서 npm init을 실행하여 package.json를 작성

	```
	$ npm init
	```
	
5. gulp와 gulp-connect를 지역 패키지에 설치한다.

	```
	$ npm install --save-dev gulp gulp-connect
	```
	
6. babel-core와 babel-preset-es2015를 지역 패키지에 설치한다.

	```
	$ npm install --save-dev babel-core babel-preset-es2015
	```
	
7. babel 설정파일(.babelrc) 작성

	```
	{ "presets": ["es2015"] }
	```
	
8. gulpfile.babel.js를 작성한다.

	```
	'use strict'

	import gulp from 'gulp'
	import connect from 'gulp-connect'
	
	gulp.task('connect', _ => connect.server({
		root: './app/',
		host: '0.0.0.0',
		livereload: true
	}))
	
	gulp.task('default', ['connect'])
	
	```
	
	위 내용은 브라우져에서 localhost:8080으로 접속했을 때, app폴더 밑에 있는 index.html이 처음으로 노출된다는 의미이다.
	
9. 프로젝트 폴더에 app폴더를 만들고 index.html파일을 작성한다.

	```html
	<!doctype html>
	<html>
	<head>
	  <meta charset="UTF-8">
	  <meta name="viewport" content="width=device-width,initial-scale=1">
	  <meta http-equiv="x-ua-compatible" content="IE=edge">
	  <title>Gulp Setting Practice</title>
	</head>
	<body>
		<p>Gulp Setting Practice</p>
	</body>
	</html>
	```
	
10. gulp 실행

	```
	$ gulp
	```
	
11. 실행 결과


12. livereload 이용을 위해 watch task 작성

	```
	gulp.task('html', () => {
	  gulp.src('./app/*.html').pipe(connect.reload())
	})
	
	gulp.task('js', () => {
	  gulp.src('./app/js/*.js').pipe(connect.reload())
	})
	
	gulp.task('watch', () => {
	  gulp.watch('./app/*.html', ['html'])
	  gulp.watch('./app/js/*.js', ['js'])
	})
	```
	
13. 처음에 작성했던 default task를 수정 

	```
	gulp.task('default', ['connect', 'watch'])
	```
	
14. 다시 gulp를 실행하고 확인

	
	