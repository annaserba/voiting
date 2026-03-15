<script setup lang="ts">
import type { BulletinQuestion } from '../types'

defineProps<{
  question: BulletinQuestion
}>()
</script>

<template>
  <li class="question-item">
    <h3>{{ question.title }}</h3>
    <p>{{ question.description }}</p>
    <div class="vote-options">
      <span>ЗА</span>
      <span>ПРОТИВ</span>
      <span>ВОЗДЕРЖАЛСЯ</span>
    </div>
  </li>
</template>

<style scoped>
.question-item {
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid #e4ebf4;
}

.question-item:last-child {
  border-bottom: 0;
}

.question-item h3 {
  margin: 0 0 6px;
  font-size: 1.12rem;
}

.question-item p {
  margin: 0;
}

.vote-options {
  display: grid;
  grid-template-columns: repeat(3, minmax(90px, 140px));
  gap: 12px;
  margin-top: 12px;
}

.vote-options span {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  min-height: 48px;
  border: 1px dashed #90a1b8;
  border-radius: 14px;
  font-size: 0.9rem;
  font-weight: 600;
}

@media (max-width: 720px) {
  .vote-options {
    grid-template-columns: 1fr;
  }
}
</style>
