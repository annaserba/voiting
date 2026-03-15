import type { BulletinForm, BulletinQuestion } from '../types'

export const houseAddressOptions = [
  'г. Севастополь, пр-т. Октябрьской революции, 48',
  'г. Севастополь, пр-т. Октябрьской революции, 48/1',
] as const

function toIsoDate(value: Date): string {
  return value.toISOString().slice(0, 10)
}

function parseDate(dateString: string): Date | null {
  if (!dateString) {
    return null
  }

  const date = new Date(dateString)
  return Number.isNaN(date.getTime()) ? null : date
}

export function addDays(dateString: string, days: number): string {
  const date = parseDate(dateString)
  if (!date) {
    return ''
  }

  date.setDate(date.getDate() + days)
  return toIsoDate(date)
}

export function addMonths(dateString: string, months: number): string {
  const date = parseDate(dateString)
  if (!date) {
    return ''
  }

  const targetDay = date.getDate()
  date.setMonth(date.getMonth() + months)

  if (date.getDate() !== targetDay) {
    date.setDate(0)
  }

  return toIsoDate(date)
}

export function formatRuDate(dateString: string): string {
  const date = parseDate(dateString)
  if (!date) {
    return '________________'
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export function createDefaultForm(): BulletinForm {
  const today = new Date()
  const noticeDate = new Date(today)
  noticeDate.setDate(today.getDate() + 10)

  const votingStartDate = new Date(noticeDate)
  votingStartDate.setDate(noticeDate.getDate() + 10)

  const votingEndDate = new Date(votingStartDate)
  votingEndDate.setMonth(votingStartDate.getMonth() + 1)

  return {
    houseAddress: houseAddressOptions[0],
    managementCompany: '"Стрелецкая бухта"',
    vatRate: '20%',
    meetingType:
      'В форме электронного голосования через Государственную информационную систему жилищно-коммунального хозяйства (ГИС ЖКХ)',
    noticeDate: toIsoDate(noticeDate),
    votingStartDate: toIsoDate(votingStartDate),
    votingEndDate: toIsoDate(votingEndDate),
    ownerName: '',
    apartment: '',
    area: '',
    ownershipDocument: '',
    extraNotes: '',
  }
}

export function buildQuestions(form: BulletinForm): BulletinQuestion[] {
  return [
    {
      id: 1,
      title: 'Установка шлагбаумов на въездах к дому',
      description:
        'Принять решение об установке шлагбаумов на въездах к придомовой территории многоквартирного дома.',
    },
    {
      id: 2,
      title: 'Установка камер видеонаблюдения в подъездах и лифтах',
      description:
        'Утвердить монтаж камер видеонаблюдения в подъездах и в кабинах лифтов с последующим обслуживанием системы.',
    },
    {
      id: 3,
      title: 'Сбор денежных средств через управляющую компанию',
      description: `Определить, что сбор денежных средств на указанные работы осуществляется через ${form.managementCompany} с учетом НДС управляющей компании в размере ${form.vatRate}.`,
    },
    {
      id: 4,
      title: 'Создание специального счета на ремонт шлагбаумов',
      description:
        'Открыть специальный счет для накопления и расходования денежных средств на ремонт, обслуживание и замену шлагбаумов.',
    },
    {
      id: 5,
      title: 'Создание счета для оплаты электроэнергии',
      description:
        'Открыть отдельный счет для учета и оплаты электроэнергии, потребляемой оборудованием, установленным по решениям настоящего собрания.',
    },
    {
      id: 6,
      title: 'Создание счета для электроэнергии домофона на мусорной площадке',
      description:
        'Открыть отдельный счет для оплаты электроэнергии, необходимой для установки и эксплуатации домофона на площадке для сбора мусора.',
    },
    {
      id: 7,
      title: 'Сбор денежных средств на систему открытия ворот',
      description:
        'Утвердить сбор денежных средств на приобретение, монтаж и настройку системы дистанционного открытия ворот.',
    },
    {
      id: 8,
      title: 'Установка домофона на калитки во внутренний двор',
      description:
        'Принять решение об установке домофона на калитки, ведущие во внутренний двор, с выбором подрядчика "Севдомофон".',
    },
  ]
}
