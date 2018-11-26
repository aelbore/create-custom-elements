import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ArProfileCardComponent } from './profile-card.component';
import { ArProfileCardService } from './profile-card.service';
import { ArCardComponent } from './card/card.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ ArProfileCardComponent, ArCardComponent ],
  providers: [ ArProfileCardService ],
  entryComponents: [ ArProfileCardComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ArProfileCardModule {  
  ngDoBootstrap() { }
}


if (!(customElements.get('profile-card'))) {
  platformBrowserDynamic()
    .bootstrapModule(ArProfileCardModule)
    .then(({ injector }) => {
      const ArProfileCardElement = createCustomElement(ArProfileCardComponent, { injector: injector });
      customElements.define('profile-card', ArProfileCardElement);
    });
}