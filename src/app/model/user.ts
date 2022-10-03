
export interface Address {
  street: string,
  suite?: string,
  city: string,
  zipcode: string,
}

export class User {
  id: number = NaN;
  name: string = '';
  username: string = '';
  email: string = '';
  phone: string = '';
  address: Address = {
    street: '',
    suite: '',
    city: '',
    zipcode: ''
  }
}
