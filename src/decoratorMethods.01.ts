// // Декоратори методів

// // Оголошення декоратору
// function ShowMeParams(target: any, name: string, descriptor: PropertyDescriptor) {
//   // target - посилання на конструктор (посилання на class)
//   console.log('target>>>:', target);
//   // Метод showMessage() буде знаходиться у конструкторі (ShowMeParams - target):
//   // target>>>:
//   // {constructor: ƒ, showMessage: ƒ}
//   // constructor: class Notifier
//   // showMessage: ƒ showMessage()

//   console.log('name>>>:', name); // name>>>: showMessage - ім'я методу, який викликали

//   // descriptor - це native JS механізм, по якому працюють властивості. Наприклад, readonly не дозволяє властивості перезаписуватись
//   console.log('descriptor>>>:', descriptor); // descriptor>>>: {writable: true, enumerable: false, configurable: true, value: ƒ}
//   // У value зберігається ф-я showMessage()
// }

// class Notifier {
//   // Виклик декоратору
//   content = 'Message in class';
//   @ShowMeParams // спрацьовує лише раз при ініціалізації класу (не об'єкту-екземпляру класу, а саме класу)
//   showMessage() {
//     console.log('Notifier message');
//     console.log(this.content);
//   }
// }

// // Якщо винести ф-ю за межі класу, то вона втратить this
// const notifier = new Notifier();
// const showMeMyMessage = notifier.showMessage;

// notifier.showMessage(); // Notifier message
// showMeMyMessage(); //! Error: Cannot read properties of undefined (reading 'content')
