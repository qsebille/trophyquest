export interface Player {
  id: string;
  pseudo: string;
  avatar: string;
}

export const emptyPlayer: Player = {
  id: '',
  pseudo: '',
  avatar: 'empty.png'
};
