export type Gender = 'male' | 'female' | 'other' | 'skip';

export type Member = {
  deviceId: string;
  name: string;
  gender: Gender;
  joinedAt: number;
  lastActive: number;
  totalSaved: number;
  fcmToken?: string;
};

export type RoomMeta = {
  createdAt: number;
  targetName: string;
  targetAmount: number;
};

export type Room = {
  id: string;
  meta: RoomMeta;
  members: Record<string, Member>;
  savings: {
    daily: Record<string, Record<string, number>>;
  };
};

export type DayState = 'idle' | 'opened' | 'deposited' | 'missed';

export type TimelineItem = {
  id: string;
  ts: number;
  by: string;
  type: 'deposit';
  amount: number;
};
