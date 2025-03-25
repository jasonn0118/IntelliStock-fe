import { makeAutoObservable, runInAction } from "mobx";

import { fetchCurrentUser, signOutUser } from "../api/auth";

class AuthStore {
  role: string | null = null;
  email: string | null = null;
  firstName?: string | null = null;
  lastName?: string | null = null;
  loading: boolean = false;
  hydrated: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(role: string, email: string, firstName?: string, lastName?: string) {
    this.role = role;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.hydrated = true;
  }

  async signOut() {
    const success = await signOutUser();
    if (success) {
      runInAction(() => {
        this.role = null;
        this.email = null;
        this.firstName = null;
        this.lastName = null;
        this.hydrated = false;
      });
    }
  }

  async hydrateUser() {
    try {
      this.loading = true;
      const user = await fetchCurrentUser();
      if (user) {
        runInAction(() => {
          this.setAuth(user.role, user.email, user.firstName, user.lastName);
        });
      }
    } catch (error) {
      console.error("Error hydrating user", error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

// Create a singleton instance
const authStore = new AuthStore();

export default authStore;
