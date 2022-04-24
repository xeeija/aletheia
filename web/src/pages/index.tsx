import React from 'react'
import { Typography, Box, useTheme } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Navigation } from '../components/Navigation'

const IndexPage: NextPage = () => {

  // Next Components 
  // Head: adds meta info in page <head>
  // Image: Optimized image caching etc

  const theme = useTheme()

  return (
    <>
      <Head>
        <title>Dashboard | Aletheia</title>
      </Head>

      <Navigation title="Dashboard">
        <Box>

          <Typography variant="h2">Dashboard</Typography>

        </Box>
      </Navigation>
    </>
  )
}

export default IndexPage
