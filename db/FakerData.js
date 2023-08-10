// before useing faker, need to run:  npm install @faker-js/faker --save-dev
//  see fakedata options here:   https://fakerjs.dev/api/
// may also need this next line (varies based on other packaging you may have)
//import { faker } from "@faker-js/faker";

const { faker } = require("@faker-js/faker");

module.exports = {
  createFakeUserObject,
  createFakeFixedUser,
  createFakeProductsObject,
};

const bookGenres = [
  "Action and Adventure",
  "Art and Photography",
  "Auotbiography and Memoir",
  "Biography",
  "Childrens",
  "Fantasy",
  "Food and Drink",
  "Graphic Novel",
  "Historical Fiction",
  "Horror",
  "Magical Realism",
  "Mystery",
  "Romance",
  "Science Fiction",
  "Short Story",
  "Thriller Suspense",
  "Young Adult",
];

const bookCats = ["Hardback", "Paperback", "Audio"];

function createFakeUserObject() {
  return {
    username: faker.person.firstName(),
    useremail: faker.internet.email(),
    password: "12345",
    isadmin: false,
  };
}

function createFakeFixedUser(pWhichUser) {
  const aryUsers = [
    {
      username: "baaji",
      useremail: "baaji@none.com",
      password: "12345",
      isadmin: false,
    },
    {
      username: "kaleb",
      useremail: "kaleb@none.com",
      password: "12345",
      isadmin: false,
    },
    {
      username: "karla",
      useremail: "karla@none.com",
      password: "12345",
      isadmin: false,
    },
    {
      username: "nash",
      useremail: "nash@none.com",
      password: "12345",
      isadmin: false,
    },
    {
      username: "savstew",
      useremail: "savstew@none.com",
      password: "12345",
      isadmin: false,
    },
  ];
  return aryUsers[pWhichUser];
}

function createFakeProductsObject() {
  return {
    title: faker.commerce.productName(),
    author: faker.person.firstName() + " " + faker.person.lastName(),
    price: faker.number.float({ min: 1, max: 85, precision: 0.01 }),
    category: faker.helpers.arrayElement(bookGenres),
    format: faker.helpers.arrayElement(bookCats),
    overview: faker.lorem.paragraph({ min: 1, max: 3 }),
    isactive: true,
    qtyavailable: faker.number.int({ min: 0, max: 55 }),
    imageurl: faker.image.urlPicsumPhotos({ width: 200, height: 300 }),
  };
}

//console.log("createFakeUserObject : ", createFakeUserObject());
