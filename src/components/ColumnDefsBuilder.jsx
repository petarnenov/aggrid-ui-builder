import React, { useEffect } from 'react'
import { useDrop } from 'react-dnd'
import Column from './Column'
import { v4 as uuidv4 } from 'uuid';
import { useSliceColumnDefsBuilderStore } from '../store/store';
import ColumnEditable from './ColumnEditable';

export const ColumnDefsBuilder = ({ children }) => {
	const { columnDefs, addColumnDef } = useSliceColumnDefsBuilderStore()

	console.log("push113 columnDefs: ", columnDefs)

	const [{ isOver, canDrop, offset, result, id, didDrop, item }, drop] = useDrop({
		accept: 'card',
		drop: (item, monitor) => {
			// console.log("isOver: ", isOver)
			// console.log("canDrop: ", canDrop)
			// console.log("offset: ", offset)
			// console.log("result: ", result)

			if (item.source === 'wip') {
				addColumnDef(item)
			}
			return { accepted: true }
		},
		collect: (monitor) => ({
			item: monitor.getItem(),
			isOver: monitor.isOver(),
			didDrop: monitor.didDrop(),
			canDrop: monitor.canDrop(),
			offset: monitor.getInitialClientOffset(),
			result: monitor.getDropResult()
		})
	})

	return (
		<section ref={drop} style={{
			display: 'flex',
			gap: '4px',
			//justifyContent: 'space-around',
			//alignItems: 'center',
			height: '40vh',
			backgroundColor: 'lightGrey',
			padding: '4px',
			flexDirection: 'column',
			width: '100%'
		}}>
			{children}
			<div style={{
				display: 'flex',
				gap: '4px',
				height: '38vh',
				backgroundColor: 'darkGrey',
				padding: '4px',
				flexDirection: 'row',
				flexWrap: 'wrap',
			}}>
				{columnDefs?.map((columnDef) => {
					return (
						<ColumnEditable key={columnDef.id} {...columnDef} source="drop" />
					)
				})}
			</div>

		</section>
	)
}
