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
|   ├─ elements                           # custom elements or web components library     
|      ├─ <input>                         # example of web components folder
|      |  ├─ src                          # this should mandatory, all source code should be inside `src`
|      |  |  ├─ index.ts                  # export .ts file <input.element.ts>
|      |  |  ├─ input.element.html        # <optional>, all your markup codes
|      |  |  ├─ input.element.scss        # <optional>, all your style codes, you can have `.css`.
|      |  |  ├─ input.element.spec.ts     # <optional>, spec file, contain your unit test
|      |  |  └─ input.element.ts          # main web component, define your custom elements
|      |  └── package.json                # <mandatory> `name` should be same as folder name
|      ├─ .....	 	             
|       
|  
├── README.md
├── .devtools.json                        # add config for build and server ie. static folders, proxyServers.  
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