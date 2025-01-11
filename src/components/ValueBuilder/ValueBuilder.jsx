import { useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

import styles from './ValueBuilder.module.scss'
import Button from '../Button/Button'

const ValueBuilder = () => {
	const [expression, setExpression] = useState('')

	const [{ }, drop] = useDrop(() => {
		return {
			accept: 'card',
			drop: (item, monitor) => {
				setExpression(expression => expression + ' ' + item.field)
			}
		}
	}, [])

	const [{ }, drag] = useDrag(() => ({
		type: 'expression',
		item: {
			expression: expression.trim(),
		}
	}), [expression])

	console.log("push666 expression: ", expression)


	return (
		<div
			ref={drop}
			className={styles.valueBuilder}
		>
			<Button
				variant="danger"
				verticalPosition='top'
				horizontalPosition='right'
				onClick={() => setExpression('')}
			>
				Reset
			</Button>
			<code ref={drag}>{expression}</code>
		</div>
	)
}

export default ValueBuilder