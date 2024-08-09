import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface ControlledFileInputProps {
  control: any;
  name: 'images' | 'imgCover';
  label: string;
  className?: string;
}

const ControlledFileInput = ({ control, name, label }: ControlledFileInputProps) => {
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
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                field.onChange(files);
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledFileInput;
