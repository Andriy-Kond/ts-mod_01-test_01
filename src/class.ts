// ================ CLASS ==============
// Клас - це синтаксичний цукор. По суті це ф-я.

class House {
  street: string;

  // У прототипі будь-якої ф-ції завжди є конструктор.
  constructor(n: string) {
    this.street = n;
  }

  // отримання вулиці
  showAddress(): void {
    console.log('Address: ' + this.street);
  }
}

// Створюємо екземпляр класу (об'єкт) і передаємо туди назву вулиці:
const house = new House('Middle-earth'); // new - це також синтаксичний цукор. new - це звертання до конструктору
house.showAddress();
