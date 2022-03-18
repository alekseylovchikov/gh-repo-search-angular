import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, createHttpLink } from '@apollo/client/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { SearchModule } from './search/search.module';

const link = createHttpLink({
  uri: environment.graphQLUrl,
});

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    SearchModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: () => ({
        cache: new InMemoryCache(),
        link,
      }),
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
