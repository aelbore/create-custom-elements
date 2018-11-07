import { CustomElement, Prop, Watch } from 'custom-elements-ts';

import { Profile } from '../profile-card';

@CustomElement({
  tag: 'ar-card',
  templateUrl: './card.element.html',
  styleUrl: './card.element.scss'
})
export class CardElement extends HTMLElement {

  @Prop() profile: Profile;

  @Watch('profile')
  onPropertyChangedProfiles(value: any) {
    if (value.new) {
      const content = this.shadowRoot.querySelector('div.content');
      content.appendChild(this.createContent(value.new));
    }
  }

  createContent({ name, profession, motto }: Profile) {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="main">
        <h3 class="name">${name}</h3>
        <p class="profession">${profession}</p>
        <p class="text-center">${motto}</p>
      </div>
    `;
    return document.importNode(template.content, true);
  }

}