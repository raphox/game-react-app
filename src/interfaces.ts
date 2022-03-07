export interface CardImage {
  title?: string;
  src: string;
}

export interface Card extends CardImage {
  id: number;
  matched: boolean;
}
