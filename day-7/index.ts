/**
 * The solve function that takes the input.txt and returns the solutions
 * for part 1 and 2.
 *
 * @param {string} input - the input string
 * @returns {[number, number]} the solutions for each part
 */
export function solve(input: string): [number, number] {
  let part1 = input.split('\n').map(line => new Hand(line, true)).sort((a, b) => b.value - a.value);
  let part2 = input.split('\n').map(line => new Hand(line, false)).sort((a, b) => b.value - a.value);

  return [
    part1.reduce((acc, cHand, idx) => acc + cHand.bid * (part1.length - idx), 0),
    part2.reduce((acc, cHand, idx) => acc + cHand.bid * (part2.length - idx), 0),
  ];
};

enum HAND_TYPE {
  HIGH_CARD = 0,
  ONE_PAIR = 1000000000,
  TWO_PAIR = 2000000000,
  THREE_OF_A_KIND = 3000000000,
  FULL_HOUSE = 4000000000,
  FOUR_OF_A_KIND = 5000000000,
  FIVE_OF_A_KIND = 6000000000
}

const WILDCARD = 1;

class Card {
  value: number;

  constructor(type: string, isPart1: boolean) {
    if (type === 'A') this.value = 14;
    else if (type === 'K') this.value = 13;
    else if (type === 'Q') this.value = 12;
    else if (type === 'J') this.value = isPart1 ? 11 : WILDCARD;
    else if (type === 'T') this.value = 10;
    else this.value = Number(type);
  }
}

class Hand {
  bid: number;
  cardsAppearances: Record<number, number>;
  tieBreakers: Card[];
  type: HAND_TYPE;
  wildcardCount: number;

  constructor(line: string, isPart1: boolean) {
    let [cardStr, bid] = line.split(' ');
    let cards = cardStr.split('').map(card => new Card(card, isPart1));

    this.bid = Number(bid);
    this.cardsAppearances = {};
    this.tieBreakers = [];
    this.wildcardCount = 0;

    cards.forEach(card => {
      if (card.value === WILDCARD) {
        this.wildcardCount += 1;
      } else {
        this.cardsAppearances[card.value] = this.cardsAppearances[card.value] ? this.cardsAppearances[card.value] + 1 : 1;
      }
      this.tieBreakers.push(card);
    });

    let numOfCardAppearances = Object.values(this.cardsAppearances).sort((a, b) => b - a);

    if (numOfCardAppearances[0] + this.wildcardCount === 5) this.type = HAND_TYPE.FIVE_OF_A_KIND;
    else if (numOfCardAppearances[0] + this.wildcardCount === 4) this.type = HAND_TYPE.FOUR_OF_A_KIND;
    else if (numOfCardAppearances[0] + this.wildcardCount === 3 && numOfCardAppearances[1] === 2) this.type = HAND_TYPE.FULL_HOUSE;
    else if (numOfCardAppearances[0] + this.wildcardCount === 3 && numOfCardAppearances[1] !== 2) this.type = HAND_TYPE.THREE_OF_A_KIND;
    else if (numOfCardAppearances[0] + this.wildcardCount === 2 && numOfCardAppearances[1] === 2) this.type = HAND_TYPE.TWO_PAIR;
    else if (numOfCardAppearances[0] + this.wildcardCount === 2 && numOfCardAppearances[1] !== 2) this.type = HAND_TYPE.ONE_PAIR;
    else if (this.wildcardCount === 5) this.type = HAND_TYPE.FIVE_OF_A_KIND;
    else this.type = HAND_TYPE.HIGH_CARD;
  }

  get value(): number {
    return this.tieBreakers.reduce((acc, card, idx) => acc + card.value * Math.pow(20, 5 - idx), this.type);
  }
}
