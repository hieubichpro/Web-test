import React from "react";

interface TextInputProps {
  label: string;
  type?: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  type = "password",
  name,
  value,
  onChange,
}) => {
  return (
    <div className="mb-2">
      <label className="block text-sm font-medium text-sky-500">{label}</label>
      <input
        type={type}
        className="mt-1 block w-full p-1 border border-gray-300 rounded-lg"
        value={value}
        name={name}
        onChange={onChange}
      />
    </div>
  );
};
