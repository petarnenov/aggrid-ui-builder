import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';
import { useSliceColumnDefsBuilderStore } from "../store/store";
import { useCallback, useMemo, useState } from "react";

const operations = ['+', '-', '*', '/', '%', '(', ')']

const ColumnEditable = ({ source = 'wip', order, dispatch, ...rest }) => {
	const [value, setValue] = useState(rest.field)
	const { removeColumnDef, updateHeaderName, setColumnDefValueGetter } = useSliceColumnDefsBuilderStore();

	//const drag = useRef(null);
	const [{ isDragging, didDrop, canDrop }, drag] = useDrag(() => {
		console.log("push116 currentId - id: ", rest.id)
		return {
			type: 'drop',
			item: {
				id: rest.id || uuidv4(),
				typeId: rest.typeId || rest.id,
				headerName: rest.headerName,
				field: rest.field,
				source
			},
			collect: monitor => ({
				isDragging: !!monitor.isDragging(),
				didDrop: monitor.didDrop(),
				canDrop: monitor.canDrag(),
			}),
			// end: (item, monitor) => {
			// 	const didDrop = monitor.didDrop();
			// 	if (!didDrop) {
			// 		console.log("Item dropped outside of dropzone!", item)
			// 	}
			// }
		}
	}, [source, dispatch, order, rest])

	const [{}, drop] = useDrop(() => ({
		accept: 'expression',
		drop: (item, monitor) => {
			console.log("push666 ---------- item: ", item)
			//Set values for column

			setValue(item.expression)
			setColumnDefValueGetter(rest.id, item.expression)
		},
		collect: (monitor) => ({
			item: monitor.getItem(),
			isOver: monitor.isOver(),
			didDrop: monitor.didDrop(),
			canDrop: monitor.canDrop(),
		})
		// hover: ({ id }) => {
		// 	if (id !== currentId) {
		// 		dispatch({ type: 'MOVE_ITEM', sourceId: currentId, destinationId: id })
		// 	}
		// }
	}), [])

	// console.log("isDragging: ", isDragging)
	// console.log("didDrop: ", didDrop)

	//console.log("push114 canDrop: ", drag)

	const handleHeaderNameChange = useCallback((e) => {
		updateHeaderName(rest.id, e.target.value.trim() || rest.field)
	}, [rest.id, updateHeaderName, rest.field])

	return (
		<div
			ref={(node) => drag(drop(node))}
			style={{
				opacity: isDragging ? 0.5 : 1,
				backgroundColor: 'lightGrey',
				border: '1px dashed gray',
				padding: '4px',
				cursor: 'move',
				margin: '2px',
				width: '150px',
				height: '180px',
				textAlign: 'center',
				boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
				zIndex: isDragging ? 10 : 0,
				position: 'relative',
			}}>
			<div>

				<span>{rest.headerName}</span>
				<span
					onClick={() => removeColumnDef(rest.id)}
					style={{
						position: 'absolute',
						top: '2px',
						right: '2px',
						fontSize: '10px',
						cursor: 'pointer',
						color: 'white',
						padding: '2px 4px',
						zIndex: 100,
						borderRadius: '50%',
						backgroundColor: 'red'
					}}>
					X
				</span>
			</div>
			<label>Header Name</label>
			<input type="text" onChange={handleHeaderNameChange} />
			<div
				ref={drop}
				style={{
					height: '100px',
					display: 'flex',
					border: '1px solid gray',
					padding: '4px',
					cursor: 'pointer',
					backgroundColor: 'lightblue',
					color: 'white',
					fontSize: '16px',
					boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
					flex: 1,
					flexDirection: 'column',
				}}>
				<p>Value</p>
				{value}
			</div>

		</div>
	)
}

export default ColumnEditable;
