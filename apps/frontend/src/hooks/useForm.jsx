import { useState } from 'react';

export function useForm(initialState = {}) {
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return { formData, setFormData, handleChange };
}
