import React, { useEffect, useState } from 'react';
import axios from 'axios'
import styles from '../styles/Home.module.css'

const Home = () => {
  const [data, setData] = useState([])
  const [isBusy, setBusy] = useState(true)

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get('/api/v1/data')
      setData(data.Items)
    }
    init()
    setBusy(false)
  }, [])


  return (
    <div className={styles.container}>
      {!isBusy ? data[0].message : 'loading...'}
    </div>
  )
}

export default Home;
