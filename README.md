# Style Switcher Component

En simpel, framework-fri theme switcher, der kan drop-in-integreres på andre sider. Koden er skrevet i moderne, ren HTML/CSS/JavaScript uden afhængigheder.

## Struktur og filer

- css/base.css: Tema-agnostiske basisstilarter (layout, komponent-rammer, knappers grundstil, fokus-tilstande)
- css/themes.css: Tema-variabler og tema-specifikke tweaks via CSS nesting (light, dark, retro)
- css/theme-switcher.css: Kun stilarter for selve tema-vælgeren (dropdown og container)
- js/style-switcher.js: Simpelt, globalt API til at vælge/lagre tema
- js/product-demo.js: Lidt UI-interaktion til demo-komponenter
- index.html: Fuld demo med produktkort
- minimal.html: Minimal demo med inline temaer og delt base.css

## Funktioner

- Dropdown-menu til temavalg (light/dark som standard; retro kan tilføjes ved init)
- Tema-persistens via localStorage
- Ingen FOUC (Flash of Unstyled Content): data-theme-ready sættes efter init i JS; base.css håndterer skjul/vis
- Moderne CSS: bruger CSS nesting for overskuelige tema-tweaks
- Simpelt API: initStyleSwitcher, setTheme, getTheme, onChange

## Demo

Åbn `index.html` i en browser for at se en live demo af Style Switcher.

## Integration

### Trin 1: Inkluder filerne

```html
<link rel="stylesheet" href="css/themes.css">
<link rel="stylesheet" href="css/base.css">
<link rel="stylesheet" href="css/theme-switcher.css">
```

### Trin 2: Tilføj HTML for vælgeren

Tilføj et select-element med id `theme-select` (biblioteket udfylder options automatisk):

```html
<select id="theme-select" class="theme-select" aria-label="Select theme"></select>
```

### Trin 3: Initialiser komponenten

Standardtemaer er kun `light` og `dark`. Tilføj `retro` (eller andre) via `themes`-option:

```html
<script src="js/style-switcher.js"></script>
<script>
  StyleSwitcher.initStyleSwitcher({
    target: document.documentElement,
    key: 'site-theme',
    defaultTheme: 'light',
    themes: ['light', 'dark', 'retro', 'golden'],
  });
</script>
```

## API Reference

### `initStyleSwitcher(options)`

Initialiserer StyleSwitcher komponenten med de angivne indstillinger.

**Options:**
- `target` (Element, default: `document.documentElement`): Målelement som tema-klassen sættes på
- `key` (string, default: `'site-theme'`): localStorage nøgle til persistens
- `defaultTheme` (string, default: `'light'`): Standard tema hvis intet er gemt
- `themes` (array, default: `['light', 'dark']`): Liste over tilgængelige temaer. Tilføj fx `'retro'` her for at aktivere retro-temaet.

### `getTheme()`

Returnerer det nuværende aktive tema.

### `setTheme(themeName)`

Skifter til det angivne tema. Returnerer `true` hvis skiftet lykkedes, ellers `false`.

### `onChange(callback)`

Registrerer en callback funktion der kaldes når temaet ændres.
Callback funktionen modtager temanavnet som parameter.

## Tilpasning

### Tilføj et nyt tema

1. Åbn `css/themes.css`
2. Tilføj en ny class definition efter de eksisterende temaer:
   ```css
   .theme-new-theme {
     --bg: #your-color;
     --fg: #your-color;
     /* Tilføj alle de nødvendige CSS-variabler */
   }
   ```
3. Opdater tema-listen i JavaScript init:
   ```javascript
   themes: ['light', 'dark', 'retro', 'new-theme']
   ```

## Bemærkninger

- Nogle linters kan advare om font-family fallback ved brug af CSS-variabler; det er ufarligt
- SVG-attribut-advarsler i demoen påvirker ikke funktionaliteten
