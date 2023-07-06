// Декоратори методів

// Оголошення декоратору
function ShowMeParams02(target: any, name: string, descriptor: PropertyDescriptor) {
  // target - посилання на конструктор
  console.log('target>>>:', target);
  // Метод showMessage() буде знаходиться у конструкторі (ShowMeParams - target):
  // target>>>:
  // {constructor: ƒ, showMessage: ƒ}
  // constructor: class Notifier
  // showMessage: ƒ showMessage()

  console.log('name>>>:', name); // name>>>: showMessage - ім'я методу, який викликали

  // descriptor - це native JS механізм, по якому працюють властивості. Наприклад, readonly не дозволяє властивості перезаписуватись
  console.log('descriptor>>>:', descriptor); // descriptor>>>: {writable: true, enumerable: false, configurable: true, value: ƒ}
  // У value зберігається ф-я showMessage()
}

//* Використання декількох декораторів
// Нам потрібен лише дескриптор
function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value; // зберігаємо початкові методи (showMessage02())
  // Можна вказувати, що це функція, а можна і не вказувати:
  // const method = descriptor.value as Function

  // Повертаю дескриптор
  return {
    configurable: true,
    enumerable: false,
    get() {
      return method.bind(this); // this посилається на дескриптор. При ініціалізації там буде undefined. Тому за допомогою bind прив'язую контекст this до method
      // Тобто коли ми дістаємо ф-ю у showMeMyMessage02, буде спрацьовувати метод get()
    },
  };
}

class Notifier {
  content = 'Message in class';

  // Виклик декораторів
  @ShowMeParams02 // спрацьовує лише раз при ініціалізації класу (не об'єкту-екземпляру класу, а саме класу)
  @AutoBind // додаємо новий декоратор, який повертає новий конструктор
  showMessage02() {
    console.log('Notifier message');
    console.log(this.content);
  }
}

// Якщо винести ф-ю за межі класу, то вона втратить this
const notifier = new Notifier();
const showMeMyMessage02 = notifier.showMessage02;

notifier.showMessage02(); // Notifier message
showMeMyMessage02(); //! Error: Cannot read properties of undefined (reading 'content')
//
