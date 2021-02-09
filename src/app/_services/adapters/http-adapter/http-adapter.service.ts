import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpAdapterService {
  constructor(private httpClient: HttpClient) {}

  get() {}

  patch<T>(url: string, body: any): Promise<T> {
    return this.httpClient.patch<T>(url, body).toPromise();
  }
}
