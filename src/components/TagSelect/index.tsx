import React, { useEffect, useRef } from 'react';
import TomSelect from 'tom-select';
import 'tom-select/dist/css/tom-select.bootstrap4.css';

const TagSelect = ({ options, onChange,value }) => {
    const selectRef = useRef<HTMLSelectElement |null>(null);
  useEffect(() => {
    if(selectRef.current){
        
    const select = new TomSelect(selectRef.current, {
        plugins: ['remove_button'],
        create: true,
        items:value,
        onChange: newValue => onChange(newValue)
      });
      console.log(options)
      options.forEach(option => {
        select.addOption({ value: option.value, text: option.text });
      });
  
      return () => {
        select.destroy();
      };
    }
  }, [options, onChange]);

useEffect(() => {
    if ((selectRef.current as any).tomselect) {
        (selectRef.current as any).tomselect.setValue(value);
    }
}, [value]);

return <select ref={selectRef}  onChange={onChange} multiple title="Select Tags" />;
};

export default TagSelect;