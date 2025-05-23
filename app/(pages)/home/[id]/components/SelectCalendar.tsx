'use client'

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

import { DateRange } from 'react-date-range'
import { useState } from 'react'
import { eachDayOfInterval } from 'date-fns'

export function SelectCalendar({
  reservation
}: {
  reservation:
    | {
        startDate: string
        endDate: string
      }[]
    | undefined
}) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  let disabledDates: Date[] = []
  reservation?.forEach((reservation) => {
    const dateRanges = eachDayOfInterval({
      start: new Date(reservation.startDate),
      end: new Date(reservation.endDate)
    })

    disabledDates = [...disabledDates, ...dateRanges]
  })

  return (
    <>
      <input
        type="hidden"
        name="startDate"
        value={state[0].startDate.toISOString()}
      />
      <input
        type="hidden"
        name="endDate"
        value={state[0].endDate.toISOString()}
      />
      <DateRange
        date={new Date()}
        showDateDisplay={false}
        rangeColors={['#FF5A5F']}
        ranges={state}
        onChange={(item) => setState([item.selection] as any)}
        minDate={new Date()}
        direction="vertical"
        disabledDates={disabledDates}
      />
    </>
  )
}
