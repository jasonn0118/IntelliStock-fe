import authStore from "../store/authStore";

interface SignUpUser {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export async function signUpUserWithEmailAndPassword({
  email,
  password,
  firstName,
  lastName,
}: SignUpUser) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, firstName, lastName }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to sign up");
    }

    const data = await response.json();

    authStore.setAuth(data.role, email, data.firstName, data.lastName);

    return data;
  } catch (error) {
    console.error("Failed to sign up", error);
  }
}

export async function signInUserWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    authStore.setAuth(data.role, email, data.firstName, data.lastName);

    return data;
  } catch (error) {
    console.error("Failed to sign in", error);
  }
}

export async function signOutUser() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to sign out");
    }

    return true;
  } catch (error) {
    console.error("Failed to sign out", error);
  }
}

export async function fetchCurrentUser() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 401) {
      console.log("User not logged in");
      return null;
    }
    if (!response.ok) return null;

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}

export const handleOAuthLogin = (provider: "google" | "github") => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}`;
};
