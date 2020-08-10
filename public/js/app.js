import { sayHello } from "./functions.js";
import { signUp, signIn, signOut, authListener } from "./auth.js";

const requestModal = document.querySelector(".new-request");
const requestLink = document.querySelector(".add-request");

const authSwitchLinks = document.querySelectorAll(".switch");
const authModals = document.querySelectorAll(".auth .modal");
const authWrapper = document.querySelector(".auth");

const signUpForm = document.querySelector(".register");
const signInForm = document.querySelector(".login");
const signOutBtn = document.querySelector(".sign-out");

const button = document.querySelector(".call");

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

button.addEventListener("click", (e) => {
  console.log("Loading...");
  sayHello({ name: "Yoshi" }, (resData) => {
    console.log(resData);
  });
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

authListener(
  (user) => {
    authWrapper.classList.remove("open");
    authModals.forEach((modal) => modal.classList.remove("active"));
  },
  () => {
    authWrapper.classList.add("open");
    authModals.forEach((modal) => modal.classList.add("active"));
  }
);
