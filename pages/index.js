import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import axios from 'axios'
import { Cards } from '../components/index'
import styles from '../styles/Home.module.css'

const Home = () => {
  const [data, setData] = useState([])
  const [filterBy, setFilterBy] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [searchSubmitted, setSearchSubmitted] = useState(false)
  const [isBusy, setBusy] = useState(true)

  useEffect(() => {
    const init = async () => {
      const forestData = await axios.get('/api/v1/forests')
      if (filterBy !== '' || searchValue !== '') {
        if(filterBy !== '') {
          const filteredData = forestData.data.Items.filter((item) => item.info.type === filterBy)
          setData(filteredData)
        } else if (searchValue !== '') {
          const searchData = forestData.data.Items.filter((item) => item.name.toLowerCase() === searchValue.toLowerCase())
          setData(searchData)
        }
      } else {
        setData(forestData.data.Items)
      }
    }
    init()
    setBusy(false)
  }, [filterBy, searchSubmitted])

  const options = [
    { value: 'conservation', label: 'Conservation' },
    { value: 'reforestation', label: 'Reforestation' }
  ]

  const filterItems = (event) => {
    if (event === null) {
      setFilterBy('')
    } else {
      setFilterBy(event.value)
    }
  }

  const searchItems = (event) => {
    setSearchValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchSubmitted(!searchSubmitted)
  }

  return (
    <div className={styles.container}>
      <div className={styles.gridUtils}>
        <div className={styles.gridItemUtils}>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search By Forest Name" onChange={searchItems} />
              <input type="submit" value="Submit" />
            </form>
        </div>
        <div className={styles.gridItemUtils}>
          <Select instanceId="1" placeholder="Forest Types" isClearable={true} options={options} onChange={filterItems} />
        </div>
      </div>
      <ul className={styles.grid}>
        {!isBusy ? <Cards data={data} /> : 'loading...'}
      </ul>
    </div>
  )
}

export default Home;
