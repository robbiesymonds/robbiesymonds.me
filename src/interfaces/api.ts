export interface Response {
  success: boolean
  error?: string
}

export interface DataResponse<T> extends Response {
  data?: T
}

export enum RESPONSES {
  WRONG_PASS = "Wrong password!",
  SOMETHING_WENT_WRONG = "Something went wrong!",
}
