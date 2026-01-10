export const PlayerType = {
  UNKNOWN: 'unknown',
  REGULAR: 'regular',
  IRONMAN: 'ironman',
  HARDCORE: 'hardcore',
  ULTIMATE: 'ultimate',
  GIM: 'gim'
} as const;

export type PlayerType = (typeof PlayerType)[keyof typeof PlayerType];

export const PLAYER_TYPES = Object.values(PlayerType) as PlayerType[];
