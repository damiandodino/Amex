
function changeWheelSpeed(container, speedY) {
	var removed = false;
	var scrollY = 0;
	var handleScrollReset = function() {
		scrollY = container.scrollTop;
	};
	var handleMouseWheel = function(e) {
		//e.preventDefault();
		scrollY += speedY * e.deltaY
		if (scrollY < 0) {
			scrollY = 0;
		} else {
			var limitY = container.scrollHeight - container.clientHeight;
			if (scrollY > limitY) {
				scrollY = limitY;
			}
		}
		container.scrollTop = scrollY;
	};
	container.addEventListener('mouseup', handleScrollReset, false);
	container.addEventListener('mousedown', handleScrollReset, false);
	container.addEventListener('mousewheel', handleMouseWheel, false);
	return function() {
		if (removed) {
			return;
		}
		container.removeEventListener('mouseup', handleScrollReset, false);
		container.removeEventListener('mousedown', handleScrollReset, false);
		container.removeEventListener('mousewheel', handleMouseWheel, false);
		removed = true;
	};
}


// Usage example:

var element = document.querySelector('#container-1');

changeWheelSpeed(element, 0.005);  // 0.5 * default_scroll_speed  // 2 times slower
