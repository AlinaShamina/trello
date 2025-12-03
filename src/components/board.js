import Column from './column';

export default class Board {
  constructor(root) {
    this.root = root;

    this.columnsData = JSON.parse(localStorage.getItem('trello-data')) || {
      todo: [],
      inprogress: [],
      done: []
    };

    this.render();
  }

  save() {
    localStorage.setItem('trello-data', JSON.stringify(this.columnsData));
  }

  render() {
    this.board = document.createElement('div');
    this.board.classList.add('board');
    this.root.appendChild(this.board);

    this.todo = new Column('TODO', this.columnsData.todo, this);
    this.inprogress = new Column('IN PROGRESS', this.columnsData.inprogress, this);
    this.done = new Column('DONE', this.columnsData.done, this);

    this.board.append(this.todo.container, this.inprogress.container, this.done.container);
  }
}
