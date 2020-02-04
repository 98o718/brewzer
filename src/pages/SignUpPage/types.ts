export type UserType = {
  username: string
  email: string
  password: string
  agree: boolean
  avatar: null | FileList
}

export enum ErrorTypes {
  EMAIL,
  PASSWORD,
  USERNAME,
}
