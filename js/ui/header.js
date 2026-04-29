export function initHeader() {
  const logoutIcon = document.querySelector(".header__logout");
  if (!logoutIcon) return;

  const token = localStorage.getItem("accessToken");

  if (token) {
    logoutIcon.classList.add("is-visible");
  }

  logoutIcon.addEventListener("click", (e) => {
    localStorage.removeItem("name", "accessToken");
    if (!token) return;

    localStorage.removeItem("accessToken");
    localStorage.removeItem("name");

    window.location.href = "../index.html";
  });
}
