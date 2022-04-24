import React, { useState } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Navigation } from '../components/Navigation'
import { Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography, useTheme } from '@mui/material'
import { BingoBoard } from '../components/BingoBoard'
import { shuffle } from '../utils/shuffle'

const BingoPage: NextPage = () => {

  const theme = useTheme()

  const [entries, setEntries] = useState<string[]>([])
  const [shuffledEntries, setShuffledEntries] = useState<string[]>([])

  const [jokerEnabled, setJokerEnabled] = useState(false)
  const [jokerText, setJokerText] = useState("")

  // TODO: Make a custom hook from this
  const updateRandomEntries = (entries: string[], joker: boolean, jokerEntry = "") => {
    console.log({ joker })

    if (joker) {
      // mid + shift joker 1 to right on boards with even length
      const mid = Math.floor(entries.length / 2) + (entries.length % 2 === 0 ? 1 : 0)
      const shuffled = shuffle(entries.slice(0))

      // maybe splice instead?
      const entriesWithJoker = [...shuffled.slice(0, mid), jokerEntry, ...shuffled.slice(mid, -1)]
      setShuffledEntries(entriesWithJoker)
    }
    else {
      setShuffledEntries(shuffle(entries))
    }
  }

  // TODO: Test if permutations are unbiased
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
              <BingoBoard items={shuffledEntries} />
            </Paper>
          </Grid>

          <Grid item xs={4}>

            <TextField multiline variant="filled" label="Bingo items" minRows={16} maxRows={32} fullWidth
              value={entries.join("\n")} onChange={ev => {
                const list = ev.target.value.split("\n")
                setEntries(list)
                updateRandomEntries(list, jokerEnabled, jokerText)
              }}
            />

            <Typography variant="subtitle2" component="p" sx={{ mt: 2, mb: 0.5 }} >Options:</Typography>

            <FormControlLabel label="Use Joker"
              control={<Checkbox checked={jokerEnabled} onChange={ev => {
                setJokerEnabled(ev.target.checked)
                updateRandomEntries(entries, ev.target.checked, jokerText)
              }} />}
            />
            <TextField variant="filled" label="Joker text" size="small" disabled={!jokerEnabled}
              value={jokerText} onChange={ev => {
                setJokerText(ev.target.value)
              }}
              sx={{
                opacity: jokerEnabled ? 1 : 0,
                transition: theme.transitions.create("opacity", {
                  duration: theme.transitions.duration.shortest,
                  easing: theme.transitions.easing.easeInOut
                }),
              }} InputLabelProps={{ sx: { fontSize: 14 } }} InputProps={{ sx: { fontSize: 14 } }}
            />

            <br />

            <Button variant="contained" onClick={() => {
              updateRandomEntries(entries, jokerEnabled, jokerText)
            }}
              sx={{ mt: 1 }}
            >
              Generate
            </Button>



          </Grid>
        </Grid>

      </Navigation>

    </>
  )
}

export default BingoPage