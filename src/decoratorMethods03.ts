//* Модифікація значень при поверненні з ф-ції

// Додаємо декоратор, який буде додавати податки до оплати pay() класу Payment
// Декоратора приймає відсоток taxPercent і повертає інший декоратор
function AddTax(taxPercent: number) {
  // використовую function, щоби вона мала this дескриптору
  return function (_: any, _2: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value as Function;

    return {
      configurable: true,
      enumerable: false,
      get() {
        return (...args: any[]) => {
          const result = method.apply(this, args); // прив'язую args до об'єкту this

          return result + (result / 100) * taxPercent;
        };
      },
    };
  };
}

// Клас робить оплати
class Payment {
  @AddTax(20) // передаємо 20%
  // Метод оплати приймає гроші, які є числом:
  pay(money: number): number {
    return money;
  }
}

const payment = new Payment();

console.log(
  'Amount with tax: ',
  payment.pay(100) // платимо 100 галактичних гривень
);
//
