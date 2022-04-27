import React from 'react'
import { Typography, Box, useTheme } from '@mui/material'
import Head from 'next/head'
import { defaultLayout, LayoutNextPage } from './_app'

const IndexPage: LayoutNextPage = () => {

  // Next Components 
  // Head: adds meta info in page <head>
  // Image: Optimized image caching etc

  const theme = useTheme()

  return (
    <>
      <Head>
        <title>Dashboard | Aletheia</title>
      </Head>

      <Box>

        <Typography variant="h2">Dashboard</Typography>

      </Box>
    </>
  )
}

IndexPage.getLayout = defaultLayout({ title: "Dashboard" })

export default IndexPage
