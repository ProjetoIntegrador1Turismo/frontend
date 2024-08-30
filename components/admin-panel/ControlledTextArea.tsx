import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';

interface ControlledTextAreaProps {
  control: any; 
  name: 'shortDescription' | 'longDescription' | 'description' | 'commentText';
  label: string;
  placeholder: string;
  disabled?: boolean;
  className?: string;
}

const ControlledTextArea = ({
  control,
  name,
  label,
  placeholder,
  disabled,
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
            <Textarea placeholder={placeholder} className={className} {...field} disabled={disabled} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledTextArea;
