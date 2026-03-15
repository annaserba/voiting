<script setup lang="ts">
import type { BulletinForm } from '../types'

type DocumentView = 'bulletin' | 'notice'

defineProps<{
  form: BulletinForm
  houseAddressOptions: readonly string[]
  currentDocument: DocumentView
  latestNoticeDate: string
  maxVotingEndDate: string
  durationWarning: string
  noticeWarning: string
}>()

defineEmits<{
  print: []
  'update:current-document': [value: DocumentView]
}>()
</script>

<template>
  <aside class="control-panel">
    <h1>Генератор бюллетеня для голосования МКД</h1>
    <p class="intro">
      Заполните основные данные, после чего можно сразу распечатать
      уведомление о проведении собрания и готовый бюллетень для собственников.
    </p>

    <div class="grid">
      <label>
        <span>Показывать документ</span>
        <select
          :value="currentDocument"
          @change="
            $emit(
              'update:current-document',
              ($event.target as HTMLSelectElement).value as DocumentView,
            )
          "
        >
          <option value="bulletin">Бюллетень</option>
          <option value="notice">Уведомление</option>
        </select>
      </label>

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
        <span>Дата уведомления</span>
        <input v-model="form.noticeDate" :max="latestNoticeDate" type="date" />
      </label>

      <label>
        <span>Дата начала голосования</span>
        <input v-model="form.votingStartDate" type="date" />
      </label>

      <label>
        <span>Дата окончания голосования</span>
        <input
          v-model="form.votingEndDate"
          :min="form.votingStartDate"
          :max="maxVotingEndDate"
          type="date"
        />
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

      <div class="full rules-card">
        <p>Уведомление должно быть направлено не позднее чем за 10 дней до начала голосования.</p>
        <p>Продолжительность голосования не может превышать 2 месяца.</p>
        <p>Уведомление следует подготовить к печати за 2 дня до даты уведомления.</p>
        <p v-if="noticeWarning" class="warning">{{ noticeWarning }}</p>
        <p v-if="durationWarning" class="warning">{{ durationWarning }}</p>
      </div>
    </div>

    <button class="print-button" type="button" @click="$emit('print')">
      Печать документа
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

.full.rules-card {
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.08);
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

.rules-card p {
  margin: 0 0 8px;
  color: rgba(247, 244, 236, 0.84);
}

.rules-card p:last-child {
  margin-bottom: 0;
}

.warning {
  color: #ffd1b0;
  font-weight: 600;
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
