import './style.scss';
import Board from './components/board';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.getElementById('app');
  const board = new Board(app);
});
