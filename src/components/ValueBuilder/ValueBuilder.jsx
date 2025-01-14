import Button from '../Button/Button'
import { useVariantBuilderViewModel } from './hooks'
import styles from './ValueBuilder.module.scss'

const ValueBuilder = () => {
	const {
		expression,
		drop,
		drag,
		dragPreview,
		handleReset
	} = useVariantBuilderViewModel()

	return (
		<div
			ref={drop}
			className={styles.valueBuilder}
		>
			<h3 className={styles.header}>Value Builder</h3>
			<Button
				variant="danger"
				verticalPosition='top'
				horizontalPosition='right'
				onClick={handleReset}
			>
				Reset
			</Button>
			<code className={styles.expression} ref={drag}><span ref={node => dragPreview(node)} className={styles.value}>{expression}</span></code>
		</div>
	)
}

export default ValueBuilder