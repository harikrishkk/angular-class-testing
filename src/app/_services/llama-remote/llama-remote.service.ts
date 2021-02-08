import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Llama } from '../../_types/llama.type';

@Injectable({
  providedIn: 'root'
})
export class LlamaRemoteService {
  constructor(private http: HttpClient) {}

  getLlamasFromServer(): Observable<Llama[]> {
    return this.http.get<Llama[]>('/api/newestLlamas');
  }

  update(llamaId: string, changes: Partial<Llama>) {}
}
