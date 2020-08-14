const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.newUserSignedUp = functions.auth.user().onCreate((user) => {
  // For background triggers you must return a promise/value
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    upvotedOn: [],
  });
});

exports.userDeleted = functions.auth.user().onDelete((user) => {
  // For background triggers you must return a promise/value
  return admin.firestore().collection("users").doc(user.uid).delete();
});

exports.addRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated user can add requests."
    );
  }

  if (data.text.length > 30) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "Request must be no more than 30 characters."
    );
  }

  return admin
    .firestore()
    .collection("requests")
    .add({
      text: data.text,
      upvotes: 0,
    })
    .then((docRef) => {
      return {
        id: docRef.id,
      };
    });
});

exports.upvote = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "Only authenticated user can upvote requests."
    );
  }

  const user = admin.firestore().collection("users").doc(context.auth.uid);
  const request = admin.firestore().collection("requests").doc(data.id);

  return user
    .get()
    .then((doc) => {
      if (doc.data().upvotedOn.includes(data.id)) {
        throw new functions.https.HttpsError(
          "failed-precondition",
          "You can only upvote request once."
        );
      }

      return user.update({
        upvotedOn: [...doc.data().upvotedOn, data.id],
      });
    })
    .then(() => {
      return request.update({
        upvotes: admin.firestore.FieldValue.increment(1),
      });
    });
});
