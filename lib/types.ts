export type EventSocialCounts = {
  likes: number;
  comments: number;
  interested: number;
};

export type EventComment = {
  id: string;
  userId: string;
  eventId: string;
  content: string;
  createdAt: string;
  profile?: {
    username: string | null;
    avatarUrl: string | null;
  };
};

export type EventItem = {
  id: string;
  title: string;
  titleDe?: string;
  description: string;
  shortDescription: string;
  descriptionDe?: string;
  shortDescriptionDe?: string;
  date: string;
  location: string;
  imageUrl: string;
  logoUrl?: string;
  heroImageUrl?: string;
  ticketUrl?: string;
  learnMoreUrl?: string;
  isFeatured: boolean;
  capacity: number;
  price: number;
  tags: string[];
};
