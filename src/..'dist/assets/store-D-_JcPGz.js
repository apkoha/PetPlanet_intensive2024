import"./index-OwB28gDV.js";const d="https://cooked-mirage-crayon.glitch.me",S=document.querySelectorAll(".store__category-button"),_=document.querySelector(".store__list"),f=document.querySelector(".store__cart-button"),C=f.querySelector(".store__cart-cnt"),a=document.querySelector(".modal-overlay"),n=document.querySelector(".modal__cart-items");document.querySelector(".modal-overlay_close-button");const h=document.querySelector(".modal__cart-form"),L=document.querySelector(".modal__cart-price"),l=document.createElement("div");l.classList.add("order-message");const y=document.createElement("p");y.classList.add("order-message__text");const i=document.createElement("button");i.classList.add("order-message__close-button");i.textContent="Закрыть";l.append(y,i);i.addEventListener("click",()=>{l.remove()});const E=t=>{const e=document.createElement("li");return e.classList.add("store__item"),e.innerHTML=`
    <article class="store__product product">
       <img class="product__image" src="${d}${t.photoUrl}" alt="${t.name}" width="388" height="261"/>
     <h3 class="product__title">${t.name}</h3>
     <p class="product__price">${t.price}&nbsp;₽</p>
     <button class="product__btn-add-cart" data-id=${t.id}>Заказать</button>
    </article>`,e},x=t=>{_.textContent="",t.forEach(e=>{const o=E(e);_.append(o)})},I=async t=>{try{const e=await fetch(`${d}/api/products/category/${t}`);if(!e.ok)throw new Error(e.status);const o=await e.json();x(o)}catch(e){console.error(`Ошибка запроса товаров: ${e}`)}};I("Домики");const w=async t=>{try{const e=await fetch(`${d}/api/products/list/${t.join(",")}`);if(!e.ok)throw new Error(e.status);return await e.json()}catch{return console.error("Ошибка запроса товаров для корзины: ${error}"),[]}},O=({target:t})=>{const e=t.textContent;S.forEach(o=>{o.classList.remove("store__category-button_active")}),t.classList.add("store__category-button_active"),I(e)};S.forEach(t=>{t.addEventListener("click",O),t.classList.contains("store__category-button_active")&&I(t.textContent)});const J=(t,e)=>t.reduce((o,c)=>{const s=e.find(r=>r.id===c.id);return o+s.price*c.count},0),$=async()=>{n.textContent="";const t=JSON.parse(localStorage.getItem("cartItems")||"[]"),e=JSON.parse(localStorage.getItem("cartProductDetails")||"[]");e.forEach(({id:c,photoUrl:s,name:r,price:b})=>{const u=t.find(v=>v.id===c);if(!u)return;const p=document.createElement("li");p.classList.add("modal__cart-item"),p.innerHTML=`
      <img class="modal__cart-item-image" src="${d}${s}" alt="${r}" />

        <h3 class="modal__cart-item-title">${r}</h3>

        <div class="modal__cart-item-count">
          <button class="modal__btn modal__minus" data-id=${c}>-</button>
          <span class="modal__count">${u.count}</span>
          <button class="modal__btn modal__plus" data-id=${c}>+</button>
        </div>

      <p class="modal__cart-item-price">${b*u.count}</p>
    `,n.append(p)});const o=J(t,e);L.innerHTML=`${o}&nbsp;₽`};f.addEventListener("click",async()=>{a.style.display="flex";const e=JSON.parse(localStorage.getItem("cartItems")||"[]").map(c=>c.id);if(!e.length){n.textContent="";const c=document.createElement("li");c.textContent="Корзина пуста",n.append(c);return}const o=await w(e);localStorage.setItem("cartProductDetails",JSON.stringify(o)),$()});a.addEventListener("click",({target:t})=>{(t===a||t.closest(".modal-overlay_close-button"))&&(a.style.display="none")});const m=()=>{const t=JSON.parse(localStorage.getItem("cartItems")||"[]");C.textContent=t.length};m();const N=t=>{const e=JSON.parse(localStorage.getItem("cartItems")||"[]"),o=e.find(c=>c.id===t);o?o.count+=1:e.push({id:t,count:1}),localStorage.setItem("cartItems",JSON.stringify(e)),m()};_.addEventListener("click",({target:t})=>{const e=t.dataset.id;N(e)});const g=(t,e)=>{const o=JSON.parse(localStorage.getItem("cartItems")||"[]"),c=o.findIndex(s=>s.id===t);c!==-1&&(o[c].count+=e,o[c].count<=0&&o.splice(c,1),localStorage.setItem("cartItems",JSON.stringify(o)),m(),$())};n.addEventListener("click",({target:t})=>{if(t.classList.contains("modal__plus")){const e=t.dataset.id;g(e,1)}if(t.classList.contains("modal__minus")){const e=t.dataset.id;g(e,-1)}});const P=async t=>{t.preventDefault();const e=h.store.value,c=JSON.parse(localStorage.getItem("cartItems")||"[]").map(({id:s,count:r})=>({id:s,quantity:r}));try{const s=await fetch(`${d}/api/orders`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({storeId:e,products:c})});if(!s.ok)throw new Error(s.status);localStorage.removeItem("cartItems"),localStorage.removeItem("cartProductDetails");const{orderId:r}=await s.json();y.textContent=`Ваш заказ оформлен, номер ${r}. Вы можете забрать его завтра после 12:00`,document.body.append(l),a.style.display="none",m()}catch(s){console.error(`Ошибка оформления заказа: ${s}`)}};h.addEventListener("submit",P);
