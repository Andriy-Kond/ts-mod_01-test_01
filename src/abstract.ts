// Абстрактний клас - це той, що ніколи не створює екземпляри

abstract class Plane {
  protected pilotInCabin = false;

  public sitInPlane() {
    this.pilotInCabin = true;
  }

  public abstract startEngine(): boolean;
}

// З абстрактного класу не можна створити екземпляр
// class SomeClass = new Plane { ... } // Cannot create an instance of an abstract class

class Maize extends Plane {
  public startEngine() {
    // Запускаємо гвинти двигуна
    return true;
  }
}

class Boeing extends Plane {
  public startEngine() {
    // Розігріваємо реактивні турбіни
    return true;
  }
}
