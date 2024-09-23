<template>
  <v-app>
    <Header />

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { auth } from './firebase';
import { ref, onMounted } from 'vue';
import { useBudgetStore } from './stores/budget';

export default {
  components: { Header, Footer },
  setup() {
    const user = ref(null);
    const budgetStore = useBudgetStore();

    onMounted(() => {
      auth.onAuthStateChanged(async (u) => {
        user.value = u;
        if (u) {
          await budgetStore.fetchData();
        }
      });
    });

    return { user, budgetStore };
  },
};
</script>

<style></style>
