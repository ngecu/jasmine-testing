export interface User {
    user_id?: string;
    name?: string;
    email: string;
    password: string;
    confirm_password?:string;
    role?: number;
    welcomed?: number;
    active?: number;
  }
  