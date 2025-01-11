import { useState } from "react";

export const useVariantBuilderModel = () => {
  const [expression, setExpression] = useState("");

  return {
    expression,
      setExpression,
  };
};
