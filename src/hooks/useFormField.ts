export function useFormField(
  setIngredients: (arg0: any[]) => void,
  setSteps: (arg0: any[]) => void,
  steps: string[],
  ingredients: string[]
) {
  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addStep = () => {
    setSteps([...steps, ""]);
  };

  const removeStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index: number, value: string) => {
    const updated = [...steps];
    updated[index] = value;
    setSteps(updated);
  };

  return {
    addIngredient,
    removeIngredient,
    updateIngredient,
    addStep,
    removeStep,
    updateStep,
  };
}
