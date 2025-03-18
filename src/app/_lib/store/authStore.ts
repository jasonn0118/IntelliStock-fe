import { makeAutoObservable, runInAction } from "mobx";
import { fetchCurrentUser } from "../api/auth";

class AuthStore {
  role: string | null = null;
  email: string | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(role: string, email: string) {
    this.role = role;
    this.email = email;
  }

  logOut() {
    this.role = null;
    this.email = null;
  }

  async hydrateUser() {
    try {
      this.loading = true;
      const user = await fetchCurrentUser();
      if (user) {
        runInAction(() => {
          this.setAuth(user.role, user.email);
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

export default new AuthStore();
