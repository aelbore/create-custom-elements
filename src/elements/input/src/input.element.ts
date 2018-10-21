import { CustomElement, Watch, Toggle, Prop, Dispatch, DispatchEmitter, Listen } from 'custom-elements-ts';

@CustomElement({
  tag: 'ar-input',
  templateUrl: './input.element.html',
  styleUrl: './input.element.scss'
})
export class ARInputElement extends HTMLElement {

  @Prop() placeholder;
  @Prop() value;

  @Toggle() disabled;

  @Dispatch('ar.blur') onInputBlurHandler: DispatchEmitter;
  @Dispatch('ar.focus') onInputFocusHandler: DispatchEmitter;
  @Dispatch('ar.change') onInputChangeHandler: DispatchEmitter;

  get formGroup() {
    return this.shadowRoot.querySelector('.ar-form-group');
  }

  get labelElement() {
    return this.formGroup.querySelector('label');
  }

  connectedCallback() {
    this.createChildElement();    
  }

  @Watch('value')
  onPropertyChangedValue(value: any) {
    if (this.labelElement) {
      if (value.new && value.new.length) {
        this.labelElement.classList.add('active');
        return;
      }
      this.labelElement.classList.remove('active');
    }
  }

  @Watch('placeholder')
  onPropertyChangedPlaceholder(value: any) {
    this.labelElement.innerHTML = value.new || '';
  } 

  @Watch('disabled')
  disableElement(_value: any) {
    const textElement = this.formGroup.querySelector('input');
    if (this.disabled) {
      textElement.setAttribute('disabled', '');
    } else {
      textElement.removeAttribute('disabled');
    }
  }

  @Listen('keyup', 'input')
  handleChange(e: CustomEvent | any) {
    this.onInputChangeHandler.emit({ bubbles: true, detail: { value: e.target.value } });
  }

  @Listen('blur', 'input')
  handleBlur(e: CustomEvent | any) {
    this.value = e.target.value;
    this.onInputBlurHandler.emit({ bubbles: true, detail: { value: e.target.value } });
  }

  @Listen('focus', 'input')
  handleFocus(e: CustomEvent | any) {
    this.onInputFocusHandler.emit({ bubbles: true, detail: { value: e.target.value } });
  }

  createChildElement() {
    const template = document.createElement('template');
    template.innerHTML = `
      <input type="text" ${ this.disabled ? 'disabled': '' } class="ar-form-control"></input>
      <label>${this.placeholder}</label>
    `;
    this.formGroup.prepend(document.importNode(template.content, true));
  }

}