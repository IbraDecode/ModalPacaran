import { child, get, onValue, push, ref, remove, set, update } from 'firebase/database';
import { db } from './firebase';
import { Room, Member, TimelineItem } from '@/app/types';
import { toDateKey } from '@/utils/dateKey';

const roomRef = (roomId: string) => ref(db, `rooms/${roomId}`);

export const fetchRoom = async (roomId: string): Promise<Room | null> => {
  const snap = await get(roomRef(roomId));
  if (!snap.exists()) return null;
  const data = snap.val();
  return { id: roomId, ...data } as Room;
};

export const listenRoom = (roomId: string, cb: (room: Room | null) => void) => {
  return onValue(roomRef(roomId), (snap) => {
    const data = snap.val();
    cb(data ? ({ id: roomId, ...data } as Room) : null);
  });
};

export const createRoom = async (roomId: string, meta: Room['meta'], member: Member) => {
  const roomPath = roomRef(roomId);
  await set(roomPath, {
    meta,
    members: { [member.deviceId]: member },
    savings: { daily: {}, timeline: {} },
  });
};

export const joinRoom = async (roomId: string, member: Member) => {
  const path = roomRef(roomId);
  const snap = await get(path);
  if (!snap.exists()) throw new Error('not-found');
  const data = snap.val();
  if (data.members && Object.keys(data.members).length >= 2 && !data.members[member.deviceId]) {
    throw new Error('room-full');
  }
  await update(path, { [`members/${member.deviceId}`]: member });
};

export const leaveRoom = async (roomId: string, deviceId: string) => {
  await remove(child(roomRef(roomId), `members/${deviceId}`));
};

export const addDeposit = async (
  roomId: string,
  deviceId: string,
  amount: number,
  actionId: string,
) => {
  const todayKey = toDateKey();
  const updates: Record<string, unknown> = {};
  updates[`savings/daily/${todayKey}/${deviceId}`] = amount;
  const timelineRef = child(roomRef(roomId), 'savings/timeline');
  const newRef = push(timelineRef);
  updates[`savings/timeline/${newRef.key}`] = { ts: Date.now(), by: deviceId, type: 'deposit', amount, actionId };
  updates[`members/${deviceId}/totalSaved`] = amount;
  updates[`members/${deviceId}/lastActive`] = Date.now();
  await update(roomRef(roomId), updates);
  return newRef.key;
};

export const fetchTimeline = async (roomId: string): Promise<TimelineItem[]> => {
  const snap = await get(child(roomRef(roomId), 'savings/timeline'));
  if (!snap.exists()) return [];
  const data = snap.val();
  return Object.entries(data).map(([id, value]) => ({ id, ...(value as Omit<TimelineItem, 'id'>) }));
};
