/* eslint-env browser */
// ***********************************************************************
window.requestAnimFrame = (function(){
	return window.requestAnimationFrame;
})();
// ***********************************************************************
(function startMeUp(){
	const self = this;
	let h = 0, s = 30, m = 10;
	let a = 30; // alarm
	// ********************************************************************
	function optionsToggle() {
		self.options = !self.options;
		if (self.options) {
			self.panelEle.style.opacity = '70%';
		} else {
			self.panelEle.style.opacity = '0%';
		}
	};

	// ********************************************************************
	function showHourNums(){
		self.showHourNums = (self.showHourNums == 0) ? 1 : 0;
		if (self.showHourNums) {
			self.hourContain.style.display = 'block';
		} else {
			self.hourContain.style.display = 'none';
		}
	}// min-tick hour-tick hour-contain min-contain
	// ********************************************************************
	function showMinNums(){
		self.showMinuteNums = (self.showMinuteNums == 0) ? 1 : 0;
		if (self.showMinuteNums) {
			self.minContain.style.display = 'block';
		} else {
			self.minContain.style.display = 'none';
		}
	}
	// ********************************************************************
	function showHourTicks(){
		self.showHourTicks = (self.showHourTicks == 0) ? 1 : 0;
		if (self.showHourTicks) {
			self.hourTicksContain.style.display = 'flex';
		} else {
			self.hourTicksContain.style.display = 'none';
		}
	}
	// ********************************************************************
	function showMinTicks(){
		self.showMinTicks = (self.showMinTicks == 0) ? 1 : 0;
		let display = 'none';
		if (self.showMinTicks) {
			display = 'flex';
		}
		minTickEles = document.getElementsByClassName('min-tick');
		for (e = 0; e < minTickEles.length; e++) {
			minTickEles[e].style.display = display;
		}
	}
	// ********************************************************************
	function offsetHours(event) {
		self.offsetHours = event.target.value;
		// console.log(self.offsetHours);
	}
	// ********************************************************************
	function offsetMins(event) {
		self.offsetMins = event.target.value;
		// console.log(self.offsetMins);
	}
	// ********************************************************************
	function offsetSecs(event) {
		self.offsetSecs = event.target.value;
		// console.log(self.offsetSecs);
	}
	// ********************************************************************
	function startHours(event) {
		self.offsetStartHours = event.target.value;
		// console.log(self.offsetHours);
	}
	// ********************************************************************
	function startMins(event) {
		self.offsetStartMins = event.target.value;
		// console.log(self.offsetMins);
	}
	// ********************************************************************
	function startSecs(event) {
		self.offsetStartSecs = event.target.value;
		// console.log(self.offsetSecs);
	}
	// ********************************************************************
	function toggleLED() {
		self.digitalClock = (self.digitalClock == 0) ? 1 : 0;
		if (self.digitalClock) {
			self.ledclock.style.display = 'flex';
		} else {
			self.ledclock.style.display = 'none';
		}
	}
	// ********************************************************************
	function visLED() {
		self.ledInFront = (self.ledInFront == 0) ? 1 : 0;
		if (self.ledInFront) {
			self.ledclock.style.zIndex = 16;
		} else {
			self.ledclock.style.zIndex = 2;
		}
	}
	// ********************************************************************
	function addOffset() {
		if (self.offsetFirstTime) {
			h = self.offsetStartHours;
			m = self.offsetStartMins;
			s = self.offsetStartSecs;
			self.offsetFirstTime = false;
			return;
		}
		h = h % 12;
		console.log('a ' + h + ':' + m + ':' + s);
		h = parseInt(h) + parseInt(self.offsetHours);
		m = parseInt(m) + parseInt(self.offsetMins);
		s = parseInt(s) + parseInt(self.offsetSecs);
		if (s >= 60) {
			m += 1;
			s = s % 60;
		}
		if (m >= 60) {
			h += 1;
			m = m % 60;
		}
		h %= 12;
		h = h + (m/60) + (s/360);
		m = m + s/60;
		s %= 60;
		console.log('b ' + self.offsetHours + ':' + self.offsetMins + ':' + self.offsetSecs);
		console.log('c ' + h + ':' + m + ':' + s);
	}
	// ********************************************************************
	function randomTime() {
		alarm = getRandomInt(60);
		let t = getRandomInt(60 * 60 * 24);
		h = (t/(60*60));// hours
		m = (h*60);// minutes
		s = (m*60);// seconds
		a = alarm;
	}
	// ********************************************************************
	console.log('clock');
	this.options = 0; // toggle options screen
	this.timeMode = 0;// real=0, offset=1, random=2
	this.digitalClock = 1;
	this.ledInFront = 0;
	this.showHourNums = 1;
	this.showMinuteNums = 0;
	this.showHourTicks = 1;
	this.showMinTicks = 1;
	this.offsetFirstTime = true;
	this.offsetStartHours = 0;
	this.offsetStartMins = 0;
	this.offsetStartSecs = 0;
	this.offsetHours = 0;
	this.offsetMins = 5;
	this.offsetSecs = 0;
	
	this.hourEle = document.getElementById('hour');
	this.minEle = document.getElementById('min');
	this.secEle = document.getElementById('sec');
	this.alarmEle = document.getElementById('alarm');
	this.optionCloseEle = document.getElementById('option-close');
	this.optionCloseEle.addEventListener('click',optionsToggle);
	this.hourContain = document.getElementById('hour-contain');
	this.hourTicksContain = document.getElementById('hour-tick-contain');
	this.minContain = document.getElementById('min-contain');
	this.panelEle = document.getElementById('option-panel');
	this.option3bar = document.getElementById('option3bar');
	this.option3bar.addEventListener('click',optionsToggle);
	this.offsetButt = document.getElementById('offset-button');
	this.offsetButt.addEventListener('click',addOffset);
	this.offsetHoursEle = document.getElementById('offset-hours');
	this.offsetHoursEle.addEventListener('change',offsetHours);
	this.offsetMinsEle = document.getElementById('offset-mins');
	this.offsetMinsEle.addEventListener('change',offsetMins);
	this.offsetSecsEle = document.getElementById('offset-secs');
	this.offsetSecsEle.addEventListener('change',offsetSecs);

	this.offsetStartHoursEle = document.getElementById('start-hours');
	this.offsetStartHoursEle.addEventListener('change',startHours);
	this.offsetStartMinsEle = document.getElementById('start-mins');
	this.offsetStartMinsEle.addEventListener('change',startMins);
	this.offsetStartSecsEle = document.getElementById('start-secs');
	this.offsetStartSecsEle.addEventListener('change',startSecs);

	this.randomButt = document.getElementById('random-button');
	this.randomButt.addEventListener('click',randomTime);
	this.showHourNumsEle = document.getElementById('show-hours');
	this.showHourNumsEle.addEventListener('click',showHourNums);
	this.showMinuteNumsEle = document.getElementById('show-minutes');
	this.showMinuteNumsEle.addEventListener('click',showMinNums);
	this.showHourTicksEle = document.getElementById('show-hour-ticks');
	this.showHourTicksEle.addEventListener('click',showHourTicks);
	this.showMinTicksEle = document.getElementById('show-min-ticks');
	this.showMinTicksEle.addEventListener('click',showMinTicks);
	this.showDigitalCheck = document.getElementById('show-digital');
	this.showDigitalCheck.addEventListener('click',toggleLED);
	this.frontDigitalCheck = document.getElementById('front-digital');
	this.frontDigitalCheck.addEventListener('click',visLED);
	this.ledclock = document.getElementById('ledclock'),
	this.ampmEle = document.getElementsByClassName('ampm')[0];
	const digit_to_name = 'zero one two three four five six seven eight nine'.split(' ');
	const digits = {};
	const positions = [
		'h1', 'h2', ':', 'm1', 'm2', ':', 's1', 's2'
	];
	const posLen = positions.length;
	for (let p = 0; p < posLen; p++) {
		digits[positions[p]] = document.getElementById('led' + positions[p]);
	}

	document.querySelectorAll('input[name="timeMode"]').forEach((elem) => {
		elem.addEventListener('change', function(event) {
			switch(event.target.id){
				case 'real': {
					self.timeMode = 0;
					self.offsetButt.style.display = 'none';
					self.randomButt.style.display = 'none';
					break;
				}
				case 'random':{
					self.timeMode = 1;
					self.offsetButt.style.display = 'none';
					self.randomButt.style.display = 'block';
					break;
				}
				case 'offset': {
					self.timeMode = 2;
					self.offsetFirstTime = true;
					self.offsetButt.style.display = 'block';
					self.randomButt.style.display = 'none';
					break;
				}
			}
		});
	});
	// set up a loop
	(function loop(){
		requestAnimFrame(loop);
		draw();
	})();
	// ********************************************************************
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
	// ********************************************************************
	function setLED(now) {
		digits.h1.setAttribute('class', digit_to_name[now[0]]);
		digits.h2.setAttribute('class', digit_to_name[now[1]]);
		digits.m1.setAttribute('class', digit_to_name[now[2]]);
		digits.m2.setAttribute('class', digit_to_name[now[3]]);
		digits.s1.setAttribute('class', digit_to_name[now[4]]);
		digits.s2.setAttribute('class', digit_to_name[now[5]]);
		if (now[6] == 'A'){
			// console.log('AM');
			self.ampmEle.innerHTML = 'AM';
			self.ampmEle.style.top = '5px';
			self.ampmEle.style.bottom = 'auto';
		} else{
			// console.log('PM');
			self.ampmEle.innerHTML = 'PM';
			self.ampmEle.style.top = 'auto';
			self.ampmEle.style.bottom = '8px';
		}
	}
	// ********************************************************************
	function draw(){
		let now = new Date();// now
		switch(self.timeMode) {
			case 0: {
				let	then = new Date(now.getFullYear(),now.getMonth(),now.getDate(),0,0,0),// midnight
					diffInMil = (now.getTime() - then.getTime());// difference in milliseconds
				h = (diffInMil/(1000*60*60));// hours
				m = (h*60);// minutes
				s = (m*60);// seconds
				break;
			}
			case 1: {
				break;
			}
			case 2:
			default: {
				break;
			}
		}
		// led clock
		let lh = (h % 12);
		if (lh < 1) lh = '12';
		lh = parseInt(lh);
		const lm = parseInt(m % 60);
		const ls = parseInt(s % 60);
		const lampm = (lh == now.getHours()) ? 'AM':'PM';
		let msg = lh.toString().padStart(2,'0')
			+ lm.toString().padStart(2,'0')
			+ ls.toString().padStart(2,'0')
			+ lampm;
		// console.log(msg);
		setLED(msg);
		// rotate the hands accordingly
		this.secEle.style.transform = 'rotate(' + (s * 6) + 'deg)';
		this.hourEle.style.transform = 'rotate(' + (h * 30) + 'deg)';
		this.minEle.style.transform = 'rotate(' + (m * 6) + 'deg)';
		this.alarmEle.style.transform = 'rotate(' + (a * 6) + 'deg)';
	} 
})();

