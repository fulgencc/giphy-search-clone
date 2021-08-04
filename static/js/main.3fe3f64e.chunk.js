(this["webpackJsonpgiphy-search-clone"]=this["webpackJsonpgiphy-search-clone"]||[]).push([[0],{57:function(e,t,n){},65:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),r=n(30),s=n.n(r),i=n(71),o=n(72),u=n(21),l=n(10),j=n.n(l),d=n(13),b=n(6),h=n(19),f=n(17),O=n.n(f),p=O.a.create({baseURL:"https://api.giphy.com/v1/",timeout:3e4,params:{api_key:"QBSNpi4pbVGUcbtvfelNYKMGB6oOV8kE"}});function m(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:4,t=arguments.length>1?arguments[1]:void 0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"trending",c=arguments.length>3?arguments[3]:void 0;return"trending"===n?p.get("gifs/trending",{params:Object(h.a)({offset:t,limit:e},p.params)}):"search"===n?p.get("gifs/search",{params:Object(h.a)({q:c,offset:t,limit:e},p.params)}):void 0}var x=n(68),v=n(69),g=n(67),y=n(74),w=n(75),k=n(12),N=(n(57),n(1));function S(e){var t=Object(c.useState)(""),n=Object(b.a)(t,2),a=n[0],r=n[1],s=Object(c.useState)(),i=Object(b.a)(s,2),o=i[0],u=i[1],l=Object(c.useState)(-1),f=Object(b.a)(l,2),S=f[0],C=f[1],E=Object(c.useState)(),I=Object(b.a)(E,2),_=I[0],G=I[1],T=[e.containerInput,e.setContainerInput],L=T[0],B=T[1],R=[e.gifResponse,e.setGifResponse],q=R[0],z=R[1],D=e.setOffset,F="autoComplete",H="autoCompleteItem py-2",J="autoCompleteText";Object(c.useEffect)((function(){if(""!==a){var e=function(){var e=Object(d.a)(j.a.mark((function e(t){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,c=a,r=t.token,p.get("gifs/search/tags",{params:Object(h.a)({q:c},p.params),cancelToken:r});case 3:n=e.sent,u(n.data.data),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),console.log(e.t0.message);case 10:case"end":return e.stop()}var c,r}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}(),t=O.a.CancelToken.source();G(t);var n=setTimeout((function(){return e(t)}),1e3);return function(){return clearTimeout(n)}}M()}),[a]);var K=function(){var e=Object(d.a)(j.a.mark((function e(){var t,n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==a){e.next=7;break}return e.next=3,m(48,0);case 3:t=e.sent,z(t.data),e.next=11;break;case 7:return e.next=9,m(48,0,"search",a);case 9:n=e.sent,z(n.data);case 11:D(48);case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),M=function(){u(null),C(-1)},U=function(){a!==L&&(_&&_.cancel("Canceled autocomplete request because user searched."),V())},V=Object(c.useCallback)(Object(k.debounce)((function(){K(),M(),B(a)}),500),[a]);return Object(N.jsxs)("div",{children:[Object(N.jsxs)(g.a,{className:"mb-3",children:[Object(N.jsx)(y.a,{placeholder:"Search for something!",value:a,onKeyDown:function(e){o?40===e.keyCode&&S<o.length-1?C(S+1):38===e.keyCode&&S>-1?C(S-1):13===e.keyCode&&(S>-1?(r(o[S].name),M()):U()):13===e.keyCode&&U()},onChange:function(e){r(e.target.value)}}),Object(N.jsx)(g.a.Append,{children:Object(N.jsx)(w.a,{variant:"light",onClick:function(){U()},children:"Search!"})}),o&&o.length>0&&Object(N.jsx)(x.a,{className:"text-light rounded mx-0 mt-5",style:{position:"absolute",zIndex:10,width:"inherit",backgroundColor:"rgba(0, 0, 0, 0.5"},children:Object(N.jsx)(v.a,{className:"pt-2 px-0",children:Object(N.jsx)("ul",{className:F,role:"listbox",children:o.map((function(e,t){return Object(N.jsx)("li",{className:H,"aria-selected":S===t,role:"option",onClick:function(){r(e.name),M()},children:Object(N.jsx)("div",{className:J,children:e.name})},t)}))})})})]}),Object(N.jsx)("h3",{className:"text-light",children:Object(N.jsx)("strong",{children:L||"trending"})}),q&&Object(N.jsx)("h5",{className:"text-secondary",children:q.pagination.total_count?q.pagination.total_count+" GIFs found.":""})]})}var C=n(70),E=n(73);function I(e){var t=e.gif,n=Object(c.useState)(!1),a=Object(b.a)(n,2),r=a[0],s=a[1],i=Object(c.useState)(!1),u=Object(b.a)(i,2),l=u[0],j=u[1],d=function(){return Object(N.jsx)("div",{style:{height:"".concat(t.images.fixed_width.height,"px"),width:"100%"},children:Object(N.jsx)(C.a,{style:{position:"relative",top:"40%",left:"45%"},animation:"border"})})};return Object(N.jsx)(o.a.div,{initial:{opacity:0},animate:{opacity:1},whileHover:{scale:1.2},whileTap:{scale:1},onClick:function(){j(!l)},children:Object(N.jsxs)(E.a,{children:[!l&&Object(N.jsx)(E.a.Img,{src:t.images.fixed_width.url,style:r?{}:{display:"none"},onLoad:function(){return s(!0)},alt:t.title}),!l&&!r&&Object(N.jsx)(d,{}),l&&Object(N.jsxs)(E.a.Body,{children:[Object(N.jsx)("h6",{children:Object(N.jsx)("small",{children:t.title})}),Object(N.jsxs)("ul",{style:{listStyleType:"none",padding:0},children:[Object(N.jsx)("li",{children:Object(N.jsxs)("small",{className:"text-muted",children:["user - ",t.username?t.username:"None"]})}),Object(N.jsx)("li",{children:t.source_tld&&Object(N.jsx)("small",{className:"text-muted",children:t.source_tld})}),Object(N.jsx)("li",{children:Object(N.jsx)("small",{className:"text-muted",children:new Date(t.import_datetime).toLocaleDateString("en-us")})})]})]})]},t.id)})}function _(e){var t=e.row;return Object(N.jsx)(x.a,{className:"pb-3",children:t.map((function(e,t){return Object(N.jsx)(v.a,{xs:6,md:3,lg:2,children:Object(N.jsx)(I,{gif:e})},t)}))})}var G=function(e){return e<320?"xs":e>=320&&e<720?"sm":e>=720&&e<1024?"md":e>=1024?"lg":void 0},T=function(){var e=Object(c.useState)((function(){return G(window.innerWidth)})),t=Object(b.a)(e,2),n=t[0],a=t[1];return Object(c.useEffect)((function(){var e=Object(k.throttle)((function(){a(G(window.innerWidth))}),200);return window.addEventListener("resize",e),function(){return window.removeEventListener("resize",e)}}),[]),n};function L(e){var t=e.input,n=e.gifs,a=e.loading,r=Object(c.useState)([]),s=Object(b.a)(r,2),i=s[0],o=s[1],u=T();return Object(c.useEffect)((function(){o(function(e,t){var n=4;"xs"!==t&&"sm"!==t||(n=2),"lg"===t&&(n=6);var c=[],a=[];return e.forEach((function(t,r){(r+1)%n===0||r===e.length-1?(a.push(t),c.push(a),a=[]):a.push(t)})),c}(n,u))}),[n,u]),i.length?Object(N.jsx)("div",{className:"py-2",children:i.map((function(e,t){return Object(N.jsx)(_,{row:e},t)}))}):a?Object(N.jsx)("div",{className:"py-2",children:Object(N.jsx)(C.a,{animation:"border"})}):Object(N.jsx)("div",{className:"py-2",children:Object(N.jsxs)("h5",{children:["No GIFs found for ",t,"."]})})}function B(){var e=Object(c.useState)(""),t=Object(b.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)([]),s=Object(b.a)(r,2),i=s[0],o=s[1],l=Object(c.useState)(),h=Object(b.a)(l,2),f=h[0],O=h[1],p=Object(c.useState)(!0),g=Object(b.a)(p,2),y=g[0],w=g[1],C=Object(c.useState)(48),E=Object(b.a)(C,2),I=E[0],_=E[1],G=Object(c.useState)(!1),T=Object(b.a)(G,2),B=T[0],R=T[1],q=Object(c.useCallback)(Object(k.debounce)(R,1e3),[]),z=function(){var e=window.innerHeight+window.scrollY>=document.body.offsetHeight;e!==B&&q(e)};return Object(c.useEffect)((function(){return function(){var e=Object(d.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,w(!0),e.next=4,m(48,0);case 4:t=e.sent,O(t.data),o(t.data.data),w(!1),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log(e.t0.message);case 13:case"end":return e.stop()}}),e,null,[[0,10]])})));return function(){return e.apply(this,arguments)}}()(),window.addEventListener("scroll",z),function(){document.removeEventListener("scroll",z)}}),[]),Object(c.useEffect)((function(){if(B&&I<f.pagination.total_count){var e=function(){var e=Object(d.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,m(12,I,n?"search":"trending",n||void 0);case 3:t=e.sent,o((function(e){return[].concat(Object(u.a)(e),Object(u.a)(t.data.data))})),_((function(e){return e+12})),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0.message);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();R(!1),e()}}),[f,B,I,n]),Object(c.useEffect)((function(){f&&o(f.data)}),[f]),Object(N.jsxs)("div",{children:[Object(N.jsx)(S,{containerInput:n,setContainerInput:a,gifResponse:f,setGifResponse:O,setOffset:_}),Object(N.jsx)(L,{gifs:i,input:n,loading:y}),I<(f?f.pagination.total_count:0)&&Object(N.jsx)(x.a,{style:{marginTop:"10em",marginBottom:"10em"},children:Object(N.jsx)(v.a,{className:"text-center",children:Object(N.jsx)("h1",{children:"..."})})})]})}var R=function(){return Object(N.jsxs)(i.a,{children:[Object(N.jsxs)("div",{className:"py-5",children:[Object(N.jsx)(o.a.h1,{initial:{y:-200,opacity:0},animate:{y:0,opacity:1},transition:{duration:1.5,type:"spring",stiffness:100},children:"Giphy Search Clone \ud83c\udf87"}),Object(N.jsx)("h5",{className:"text-secondary",children:"Click a GIF to show some more info!"})]}),Object(N.jsx)(B,{})]})};n(64);s.a.render(Object(N.jsx)(a.a.StrictMode,{children:Object(N.jsx)(R,{})}),document.getElementById("root"))}},[[65,1,2]]]);
//# sourceMappingURL=main.3fe3f64e.chunk.js.map