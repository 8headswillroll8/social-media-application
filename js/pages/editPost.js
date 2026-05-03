import { get, put } from "../api/apiClient.js";
import { initHeader } from "../ui/header.js";

initHeader();

const form = document.querySelector(".edit__form");
const feedback = document.querySelector(".edit__feedback");
const url = document.getElementById("url");
const caption = document.getElementById("caption");
const preview = document.querySelector(".edit__preview");
const previewImg = document.querySelector(".edit__preview-img");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const loadPost = async () => {
  const response = await get(`/social/posts/${id}`);

  url.value = response.data.media.url;
  caption.value = response.data.title;

  updatePreview();
};

function updatePreview() {
  const urlValue = url.value.trim();

  if (urlValue) {
    previewImg.src = urlValue;
    preview.classList.remove("is-hidden");
  } else {
    previewImg.removeAttribute("src");
    preview.classList.add("is-hidden");
  }
}

loadPost();

url.addEventListener("input", updatePreview);

// async function editPost() {
//   if (!id) {
//     feedback.innerHTML = `<p class="txt--help">Fant ikke innlegget.</p>`;
//     return;
//   }

//   const postData = {
//     title: caption.value.trim(),
//     media: {
//       url: url.value.trim(),
//       alt: "",
//     },
//   };
//   try {
//     const response = await put(`/social/posts/${id}`, postData);
//   } catch (error) {
//     feedback.innerHTML = `<p class="txt--help">Kunne ikke laste innlegg.</p>`;
//   }
// }

// editPost();

// function renderPost(post) {}
