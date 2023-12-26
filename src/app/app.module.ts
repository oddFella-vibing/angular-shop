import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LogInComponent } from './pages/log-in/log-in.component';

import { FormsModule } from '@angular/forms';
import { environment } from './environments/environment';
import { ErrorComponent } from './pages/error/error.component';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';
import { ShoppingListItemComponent } from './components/shopping-list-item/shopping-list-item.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { PostNewItemComponent } from './components/post-new-item/post-new-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationBarComponent,
    SignUpComponent,
    LogInComponent,

    ErrorComponent,

    ProfileComponent,
    ShoppingListItemComponent,
    CategoriesComponent,
    PostNewItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
