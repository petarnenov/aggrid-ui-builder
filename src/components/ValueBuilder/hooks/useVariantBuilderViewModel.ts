import {useDrag as useDragDI, useDrop as useDropDI } from "react-dnd";
import { useVariantBuilderModel as useVariantBuilderModelDI } from ".";
import { useCallback } from "react";
import type { ColumnSourceDragItem } from "../../ColumnSource/ColumnSource";

export type ValueBuilderItem = {
	expression: string;
}

export const useVariantBuilderViewModel = ({
	useVariantBuilderModel = useVariantBuilderModelDI,
	useDrop = useDropDI,
	useDrag = useDragDI,
}) => {
	const {expression,setExpression} = useVariantBuilderModel();

	const [, drop] = useDrop(() => {
		return {
			accept: 'card',
			drop: (item : ColumnSourceDragItem) => {
				setExpression(expression => expression + ' ' + item.field)
			}
		}
	}, [expression]);

	const [, drag, dragPreview] = useDrag(() => ({
		type: 'expression',
		item: {
			expression: expression?.trim(),
		}
	}), [expression])

	const handleReset = useCallback(() => {
        setExpression('');
    }, [expression]);

	return {
        expression,
        drop,
        drag,
		dragPreview,
		handleReset
    };
}
