import type { NewsItem } from './types';

export const mockNews: NewsItem[] = [
  {
    id: 'news-001',
    title: 'YoYo Champion App Launch!',
    body: 'Welcome to YoYo Champion, the ultimate platform for yo-yo enthusiasts! Track your progress, learn new tricks, and join a community of throwers worldwide.',
    imageUrl: 'https://example.com/news/launch.jpg',
    type: 'announcement',
    createdAt: new Date('2024-10-01'),
  },
  {
    id: 'news-002',
    title: 'New Trick Added: Spirit Bomb',
    body: 'The legendary Spirit Bomb trick tutorial is now available! Learn this advanced trick with step-by-step guidance and multiple camera angles.',
    imageUrl: 'https://example.com/news/spirit-bomb.jpg',
    type: 'update',
    createdAt: new Date('2024-10-15'),
  },
  {
    id: 'news-003',
    title: 'Community Highlight: Horizontal Combo',
    body: 'SidewaysSteve just uploaded an incredible horizontal combo that has the community buzzing. Check it out on the For You feed!',
    imageUrl: 'https://example.com/news/horizontal-highlight.jpg',
    type: 'new_video',
    createdAt: new Date('2024-10-22'),
  },
  {
    id: 'news-004',
    title: 'Weekly Challenge: Boingy Boing Speed',
    body: 'This week\'s challenge: record your fastest Boingy Boing combo! Top performers earn exclusive badges and bonus XP.',
    imageUrl: 'https://example.com/news/weekly-challenge.jpg',
    type: 'announcement',
    createdAt: new Date('2024-11-01'),
  },
  {
    id: 'news-005',
    title: 'New Learning Paths Available',
    body: 'We\'ve added three new learning paths: Competition Prep, Horizontal Mastery, and 5A Fundamentals. Start your journey today!',
    imageUrl: 'https://example.com/news/new-paths.jpg',
    type: 'update',
    createdAt: new Date('2024-11-05'),
  },
  {
    id: 'news-006',
    title: 'Upload Feature Now Live',
    body: 'You can now upload your own trick videos! Share your progress, get feedback, and earn upload reputation points.',
    imageUrl: 'https://example.com/news/upload-feature.jpg',
    type: 'announcement',
    createdAt: new Date('2024-11-10'),
  },
  {
    id: 'news-007',
    title: 'Trending: 5A Freestyle Videos',
    body: 'CounterweightKing\'s 5A freestyle video is trending with over 900 likes! The freehand community is growing fast.',
    imageUrl: 'https://example.com/news/5a-trending.jpg',
    type: 'new_video',
    createdAt: new Date('2024-11-12'),
  },
  {
    id: 'news-008',
    title: 'Holiday Sale at the Shop',
    body: 'Get up to 20% off on selected YoYo Champion signature yo-yos this holiday season. Limited stock available!',
    imageUrl: 'https://example.com/news/holiday-sale.jpg',
    type: 'announcement',
    createdAt: new Date('2024-11-15'),
  },
];

export const getNewsById = (id: string): NewsItem | undefined =>
  mockNews.find((n) => n.id === id);

export const getNewsByType = (type: NewsItem['type']): NewsItem[] =>
  mockNews.filter((n) => n.type === type);

export const getRecentNews = (limit: number = 5): NewsItem[] =>
  [...mockNews].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, limit);
