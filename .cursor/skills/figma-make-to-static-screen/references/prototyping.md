# Prototyp klikany — poza Figmą i Make

Cel: klikalny flow produktu **bez** Figma Prototype i **bez** Figma Make.  
Źródła prawdy UI: **Design System (`@pacurap/design-system`)** + **statyczne ekrany w Designs** (review) + **mapa FigJam** (flow).

Skill eksportu ekranów (`figma-make-to-static-screen`) **nie** buduje prototypu w kodzie — to sesja wyłącznie Figma (kopia Make → Designs + FigJam). Prototyp SPA wymaga **osobnego czatu** w repo Canon.

## Rekomendacja: SPA w kodzie (bez backendu)

Masz już **Vite + React + Storybook** w repo **Canon**. Najsensowniejsza ścieżka:

### Opcja 1 — `apps/proto` (Vite SPA) ★ preferowana

Mała aplikacja w monorepo / obok kitu:

```text
apps/proto/
  src/
    App.tsx          ← router = mapa produktu
    routes.ts        ← lista widoków + przejść (JSON)
    mocks/           ← dane w pamięci
    pages/           ← jeden plik ≈ jeden widok z Designs / Make
```

| Co | Jak |
|---|---|
| UI | tylko `@pacurap/design-system` |
| Nawigacja | React Router (client-only) |
| Stan | `useState` / URL search params — zero API |
| Hosting | `vite build` → GitHub Pages / Netlify / Vercel (static) |
| Flow | `routes.ts` 1:1 z FigJam (id widoku, CTA → next) |

**Dlaczego to pasuje:** Make i tak jest React+DS, tylko niedoskonały. Proto = „czysta” wersja tego samego pomysłu, sterowana mapą, bez magii Make.

**Czego nie robić:** nie generować UI z screenshotów Designs; składać z tych samych komponentów co Figma library (Code Connect / GUIDELINES).

### Opcja 2 — Storybook jako „proto lite”

Page stories (`stories/pages/ListaTestow.stories.tsx`) + `play` / linki między stories.

| Plus | Minus |
|---|---|
| Zero nowego appa; już jest w repo | Słabe multi-step wizard / deep linking |
| Super do review komponentów w kontekście | Stakeholderom mniej naturalne niż URL apki |

Dobry **krok 0** (1–2 ekrany), potem przenieś do Opcji 1 gdy flow urośnie.

### Opcja 3 — osobne narzędzia (Framer, ProtoPie, …)

Działa, ale **drugi stack** i drift od `@pacurap/design-system`. Nie rekomendowane jako default.

## Architektura bez backendu (wystarczy)

```text
FigJam (mapa) ──dokumentuje──► routes.ts (krawędzie flow)
Designs (Figma) ──review──►   pages/* (implementacja w DS)
Make ──legacy──► user trzyma kopie w Figma Design ──► agent eksportuje do Designs, nie do proto
```

- Żadnego serwera aplikacji: static files + router w przeglądarce.
- „Zapis” = `localStorage` opcjonalnie (draft wizarda) — nadal bez backendu.
- Upload pliku w proto: `URL.createObjectURL` / fake progress — bez upload API.

### Minimalny kształt `routes.ts`

```ts
export type ProtoRoute = {
  id: string;           // np. "lista-testow"
  path: string;         // "/tests"
  title: string;
  figmaNodeId?: string; // Designs frame, np. "138-9148"
  exits: { label: string; to: string }[];  // CTA → inny id
};

export const routes: ProtoRoute[] = [
  {
    id: "lista-testow",
    path: "/tests",
    title: "Lista testów",
    figmaNodeId: "138-9148",
    exits: [{ label: "Utwórz test", to: "kreacja-typ" }],
  },
  // …
];
```

Spina Make→Designs z proto w kodzie: po eksporcie widoku do Designs, **osobna sesja** w repo Canon (gdy user poprosi o prototyp w kodzie) dopisuje/zaktualizuje wpis w `routes.ts` + stub page. Skill `figma-make-to-static-screen` **nie** modyfikuje plików TS — brak zapisu kodu w tej sesji.

## Czego unikać

| Podejście | Dlaczego nie |
|---|---|
| Figma Prototype / Make jako docelowe demo | Właśnie tego nie chcesz utrzymywać |
| Backend „na wszelki wypadek” | Opóźnia MVP; mocki wystarczą do flow |
| Generowanie całego UI z PNG Designs | Drift, brak tokenów, trudny maintenance |
| Duplikat komponentów poza pakietem DS | Rozjazd z biblioteką |

## Praktyczny MVP

1. `apps/proto` z Vite, zależność na lokalny `@pacurap/design-system`.
2. Shell jak w produkcie: `header` + `sideNav` + `main` (te same komponenty co w kodzie kitu).
3. 4–6 tras happy path z mapy (Lista → Kreacja → … → powrót).
4. Deploy static URL do klikania ze stakeholderami.
5. FigJam zostaje mapą; w node można dodać drugi link: Designs (review) + Proto (klik).

Gdy user powie „zbuduj prototyp w kodzie”, **nowy czat** w repo Canon startuje od Opcji 1 — nie od Figmy i nie w sesji `figma-make-to-static-screen`.
