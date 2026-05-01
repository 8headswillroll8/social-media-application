import { post } from "../api/apiClient.js";
import { initHeader } from "../ui/header.js";

const form = document.querySelector(".create__form");
const feedback = document.querySelector(".create__feedback");
const url = document.getElementById("url");
const urlFeedback = document.getElementById("url-feedback");
const caption = document.getElementById("caption");
const captionFeedback = document.getElementById("caption-feedback");
const preview = document.querySelector(".create__preview");
const previewImg = document.querySelector(".create__preview-img");

initHeader();

const validateInputs = () => {
  const urlValue = url.value.trim();
  const captionValue = caption.value.trim();

  urlFeedback.innerText = "";
  urlFeedback.classList.remove("txt--error");
  url.classList.remove("has-error");

  captionFeedback.innerText = "";
  captionFeedback.classList.remove("txt--error");
  caption.classList.remove("has-error");

  let isValid = true;

  if (urlValue === "") {
    urlFeedback.innerText = "Dette feltet kan ikke være tomt.";
    urlFeedback.classList.add("txt--error");
    url.classList.add("has-error");

    isValid = false;
  }

  if (captionValue === "") {
    captionFeedback.innerText = "Dette feltet kan ikke være tomt.";
    captionFeedback.classList.add("txt--error");
    caption.classList.add("has-error");

    isValid = false;
  }

  if (captionValue.length > 200) {
    captionFeedback.innerText = "Dette feltet kan har maks 200 tegn";
    captionFeedback.classList.add("txt--error");
    caption.classList.add("has-error");

    isValid = false;
  }

  return isValid;
};

url.addEventListener("input", (e) => {
  const urlValue = url.value.trim();

  if (urlValue) {
    previewImg.src = urlValue;
    preview.classList.remove("visually-hidden");
  } else {
    preview.classList.add("visually-hidden");
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const isValid = validateInputs();

  if (!isValid) return;

  const postData = {
    title: caption.value.trim(),
    media: {
      url: url.value.trim(),
      alt: "",
    },
  };

  try {
    await post("/social/posts", postData);

    window.location.href = "../pages/posts.html";
  } catch (error) {
    feedback.innerHTML = `<p class="txt--help">Kunne ikke publisere innlegget. Prøv igjen</p>`;
  }
});
