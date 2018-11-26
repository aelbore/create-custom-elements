import { Injectable } from '@angular/core';

import { Observable, from, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { profiles } from './profiles';

export interface Profile {
  name: string;
  profession: string;
  motto: string;
}

@Injectable()
export class ArProfileCardService {

  getProfiles(username: string): Observable<Profile[]> {
    return of(profiles.filter(profile => {
      const value = username ? username.toLowerCase(): '';
      return profile.name.toLowerCase().includes(value);
    }))
  }

}