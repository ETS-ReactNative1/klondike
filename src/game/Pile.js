import {figures, suits} from './constants';

const order = [
    figures.NUMBER_2,
    figures.NUMBER_3,
    figures.NUMBER_4,
    figures.NUMBER_5,
    figures.NUMBER_6,
    figures.NUMBER_7,
    figures.NUMBER_8,
    figures.NUMBER_9,
    figures.NUMBER_10,
    figures.JACK,
    figures.QUEEN,
    figures.KING,
];

export default class Pile {
    constructor() {
        this.cards = [];
    }

    push(card) {
        this.cards.push(card);
    }

    pushCards(cards) {
        this.cards = [
            ...this.cards,
            ...cards,
        ];
    }

    revealLast() {
        if (this.cards.length > 0) {
            this.cards[this.cards.length - 1].reveal();
        }
    }

    getTopCard() {
        return this.getCard(1);
    }

    getCard(number) {
        return this.cards[this.cards.length - number];
    }

    toFoundation(foundation) {
        foundation.pushCard(this.cards.pop());
        this.revealLast();
    }

    toPile(target, number) {
        const cardsToPush = this.cards.slice(-number);
        this.cards = this.cards.slice(0, this.cards.length - number);
        target.pushCards(cardsToPush);
        this.revealLast();
    }

    canPush(card) {
        if (!this.hasCards() && card.figure === figures.KING) {
            return true;
        } else {
            console.log(card.getColor(), this.getTopCard().getColor());
            return card.getColor() !== this.getTopCard().getColor() && order.indexOf(card.figure) === order.indexOf(this.getTopCard().figure) - 1;
        }
    }

    hasCards() {
        return this.cards.length > 0;
    }
}
