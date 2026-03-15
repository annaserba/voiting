<script setup lang="ts">
import type { BulletinForm, BulletinQuestion as Question } from '../types'

defineProps<{
  form: BulletinForm
  formattedDates: {
    noticeDate: string
    votingStartDate: string
    votingEndDate: string
  }
  questions: Question[]
}>()
</script>

<template>
  <section class="notice-sheet">
    <article class="notice-card">
      <p class="document-mark">УВЕДОМЛЕНИЕ</p>
      <h2>О проведении общего собрания собственников помещений</h2>
      <div class="address-box">
        <span>Многоквартирный дом</span>
        <strong>{{ form.houseAddress }}</strong>
      </div>

      <div class="notice-meta">
        <p><strong>Сообщается о проведении:</strong> общего собрания собственников помещений в многоквартирном доме</p>
        <p><strong>Форма проведения:</strong> {{ form.meetingType }}</p>
        <p><strong>Дата уведомления:</strong> {{ formattedDates.noticeDate }}</p>
        <p><strong>Дата начала голосования:</strong> {{ formattedDates.votingStartDate }}</p>
        <p><strong>Дата окончания голосования:</strong> {{ formattedDates.votingEndDate }}</p>
        <p><strong>Управляющая компания:</strong> {{ form.managementCompany }}</p>
      </div>

      <div class="notice-body">
        <p>
          Голосование проводится с использованием ГИС ЖКХ. Собственникам
          помещений предлагается ознакомиться с материалами собрания и принять
          участие в голосовании по вопросам повестки дня.
        </p>
      </div>

      <div class="agenda">
        <h3>Повестка дня</h3>
        <ol>
          <li v-for="question in questions" :key="question.id">
            <strong>{{ question.title }}</strong>
            <p>{{ question.description }}</p>
          </li>
        </ol>
      </div>

      <div class="notice-footer">
        <p><strong>Дополнительная информация:</strong> {{ form.extraNotes || 'Отсутствует.' }}</p>
      </div>
    </article>
  </section>
</template>

<style scoped>
.notice-sheet {
  padding: 32px 32px 0;
}

.notice-card {
  max-width: 960px;
  margin: 0 auto;
  padding: 42px;
  border: 1px solid #232323;
  background: #fff;
  box-shadow: none;
}

.document-mark {
  margin: 0;
  text-align: center;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.notice-card h2 {
  margin: 16px 0 18px;
  text-align: center;
  font-size: clamp(1.5rem, 3vw, 2rem);
  line-height: 1.2;
  text-transform: uppercase;
}

.address-box {
  display: grid;
  gap: 6px;
  padding: 16px 18px;
  border: 2px solid #232323;
  background: #f6f6f6;
}

.address-box span {
  font-size: 0.84rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.address-box strong {
  font-size: 1.18rem;
  line-height: 1.3;
}

.notice-meta,
.notice-body,
.agenda,
.notice-footer {
  margin-top: 20px;
  padding: 18px 20px;
  border: 1px solid #232323;
  background: #fff;
}

.notice-meta p,
.notice-body p,
.notice-footer p {
  margin: 0 0 8px;
}

.notice-meta p:last-child,
.notice-body p:last-child,
.notice-footer p:last-child {
  margin-bottom: 0;
}

.agenda h3 {
  margin: 0 0 14px;
  font-size: 1rem;
  text-transform: uppercase;
}

.agenda ol {
  margin: 0;
  padding-left: 22px;
}

.agenda li + li {
  margin-top: 14px;
}

.agenda p {
  margin: 6px 0 0;
}

@media (max-width: 980px) {
  .notice-sheet {
    padding: 20px 20px 0;
  }

  .notice-card {
    padding: 24px;
  }
}

@media print {
  .notice-sheet {
    padding: 0;
  }

  .notice-card {
    max-width: none;
    padding: 0;
    border: 0;
    background: #fff;
  }

  .document-mark {
    margin-bottom: 10px;
  }

  .notice-card h2 {
    margin: 0 0 12px;
    font-size: 18pt;
  }

  .address-box,
  .notice-meta,
  .notice-body,
  .agenda,
  .notice-footer {
    padding: 0;
    border: 0;
    background: transparent;
  }

  .address-box {
    margin-bottom: 14px;
  }

  .address-box strong {
    font-size: 13pt;
  }

  .notice-meta,
  .notice-body,
  .agenda,
  .notice-footer {
    margin-top: 12px;
  }

  .agenda li {
    break-inside: avoid;
  }
}
</style>
