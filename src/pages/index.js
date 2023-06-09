/* eslint-disable no-unused-vars */
import { ResourceProvider } from '@/context/resourceContext.js'
import { useUserContext } from '@/context/auth-context.js'

import Header from './header/Header'
import Dashboard from './dashboard/Dashboard'
import { useEffect, useState } from 'react'
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode'
import { Container } from 'react-bootstrap'
import Head from 'next/head'

function Home () {
  const [isLoading, setIsLoading] = useState(true)
  const { setUser, setToken } = useUserContext()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decodedToken = jwt_decode(token)
      const currentTime = Date.now() / 1000
      if (decodedToken.exp < currentTime) {
        setUser(null)
        setToken(null)
        // window redirect
        window.location.href = '/login'
      } else {
        setIsLoading(false)
      }
    } else {
      window.location.href = '/login'
    }
  }, [])
  if (isLoading) {
    return (
      <div className="text-center" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Head>
          <title> TaskNow </title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <div className="spinner-border" style={{ width: '5rem', height: '5rem', borderWidth: '0.6rem' }} role="status" />
      </div>
    )
  } else {
    return (
      <ResourceProvider>
        <Head>
          <title> TaskNow </title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>

        <Container style = {{ backgroundColor: '#ffffff', boxShadow: '0px 0px 2px 1px lightgray', padding: 0 }}>
          <Header />
          <Dashboard />
        </Container>
      </ResourceProvider>
    )
  }
}

export default Home
