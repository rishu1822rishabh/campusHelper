export interface User{
    id:string,
    name:string,
    email:string,
    role:Role,
    createdAt:Date,
    updatedAt:Date
}
export enum Role{
    ADMIN="Admin",
    User="user"
}
