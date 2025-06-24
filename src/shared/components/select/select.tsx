import {
  default as ReactSelect,
  type SingleValue,
  type StylesConfig,
} from "react-select";

export interface Option {
  value: string | number;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: SingleValue<Option> | null;
  onChange: (newValue: SingleValue<Option>) => void;
  defaultValue?: SingleValue<Option>;
}

const selectStyle: StylesConfig<Option, false> = {
  control: (base, state) => ({
    ...base,
    border: state.isFocused ? "2px solid #0f368b" : "2px solid #bcbbbc",
    boxShadow: "none",
    outline: "none",
    borderRadius: "2px",
    width: "240px",
    color: "#000",
    fontFamily: "monospace",

    "&:hover": {
      border: "2px solid #3dd1e7",
      boxShadow: "none",
    },

    "& input": {
      boxShadow: "none !important",
    },
  }),
  valueContainer: (base) => ({
    ...base,
    overflowY: "auto",
    maxHeight: "82px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#bfde42" : "",
    fontFamily: "monospace",
    fontWeight: 600,
    color: "#000",

    "&:hover": {
      backgroundColor: "#bfde42",
      color: "#000",
    },
  }),
  placeholder: (base) => ({
    ...base,
    fontSize: "15px",
  }),
  clearIndicator: (base) => ({
    ...base,
    padding: "6px",
  }),
};

export const Select = ({
  options,
  value,
  onChange,
  defaultValue,
}: SelectProps) => {
  return (
    <>
      <ReactSelect<Option, false>
        options={options}
        value={value}
        onChange={onChange}
        defaultValue={defaultValue}
        styles={selectStyle}
      />
    </>
  );
};
