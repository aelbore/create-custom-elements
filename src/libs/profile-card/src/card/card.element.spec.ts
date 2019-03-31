import './card.element'

import { CardElement } from './card.element';

describe('CardElement', () => {
  let element

  beforeEach(() => {
    const arInput = document.createElement('ar-card');
    element = document.body.appendChild(arInput);
  })

  afterEach(() => {
    document.body.removeChild(element)
  })

  it('should have shadowRoot.', () =>{
    expect(element.shadowRoot).toBeTruthy();
  })

  it(`should have card element.`, () => {
    expect(element).toBeTruthy();
  })

  it(`should createContent.`, () => {
    const profile = {
      name: 'Arjay Elbore',
      profession: 'Framework Developer',
      motto: 'I never wanted to be famous, I wanted to be great.'
    }
    const content = (element as CardElement).createContent(profile);

    const node = content.querySelector('.main');
    expect(node).toBeTruthy();
    expect(node.querySelector('h3').innerHTML).toEqual(profile.name);
    expect(node.querySelector('p.profession').innerHTML).toEqual(profile.profession);
    expect(node.querySelector('p.text-center').innerHTML).toEqual(profile.motto);
  })

  it(`should append the content.`, () => {
    const profile = {
      name: 'Arjay Elbore',
      profession: 'Framework Developer',
      motto: 'I never wanted to be famous, I wanted to be great.'
    }

    element.onPropertyChangedProfiles({ new: profile });
    
    const main = element.shadowRoot.querySelector('.main');
    expect(main).toBeTruthy();
  })

})