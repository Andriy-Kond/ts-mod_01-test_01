//* Інтерфейси об'єктів
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
user.greet('Усім привіт я інтерфейс');

//* те саме через тип замість інтерфейсу (для об'єкту все одно):
type IPersonType = {
  name: string;
  age: number;
  greet(phrase: string): void; // так теж працює
  greet2: (phrase: string) => void; // опис ф-ції по іншому.
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
userAsType.greet('Усім привіт. Я тип ');
userAsType.greet2('Усім привіт я');

//* Інтерфейси класів

//* Інтерфейси як тип функції
// або так:
type AddFunc = (n1: number, n2: number) => number;
let addFn: AddFunc;
addFn = (n1: number, n2: number) => {
  return n1 + n2;
};
// або так:
interface AddFunc2 {
  (n1: number, n2: number): number;
}
let addFn2: AddFunc2;
addFn2 = (n1: number, n2: number) => {
  return n1 + n2;
};

//* Розширення інтерфейсу
interface IPerson {
  name: string;
  age: number;
  greet(phrase: string): void;
}
interface IPilot extends IPerson {
  flyMessage(): void;
}

//* Підключення інтерфейсів відбувається через команду implements
interface IPerson {
  name: string;
  age: number;

  greet(phrase: string): void;
}
interface IPilot {
  flyMessage(): void;
}
class Pilot implements IPerson, IPilot {
  constructor(public name: string, public age: number) {
    if (this.age < 28) {
      throw new Error('Pilot to young');
    }
  }
  greet(phrase: string): void {
    console.log(phrase + ' ' + this.name);
  }
  flyMessage(): void {
    console.log('Літак набрав висоту, всім приємного польоту!');
  }
}
const pilot = new Pilot('Anthony', 32);
pilot.greet('Вас вітає капітан корабля');
pilot.flyMessage();

//* Intersection Types
// типи та інтерфейси можна об'єднувати за допомогою extends
type Admin = {
  name: string;
  privileges: string[];
};
type Employee = {
  name: string;
  startDate: Date;
};
// але є і коротший запис
type ElevatedEmployee = Admin & Employee;

// Те саме з інтерфейсами:
interface Admin2 {
  name: string;
  privileges: string[];
}
interface Employee2 {
  name: string;
  startDate: Date;
}
type ElevatedEmployee2 = Admin & Employee;
// Але якщо тре те саме зберегти в інтерфейс, то скорочення з "&" не працює. Тому потрібно так:
interface IElevatedEmployee extends Employee2, Admin2 {}
