## Калькулятор подбора проводов (PWA)

Мобильное PWA‑приложение на Vue 3 + Quasar для подбора оптимальных комбинаций проводов по целевому току. UI ориентирован на телефоны (нижние табы, крупные контролы, офлайн‑режим).

- Демо: [jahongir-electrik.netlify.app](https://jahongir-electrik.netlify.app/)
- UI: Quasar (Material Design)
- PWA: офлайн, установка на главный экран, автообновление SW
- Графики: Chart.js

### Скриншоты/фичи
- Нижние вкладки для навигации (Calculator / База / Аналитика)
- Калькулятор с настройками, уведомлениями и экспортом JSON
- База: карточки на телефоне, таблица на десктопе, поиск
- Аналитика: интерактивный график ток/сечение + KPI

---

## Быстрый старт
```bash
npm install
npm run dev
```
Откройте локальный адрес из консоли. На Android нажмите «Добавить на главный экран».

## Сборка
```bash
npm run build
```
Готовый билд в `dist/`.

## Технологии
- Vue 3, Vite
- Quasar (`@quasar/vite-plugin`, `@quasar/extras`)
- Pinia, Vue Router
- Chart.js
- vite-plugin-pwa (Service Worker, манифест)

## Структура
- `src/stores/wires.js` — точная БД из таблицы (`section`, `current1..current6`).
- `src/views/CalculatorView.vue` — подбор 1..N проводов (с повторениями), сортировки, экспорт.
- `src/views/DatabaseView.vue` — карточки/таблица, поиск, статистика.
- `src/views/AnalyticsView.vue` — графики с переключением 1..6 проводов, KPI.
- `src/App.vue` — лэйаут с нижними табами.

## PWA
- Иконки: `public/pwa-192x192.png`, `public/pwa-512x512.png` (из `public/calculator-root.png`).
- Настройки PWA и SW — в `vite.config.js` (плагин `VitePWA`).

## Данные
- БД строго соответствует исходной производственной таблице и используется «как есть».
- Калькулятор опирается на `current1` как ток одного провода; остальные колонки кратны.

## Лицензия
MIT
