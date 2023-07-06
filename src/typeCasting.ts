//* Type Casting
const input01 = <HTMLInputElement>document.getElementById('inputEmail');
input01.value = 'test@test.ts';

const input02 = document.getElementById('inputEmail') as HTMLInputElement;
input02.value = 'test@test.ts';

const input03 = document.getElementById('inputEmail');
if (input03) {
  (input03 as HTMLInputElement).value = 'test@test.ts';
}

//* Index Properties
interface Person_01 {
  name: string;
  [x: string]: string;
}
const userPerson: Person_01 = {
  name: 'Alex',
  gender: 'MAN',
  country: 'Ukraine',
};

interface Person_02 {
  name: string;
  age: number;
  [x: string]: string | number;
}
const userPerson_02: Person_02 = {
  age: 23,
  name: 'Alex',
  gender: 'MAN',
  country: 'Ukraine',
};
//
