type Params = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export class User {
  readonly name: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  private _active?: boolean;
  private _hash?: string;

  constructor(params: Params) {
    this.name = params.name;
    this.username = params.username;
    this.email = params.email;
    this.password = params.password;
  }

  validate(param: "email" | "password") {
    return {
      password: () =>
        /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/.test(this.password),
      email: () =>
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email),
    }[param]();
  }

  set active(value: boolean) {
    this._active = value;
  }

  set hash(value: string) {
    this._hash = value;
  }

  get hash() {
    return this._hash as string;
  }

  hashMatch = (value: string) => this._hash === value;

  isActive = () => this._active ?? false;
}
