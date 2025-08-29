import type { UseFormRegisterReturn } from "react-hook-form";

import { Input, InputProps } from "@/src/components/ui/input";
import React from "react";

interface FormFieldProps extends InputProps  {
  label?: string;
  htmlFor?: string;
  error?: string;
  register?: UseFormRegisterReturn;
};

export const FormField = ({
                            label,
                            htmlFor,
                            error,
                            register,
                            ...props
                          }: FormFieldProps) => {
  const id =
    htmlFor ||
    `input-${label?.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id}>
          {label}
        </label>
      )}
      <Input id={id} {...register} {...props} aria-invalid={!!error} />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
