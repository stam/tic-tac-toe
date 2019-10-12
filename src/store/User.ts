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
  @observable users: User[] = [];

  createIfNotExists(targetUser: User) {
    const existingUser = this.users.find(user => user.name === targetUser.name);

    if (existingUser) {
      return existingUser;
    }

    this.users.push(targetUser);
    return targetUser;
  }
}
