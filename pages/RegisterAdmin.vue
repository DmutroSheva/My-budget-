<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-title>Регистрация Админа</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="registerAdmin">
        <v-text-field
          v-model="email"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Пароль"
          type="password"
          required
        ></v-text-field>
        <v-alert
          v-if="error"
          type="error"
          class="mb-4"
        >
          {{ error }}
        </v-alert>
        <v-btn
          type="submit"
          color="primary"
        >
          Зарегистрировать Админа
        </v-btn>
      </v-form>
      <router-link to="/Login">Уже есть аккаунт? Войти</router-link>
    </v-card-text>
  </v-card>
</template>

<script>
import { ref } from 'vue';
import { auth, db } from '@/firebase'; // Подключаем инициализацию Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Подключаем Firestore
import { useRouter } from 'vue-router';

export default {
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();

    const registerAdmin = async () => {
      try {
        error.value = '';
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        const user = userCredential.user;

        // Сохраняем данные администратора в Firestore
        await setDoc(doc(db, 'users', user.uid), {
          email: user.email,
          role: 'admin', // Добавляем роль администратора
        });

        // Перенаправление на админскую панель
        router.push('/admin');
      } catch (err) {
        error.value = 'Ошибка регистрации: ' + err.message;
      }
    };

    return { email, password, error, registerAdmin };
  },
};
</script>
