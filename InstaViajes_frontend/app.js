//importaciones de las plantillas de las diferentes secciones de la pagina
import { crearactividades as crearActividadesTemplate } from './plantillas/crearactividades.js';
import { crearviaje as crearViajeTemplate } from './plantillas/crearviajes.js';
import { detallesviaje as detallesViajeTemplate } from './plantillas/detallesviajes.js';
import { login as loginTemplate } from './plantillas/login.js';
import { misviajes as misViajesTemplate } from './plantillas/misviajes.js';
import { passwordreset as passwordResetTemplate } from './plantillas/passwordreset.js';
import { perfil as perfilTemplate } from './plantillas/perfil.js';
import { registro as registroTemplate } from '/plantillas/registro.js';
import { editaractividades as editarActividadesTemplate } from './plantillas/editaractividades.js';
import { editarviaje as editarViajeTemplate } from './plantillas/editarviajes.js';
import { home as homeTemplate } from './plantillas/home.js';
import { amigos as amigosTemplate } from './plantillas/amigos.js';

// Importaciones de los métodos de render de cada vista

// HOME
import { renderIndex as homeView } from './vistas/home/javaIndex.js';
import { renderIndex as homeSideView } from './vistas/home/javaIndexLog.js'

// LOGIN
import { render as renderLogin } from './vistas/login/login.js';

// AMIGOS
import { showData as renderFriends } from './vistas/amigos/feature-friends.js';

// MIS VIAJES
import { getMisViajesData as renderMisViajes } from './vistas/mis-viajes/mis-viajes.js';

// DETALLES DE UN VIAJE
import { renderHeader as renderHeaderDetallesViajes } from './vistas/detallesviaje/travel-show.js';
import { renderButtonTravel as renderButtonDetallesViajes } from './vistas/detallesviaje/travel-show.js';
import { renderDivCarousel as renderCarouselDetallesViajes } from './vistas/detallesviaje/travel-show.js';


//importacion del css
import './css/style.css';

// Sistema ruta antiguo
// const routes = {
//   '/': login,
//   '/registro': registro,
//   '/passwordreset': passwordreset,
//   '/home': home,
//   '/perfil': perfil,
//   '/detallesviaje': detallesviaje,
//   '/misviajes': misviajes,
//   '/amigos': amigos,
//   '/crearactividades': crearactividades,
//   '/crearviaje': crearviaje,
//   '/editarviaje': editarviaje,
//   '/editaractividades': editaractividades
// }

// Sistema ruta nuevo
const routes = {
  "/": {
    pathname: '/',
    template: loginTemplate,
    views: [renderLogin]
  },
  login: {
    pathname: '/login',
    template: loginTemplate,
    views: [renderLogin]
  },
  // registro: {
  //   pathname: '/registro',
  //   template: registroTemplate,
  //   views: [homeView, homeSideView]
  // },
  // passwordreset: {
  //   pathname: '/home',
  //   template: homeTemplate,
  //   views: [homeView, homeSideView]
  // },
  home: {
    pathname: '/home',
    template: homeTemplate,
    views: [homeView, homeSideView]
  },
  // perfil: {
  //   pathname: '/home',
  //   template: homeTemplate,
  //   views: [homeView, homeSideView]
  // },
  detallesviaje: {
    pathname: '/detallesviaje',
    template: detallesViajeTemplate,
    views: [renderButtonDetallesViajes, renderCarouselDetallesViajes, renderHeaderDetallesViajes]
  },
  misviajes: {
    pathname: '/misviajes',
    template: misViajesTemplate,
    views: [renderMisViajes]
  },
  amigos: {
    pathname: '/amigos',
    template: amigosTemplate,
    views: [renderFriends]
  },
  // crearactividades: {
  //   pathname: '/crearactividades',
  //   template: crearActividadesTemplate,
  //   views: [null]
  // },
  // crearviaje: {
  //   pathname: '/crearviaje',
  //   template: crearViajeTemplate,
  //   views: [null]
  // },
  // editarviaje: {
  //   pathname: '/editarviaje',
  //   template: editarViajeTemplate,
  //   views: [null]
  // },
  // editaractividades: {
  //   pathname: '/editaractividades',
  //   template: editarActividadesTemplate,
  //   views: [null]
  // }
};

const appDiv = document.getElementById('app');

checkCurrentRoute();

/**
 * Renderiza el template y vistas adecuadas según la ruta de la página actual
 */
function checkCurrentRoute() {
  let pathnameNoSlash = window.location.pathname.length > 1 ? window.location.pathname.substring(1) : window.location.pathname;

  if (routes[pathnameNoSlash]) {
    appDiv.innerHTML = routes[pathnameNoSlash].template;

    routes[pathnameNoSlash].views.forEach(view => {
      view();
    });

  } else {
    // Aqui debemos mostrar la página de un ERROR HTTP 404 (no se encuentra esta pagina)
  }
}


/**
 * Renderiza en la página la plantilla y la vista de una ruta dada
 * @param {*} pathname La ruta a renderizar
 */
const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname
  )

  let pathnameNoSlash = pathname.length > 1 ? pathname.substring(1) : pathname;

  appDiv.innerHTML = routes[pathnameNoSlash].template;

  routes[pathnameNoSlash].views.forEach(view => {
    view();
  });
}

/**
 * Renderiza las vistas de una ruta despues de que el usuario utilice las flechas del navegador para navegar
 */
window.onpopstate = () => {
  let pathnameNoSlash = window.location.pathname.length > 1 ? window.location.pathname.substring(1) : window.location.pathname;

  appDiv.innerHTML = routes[pathnameNoSlash].template;

  routes[pathnameNoSlash].views.forEach(view => {
    view();
  });

}

window.onNavigate = onNavigate;