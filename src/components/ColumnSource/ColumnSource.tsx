import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";

import styles from "./ColumnSource.module.scss";

export type ColumnSourceDragItem = {
  id: string;
  typeId: string;
  headerName: string;
  cellDataType: string;
  field: string;
  source: "column-source" | "workInProgress" | "completed";
};

export type ColumnProps = {
  id?: string | undefined;
  typeId?: string;
  headerName: string;
  cellDataType: string;
  field: string;
  source?: "column-source" | "workInProgress" | "completed";
  order?: any;
  dispatch?: any;
};

const Column = ({
  source = "column-source",
  order,
  dispatch,
  ...rest
}: ColumnProps) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: source === "column-source" ? "card" : "card-dropped",
      item: {
        id: rest.id || uuidv4(),
        typeId: rest.typeId || rest.id,
        headerName: rest.headerName,
        cellDataType: rest.cellDataType,
        field: rest.field,
        source,
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
        didDrop: monitor.didDrop(),
        canDrop: monitor.canDrag(),
      }),
    }),
    [source, dispatch, order, rest]
  );

  const [, drop] = useDrop(
    () => ({
      accept: "card-dropped",
    }),
    []
  );

  return (
    <div ref={(node) => drag(drop(node))} className={styles.columnSourceItem}>
      <span>{rest.headerName}</span>
    </div>
  );
};

export default Column;
