import React, { useCallback, useRef, useState } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { Identifier } from "dnd-core";
import { v4 as uuidv4 } from "uuid";
import { useSliceColumnDefsBuilderStore } from "../../store/store";
import { ValueBuilderItem } from "../ValueBuilder/hooks";

import styles from "./ColumnEdit.module.scss";

const operations = ["+", "-", "*", "/", "%", "(", ")"];

export type ColumnEditableItem = {
  id: string;
  typeId: string;
  headerName: string;
  field: string;
  source: string;
  expression: string;
  index: number;
};

const ColumnEdit = ({
  source = "column-source",
  order,
  dispatch,
  index,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(rest.field);
  const {
    removeColumnDef,
    updateHeaderName,
    setColumnDefValueGetter,
    swapItems,
  } = useSliceColumnDefsBuilderStore();

  const [, drag] = useDrag(() => {
    return {
      type: "drop",
      item: {
        id: rest.id || uuidv4(),
        typeId: rest.typeId || rest.id,
        headerName: rest.headerName,
        field: rest.field,
        source,
        index,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        didDrop: monitor.didDrop(),
        canDrop: monitor.canDrag(),
      }),
      hover: () => {},
    };
  }, [source, dispatch, order, rest, index]);

  const [{ handlerId }, cardDrop] = useDrop<
    ColumnEditableItem,
    void,
    { handlerId: Identifier | null }
  >(
    () => ({
      accept: "drop",
      canDrop: () => true,
      collect: (monitor) => ({
        handlerId: monitor.getHandlerId(),
      }),
      hover: (item, monitor) => {
        if (!ref.current) {
          return;
        }
        const dragIndex = item.index;
        const hoverIndex = index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ref.current?.getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleX =
          (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientX =
          (clientOffset as XYCoord).x - hoverBoundingRect.left;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
          return;
        }

        // Time to actually perform the action
        swapItems(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = hoverIndex;
      },
    }),
    [index, swapItems, rest.id]
  );

  const [, valueDrop] = useDrop(
    () => ({
      accept: "expression",
      drop: (item: ValueBuilderItem) => {
        //Set values for column

        setValue(item.expression);
        setColumnDefValueGetter(rest.id, item.expression);
      },
      collect: (monitor) => ({
        item: monitor.getItem(),
        isOver: monitor.isOver(),
        didDrop: monitor.didDrop(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [value, setValue, setColumnDefValueGetter, rest.id]
  );

  const handleHeaderNameChange = useCallback(
    (e) => {
      updateHeaderName(rest.id, e.target.value.trim() || rest.field);
    },
    [rest.id, updateHeaderName, rest.field]
  );

  drag(cardDrop(ref));

  return (
    <div
      ref={ref}
      className={styles.columnEditContainer}
      data-handler-id={handlerId}
    >
      <div className={styles.columnHeaderContainer}>
        <p className={styles.columnId}>{rest.headerName}</p>
        <p
          className={styles.removeColumnButton}
          onClick={() => removeColumnDef(rest.id)}
        >
          X
        </p>
        <label>Header Name</label>
        <input
          className={styles.columnEditHeader}
          type="text"
          placeholder="Enter header name"
          onChange={handleHeaderNameChange}
        />
      </div>
      <div ref={valueDrop} className={styles.columnValueContainer}>
        <p>Value</p>
        {value}
      </div>
    </div>
  );
};

export default ColumnEdit;
