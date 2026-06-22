export interface User{
    id:string,
    name:string,
    email:string,
    role:Role,
    resumedata:string,
    createdAt:Date,
    updatedAt:Date
}
export enum Role{
    ADMIN="ADMIN",
    USER="USER"
}
export interface Authcontexttype{
    user:User|null,
    login:(formdata:FormData)=>void,
    logout:()=>void,
    checkPermission:(requiredrole:Role)=>boolean,
}
