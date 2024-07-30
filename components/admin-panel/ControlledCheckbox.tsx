import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Checkbox } from '../ui/checkbox';

interface ControlledCheckboxProps {
  control: any;
  name: 'isResort' | 'breakfastIncluded';
  label: string;
  className?: string;
}

const ControlledCheckBox = ({ control, name, label }: ControlledCheckboxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <div className='space-y-1 leading-none'>
            <FormLabel>{label}</FormLabel>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledCheckBox;
