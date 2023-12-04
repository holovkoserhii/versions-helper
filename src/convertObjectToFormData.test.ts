import FormData from 'form-data';
import { convertObjectToFormData } from './convertObjectToFormData';

describe('convertObjectToFormData', () => {
  it('should convert object to the FormData', () => {
    const testObj = { a: 1 };
    expect(convertObjectToFormData(testObj)).toBeInstanceOf(FormData);
  });
});
