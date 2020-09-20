import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { messages, deepMessages, miniClubs } from "../dummy";
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { User, USERROLE } from '../models/user';
import { MiniClub } from '../models/miniclub';

@Injectable({
  providedIn: 'root'
})
export class MiniClubService {
  api_url = environment.API_URL;
  constructor(private httpClient:HttpClient) { 

  }
  getAllMiniClub():Observable<MiniClub[]>{    
    return of(miniClubs)
  }
  addNewMiniClub(data:MiniClub):Observable<any>{
    data.id = miniClubs.length;
    miniClubs.push(data);
    return of('')
  }
  removeMiniClub(data:MiniClub):Observable<any>{
    return of('');
  }
}
