import { CustomElement, Prop, Watch } from 'custom-elements-ts';
import { debounceTime, distinctUntilChanged, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Profile, getProfiles } from './profile-card';
import { CardElement } from './card/card.element';

@CustomElement({
  tag: 'profile-card',
  templateUrl: './profile-card.element.html',
  styleUrl: './profile-card.element.scss',
  shadow: false
})
export class ProfileCardElement extends HTMLElement {

  @Prop() profiles: Profile[] = [];

  @Watch('profiles')
  async onPropertyChangedProfiles(value: any) {
    if (value.new && Array.isArray(value.new)) {
      const container = this.querySelector('div.container');

      const children = Array.from(this.querySelectorAll('ar-card'));
      await Promise.all(children.map(child => child.remove()));      
      
      const emptyState = container.querySelector('.empty-state');
      if (value.new.length < 1) {
        if (!emptyState) {
          container.appendChild(this.createEmptyState());
        }
      } else {
        if (emptyState) {
          emptyState.remove();
        }
        Array.from(value.new).forEach((card: Profile) => {
          const element = <CardElement>document.createElement('ar-card');
          element.classList.add(`col-md-3`)
          element.profile = card;
  
          container.appendChild(element);
        })
      }
    }
  }

  connectedCallback() {
    const input: any = this.querySelector('ar-input');
    getProfiles(input.value).subscribe(profiles => { 
      this.profiles = profiles;
    });

    input.addEventListener('ar.change', function(e: CustomEvent | any) {
      of(e.detail.value)
        .pipe(debounceTime(700), distinctUntilChanged())
        .pipe(flatMap(text => getProfiles(text)))
        .subscribe(profiles => {
          this.profiles = profiles;
        });    
    }.bind(this))
  }

  createEmptyState() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="empty-state"
        style="text-align: center;border: 1px solid lightgray;padding: 20px">
        No Records Found.
      </div>
    `;
    return document.importNode(template.content, true);
  }

}