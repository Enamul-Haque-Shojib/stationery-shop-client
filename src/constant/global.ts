
export const categories = ['Pens', 'Notebooks', 'Pencils','Markers','Art Supplies','Office Supplies','Erasers',''];

export const categoryOptions = categories.map((category) => ({
    value: category.toLowerCase(),
    label: category,
  }));
  