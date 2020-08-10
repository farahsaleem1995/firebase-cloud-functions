const auth = firebase.auth();

export const signUp = (email, password, successCallback, errorCallback) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      successCallback(user);
    })
    .catch((err) => {
      errorCallback(err);
    });
};

export const signIn = (email, password, successCallback, errorCallback) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      successCallback(user);
    })
    .catch((err) => {
      errorCallback(err);
    });
};

export const signOut = (successCallback, errorCallback) => {
  auth
    .signOut()
    .then(() => {
      successCallback(user);
    })
    .catch((err) => {
      errorCallback(err);
    });
};

export const authListener = (signedInClaback, signedOutClaback) => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      signedInClaback(user);
    } else {
      signedOutClaback();
    }
  });
};
