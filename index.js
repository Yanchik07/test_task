import * as readline from 'node:readline/promises';
import {stdin as input, stdout as output} from 'node:process';

const rl = readline.createInterface({input, output});

const game = {
    deck: createDeck(),
    players: []
}

function createDeck() {
    let suits = ['R', 'G', 'B', 'W'];
    let rank = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    let deck = []

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < rank.length; j++) {
            deck.push({suit: suits[i], rank: rank[j]})
        }
    }

    return deck;
}

function shuffleDeck(arr) {
    var j, temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

function drawCards(n, c) {
    let cardsLeft = 0 < n * c < 40 ? n * c : false;

    for (let i = 0; i < c; i++) {
        game.players.push({id: i + 1, deck: []})
    }

    game.deck = shuffleDeck(game.deck);

    if (cardsLeft) {
        let cardsCounter = 0;
        while (cardsCounter < cardsLeft) {
            for (let playerIndex = 0; playerIndex < c; playerIndex++) {
                game.players[playerIndex].deck.push(game.deck[cardsCounter])
                cardsCounter++;
            }
        }
    } else {
        console.log("Wrong args")
    }

}

rl.prompt();

rl.on('line', function (line) {
    switch (line.trim().split(' ')[0]) {
        case 'start':
            if (line.split(' ').length <= 3) {
                if (game.players.length) {
                    game.deck = createDeck();
                    game.players = []
                    drawCards(line.split(' ')[1], line.split(' ')[2]);
                } else {
                    drawCards(line.split(' ')[1], line.split(' ')[2]);
                }
            } else {
                console.log("Should be like 'start N C'")
            }
            break;
        case 'get-cards':
            if (line.split(' ').length <= 2 && line.split(' ')[1] <= game.players.length && line.split(' ')[1] !== '0') {
                let result = `${line.split(' ')[1]}`;
                game.players[line.split(' ')[1] - 1].deck.forEach(item => {
                    result = `${result} ${item.suit}${item.rank}`
                })
                console.log(result)
            } else {
                console.log("Wrong command")
            }
            break;
        default:
            console.log('Wrong command');
            break;
    }
    rl.prompt();
}).on('close', function () {
    process.exit(0);
});