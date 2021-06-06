import styles from '../styles/Home.module.css'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <a
            href="https://pachama.com/"
            target="_blank"
            rel="noopener noreferrer"
            >
            Powered by{' '}
                <img src="https://storage.googleapis.com/pachama-marketplace-assets/icons/logo-pachama-black.svg" alt="Pachama Logo" className={styles.logo} />
            </a>
      </footer>
    )
}

export default Footer