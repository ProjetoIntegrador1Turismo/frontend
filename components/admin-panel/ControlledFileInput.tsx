import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface ControlledFileInputProps {
  control: any;
  name: 'image1' | 'image2' | 'image3' | 'image4' | 'image5';
  ref: any
  label: string;
  className?: string;
}

const ControlledFileInput = ({
  control,
  name,
  label,
  ref,
  className
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
              accept='image/*'
              {...ref}
              onChange={(event) => {
                field.onChange(event.target?.files?.[0] ?? undefined);
              }}
              className={cn('shadow-md shadow-gray-400 border border-black', className)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledFileInput;
