# create-custom-elements
Boilerplate to create custom elements

<br />

### [Stackblitz Demo](https://stackblitz.com/edit/typescript-ycfbcu)

<br />


## Getting Started 

* Clone repository
  ```
  git clone https://github.com/aelbore/create-custom-elements.git
  git checkout vanilla-js
  ```
* Install dependencies
  ```
  npm install
  ```
* Start the Application
  ```
  npm start
  ```
  - this will build, watch the file changes, live reload
* Run unit test
  ```
  npm test
  ```

## How to create Custom Elements
* Create `dist` folder
* Create file `star-rating-vanilla.js` in `dist` folder
* Define your element
  ```js
  class StarRatingVanilla extends HTMLElement {

  }

  customElements.define('star-rating-vanilla', StarRatingVanilla);
  ```

* Attach shadowDOM for markup, styles and behavior encapsulation
  ```js
  class StarRatingVanilla extends HTMLElement {
    
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }

  }

  customElements.define('star-rating-vanilla', StarRatingVanilla);
  ```

* Add Attributes and Property
  ```js
  class StarRatingVanilla extends HTMLElement {
    
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }   
    
    static get observedAttributes() {
      return [ 'checked' ];
    }

    get checked() {
      return this.hasAttribute('checked');
    }

    set checked(value) {
      const span = this.shadowRoot.querySelector('span');
      if (span) {
        if (value) {
          span.classList.add('checked');
        } else {
          span.classList.remove('checked');
        }
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch(name) {
        case 'checked':
          this.checked = this.checked;
          break;
      }
    }

  }

  customElements.define('star-rating-vanilla', StarRatingVanilla);
  ```

* Add markup and styles
  ```js
  class StarRatingVanilla extends HTMLElement {
    
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }   
    
    static get observedAttributes() {
      return [ 'checked' ];
    }

    get checked() {
      return this.hasAttribute('checked');
    }

    set checked(value) {
      const span = this.shadowRoot.querySelector('span');
      if (span) {
        if (value) {
          span.classList.add('checked');
        } else {
          span.classList.remove('checked');
        }
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch(name) {
        case 'checked':
          this.checked = this.checked;
          break;
      }
    }

    connectedCallback() {
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          span:hover {
            cursor: pointer;
          }

          .checked svg {
            fill: orange;
          }

          span svg {
            width: 15%;
          }
        </style>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
          </svg>
        </span>
      `;
      this.shadowRoot.appendChild(template.content);
    }   

  }

  customElements.define('star-rating-vanilla', StarRatingVanilla);
  ```

* Adding event
  ```js
  class StarRatingVanilla extends HTMLElement {
    
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }   
    
    static get observedAttributes() {
      return [ 'checked' ];
    }

    get checked() {
      return this.hasAttribute('checked');
    }

    set checked(value) {
      const span = this.shadowRoot.querySelector('span');
      if (span) {
        if (value) {
          span.classList.add('checked');
        } else {
          span.classList.remove('checked');
        }
      }
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch(name) {
        case 'checked':
          this.checked = this.checked;
          break;
      }
    }

    connectedCallback() {
      const template = document.createElement('template');
      template.innerHTML = `
        <style>
          span:hover {
            cursor: pointer;
          }

          .checked svg {
            fill: orange;
          }
          
          span svg {
            width: 15%;
          }
        </style>
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
          </svg>
        </span>
      `;
      this.shadowRoot.appendChild(template.content);

      this.addEventListener('click', function(e) {
        if (this.checked) {
          this.removeAttribute('checked');
        } else {
          this.setAttribute('checked', '')
        }
      }.bind(this));
    }   

  }

  customElements.define('star-rating-vanilla', StarRatingVanilla);
  ```  

* Add `star-rating-vanilla.js` as a scripts in `.devtools.json`
  ```json
    "scripts": [
      "star-rating-vanilla.js",
      "main/bundles/main.umd.js"
    ]
  ```

* Update `src/app.element.html`
  ```html
  <div class="container">
    <star-rating-vanilla></star-rating-vanilla>
  </div>
  ```

* Start the Application
  ```
  npm start -- --open 
  ```


##### Delete dist and .tmp folder
```
npm run clean.all
```
