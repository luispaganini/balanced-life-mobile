import React from 'react'
import { Redirect } from 'expo-router'

export default function loginTwoRoute() {
  return (
    <Redirect href="/login-one" />
  )
}