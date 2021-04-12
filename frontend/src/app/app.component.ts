import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { environment } from './../environments/environment';
import { AppSubRoutes } from './app.subroutes';
import * as AuthActions from './redux/redux-auth/auth.actions';
import * as fromAuth from './redux/redux-auth/auth.reducer';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  public selectedIndex = 1;
  public version = environment.version;
  public user$: Observable<string>;
  public appPages = [
    {
      title: 'Cars',
      url: '/' + AppSubRoutes.cars,
      icon: 'car-sport',
    },
    {
      title: 'Bookings',
      url: '/' + AppSubRoutes.bookings,
      icon: 'book',
    },
    {
      title: 'Login',
      url: '/' + AppSubRoutes.login,
      icon: 'log-in',
    },
    {
      title: 'Google Maps',
      url: '/' + AppSubRoutes.googleMaps,
      icon: 'map',
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private readonly store: Store
  ) {
    this.initializeApp();
  }

  initializeApp(): void {
    void this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.selectedIndex = this.appPages.findIndex((page) =>
          event.urlAfterRedirects.toLowerCase().includes(page.title.toLowerCase())
        );
      }
    });

    this.user$ = this.store.select(fromAuth.selectCurrentUserId);
  }

  navigateExternal(url: string): boolean {
    window.location.href = url;
    return false;
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
