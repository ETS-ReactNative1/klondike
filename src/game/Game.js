import Pile from './Pile';
import Foundation from './Foundation';
import Waste from './Waste';

export default class Game {
    constructor(deck, observer) {
        this.deck = deck;
        this.waste = new Waste();
        this.foundations = this.constructor.buildFoundations();
        this.piles = this.constructor.buildPiles(deck);

        this.emitChange = observer(this);
        this.emitChange();
    }

    revealNew() {
        if (this.deck.hasCards()) {
            this.waste.fromDeck(this.deck);
        } else if (this.waste.hasCards()) {
            this.waste.toDeck(this.deck);
        }
        this.emitChange();
    }

    moveFromWasteToFoundation() {
        const card = this.waste.getTopCard();
        const foundation = this.findFoundationForCard(card);

        if (foundation.canPush(card)) {
            this.waste.toFoundation(foundation);
        }

        this.emitChange();
    }

    moveFromPileToFoundation(pile) {
        const card = pile.getTopCard();
        const foundation = this.findFoundationForCard(card);

        if (foundation.canPush(card)) {
            pile.toFoundation(foundation);
        }

        this.emitChange();
    }

    static buildFoundations() {
        return [
            new Foundation(),
            new Foundation(),
            new Foundation(),
            new Foundation(),
        ];
    }

    static buildPiles(deck) {
        const piles = [];

        for (let pile = 0; pile < 7; pile++) {
            const cards = new Pile();

            for (let i = 0; i < pile + 1; i++) {
                cards.push(deck.popCard());
            }

            cards.revealLast();

            piles.push(cards);
        }

        return piles;
    }

    findFoundationByColor(color) {
        return this.foundations.find(f => f.getColor() === color);
    }

    findEmptyFoundation() {
        return this.foundations.find(f => f.getColor() === null);
    }

    findFoundationForCard(card) {
        let foundation = this.findFoundationByColor(card.color);
        if (!foundation) {
            foundation = this.findEmptyFoundation();
        }
        return foundation;
    }
}
