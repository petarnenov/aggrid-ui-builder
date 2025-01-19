import React, { useMemo } from "react";

import { ColumnSource } from "../ColumnSource";

import { useSliceGridDataStore } from "../../store/store";

import styles from "./ColumnSourceList.module.scss";

const ColumnSourceList = () => {
  const { data } = useSliceGridDataStore();

  const columns = useMemo(() => {
    const dataSource = data[0];
    dataSource["customColumn"] = "customColumn";
    dataSource["+"] = "+";
    dataSource["-"] = "-";
    dataSource["*"] = "*";
    dataSource["/"] = "/";
    dataSource["("] = "(";
    dataSource[")"] = ")";
    const columns = Object.keys(dataSource).map((key) => ({
      id: undefined,
      field: key,
      headerName: key,
      width: 120,
      cellDataType: typeof data[0][key],
    }));
    return columns;
  }, [data]);

  return (
    <section className={styles.columnSource}>
      {columns.map((column) => (
        <ColumnSource key={column.id || column.field} {...column} />
      ))}
    </section>
  );
};

export default ColumnSourceList;
