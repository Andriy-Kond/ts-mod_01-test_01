// Інтерфейси об'єктів
interface IPerson {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user: IPerson;

user = {
  name: 'Anthony',
  age: 21,

  greet(phrase) {
    console.log(phrase + ' ' + this.name);
  },
};

user.greet('Усім привіт я');

// те саме через тип замість інтерфейсу (для об'єкту все одно):
type IPersonType = {
  name: string;
  age: number;

  greet2(phrase: string): void; // так теж працює
  greet: (phrase: string) => void; // опис ф-ції по іншому.
};

let userAsType: IPersonType;

userAsType = {
  name: 'Andriy',
  age: 21,

  greet(phrase) {
    console.log(phrase + ' ' + this.name);
  },

  greet2(phrase) {
    console.log(phrase + ' ' + this.name);
  },
};

userAsType.greet('Усім привіт, перше привітання. Я є ');
userAsType.greet2('Усім привіт я');
