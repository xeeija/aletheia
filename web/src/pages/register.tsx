import React, { useState } from "react"
import { NextPage } from "next"
import Head from "next/head"
import { Sidebar } from "../components/Sidebar"
import { Box, Button, TextField, Typography } from "@mui/material"
import { PasswordField } from "../components/PasswordField"

const Register: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register | Aletheia</title>
      </Head>

      <Sidebar>

        <Box sx={{ width: 360, mx: "auto" }}>
          <Typography variant="h6" >Register</Typography>

          <TextField variant="filled" label="Username" size="small" margin="normal" fullWidth
          // sx={{ display: "block" }}
          />
          <br />
          {/* width: calc(100% - 36px) */}
          <PasswordField label="Password" variant="filled" size="small" margin="normal" fullWidth>
          </PasswordField>
          <br />

          <TextField label="Confirm password" type="password" variant="filled" size="small" margin="normal" fullWidth
          // sx={{ display: "block" }}
          />

          <p />
          <Button variant="contained" fullWidth>Register</Button>

        </Box>

      </Sidebar>
    </>
  )
}

export default Register
