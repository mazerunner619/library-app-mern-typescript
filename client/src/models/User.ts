export type User = {
    _id:string;
    type:'ADMIN' | 'EMPLOYEE' | 'PATRON';
    firstName:string;
    lastName:string;
    email:string;
}

export interface LoginUserPayload{
    email: string;
    password: string;
}

export interface RegisterUserPayload{
    email: string;
    password: string;
    firstName:string;
    lastName:string;
    type: 'ADMIN' | 'EMPLOYEE' | 'PATRON';
}