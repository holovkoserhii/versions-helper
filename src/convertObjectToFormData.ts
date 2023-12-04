import FormData from 'form-data';

export const convertObjectToFormData = (obj: object): FormData => {
  const formData = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    formData.append(key, value);
  });

  return formData;
};
