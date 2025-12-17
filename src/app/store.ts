import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Room, Member } from './types';

export type Flags = {
  introDone: boolean;
  permDone: boolean;
  profileDone: boolean;
  roomId?: string;
};

export type Profile = {
  name: string;
  gender: 'male' | 'female' | 'other' | 'skip';
  targetName: string;
  targetAmount: number;
};

export type AppState = {
  deviceId: string;
  flags: Flags;
  profile: Profile;
  theme: 'light' | 'dark';
  room?: Room;
  partner?: Member;
  setFlags: (flags: Partial<Flags>) => void;
  setProfile: (profile: Partial<Profile>) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setRoom: (room?: Room) => void;
  setPartner: (partner?: Member) => void;
  setDeviceId: (id: string) => void;
};

const defaultProfile: Profile = {
  name: '',
  gender: 'skip',
  targetName: 'iPhone',
  targetAmount: 10000000,
};

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      deviceId: '',
      flags: { introDone: false, permDone: false, profileDone: false, roomId: undefined },
      profile: defaultProfile,
      theme: 'dark',
      room: undefined,
      partner: undefined,
      setFlags: (flags) =>
        set((state) => ({ flags: { ...state.flags, ...flags, roomId: flags.roomId ?? state.flags.roomId } })),
      setProfile: (profile) => set((state) => ({ profile: { ...state.profile, ...profile } })),
      setTheme: (theme) => set(() => ({ theme })),
      setRoom: (room) => set(() => ({ room })),
      setPartner: (partner) => set(() => ({ partner })),
      setDeviceId: (id) => set(() => ({ deviceId: id })),
    }),
    {
      name: 'modalpacaran-state',
      partialize: (state) => ({ flags: state.flags, profile: state.profile, deviceId: state.deviceId, theme: state.theme }),
    },
  ),
);
