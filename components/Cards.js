import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Cards = (props) => {
  const { data } = props
  return (
    data.map((forest) => (
      <li className={styles.gridItem} key={forest.id}>
        <Link
            href={{
              pathname: '/details/[slug]',
              query: { slug: forest.id },
            }}
          >
          <a className={styles.gridLink}>
            <div className={styles.locationTitle}>{forest.info.location.country}</div>
            <div className={styles.imageContainer}>
              <img src={forest.info.image} />
            </div>
            <div className={styles.cardDetails}>
              <p><b>{forest.name}</b></p>
              <p><b>Forest Type:</b> {forest.info.type}</p>
              <p>{forest.info.short_description}</p>
            </div>
          </a>
        </Link>
      </li>
    ))
  )
}
 
export default Cards
