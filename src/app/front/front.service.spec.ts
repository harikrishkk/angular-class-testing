import { FrontService } from './front.service';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Llama } from '../_types/llama.type';
import { LlamaRemoteService } from '../_services/llama-remote/llama-remote.service';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';

describe('FrontService', () => {
  let serviceUnderTest: FrontService;
  let llamaRemoteServiceSpy: Spy<LlamaRemoteService>;
  let fakeLlamas: Llama[];
  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        FrontService,
        { provide: LlamaRemoteService, useValue: createSpyFromClass(LlamaRemoteService) }
      ]
    });

    serviceUnderTest = TestBed.get(FrontService);
    llamaRemoteServiceSpy = TestBed.get(LlamaRemoteService);

    fakeLlamas = undefined;
    actualResult = undefined;
  });

  describe('METHOD: getFeaturedLlamas', () => {
    Given(() => {
      fakeLlamas = [{ id: '1', name: 'FAKE NAME', imageFileName: 'FAKE IMAGE' }];
      llamaRemoteServiceSpy.getLlamasFromServer.and.nextOneTimeWith(fakeLlamas);
    });

    When(
      fakeAsync(async () => {
        actualResult = await serviceUnderTest.getFeaturedLlamas();
      })
    );

    Then(() => {
      expect(actualResult).toEqual(fakeLlamas);
    });
  });

  describe('Method: PokeLlama', () => {
    let fakeUserLlamaId: string;
    let fakeLlama: Llama;

    When(() => {
      serviceUnderTest.pokeLlama(fakeLlama);
    });

    describe('GIVEN llama with empty poked by ', () => {
      Given(() => {
        fakeUserLlamaId = 'fake id';
        fakeLlama = createDefaultFakeLlama();

        serviceUnderTest.userLlama = createDefaultFakeLlama();
        serviceUnderTest.userLlama.id = fakeUserLlamaId;
      });
      Then(() => {
        const expectedChanges: Partial<Llama> = {
          pokedByTheseLlamas: [fakeUserLlamaId]
        };
        expect(llamaRemoteServiceSpy.update).toHaveBeenCalledWith(
          fakeLlama.id,
          expectedChanges
        );
      });
    });

    describe('GIVEN llama with filled array poked by ', () => {
      Given(() => {
        fakeUserLlamaId = 'fake id';
        fakeLlama = createDefaultFakeLlama();
        fakeLlama.pokedByTheseLlamas = ['other'];

        serviceUnderTest.userLlama = createDefaultFakeLlama();
        serviceUnderTest.userLlama.id = fakeUserLlamaId;
      });
      Then(() => {
        const expectedChanges: Partial<Llama> = {
          pokedByTheseLlamas: ['other', fakeUserLlamaId]
        };
        expect(llamaRemoteServiceSpy.update).toHaveBeenCalledWith(
          fakeLlama.id,
          expectedChanges
        );
      });
    });
  });
});

function createDefaultFakeLlama() {
  return { id: '1', name: 'Billy', imageFileName: 'fakeImage.jpg' };
}
