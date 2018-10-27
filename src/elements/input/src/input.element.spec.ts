import './input.element';

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
    expect(element).toBeTruthy();
  })

  it('should change placeholder attribute', () => {
    element.placeholder = 'First Name';
    expect(element.labelElement.innerHTML).toEqual('First Name');
    
    element.setAttribute('placeholder', 'Last Name');
    expect(element.labelElement.innerHTML).toEqual('Last Name');
  })

  it('should change disabled attribute', () => {
    element.disabled = true;
    expect(element.shadowRoot.querySelector('input').disabled).toBeTruthy();
    
    element.setAttribute('disabled', 'false');
    expect(element.shadowRoot.querySelector('input').disabled).toBeFalsy();
  })

  it('should add/remove active class on label', () => {
    element.placeholder = 'Name';
    element.value = 'John Doe';
    expect(element.labelElement.classList.contains('active')).toBeTruthy();

    element.value = '';
    expect(element.labelElement.classList.contains('active')).toBeFalsy();
  })

  it('should emit ar.change event', (done) => {
    const inputEvent = new Event('keyup');
    const inputElem = element.shadowRoot.querySelector('input');
    element.value = 'keyup';
    element.addEventListener('ar.change', e => {
      expect(e.detail.value).toBeDefined('keyup');
      done();
    });
    inputElem.dispatchEvent(inputEvent);
  })

  it('should emit ar.blur event', (done) => {
    const inputEvent = new Event('blur');
    const inputElem = element.shadowRoot.querySelector('input');
    element.addEventListener('ar.blur', e => {
      expect(e.detail).toBeDefined();
      done();
    });
    inputElem.dispatchEvent(inputEvent);
  })

  it('should emit ar.focus event', (done) => {
    const inputEvent = new Event('focus');
    const inputElem = element.shadowRoot.querySelector('input');
    element.addEventListener('ar.focus', e => {
      expect(e.detail).toBeDefined();
      done();
    });
    inputElem.dispatchEvent(inputEvent);
  })

})