/**
 * Simple Style Switcher
 *
 * Purpose:
 * A tiny utility to switch between visual themes on a page.
 *
 * How it works (in short):
 * - Keeps a list of available themes (default: 'light' and 'dark').
 * - Applies a CSS class like `theme-light` or `theme-dark` to the target element (defaults to <html>).
 * - Saves the user's choice in localStorage so it persists on reload.
 * - If there is a <select id="theme-select">, it fills it with options and syncs it automatically.
 * - Sets `data-theme-ready="1"` on <html> after applying the initial theme to help avoid FOUC.
 */

/**
 * @typedef {Object} StyleSwitcherOptions
 * @property {Element}  [target=document.documentElement] - Element to receive the theme-* class (usually <html>).
 * @property {string}   [key='site-theme']                - localStorage key used to remember the theme.
 * @property {string[]} [themes=['light','dark']]         - Allowed theme names.
 * @property {string}   [defaultTheme='light']            - Theme to use when none is saved yet.
 */

/**
 * A function called whenever the theme changes.
 * @callback ThemeChangeCallback
 * @param {string} themeName - The new active theme.
 */

// Global style switcher object for simplicity
const StyleSwitcher = {
    themes: ['light', 'dark'],
    current: 'light',
    key: 'site-theme',
    target: document.documentElement,
    callbacks: [],
    changeCount: 0, // tæller for antal temas skift

    initStyleSwitcher(options = {}) {
        this.target = options.target || document.documentElement;
        if (!(this.target && this.target.classList)) {
            this.target = document.documentElement;
        }
        this.key = options.key || 'site-theme';
        this.themes = (Array.isArray(options.themes) && options.themes.length)
            ? options.themes
            : ['light', 'dark'];
        this.current = options.defaultTheme || 'light';

        // Load stored theme if valid
        try {
            const saved = localStorage.getItem(this.key);
            if (saved && this.themes.includes(saved)) {
                this.current = saved;
            }
        } catch (_) {}

        this.applyThemeClass(this.current);
        this.populateDropdown();
        document.documentElement.setAttribute('data-theme-ready', '1');

        return this;
    },

    populateDropdown() {
        const select = document.getElementById('theme-select');
        if (!select) return;

        const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
        select.innerHTML = this.themes
            .map((t) => `<option value="${t}">${capitalize(t)}</option>`)
            .join('');

        select.value = this.current;
        select.onchange = (e) => this.setTheme(e.target.value);
    },

    applyThemeClass(theme) {
        this.themes.forEach((t) => this.target.classList.remove(`theme-${t}`));
        this.target.classList.add(`theme-${theme}`);
    },

    setTheme(themeName) {
        if (!this.themes.includes(themeName)) {
            console.warn(`Unknown theme: ${themeName}`);
            return false;
        }

        this.current = themeName;
        this.applyThemeClass(themeName);

        try {
            localStorage.setItem(this.key, themeName);
        } catch (_) {}

        const select = document.getElementById('theme-select');
        if (select && select.value !== themeName) {
            select.value = themeName;
        }

        this.callbacks.forEach((fn) => {
            try { fn(themeName); } catch (_) {}
        });

        // Tæller og log i konsollen
        this.changeCount++;
        console.log(`Temaet er blevet skiftet ${this.changeCount} gange.`);

        return true;
    },

    getTheme() {
        return this.current;
    },

    onChange(callback) {
        if (typeof callback === 'function') {
            this.callbacks.push(callback);
        }
    },
};

window.StyleSwitcher = StyleSwitcher;
