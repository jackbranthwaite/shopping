import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Get Lost'
}

export default async function Page({
  searchParams
}: {
  params: { slug: string; viewport: string }
  searchParams: { [key: string]: string }
}) {
  return <div></div>
}
