export interface BulletinForm {
  houseAddress: string
  managementCompany: string
  vatRate: string
  meetingType: string
  noticeDate: string
  votingStartDate: string
  votingEndDate: string
  ownerName: string
  apartment: string
  area: string
  ownershipDocument: string
  extraNotes: string
}

export interface BulletinQuestion {
  id: number
  title: string
  description: string
}
