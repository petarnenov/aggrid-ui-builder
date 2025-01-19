import React from "react"
import {
  ValueBuilder,
  CustomGrid,
  ColumnBuilder,
  ColumnSourceList
} from './components'

import styles from './App.module.scss'

function App() {

  return (
    <section
      className={styles.layoutContainer}
      data-testid="layout-container-section"
    >
      <section
        className={styles.main}
        data-testid="main-section"
      >
        <section
          className={styles.builders}
          data-testid="builders-section"
        >
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
