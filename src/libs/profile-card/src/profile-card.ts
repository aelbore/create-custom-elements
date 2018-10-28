
import { from, Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

interface Profile {
  name: string;
  profession: string;
  motto: string;
}

const getProfiles = (name?: string): Observable<Profile[]> => {
  return from(fetch('/api/profiles'))
    .pipe(flatMap(response => response.json()))
    .pipe(flatMap(data => {
      return of(data.filter(profile => {
        const value = name ? name.toLowerCase(): '';
        return profile.name.toLowerCase().includes(value);
      }))
    }))
}

export { Profile, getProfiles }
