import { observable, action } from 'mobx';
import { random } from 'lodash';

export class User {
  @observable name : string;
  @observable elo: number = 1500;

  constructor(name?: string) {
    this.name = name || User.generateName();
  }

  static generateName() {
    return `Guest${random(0, 2000)}`;
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

  createIfNotExists(targetName: string) {
    const existingUser = this.users.find(user => user.name === targetName);

    if (existingUser) {
      return existingUser;
    }

    const newUser = new User(targetName);
    if (targetName) {
      newUser.name = targetName;
    }

    this.users.push(newUser);
    return newUser;
  }

  @action seed() {
    SEED_DATA.forEach(datum => {
      const user = new User();
      user.name = datum[0] as string;
      user.elo = datum[1] as number;
      this.users.push(user);
    })
  }

  // An ELO, like score
  // Which rewards points linked to the inverse probability of winning:
  // Unlikely win: much points
  // Likely win:   little points
  static updateElo(winningUser: User, losingUser: User) {
    const eloDifference = winningUser.elo - losingUser.elo;

    let targetEloChange = 1;
    if (eloDifference < -1500) {
      targetEloChange = 500;
    } else if (eloDifference < -1000) {
      targetEloChange = 400;
    } else if (eloDifference < -400) {
      targetEloChange = 200;
    } else if (eloDifference < -100) {
      targetEloChange = 100;
    } else if (eloDifference < 100) {
      targetEloChange = 50;
    } else if (eloDifference < 500) {
      targetEloChange = 25;
    } else if (eloDifference < 1500) {
      targetEloChange = 2;
    }

    winningUser.elo += targetEloChange;
    losingUser.elo -= targetEloChange;
  }
}
