import { observable } from 'mobx';
import { random } from 'lodash';

export class User {
  @observable name : string;
  @observable elo: number = 1500;

  constructor() {
    this.name = `Guest${random(0, 2000)}`;
  }
}

export class UserStore {
  @observable players: User[] = [];
}
