import { post } from "../api/apiClient.js";

const form = document.querySelector(".register__form");

const username = document.getElementById("username");
const usernameFeedback = document.getElementById("username-feedback");

const email = document.getElementById("email");
const emailFeedback = document.getElementById("email-feedback");

const password = document.getElementById("password");
const passwordFeedback = document.getElementById("password-feedback");

const confirmPassword = document.getElementById("confirm-password");
const confirmPasswordFeedback = document.getElementById(
  "confirm-password-feedback",
);

const validateInputs = () => {
  usernameFeedback.innerText = "";
  usernameFeedback.classList.remove("txt--error");
  username.classList.remove("has-error");

  emailFeedback.innerText = "";
  emailFeedback.classList.remove("txt--error");
  email.classList.remove("has-error");

  passwordFeedback.innerText = "";
  passwordFeedback.classList.remove("txt--error");
  password.classList.remove("has-error");

  confirmPasswordFeedback.innerText = "";
  confirmPasswordFeedback.classList.remove("txt--error");
  confirmPassword.classList.remove("has-error");

  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  let isValid = true;

  if (usernameValue === "") {
    usernameFeedback.innerText = "Skriv inn et brukernavn.";
    usernameFeedback.classList.add("txt--error");
    username.classList.add("has-error");

    isValid = false;
  }

  if (usernameValue !== "" && usernameValue.length < 3) {
    usernameFeedback.innerText = "Minst 3 tegn.";
    usernameFeedback.classList.add("txt--error");
    username.classList.add("has-error");

    isValid = false;
  }

  if (usernameValue.includes(" ")) {
    usernameFeedback.innerText = "Kan ikke inneholde mellomrom.";
    usernameFeedback.classList.add("txt--error");
    username.classList.add("has-error");

    isValid = false;
  }

  if (usernameValue.length > 20) {
    usernameFeedback.innerText = "Maks 20 tegn.";
    usernameFeedback.classList.add("txt--error");
    username.classList.add("has-error");

    isValid = false;
  }

  if (emailValue === "") {
    emailFeedback.innerText = "Skriv inn e-post.";
    emailFeedback.classList.add("txt--error");
    email.classList.add("has-error");

    isValid = false;
  }

  if (emailValue !== "" && !emailValue.endsWith("@stud.noroff.no")) {
    emailFeedback.innerText = "E-post må slutte på @stud.noroff.no.";
    emailFeedback.classList.add("txt--error");
    email.classList.add("has-error");

    isValid = false;
  }

  if (passwordValue === "") {
    passwordFeedback.innerText = "Skriv inn passord.";
    passwordFeedback.classList.add("txt--error");
    password.classList.add("has-error");

    isValid = false;
  }

  if (passwordValue !== "" && passwordValue.length < 8) {
    passwordFeedback.innerText = "Minst 8 tegn.";
    passwordFeedback.classList.add("txt--error");
    password.classList.add("has-error");

    isValid = false;
  }

  if (confirmPasswordValue === "") {
    confirmPasswordFeedback.innerText = "Gjenta passordet.";
    confirmPasswordFeedback.classList.add("txt--error");
    confirmPassword.classList.add("has-error");

    isValid = false;
  }

  if (confirmPasswordValue !== "" && passwordValue !== confirmPasswordValue) {
    confirmPasswordFeedback.innerText = "Passordene må være like.";
    confirmPasswordFeedback.classList.add("txt--error");
    confirmPassword.classList.add("has-error");
    password.classList.add("has-error");

    isValid = false;
  }

  return isValid;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const isValid = validateInputs();

  if (!isValid) return;

  try {
    const registerData = {
      name: username.value.trim(),
      email: email.value.trim(),
      password: password.value.trim(),
    };

    console.log("Register data:", registerData);

    await post("/auth/register", registerData);

    window.location.href = "/account/login.html?registered=true";
  } catch (error) {
    let message = "Noe gikk galt. Prøv igjen.";

    if (error.message.toLowerCase().includes("email")) {
      message = "E-post er allerede i bruk.";
    }

    if (error.message.toLowerCase().includes("profile")) {
      message = "Brukernavnet er allerede tatt.";
    }

    confirmPasswordFeedback.innerText = message;
    confirmPasswordFeedback.classList.add("txt--error");
  }
});
