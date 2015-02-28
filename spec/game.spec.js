Math.random = (function() {
	var seed = 0x2F6E2B1;
	return function() {
// Robert Jenkins’ 32 bit integer hash function
		seed = ((seed + 0x7ED55D16) + (seed << 12)) & 0xFFFFFFFF;
		seed = ((seed ^ 0xC761C23C) ^ (seed >>> 19)) & 0xFFFFFFFF;
		seed = ((seed + 0x165667B1) + (seed << 5)) & 0xFFFFFFFF;
		seed = ((seed + 0xD3A2646C) ^ (seed << 9)) & 0xFFFFFFFF;
		seed = ((seed + 0xFD7046C5) + (seed << 3)) & 0xFFFFFFFF;
		seed = ((seed ^ 0xB55A4F09) ^ (seed >>> 16)) & 0xFFFFFFFF;
		return (seed & 0xFFFFFFF) / 0x10000000;
	};
}());

require('./../lib/game.js');
var fs = require('fs');
var assert = require('assert');

var capture = {
	printedLines: null,
	get: function() {
		return this.printedLines.map(function(args) {
			return [].slice.call(args).join('');
		}).join('\n');
	},
	start: function() {
		this.printedLines = [];
	},
	stop: function() {
		this.printedLines = null;
	}
};

var fileWrapper = {
	write: function(file, input) {
		fs.writeFile(file, input, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("The file was saved!");
			}
		});
	},
	read: function(file, callback) {
		fs.readFile(file, 'utf8', callback);
	}
};


describe("The test environment", function() {
  it("should pass", function() {
		assert.equal(true, true)
  });

  it("should access game", function() {
		assert(typeof Game !== 'undefined');
  });
});

describe("Game", function() {
	var game;

	beforeEach(function() {
		var logger = function() {
			if (global.lines) {
				global.lines.push(arguments);
			}
		}
		game = new Game(logger);
		global.lines = [];
		game.logger = null;
		capture.start();
	});

	afterEach(function() {
		capture.stop();
		global.lines = null;
		game = null;
	});

	describe("play", function() {
		it("golden master output matches current output", function() {
			// prep
			var gameRunner = new GameRunner();

			// act
			var iteration = 0;
			while(iteration < 10) {
				var random = Math.random();
				gameRunner.play(random);
				iteration++;
			}

			// verify
			fileWrapper.read('./game-output.txt', function(err, data) {
				if(err) {
					console.log(err);
				}
				assert.equal(data, capture.get());
			});
		});
	});

  it("can be created", function() {
		assert(typeof game === 'object');
	});

	it("outputs nothing", function() {
		// prepare

		// act

		// verify
		assert(capture.get() === '');
	});

	describe("createRockQuestion", function() {
		it("returns correct output", function() {
			// prepare

			// act

			// verify
			assert(game.createRockQuestion(1) === "Rock Question 1")
		});
	});

	describe("roll", function() {
		it("returns correct output", function() {
			// prepare

			// act
			game.roll();

			// verify
			assert.equal(capture.get(), "undefined is the current player\nThey have rolled a undefined\nundefined's new location is NaN\nThe category is Rock\nRock Question 0");
		});
	});

	describe("isPlayable", function() {
		it("returns true if there are more than 1 player", function() {
			// prepare

			// act

			// verify
			assert(game.isPlayable(2) === true);
		});

		it("returns false if there is only 1 player", function() {
			// prepare

			// act

			// verify
			assert(game.isPlayable(1) === false);
		});
	});

	describe("howManyPlayers", function() {
		it("returns number of players", function() {
			// prepare

			// act
			game.add("Vytautas");
			game.add("Martynas");

			// verify
			assert(game.howManyPlayers() === 2);
		});
	});

	describe("add", function() {
		it("adds player", function() {
			// prepare

			// act
			game.add("Vytautas");

			// verify
			assert(capture.get() === "Vytautas was added\nThey are player number 1");
		});
	});
});
