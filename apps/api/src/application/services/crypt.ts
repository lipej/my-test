import { Crypt } from '@app/protocols/crypt';
import * as CryptoJS from 'crypto-js';

export class CryptCryptoService implements Crypt {
  constructor(private secure_key: string) {}

  encrypt(value: string) {
    return CryptoJS.MD5(value + this.secure_key).toString();
  }

  compare(value: string, hash: string) {
    return CryptoJS.MD5(value + this.secure_key).toString() === hash;
  }
}
