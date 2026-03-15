<script setup lang="ts">
import { computed, reactive } from 'vue'
import BulletinSheet from './components/BulletinSheet.vue'
import ControlPanel from './components/ControlPanel.vue'
import {
  buildQuestions,
  createDefaultForm,
  houseAddressOptions,
} from './data/bulletin'

const form = reactive(createDefaultForm())

const questions = computed(() => buildQuestions(form))

const printableDate = computed(() =>
  new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date()),
)

function printPage(): void {
  window.print()
}
</script>

<template>
  <div class="page-shell">
    <ControlPanel
      :form="form"
      :house-address-options="houseAddressOptions"
      @print="printPage"
    />
    <BulletinSheet
      :form="form"
      :questions="questions"
      :printable-date="printableDate"
    />
  </div>
</template>

<style scoped>
.page-shell {
  display: grid;
  grid-template-columns: minmax(320px, 430px) minmax(0, 1fr);
  min-height: 100vh;
}

@media (max-width: 980px) {
  .page-shell {
    grid-template-columns: 1fr;
  }
}

@media print {
  .page-shell {
    display: block;
  }
}
</style>
