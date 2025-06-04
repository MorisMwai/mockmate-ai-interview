import React from 'react'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { 
    FormItem, 
    FormLabel, 
    FormControl, 
    FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: 'text' | 'email' | 'password' | 'file';
} 

const FormField = <T extends FieldValues>({ 
    control, 
    name, 
    label, 
    placeholder, 
    type="text",
}: FormFieldProps<T>) => (
        <Controller 
            control={control} 
            name={name} 
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="label">{label}</FormLabel>
                    <FormControl>
                        <Input
                            type={type}
                            className="input"
                            autoComplete={type === 'email' ? 'email' : 'off'}
                            autoFocus={type === 'text'}  
                            placeholder={placeholder} 
                            {...field} 
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );

export default FormField