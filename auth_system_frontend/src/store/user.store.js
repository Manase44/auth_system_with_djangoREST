import { create } from "zustand";

const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  setUser: (passedData) => {
    set({ user: passedData });
    if (passedData) {
      localStorage.setItem("user", JSON.stringify(passedData));
    } else {
      localStorage.removeItem("user");
    }
  },
}));

export default useUserStore;
