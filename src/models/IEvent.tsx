export interface IEvent {
  id: string,
  author: string,
  quest: string,
  data: string,
  description: string,
  importance: 'low' | 'normal' | 'high' | null
}