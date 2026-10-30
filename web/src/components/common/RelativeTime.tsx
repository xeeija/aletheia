import { Skeleton } from "@mui/material"
import { NextIntlClientProvider, useFormatter, useNow, type Locale } from "next-intl"
import { FC, Suspense } from "react"

interface Props {
  date: string | Date
  locale?: Locale
}

export const RelativeTime: FC<Props> = ({ date, locale = "en" }) => {
  return (
    <Suspense fallback={<Skeleton variant="text" />}>
      <NextIntlClientProvider locale={locale}>
        <RelativeTimeInner date={date} />
      </NextIntlClientProvider>
    </Suspense>
  )
}

const RelativeTimeInner: FC<Props> = ({ date }) => {
  const { relativeTime } = useFormatter()
  const now = useNow()

  return relativeTime(new Date(date), now)
}
