//* Змінні
type ComplexType = string | number;
function combine(a: ComplexType, b: ComplexType) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

//* Objects: in дозволяє перевірити чи є поле в об'єкті
type AdminObj = {
  name: string;
  privileges: string[];
};
type EmployeeObj = {
  name: string;
  startDate: Date;
};

type UnknownObject = Employee | Admin;
function showFields(e1: UnknownObject) {
  console.log(e1.name);
  if ('privileges' in e1) {
    console.log(e1.privileges);
  }
  if ('startDate' in e1) {
    console.log(e1.startDate);
  }
}

//* Classes: instanceof дозволяє перевірити, до якого класу належить об'єкт.
class Car {
  drive() {
    console.log('Driving...');
  }
}
class Truck {
  drive() {
    console.log('Driving a truck...');
  }
  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;
const v1 = new Car();
const v2 = new Truck();
function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}
