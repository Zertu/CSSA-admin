import React, { useEffect, useRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import {
  Select,
  MenuItem,
  Chip,
  FormControl,
  OutlinedInput,
} from "@mui/material";

const TagSelect = React.forwardRef((props, ref) => {
  const { options, value, onChange, name, label } = props;
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  useImperativeHandle(ref, () => ({
    get value() {
      return inputRef.current ? inputRef.current.value : "";
    },
    set value(val) {
      if (inputRef.current) {
        inputRef.current.value = val;
      }
    },
    focus: () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    },
  }));

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    onChange(value);
  };

  const handleDelete = (deletedValue) => {
    onChange(value.filter((val) => val !== deletedValue));
  };
  const getOptionText = (id) => {
    const option = options.find((opt) => opt.value === id);
    return option ? option.text : id;
  };

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <Select
        name={name}
        multiple
        value={value}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        renderValue={(selected) => (
          <div>
            {selected.map((val) => (
              <Chip
                size="small"
                key={val}
                label={getOptionText(val)}
                style={{ marginRight: 4 }}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
                onDelete={() => handleDelete(val)}
              />
            ))}
          </div>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
});

TagSelect.propTypes = {
  options: PropTypes.array.isRequired,
  value: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

TagSelect.displayName = "TagSelect";
export default TagSelect;
