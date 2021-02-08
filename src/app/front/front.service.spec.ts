import { RouterAdapterService } from './../_services/router-adapter/router-adapter.service';
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
  let routerAdapterServiceSpy: Spy<RouterAdapterService>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        FrontService,
        { provide: LlamaRemoteService, useValue: createSpyFromClass(LlamaRemoteService) },
        {
          provide: RouterAdapterService,
          useValue: createSpyFromClass(RouterAdapterService)
        }
      ]
    });

    serviceUnderTest = TestBed.inject(FrontService);
    llamaRemoteServiceSpy = TestBed.inject<any>(LlamaRemoteService);
    routerAdapterServiceSpy = TestBed.inject<any>(RouterAdapterService);
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

    describe('GIVEN user llama exists', () => {
      Given(() => {
        fakeUserLlamaId = 'fake id';
        fakeLlama = createDefaultFakeLlama();

        serviceUnderTest.userLlama = createDefaultFakeLlama();
        serviceUnderTest.userLlama.id = fakeUserLlamaId;
      });
      describe('GIVEN llama with empty poked by ', () => {
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

    describe('GIVEN user llama is empty, redirect to login', () => {
      Given(() => {
        serviceUnderTest.userLlama = null;
      });
      Then(() => {
        expect(routerAdapterServiceSpy.goToUrl).toHaveBeenCalledWith('/login');
      });
    });
  });
});

function createDefaultFakeLlama() {
  return { id: '1', name: 'Billy', imageFileName: 'fakeImage.jpg' };
}
