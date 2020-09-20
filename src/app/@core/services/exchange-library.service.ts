import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Observable, of, BehaviorSubject, from } from 'rxjs';
import { ExchangeLibrary } from '../models/exchangelibrary';
import {books} from '../dummy';
@Injectable({
  providedIn: 'root'
})
export class ExchangeLibraryService {
  api_url = environment.API_URL;
  
  constructor(private httpClient:HttpClient) { 
  }

  getAllBooks():Observable<ExchangeLibrary[]>{
    return of(books)
  }
  addBook(book:ExchangeLibrary):Observable<any>{
    book.id = books.length;
    books.push(book);
    return of('')
  }
  deleteBook(book:ExchangeLibrary):Observable<any>{
    return of('')
  }
  
}
