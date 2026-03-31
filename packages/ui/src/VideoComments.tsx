import { useState } from 'react';
import { YStack, XStack, Input } from 'tamagui';
import { Text } from './Text';
import { Button } from './Button';
import { NEU } from './tamagui.config';

export interface VideoComment {
  id: string;
  userId: string;
  userName: string;
  text: string;
  createdAt: string;
}

export interface VideoCommentsProps {
  comments: VideoComment[];
  onAddComment?: (text: string) => void;
}

export function VideoComments({ comments, onAddComment }: VideoCommentsProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = () => {
    const trimmed = newComment.trim();
    if (!trimmed || !onAddComment) return;
    onAddComment(trimmed);
    setNewComment('');
  };

  return (
    <YStack gap={12}>
      <Text fontSize={16} fontWeight="700" color="#0F1419">
        Comments ({comments.length})
      </Text>

      {comments.length === 0 && (
        <Text fontSize={14} color="#8899A6">
          No comments yet. Be the first!
        </Text>
      )}

      {comments.map((comment) => (
        <YStack
          key={comment.id}
          backgroundColor="#F7F8FA"
          borderRadius={14}
          padding={12}
          gap={4}
          {...NEU.card}
          shadowOpacity={0.3}
          shadowRadius={6}
        >
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize={14} fontWeight="700" color="$brandAqua">
              {comment.userName}
            </Text>
            <Text fontSize={11} color="#8899A6">
              {formatDate(comment.createdAt)}
            </Text>
          </XStack>
          <Text fontSize={14} color="#0F1419" lineHeight={20}>
            {comment.text}
          </Text>
        </YStack>
      ))}

      {onAddComment && (
        <XStack gap={8} alignItems="center">
          <Input
            flex={1}
            value={newComment}
            onChangeText={setNewComment}
            placeholder="Add a comment..."
            backgroundColor="white"
            borderRadius={14}
            borderWidth={0}
            paddingHorizontal={14}
            paddingVertical={10}
            fontSize={14}
            color="#0F1419"
            placeholderTextColor="#8899A6"
          />
          <Button
            onPress={handleSubmit}
            disabled={!newComment.trim()}
            opacity={newComment.trim() ? 1 : 0.5}
            size="$3"
          >
            Post
          </Button>
        </XStack>
      )}
    </YStack>
  );
}

function formatDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return 'just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    const diffDays = Math.floor(diffHr / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString();
  } catch {
    return dateStr;
  }
}
