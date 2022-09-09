export interface IValidateLength {
  validateLength(v: string, l: number): boolean;
}

export interface IValidateEmail {
  validateEmail(email: string): boolean;
}
