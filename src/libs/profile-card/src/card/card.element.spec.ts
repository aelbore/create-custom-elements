import './card.element'

import { CardElement } from './card.element'
import { expect, assert } from 'chai'

describe('CardElement', () => {
  let element: CardElement

  beforeEach(() => {
    element = document.createElement('ar-card') as CardElement;
    document.body.appendChild(element);
  })

  afterEach(() => {
    document.body.removeChild(element)
  })

  it('should have shadowRoot.', () =>{
    assert.ok(element.shadowRoot)
  })

  it(`should have card element.`, () => {
    assert.ok(element)
  })

  it(`should createContent.`, () => {
    const profile = {
      name: 'Arjay Elbore',
      profession: 'Framework Developer',
      motto: 'I never wanted to be famous, I wanted to be great.'
    }
    const content = element.createContent(profile)

    const node = content.querySelector('.main');
    assert.ok(node)
    expect(node.querySelector('h3').innerHTML).to.equal(profile.name);
    expect(node.querySelector('p.profession').innerHTML).to.equal(profile.profession);
    expect(node.querySelector('p.text-center').innerHTML).to.equal(profile.motto);
  })

  it(`should append the content.`, () => {
    const profile = {
      name: 'Arjay Elbore',
      profession: 'Framework Developer',
      motto: 'I never wanted to be famous, I wanted to be great.'
    }

    element.onPropertyChangedProfiles({ new: profile });
    
    const main = element.shadowRoot.querySelector('.main');
    assert.ok(main)
  })

})