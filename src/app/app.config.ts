import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { itemReducer } from './store/items.reduces';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({
        items: itemReducer,
    }), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
