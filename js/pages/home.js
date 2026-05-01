import { initHeader } from "../ui/header.js";

initHeader();

if (localStorage.getItem("accessToken")) {
  window.location.href = "./pages/posts.html";
}
