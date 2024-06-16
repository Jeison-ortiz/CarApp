import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { itemReducer } from './store/items.reduces';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(
    {
      items: itemReducer,
    }
  )]
};
