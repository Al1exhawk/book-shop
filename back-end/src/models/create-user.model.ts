export interface CreateUser {
    readonly  userName: string;
    readonly  type: string;
    readonly  password: string;
    readonly  confirmPassword?: boolean;
  }
