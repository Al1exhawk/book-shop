export interface UserModel {
  readonly id: string;
  readonly userName: string;
  readonly role: string;
  readonly password: string;
  readonly confirmPassword: boolean;
  readonly email: string;
}
