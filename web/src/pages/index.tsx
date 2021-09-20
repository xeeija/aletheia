import { Button, Container, Typography, Box } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'
import { MiniDrawer } from '../components/MiniDrawer'
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'

const Home: NextPage = () => {

  // Next Components 
  // Head: adds meta info in page <head>
  // Image: Optimized image caching etc

  return (
    <>
      <Head>
        <title>Aletheia Home</title>
      </Head>

      <Sidebar>
        <Box sx={{ p: 3 }}>
          <div>Hello world</div>
        </Box>
      </Sidebar>

      {/* <Sidebar>
        <Container maxWidth="xl" > */}
      {/* <Container component="main" sx={{ ml: 3 }}> */}
      {/* <div>Hello world</div>
          <Button variant="contained" >Button</Button>
        </Container>
      </Sidebar> */}
      {/* </Container> */}
    </>
  )
}

export default Home
