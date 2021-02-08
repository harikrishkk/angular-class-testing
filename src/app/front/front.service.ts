import { Injectable } from '@angular/core';
import { Llama } from '../_types/llama.type';
import { LlamaRemoteService } from '../_services/llama-remote/llama-remote.service';

@Injectable({
  providedIn: 'root'
})
export class FrontService {
  userLlama: Llama;
  constructor(private llamaRemoteService: LlamaRemoteService) {}

  getFeaturedLlamas(config?: any): Promise<Llama[]> {
    return this.llamaRemoteService.getLlamasFromServer().toPromise();
  }
  pokeLlama(llama: Llama) {
    const userllamaId = this.userLlama.id;
    const pokedByClone = llama.pokedByTheseLlamas ? [...llama.pokedByTheseLlamas] : [];
    pokedByClone.push(userllamaId);

    this.llamaRemoteService.update(llama.id, {
      pokedByTheseLlamas: pokedByClone
    });
  }
}
