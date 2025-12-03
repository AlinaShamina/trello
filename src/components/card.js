export default class Card {
  constructor(text, column) {
    this.text = text;
    this.column = column;

    this.el = document.createElement('div');
    this.el.classList.add('card');
    this.el.textContent = text;

    this.deleteBtn = document.createElement('div');
    this.deleteBtn.classList.add('delete-card');
    this.deleteBtn.textContent = '×';

    this.el.appendChild(this.deleteBtn);

    this.deleteBtn.addEventListener('click', () => {
      this.column.removeCard(this.text);
      this.el.remove();
    });

    this.el.draggable = true;

    this.el.addEventListener('dragstart', e => {
      e.dataTransfer.setData('text/plain', this.text);
      setTimeout(() => this.el.style.display = 'none', 0);
    });

    this.el.addEventListener('dragend', () => {
      this.el.style.display = 'block';
    });

    this.column.cardsContainer.addEventListener('dragover', e => {
      e.preventDefault();
    });

    this.column.cardsContainer.addEventListener('drop', e => {
      e.preventDefault();
      const text = e.dataTransfer.getData('text');

      this.column.board.todo.cards =
        this.column.board.todo.cards.filter(t => t !== text);
      this.column.board.inprogress.cards =
        this.column.board.inprogress.cards.filter(t => t !== text);
      this.column.board.done.cards =
        this.column.board.done.cards.filter(t => t !== text);

      const index = [...this.column.cardsContainer.children].indexOf(this.el);
      this.column.insertCard(text, index);

      this.column.board.save();
      location.reload();
    });
  }
}