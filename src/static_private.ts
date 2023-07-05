//* Модифікатори доступу
// public - всі властивості та методи в js, можна викликати будь-де
// private - не можна викликати ззовні екземпляра, не наслідується
// protected - не можна викликати ззовні екземпляра, але наслідується

//* private
class A1 {
  private someProperty = 'str';
}
class B1 extends A1 {
  showProperty() {
    //! console.log(this.someProperty); // Property 'someProperty' is private and only accessible within class 'A'
  }
}

//* protected
class A2 {
  protected someProperty = 'str';
}
class B2 extends A2 {
  showProperty() {
    console.log(this.someProperty);
  }
}
// Тепер звернутись до someProperty напряму не можемо, а от викликати метод, що покаже цю змнну можемо:
const a = new A2();
const b = new B2();
//! a.someProperty; // Property 'someProperty' is protected and only accessible within class 'A2' and its subclasses.
//! b.someProperty; // Property 'someProperty' is protected and only accessible within class 'A2' and its subclasses.
b.showProperty();

//* static - метод, або змінна, до якої можна звернутись лише через ім'я класу: UseStatic.itStaticMethod();

//* Скорочення ініціалізації
// замість цього:
class House1 {
  private type: string;
  private street: string;

  constructor(type: string, n: string) {
    this.type = type;
    this.street = n;
  }
}
// Можна писати так:
class House2 {
  constructor(private type: string, private street: string) {}
}
