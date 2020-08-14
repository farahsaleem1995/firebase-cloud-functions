const functions = firebase.functions();
const requests = firebase.firestore().collection("requests");

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

export const requestListener = (callback) => {
  requests.orderBy("upvotes", "desc").onSnapshot((snapshot) => {
    let docs = [];
    snapshot.forEach((doc) => {
      docs.push({ id: doc.id, data: { ...doc.data() } });
    });

    callback(docs);
  });
};

export const upvote = (requestId, successCallback, errorCallback) => {
  const upvoteCloudFunction = functions.httpsCallable("upvote");

  upvoteCloudFunction({ id: requestId })
    .then(() => {
      successCallback();
    })
    .catch((err) => {
      errorCallback(err);
    });
};
