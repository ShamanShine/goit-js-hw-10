import"./assets/styles-75d30127.js";import{i as o}from"./assets/vendor-77e16229.js";document.addEventListener("DOMContentLoaded",()=>{document.querySelector(".form").addEventListener("submit",function(s){s.preventDefault();const t=parseInt(this.querySelector('input[name="delay"]').value,10),i=this.querySelector('input[name="state"]:checked').value;new Promise((e,n)=>{setTimeout(()=>{i==="fulfilled"?e(t):n(t)},t)}).then(e=>{o.success({title:"Fulfilled promise",message:`✅ Fulfilled promise in ${e}ms`,position:"topCenter"})}).catch(e=>{o.error({title:"Rejected promise",message:`❌ Rejected promise in ${e}ms`,position:"topCenter"})})})});
//# sourceMappingURL=commonHelpers2.js.map
