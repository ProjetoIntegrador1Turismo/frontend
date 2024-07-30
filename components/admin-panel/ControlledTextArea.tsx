import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';

interface ControlledTextAreaProps {
  control: any;
  name: 'shortDescription' | 'longDescription';
  label: string;
  placeholder: string;
  className?: string;
}

const ControlledTextArea = ({
  control,
  name,
  label,
  placeholder,
  className
}: ControlledTextAreaProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea placeholder={placeholder} className={className} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledTextArea;
