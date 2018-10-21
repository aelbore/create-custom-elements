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

})