import { TestBed } from '@angular/core/testing';
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
    let fakeLlamaId: string;
    let fakeLlamaChanges: Partial<Llama>;

    Given(() => {
      fakeLlamaId = '';
      fakeLlamaChanges = {
        pokedByTheseLlamas: ['fake id']
      };
    });

    When(() => {
      serviceUnderTest.update(fakeLlamaId, fakeLlamaChanges);
    });

    Then(() => {
      // DONT MOCK WHAT YOU DONT OWN
      const expectedUrl = `/api/llamas/${fakeLlamaId}`;
      expect(httpAdapterServiceSpy.patch).toHaveBeenCalledWith(
        expectedUrl,
        fakeLlamaChanges
      );
    });
  });
});
