import { signUp, signIn, signOut, authListener } from "./auth.js";
import { addRequest, requestListener, upvote } from "./requests.js";

const requestModal = document.querySelector(".new-request");
const requestLink = document.querySelector(".add-request");
const requestForm = document.querySelector(".new-request form");

const authSwitchLinks = document.querySelectorAll(".switch");
const authModals = document.querySelectorAll(".auth .modal");
const authWrapper = document.querySelector(".auth");

const signUpForm = document.querySelector(".register");
const signInForm = document.querySelector(".login");
const signOutBtn = document.querySelector(".sign-out");

var app = new Vue({
  el: "#app",
  data: {
    requests: [],
  },
  methods: {
    upvoteRequest(id) {
      upvote(
        id,
        () => console.log("Upvoted"),
        (err) => {
          console.log(err);
        }
      );
    },
  },
  mounted() {
    requestListener((docs) => {
      this.requests = docs;
    });
  },
});

// open request modal
requestLink.addEventListener("click", () => {
  requestModal.classList.add("open");
});

// close request modal
requestModal.addEventListener("click", (e) => {
  if (e.target.classList.contains("new-request")) {
    requestModal.classList.remove("open");
  }
});

// toggle auth modals
authSwitchLinks.forEach((link) => {
  link.addEventListener("click", () => {
    authModals.forEach((modal) => modal.classList.toggle("active"));
  });
});

signUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signUpForm.email.value;
  const password = signUpForm.password.value;
  signUp(
    email,
    password,
    (user) => {
      console.log(user);
      signUpForm.reset();
      signUpForm.querySelector(".error").textContent = "";
    },
    (err) => {
      signUpForm.querySelector(".error").textContent = err.message;
    }
  );
});

signInForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signInForm.email.value;
  const password = signInForm.password.value;
  signIn(
    email,
    password,
    (user) => {
      console.log(user);
      signInForm.reset();
      signInForm.querySelector(".error").textContent = "";
    },
    (err) => {
      signInForm.querySelector(".error").textContent = err.message;
    }
  );
});

signOutBtn.addEventListener("click", (e) => {
  signOut(
    () => {
      console.log("User signed out");
    },
    (err) => {
      console.log(err.message);
    }
  );
});

requestForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const requestTxt = requestForm["request"].value;
  addRequest(
    { text: requestTxt },
    (data) => {
      console.log(data);
      requestModal.classList.remove("open");
      requestForm.reset();
      requestForm.querySelector(".error").textContent = "";
    },
    (err) => {
      requestForm.querySelector(".error").textContent = err.message;
    }
  );
});

authListener(
  (user) => {
    authWrapper.classList.remove("open");
    authModals.forEach((modal) => modal.classList.remove("active"));
  },
  () => {
    authWrapper.classList.add("open");
    authModals[0].classList.add("active");
  }
);
