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
      content.appendChild(this.createContent(CardElement.fromJson(value.new)));
    }
  }

  createContent(content: Profile) {
    const template = document.createElement('template');
    template.innerHTML = `
      <div class="main">
        <h3 class="name">${content.name}</h3>
        <p class="profession">${content.profession}</p>
        <p class="text-center">${content.motto}</p>
      </div>
    `;
    return document.importNode(template.content, true);
  }

  static fromJson(str) {
    let obj = null;
    if (typeof str == "string") {
      try {
        obj = JSON.parse(str);
      } catch (e) {
        throw new Error("Invalid JSON string provided. ");
      }
    }
    return obj;
}

}