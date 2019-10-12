import { observable, computed } from 'mobx';
import { User } from './User';

export type TicTacValue = 'X' | 'O' | null;

// 0 | 1 | 2
// 3 | 4 | 5
// 6 | 7 | 8
const WINNING_MOVES = [
  [0, 1, 2], // Horizontals
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // Verticals
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // Diagonals
  [2, 4, 6],
];

class GameStore {
  @observable started = false;
  @observable users: User[] = [];

  @observable moves : TicTacValue[] = [null, null, null, null, null, null, null, null, null];
  @observable startingPlayer : TicTacValue = 'X';

  @computed get currentPlayer(): TicTacValue{
    const currentMovesDone = this.moves.filter(m => m !== null).length;
    return currentMovesDone % 2 === 0 ? this.startingPlayer : this.nonStartingPlayer;
  }

  @computed get winningCells(): number[] | undefined {
    return WINNING_MOVES.find(cellIndexes => {
      const cellValues = cellIndexes.map(index => this.moves[index]).join('');
      return cellValues === 'XXX' || cellValues === 'OOO'
    })
  }

  @computed get isWon(): boolean {
    return this.winningCells !== undefined;
  }

  @computed get winningPlayer(): TicTacValue | undefined {
    if (!this.winningCells) {
      return undefined;
    }
    const firstWinningCellIndex = this.winningCells[0];
    return this.moves[firstWinningCellIndex];
  }

  get nonStartingPlayer() {
    return this.startingPlayer === 'X' ? 'O' : 'X';
  }

  set(index: number) {
    this.moves[index] = this.currentPlayer;
  }

  start = (a: User, b: User) => {
    this.started = true;
    this.users = [a, b];
  }

  reset = () => {
    this.moves = this.moves.map(v => null);
    this.startingPlayer = this.nonStartingPlayer;
  }
}

export default GameStore;
