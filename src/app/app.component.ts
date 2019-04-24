import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls : ['app.component.scss']
})
export class AppComponent {
  private auth;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private Auth: AuthenticationService,
    private route: Router,
    private store : Storage
  ) {
    this.initializeApp();
    this.auth = this.Auth.getAuthUser;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //set the token
      this.store.get('__accessToken').then(AuthToken => {
        this.Auth.setToken(AuthToken);
      })
      this.store.get('authUser').then(user => {
        this.Auth.setAuthUser(user);
      })
    });

  }
  get AuthUser(){
    return this.auth;
  }
}
