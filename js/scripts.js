/*
Template Name    : Nexeri - Creative Showcase Portfolio
Version          : 1.2.0
Author           : SVYYAT
Created          : May 2021
File Description : Main JS file of the template

// ------------------------------------------ //
//              Table Of Content              //
// ------------------------------------------ //

1. Preloader;
2. Cursor;
3. Animation On Cursor;
4. Video Player;
5. Menu;
6. Portfolio;
7. FullSliderHorizontal Swiper;
8. FullSliderVertical Swiper;
9. ScaleSliderHorizontal Swiper;
10. ScaleSliderVertical Swiper;
11. RoundSliderHorizontal Swiper;
12. RectangleSliderHorizontal Swiper;
13. Contact Form;
14. About;
15. Services;
16. Work;
17. Smooth Scroll;
18. Google Map.
*/



$(function () {
	'use strick';

	/*========== Start Preloader ==========*/

	function removeClass(elem, className) {
		let l = elem.length;

		if (l == undefined) {
			_removeClass(elem, className);
		} else {
			let i = l - 1;

			while (i >= 0) {
				_removeClass(elem[i], className);
				i--;
			}
		}
	}

	function _removeClass(elem, newClass) {
		if (elem.classList) {
			elem.classList.remove(newClass);
		} else {
			let exp = '(^|\\b)' + newClass.split(' ').join('|') + '(\\b|$)';
			elem.className = elem.className.replace(new RegExp(exp, 'gi'), ' ');
		}
	}

	function addClass(elem, className) {
		let l = elem.length;
		if (l == undefined) {
			_addClass(elem, className);
		} else {
			let i = l - 1;
			while (i >= 0) {
				_addClass(elem[i], className);
				i--;
			}
		}
	}

	function _addClass(elem, newClass) {
		if (elem.classList) {
			elem.classList.add(newClass);
		} else {
			elem.className += " " + className;
		}
	}

	let loaderDashoffsetTotal = 502;
	let preloader = document.querySelector('.cursor-preloader');
	let cursor = document.getElementById('cursor');
	let preloaderOuter = preloader.querySelector('.cursor-loader__circle--bar');
	let loaded = 0;
	let total = 25;

	function onProgress() {
		let percentLoaded = Math.round((loaded / total) * 100);
		let calc = (loaderDashoffsetTotal / 100);
		let percent = Math.round(calc * percentLoaded);
		let offset = loaderDashoffsetTotal - percent;
		preloaderOuter.style.strokeDashoffset = offset + 'px';
	}

	function init() {
		let startLength = loaderDashoffsetTotal + 'px';
		preloaderOuter.style.strokeDashoffset = startLength;
		preloaderOuter.style.opacity = 1;
		setTimeout(() => {
			let newLength = (loaderDashoffsetTotal) + 'px';
			preloaderOuter.style.strokeDashoffset = newLength;
			addClass(preloaderOuter, 'loading');
			loadPages();
		}, 50);
	}
	init();

	function loadPages() {
		load();
	}

	function load() {
		loaded++;
		onProgress();
		if (loaded == total) {
			setTimeout(() => {
				onDone();
			}, 50);
		} else {
			setTimeout(() => {
				load();
			}, 25);
		}
	}

	function onDone() {
		addClass(preloader, 'hidden');
		addClass(cursor, 'active');
		setTimeout(() => {
			loaded = 0;
			preloaderOuter.style.strokeDashoffset = loaderDashoffsetTotal + 'px';
		}, 0);
	}

	/*========== End Preloader ==========*/
	/*========== Start Cursor ==========*/

	var $cursor = $('#cursor');

	function moveCursor(e) {
		TweenMax.to($cursor, 0.5, { left: e.pageX, top: e.pageY, ease: Power3.easeOut });
	}

	//$(window).on('mousemove', moveCursor);

	var counter = 0;
	var c = 0;
	var i = setInterval(function () {

		$('#cursor .counter span').html(c);

		counter++;
		c++;
		if (counter == 100) {
			clearInterval(i);
			TweenMax.from('#cursor .counter span', 0.25, { y: '0%', ease: Power2.easeInOut });
			TweenMax.to('#cursor .counter span', 0.25, { y: '-110%', ease: Power2.easeInOut });
			TweenMax.from('#portfolioBtn, #menuBtn, footer, .swiper-buttons, .swiper-pagination', 0.5, { opacity: 0, ease: Power2.easeInOut });
			TweenMax.to('#portfolioBtn, #menuBtn, footer, .swiper-buttons, .swiper-pagination', 0.5, { opacity: 1, ease: Power2.easeInOut });
			TweenMax.from('.slide-media', 0.5, { opacity: 0, ease: Power2.easeInOut });
			TweenMax.to('.slide-media', 0.5, { opacity: 0.65, ease: Power2.easeInOut });
			TweenMax.from('.slide-content .wrapper, .hero .parallax-block', 0.5, { opacity: 0, ease: Power2.easeInOut });
			TweenMax.to('.slide-content .wrapper, .hero .parallax-block', 0.5, { opacity: 1, ease: Power2.easeInOut });
			TweenMax.from('#scaleSliderVertical .swiper-slide-active span, #scaleSliderHorizontal .swiper-slide-active span', 0.5, { y: '110%', ease: Power2.easeInOut });
			TweenMax.to('#scaleSliderVertical .swiper-slide-active span, #scaleSliderHorizontal .swiper-slide-active span', 0.5, { y: '0%', ease: Power2.easeInOut });
			$('#cursor').delay(300).fadeOut();
			if ($('body').hasClass('classic-menu')) {
				TweenMax.from('#menu', 0.5, { opacity: 0, ease: Power2.easeInOut });
				TweenMax.to('#menu', 0.5, { opacity: 1, ease: Power2.easeInOut });
			}
		}
	}, 0.0125);


	/*========== End Cursor ==========*/
	/*========== Start Animation On Cursor ==========*/

	$('.container--white, #scroll-content footer').on('mouseenter', function (event) {
		TweenMax.to('#cursor', 0.025, { mixBlendMode: 'difference', ease: Power3.easeIn });
	});
	$('.container--white, #scroll-content footer').on('mouseleave', function (event) {
		TweenMax.to('#cursor', 0.025, { mixBlendMode: 'normal', ease: Power3.easeOut });
	});

	$('.button, .link, .content-image').on('mouseenter', function (event) {
		TweenMax.to('#cursor', 0.025, { scale: 0.66, backgroundColor: 'rgba(255, 255, 255, 0.075)', borderWidth: '0px', ease: Power3.easeIn });
	});
	$('.button, .link, .content-image').on('mouseleave', function (event) {
		TweenMax.to('#cursor', 0.025, { scale: 0.33, backgroundColor: 'rgba(255, 255, 255, 0)', borderWidth: '6px', ease: Power3.easeOut });
	});

	$('a.logo').on('mouseenter', function (event) {
		//TweenMax.to('#cursor', 0.1, { scale: 0.66, backgroundColor: 'rgba(255, 255, 255, 1)', mixBlendMode: 'difference', ease: Power3.easeIn });
	});
	$('a.logo').on('mouseleave', function (event) {
		//TweenMax.to('#cursor', 0.1, { scale: 0.33, backgroundColor: 'rgba(255, 255, 255, 0)', mixBlendMode: 'normal', ease: Power3.easeOut });
	});

	$('a.slide-label__title, a.work-item__link, a.page-navigation__link').on('mouseenter', function (event) {
		$('.slider-hover').addClass('hover');
		$('.category-wrap').addClass('hover');
		TweenMax.to('#cursor', 0.025, { scale: 0.66, backgroundColor: 'rgba(255, 255, 255, 0.25)', borderWidth: '0px', ease: Power3.easeIn });
	});
	$('a.slide-label__title, a.work-item__link, a.page-navigation__link').on('mouseleave', function (event) {
		$('.slider-hover').removeClass('hover');
		$('.category-wrap').removeClass('hover');
		TweenMax.to("#cursor", 0.025, { scale: 0.33, backgroundColor: 'rgba(255, 255, 255, 0)', borderWidth: '6px', ease: Power3.easeOut });
	});

	$('#videoContainer').on('mouseenter', function (event) {
		TweenMax.to('#cursor', 0.1, { scale: 0.01, ease: Power3.easeIn });
	});
	$('#videoContainer').on('mouseleave', function (event) {
		TweenMax.to('#cursor', 0.1, { scale: 0.33, ease: Power3.easeOut });
	});

	/*========== End Animation On Cursor ==========*/
	/*========== Start Video Player ==========*/

	var viewportWidth = $(window).width();
	if (viewportWidth < 992) {
		$('.slide-media .video').remove();
	}

	$(document).ready(function () {
		if ($('video').is('#video')) {

			var objectVideo = $('#videoContainer video');
			var video = objectVideo.get(0);

			setVolume(0.5); // Set default volume to 50%

			objectVideo.on('mouseenter mouseleave', function (e) {
				$(this).data('isHovered', e.type === 'mouseenter');
			});

			$(document).on('keyup', function (e) {
				if (e.which == 32) {
					var fullScreen = document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
					var isHovered = objectVideo.data('isHovered');
					if (fullScreen || isHovered) {
						playVideo();
					}
				}
			});

			objectVideo.on('click', function () {
				playVideo();
			});

			$('#playButton').on('click', function () {
				playVideo();
			});

			function playVideo() {
				if (video.paused) {
					video.play();
					$('#playButton').removeClass('video-play');
					$('#playButton').addClass('video-pause');
				}
				else {
					video.pause();
					$('#playButton').addClass('video-play');
					$('#playButton').removeClass('video-pause');
				}
			}

			// Progress time

			setInterval(function () {
				$('#ctime').html(formatTime(Math.round(video.currentTime)));
				$('#ttime').html(formatTime(video.duration - Math.round(video.currentTime)));
			}, 250);

			function formatTime(seconds) {
				minutes = Math.floor(seconds / 60);
				minutes = (minutes >= 10) ? minutes : '0' + minutes;
				seconds = Math.floor(seconds % 60);
				seconds = (seconds >= 10) ? seconds : '0' + seconds;
				return minutes + ":" + seconds;
			}

			var scrubber = $('.progress');
			var progress = $('.progress-bar');

			objectVideo.bind('timeupdate', videoTimeUpdateHandler);
			scrubber.bind('mousedown', scrubberMouseDownHandler);

			function videoTimeUpdateHandler(e) {
				var percent = video.currentTime / video.duration;
				updateProgressWidth(percent);
			}

			function scrubberMouseDownHandler(e) {
				var $this = $(this);
				var x = e.pageX - $this.offset().left;
				var percent = x / $this.width();
				updateProgressWidth(percent);
				updateVideoTime(percent);
			}

			function updateProgressWidth(percent) {
				progress.width((percent * 100) + '%');
			}

			function updateVideoTime(percent) {
				video.currentTime = percent * video.duration;
			}

			// Mute Video
			$('#muteButton').on('click', function () {
				muteVideo();
			});

			function muteVideo() {
				if ($('video').prop('muted')) {
					$('video').prop('muted', false);
					$('#muteButton').removeClass('unmute');
					$('#muteButton').addClass('mute');
				} else {
					$('video').prop('muted', true);
					$('#muteButton').addClass('unmute');
					$('#muteButton').removeClass('mute');
				}
			}

			// Volume

			var savedVolume;

			$('#volume a').on('click', function () {
				if ($('#videoContainer video').prop('muted')) {
					$('#videoContainer video').prop('muted', false);
					setVolume(savedVolume);
				} else {
					$('#videoContainer video').prop('muted', true);
					savedVolume = video.volume;
					setVolume(0);
				}
			});

			$('.volume-slider').slider({
				orientation: 'horizontal',
				min: 0,
				max: 100,
				value: 50,
				range: 'min',
				slide: function (event, ui) {
					setVolume(ui.value / 100);
				}
			});

			function setVolume($volume) {

				video.volume = $volume;

				switch (true) {
					case ($volume >= 0.5):
						// High
						$('.toggle-sound').addClass('video-volume-high');
						$('.toggle-sound').removeClass('video-volume-medium');
						$('.toggle-sound').removeClass('video-volume-low');
						$('.toggle-sound').removeClass('video-volume-muted');
						break;
					case ($volume < 0.5 && $volume >= 0.25):
						// Medium
						$('.toggle-sound').addClass('video-volume-medium');
						$('.toggle-sound').removeClass('video-volume-high');
						$('.toggle-sound').removeClass('video-volume-low');
						$('.toggle-sound').removeClass('video-volume-muted');
						break;
					case ($volume < 0.25 && $volume > 0):
						// Low
						$('.toggle-sound').addClass('video-volume-low');
						$('.toggle-sound').removeClass('video-volume-high');
						$('.toggle-sound').removeClass('video-volume-medium');
						$('.toggle-sound').removeClass('video-volume-muted');
						break;
					default:
						// Off
						$('.toggle-sound').addClass('video-volume-muted');
						$('.toggle-sound').removeClass('video-volume-high');
						$('.toggle-sound').removeClass('video-volume-medium');
						$('.toggle-sound').removeClass('video-volume-low');
				}
			}

			// Fullscreen

			$('#fullscreenButton').on('click', function () {
				if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {

					$('#fullscreenButton').addClass('video-fullscreen--active');
					$('#fullscreenButton').removeClass('video-fullscreen--disable');
					if (document.exitFullscreen) {
						document.exitFullscreen();
					} else if (document.webkitExitFullscreen) {
						document.webkitExitFullscreen();
					} else if (document.mozCancelFullScreen) {
						document.mozCancelFullScreen();
					} else if (document.msExitFullscreen) {
						document.msExitFullscreen();
					}
				} else if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled) {

					var v = document.getElementById('videoContainer');

					$('#fullscreenButton').removeClass('video-fullscreen--active');
					$('#fullscreenButton').addClass('video-fullscreen--disable');
					if (v.requestFullscreen) {
						v.requestFullscreen();
					} else if (v.webkitRequestFullscreen) {
						v.webkitRequestFullscreen();
					} else if (v.mozRequestFullScreen) {
						v.mozRequestFullScreen();
					} else if (v.msRequestFullscreen) {
						v.msRequestFullscreen();
					}
				} else {
					alert('Your browsers doesn\"t support fullscreen');
				}
			});

			// Picture in Picture
			let pipWindow;
			var videoElement = document.getElementById('video');
			var pipButtonX = document.getElementById('pipButtonX');
			var pipButton = document.getElementById('pipButton');

			// For Safari

			if (videoElement.webkitSupportsPresentationMode && typeof videoElement.webkitSetPresentationMode === 'function') {
				pipButton.style.display = 'none';
				pipButtonX.addEventListener('click', function (event) {
					videoElement.webkitSetPresentationMode(videoElement.webkitPresentationMode === 'picture-in-picture' ? 'inline' : 'picture-in-picture');
				});
			} else {
				pipButtonX.style.display = 'none';
			}

			pipButton.addEventListener('click', function () {
				videoElement.requestPictureInPicture()
					.catch(error => {
						// Video failed to enter Picture-in-Picture mode.
					});
			});

			// For Chrome, Edge, Opera

			videoElement.addEventListener('enterpictureinpicture', function (event) {
				pipWindow = event.pictureInPictureWindow;
				updateVideoSize(pipWindow.width, pipWindow.height);
				pipWindow.addEventListener('resize', onPipWindowResize);
			});

			videoElement.addEventListener('leavepictureinpicture', function () {
				pipWindow.removeEventListener('resize', onPipWindowResize);
			});

			function onPipWindowResize(event) {
				updateVideoSize(event.target.width, event.target.height);
			}

			function updateVideoSize(width, height) { }

			// Airplay

			var airPlayButton = document.getElementById('airplayButton');

			if (window.WebKitPlaybackTargetAvailabilityEvent) {
				videoElement.addEventListener('webkitplaybacktargetavailabilitychanged', function (event) {
					switch (event.availability) {
						case 'available':
							airPlayButton.hidden = false;
							airPlayButton.disabled = false;
							break;
						case 'not-available':
							airPlayButton.hidden = true;
							airPlayButton.disabled = true;
							break;
					}
				});
			} else if (!window.WebKitPlaybackTargetAvailabilityEvent) {
				return;
			} else {
				alert('Your browsers doesn\"t support airplay');
			}

			airPlayButton.addEventListener('click', function (event) {
				videoElement.webkitShowPlaybackTargetPicker();
			});

		}
	});

	/*========== End Video Player ==========*/
	/*========== Start Menu ==========*/

	$('#menuBtn, #menu a').on('click', function () {
		var tl = new TimelineLite();
		var tm = TweenMax;

		$('#menuBtn').toggleClass('open');
		if ($('#menuBtn').hasClass('open')) {
			$('#portfolioBtn').addClass('hidden');
			$('#social').addClass('visible');
			$('#menu').addClass('show');
			tm.set('#menu .background', { y: '-110%' });
			$('#menu .background').each(function () {
				tm.to('#menu .background', 0.5, { y: '0%', delay: 0.1, ease: Power4.easeOut });
			});
			tm.set('#social', { opacity: 0 });
			$('#social').each(function () {
				tm.to('#social', 0.5, { opacity: 1, delay: 0.5, ease: Power2.easeOut });
			});
			tl.set('#menu .nav a', { y: 110 });
			$('#menu .nav a').each(function (index, element) {
				tl.to(element, 0.5, { y: 0, delay: 0.5, ease: Power3.easeOut }, index * 0.07);
			});
			tm.set('#menu .footer', { opacity: 0 });
			$('#menu .footer').each(function () {
				tm.to('#menu .footer', 0.5, { opacity: 1, delay: 0.5, ease: Power2.easeOut });
			});
		} else {
			$('#menu .footer').each(function () {
				tm.to('#menu .footer', 0.5, { opacity: 0, delay: 0.1, ease: Power2.easeIn });
			});
			$('#social').each(function () {
				tm.to('#social', 0.5, { opacity: 0, delay: 0.1, ease: Power2.easeOut });
			});
			$('#menu .nav a').each(function (index, element) {
				tl.to(element, 0.5, { y: -110, delay: 0.1, ease: Power3.easeIn }, index * 0.07);
			});
			$('#menu .background').each(function () {
				tm.to('#menu .background', 0.5, { y: '110%', delay: 1, ease: Power4.easeOut });
			});
			setTimeout(function () {
				$('#menu').removeClass('show');
				$('#portfolioBtn').removeClass('hidden');
				$('#social').removeClass('visible');
			}, 1555);
		}
	});

	/*========== End Menu ==========*/





	/*========== Start Portfolio ==========*/


	$(document).ready(function () {
		if ($('body').hasClass('classic-menu')) {
			$('body').addClass('classic-menu--active');

			$(window).bind('resize', function () {
				if ($(this).width() < 992) {
					$('body').removeClass('classic-menu--active');
				} else {
					$('body').addClass('classic-menu--active');
				}
			}).trigger('resize');

			$('#portfolioBtn, #portfolio a').on('click', function () {
				var tl = new TimelineLite();
				var tm = TweenMax;

				if ($('#portfolioBtn').hasClass('open')) {
					$('#menu nav').each(function () {
						tm.to('#menu nav', 0.25, { opacity: 0, ease: Power2.easeOut });
					});
					$('#social').addClass('visible');
					tm.set('#social', { opacity: 0 });
					$('#social').each(function () {
						tm.to('#social', 0.5, { opacity: 1, delay: 0.5, ease: Power2.easeOut });
					});
				} else {
					$('#menu nav').each(function () {
						tm.to('#menu nav', 0.5, { opacity: 1, delay: 1, ease: Power2.easeOut });
					});
					$('#social').each(function () {
						tm.to('#social', 0.5, { opacity: 0, delay: 0.1, ease: Power2.easeOut });
					});
					setTimeout(function () {
						$('#social').removeClass('visible');
					}, 1555);
				}
			});
		}
	});

	Number.prototype.map = function (in_min, in_max, out_min, out_max) {
		return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
	}
	class EffectShell {
		constructor(container = document.getElementById('portfolio'), itemsWrapper = null) {
			this.container = container
			this.itemsWrapper = itemsWrapper
			if (!this.container || !this.itemsWrapper) return
			this.setup()
			this.initEffectShell().then(() => {
				this.isLoaded = true
				if (this.isMouseOver) this.onMouseOver(this.tempItemIndex)
				this.tempItemIndex = null
			})
			this.createEventsListeners()
		}

		setup() {
			window.addEventListener('resize', this.onWindowResize.bind(this), false)

			// renderer
			this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
			this.renderer.setSize(this.viewport.width, this.viewport.height)
			this.renderer.setPixelRatio = window.devicePixelRatio
			this.container.appendChild(this.renderer.domElement)

			// scene
			this.scene = new THREE.Scene()

			// camera
			this.camera = new THREE.PerspectiveCamera(
				40,
				this.viewport.aspectRatio,
				0.1,
				100
			)
			this.camera.position.set(0, 0, 3)

			//mouse
			this.mouse = new THREE.Vector2()

			// time
			this.timeSpeed = 2
			this.time = 0
			this.clock = new THREE.Clock()

			// animation loop
			this.renderer.setAnimationLoop(this.render.bind(this))
		}

		render() {
			// called every frame
			this.time += this.clock.getDelta() * this.timeSpeed
			this.renderer.render(this.scene, this.camera)
		}

		initEffectShell() {
			let promises = []

			this.items = this.itemsElements

			const THREEtextureLoader = new THREE.TextureLoader()
			this.items.forEach((item, index) => {
				// create textures
				promises.push(
					this.loadTexture(
						THREEtextureLoader,
						item.img ? item.img.src : null,
						index
					)
				)
			})

			return new Promise((resolve, reject) => {
				// resolve textures promises
				Promise.all(promises).then(promises => {
					// all textures are loaded
					promises.forEach((promise, index) => {
						// assign texture to item
						this.items[index].texture = promise.texture
					})
					resolve()
				})
			})
		}

		createEventsListeners() {
			this.items.forEach((item, index) => {
				item.element.addEventListener(
					'mouseover',
					this._onMouseOver.bind(this, index),
					false
				)
			})

			this.container.addEventListener(
				'mousemove',
				this._onMouseMove.bind(this),
				false
			)
			this.itemsWrapper.addEventListener(
				'mouseleave',
				this._onMouseLeave.bind(this),
				false
			)
		}

		_onMouseLeave(event) {
			this.isMouseOver = false
			this.onMouseLeave(event)
		}

		_onMouseMove(event) {
			// get normalized mouse position on viewport
			this.mouse.x = (event.clientX / this.viewport.width) * 2 - 1
			this.mouse.y = -(event.clientY / this.viewport.height) * 2 + 1

			this.onMouseMove(event)
		}

		_onMouseOver(index, event) {
			this.tempItemIndex = index
			this.onMouseOver(index, event)
		}

		onWindowResize() {
			this.camera.aspect = this.viewport.aspectRatio
			this.camera.updateProjectionMatrix()
			this.renderer.setSize(this.viewport.width, this.viewport.height)
		}

		onUpdate() { }

		onMouseEnter(event) { }

		onMouseLeave(event) { }

		onMouseMove(event) { }

		onMouseOver(index, event) { }

		get viewport() {
			let width = this.container.clientWidth
			let height = this.container.clientHeight
			let aspectRatio = width / height
			return {
				width,
				height,
				aspectRatio
			}
		}

		get viewSize() {
			let distance = this.camera.position.z
			let vFov = (this.camera.fov * Math.PI) / 180
			let height = 2 * Math.tan(vFov / 4) * distance
			let width = height * this.viewport.aspectRatio
			return { width, height, vFov }
		}

		get itemsElements() {
			const items = [...this.itemsWrapper.querySelectorAll('.portfolio-item__link')]

			return items.map((item, index) => ({
				element: item,
				img: item.querySelector('img') || null,
				index: index
			}))
		}

		loadTexture(loader, url, index) {
			return new Promise((resolve, reject) => {
				if (!url) {
					resolve({ texture: null, index })
					return
				}

				// load a resource
				loader.load(
					// resource URL
					url,

					// onLoad callback
					texture => {
						resolve({ texture, index })
					},

					// onProgress callback currently not supported
					undefined,
				)
			})
		}
	}

	class StretchEffect extends EffectShell {
		constructor(container = document.body, itemsWrapper = null, options = {}) {
			super(container, itemsWrapper)
			if (!this.container || !this.itemsWrapper) return

			options.strength = options.strength || 0.5
			this.options = options

			this.init()
		}

		init() {
			this.position = new THREE.Vector3(0, 0, 0)
			this.scale = new THREE.Vector3(0.5, 0.5, 0.5)
			this.geometry = new THREE.PlaneBufferGeometry(1, 1, 32, 32)
			this.uniforms = {
				uTexture: {
					value: null
				},
				uOffset: {
					value: new THREE.Vector2(0.0, 0.0)
				},
				uAlpha: {
					value: 0
				}
			}
			this.material = new THREE.ShaderMaterial({
				uniforms: this.uniforms,
				vertexShader: `
					uniform vec2 uOffset;
	
					varying vec2 vUv;
	
					vec3 deformationCurve(vec3 position, vec2 uv, vec2 offset) {
						float M_PI = 3.1415926535897932384626433832795;
						position.x = position.x + (sin(uv.y * M_PI) * offset.x);
						position.y = position.y + (sin(uv.x * M_PI) * offset.y);
						return position;
					}
	
					void main() {
						vUv =  uv + (uOffset * 2.);
						vec3 newPosition = position;
						newPosition = deformationCurve(position,uv,uOffset);
						gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
					}
				`,
				fragmentShader: `
					uniform sampler2D uTexture;
					uniform float uAlpha;
	
					varying vec2 vUv;
	
					vec2 scaleUV(vec2 uv,float scale) {
						float center = 0.5;
						return ((uv - center) * scale) + center;
					}
	
					void main() {
						vec3 color = texture2D(uTexture,scaleUV(vUv,0.8)).rgb;
						gl_FragColor = vec4(color,uAlpha);
					}
				`,
				transparent: true
			})
			this.plane = new THREE.Mesh(this.geometry, this.material)
			this.scene.add(this.plane)
		}

		onMouseEnter() {
			if (!this.currentItem || !this.isMouseOver) {
				this.isMouseOver = true
				// show plane
				TweenLite.to(this.uniforms.uAlpha, 0.5, {
					value: 1,
					ease: Power3.easeOut
				})
			}
		}

		onMouseLeave(event) {
			TweenLite.to(this.uniforms.uAlpha, 0.5, {
				value: 0,
				ease: Power3.easeOut
			})
		}

		onMouseMove(event) {
			// project mouse position to world coodinates
			let x = this.mouse.x.map(
				-1,
				1,
				-this.viewSize.width / 4,
				this.viewSize.width / 4
			)
			let y = this.mouse.y.map(
				-1,
				1,
				-this.viewSize.height / 2,
				this.viewSize.height / 2
			)

			// update position
			this.position = new THREE.Vector3(x, y, 0)
			TweenLite.to(this.plane.position, 1, {
				x: x,
				y: y,
				ease: Power3.easeOut,
				onUpdate: this.onPositionUpdate.bind(this)
			})
		}

		onPositionUpdate() {
			// compute offset
			let offset = this.plane.position
				.clone()
				.sub(this.position)
				.multiplyScalar(-this.options.strength)
			this.uniforms.uOffset.value = offset
		}

		onMouseOver(index, e) {
			if (!this.isLoaded) return
			this.onMouseEnter()
			if (this.currentItem && this.currentItem.index === index) return
			this.onTargetChange(index)
		}

		onTargetChange(index) {
			// item target changed
			this.currentItem = this.items[index]
			if (!this.currentItem.texture) return

			// compute image ratio
			let imageRatio =
				this.currentItem.img.naturalWidth / this.currentItem.img.naturalHeight
			this.scale = new THREE.Vector3(imageRatio, 1, 1)
			this.uniforms.uTexture.value = this.currentItem.texture
			this.plane.scale.copy(this.scale)
		}
	}

	const container = document.getElementById('portfolio')
	const itemsWrapper = document.querySelector('.portfolio-list')
	// Preload images
	const preloadImages = () => {
		return new Promise((resolve, reject) => {
			imagesLoaded(document.querySelectorAll('img'), resolve);
		});
	};
	// And then..
	preloadImages().then(() => {
		// Remove the loader
		document.body.classList.remove('loading');
		const effect = new StretchEffect(container, itemsWrapper)
	});

	/*========== End Portfolio ==========*/
	/*========== Start FullSliderVertical Swiper ==========*/

	$(document).ready(function () {
		if ($('.swiper-container').is('#fullSliderVertical')) {

			var category = [];
			var number = [];
			$('.swiper-container .swiper-slide').each(function (i) {
				category.push($(this).data('category'))
				number.push($(this).data('number'))
			});

			var fullSliderVertical = new Swiper('#fullSliderVertical', {
				direction: 'vertical',
				effect: 'slide',
				grabCursor: false,
				keyboard: true,
				lazy: true,
				loop: false,
				mousewheel: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: false,
					renderBullet: function (index, className) {
						return '<div class="' + className + '">' + '<div class="slide-label">' + '<div class="category-wrap">' + '<span class="category">' + category[index] + '</span>' + '</div>' + '<div class="number-wrap">' + '<span class="number">' + number[index] + '</span>' + '</div>' + '</div>' + '</div>';
					},
				},
				parallax: true,
				preloadImages: true,
				resistance: true,
				resistanceRatio: 0.75,
				speed: 1250,
				on: {
					init: function () {
						$('.swiper-slide-active').find('video').each(function () {
							$(this).get(0).play();
						});
					},
					slideNextTransitionStart: function () {
						var tl = new TimelineLite();

						$('.swiper-pagination-bullet-active').prev().find('.category').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '-110%', ease: Power3.easeIn }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').find('.category').each(function (index, element) {
							tl.to(element, 0.5, { scale: 1, y: '0%', delay: 0.5, ease: Power3.easeOut }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').next().find('.category').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '110%', ease: Power3.easeIn }, index * 0.01)
						});

						$('.swiper-pagination-bullet-active').prev().find('.number').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '-110%', ease: Power3.easeIn }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').find('.number').each(function (index, element) {
							tl.to(element, 0.5, { scale: 1, y: '0%', delay: 0.5, ease: Power3.easeOut }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').next().find('.number').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '110%', ease: Power3.easeIn }, index * 0.01)
						});
					},
					slidePrevTransitionStart: function () {
						var tl = new TimelineLite();

						$('.swiper-pagination-bullet-active').prev().find('.category').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '-110%', ease: Power3.easeIn }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').find('.category').each(function (index, element) {
							tl.to(element, 0.5, { scale: 1, y: '0%', delay: 0.5, ease: Power3.easeOut }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').next().find('.category').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '110%', ease: Power3.easeIn }, index * 0.01)
						});

						$('.swiper-pagination-bullet-active').prev().find('.number').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '-110%', ease: Power3.easeIn }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').find('.number').each(function (index, element) {
							tl.to(element, 0.5, { scale: 1, y: '0%', delay: 0.5, ease: Power3.easeOut }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').next().find('.number').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '110%', ease: Power3.easeIn }, index * 0.01)
						});
					},
					slideChangeTransitionStart: function () {
						var tm = TweenMax;

						tm.to($('.swiper-slide-active').prev().find('.slide-label'), 2, { y: '-200%', ease: Power3.easeOut });
						tm.to($('.swiper-slide-active').find('.slide-label'), 2, { y: '0%', ease: Power3.easeOut });
						tm.to($('.swiper-slide-active').next().find('.slide-label'), 2, { y: '200%', ease: Power3.easeOut });

						tm.to($('.swiper-slide-active').prev().find('.slide-media'), 1, { opacity: 0, ease: Power2.easeInOut });
						tm.to($('.swiper-slide-active').find('.slide-media'), 1, { opacity: 0.65, ease: Power2.easeOut });
						tm.to($('.swiper-slide-active').next().find('.slide-media'), 1, { opacity: 0, ease: Power2.easeInOut });

						$('.swiper-slide-active').find('video').each(function () {
							$(this).get(0).play();
							$(this).prop('muted', true);
						});
					},
					slideChangeTransitionEnd: function () {
						$('.swiper-slide-prev').find('video').each(function () {
							$(this).get(0).pause();
						});
						$('.swiper-slide-next').find('video').each(function () {
							$(this).get(0).pause();
						});
					}
				}
			});
		}
	});

	/*========== End FullSliderVertical Swiper ==========*/
	/*========== Start RectangleSliderHorizontal Swiper ==========*/

	$(document).ready(function () {
		if ($('.swiper-container').is('#rectangleSliderHorizontal')) {

			var category = [];
			var number = [];
			$('.swiper-container .swiper-slide').each(function (i) {
				category.push($(this).data('category'))
				number.push($(this).data('number'))
			});

			var rectangleSliderHorizontal = new Swiper('#rectangleSliderHorizontal', {
				centeredSlides: true,
				direction: 'horizontal',
				effect: 'slide',
				grabCursor: false,
				keyboard: true,
				loop: false,
				mousewheel: true,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				pagination: {
					el: '.swiper-pagination',
					clickable: false,
					renderBullet: function (index, className) {
						return '<div class="' + className + '">' + '<div class="slide-label">' + '<div class="category-wrap">' + '<span class="category">' + category[index] + '</span>' + '</div>' + '<div class="number-wrap">' + '<span class="number">' + number[index] + '</span>' + '</div>' + '</div>' + '</div>';
					},
				},
				parallax: false,
				preloadImages: true,
				resistance: true,
				resistanceRatio: 0.75,
				slidesPerView: 'auto',
				spaceBetween: 256,
				speed: 1010,
				breakpoints: {
					320: {
						spaceBetween: 0
					},
					768: {
						spaceBetween: 256
					},
					992: {
						spaceBetween: 192
					},
					1600: {
						spaceBetween: 256
					}
				},
				on: {
					init: function () {
						$('.swiper-slide-active').find('video').each(function () {
							$(this).get(0).play();
						});
					},
					slideNextTransitionStart: function () {
						var tl = new TimelineLite();

						$('.swiper-pagination-bullet-active').prev().find('.category').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '-110%', ease: Power3.easeIn }, index * 0.01)
						})
						$('.swiper-pagination-bullet-active').find('.category').each(function (index, element) {
							tl.to(element, 0.5, { scale: 1, y: '0%', delay: 0.5, ease: Power3.easeOut }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').next().find('.category').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '110%', ease: Power3.easeIn }, index * 0.01)
						});

						$('.swiper-pagination-bullet-active').prev().find('.number').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '-110%', ease: Power3.easeIn }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').find('.number').each(function (index, element) {
							tl.to(element, 0.5, { scale: 1, y: '0%', delay: 0.5, ease: Power3.easeOut }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').next().find('.number').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '110%', ease: Power3.easeIn }, index * 0.01)
						});
					},
					slidePrevTransitionStart: function () {
						var tl = new TimelineLite();

						$('.swiper-pagination-bullet-active').prev().find('.category').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '-110%', ease: Power3.easeIn }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').find('.category').each(function (index, element) {
							tl.to(element, 0.5, { scale: 1, y: '0%', delay: 0.5, ease: Power3.easeOut }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').next().find('.category').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '110%', ease: Power3.easeIn }, index * 0.01)
						});

						$('.swiper-pagination-bullet-active').prev().find('.number').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '-110%', ease: Power3.easeIn }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').find('.number').each(function (index, element) {
							tl.to(element, 0.5, { scale: 1, y: '0%', delay: 0.5, ease: Power3.easeOut }, index * 0.01)
						});
						$('.swiper-pagination-bullet-active').next().find('.number').each(function (index, element) {
							tl.to(element, 0.25, { scale: 1, y: '110%', ease: Power3.easeIn }, index * 0.01)
						});
					},
					slideChangeTransitionStart: function () {
						var tm = TweenMax;

						tm.to($('.swiper-slide-active').prev().find('.slide-label'), 2, { x: -64, ease: Power3.easeOut });
						tm.to($('.swiper-slide-active').find('.slide-label'), 2, { x: 0, ease: Power3.easeOut });
						tm.to($('.swiper-slide-active').next().find('.slide-label'), 2, { x: 64, ease: Power3.easeOut });

						$('.swiper-slide-active').find('video').each(function () {
							$(this).get(0).play();
							$(this).prop('muted', true);
						});
					},
					slideChangeTransitionEnd: function () {
						$('.swiper-slide-prev').find('video').each(function () {
							$(this).get(0).pause();
						});
						$('.swiper-slide-next').find('video').each(function () {
							$(this).get(0).pause();
						});
					}
				}
			});
		}
	});

	/*========== End RectangleSliderHorizontal Swiper ==========*/
	/*========== Start Contact Form ==========*/

	$('#form').on('submit', function () {
		$.ajax({
			type: 'POST',
			url: 'mail.php', // default 'mail.php'. Can be change to 'telegram.php' for using Telegram
			data: $(this).serialize(),
			success: function (data) {
				$(this).find('input').val('');
				alert('Thank you for your request! Soon we will contact you.');
				$('#form').trigger('reset');
			}
		});
		return false;
	});

	/*========== End Contact Form ==========*/
	/*========== Start About ==========*/

	$(document).ready(function () {
		if ($('div').hasClass('owl-carousel')) {
			var owlR = $('.review .owl-carousel');

			owlR.owlCarousel({
				dots: true,
				loop: true,
				items: 1,
				margin: 16,
				nav: false,
				smartSpeed: 1010,
			});
		}
	});

	$(document).ready(function () {
		if ($('div').hasClass('showreel-video')) {
			$('#playShowreel').on('click', function () {
				var tm = TweenMax;

				$('.showreel-video').addClass('visible');
				if ($('.showreel-video').hasClass('visible')) {
					tm.set('.showreel-video', { opacity: 0 });
					$('.showreel-video').each(function () {
						tm.to('.showreel-video', 0.5, { opacity: 1, delay: 0.5, ease: Power2.easeOut });
					});
					tm.set('.showreel-video #videoContainer', { scale: 0.5 });
					$('.showreel-video #videoContainer').each(function () {
						tm.to('.showreel-video #videoContainer', 0.5, { scale: 1, delay: 0.25, ease: Power2.easeOut });
					});
				}
			});

			$('#closeVideo').on('click', function () {
				var tm = TweenMax;

				$('.showreel-video').addClass('hidden');
				if ($('.showreel-video').hasClass('visible')) {
					$('.showreel-video').each(function () {
						tm.to('.showreel-video', 0.5, { opacity: 0, delay: 0.5, ease: Power2.easeOut });
					});
					$('.showreel-video #videoContainer').each(function () {
						tm.to('.showreel-video #videoContainer', 0.5, { scale: 0.5, delay: 0.25, ease: Power2.easeOut });
					});
					setTimeout(function () {
						$('.showreel-video').removeClass('visible');
					}, 750);
				}
			});
		}
	});

	$('.statistics__counter span').each(function () {
		var $this = $(this),
			countTo = $this.attr('data-count');

		$({ countNum: $this.text() }).animate({
			countNum: countTo
		},
			{
				duration: 5000,
				easing: 'linear',
				step: function () {
					$this.text(Math.floor(this.countNum));
				},
				complete: function () {
					$this.text(this.countNum);
				}
			});
	});

	/*========== End About ==========*/
	/*========== Start Services ==========*/

	const items = document.querySelectorAll('.service-list button');

	function toggleAccordion() {
		const itemToggle = this.getAttribute('aria-expanded');

		for (i = 0; i < items.length; i++) {
			items[i].setAttribute('aria-expanded', 'false');
		}

		if (itemToggle == 'false') {
			this.setAttribute('aria-expanded', 'true');
		}
	}

	items.forEach(item => item.addEventListener('click', toggleAccordion));

	/*========== End Services ==========*/
	/*========== Start Work ==========*/

	$(document).ready(function () {
		if ($('.swiper-container').is('#galleryFull')) {

			var fullSliderHorizontal = new Swiper('#galleryFull', {
				centeredSlides: true,
				direction: 'horizontal',
				effect: 'slide',
				grabCursor: true,
				keyboard: true,
				lazy: true,
				loop: true,
				mousewheel: false,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				parallax: true,
				preloadImages: true,
				resistance: true,
				resistanceRatio: 0.75,
				slidesPerView: 'auto',
				speed: 1010,
				breakpoints: {
					0: {
						spaceBetween: 32
					},
					768: {
						spaceBetween: 64
					},
					1200: {
						spaceBetween: 128
					}
				},
			});
		}
	});

	$(document).ready(function () {
		if ($('.swiper-container').is('#gallerySingle')) {

			var fullSliderHorizontal = new Swiper('#gallerySingle', {
				centeredSlides: true,
				direction: 'horizontal',
				effect: 'slide',
				grabCursor: true,
				keyboard: true,
				lazy: true,
				loop: true,
				mousewheel: false,
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				parallax: true,
				preloadImages: true,
				resistance: true,
				resistanceRatio: 0.75,
				slidesPerView: 1,
				speed: 1010,
			});
		}
	});

	$(document).ready(function () {
		if ($('a').hasClass('content-image')) {
			$('.main-content').magnificPopup({
				delegate: '.content-image',
				type: 'image',
				closeOnContentClick: false,
				closeBtnInside: false,
				mainClass: 'mfp-with-zoom mfp-img-mobile',
				image: {
					verticalFit: true,
					titleSrc: function (item) {
						return '<a class="image-source-link" href="' + item.el.attr('data-source') + '" target="_blank"></a>';
					}
				},
				gallery: {
					enabled: true
				},
				zoom: {
					enabled: true,
					duration: 500,
					opener: function (element) {
						return element.find('img');
					}
				}
			});
		}
	});

	$('.work-item--video').on('mouseenter', function (event) {
		$('.work-item--video').find('video').each(function () {
			$(this).get(0).play();
			$(this).prop('muted', true);
		});
	});

	$('.work-item--video').on('mouseleave', function (event) {
		$('.work-item--video').find('video').each(function () {
			$(this).get(0).pause();
			$(this).get(0).currentTime = 0;
		});
	});

	/*========== End Work ==========*/
	/*========== Start Smooth Scroll ==========*/

	$(document).ready(function () {
		if ($('body').hasClass('smooth-scroll')) {
			var elem = document.querySelector('#scroll-content');
			var scrollbar = Scrollbar.init(elem,
				{
					renderByPixels: true,
					damping: 0.05
				});

			$('#top').on('click', function () {
				if ($('body').hasClass('smooth-scroll')) {
					TweenMax.to(scrollbar, 1.5, { scrollTop: 0, delay: 0.1, ease: Power4.easeInOut });
				} else {
					$('html, body').animate({ scrollTop: 0 }, 800);
				}
			});

			var controller = new ScrollMagic.Controller();

			var parallaxScene = TweenMax.to('.hero .image', 1, { top: '18%', ease: Power0.easeNone });
			var controller = new ScrollMagic.Controller();
			var parallaxScene = new ScrollMagic.Scene({
				triggerElement: '.hero',
				triggerHook: 0,
				duration: '100%'
			})
				.setTween(parallaxScene)
				.addTo(controller);

			$('.hero, .showreel').each(function () {
				var $this = $(this);
				var opacity = $this.find('.image');
				var imgOpacity = TweenMax.fromTo(opacity, 5, { opacity: 0.65 }, { opacity: 0, ease: Power0.easeNone });
				var opacityScene = new ScrollMagic.Scene({
					triggerElement: this,
					triggerHook: 0,
					duration: '90%'
				})
					.setTween(imgOpacity)
					.addTo(controller);
			});

			var height = window.innerHeight;

			$('.parallax-block').each(function () {
				var $this = $(this);
				var thisheight = $(this).height() + height;
				var parallax = $this.find('img, .image');
				var imgParallax = TweenMax.fromTo(parallax, 1, { y: '-5%' }, { y: '5%', ease: Power0.easeNone });
				var controller = new ScrollMagic.Controller();
				var parallaxScene = new ScrollMagic.Scene({
					triggerElement: this,
					triggerHook: 1,
					duration: thisheight
				})
					.setTween(imgParallax)
					.addTo(controller);
			});

			var animation = document.getElementsByClassName('animated');

			for (var i = 0; i < animation.length; i++) {
				new ScrollMagic.Scene({
					triggerElement: animation[i],
					offset: 25,
					triggerHook: 0.85,
					reverse: false
				})
					.setClassToggle(animation[i], 'visible')
					.addTo(controller);
			}

			$('.team-item, .client-item, .work-item, .blog-item, .statistics-item').each(function () {
				var $this = $(this);
				var $thisHeight = $(this).height();

				var scene = new ScrollMagic.Scene({ triggerElement: $this[0], duration: $thisHeight })
					.addTo(controller);

				scene.triggerHook(1)

				scene.on('enter', function () {
					$this.delay($this.attr('data-delay')).queue(function (next) {
						TweenMax.to($this, 1, { force3D: true, opacity: 1, y: 0, scale: 1, delay: 0.1, ease: Power3.easeOut });
						next();
					});
				});

				if ($('body').hasClass('smooth-scroll')) {
					scrollbar.addListener(() => {
						scene.refresh()
					});
				}
			});

		}
	});

	/*========== End Smooth Scroll ==========*/
});

