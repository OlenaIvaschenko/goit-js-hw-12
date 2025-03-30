import{S,a as q,i as m}from"./assets/vendor-mj6yH6lW.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&i(l)}).observe(document,{childList:!0,subtree:!0});function o(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=o(e);fetch(e.href,t)}})();document.querySelector(".gallery");function f(s,r){const o=r.map(({webformatURL:i,largeImageURL:e,tags:t,likes:l,views:v,comments:L,downloads:b})=>`
      <li class="gallery-item">
        <a href="${e}" class="gallery-link">
          <img src="${i}" alt="${t}" class="gallery-image" />
        </a>
        <div class="info">
            <p><strong>Likes:</strong> ${l}</p>
            <p><strong>Views:</strong> ${v}</p>
            <p><strong>Comments:</strong> ${L}</p>
            <p><strong>Downloads:</strong> ${b}</p>
          </div>
      </li>`).join("");s.insertAdjacentHTML("beforeend",o),P.refresh()}const P=new S(".gallery a",{captionsData:"alt",captionDelay:250}),w="49441888-9a9fca759a65c9c8b8f6579f2",E="https://pixabay.com/api/";let H=15;async function p(s,r=1){try{const o=await q.get(E,{params:{key:w,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:H}}),{hits:i,totalHits:e}=o.data;return i.length===0?(m.warning({title:"No results!",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),{images:[],totalHits:0}):{images:i,totalHits:e}}catch(o){return console.error("Error:",o),{images:[],totalHits:0}}}const y={form:document.querySelector(".form"),input:document.querySelector('[name="search-text"]'),gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")};y.loadMoreBtn.classList.add("visually-hidden");let c=null,a=1,d=0;const M=15,{form:h,input:$,gallery:g,loader:u,loadMoreBtn:n}=y;h.addEventListener("submit",B);n.addEventListener("click",O);async function B(s){if(s.preventDefault(),a=1,d=0,g.innerHTML="",c=$.value.trim(),c===""){m.error({title:"Error:",message:"Please fill in the search field before submitting!",position:"topRight"});return}u.classList.add("visible"),n.classList.add("visually-hidden");try{const{images:r,totalHits:o}=await p(c,a);f(g,r),d=Math.ceil(o/M),d>a&&n.classList.remove("visually-hidden")}catch(r){console.error("Error:",r)}finally{u.classList.remove("visible"),h.reset()}}async function O(){a+=1;try{n.classList.add("visually-hidden"),u.classList.add("visible");const{images:s}=await p(c,a);f(g,s);const o=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:o*2,behavior:"smooth"}),a>=d?(n.classList.add("visually-hidden"),m.info({title:"",message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):n.classList.remove("visually-hidden")}catch(s){console.error("Error:",s)}finally{u.classList.remove("visible")}}
//# sourceMappingURL=index.js.map
