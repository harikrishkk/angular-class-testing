import { HttpClientModule } from '@angular/common/http';
import { TestBed, fakeAsync } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { HttpAdapterService } from './http-adapter.service';
import serverMock from 'xhr-mock';

describe('HttpAdapterService', () => {
  let serviceUnderTest: HttpAdapterService;
  let actualResult: any;

  Given(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HttpAdapterService]
    });
    serviceUnderTest = TestBed.inject(HttpAdapterService);
    actualResult = undefined;
    serverMock.setup();
  });

  afterEach(() => {
    serverMock.teardown();
  });

  describe('Method patch', () => {
    let fakeUrlArg: string;
    let fakeBodyArg: any;
    let expectedReturnedResult: any;
    let actualBodySent: any;
    Given(() => {
      fakeUrlArg = '';
      fakeBodyArg = {
        fake: 'body'
      };

      expectedReturnedResult = {
        fake: 'result'
      };

      serverMock.patch(fakeUrlArg, (req, res) => {
        actualBodySent = JSON.parse(req.body());
        return res.status(200).body(JSON.stringify(expectedReturnedResult));
      });
    });
    When(
      fakeAsync(async () => {
        actualResult = await serviceUnderTest.patch(fakeUrlArg, fakeBodyArg);
      })
    );

    Then(() => {
      expect(actualResult).toEqual(expectedReturnedResult);
    });
  });
});
