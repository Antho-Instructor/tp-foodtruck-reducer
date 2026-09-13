import type { CartState, CartAction } from "../types";
import { DISCOUNT_CODES } from "../data/discountCodes";

export const initialCartState: CartState = {
  lines: [],
  discountCode: null,
  discountPercent: 0,
  happyHour: false,
};

/**
 * Le reducer du panier : (state, action) => nouvel état.
 *
 * Règles à respecter partout dans cette fonction (elles sont ce qui fait
 * qu'un reducer est FIABLE et TESTABLE) :
 *
 * 1. C'est une fonction PURE : aucun fetch, aucun setTimeout, aucun
 *    Math.random(), aucune mutation d'une variable extérieure. Les mêmes
 *    (state, action) en entrée donnent TOUJOURS le même état en sortie.
 * 2. On ne MUTE jamais `state` (ni `state.lines`, ni un objet `line`
 *    existant). On retourne toujours un NOUVEL objet / NOUVEAU tableau.
 *    C'est ce qui permet à React de détecter le changement (comparaison
 *    par référence) et de re-render au bon moment.
 * 3. Une action inconnue ou invalide ne casse rien : on retourne l'état
 *    inchangé (`default: return state`).
 */
export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingLine = state.lines.find(
        (line) => line.product.id === action.product.id,
      );

      if (existingLine) {
        // Le produit est déjà dans le panier : on incrémente sa quantité.
        // .map() construit un TOUT NOUVEAU tableau ; on ne touche jamais
        // à state.lines directement.
        return {
          ...state,
          lines: state.lines.map((line) =>
            line.product.id === action.product.id
              ? { ...line, quantity: line.quantity + 1 }
              : line,
          ),
        };
      }

      // Nouveau produit : on ajoute une nouvelle ligne à la fin.
      return {
        ...state,
        lines: [...state.lines, { product: action.product, quantity: 1 }],
      };
    }

    case "INCREMENT_ITEM": {
      return {
        ...state,
        lines: state.lines.map((line) =>
          line.product.id === action.productId
            ? { ...line, quantity: line.quantity + 1 }
            : line,
        ),
      };
    }

    case "DECREMENT_ITEM": {
      return {
        ...state,
        // On décrémente d'abord, puis on FILTRE les lignes tombées à 0 :
        // deux étapes séparées, plus lisibles qu'un seul .reduce() alambiqué.
        lines: state.lines
          .map((line) =>
            line.product.id === action.productId
              ? { ...line, quantity: line.quantity - 1 }
              : line,
          )
          .filter((line) => line.quantity > 0),
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        lines: state.lines.filter((line) => line.product.id !== action.productId),
      };
    }

    case "APPLY_DISCOUNT_CODE": {
      const normalizedCode = action.code.trim().toUpperCase();
      const discountPercent = DISCOUNT_CODES[normalizedCode];

      if (discountPercent === undefined) {
        // Code inconnu : on NE FAIT RIEN. C'est au composant appelant
        // (le formulaire) d'afficher un message d'erreur ; le reducer,
        // lui, se contente de refuser une transition invalide.
        return state;
      }

      return { ...state, discountCode: normalizedCode, discountPercent };
    }

    case "TOGGLE_HAPPY_HOUR": {
      return { ...state, happyHour: !state.happyHour };
    }

    case "RESET_CART": {
      // On repart de l'état initial. Nouvel objet à chaque fois (pas de
      // risque qu'un composant mute accidentellement `initialCartState`).
      return { ...initialCartState };
    }

    default:
      return state;
  }
}
