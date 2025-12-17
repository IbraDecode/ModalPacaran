# Arsitektur ModalPacaran

- **Stack**: React + TypeScript (Vite), Tailwind dark glass, Zustand untuk state, Firebase RTDB untuk realtime, Dexie untuk antrean offline, Recharts untuk chart, Lottie untuk Kucing.
- **Routing**: `src/app/AppRouter.tsx` dengan guard langkah (intro → permission → profile → start → pair → home). Flags disimpan di Zustand + localStorage.
- **Data**:
  - RTDB mengikuti struktur `rooms/{roomId}/meta`, `members`, `savings/daily`, `savings/timeline`.
  - DeviceId dibuat via `crypto.randomUUID()` dan disimpan di localStorage.
  - Offline queue di IndexedDB tabel `pending_actions`, diputar ulang saat online lewat `processQueue`.
- **Services**: `firebase.ts` (config), `rtdbRepo.ts` (CRUD room, deposit, timeline), `offlineQueue.ts` (enqueue + replay), `copyEngine.ts` (headline dinamis).
- **UI Components**: GlassCard, Button, SavingsChart, Kucing (map mood → dotlottie URL), Shimmer untuk skeleton.
- **Screens**: boot loading, intro, permission hub, profile, empty home (belum room), pairing create/join, home aktif, history timeline, alarm, settings, not found.
- **Testing**: Vitest + Testing Library dengan unit test dateKey & streak, copy engine, serta guard redirect.
