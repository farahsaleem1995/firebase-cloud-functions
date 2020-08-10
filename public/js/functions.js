const functions = firebase.functions();

export const sayHello = (data, callback) => {
  const func = functions.httpsCallable("sayHello");
  func(data).then((result) => {
    callback(result.data);
  });
};
