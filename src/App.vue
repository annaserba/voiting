<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import BulletinSheet from './components/BulletinSheet.vue'
import ControlPanel from './components/ControlPanel.vue'
import MeetingNotice from './components/MeetingNotice.vue'
import {
  addDays,
  addMonths,
  buildQuestions,
  createDefaultForm,
  formatRuDate,
  houseAddressOptions,
} from './data/bulletin'

type DocumentView = 'bulletin' | 'notice'

const form = reactive(createDefaultForm())
const currentDocument = ref<DocumentView>('bulletin')

const questions = computed(() => buildQuestions(form))

const latestNoticeDate = computed(() => addDays(form.votingStartDate, -10))
const maxVotingEndDate = computed(() => addMonths(form.votingStartDate, 2))
const durationWarning = computed(() =>
  form.votingEndDate > maxVotingEndDate.value
    ? 'Срок голосования не может превышать 2 месяца от даты начала голосования.'
    : '',
)

const noticeWarning = computed(() =>
  form.noticeDate > latestNoticeDate.value
    ? 'Дата уведомления должна быть минимум за 10 дней до даты начала голосования.'
    : '',
)

const formattedDates = computed(() => ({
  noticeDate: formatRuDate(form.noticeDate),
  votingStartDate: formatRuDate(form.votingStartDate),
  votingEndDate: formatRuDate(form.votingEndDate),
}))

watch(
  () => form.votingStartDate,
  (newStartDate) => {
    if (form.noticeDate > addDays(newStartDate, -10)) {
      form.noticeDate = addDays(newStartDate, -10)
    }

    if (form.votingEndDate < newStartDate) {
      form.votingEndDate = newStartDate
      return
    }

    const maxEndDate = addMonths(newStartDate, 2)
    if (form.votingEndDate > maxEndDate) {
      form.votingEndDate = maxEndDate
    }
  },
  { immediate: true },
)

watch(
  () => form.noticeDate,
  (newNoticeDate) => {
    const maxNoticeDate = addDays(form.votingStartDate, -10)
    if (newNoticeDate > maxNoticeDate) {
      form.noticeDate = maxNoticeDate
    }
  },
)

watch(
  () => form.votingEndDate,
  (newVotingEndDate) => {
    if (newVotingEndDate < form.votingStartDate) {
      form.votingEndDate = form.votingStartDate
      return
    }

    const maxEndDate = addMonths(form.votingStartDate, 2)
    if (newVotingEndDate > maxEndDate) {
      form.votingEndDate = maxEndDate
    }
  },
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
      :current-document="currentDocument"
      :latest-notice-date="latestNoticeDate"
      :max-voting-end-date="maxVotingEndDate"
      :duration-warning="durationWarning"
      :notice-warning="noticeWarning"
      @update:current-document="currentDocument = $event"
      @print="printPage"
    />
    <div class="documents">
      <MeetingNotice
        v-if="currentDocument === 'notice'"
        :form="form"
        :questions="questions"
        :formatted-dates="formattedDates"
      />
      <BulletinSheet
        v-else
        :form="form"
        :questions="questions"
        :formatted-dates="formattedDates"
      />
    </div>
  </div>
</template>

<style scoped>
.page-shell {
  display: grid;
  grid-template-columns: minmax(320px, 430px) minmax(0, 1fr);
  min-height: 100vh;
}

.documents {
  padding-bottom: 32px;
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

  .documents {
    padding-bottom: 0;
  }
}
</style>
