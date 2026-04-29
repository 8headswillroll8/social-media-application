export function initHeader() {
  const logoutIcon = document.querySelector(".header__logout");
  if (!logoutIcon) return;

  const token = localStorage.getItem("accessToken");

  if (token) {
    logoutIcon.classList.add("is-visible");
  }

  logoutIcon.addEventListener("click", (e) => {
    if (!token) return;
    localStorage.removeItem("name", "accessToken");

    window.location.href = "../index.html";
  });
}
