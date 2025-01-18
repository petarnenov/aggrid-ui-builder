
import {
  ValueBuilder,
  CustomGrid,
  ColumnBuilder,
  ColumnSourceList
} from './components'

import styles from './App.module.scss'

function App() {

  return (
    <section className={styles.layoutContainer}>
      <section className={styles.main}>
        <section className={styles.builders}>
          <CustomGrid />
          <ValueBuilder />
          <ColumnBuilder />
        </section>
        <ColumnSourceList />
      </section>
    </section>
  )
}

export default App
