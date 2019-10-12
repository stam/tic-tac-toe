import { observable, computed, reaction } from 'mobx';
import { User, UserStore } from './User';

export type TicTac = 'X' | 'O';
export type NullableTicTac = TicTac | null;

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

  @observable moves : NullableTicTac[] = [null, null, null, null, null, null, null, null, null];
  @observable startingPlayer : TicTac = 'X';

  constructor() {
    reaction(
      () => this.winningPlayer,
      (winningPlayer) => {
        if (winningPlayer === null) {
          return;
        }
        const winningUser = winningPlayer === 'X' ? this.users[0] : this.users[1];
        const losingUser = winningPlayer === 'X' ? this.users[1] : this.users[0];
        UserStore.updateElo(winningUser, losingUser);
      }
    )
  }

  @computed get currentPlayer(): TicTac {
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

  @computed get winningPlayer(): NullableTicTac {
    if (!this.winningCells) {
      return null;
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
    this.moves = this.moves.map(v => null);
    this.users = [a, b];
  }

  reset = () => {
    this.started = false;
    this.startingPlayer = this.nonStartingPlayer;
  }
}

export default GameStore;
