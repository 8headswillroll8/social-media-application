import { post } from "../api/apiClient.js";
import { initHeader } from "../ui/header.js";

initHeader();

const form = document.querySelector(".login__form");

const email = document.getElementById("email");
const emailFeedback = document.getElementById("email-feedback");

const password = document.getElementById("password");
const passwordFeedback = document.getElementById("password-feedback");

const successMsg = document.getElementById("success-msg");

const params = new URLSearchParams(window.location.search);

if (params.get("registered") === "true") {
  successMsg.innerText = "Konto opprettet. Logg inn.";
  successMsg.classList.add("txt--help");

  window.history.replaceState({}, "", window.location.pathname);
}

const validateInputs = () => {
  emailFeedback.innerText = "";
  emailFeedback.classList.remove("txt--error");
  email.classList.remove("has-error");

  passwordFeedback.innerText = "";
  passwordFeedback.classList.remove("txt--error");
  password.classList.remove("has-error");

  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();

  let isValid = true;

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

  return isValid;
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const isValid = validateInputs();

  if (!isValid) return;

  try {
    const loginData = {
      email: email.value.trim(),
      password: password.value.trim(),
    };

    const response = await post("/auth/login", loginData);

    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("name", response.data.name);

    window.location.href = "../index.html";
  } catch (error) {
    let message = "Noe gikk galt. Prøv igjen.";

    if (
      error.message.toLowerCase().includes("invalid") ||
      error.message.toLowerCase().includes("unauthorized")
    ) {
      message = "Feil e-post eller passord.";
    }

    passwordFeedback.innerText = message;
    passwordFeedback.classList.add("txt--error");
  }
});
