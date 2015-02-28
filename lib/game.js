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

exports = typeof window !== "undefined" && window !== null ? window : global;
//var console={log:function(){if(global.lines) global.lines.push(arguments)}};
//global.lines=null;

var Logger = {
	log: function() {
		if(global.lines) {
			global.lines.push(arguments);
		}
	}
};

exports.Game = function (overrideLogger) {
	var logger = overrideLogger != null ? overrideLogger : Logger.log;
	var players = new Array();
	var places = new Array(6);
	var purses = new Array(6);
	var inPenaltyBox = new Array(6);

	var popQuestions = new Array();
	var scienceQuestions = new Array();
	var sportsQuestions = new Array();
	var rockQuestions = new Array();

	var currentPlayer = 0;
	var isGettingOutOfPenaltyBox = false;

	var didPlayerWin = function () {
		return !(purses[currentPlayer] == 6)
	};

	var currentCategory = function () {
		if (places[currentPlayer] == 0)
			return 'Pop';
		if (places[currentPlayer] == 4)
			return 'Pop';
		if (places[currentPlayer] == 8)
			return 'Pop';
		if (places[currentPlayer] == 1)
			return 'Science';
		if (places[currentPlayer] == 5)
			return 'Science';
		if (places[currentPlayer] == 9)
			return 'Science';
		if (places[currentPlayer] == 2)
			return 'Sports';
		if (places[currentPlayer] == 6)
			return 'Sports';
		if (places[currentPlayer] == 10)
			return 'Sports';
		return 'Rock';
	};

	this.createRockQuestion = function (index) {
		return "Rock Question " + index;
	};

	for (var i = 0; i < 50; i++) {
		popQuestions.push("Pop Question " + i);
		scienceQuestions.push("Science Question " + i);
		sportsQuestions.push("Sports Question " + i);
		rockQuestions.push(this.createRockQuestion(i));
	}

	this.isPlayable = function (howManyPlayers) {
		return howManyPlayers >= 2;
	};

	this.add = function (playerName) {
		players.push(playerName);
		places[this.howManyPlayers() - 1] = 0;
		purses[this.howManyPlayers() - 1] = 0;
		inPenaltyBox[this.howManyPlayers() - 1] = false;

		logger(playerName + " was added");
		logger("They are player number " + players.length);

		return true;
	};

	this.howManyPlayers = function () {
		return players.length;
	};


	var askQuestion = function () {
		if (currentCategory() == 'Pop')
			logger(popQuestions.shift());
		if (currentCategory() == 'Science')
			logger(scienceQuestions.shift());
		if (currentCategory() == 'Sports')
			logger(sportsQuestions.shift());
		if (currentCategory() == 'Rock')
			logger(rockQuestions.shift());
	};

	this.roll = function (roll) {
		logger(players[currentPlayer] + " is the current player");
		logger("They have rolled a " + roll);

		if (inPenaltyBox[currentPlayer]) {
			if (roll % 2 != 0) {
				isGettingOutOfPenaltyBox = true;

				logger(players[currentPlayer] + " is getting out of the penalty box");
				places[currentPlayer] = places[currentPlayer] + roll;
				if (places[currentPlayer] > 11) {
					places[currentPlayer] = places[currentPlayer] - 12;
				}

				logger(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
				logger("The category is " + currentCategory());
				askQuestion();
			} else {
				logger(players[currentPlayer] + " is not getting out of the penalty box");
				isGettingOutOfPenaltyBox = false;
			}
		} else {

			places[currentPlayer] = places[currentPlayer] + roll;
			if (places[currentPlayer] > 11) {
				places[currentPlayer] = places[currentPlayer] - 12;
			}

			logger(players[currentPlayer] + "'s new location is " + places[currentPlayer]);
			logger("The category is " + currentCategory());
			askQuestion();
		}
	};

	this.wasCorrectlyAnswered = function () {
		if (inPenaltyBox[currentPlayer]) {
			if (isGettingOutOfPenaltyBox) {
				logger('Answer was correct!!!!');
				purses[currentPlayer] += 1;
				logger(players[currentPlayer] + " now has " +
					purses[currentPlayer] + " Gold Coins.");

				var winner = didPlayerWin();
				currentPlayer += 1;
				if (currentPlayer == players.length)
					currentPlayer = 0;

				return winner;
			} else {
				currentPlayer += 1;
				if (currentPlayer == players.length)
					currentPlayer = 0;
				return true;
			}


		} else {

			logger("Answer was correct!!!!");

			purses[currentPlayer] += 1;
			logger(players[currentPlayer] + " now has " +
				purses[currentPlayer] + " Gold Coins.");

			var winner = didPlayerWin();

			currentPlayer += 1;
			if (currentPlayer == players.length)
				currentPlayer = 0;

			return winner;
		}
	};

	this.wrongAnswer = function () {
		logger('Question was incorrectly answered');
		logger(players[currentPlayer] + " was sent to the penalty box");
		inPenaltyBox[currentPlayer] = true;

		currentPlayer += 1;
		if (currentPlayer == players.length)
			currentPlayer = 0;
		return true;
	};
};

exports.GameRunner = function () {
	this.play = function (random) {
		var notAWinner = false;
		var game = new Game();

		game.add('Chet');
		game.add('Pat');
		game.add('Sue');

		do {

			game.roll(Math.floor(random * 6) + 1);

			if (Math.floor(Math.random() * 10) == 7) {
				notAWinner = game.wrongAnswer();
			} else {
				notAWinner = game.wasCorrectlyAnswered();
			}

		} while (notAWinner);
	}
};