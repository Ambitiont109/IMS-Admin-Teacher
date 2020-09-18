import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { Food, MenuItem } from "../models/meal-menu";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { foods,menuItems } from "../dummy";


@Injectable({
  providedIn: 'root'
})
export class MealMenuService {
  api_url = environment.API_URL;
  constructor(private httpClient:HttpClient) { 
  }

  addFood(food:Food):Observable<any>{
    foods.push(food);
    return of('suc');
  }

  updateFood(food:Food):Observable<any>{
    return of('suc');
  }
  deleteFoodFromMenu(food:Food, weekname:string, dayName:string):Observable<any>{
    return of('suc')
  }
  getAllMenuInformation():Observable<MenuItem[]>{
    return of(menuItems)
  }
  addFoodToMenu(foods:Food[], weekname:string, dayName:string):Observable<any>{
    return of(menuItems);
  }
  getAllFoods():Observable<Food[]>{
    return of(foods);
  }
  
  getFoodById(food_id:number):Observable<Food>{
    return of(foods[food_id]);
  }
}
