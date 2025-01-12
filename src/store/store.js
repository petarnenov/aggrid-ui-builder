import { create } from 'zustand'

const initialData = [
	{
		id: 1,
		title: 'bear1',
		gender: 'male',
		name: 'John Doe',
		age: 30,
		color: 'brown',
		diet: 'herbivore',
		habitat: 'forest',
		status: 'active',
		weight: 150,
		weightUnit: 'kg',
		favoriteFood: 'berries'
	},
	{
		id: 2,
		title: 'bear2',
		gender: 'female',
		name: 'Jane Doe',
		age: 28,
		color: 'black',
		diet: 'carnivore',
		habitat: 'mountain',
		status: 'inactive',
		weight: 175,
		weightUnit: 'kg',
		favoriteFood: 'carrots'
	},
	{
		id: 3,
		title: 'bear3',
		gender: 'male',
		name: 'Jim Doe',
		age: 32,
		color: 'white',
		diet: 'herbivore',
		habitat: 'desert',
		status: 'active',
		weight: 130,
		weightUnit: 'kg',
		favoriteFood: 'grapes'
	},
	{
		id: 4,
		title: 'bear4',
		gender: 'female',
		name: 'Alice Doe',
		age: 35,
		color: 'grey',
		diet: 'herbivore',
		habitat: 'savannah',
		status: 'inactive',
		weight: 180,
		weightUnit: 'kg',
		favoriteFood: 'potatoes'
	}
]

const operations = [
	'+',
	'-',
	'*',
	'/',
	'(',
	')',
]

const useStore = create((set) => ({
	sliceGridData: {
		data: initialData,
		setData: (newData) => set((state) => ({ sliceGridData: { ...state.sliceGridData, data: newData } })),
	},
	sliceColumnDefsBuilder: {
		columnDefs: [],
		addColumnDef: (newColumnDef) => set((state) => ({ sliceColumnDefsBuilder: { ...state.sliceColumnDefsBuilder, columnDefs: [...state.sliceColumnDefsBuilder.columnDefs, newColumnDef] } })),
		removeColumnDef: (columnDefId) => set((state) => ({ sliceColumnDefsBuilder: { ...state.sliceColumnDefsBuilder, columnDefs: state.sliceColumnDefsBuilder.columnDefs.filter((column) => column.id !== columnDefId) } })),
		updateHeaderName: (columnDefId, newHeaderName) => set((state) => ({ sliceColumnDefsBuilder: { ...state.sliceColumnDefsBuilder, columnDefs: state.sliceColumnDefsBuilder.columnDefs.map((column) => column.id === columnDefId ? { ...column, headerName: newHeaderName } : column) } })),
		resetColumnDefs: () => set((state) => ({ sliceColumnDefsBuilder: { ...state.sliceColumnDefsBuilder, columnDefs: [] } })),
		setColumnDefs: (newColumnDefs) => set((state) => ({ sliceColumnDefsBuilder: { ...state.sliceColumnDefsBuilder, columnDefs: newColumnDefs } })),
		setColumnDefValueGetter: (columnDefId, expression) => set((state) => ({
			sliceColumnDefsBuilder: {
				...state.sliceColumnDefsBuilder, columnDefs: state.sliceColumnDefsBuilder.columnDefs.map((column) => column.id === columnDefId ? {
					...column, valueGetter: ({ data }) => {
						const tokens = expression.split(' ')
						let result = tokens.reduce((acc, token) => {
							if (operations.includes(token)) {
								return `${acc}${token}`
							}
							return `${acc}'${data[token]}'`
						}, '')
						try {
							return eval(result)
						} catch (e) {
							console.error("Error evaluating expression: ", e)
							return 'N/A'
						}
					}
				} : column)
			}
		})),
		swapItems: (dragIndex, hoverIndex) => set((state) => {
			const columnDefs = [...state.sliceColumnDefsBuilder.columnDefs];
			[columnDefs[dragIndex], columnDefs[hoverIndex]] = [columnDefs[hoverIndex], columnDefs[dragIndex]]
			return (
				{ sliceColumnDefsBuilder: { ...state.sliceColumnDefsBuilder, columnDefs } }
			);
		}),
	},
}))

export const useSliceBearStore = () => useStore((state) => state.sliceBear)
export const useSliceGridDataStore = () => useStore((state) => state.sliceGridData)
export const useSliceColumnDefsBuilderStore = () => useStore((state) => state.sliceColumnDefsBuilder)

export default useStore;
