export interface Post {
  id: number;
  type: 'image' | 'video';
  url: string;
  caption: string;
  created_at: string;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  block_type: string;
  quantity: number;
  status: string;
  created_at: string;
}

export const BLOCK_TYPES = [
  'Hollow Block (4")',
  'Hollow Block (5")',
  'Hollow Block (6")',
  'Solid Block (5")',
  'Solid Block (6")',
  'Pavement Block',
  'Interlocking Block'
];
