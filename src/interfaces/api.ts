export type Response = {
  success: boolean
  error?: string
}

export interface DataResponse<T> extends Response {
  data?: T
}

export interface LoginResponse extends DataResponse<LoginResponse> {}
