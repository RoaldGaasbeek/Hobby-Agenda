export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Activity = {
  id: string;
  title: string;
  date: string;
  time: string;
  categoryId: string;
  description?: string;
};