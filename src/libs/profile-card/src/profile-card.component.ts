import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';

import { of } from 'rxjs';
import { distinctUntilChanged, debounceTime, flatMap } from 'rxjs/operators';

import { Profile } from './profile-card.service';
import { ArProfileCardService } from './profile-card.service';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: [ './profile-card.component.scss' ],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ArProfileCardComponent implements OnInit {

  profiles: Profile[]

  constructor(private profileCard: ArProfileCardService, private cd: ChangeDetectorRef) { }
  
  ngOnInit(): void {
    this.profileCard.getProfiles("")
      .subscribe(profiles => {
        this.profiles = profiles;
        this.cd.detectChanges();
      })
  }

  onSearch(e: CustomEvent) {
    of(e.detail.value)
      .pipe(debounceTime(700), distinctUntilChanged())
      .pipe(flatMap(text => this.profileCard.getProfiles(text)))
      .subscribe(profiles => {
        this.profiles = profiles;
        this.cd.detectChanges();
      })
  }

}