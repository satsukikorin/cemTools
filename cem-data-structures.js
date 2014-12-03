(function(){
	
	var _ = {
	
		// an array that loops, e.g. the days of the week
		Ring: function (initData) {
		
			if (typeof initData === 'undefined') initData = [];
			else if (!initData instanceof Array) throw new TypeError('initial data must be an array');

			var me = this,
				current = 0;
			
			this.data = initData;
			
			this.add = function(item, i) {
				if (typeof i !== 'undefined' && i instanceof 'number' && i > 0 && i <= this.data.length) {
					this.data.splice(i, 0, item);
				}
				else this.data.push(item);
			}
			
			this.value = function() {
				return this.data[current];
			}
			
			this.index = function() {
				return current;
			}

			function offsetIndexBy(n) {
				var offset = current + n,
					answer;
				if (offset >= me.data.length) answer = offset % me.data.length;
				else if (offset < 0) answer = me.length % Math.abs(offset);
				else answer = offset;
				return answer;
			}
						
			// return the value found at +/- offset from current position
			this.at = function(n) {
				return this.data[offsetIndexBy(n)];
			};
			
			// set 'current' at new +/- position 
			this.goto = function(n) {
				current = offsetIndexBy(n);
			};

			this.jump = function(n) {
				this.goto(n);
				return this.value();
			};

			this.next = function() {
				return this.jump(1);
			};

			this.prev = function() {
				return this.jump(-1);
			};
			
		}
	
	}
	
	window._ = _;
})();