/*========== Start Google Map ==========*/

function initMap() {
	var mapOptions = {
		zoom: 16,
		center: new google.maps.LatLng(50.495569, 30.506437),
		draggable: true,
		scrollwheel: false,
		disableDefaultUI: true,
		styles: [
			{
				'featureType': 'all',
				'elementType': 'labels',
				'stylers': [
					{
						'visibility': 'on'
					}
				]
			},
			{
				'featureType': 'all',
				'elementType': 'labels.text.fill',
				'stylers': [
					{
						'saturation': 36
					},
					{
						'color': '#000000'
					},
					{
						'lightness': 40
					}
				]
			},
			{
				'featureType': 'all',
				'elementType': 'labels.text.stroke',
				'stylers': [
					{
						'visibility': 'on'
					},
					{
						'color': '#000000'
					},
					{
						'lightness': 16
					}
				]
			},
			{
				'featureType': 'all',
				'elementType': 'labels.icon',
				'stylers': [
					{
						'visibility': 'off'
					}
				]
			},
			{
				'featureType': 'administrative',
				'elementType': 'geometry.fill',
				'stylers': [
					{
						'color': '#000000'
					},
					{
						'lightness': 20
					}
				]
			},
			{
				'featureType': 'administrative',
				'elementType': 'geometry.stroke',
				'stylers': [
					{
						'color': '#000000'
					},
					{
						'lightness': 17
					},
					{
						'weight': 1.2
					}
				]
			},
			{
				'featureType': 'administrative.country',
				'elementType': 'labels.text.fill',
				'stylers': [
					{
						'color': '#838383'
					}
				]
			},
			{
				'featureType': 'administrative.locality',
				'elementType': 'labels.text.fill',
				'stylers': [
					{
						'color': '#c4c4c4'
					}
				]
			},
			{
				'featureType': 'administrative.neighborhood',
				'elementType': 'labels.text.fill',
				'stylers': [
					{
						'color': '#aaaaaa'
					}
				]
			},
			{
				'featureType': 'landscape',
				'elementType': 'geometry',
				'stylers': [
					{
						'color': '#000000'
					},
					{
						'lightness': 20
					}
				]
			},
			{
				'featureType': 'poi',
				'elementType': 'geometry',
				'stylers': [
					{
						'color': '#000000'
					},
					{
						'lightness': 21
					},
					{
						'visibility': 'on'
					}
				]
			},
			{
				'featureType': 'poi.business',
				'elementType': 'geometry',
				'stylers': [
					{
						'visibility': 'on'
					}
				]
			},
			{
				'featureType': 'road.highway',
				'elementType': 'geometry.fill',
				'stylers': [
					{
						'color': '#6e6e6e'
					},
					{
						'lightness': '0'
					}
				]
			},
			{
				'featureType': 'road.highway',
				'elementType': 'geometry.stroke',
				'stylers': [
					{
						'visibility': 'off'
					}
				]
			},
			{
				'featureType': 'road.highway',
				'elementType': 'labels.text.fill',
				'stylers': [
					{
						'color': '#ffffff'
					}
				]
			},
			{
				'featureType': 'road.arterial',
				'elementType': 'geometry',
				'stylers': [
					{
						'color': '#000000'
					},
					{
						'lightness': 18
					}
				]
			},
			{
				'featureType': 'road.arterial',
				'elementType': 'geometry.fill',
				'stylers': [
					{
						'color': '#575757'
					}
				]
			},
			{
				'featureType': 'road.arterial',
				'elementType': 'labels.text.fill',
				'stylers': [
					{
						'color': '#ffffff'
					}
				]
			},
			{
				'featureType': 'road.arterial',
				'elementType': 'labels.text.stroke',
				'stylers': [
					{
						'color': '#2c2c2c'
					}
				]
			},
			{
				'featureType': 'road.local',
				'elementType': 'geometry',
				'stylers': [
					{
						'color': '#000000'
					},
					{
						'lightness': 16
					}
				]
			},
			{
				'featureType': 'road.local',
				'elementType': 'labels.text.fill',
				'stylers': [
					{
						'color': '#999999'
					}
				]
			},
			{
				'featureType': 'transit',
				'elementType': 'geometry',
				'stylers': [
					{
						'color': '#000000'
					},
					{
						'lightness': 19
					}
				]
			},
			{
				'featureType': 'water',
				'elementType': 'geometry',
				'stylers': [
					{
						'color': '#000000'
					},
					{
						'lightness': 17
					}
				]
			}
		]
	};
	var mapElement = document.getElementById('map');
	var map = new google.maps.Map(mapElement, mapOptions);
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(50.495569, 30.506437),
		map: map,
		title: 'I\"m here!'
	});
}








/*========== End Google Map ==========*/