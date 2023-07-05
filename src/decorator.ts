// Декоратор класу приймає конструктор, а він є функцією:
function Logger01(constructor: Function) {
  console.log('Logger01 Decorator is logging...');
  console.log(constructor);
}

// Підключення декоратору до класу:
@Logger01
class Controller01 {
  public id = 1;
}
// У клас Controller прокидується конструктор самого класу.

// Через це у сам декоратор неможливо передати параметри. Але можна його огорнути у ф-ю і в неї передати значення параметрів.
function Logger02(logstring: string) {
  return function (constructor: Function) {
    // краще через звичайну ф-ю, не через стрілку, що би був правильний this
    console.log(logstring);
    console.log(constructor);
  };
}
// Але тоді і викликати його тре як ф-ю
@Logger02('Logger02 Decorator') //  тоді ф-я поверне декоратор
class Controller02 {
  public id = 1;
}

//* Підключення декількох декораторів
// Нові декоратори розширюють функціонал класу.
// Наприклад, можна модифікувати властивості. Для цього треба модифікувати prototype класу (через конструктор).
function AddProperty() {
  return function (constructor: Function) {
    console.log('Add-Property decorator');
    constructor.prototype.modifyProperty = true;
  };
}

@Logger02('Logger02 Decorator')
@AddProperty()
class Controller03 {
  public id = 1;
  // декоратор є, але щоби скористатись його функціоналом треба вказати, що є певне поле:
  // public modifyProperty?: boolean;
  public modifyProperty?: false; // декоратор не переписує значення, які додаються сюди
}

// Створюємо екземпляр класу
const controller = new Controller03();
console.log('Modified classes', controller.modifyProperty);
