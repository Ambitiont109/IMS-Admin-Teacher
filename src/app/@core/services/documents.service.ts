import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { documents } from "../dummy";
import { Document } from '../models/document';
@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  api_url = environment.API_URL;
  constructor(private httpClient:HttpClient) { 
  }

  getDocuments():Observable<Document[]>{
    return of(documents)
  }
}
