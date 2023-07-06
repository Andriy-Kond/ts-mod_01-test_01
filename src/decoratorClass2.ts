// interface IDecoration {
//   parent: string;
//   template: string;
// }

// // Decorator
// function ControllerDecoration(config: IDecoration) {
//   // Повертає сам декоратор:
//   return function (constructor: any) {
//     // Можна на декораторі створювати екземпляр нашого об'єкту (контролеру), якщо це потрібно.
//     // Наприклад, нам треба додстати content з контролеру. Тоді треба створити об'єкт:
//     const current = new constructor();

//     const getParent = document.getElementById(config.parent)!; // дістаємо елемент
//     const createElement = document.createElement(config.template); // створюємо елемент

//     createElement.innerHTML = current.content; // тепер є елемент createElement з якимось контентом content з об'єкту

//     constructor.prototype.element = createElement;
//     constructor.prototype.parent = getParent;

//     getParent.appendChild(createElement); // додаємо елемент на сторінку
//   };
// }

// @ControllerDecoration({
//   parent: 'decorator2',
//   template: 'H1',
// })
// class Controller {
//   public content = 'My custom controller';
// }

//* Рекод на Generic
// Код вище не зручний. По-перше, щоби отримати доступ до content у class Controller довелось створювати екземпляр об'єкту у ControllerDecoration (const current = new constructor();)
// По-друге, Controller працює лише з параметрами @ControllerDecoration. Він створив їх один раз і більше їх не створює і ніяк не взаємодіє з елементами в середині декоратора
// Для того, щоб воно могло працювати з об'єктами треба зробити рекод.
// Сам декоратор може повертати новий/розширений клас

interface IDecoration {
  parent: string;
  template: string;
}

// Decorator

// Повертає сам декоратор:
function ControllerDecoration(config: IDecoration) {
  return function <T extends { new (...args: any[]): { content: string } }>(originalConstructor: T) {
    // повертаємо новий клас
    return class extends originalConstructor {
      private element: HTMLElement;
      private parent: HTMLElement;

      // Конструктор самого класу
      constructor(...arg: any[]) {
        super(...arg); // коли створюємо конструктор всі аргументи потрапляють сюди
        this.parent = document.getElementById(config.parent)!; // дістаємо елемент
        this.element = document.createElement(config.template); // створюємо елемент

        this.element.innerHTML = this.content; // тепер є елемент createElement з якимось контентом content з об'єкту

        this.parent.appendChild(this.element); // додаємо елемент на сторінку
      }
    };
  };
}

@ControllerDecoration({
  parent: 'decorator2',
  template: 'H2',
})
class Controller {
  public content = 'My custom controller';
}

const controllerDeco1 = new Controller();
const controllerDeco2 = new Controller();
const controllerDeco3 = new Controller();
