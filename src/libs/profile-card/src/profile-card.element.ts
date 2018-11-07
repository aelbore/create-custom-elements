import { CustomElement, Prop, Watch, Listen } from 'custom-elements-ts';
import { debounceTime, distinctUntilChanged, flatMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Profile, getProfiles } from './profile-card';
import { CardElement } from './card/card.element';

@CustomElement({
  tag: 'profile-card',
  templateUrl: './profile-card.element.html',
  styleUrl: './profile-card.element.scss'
})
export class ProfileCardElement extends HTMLElement {

  @Prop() profiles: Profile[] = [];

  @Watch('profiles')
  async onPropertyChangedProfiles(value: any) {
    if (value.new && Array.isArray(value.new)) {
      const container = this.shadowRoot.querySelector('div.card-container-list');

      const children = Array.from(this.shadowRoot.querySelectorAll('ar-card'));
      await Promise.all(children.map(child => child.remove()));      
      
      const emptyState = this.shadowRoot.querySelector('.empty-state');
      if (value.new.length < 1) {
        if (!emptyState) {
          this.shadowRoot.appendChild(this.createEmptyState());
        }
      } else {
        if (emptyState) {
          emptyState.remove();
        }
        Array.from(value.new).forEach((card: Profile) => {
          const element = <CardElement>document.createElement('ar-card');
          element.profile = card;
  
          container.appendChild(element);
        })
      }
    }
  }
  
  @Listen('ar.change', 'ar-input')
  onInputChanged(e: CustomEvent | any) {
    of(e.detail.value)
      .pipe(debounceTime(700), distinctUntilChanged())
      .pipe(flatMap(text => getProfiles(text)))
      .subscribe(profiles => {
        this.profiles = profiles;
      });  
  }

  connectedCallback() {
    const input: any = this.shadowRoot.querySelector('ar-input');
    getProfiles(input.value).subscribe(profiles => { 
      this.profiles = profiles;
    });
  }

  createEmptyState() {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="empty-state">No Records Found.</div>
    `;
    return document.importNode(template.content, true);
  }

}