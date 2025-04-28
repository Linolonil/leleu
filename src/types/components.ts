export interface JutsuCardProps {
  title: string;
  description: string;
  imageUrl: string;
  chakraPoints: number;
}

export interface BirthdayMessageProps {
  name: string;
  message: string;
  imageUrl?: string;
}

export interface FriendMessageCardProps {
  name: string;
  message: string;
  imageUrl?: string;
}

export interface ImageGalleryProps {
  images: string[];
  title?: string;
}

export interface VideoPlayerProps {
  videoUrl: string;
  title?: string;
  autoplay?: boolean;
}

export interface TimeAliveCounterProps {
  birthDate: Date;
  format?: 'days' | 'years' | 'full';
}

export interface NarutoQuizProps {
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  onComplete?: (score: number) => void;
} 