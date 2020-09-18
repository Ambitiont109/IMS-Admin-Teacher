export enum DocumentFor {
    Classroom='classroom',
    All = 'all'

}
export interface Document{
    name:string,
    url:string,
    for:DocumentFor
}