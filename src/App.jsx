
import { useMemo } from 'react'
import './App.css'
import Column from './components/Column'
import CustomGrid from './components/CustomGrid'
import { ColumnDefsBuilder } from './components/ColumnDefsBuilder'
import { useSliceGridDataStore } from './store/store'
import { ValueBuilder } from './components'

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
      <section style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f0f0f0',
        padding: '4px',
        width: '100%',
        flexDirection: 'column',
      }}>
        <ColumnDefsBuilder>
          <p>Column Builder</p>
        </ColumnDefsBuilder>

        <ValueBuilder>
          <p>Value Builder</p>
        </ValueBuilder>

        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '40vh',
          backgroundColor: '#f0f0f0',
          padding: '4px',
          width: '100%',
          flexDirection: 'row'
        }}>
          <section style={{
            display: 'flex',
            gap: '10px',
            //justifyContent: 'space-around',
            //alignItems: 'center',
            backgroundColor: '#14f4f4',
            padding: '4px',
            width: '100%',
            flexDirection: 'column'
          }}>
            <p>Columns</p>
            <div
              style={{
                display: 'flex',
                gap: '10px',
                //justifyContent: 'space-around',
                //alignItems: 'center',
                backgroundColor: '#f4f414',
                padding: '4px',
                width: '96%',
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}>

              {columns.map(column => <Column key={column.id} {...column} />)}
            </div>
          </section>
        </div>
        <section style={{}}>
          <CustomGrid />
        </section>
      </section>
    </>
  )
}

export default App
