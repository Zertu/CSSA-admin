import React, { useEffect, useRef, useImperativeHandle } from "react";
import TomSelect from "tom-select";
import "tom-select/dist/css/tom-select.bootstrap4.css";

const TagSelect = React.forwardRef((props, ref) => {
  const { options, value, onChange, name } = props;
  const selectRef = useRef(null);

  useImperativeHandle(ref, () => ({
    get value() {
      return selectRef.current ? selectRef.current.value : "";
    },
    set value(val) {
      if (selectRef.current && selectRef.current.tomselect) {
        selectRef.current.tomselect.setValue(val);
      }
    },
    focus: () => {
      if (selectRef.current && selectRef.current.tomselect) {
        const control = selectRef.current.tomselect.control;
        if (control && control.input) {
          control.input.focus();
        }
      }
    },
  }));

  useEffect(() => {
    if (selectRef.current) {
      const select = new TomSelect(selectRef.current, {
        plugins: ["remove_button"],
        create: true,
        items: value,
      });

      options.forEach((option) => {
        select.addOption({ value: option.value, text: option.text });
      });

      select.setValue(value);
      return () => {
        select.destroy();
      };
    }
  }, [options, onChange]);

  const handleChange = () => {
    const values = selectRef.current.tomselect.getValue();
    onChange(values);
  };
  return (
    <select
      ref={selectRef}
      name={name}
      onChange={handleChange}
      multiple
      title="Select Tags"
    />
  );
});

TagSelect.displayName = "TagSelect"; // Add display name
export default TagSelect;
