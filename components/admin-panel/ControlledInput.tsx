import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

interface ControlledInputProps {
  control: any;
  name:
    | 'number'
    | 'name'
    | 'type'
    | 'averageValue'
    | 'date'
    | 'duration'
    | 'shortDescription'
    | 'road'
    | 'zipcode'
    | 'longDescription'
    | 'category'
    | 'requiredTime'
    | 'requiredAge'
    | 'starsNumber'
    | 'isResort'
    | 'breakfastIncluded'
    | 'foodType'
    | 'title'
    | 'averageCost'
    | 'days'
    | 'description'
    | 'imgCover'
    | 'interestPointIds';
  label: string;
  type: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  className?: string;
}

const ControlledInput = ({
  control,
  name,
  label,
  type,
  min,
  max,
  disabled,
  className
}: ControlledInputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...field}
              disabled={disabled}
              type={type}
              className={cn('shadow-md shadow-gray-400 border border-black', className)}
              min={min ? min : ''}
              max={max ? max : ''}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ControlledInput;
