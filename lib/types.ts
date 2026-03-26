export type EventItem = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  date: string;
  location: string;
  imageUrl: string;
  ticketUrl?: string;
  learnMoreUrl?: string;
  isFeatured: boolean;
  capacity: number;
  price: number;
  tags: string[];
};
