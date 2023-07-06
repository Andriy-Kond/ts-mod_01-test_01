let arrGeneric01: string[] | number[]; // буде або масив чисел, або масив рядків
// arrGeneric01 = ['string', 25]; // помилка

// можна написати так:
let arrGeneric02: (string | number)[];
// або так:
let arrGeneric03: Array<string | number> = [];

const promise01 = new Promise(resolve => {
  resolve('string');
});
promise01.then(data => {
  // TS не знає що це за тип: (parameter) data: unknown
});

// Тому треба одразу явно вказати тип, який поверне проміс:
const promise02: Promise<string> = new Promise(resolve => {
  setInterval(() => {
    resolve('Done!');
  }, 1000);
});

promise02.then(data => {
  console.log(data);
});

// ~ приклад в новому стилі з асинхронними ф-ями. Приклад самовикликаючої async-функції:
(async () => {
  async function promiseFoo() {
    return 'string';
  }
  // then можна робити прямо від самої ф-ції:
  promiseFoo().then(data => {}); // бачить, що ф-я повертає рядок, тому (parameter) data: string
})();

// Якщо ж вказати явно, що має повертати проміс, то data візьме саме цей тип:
(async () => {
  async function promiseFoo(): Promise<Number> {
    // return 'string'; Type 'string' is not assignable to type 'Number'.
    return 25;
  }
  promiseFoo().then(data => {}); // (parameter) data: Number
})();

//* об'єднання двох об'єктів.
function merge01(objA: object, objB: object) {
  return Object.assign(objA, objB); // записує objB у objA
}
function merge02(objA: object, objB: object) {
  return Object.assign({}, objA, objB); // створює новий об'єкт і записує в нього objB і objA
}
const merged02 = merge02({ name: 'Alisa' }, { age: 28 });
//! merged.name; // Property 'name' does not exist on type 'object'

// з використанням Generic:
function merge03<T, U>(objA: T, objB: U) {
  return Object.assign({}, objA, objB);
}
const merged03 = merge03({ name: 'Alisa' }, { age: 28 });
merged03.name;

// також можна уточнювати типи при визові функції (за допомогою додаткових типів):
type PersonType = {
  name: string;
};
type AdditionFieldsType = {
  age: number;
};
const merged04 = merge03<PersonType, AdditionFieldsType>({ name: 'Alisa' }, { age: 28 }); // ці типи підставляться замість T i U у функції при її оголошенні (function merge03<T, U>(objA: T, objB: U) {...})

//* Поширення Generic
// Можна вказувати, що передавати треба виключно об'єкти:
function merge05<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}
const merged05 = merge05({ name: 'Alisa' }, { age: 20 });
merged05.name;

// Цю особливість можна використовувати, коли треба бути впевненим, що у аргументу має бути якесь конкретне значення, чи метод.
interface ILength {
  length: number;
}
function getLength<T extends ILength>(str: T) {
  // Generic <T extends ILength> вказує що у "Т" точно є властивість length (це може бути масив, чи рядок)
  return str.length;
}
getLength('text'); // 4
getLength(['arr', 'arr2', 'arr3']); // 3

const objWithLengthVariable = { length: 10 };
getLength(objWithLengthVariable); // теж буде працювати - 10

//* keyof
// Потрібно для перевірки а чи є якийсь тип ключем в об'єкті.
function extractValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}
extractValue({ name: 'Sergei' }, 'name');

// * Generic Classes
// Ми можемо призначити дженерики на клас, це буває зручно, якщо ми хочемо ніби позначити тип, який пронизуватиме увесь клас.
class StoreClass<T> {
  private data: T[] = [];
  addItem(item: T): void {
    this.data.push(item);
  }
  getItems(): T[] {
    return this.data;
  }
}
// І тепер ми можемо контролювати, які типи можуть зберігатися у властивості data;
const store = new StoreClass<string>();
store.addItem('test');

// Або, наприклад, має бути складна структура: "name: string"
interface IPerson2 {
  name: string;
}
const storeUsers = new StoreClass<IPerson2>();
storeUsers.addItem({ name: 'Max' });
storeUsers.addItem({ name: 'Andriy' });
console.log(storeUsers.getItems()); // [{ name: 'Max' }, { name: 'Andriy' }]

// Або тип має бути Number:
const storeAge = new StoreClass<Number>();
storeAge.addItem(24);
storeAge.addItem(35);
console.log(storeUsers.getItems()); // [24, 35]
