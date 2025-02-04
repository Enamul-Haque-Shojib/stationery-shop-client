
export const categories = ['Male', 'Female', 'Other'];

export const categoryOptions = categories.map((category) => ({
    value: category.toLowerCase(),
    label: category,
  }));
  