import { TestBed, fakeAsync } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { LlamaRemoteService } from './llama-remote.service';
import { Llama } from '../../_types/llama.type';
import { HttpClient } from '@angular/common/http';
import { HttpAdapterService } from '../adapters/http-adapter/http-adapter.service';

describe('LlamaRemoteService', () => {
  let serviceUnderTest: LlamaRemoteService;
  let httpSpy: Spy<HttpClient>;
  let fakeLlamas: Llama[];
  let actualResult: any;
  let actualError: any;
  let httpAdapterServiceSpy: Spy<HttpAdapterService>;

  Given(() => {
    TestBed.configureTestingModule({
      providers: [
        LlamaRemoteService,
        { provide: HttpAdapterService, useValue: createSpyFromClass(HttpAdapterService) },
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });

    serviceUnderTest = TestBed.get(LlamaRemoteService);
    httpSpy = TestBed.get(HttpClient);
    httpAdapterServiceSpy = TestBed.inject<any>(HttpAdapterService);

    fakeLlamas = undefined;
    actualResult = undefined;
    actualError = undefined;
  });

  describe('METHOD: getLlamasFromServer', () => {
    When(() => {
      serviceUnderTest.getLlamasFromServer().subscribe(value => (actualResult = value));
    });

    describe('GIVEN a successful request THEN return the llamas', () => {
      Given(() => {
        fakeLlamas = [{ id: '1', name: 'FAKE NAME', imageFileName: 'FAKE IMAGE' }];
        httpSpy.get.and.nextOneTimeWith(fakeLlamas);
      });
      Then(() => {
        expect(actualResult).toEqual(fakeLlamas);
      });
    });
  });

  //descwhen shortcut
  describe('METHOD: update', () => {
    let fakeLlamaIdArg: string;
    let fakeLlamaChangesArg: Partial<Llama>;

    When(
      fakeAsync(async () => {
        try {
          actualResult = await serviceUnderTest.update(
            fakeLlamaIdArg,
            fakeLlamaChangesArg
          );
        } catch (error) {
          actualError = error;
        }
      })
    );

    describe('given update was successful return updated llama', () => {
      let expectedReturnedLlama: Llama;
      Given(() => {
        fakeLlamaIdArg = 'fake id';
        fakeLlamaChangesArg = {
          pokedByTheseLlamas: ['fake id']
        };
        expectedReturnedLlama = createDefaultFakeLlama();
        expectedReturnedLlama.id = fakeLlamaIdArg;
        expectedReturnedLlama.pokedByTheseLlamas = ['fake id'];
        const expectedUrl = `/api/llamas/${fakeLlamaIdArg}`;
        httpAdapterServiceSpy.patch
          .mustBeCalledWith(expectedUrl, fakeLlamaChangesArg)
          .resolveWith(expectedReturnedLlama);
      });
      Then(() => {
        expect(actualResult).toEqual(expectedReturnedLlama);
      });
    });

    describe('METHOD fail', () => {
      Given(() => {
        httpAdapterServiceSpy.patch.and.rejectWith('Fake error');
      });
      Then(() => {
        expect(actualError).toEqual('Fake error');
      });
    });
  });
});

function createDefaultFakeLlama() {
  return { id: '1', name: 'Billy', imageFileName: 'fakeImage.jpg' };
}
