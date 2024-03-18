import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ApiserviceService {
  constructor(private _http: HttpClient) {}
  // Connect Frontend to Backend

  apiUrl = 'http://localhost:3000/user';

  // Get All Users
  getAllUsersData(): Observable<any> {
    return this._http.get(this.apiUrl);
  }

  // Add User
  createUser(data: any): Observable<any> {
    console.log(data, 'data inserted');

    return this._http.post(`${this.apiUrl}`, data);
  }

  // Delete User
  deleteUser(id: any): Observable<any> {
    let ids = id;
    return this._http.delete(`${this.apiUrl}/${ids}`);
  }

  // Update User
  updateUser(id: any, data: any): Observable<any> {
    let ids = id;
    return this._http.put(`${this.apiUrl}/${ids}`, data);
  }

  // Get Single User
  getSingleUser(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrl}/${ids}`);
  }
}
