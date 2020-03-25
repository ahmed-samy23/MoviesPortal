export interface User {
    id?:string,
    firstname?:string,
    lastname?:string,
    email?:string,
    password?:string,
    type?:number // 1 admin, 2 user
}
