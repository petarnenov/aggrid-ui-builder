import React from "react";
import Button from "../Button/Button";
import { useVariantBuilderViewModel as useVariantBuilderViewModelDI } from "./hooks";
import styles from "./ValueBuilder.module.scss";

const ValueBuilder = ({
  // eslint-disable-next-line react/prop-types
  useVariantBuilderViewModel = useVariantBuilderViewModelDI,
}) => {
  const { expression, drop, drag, dragPreview, handleReset } =
    useVariantBuilderViewModel({});

  return (
    <div ref={drop} className={styles.valueBuilder}>
      <h3 className={styles.header}>Value Builder</h3>
      <Button
        variant="danger"
        verticalPosition="top"
        horizontalPosition="right"
        onClick={handleReset}
      >
        Reset
      </Button>
      <code className={styles.expression} ref={drag}>
        <span ref={(node) => dragPreview(node)} className={styles.value}>
          {expression}
        </span>
      </code>
    </div>
  );
};

export default ValueBuilder;
