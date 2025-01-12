
import { useMemo } from 'react'
import { useSliceGridDataStore } from './store/store'
import {
  ValueBuilder,
  CustomGrid,
  ColumnBuilder,
  ColumnSource
} from './components'

import styles from './App.module.scss'

function App() {
  const { data } = useSliceGridDataStore()

  const columns = useMemo(() => {
    const dataSource = data[0]
    dataSource['customColumn'] = 'customColumn'
    dataSource['+'] = '+'
    dataSource['-'] = '-'
    dataSource['*'] = '*'
    dataSource['/'] = '/'
    dataSource['('] = '('
    dataSource[')'] = ')'
    const columns = Object.keys(dataSource).map(key => ({ field: key, headerName: key, width: 120, cellDataType: typeof data[0][key] }))
    return columns;
  }, [data])

  return (
    <>
      <section className={styles.layoutContainer}>
        <section className={styles.main}>
          <section className={styles.builders}>

            <ColumnBuilder>
              <p>Column Builder</p>
            </ColumnBuilder>

            <ValueBuilder />

            <section className={styles.gridPreview}>
              <CustomGrid />
            </section>
          </section>
          <section className={styles.columnSource}>
            {columns.map(column => <ColumnSource key={column.id} {...column} />)}
          </section>
        </section>
      </section>
    </>
  )
}

export default App
