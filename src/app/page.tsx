import { HomePage } from '@/components/home-page/HomePage'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'ClickSuite | Interactive Magic'
}

export default async function Page({
  searchParams
}: {
  params: { slug: string; viewport: string }
  searchParams: { [key: string]: string }
}) {
  return <HomePage viewport={searchParams.viewport} />
}
