import { createPinia, defineStore } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export const GlobalStore = defineStore('GlobalState', {
  state: () => ({
    token: '',
    userInfo: {},
  }),
  getters: {},
  actions: {},
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
