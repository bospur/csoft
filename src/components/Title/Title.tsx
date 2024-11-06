import styles from './Title.module.scss'

export const Title = () => {
    return <section className={styles.titleWrap}>
        <div className={styles.title}>
            <h1>Тестовое задание</h1>
            <h3>Разработчик: Семенов Иван Юрьевич</h3>
        </div>
        <div className={styles.logo}>
            <h2>CSoft</h2>
            <p>development</p>
        </div>
    </section>
}