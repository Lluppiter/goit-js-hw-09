!function(){var t,e=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),o=document.querySelector("body");e.addEventListener("click",(function(n){t=setInterval((function(){o.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16))}),1e3),e.setAttribute("disabled","")})),n.addEventListener("click",(function(){clearInterval(t),e.removeAttribute("disabled","")}))}();
//# sourceMappingURL=01-color-switcher.eb516816.js.map