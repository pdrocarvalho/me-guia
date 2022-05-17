interface IUser {
  Name: string | null
  IsAdmin: boolean
}

export class User implements IUser {
  public Name
  public IsAdmin

  constructor() {
    this.Name = ''
    this.IsAdmin = false
  }
  setUserName(name: string): void {
    this.Name = name
  }

  getUserName() {
    return this.Name
  }

  getUserIsAdmin() {
    return this.IsAdmin
  }

  setUserIsAdmin(value: any) {
    this.IsAdmin = true
  }
}
