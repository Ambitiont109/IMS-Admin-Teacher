import { User } from './user';
import { Child } from './child';

export interface Picture{
    url:string;
}
export interface ChildPicture{
    child:Child;
    pictures:Picture[];
}