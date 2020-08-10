const functions = require("firebase-functions");

exports.randomNumber = functions.https.onRequest((req, res) => {
  const number = Math.round(Math.random() * 100);
  console.log(number);
  res.send(number.toString());
});

exports.toTheDojo = functions.https.onRequest((req, res) => {
  res.redirect("https://www.thenetninja.co.uk");
});

exports.sayHello = functions.https.onCall((data, context) => {
  const name = data.name;
  return `Hello, ${name}`;
});
