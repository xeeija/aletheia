import { NextIntlClientProvider, useFormatter, type Locale } from "next-intl"
import { FC } from "react"

interface Props {
  date: string | Date
  locale?: Locale
}

export const RelativeTime: FC<Props> = ({ date, locale = "en" }) => {
  return (
    <NextIntlClientProvider locale={locale}>
      <RelativeTimeInner date={date} />
    </NextIntlClientProvider>
  )
}

const RelativeTimeInner: FC<Props> = ({ date }) => {
  const { relativeTime } = useFormatter()

  return relativeTime(new Date(date))
}
