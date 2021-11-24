exports.install = function (Vue, options) {
	Vue.prototype.onBackClick = function () {
		if (window.__push_method__ === 'push') {
          let root = document.querySelector('[von-app]')
          if (root) root.setAttribute('transition-direction', 'back');
//        history.go(-1)
          javascript:window.history.back(-1);
        }
	}
}