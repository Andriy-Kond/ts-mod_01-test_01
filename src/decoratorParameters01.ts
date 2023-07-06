//* Декоратори параметрів
function CheckEmail_01(target: any, name: string, position: number) {
  console.log('target', target);
  console.log('name', name);
  console.log('position', position); // комірка у масиві
}

class Person_03 {
  setEmail(@CheckEmail_01 email: string) {
    // position === 0
    console.log(email);
  }
}

class Person_04 {
  setEmail(_: number, @CheckEmail_01 email: string) {
    // position === 1
    console.log(email);
  }
}
//
