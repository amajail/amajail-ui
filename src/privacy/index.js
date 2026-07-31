/**
 * Privacy mode, shared by the family apps: every visit starts with money
 * amounts masked so a dashboard can be shown around without exposing
 * balances. An eye button (bindPrivacyToggle) reveals them; the reveal
 * survives in-tab navigation but a reload starts masked again.
 *
 * Consumers choose how to react to a toggle:
 *  - re-render in place: listen for the 'privacychange' event on document
 *    (my-expenses page scripts do this), or
 *  - full reload: pass { reloadOnToggle: true } — the revealed state is
 *    carried across that one programmatic reload via a one-shot flag, while
 *    a manual reload still resets to masked.
 */

const KEY = 'amounts-revealed';
const CARRY = 'amounts-reveal-carry';

// sessionStorage survives a reload, which is exactly the case that must NOT
// stay revealed — so a reload clears the flag before anything reads it,
// unless this reload is the one a reloadOnToggle consumer just asked for.
if (typeof window !== 'undefined') {
  const nav = performance.getEntriesByType('navigation')[0];
  if (nav && nav.type === 'reload' && sessionStorage.getItem(CARRY) !== '1') {
    sessionStorage.removeItem(KEY);
  }
  sessionStorage.removeItem(CARRY);
}

export function amountsHidden() {
  // Masked is the safe default anywhere storage is unavailable.
  if (typeof sessionStorage === 'undefined') return true;
  return sessionStorage.getItem(KEY) !== '1';
}

/** Flip the mode and tell every listening page script to re-render. */
export function setAmountsHidden(hidden) {
  if (hidden) sessionStorage.removeItem(KEY);
  else sessionStorage.setItem(KEY, '1');
  document.dispatchEvent(new CustomEvent('privacychange'));
}

/** Fixed-width mask — the same length for every value, so nothing leaks. */
export function maskedMoney(currency = 'ARS') {
  return currency === 'USD' ? 'US$ ••••••' : '$ ••••••';
}

const SVG =
  '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" ' +
  'stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">';

const EYE_OPEN = `${SVG}<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

const EYE_OFF =
  `${SVG}<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>` +
  '<path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>' +
  '<path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';

/**
 * Wire a button as the eye toggle: crossed eye while masked ("Show
 * amounts"), open eye while revealed. No-op when the button is missing, so
 * pages without the header slot don't have to care.
 */
export function bindPrivacyToggle(button, { reloadOnToggle = false } = {}) {
  if (!button) return;

  const paint = () => {
    const hidden = amountsHidden();
    button.innerHTML = hidden ? EYE_OFF : EYE_OPEN;
    const label = hidden ? 'Show amounts' : 'Hide amounts';
    button.setAttribute('aria-label', label);
    button.setAttribute('title', label);
    button.setAttribute('aria-pressed', String(!hidden));
  };

  button.addEventListener('click', () => {
    setAmountsHidden(!amountsHidden());
    if (reloadOnToggle) {
      sessionStorage.setItem(CARRY, '1');
      window.location.reload();
      return;
    }
    paint();
  });
  paint();
}
