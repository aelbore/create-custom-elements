# create-custom-elements
Boilerplate to create custom elements

## Getting Started 

* Clone repository
  ```
  git clone https://github.com/aelbore/create-custom-elements.git
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

<br />

## Step by Step example
* [ Star Rating ](https://github.com/aelbore/create-custom-elements/tree/star-rating)
* [ Vanilla Javascript ](https://github.com/aelbore/create-custom-elements/tree/vanilla-js)

## Demo
* [ plnkr ](https://next.plnkr.co/edit/CvFYOqAWzoTM6P4L)
* [ stackblitz ](https://stackblitz.com/edit/typescript-ycfbcu?file=star-rating.element.ts)
* [ codesandbox ](https://codesandbox.io/s/vqwk9011o5)

<br />

### Project Structure
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
|   ├─ elements                           # reusable custom elements 
|   |  ├─ <input>                         # example of web components folder
|   |  |  ├─ src                          # this should mandatory, all source code should be inside `src`
|   |  |  |  ├─ index.ts                  # export .ts file <input.element.ts>
|   |  |  |  ├─ input.element.html        # <optional>, all your markup codes
|   |  |  |  ├─ input.element.scss        # <optional>, all your style codes, you can have `.css`.
|   |  |  |  ├─ input.element.spec.ts     # <optional>, spec file, contain your unit test
|   |  |  |  └─ input.element.ts          # main web component, define your custom elements
|   |  |  └── package.json                # <mandatory> `name` should be same as folder name
|   |  ├─ .....	 	             
|   |  |  
|   ├─ libs
|      ├─ <profile-card>                   # library or micro-app web components
|      |  ├─ src                           # this should mandatory, all source code should be inside `src`
|      |  |  ├─ index.ts                   # <mandatory> export .ts file <profile-card.element.ts>
|      |  |  ├─ profile-card.element.html  # <optional>, all your markup codes
|      |  |  ├─ profile-card.element.scss  # <optional>, all your style codes, you can have `.css`.
|      |  |  ├─ profile-card.element.ts    # <mandatory> main web component, define your custom elements
|      |  |  └─ profile-card.ts            # <optional> define your model, service or utils here.
|      |  └── package.json                 # <mandatory> `name` should be same as folder name
|      ├─ .....	
|
|
├── README.md
├── .devtools.json                        # add config for build and server ie. static folders.  
├── rollup.config.js                      # rollup config, override default config.  
├── gulpfile.js                           # customize your build, add task      
├── package.json
└── tsconfig.json
```

<br />

##### Delete dist and .tmp folder
```
npm run clean.all
```
