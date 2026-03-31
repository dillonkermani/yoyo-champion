import { YStack } from 'tamagui';
import { SectionHeader } from '../../primitives/SectionHeader';
import { NewsCard } from '../../cards/NewsCard';

export interface NewsDisplayItem {
  id: string;
  title: string;
  body: string;
  type: 'update' | 'announcement' | 'new_video';
  imageUrl: string;
  createdAt: Date;
}

export interface NewsSectionProps {
  items: NewsDisplayItem[];
  onNewsPress?: (id: string) => void;
}

export function NewsSection({ items, onNewsPress }: NewsSectionProps) {
  if (items.length === 0) return null;

  return (
    <YStack paddingHorizontal={20}>
      <SectionHeader title="News & Updates" />
      {items.map((item) => (
        <NewsCard
          key={item.id}
          title={item.title}
          body={item.body}
          type={item.type}
          createdAt={item.createdAt}
          {...(onNewsPress ? { onPress: () => onNewsPress(item.id) } : {})}
        />
      ))}
    </YStack>
  );
}
