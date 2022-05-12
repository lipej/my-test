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

  constructor(params: Params) {
    this.name = params.name;
    this.username = params.username;
    this.email = params.email;
    this.password = params.password;
  }

  validate(param: 'email' | 'password') {
    return {
      password: () => /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,}$/.test(this.password),
      email: () => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
    }[param]();
  }
}
