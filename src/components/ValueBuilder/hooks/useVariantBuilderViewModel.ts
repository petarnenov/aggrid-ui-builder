import {useDrag, useDrop } from "react-dnd";
import { useVariantBuilderModel } from ".";
import { useCallback } from "react";
import type { ColumnDragItem } from "../../Column";

export const useVariantBuilderViewModel = () => {
	const {expression,setExpression} = useVariantBuilderModel();

	const [, drop] = useDrop(() => {
		return {
			accept: 'card',
			drop: (item : ColumnDragItem) => {
				setExpression(expression => expression + ' ' + item.field)
			}
		}
	}, [])

	const [, drag, dragPreview] = useDrag(() => ({
		type: 'expression',
		item: {
			expression: expression.trim(),
		}
	}), [expression])

	const handleReset = useCallback(() => {
        setExpression('');
    }, []);

	return {
        expression,
        drop,
        drag,
		dragPreview,
		handleReset
    };
}
