import { observable, action } from 'mobx';
import { random } from 'lodash';

export class User {
  @observable name : string;
  @observable elo: number = 1500;

  constructor() {
    this.name = `Guest${random(0, 2000)}`;
  }
}

const SEED_DATA = [
  ['Henk', 2000],
  ['Bla', 1600],
  ['Random', 1000],
  ['Afk', 200],
]

export class UserStore {
  @observable users: User[] = [];

  createIfNotExists(targetUser: User) {
    const existingUser = this.users.find(user => user.name === targetUser.name);

    if (existingUser) {
      return existingUser;
    }

    this.users.push(targetUser);
    return targetUser;
  }

  @action seed() {
    SEED_DATA.forEach(datum => {
      const user = new User();
      user.name = datum[0] as string;
      user.elo = datum[1] as number;
      this.users.push(user);
    })
  }
}
