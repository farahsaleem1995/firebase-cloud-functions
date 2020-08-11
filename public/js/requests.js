const functions = firebase.functions();

export const addRequest = (requestData, successCallback, errorCallback) => {
  const addRequsetCloudFunction = functions.httpsCallable("addRequest");

  addRequsetCloudFunction(requestData)
    .then((res) => {
      successCallback(res.data);
    })
    .catch((err) => {
      errorCallback(err);
    });
};
