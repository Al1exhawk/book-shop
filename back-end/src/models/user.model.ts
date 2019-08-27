export interface User {
  readonly id?: string;
  readonly userName: string;
  readonly type: string;
  readonly password: string;
  readonly confirmPassword?: boolean;
  }
