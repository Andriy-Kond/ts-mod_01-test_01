function CheckEmail_02(target: any, nameMethod: string, position: number) {
  // Якщо у об'єкту немає методу з властивістю validation (вигаданий мною), то я додаю його туди
  if (!target[nameMethod].validation) {
    target[nameMethod].validation = {};
  }
  // Розширюємо об'єкт validation
  Object.assign(target[nameMethod].validation, {
    // ім'я об'єкту задаємо як позицію і задаємо на цю позицію ф-ю-обробник
    [position]: (value: string) => {
      // якщо передане у ф-ю значення має символ @, то це пошта
      if (value.includes('@')) {
        return value;
      }
      // інакше повертає помилку
      throw new Error('Not valid email');
    },
  });
}

// Але неможливо запустити декоратор у класі Person_05, бо декоратор-на-параметр просто зберіг якусь ф-ю у якусь позицію у своєму елементі
// Тому нам потрібен ще один декоратор, який буде запускати саму валідацію всередині методу:

// потрібен лише дескриптор. ф-я-декоратор-на-параметр Validation повертає також PropertyDescriptor
function Validation(_: any, _2: string, descriptor: PropertyDescriptor): PropertyDescriptor {
  const method = descriptor.value; // забираємо ф-ю

  return {
    configurable: true,
    enumerable: false,
    get() {
      return (...args: any[]) => {
        // якщо є валідатор, значить в ньому лежить якийсь checkEmail
        if (method.validation) {
          args.forEach((item, index) => {
            // Перевіряємо, чи є у валідаторі такий індекс
            if (method.validation[index]) {
              args[index] = method.validation[index](item);
            }
          });
        }
        return method.apply(this, args);
        // foo.call(obj, arg1, arg2, ...)
        // Метод call викличе функцію foo таким чином, що в this буде посилання на об'єкт obj, а також передасть аргументи arg1, arg2 тощо.
        // foo.call(obj, arg1, arg2, ...) // call передає як аргументи через кому
        // foo.apply(obj, [arg1, arg2, ...]) // apply передає як масив

        // Методи call і apply викликають функцію «на місці», тобто відразу. Але у випадку колбек-функцій, коли необхідно не одразу викликати функцію, а передати посилання на неї, причому з прив'язаним контекстом, використовується метод bind.
        // foo.bind(obj, arg1, arg2, ...)
        // Метод bind створює і повертає копію функції foo з прив'язаним контекстом obj і аргументами arg1, arg2 тощо. Утворюється копія функції, яку можна передати куди завгодно і викликати коли завгодно.
      };
    },
  };
}

class Person_05 {
  @Validation
  setEmail(@CheckEmail_02 email: string) {
    console.log(email);
  }
}

const person_05 = new Person_05();

person_05.setEmail('test@gmail.com'); // test@gmail.com
person_05.setEmail('testgmail.com'); // Error: Not valid email
//
