import { initHeader } from "../ui/header.js";
import { get } from "../api/apiClient.js";

initHeader();

const feed = document.querySelector(".feed");
const tag = "flori";

async function getPosts() {
  try {
    const response = await get(`/social/posts?_author=true&_tag=${tag}`);

    const posts = response.data;

    renderPosts(posts);
  } catch (error) {
    console.error(error);
    feed.innerHTML = `<p class="txt--help">Kunne ikke laste innlegg.</p>`;
  }
}

function renderPosts(posts) {
  if (posts.length === 0) {
    feed.innerHTML = `<p class="txt--help">Ingen innlegg enda.</p>`;
    return;
  }

  const postCards = posts.map((post) => {
    return `
<article class="card">
<div class="card__header">
<img
class="card__avatar"
src="${post.author.avatar?.url || "../assets/images/users/user-default-avatar.webp"}"
alt="${post.author.avatar?.alt || post.author.name}"
/>
<div class="card__author">
<p class="card__username">${post.author.name}</p>
<time datetime="${post.created}">${post.created}</time>
</div>
<button class="btn-follow btn-outline" type="button">
Følger
</button>
</div>

<div class="post__like-anim">s
<img src="../assets/graphics/icons/icon-heart.svg" alt="" />
</div>

<a href="./post.html?id=${post.id}">
  <div class="card__content">
    <img src="${post.media?.url || "../assets/images/content/content-fallback.webp"}" alt="${post.media?.alt || ""}" />
  </div>
  </a>

  <div class="card__actions">
    <button class="post__like" type="button" aria-label="Lik innlegget">
      <img src="../assets/graphics/icons/icon-like.svg" alt="" />
      <span class="post__count">${post._count.reactions}</span>
    </button>
    <button
      class="post__comment"
      type="button"
      aria-label="Kommenter innlegget"
    >
      <img src="../assets/graphics/icons/icon-comment.svg" alt="" />
      <span class="post__count">${post._count.comments}</span>
    </button>
  </div>

  <div class="card__caption">
    <p>
      <span class="post__username">${post.author.name}</span> ${post.title}
    </p>
  </div>
</article>
`;
  });

  feed.innerHTML = postCards.join("");
}

getPosts();
