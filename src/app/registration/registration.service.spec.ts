import { TestBed, fakeAsync } from '@angular/core/testing';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';

import { RegistrationService } from './registration.service';
import { appRoutesNames } from '../app.routes.names';
import { RegistrationDetails } from '../_types/registration-details.type';

import { LlamaRemoteService } from '../_services/llama-remote/llama-remote.service';

describe('RegistrationService', () => {
  let actualResult: any;
});
