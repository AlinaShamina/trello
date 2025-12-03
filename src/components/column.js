export default class Column {
  constructor(title, cards, board) {
    this.title = title;
    this.cards = cards;
    this.board = board;
    this.container = document.createElement('div');
    this.container.className = 'column';
    this.render();
  }

  render() {
    this.container.innerHTML = '';

    const colTitle = document.createElement('div');
    colTitle.className = 'column-title';
    colTitle.textContent = this.title;
    this.container.appendChild(colTitle);

    this.cards.forEach((text, index) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.textContent = text;

      const deleteBtn = document.createElement('span');
      deleteBtn.className = 'delete-card';
      deleteBtn.textContent = '🗑️';
      deleteBtn.addEventListener('click', () => this.deleteCard(index));
      card.appendChild(deleteBtn);

      this.container.appendChild(card);
    });

    const addBtn = document.createElement('div');
    addBtn.className = 'add-card';
    addBtn.textContent = 'Add another card';
    addBtn.addEventListener('click', () => this.addCard());
    this.container.appendChild(addBtn);
  }

  addCard() {
    const text = prompt('Введите текст карточки');
    if (!text) return;

    this.cards.push(text);
    this.updateBoard();
    this.render();
  }

  deleteCard(index) {
    this.cards.splice(index, 1);
    this.updateBoard();
    this.render();
  }

  updateBoard() {
    if (this.title === 'TODO') this.board.columnsData.todo = this.cards;
    if (this.title === 'IN PROGRESS') this.board.columnsData.inprogress = this.cards;
    if (this.title === 'DONE') this.board.columnsData.done = this.cards;
    this.board.save();
  }
}
