import { HttpAdapterService } from './../adapters/http-adapter/http-adapter.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Llama } from '../../_types/llama.type';

@Injectable({
  providedIn: 'root'
})
export class LlamaRemoteService {
  constructor(private http: HttpClient, private httpAdapterService: HttpAdapterService) {}

  getLlamasFromServer(): Observable<Llama[]> {
    return this.http.get<Llama[]>('/api/newestLlamas');
  }

  update(llamaId: string, changes: Partial<Llama>): Promise<Llama> {
    const url = `/api/llamas/${llamaId}`;
    return this.httpAdapterService.patch(url, changes);
  }
}
