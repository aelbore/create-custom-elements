import './input.element'

import { expect, assert } from 'chai'

describe('ARElement', () => {
  let element;

  beforeEach(() => {
    const arInput = document.createElement('ar-input');
    element = document.body.appendChild(arInput);
  })

  afterEach(() => {
    document.body.querySelector('ar-input').remove();
  })

  it('should have element', () => {
    assert.ok(element)
  })

  it('should change placeholder attribute', () => {
    element.placeholder = 'First Name';
    expect(element.labelElement.innerHTML).to.equal('First Name');
    
    element.setAttribute('placeholder', 'Last Name');
    expect(element.labelElement.innerHTML).to.equal('Last Name');
  })

  it('should change disabled attribute', () => {
    element.disabled = true;
    expect(element.shadowRoot.querySelector('input').disabled).to.equal(true)
    
    element.setAttribute('disabled', 'false');
    expect(element.shadowRoot.querySelector('input').disabled).to.equal(false)
  })

  it('should add/remove active class on label', () => {
    element.placeholder = 'Name';
    element.value = 'John Doe';
    assert.ok(element.labelElement.classList.contains('active'))

    element.value = '';
    expect(element.labelElement.classList.contains('active')).to.equal(false)
  })

  it('should emit ar.change event', (done) => {
    const inputEvent = new Event('keyup');
    const inputElem = element.shadowRoot.querySelector('input');
    element.value = 'keyup';
    element.addEventListener('ar.change', e => {
      assert.ok(e.detail.value)
      done();
    });
    inputElem.dispatchEvent(inputEvent);
  })

  it('should emit ar.blur event', (done) => {
    const inputEvent = new Event('blur');
    const inputElem = element.shadowRoot.querySelector('input');
    element.addEventListener('ar.blur', e => {
      assert.ok(e.detail)
      done();
    });
    inputElem.dispatchEvent(inputEvent);
  })

  it('should emit ar.focus event', (done) => {
    const inputEvent = new Event('focus');
    const inputElem = element.shadowRoot.querySelector('input');
    element.addEventListener('ar.focus', e => {
      assert.ok(e.detail)
      done();
    });
    inputElem.dispatchEvent(inputEvent);
  })

})