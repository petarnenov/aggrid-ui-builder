import { useState } from "react";

export const useVariantBuilderModel = () => {
  const [expression, setExpression] = useState<string | undefined>("");

  return {
    expression,
      setExpression,
  };
};
