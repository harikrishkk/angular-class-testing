import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpAdapterService {
  constructor() {}

  patch(url: string, body: any): Promise<any> {
    throw new Error('Method not implemented');
  }
}
