import{i as p,S as f}from"./assets/vendor-46aac873.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function d(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=d(t);fetch(t.href,o)}})();document.addEventListener("DOMContentLoaded",function(){const r=document.getElementById("container-loader");o(r);const n=document.getElementById("formSearching"),d=document.getElementById("inputSearch"),i=document.getElementById("gallery"),t="42167626-5dd4d1124df4d491f669cdb42";n.addEventListener("submit",function(s){s.preventDefault(),l(r);const m=d.value.trim();if(!m){p.error({title:"Error",message:"The field is not allowed to be empty ",position:"topRight"}),o(r);return}const e="https://pixabay.com/api/",a={key:t,q:m,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:9};fetch(`${e}?${new URLSearchParams(a)}`).then(c=>c.json()).then(c=>{if(c.hits.length===0){p.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}u(c.hits)}).catch(()=>{p.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>{o(r)})});function o(s){s&&(s.style.display="none")}function l(s){s&&(s.style.display="block")}function u(s){i.innerHTML="",s.forEach(e=>{const a=document.createElement("div");a.className="gallery-item",a.innerHTML=`
      <a href="${e.largeImageURL}" data-lightbox="gallery" data-title="Likes: ${e.likes}, Views: ${e.views}, Comments: ${e.comments}, Downloads: ${e.downloads}">
          <img src="${e.webformatURL}" alt="${e.tags}" data-src="${e.largeImageURL}" data-caption="Likes: ${e.likes}, Views: ${e.views}, Comments: ${e.comments}, Downloads: ${e.downloads}">
        </a>
        <div class="image-block">
      <div class="block-item">
        <p class="block-label">Likes:</p>
        <p class="block-value">${e.likes}</p>
      </div>
      <div class="block-item">
        <p class="block-item">Views:</p>
        <p class="block-item">${e.views}</p>
      </div>
      <div class="block-item">
        <p class="block-item">Comments:</p>
        <p class="block-item">${e.comments}</p>
      </div>
      <div class="block-item">
        <p class="block-item">Downloads:</p>
        <p class="block-item">${e.downloads}</p>
      </div>
    </div>
      `,i.appendChild(a)}),new f(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}});
//# sourceMappingURL=commonHelpers.js.map
