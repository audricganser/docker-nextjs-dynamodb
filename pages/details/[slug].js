import React, {useEffect, useState} from 'react';
import styles from '../../styles/Home.module.css'
import { Spotlight } from '../../components/index'
import _ from 'lodash'
import axios from 'axios'
import { useRouter } from 'next/router'

const Details = () => {
  const [data, setData] = useState({})
  const router = useRouter()
  const { slug } = router.query

  
  useEffect(() => {
    if(!router.isReady) return;
    const init = async () => {
      const { data } = await axios.get(`/api/v1/forest/${slug}`)
      setData(data)
    }
    if(!router.isReady) return;
    init()
  },[router.isReady])

  return (
    <div className={styles.container}>
      {!_.isEmpty(data) ? <Spotlight data={data} />: 'loading...'}
    </div>
  )
}

export default Details;
