import React, { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Navigation } from '../components/Navigation'
import { Grid, Paper, TextField } from '@mui/material'
import { BingoBoard } from '../components/BingoBoard'

const Bingo: NextPage = () => {

  // const theme = useTheme()

  const [entries, setEntries] = useState<string[]>([])

  // TODO: Randomize board button
  // TODO: "Checksum/signature" of the board

  return (
    <>
      <Head>
        <title>Bingo Board | Aletheia</title>
      </Head>

      <Navigation title="Bingo">

        <Grid container spacing={2} >

          <Grid item xs={8}>
            <Paper sx={{ padding: 2 }}>
              <BingoBoard items={entries} />
            </Paper>
          </Grid>

          <Grid item xs={4}>
            <TextField multiline variant="filled" label="Bingo items" minRows={16} maxRows={32} fullWidth
              value={entries.join("\n")} onChange={ev => setEntries(ev.target.value.split("\n"))}
            />
          </Grid>
        </Grid>

      </Navigation>

    </>
  )
}

export default Bingo