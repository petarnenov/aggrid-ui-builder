import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useSliceColumnDefsBuilderStore, useSliceGridDataStore } from '../..//store/store';
import { useCallback, useRef, useState } from 'react';
import { Button } from '../Button';

ModuleRegistry.registerModules([AllCommunityModule]);

import styles from './CustomGrid.module.scss';

const CustomGrid = () => {
	const gridRef = useRef(null);
	const [savedColumnDefs, setSavedColumnDefs] = useState()
	const { data } = useSliceGridDataStore();
	const { columnDefs, setColumnDefs } = useSliceColumnDefsBuilderStore();

	const handleGridReady = useCallback(() => {
		const gridApi = gridRef.current.api;
		gridApi.setGridOption('rowData', data);
		gridApi.sizeColumnsToFit();
	}, [data]);

	const handleSaveClick = useCallback(() => {
		// Save grid configuration to your backend here
		const currentColumnDefs = gridRef.current.api.getColumnDefs();
		setSavedColumnDefs(() => currentColumnDefs);
		console.log('Grid configuration saved', currentColumnDefs);
	}, []);

	const handleRestoreClick = useCallback(() => {
		if (savedColumnDefs) {
			setColumnDefs(savedColumnDefs);
			console.log('Grid configuration restored', savedColumnDefs);
		}
	}, [savedColumnDefs, setColumnDefs]);

	console.log("push111 columnDefs: ", columnDefs)

	return (
		<>
			<section className={styles.customGridWrapper}>
				<Button
					variant="secondary"
					verticalPosition='top'
					horizontalPosition='left'
					onClick={handleSaveClick}
				>
					Save Configuration
				</Button>
				<Button
					variant="secondary"
					verticalPosition='top'
					horizontalPosition='right'
					onClick={handleRestoreClick}
				>
					Restore Configuration
				</Button>
				<h3 className={styles.header}>Custom Grid</h3>
				<div style={{ height: '192px', width: '1000px' }}>
					<AgGridReact
						ref={gridRef}
						onGridReady={handleGridReady}
						columnDefs={columnDefs}
						onGridColumnsChanged={() => gridRef.current.api.sizeColumnsToFit()}
					/>
				</div>
			</section>
		</>
	)
}

export default CustomGrid;
