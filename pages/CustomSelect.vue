<template>
  <div class="custom-select">
    <v-select
      :items="options"
      v-model="selectedOption"
      label="Оберіть опцію"
    ></v-select>
    <p>Ви вибрали: {{ selectedOption }}</p>
  </div>
</template>

<script>
export default {
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
  model: {
    prop: 'value',
    event: 'input',
  },
  computed: {
    selectedOption: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
