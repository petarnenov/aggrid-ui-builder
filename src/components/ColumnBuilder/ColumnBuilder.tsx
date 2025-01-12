import React, { useEffect } from "react";
import { useDrop } from "react-dnd";
import { useSliceColumnDefsBuilderStore } from "../../store/store";
import ColumnEdit, { ColumnEditableItem } from "../ColumnEdit/ColumnEdit";
import { Button } from "../Button";

const ColumnBuilder = ({ children }) => {
  const { columnDefs, addColumnDef, resetColumnDefs } =
    useSliceColumnDefsBuilderStore();

  console.log("push113 columnDefs: ", columnDefs);

  const [{ isOver, canDrop, offset, result, didDrop, item }, drop] = useDrop({
    accept: "card",
    drop: (item: ColumnEditableItem) => {
      if (item.source === "column-source") {
        addColumnDef(item);
      }
      return { accepted: true };
    },
    collect: (monitor) => ({
      item: monitor.getItem(),
      isOver: monitor.isOver(),
      didDrop: monitor.didDrop(),
      canDrop: monitor.canDrop(),
      offset: monitor.getInitialClientOffset(),
      result: monitor.getDropResult(),
    }),
  });

  return (
    <section
      ref={drop}
      style={{
        display: "flex",
        gap: "4px",
        height: "70vh",
        backgroundColor: "lightGrey",
        padding: "4px",
        flexDirection: "column",
        width: "100%",
        border: "4px dashed gray",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      {children}
      <div
        style={{
          display: "flex",
          gap: "4px",
          height: "70vh",
          backgroundColor: "darkGrey",
          padding: "4px",
          flexDirection: "row",
          flexWrap: "wrap",
          border: "4px dashed gray",
          borderRadius: "8px",
        }}
      >
        <Button
          variant="danger"
          verticalPosition="top"
          horizontalPosition="right"
          onClick={resetColumnDefs}
        >
          Reset
        </Button>
        {columnDefs?.map((columnDef) => {
          return <ColumnEdit key={columnDef.id} {...columnDef} source="drop" />;
        })}
      </div>
    </section>
  );
};

export default ColumnBuilder;