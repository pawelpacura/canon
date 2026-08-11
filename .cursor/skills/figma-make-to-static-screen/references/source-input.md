# Wejście — kopia widoku z Make (Figma Design)

User podaje **link do ramki w zwykłej Figmie** (`figma.com/design/...`) — to kopia / eksport widoku z Figma Make. Na jej bazie budujesz statyczny ekran w **Designs** z instancji DS.

## Parsowanie URL

```text
https://www.figma.com/design/{fileKey}/{fileName}?node-id=123-456
→ fileKey = {fileKey}
→ nodeId  = 123:456   (myślnik → dwukropek)
```

Brak `node-id` → zapytaj usera, która ramka jest źródłem. Nie zgaduj pierwszej ramki na stronie.

## Odczyt źródła (MCP)

Przed `get_design_context`: **`resource:figma-design-to-code`**.

| Narzędzie | Po co |
|---|---|
| `get_screenshot` | Układ, proporcje, stany wizualne, overlaye |
| `get_metadata` | Hierarchia warstw, nazwy ramek, wymiary |
| `get_design_context` | Teksty, CTA, struktura sekcji, mock data |

Uruchamiaj równolegle gdy to możliwe. **Źródło prawdy wizualna** = screenshot + warstwy w Figmie, nie kod z Make.

## Co wyciągnąć z kopii

1. **Nazwa widoku** — z nazwy ramki lub kontekstu usera
2. **Shell vs treść** — header / sideNav / main / pageHeader / content (Make często ma luźne shape zamiast DS)
3. **Mock data** — teksty PL dosłownie z warstw TEXT
4. **CTA i flow** — przyciski, linki, kroki wizarda, overlaye → osobne ramki docelowe
5. **Stany** — tabs, filtry, empty, modal → osobne ramki gdy user prosi o kolejny stan
6. **Luki DS** — elementy bez odpowiednika w bibliotece (surowe rectangle, custom chip…)

## Plik źródłowy

- **Domyślnie:** dowolny plik Figma Design wskazany przez usera w prompcie
- **Kanoniczny katalog kopii** — tylko gdy user poda stały URL pliku / strony; zapisz w notatce sesji, nie hardcoduj bez potwierdzenia
- **Make (`1y05CnoIzJUMsB0hykv3No`)** — legacy; nie czytaj, dopóki user nie wskaże make URL z brakiem kopii w Design

## Granice

| ✅ | ❌ |
|---|---|
| Odczyt ramki źródłowej | Edycja pliku źródłowego (kopii Make) |
| Klon / update ramki w **Designs** | Kopiowanie surowych shape z Make do Designs |
| Mapowanie UI → INSTANCE DS | Przenoszenie hex/RGB z kopii na nowe warstwy |

## Powiązane

- Katalog widoków (legacy Make): `make-views.md`
- Shell docelowy: `layout-shell.md` · `138:9148`
- Tokeny na własnych warstwach: `.cursor/rules/figma-designs-tokens.mdc`
