# Mapowanie komponentów — shell `Tests` (`138:9148`)

Klucze z instancji w złotym wzorcu [`138:9148`](https://www.figma.com/design/BGEwLOj9VeR8CDwzj0ClA3/Designs?node-id=138-9148) (biblioteka **Design System**, `remote: true`). Przy wątpliwościach odśwież discovery skryptem z `layout-shell.md` — keys poniżej mogą się zestarzeć po republish biblioteki.

## Layout shell

| Figma | componentKey | Typ | Domyślny wariant |
|---|---|---|---|
| `header` | `5451cd91461c249ff111f1283f9f7bf3553de462` | COMPONENT | `header` |
| `sideNav` | `05da0417b8bbeb9722f89515073bee930205b9cc` | COMPONENT_SET | `Expanded=False` |
| `SideNavItem` | `35ba440716a8e8654d08a2658691a361f7dfde22` | COMPONENT_SET | `state=default` / `state=active` |
| `pageHeader` | `1bab2609047c9180464c7620aa3ea8aa6d09ae3d` | COMPONENT | `pageHeader` |
| `Logo` | `c94a5a70a3174e39fb43f08bcd82b32bdd220c68` | COMPONENT | `Logo` |

## Nawigacja / nagłówek

| Figma | componentKey | Typ |
|---|---|---|
| `inputText` | `80a419dc7b2d632904f3ec04408e721507a0747e` | COMPONENT_SET (`state=default`) |
| `Avatar` | `e7f93b06e9d2972a3c6126fbede59745723feff8` | COMPONENT |

## Akcje i lista

| Figma | componentKey | Typ | Domyślny wariant |
|---|---|---|---|
| `button` | `6e5cf99de1d3b991b4ff18b366e2d6751a447c89` | COMPONENT_SET | `variant=primary, state=default` |
| `iconButton` | `29fbd6f127152b755bbcb5babc7384ddc795ce82` | COMPONENT_SET | `variant=secondary, state=default` |
| `tabs` | `381dece53a713a5cc3a4f078310884fdeb14c366` | COMPONENT | `tabs` |
| `_tab` | `06748c164ae6102a252affc27d35797b0249d570` | COMPONENT_SET | `state=active` / `state=default` |
| `Exam Item` | `938ebf9ca5827f9be9f6eb4e9d1249b7f971aec7` | COMPONENT_SET | `state=default, variant=default` |
| `badge` | `245cd4cdbfc844bc0f1ee0f03d74c62228e14557` | COMPONENT_SET | `variant=success` (dostosuj) |
| `pagination` | `7261f0d4983170192bfb2d7e8be0881c5b9ff6b7` | COMPONENT | `pagination` |

## Ikony (INSTANCE_SWAP / nested)

| Figma | componentKey |
|---|---|
| `icon/home` | `7c08457bf45574eef2fa2d89ecf9f407f5c4f917` |
| `icon/search` | `81106de14568d5b1cbde83d8d37d1d8fe87a7c0e` |
| `icon/person` | `aeef3f191fd24fe8e7d6d2d8772725c2eb247ea0` |
| `icon/add` | `8a2e2a575d502515f5b04d379502cf3c2d111da8` |
| `icon/keyboard_arrow_down` | `10c8cfb90bdc1deff529e74b3a18108b2cf0711e` |
| `icon/dark_mode` | `426400ee20527746bc200e7fa27885db3b58f32e` |
| `icon/newsstand` | `c59cfc4d636b0694539d147773a6bfaf6546a2fd` |
| `icon / chevron_forward` | `eb690b2a3833415744ad7c612df4fd0667ef4d41` |
| `icon / content_paste_search` | `693eafdc7eb2c057ab866044428527f771e84635` |
| `icon/group` | `6f92d7a2c6b7293950631e3e8e68c093657fda47` |
| `icon / visibility` | `7e034f35f86a2a4924a4e49418e3cd750dba57ee` |
| `icon/clock_loader_40` | `4f6a1258203a69f8b656a22f8e5e9b3f73955e89` |
| `icon/select` | `866479d1eda9fcb2ecacac2f5b47c0ba664a5474` |
| `icon/splitscreen` | `90901408901fa2a432e5e0f9ae3e3d01da5075c2` |
| `icon / grid_view` | `c3fc0b41432dfeb6610db6caf734bf94da96fccb` |
| `icon/list` | `9bf51d159bcfb70b50d584504a476036a1d39e91` |

## React (`@pacurap/design-system`) → Figma

| Export npm | Figma |
|---|---|
| `Header` | `header` |
| `SideNav` | `sideNav` (zagnieżdżone `SideNavItem`) |
| `SideNavItem` | `SideNavItem` + odpowiedni `icon/*` |
| `PageHeader` | `pageHeader` |
| `ExamItem` | `Exam Item` |
| `Button` | `button` — warianty: primary / secondary / tertiary |
| `IconButton` | `iconButton` |
| `InputText` | `inputText` |
| `table` | `42e416ec70fe5668a122b8ada02b2a37ea63dc66` (COMPONENT) — SLOT `rows#292:10` |
| `table/header` | `aee4b6612c7160e9cca632a6ab1bbe95361f6c6f` (COMPONENT) — wewnątrz `table` |
| `table/row` | `7268af8d2f72ec4a5d9664e67ad57084d27b9e1f` (COMPONENT) |
| `icon / edit` | `72da0aea353d7b25ac7b7fc9769369025c1f6603` |
| `Select` | `select` — `c63ec552dcaeec2d3532122ed3fb005d499383ca` (filtry QB: ×3) |
| `MultiSelect` | `multiselect` — tylko gdy Make wymaga; **QB referencja używa select** |
| `Card` | `card` — ExamItem / siatka; **nie** na tabelę QB |
| `Badge` | `badge` |
| `Tab` / `Tabs` | `_tab` / `tabs` |
| `Logo` | `Logo` |
| `Avatar` | `Avatar` |
| `*Icon` | `icon/*` według GUIDELINES.md |

## Make — elementy bez gotowego komponentu Figma

Te występują w kodzie Make, ale **nie ma** ich jako instancji we wzorcu `Tests`. Strategia:

| Element Make | Statyczny odpowiednik w Figma |
|---|---|
| `UserMenu` (dropdown) | Pomiń albo osobny ekran „Menu użytkownika otwarte”; ewentualnie `card` + wiersze + `link` |
| `ResultsPanel`, `TestPreview` | Osobne ramki lub `panel` / `modal` z DS jeśli istnieją |
| `TestCreationWizard` kroki | Osobna ramka na krok; `StepIndicator` → złóż z `Tab`/`badge` + tekst |
| Lucide (`Edit`, `Send`, …) | Zamień na DS icon lub `iconButton` + znany `icon/*` |
| shadcn `table` w `TestTable` | Preferuj `table`, `table/header`, `table/row`, `tableCell` z DS |
| Tailwind progress bar w tabeli | Uprość: tekst procentu + `badge`; bez custom paska chyba że user wymaga |

Przed użyciem komponentów spoza listy: `search_design_system` z `includeLibraryKeys` biblioteki DS.
