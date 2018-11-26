import { Component, Input } from '@angular/core';
import { Profile } from '../profile-card.service';

@Component({
  selector: 'ar-card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.scss' ]
})
export class ArCardComponent {
  
  @Input() profile: Profile;

}