import { fakerES as faker } from "@faker-js/faker"; // Importamos datos en ESpanol de faker (alias faker para que al llamarlo, represente a este paquete)

export const generateUsersMocks = (amount) => {
  const users = [];

  for (let i = 0; i < amount; i++) {
    const user = {
      fist_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      age: faker.number.int({ min: 18, max: 65 }),
    };

    users.push(user);
  }

  return users;
};