require('./../lib/game.js');
var assert = require('assert');
var capture = {
	get: function() {
		return global.lines.map(function(args) {
			return [].slice.call(args).join('');
		}).join('\n');
	},
	start: function() {
		global.lines = [];
	},
	stop: function() {
		global.lines = null;
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
		game = new Game();
		capture.start();
	});

	afterEach(function() {
		capture.stop()
		game = null;
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

			console.log(capture.get());
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
