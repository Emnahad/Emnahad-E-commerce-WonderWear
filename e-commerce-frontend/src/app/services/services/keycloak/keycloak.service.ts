import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from '../user-profile';

@Injectable({
  providedIn: 'root',
})
export class KeycloakService {
  private _keycloak: Keycloak | undefined;
  private _profile: UserProfile | undefined;

  constructor() {
    this._keycloak = new Keycloak({
      url: 'http://localhost:9090',
      realm: 'e-commerce-wonderwear',
      clientId: 'bsn',
    });
  }

  get keycloak() {
    return this._keycloak!;
  }

  get profile(): UserProfile | undefined {
    return this._profile;
  }

  async init() {
    if (!this._keycloak) {
      throw new Error('Keycloak instance is not initialized.');
    }

    console.log('Authenticating the user...');
    const authenticated = await this._keycloak.init({
      onLoad: 'login-required',
    });

    if (authenticated) {
      this._profile = (await this._keycloak.loadUserProfile()) as UserProfile;
      this._profile.token = this._keycloak.token || '';
    }
  }

  login() {
    return this._keycloak?.login();
  }

  logout() {
    return this._keycloak?.logout({ redirectUri: 'http://localhost:4200' });
  }
}
