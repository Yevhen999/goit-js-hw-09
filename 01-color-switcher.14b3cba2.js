const t={onBody:document.querySelector("body"),onBtnStart:document.querySelector("[data-start]"),onBtnStop:document.querySelector("[data-stop]")};let e=null;t.onBtnStop.setAttribute("disabled",!1),t.onBtnStart.addEventListener("click",(function(o){t.onBtnStart.setAttribute("disabled",!1),t.onBtnStop.toggleAttribute("disabled"),e=setInterval((()=>{const e=`#${Math.floor(16777215*Math.random()).toString(16)}`;t.onBody.style.backgroundColor=e}),1e3)})),t.onBtnStop.addEventListener("click",(function(o){t.onBtnStart.toggleAttribute("disabled"),t.onBtnStop.toggleAttribute("disabled"),clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.14b3cba2.js.map