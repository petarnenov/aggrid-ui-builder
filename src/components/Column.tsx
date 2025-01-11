import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from 'uuid';

export type ColumnDragItem = {
	id: string;
    typeId: string;
    headerName: string;
    cellDataType: string;
    field: string;
    source: 'wip' | 'workInProgress' | 'completed';
}

const Column = ({ source = 'wip', order, dispatch, ...rest }) => {

	//const drag = useRef(null);
	const [{ isDragging, didDrop, canDrop }, drag] = useDrag(() => {
		console.log("push116 currentId - id: ", rest.id)
		return {
			type: source === 'wip' ? 'card' : 'card-dropped',
			item: {
				id: rest.id || uuidv4(),
				typeId: rest.typeId || rest.id,
				headerName: rest.headerName,
				cellDataType: rest.cellDataType,
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

	const [{ }, drop] = useDrop(() => ({
		accept: 'card-dropped',
		// drop: (item, monitor) => {
		// 	console.log("push111 item: ", item)
		// 	console.log("push111 monitor: ", monitor)
		// 	dispatch({ type: 'INSERT_ITEM', itemId: currentId, item })
		// }
		// hover: ({ id }) => {
		// 	if (id !== currentId) {
		// 		dispatch({ type: 'MOVE_ITEM', sourceId: currentId, destinationId: id })
		// 	}
		// }
	}), [])

	// console.log("isDragging: ", isDragging)
	// console.log("didDrop: ", didDrop)

	console.log("push114 canDrop: ", drag)

	return (
		<div>
			<div ref={(node) => drag(drop(node))}
				style={{
					opacity: isDragging ? 0.5 : 1,
					backgroundColor: 'white',
					border: '1px dashed gray',
					padding: '4px',
					cursor: 'move',
					margin: '2px',
					minWidth: '80px',
					height: 'auto',
					textAlign: 'center',
					boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
					zIndex: isDragging ? 10 : 0,
				}}>
				<span>{rest.headerName}</span>
			</div>
		</div>
	)
}

export default Column;
