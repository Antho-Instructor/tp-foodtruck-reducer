import type { CartState, CartAction } from "../types";
import { DISCOUNT_CODES } from "../data/discountCodes";

export const initialCartState: CartState = {
  lines: [],
  discountCode: null,
  discountPercent: 0,
  happyHour: false,
};

// ----------------------------------------------------------------------------
// 🔧 TODO 2 : Le reducer
// ----------------------------------------------------------------------------
// Complète chaque `case` ci-dessous. Rappelle-toi les 3 règles d'un reducer
// (détaillées dans le README) :
//   1. Fonction PURE : pas de fetch, pas de Math.random(), pas d'effet de bord.
//   2. On ne MUTE jamais `state` (ni state.lines, ni une `line` existante) :
//      on retourne toujours un NOUVEL objet / NOUVEAU tableau
//      (`{ ...state, ... }`, `.map()`, `.filter()`, `[...state.lines, x]`).
//   3. Une action invalide ne casse rien : elle retourne l'état inchangé.
//
// Fais les cases dans l'ordre, en testant dans le navigateur après chacune
// (voir les "✅ Vérif." du README) : le reste de l'appli est déjà câblé,
// dès qu'un case fonctionne le bouton correspondant s'anime.
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      // TODO 2.1 : si `action.product` est déjà dans `state.lines`,
      // incrémente sa quantité de 1. Sinon, ajoute une nouvelle ligne
      // avec quantity: 1.
      return state;
    }

    case "INCREMENT_ITEM": {
      // TODO 2.2 : +1 sur la ligne dont `product.id === action.productId`.
      return state;
    }

    case "DECREMENT_ITEM": {
      // TODO 2.3 : -1 sur la ligne concernée. Si sa quantité retombe à 0,
      // retire la ligne entièrement (le panier ne doit jamais afficher
      // une ligne à "0 ×").
      return state;
    }

    case "REMOVE_ITEM": {
      // TODO 2.4 : retire complètement la ligne dont
      // `product.id === action.productId`, quelle que soit sa quantité.
      return state;
    }

    case "APPLY_DISCOUNT_CODE": {
      // TODO 2.5 : cherche `action.code` (pense à le normaliser, par
      // exemple en majuscules) dans DISCOUNT_CODES.
      // - code valide   → mets à jour `discountCode` et `discountPercent`.
      // - code invalide → ne change RIEN, retourne `state` tel quel.
      return state;
    }

    case "TOGGLE_HAPPY_HOUR": {
      // TODO 2.6 : inverse `state.happyHour`.
      return state;
    }

    case "RESET_CART": {
      // TODO 2.7 : reviens à l'état initial (panier vide, pas de remise,
      // happy hour désactivée).
      return state;
    }

    default:
      return state;
  }
}
