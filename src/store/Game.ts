import { observable, computed } from 'mobx';

export type TicTacValue = 'X' | 'O' | null;

class GameStore {
  @observable moves : TicTacValue[] = [null, null, null, null, null, null, null, null, null];

  @computed get currentPlayer(): TicTacValue{
    const currentMovesDone = this.moves.filter(m => m !== null).length;
    return currentMovesDone % 2 === 0 ? 'X' : 'O';
  }

  set(index: number) {
    this.moves[index] = this.currentPlayer;
  }
}

export default GameStore;
