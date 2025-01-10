import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

const DynamicInput = () => {
  const [inputs, setInputs] = useState<string[]>([""]);

  const handleAddInput = () => {
    setInputs([...inputs, ""]);
  };

  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
    console.log(newInputs);
  };

  return (
    <Box>
      {inputs.map((input, index) => (
        <TextField
          key={index}
          value={input}
          onChange={(e) => {
            handleInputChange(index, e);
          }}
          label={`Input ${index + 1}`}
          variant="outlined"
          margin="normal"
        />
      ))}
      <Button onClick={handleAddInput} variant="contained" color="primary">
        Add Input
      </Button>
    </Box>
  );
};

export default DynamicInput;
