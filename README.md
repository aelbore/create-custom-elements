# create-custom-elements
Boilerplate to create custom elements

## Getting Started 

* Clone repository
  ```
  git clone https://github.com/aelbore/create-custom-elements.git
  git checkout star-rating
  ```
* Install dependencies
  ```
  npm install
  ```
* Start the Application
  ```
  npm start
  ```
  - this will build, watch the file changes, live reload and open browser
* Run unit test
  ```
  npm test
  ```

## How to create Custom Elements
* Create folders
  * Create `src/elements`
  * Create `src/elements/<your-element>`. i.e `src/elements/star-rating`
  * Create `src/elements/<your-element>/src`
* Create package.json file `src/elements/<your-element>/package.json` 
  ```json
  {
    "name": "star-rating",
    "version": "1.0.0",
    "description": "Star Rating Element",
    "main": "index.js",
    "repository": {
      "type": "git",
      "url": "git+https://github.com/aelbore/star-rating.git"
    },
    "author": "",
    "license": "ISC",
    "bugs": {
      "url": "https://github.com/aelbore/star-rating/issues"
    },
    "homepage": "https://github.com/aelbore/star-rating#readme"
  }
  ```

* Add Files
  ```
    ├─ elements                           
    |  ├─ <start-rating>                      
    |  |  ├─ src                              
    |  |  |  ├─ index.ts                      
    |  |  |  ├─ start-rating.element.html      
    |  |  |  ├─ start-rating.element.scss      
    |  |  |  └─ start-rating.element.ts       
    |  |  └── package.json                    
  ```
* Add Codes
  * Add Code to `star-rating.element.ts`
    * Add Element using @CustomElement decorator
      ```ts
      import { CustomElement } from 'custom-elements-ts';

      @CustomElement({
        tag: 'star-rating',
        templateUrl: './star-rating.element.html',
        styleUrl: './star-rating.element.scss'
      })
      export class StarRatingElement extends HTMLElement { 

      }
      ```
    * Add @Toggle decorator to `checked` property
      ```ts
      import { CustomElement } from 'custom-elements-ts';

      @CustomElement({
        tag: 'star-rating',
        templateUrl: './star-rating.element.html',
        styleUrl: './star-rating.element.scss'
      })
      export class StarRatingElement extends HTMLElement { 
          
          @Toggle() checked = true;

      }
      ```
    * Add @Watch decorator
      ```ts
      import { CustomElement, Toggle, Watch } from 'custom-elements-ts';

      @CustomElement({
        tag: 'star-rating',
        templateUrl: './star-rating.element.html',
        styleUrl: './star-rating.element.scss'
      })
      export class StarRatingElement extends HTMLElement { 

        @Toggle() checked = true;

        @Watch('checked')
        onPropertyChanged(value: any) {
          const span = this.shadowRoot.querySelector('span');
          if (this.checked) {
            span.classList.add('checked');
          } else {
            span.classList.remove('checked');
          }
        }
        
      }
      ```
    * Add @Listen decorator
      ```ts
      import { CustomElement, Toggle, Watch, Listen } from 'custom-elements-ts';

      @CustomElement({
        tag: 'star-rating',
        templateUrl: './star-rating.element.html',
        styleUrl: './star-rating.element.scss'
      })
      export class StarRatingElement extends HTMLElement { 

        @Toggle() checked = true;

        @Watch('checked')
        onPropertyChanged(value: any) {
          const span = this.shadowRoot.querySelector('span');
          if (this.checked) {
            span.classList.add('checked');
          } else {
            span.classList.remove('checked');
          }
        }

        @Listen('click') 
        onClick(e: CustomEvent) {
          this.checked = !this.checked;
        }
      }
      ```

  * Add markup to `star-rating.element.html`
    ```html
      <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"/>
        </svg>
      </span>    
    ```    

  * Add style to `star-rating.element.scss`
    ```css
      .checked svg {
        fill: orange;
      }
      span svg {
        width: 2%;
      }
    ```

  * Export `star-rating.element.ts` to `index.ts`
    ```ts
    export * from './star-rating.element';
    ``` 

* Update `src/app/app.element.html` markup
  ```html
  <div class="container">
    <star-rating checked></star-rating>
  </div>
  ```

* Add elements script to the `.devtools.json`
  ```json
    "scripts": [
      "main/bundles/main.umd.js",
      "elements/bundles/elements.umd.js"
    ]
  ```

* Run your application.
  ```
  npm start
  ```

* Browse http://localhost:4000

## Project Structure
```
.
├── node_modules 
├── server                                # mock/fake data serve as you api         
├── src                                   # all your code should be inside `src` folder
|   ├─ app                                # Application Project specific folder
|   |  ├─ app.element.html 
|   |  ├─ app.element.scss
|   |  ├─ app.element.ts 
|   |  ├─ index.ts  
|   |  └─ package.json    
|   ├─ elements                               # reusable custom elements 
|   |  ├─ <start-rating>                      # example of web components folder
|   |  |  ├─ src                              # this should mandatory, all source code should be inside `src`
|   |  |  |  ├─ index.ts                      # export .ts file <input.element.ts>
|   |  |  |  ├─ start-rating.element.html     # <optional>, all your markup codes
|   |  |  |  ├─ start-rating.element.scss     # <optional>, all your style codes, you can have `.css`.
|   |  |  |  ├─ start-rating.element.spec.ts  # <optional>, spec file, contain your unit test
|   |  |  |  └─ start-rating.element.ts       # main web component, define your custom elements
|   |  |  └── package.json                    # <mandatory> `name` should be same as folder name
|   |  ├─ .....	 	             
|
|
├── README.md
├── .devtools.json                        # add config for build and server ie. static folders.  
├── rollup.config.js                      # rollup config, override default config.  
├── gulpfile.js                           # customize your build, add task      
├── package.json
└── tsconfig.json
```

##### Delete dist and .tmp folder
```
npm run clean.all
```