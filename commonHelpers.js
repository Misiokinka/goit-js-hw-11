import{i as d,S as f}from"./assets/vendor-46aac873.js";(function(){const l=document.createElement("link").relList;if(l&&l.supports&&l.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function p(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=p(t);fetch(t.href,o)}})();document.addEventListener("DOMContentLoaded",function(){const n=document.getElementById("container-loader");o(n);const l=document.getElementById("formSearching"),p=document.getElementById("inputSearch"),s=document.getElementById("gallery"),t="42167626-5dd4d1124df4d491f669cdb42";l.addEventListener("submit",function(r){r.preventDefault(),i(n);const c=p.value.trim();if(!c){d.error({title:"Error",message:"The field is not allowed to be empty ",position:"topRight"}),o(n);return}const u="https://pixabay.com/api/",e={key:t,q:c,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:9};fetch(`${u}?${new URLSearchParams(e)}`).then(a=>a.ok?a.json():(s.innerHTML="",d.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}))).then(a=>{if(a.hits.length===0){d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),s.innerHTML="";return}m(a.hits)}).catch(()=>{d.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"})}).finally(()=>{o(n)})});function o(r){r&&(r.style.display="none")}function i(r){r&&(r.style.display="block")}function m(r){const c=r.map(e=>`
        <div class="gallery-item">
      <a href="${e.largeImageURL}" data-lightbox="gallery" data-title="Likes: ${e.likes}, Views: ${e.views}, Comments: ${e.comments}, Downloads: ${e.downloads}">
          <img src="${e.webformatURL}" alt="${e.tags}" data-src="${e.largeImageURL}" data-caption="Likes: ${e.likes}, Views: ${e.views}, Comments: ${e.comments}, Downloads: ${e.downloads}">
        </a>
        <div class="image-block">
      <div class="block-item">
        <p class="block-label">Likes:</p>
        <p class="block-value">${e.likes}</p>
      </div>
      <div class="block-item">
        <p class="block-label">Views:</p>
        <p class="block-value">${e.views}</p>
      </div>
      <div class="block-item">
        <p class="block-label">Comments:</p>
        <p class="block-value">${e.comments}</p>
      </div>
      <div class="block-item">
        <p class="block-label">Downloads:</p>
        <p class="block-value">${e.downloads}</p>
      </div>
    </div>
    </div>
      `);s.innerHTML=c.join(""),new f(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}});
//# sourceMappingURL=commonHelpers.js.map
