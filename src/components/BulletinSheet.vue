<script setup lang="ts">
import BulletinQuestion from './BulletinQuestion.vue'
import type { BulletinForm, BulletinQuestion as Question } from '../types'

defineProps<{
  form: BulletinForm
  printableDate: string
  questions: Question[]
}>()
</script>

<template>
  <main class="bulletin-sheet">
    <section class="bulletin-card">
      <p class="document-mark">Бюллетень для голосования</p>
      <h2>Собрание собственников помещений в МКД</h2>
      <p class="address">{{ form.houseAddress }}</p>

      <div class="meta-list">
        <p><strong>Форма проведения:</strong> {{ form.meetingType }}</p>
        <p><strong>Дата оформления бюллетеня:</strong> {{ form.meetingDate }}</p>
        <p><strong>Срок приема бюллетеней:</strong> {{ form.votingDeadline }}</p>
      </div>

      <div class="owner-block">
        <p><strong>Собственник:</strong> {{ form.ownerName || '______________________________' }}</p>
        <p><strong>Квартира / помещение:</strong> {{ form.apartment || '________________' }}</p>
        <p><strong>Площадь:</strong> {{ form.area || '________________' }}</p>
        <p>
          <strong>Документ о праве собственности:</strong>
          {{ form.ownershipDocument || '____________________________________________________' }}
        </p>
      </div>

      <ol class="question-list">
        <BulletinQuestion
          v-for="question in questions"
          :key="question.id"
          :question="question"
        />
      </ol>

      <div class="notes">
        <p><strong>Пояснение:</strong> {{ form.extraNotes }}</p>
        <p><strong>Дата печати шаблона:</strong> {{ printableDate }}</p>
      </div>

      <div class="sign-row">
        <div>
          <span>Подпись собственника</span>
          <b></b>
        </div>
        <div>
          <span>Расшифровка подписи</span>
          <b></b>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.bulletin-sheet {
  padding: 32px;
}

.bulletin-card {
  max-width: 960px;
  margin: 0 auto;
  padding: 42px;
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.84);
  box-shadow: 0 28px 60px rgba(31, 43, 76, 0.12);
}

.document-mark {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  color: #9e7a35;
  font-size: 0.78rem;
}

.bulletin-card h2 {
  margin: 10px 0 6px;
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  line-height: 1.05;
}

.address {
  margin: 0 0 18px;
  font-size: 1.05rem;
}

.meta-list,
.owner-block,
.notes {
  padding: 18px 20px;
  border: 1px solid #dde4ef;
  border-radius: 18px;
  background: #fcfdff;
}

.meta-list p,
.owner-block p,
.notes p {
  margin: 0 0 8px;
}

.meta-list p:last-child,
.owner-block p:last-child,
.notes p:last-child {
  margin-bottom: 0;
}

.owner-block,
.question-list,
.notes,
.sign-row {
  margin-top: 20px;
}

.question-list {
  padding-left: 22px;
}

.sign-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.sign-row div {
  display: grid;
  gap: 10px;
}

.sign-row span {
  color: #5b687a;
}

.sign-row b {
  display: block;
  min-height: 34px;
  border-bottom: 1px solid #29364b;
}

@media (max-width: 980px) {
  .bulletin-sheet {
    padding: 20px;
  }

  .bulletin-card {
    padding: 24px;
  }
}

@media (max-width: 720px) {
  .sign-row {
    grid-template-columns: 1fr;
  }
}

@media print {
  .bulletin-sheet {
    padding: 0;
  }

  .bulletin-card {
    box-shadow: none;
    border-radius: 0;
    max-width: none;
    padding: 18mm 14mm;
    background: #fff;
  }
}
</style>
