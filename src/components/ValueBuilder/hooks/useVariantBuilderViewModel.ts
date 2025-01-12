import {useDrag, useDrop } from "react-dnd";
import { useVariantBuilderModel } from ".";
import { useCallback } from "react";
import type { ColumnSourceDragItem } from "../../ColumnSource/ColumnSource";

export type ValueBuilderItem = {
	expression: string;
}

export const useVariantBuilderViewModel = () => {
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
			expression: expression.trim(),
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
