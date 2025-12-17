import Dexie, { Table } from 'dexie';
import { addDeposit } from './rtdbRepo';

export type PendingAction = {
  id: string;
  roomId: string;
  deviceId: string;
  amount: number;
  createdAt: number;
};

class QueueDb extends Dexie {
  pending_actions!: Table<PendingAction, string>;

  constructor() {
    super('modalpacaran-queue');
    this.version(1).stores({ pending_actions: '&id, roomId, deviceId' });
  }
}

const db = new QueueDb();

export const enqueueDeposit = async (action: PendingAction) => {
  await db.pending_actions.put(action);
};

export const processQueue = async () => {
  const all = await db.pending_actions.toArray();
  for (const action of all) {
    try {
      await addDeposit(action.roomId, action.deviceId, action.amount, action.id);
      await db.pending_actions.delete(action.id);
    } catch (e) {
      console.error('replay failed', e);
    }
  }
};
