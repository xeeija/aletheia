import { Button, Container, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {

  // Next Components 
  // Head: adds meta info in page <head>
  // Image: Optimized image caching etc

  return (
    <>
      <Head>
        <title>Aletheia Home</title>
      </Head>
      <Container>
        <div>Hello world</div>
        <Button variant="contained" >Button</Button>
      </Container>
    </>
  )
}

export default Home
