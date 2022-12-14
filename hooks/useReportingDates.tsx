import type { ReportingDate } from '../interfaces'
import React, { useState } from 'react'
import useSWR from 'swr'

const fetcher = (url:string) => fetch(url).then((res) => res.json())

export default function useReportingDates() {
  const [text, setText] = useState('')

  const { data: reportingDates } = useSWR<ReportingDate[]>(
    '/api/reporting-dates',
    fetcher,
    { fallbackData: [] }
  )

  return { text, setText }
}