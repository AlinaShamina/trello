import Card from "./card";

export default class Column {
  constructor(title, cards, board) {
    this.title = title;
    this.cards = cards;
    this.board = board;

    this.container = document.createElement('div');
    this.container.classList.add('column');

    this.titleEl = document.createElement('div');
    this.titleEl.classList.add('column-title');
    this.titleEl.textContent = this.title;

    this.cardsContainer = document.createElement('div');

    this.addBtn = document.createElement('div');
    this.addBtn.classList.add('add-card');
    this.addBtn.textContent = '+ Add another card';

    this.addBtn.addEventListener('click', () => this.addCard());

    this.container.append(this.titleEl, this.cardsContainer, this.addBtn);

    this.loadCards();
  }

  loadCards() {
    this.cardsContainer.innerHTML = '';

    this.cards.forEach(text => {
      const card = new Card(text, this);
      this.cardsContainer.append(card.el);
    });
  }

  addCard() {
    const text = prompt('Введите текст карточки:');
    if (!text) return;

    this.cards.push(text);
    this.board.save();
    this.loadCards();
  }

  removeCard(text) {
    this.cards = this.cards.filter(t => t !== text);
    this.board.columnsData[this.title.toLowerCase().replace(' ', '')] = this.cards;
    this.board.save();
  }

  insertCard(text, index) {
    this.cards.splice(index, 0, text);
    this.board.columnsData[this.title.toLowerCase().replace(' ', '')] = this.cards;
    this.board.save();
  }
}
