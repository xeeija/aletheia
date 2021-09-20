import React from 'react'
import { Button, Typography, Box, CssBaseline, Container, useTheme } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Sidebar } from '../components/Sidebar'

const Home: NextPage = () => {

  // Next Components 
  // Head: adds meta info in page <head>
  // Image: Optimized image caching etc

  const theme = useTheme()

  return (
    <>
      <Head>
        <title>Aletheia Home</title>
      </Head>

      <Sidebar>
        <Box sx={{ p: 3, "& button": { mr: 1 } }}>
          <Typography variant="h3">Hello world</Typography>
          <Typography paragraph>Would you like to reboot now?</Typography>

          <>
            <Button variant="contained" color="primary">Primary</Button>
            <Button variant="contained" color="secondary">Secondary</Button>
            <Button variant="contained" color="info">Info</Button>
            <Button variant="contained" color="success">Success</Button>
            <Button variant="contained" color="warning">Warning</Button>
            <Button variant="contained" color="error">Error</Button>
            <p />
            <Button variant="outlined" color="primary">Primary</Button>
            <Button variant="outlined" color="secondary">Secondary</Button>
            <Button variant="outlined" color="info">Info</Button>
            <Button variant="outlined" color="success">Success</Button>
            <Button variant="outlined" color="warning">Warning</Button>
            <Button variant="outlined" color="error">Error</Button>
            <p />
            <Button variant="text" color="primary">Primary</Button>
            <Button variant="text" color="secondary">Secondary</Button>
            <Button variant="text" color="info">Info</Button>
            <Button variant="text" color="success">Success</Button>
            <Button variant="text" color="warning">Warning</Button>
            <Button variant="text" color="error">Error</Button>
          </>

        </Box>
      </Sidebar>
    </>
  )
}

export default Home
