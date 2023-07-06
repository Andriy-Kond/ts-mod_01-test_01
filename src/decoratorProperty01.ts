// Декоратори властивостей

// Розширюємо конструктор
interface ValidatorConfig {
  [property: string]: {
    // Сюди зберігаю. Наприклад, name і потім які валідатори туди передаються
    [validationProp: string]: string[]; // ['required', 'positive']
  };
}

const registeredValidators: ValidatorConfig = {}; // в цю змінну будуть реєструватись валідатори

// Перший декоратор на властивість:
// function Required(target: any, propertyName: string | Symbol) {
//   console.log('Required');
//   console.log(target, propertyName);
// }
function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    // Кидаємо новий валідатор
    // але спочатку дістаємо вже існуючи властивості (якщо вони є)
    ...registeredValidators[target.constructor.name],
    [propName]: ['required'],
  };
}

// Другий декоратор на властивість:
// function PositiveNumber(target: any, propertyName: string | Symbol) {
//   console.log('PositiveNumber');
//   console.log(target, propertyName);
// }

function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive'],
  };
}

// Декоратори @Required і @PositiveNumber просто реєструють поля у конфігу registeredValidators.
// Але їх ще треба і провалідувати. Для цього пишемо ще одну ф-ю:
// приймає об'єкт (в моєму випадку це person_06)
function validate(obj: any) {
  // Треба дістати збережені валідатори конкретно для цього класу:
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  // чи є щось у objValidatorConfig?
  if (!objValidatorConfig) {
    // якщо нічого немає, то і валідувати немає чого, а значить валідація пройшла успішно
    return true;
  }
  // якщо ж є, то валідуємо
  let isValid = true;
  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          isValid = isValid && !!obj[prop]; // "!!" - перетворення на булеве знаачення
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Person_06 {
  @Required
  name: string;
  @PositiveNumber
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }
}

// Сама валідація:
const person_06 = new Person_06('Max', 45);
const person_07 = new Person_06('', -1);

if (!validate(person_07)) {
  console.log('Validation error!');
} else {
  console.log('Validation ok!');
}
//
