import authStore from "../store/authStore";

export async function signInUserWithEmailAndPassword(
  email: string,
  password: string
) {
  try {
    const response = await fetch("http://localhost:3000/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();

    authStore.setAuth(data.role, email);

    return data;
  } catch (error) {
    console.error("Failed to sign in", error);
  }
}

export async function fetchCurrentUser() {
  try {
    const response = await fetch("http://localhost:3000/auth/me", {
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
