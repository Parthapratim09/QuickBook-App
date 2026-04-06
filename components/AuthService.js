import AsyncStorage from "@react-native-async-storage/async-storage";

export const localAuth = {

  register: async (name, email, password) => {
    const user = { name, email, password };
    await AsyncStorage.setItem("user_session", JSON.stringify(user));
    return user;
  },

  login: async (email, password) => {
    const storedUser = await AsyncStorage.getItem("user_session");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === email && user.password === password) {
        return user;
      }
    }
    throw new Error("Invalid email or password");
  },


  logout: async () => {
    await AsyncStorage.removeItem("user_session");
  }
};