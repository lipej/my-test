export interface Crypt {
  encrypt(value: string): string;
  compare(value: string, hash: string): boolean;
}
