export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface PostInput {
  title: string
  body: string
  userId: number
}

export interface Comment {
  id: number
  postId: number
  name: string
  email: string
  body: string
}

export interface ApiLog {
  id: string
  timestamp: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
  status?: number
  durationMs?: number
  isError?: boolean
}
