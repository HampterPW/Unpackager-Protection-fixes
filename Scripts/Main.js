var JSZip=new JSZip;const findFileInZip=(t,e)=>e.file(t)||e.file(new RegExp("^([^/]*/)?"+t+"$"))[0];async function Obf(t="",e){try{const n=(new DOMParser).parseFromString(t,"text/html");if(null!=n.querySelector('data[data-t="_"]'))return console.log("Already protected"),n.documentElement.outerHTML;const r=n.getElementsByTagName("script"),o=function(){for(let t of r)if(1==t.hasAttribute("type"))return t.getAttribute("type")}();if(!o)throw new Error("Failed to find project Id");console.log(o);const a=t=>{const e=t=>(40===t&&(t=60),41===t&&(t=62),t-42),n=t.indexOf(","),r=+t.substring(0,n).split("").map((t=>String.fromCharCode(t.charCodeAt(0)-49))).join(""),o=new ArrayBuffer((a=r)%4==0?a:a+(4-a%4));var a;const c=new Uint32Array(o);for(let r=n+1,o=0;r<t.length;r+=5,o++)c[o]=85*e(t.charCodeAt(r+4))*85*85*85+85*e(t.charCodeAt(r+3))*85*85+85*e(t.charCodeAt(r+2))*85+85*e(t.charCodeAt(r+1))+e(t.charCodeAt(r));return new Uint8Array(o,0,r)};let c=Array.from(n.querySelectorAll(`script[type="${o}"]`));a(c.map((t=>t.textContent)).join(""));if(c.forEach((t=>{const e=n.createElement("data");e.textContent=t.textContent,e.setAttribute("type",t.getAttribute("type")),n.body.replaceChild(e,t)})),r[r.length-2].textContent=r[r.length-2].textContent.replace("script","data"),e>=2){Array.from(n.querySelectorAll(`data[type="${o}"]`)).forEach((t=>t.textContent=btoa(t.textContent))),r[r.length-2].textContent=r[r.length-2].textContent.replace("i.textContent","atob(i.textContent)")}const l=n.createElement("data");return l.dataset.t="_",n.body.append(l),n.documentElement.outerHTML}catch(t){Output(t,"Error")}}
