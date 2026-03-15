<script setup lang="ts">
import type { BulletinForm } from '../types'

defineProps<{
  form: BulletinForm
  houseAddressOptions: readonly string[]
}>()

defineEmits<{
  print: []
}>()
</script>

<template>
  <aside class="control-panel">
    <h1>Генератор бюллетеня для голосования МКД</h1>
    <p class="intro">
      Заполните основные данные, после чего можно сразу распечатать готовый
      бюллетень для собственников.
    </p>

    <div class="grid">
      <label>
        <span>Адрес дома</span>
        <select v-model="form.houseAddress">
          <option
            v-for="address in houseAddressOptions"
            :key="address"
            :value="address"
          >
            {{ address }}
          </option>
        </select>
      </label>

      <label>
        <span>Управляющая компания</span>
        <input v-model="form.managementCompany" type="text" />
      </label>

      <label>
        <span>НДС УК</span>
        <input v-model="form.vatRate" type="text" />
      </label>

      <label>
        <span>Форма собрания</span>
        <input v-model="form.meetingType" type="text" />
      </label>

      <label>
        <span>Дата собрания</span>
        <input v-model="form.meetingDate" type="text" />
      </label>

      <label>
        <span>Срок сдачи бюллетеня</span>
        <input v-model="form.votingDeadline" type="text" />
      </label>

      <label>
        <span>Собственник</span>
        <input v-model="form.ownerName" type="text" />
      </label>

      <label>
        <span>Квартира / помещение</span>
        <input v-model="form.apartment" type="text" />
      </label>

      <label>
        <span>Площадь</span>
        <input v-model="form.area" type="text" />
      </label>

      <label class="full">
        <span>Документ о праве собственности</span>
        <input v-model="form.ownershipDocument" type="text" />
      </label>

      <label class="full">
        <span>Примечание</span>
        <textarea v-model="form.extraNotes" rows="4"></textarea>
      </label>
    </div>

    <button class="print-button" type="button" @click="$emit('print')">
      Печать бюллетеня
    </button>
  </aside>
</template>

<style scoped>
.control-panel {
  padding: 32px 24px;
  background: rgba(16, 38, 66, 0.9);
  color: #f7f4ec;
  backdrop-filter: blur(14px);
}

.eyebrow {
  margin: 0 0 12px;
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #f8cf79;
}

.control-panel h1 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.1rem);
  line-height: 1;
}

.intro {
  margin: 16px 0 24px;
  max-width: 34ch;
  color: rgba(247, 244, 236, 0.84);
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.grid label {
  display: grid;
  gap: 6px;
}

.grid label.full {
  grid-column: 1 / -1;
}

.grid span {
  font-size: 0.9rem;
  color: rgba(247, 244, 236, 0.74);
}

.grid input,
.grid select,
.grid textarea {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  color: #fffaf0;
}

.grid input:focus,
.grid select:focus,
.grid textarea:focus {
  outline: 2px solid rgba(248, 207, 121, 0.65);
  outline-offset: 1px;
}

.print-button {
  margin-top: 22px;
  border: 0;
  border-radius: 999px;
  padding: 14px 20px;
  background: linear-gradient(135deg, #f8cf79, #e7a53b);
  color: #142033;
  font-weight: 700;
  cursor: pointer;
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

@media print {
  .control-panel {
    display: none;
  }
}
</style>
