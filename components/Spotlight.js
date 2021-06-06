import styles from '../styles/Home.module.css'

const Spotlight = (props) => {
  const { data } = props
  return (
    <div className={styles.grid}>
      <div className={styles.gridItemSpot}>
        <div className={styles.imageContainer}>
          <img src={data.info.image} />
        </div>
      </div>
      <div className={styles.gridItemSpot}>
        <div className={styles.info}>
          <h1>{data.name}</h1>
        </div>
        <div className={styles.info}>
          <h3 className={styles.detailsSubtitle}>{data.info.location.country}</h3>
        </div>
        <div className={styles.detailsDescription}>
          {data.info.long_description}
        </div>
        <div className={styles.info}>
          <div>
            <ul><b>Forest Type:</b> {data.info.type}</ul>
          </div>
            <ul><b>Long:</b> {data.info.location.longitude}, Lat: {data.info.location.latitude}</ul>
          <div>
            <ul><b>Area Covered:</b> {data.info.area_covered} ha</ul>
          </div>
          <div>
            <ul><b>Carbon Total:</b> {data.info.health_metrics.carbon_total} t/ha</ul>
          </div>
          <div>
            <ul><b>Last 30 Day Change Carbon Store:</b> {data.info.health_metrics.carbon_change} t/ha</ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Spotlight
