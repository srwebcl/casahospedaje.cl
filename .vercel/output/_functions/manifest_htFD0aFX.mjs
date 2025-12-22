import 'piccolore';
import { p as decodeKey } from './chunks/astro/server_Djsg9o2e.mjs';
import 'clsx';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_COB1XA9u.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/","cacheDir":"file:///Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/node_modules/.astro/","outDir":"file:///Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/dist/","srcDir":"file:///Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/src/","publicDir":"file:///Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/public/","buildClientDir":"file:///Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/dist/client/","buildServerDir":"file:///Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/send","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/send\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"send","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/send.ts","pathname":"/api/send","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/api/send@_@ts":"pages/api/send.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_htFD0aFX.mjs","/Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_B0NlTX3n.mjs","@astrojs/react/client.js":"_astro/client.EAUERNtn.js","/Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts":"_astro/Layout.astro_astro_type_script_index_0_lang.D51g2UB_.js","/Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/src/components/Navbar.astro?astro&type=script&index=0&lang.ts":"_astro/Navbar.astro_astro_type_script_index_0_lang.JgCg57q2.js","/Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/src/components/NewYearPromo.astro?astro&type=script&index=0&lang.ts":"_astro/NewYearPromo.astro_astro_type_script_index_0_lang.CXLTOn2o.js","/Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/src/components/Form.astro?astro&type=script&index=0&lang.ts":"_astro/Form.astro_astro_type_script_index_0_lang.DzF-4LSv.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts","const o={root:null,rootMargin:\"0px\",threshold:.1},t=new IntersectionObserver(e=>{e.forEach(r=>{r.isIntersecting&&r.target.classList.add(\"active\")})},o),s=document.querySelectorAll(\".reveal\");s.forEach(e=>t.observe(e));"],["/Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/src/components/Navbar.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"mobile-menu-btn\"),e=document.getElementById(\"mobile-menu\"),n=document.getElementById(\"menu-icon\"),t=document.getElementById(\"close-icon\");s?.addEventListener(\"click\",()=>{e?.classList.toggle(\"hidden\"),n?.classList.toggle(\"hidden\"),t?.classList.toggle(\"hidden\")});const c=e?.querySelectorAll(\"a\");c?.forEach(d=>{d.addEventListener(\"click\",()=>{e?.classList.add(\"hidden\"),n?.classList.remove(\"hidden\"),t?.classList.add(\"hidden\")})});"],["/Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/src/components/NewYearPromo.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",()=>{const t=document.getElementById(\"new-year-promo\"),e=document.getElementById(\"promo-content\"),s=document.getElementById(\"close-promo\"),n=document.getElementById(\"promo-backdrop\");t&&e&&setTimeout(()=>{t.classList.remove(\"hidden\"),requestAnimationFrame(()=>{e.classList.remove(\"scale-0\"),e.classList.add(\"scale-100\")})},1500);const o=()=>{e?.classList.remove(\"scale-100\"),e?.classList.add(\"scale-0\"),setTimeout(()=>{t?.classList.add(\"hidden\")},300)};s?.addEventListener(\"click\",o),n?.addEventListener(\"click\",o)});"],["/Users/sebastianrodriguezmilla/proyectos-web/casahospedaje/src/components/Form.astro?astro&type=script&index=0&lang.ts","const n=document.getElementById(\"contact-form\"),e=document.getElementById(\"form-status\");n?.addEventListener(\"submit\",async o=>{o.preventDefault();const r=new FormData(n),a=Object.fromEntries(r),t=n.querySelector('button[type=\"submit\"]'),i=t.innerText;t.disabled=!0,t.innerText=\"Enviando...\",e.classList.add(\"hidden\");try{const s=await fetch(\"/api/send\",{method:\"POST\",headers:{\"Content-Type\":\"application/json\"},body:JSON.stringify(a)}),d=await s.json();if(s.ok)e.innerText=\"¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.\",e.classList.remove(\"text-red-600\",\"hidden\"),e.classList.add(\"text-green-600\"),n.reset();else throw new Error(d.message||\"Error al enviar el mensaje\")}catch{e.innerText=\"Hubo un error al enviar el mensaje. Por favor intenta nuevamente.\",e.classList.remove(\"text-green-600\",\"hidden\"),e.classList.add(\"text-red-600\")}finally{t.disabled=!1,t.innerText=i,e.classList.remove(\"hidden\")}});"]],"assets":["/_astro/index.EKoWFVIy.css","/casa-hospedaje.mp4","/favicon.svg","/footer.mp4","/imagenes/ascensores-valparaiso.webp","/imagenes/bano-privado.jpeg","/imagenes/baño-privado.jpeg","/imagenes/comedor.jpeg","/imagenes/habitaciones.jpeg","/imagenes/hospedaje-valparaiso-10.jpeg","/imagenes/hospedaje-valparaiso-11.jpeg","/imagenes/hospedaje-valparaiso-12.jpeg","/imagenes/hospedaje-valparaiso-13.jpeg","/imagenes/hospedaje-valparaiso-15.jpeg","/imagenes/hospedaje-valparaiso-16.jpeg","/imagenes/hospedaje-valparaiso-17.jpeg","/imagenes/hospedaje-valparaiso-18.jpeg","/imagenes/hospedaje-valparaiso-19.jpeg","/imagenes/hospedaje-valparaiso-2.jpeg","/imagenes/hospedaje-valparaiso-20.jpeg","/imagenes/hospedaje-valparaiso-21.jpeg","/imagenes/hospedaje-valparaiso-22.jpeg","/imagenes/hospedaje-valparaiso-23.jpeg","/imagenes/hospedaje-valparaiso-24.jpeg","/imagenes/hospedaje-valparaiso-25.jpeg","/imagenes/hospedaje-valparaiso-26.jpeg","/imagenes/hospedaje-valparaiso-27.jpeg","/imagenes/hospedaje-valparaiso-28.jpeg","/imagenes/hospedaje-valparaiso-29.jpeg","/imagenes/hospedaje-valparaiso-3.jpeg","/imagenes/hospedaje-valparaiso-30.jpeg","/imagenes/hospedaje-valparaiso-31.jpeg","/imagenes/hospedaje-valparaiso-32.jpeg","/imagenes/hospedaje-valparaiso-33.jpeg","/imagenes/hospedaje-valparaiso-34.jpeg","/imagenes/hospedaje-valparaiso-35.jpeg","/imagenes/hospedaje-valparaiso-36.jpeg","/imagenes/hospedaje-valparaiso-37.jpeg","/imagenes/hospedaje-valparaiso-38.jpeg","/imagenes/hospedaje-valparaiso-39.jpeg","/imagenes/hospedaje-valparaiso-41.jpeg","/imagenes/hospedaje-valparaiso-42.jpeg","/imagenes/hospedaje-valparaiso-43.jpeg","/imagenes/hospedaje-valparaiso-44.jpeg","/imagenes/hospedaje-valparaiso-45.jpeg","/imagenes/hospedaje-valparaiso-48.jpeg","/imagenes/hospedaje-valparaiso-49.jpeg","/imagenes/hospedaje-valparaiso-50.jpeg","/imagenes/hospedaje-valparaiso-51.jpeg","/imagenes/hospedaje-valparaiso-53.jpeg","/imagenes/hospedaje-valparaiso-54.jpeg","/imagenes/hospedaje-valparaiso-55.jpeg","/imagenes/hospedaje-valparaiso-56.jpeg","/imagenes/hospedaje-valparaiso-6.jpeg","/imagenes/hospedaje-valparaiso-7.jpeg","/imagenes/hospedaje-valparaiso-8.jpeg","/imagenes/hospedaje-valparaiso-9.jpeg","/imagenes/interior.jpeg","/imagenes/museo-la-sebastiana.jpg","/imagenes/paseo-lancha.jpg","/imagenes/terraza.png","/imagenes/valparaiso cerros.webp","/imagenes/valparaiso.jpg","/_astro/client.EAUERNtn.js","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"i9qsm/DoFdTg+R04s+QcjuCMrUA3BdH+LzxCreyoH08="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
