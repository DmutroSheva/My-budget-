<template>
  <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-card-title>Форма введення даних</v-card-title>
    <v-card-text>
      <v-form @submit.prevent="submitForm">
        <v-text-field
          v-model="formData.name"
          label="Ім'я"
          :rules="[rules.required]"
          required
        ></v-text-field>
        <v-text-field
          v-model="formData.age"
          label="Вік"
          type="number"
          :rules="[rules.required, rules.age]"
          required
        ></v-text-field>
        <v-checkbox
          v-model="formData.acceptTerms"
          label="Погоджуюсь з умовами"
          :rules="[rules.required]"
        ></v-checkbox>
        <v-alert
          v-if="formErrors.length"
          type="error"
          class="mb-4"
        >
          <ul>
            <li
              v-for="(error, index) in formErrors"
              :key="index"
            >
              {{ error }}
            </li>
          </ul>
        </v-alert>
        <v-btn
          type="submit"
          color="primary"
        >
          Надіслати
        </v-btn>
      </v-form>
    </v-card-text>
    <v-btn
      type="submit"
      color="primary"
      @click="goToIncomeTracker"
    >
      Пагинация
    </v-btn>
  </v-card>
  <div
    class="mx-auto"
    max-width="200"
  >
    <v-btn
      type="submit"
      color="primary"
      @click="counter++"
    >
      +
    </v-btn>
    <v-btn
      type="submit"
      color="primary"
      @click="counter--"
      :disabled="counter <= 0"
    >
      -
    </v-btn>
    <v-text-field
      v-model="counter"
      type="number"
      readonly
    ></v-text-field>
  </div>
  <v-switch
    v-model="isActive"
    label="Статус"
    color="primary"
    hide-details
  ></v-switch>
  <p>Статус: {{ isActive ? 'Активний' : 'Неактивний' }}</p>
  <div>
    <CustomSelect
      v-model="selected"
      :options="options"
    ></CustomSelect>
    <p>Обрана опція в батьківському компоненті: {{ selected }}</p>
  </div>
  <div>
    <v-text-field
      v-model="userInput"
      label="Введіть текст"
    ></v-text-field>
    <div :class="{ 'text-success': isValid, 'text-danger': !isValid }">
      Статус: {{ isValid ? 'Вірний' : 'Невірний' }}
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import CustomSelect from '../pages/CustomSelect.vue';

export default {
  components: { CustomSelect },
  // 4. Программная навигация (Programmatic Navigation)
  methods: {
    // Метод для программной навигации
    goToIncomeTracker() {
      this.$router.push('/IncomeTracker'); // Программное перенаправление на маршрут /IncomeTracker
    },
  },

  setup() {
    const formData = ref({
      name: '',
      age: '',
      acceptTerms: false,
    });
    const userInput = ref('');
    const isValid = computed(() => userInput.value.length > 5);
    const counter = ref(0);
    const isActive = ref(false);
    const isActiveText = computed(() =>
      isActive.value ? 'Активний' : 'Неактивний'
    );

    const formErrors = ref([]);

    const rules = {
      required: (value) => !!value || 'Обов’язкове поле',
      age: (value) => value >= 18 || 'Вік повинен бути 18 або більше',
    };

    const submitForm = () => {
      formErrors.value = [];

      // Валідація форми вручну
      if (!formData.value.name) formErrors.value.push("Ім'я обов'язкове.");
      if (!formData.value.age || formData.value.age < 18)
        formErrors.value.push('Вік повинен бути 18 або більше.');
      if (!formData.value.acceptTerms)
        formErrors.value.push('Ви повинні погодитись з умовами.');

      if (formErrors.value.length === 0) {
        // Виконати необхідні дії після валідації
        alert('Форма успішно надіслана!');
      }
    };

    return {
      formData,
      formErrors,
      rules,
      submitForm,
      counter,
      isActive,
      isActiveText,
      userInput,
      isValid,
      selected: '',
      options: ['Опція 1', 'Опція 2', 'Опція 3'],
    };
  },
};
</script>
