import { AgGridReact } from 'ag-grid-react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { useSliceColumnDefsBuilderStore, useSliceGridDataStore } from '../store/store';
import { useCallback, useRef, useState } from 'react';

ModuleRegistry.registerModules([AllCommunityModule]);

const CustomGrid = () => {
	const [savedColumnDefs, setSavedColumnDefs] = useState()
	const gridRef = useRef(null);
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
			<button onClick={handleSaveClick}>Save Grid Configuration</button>
			<button onClick={handleRestoreClick}>Restore Grid Configuration</button>
			<div style={{ height: '216px', width: '1000px' }}>
				<AgGridReact
					ref={gridRef}
					onGridReady={handleGridReady}
					columnDefs={columnDefs}
					onGridColumnsChanged={() => gridRef.current.api.sizeColumnsToFit()}
				/>
			</div>
		</>
	)
}

export default CustomGrid;
