(function(){if(typeof Prism>"u"||typeof document>"u")return;if(!Prism.plugins.toolbar){console.warn("Copy to Clipboard plugin loaded before Toolbar plugin.");return}function a(e,t){e.addEventListener("click",function(){l(t)})}function u(e){var t=document.createElement("textarea");t.value=e.getText(),t.style.top="0",t.style.left="0",t.style.position="fixed",document.body.appendChild(t),t.focus(),t.select();try{var r=document.execCommand("copy");setTimeout(function(){r?e.success():e.error()},1)}catch(o){setTimeout(function(){e.error(o)},1)}document.body.removeChild(t)}function l(e){navigator.clipboard?navigator.clipboard.writeText(e.getText()).then(e.success,function(){u(e)}):u(e)}function p(e){window.getSelection().selectAllChildren(e)}function d(e){var t={copy:"Copy","copy-error":"Press Ctrl+C to copy","copy-success":"Copied!","copy-timeout":5e3},r="data-prismjs-";for(var o in t){for(var i=r+o,n=e;n&&!n.hasAttribute(i);)n=n.parentElement;n&&(t[o]=n.getAttribute(i))}return t}Prism.plugins.toolbar.registerButton("copy-to-clipboard",function(e){var t=e.element,r=d(t),o=document.createElement("button");o.className="copy-to-clipboard-button",o.setAttribute("type","button");var i=document.createElement("span");return o.appendChild(i),c("copy"),a(o,{getText:function(){return t.textContent},success:function(){c("copy-success"),n()},error:function(){c("copy-error"),setTimeout(function(){p(t)},1),n()}}),o;function n(){setTimeout(function(){c("copy")},r["copy-timeout"])}function c(s){i.textContent=r[s],o.setAttribute("data-copy-state",s)}})})();
