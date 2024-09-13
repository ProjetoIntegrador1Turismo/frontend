import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';

interface ControlledFileInputProps {
  control: any;
  name: 'imgCover' | 'avatar';
  label: string;
  disabled?: boolean;
  className?: string;
}

const ControlledSingleFileInput = ({
  control,
  name,
  label,
  disabled,
}: ControlledFileInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type='file'
              disabled={disabled}
              accept='image/*'
              onChange={(e) => {
                field.onChange(e.target?.files?.[0] ?? undefined);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledSingleFileInput;
