import { Control, Controller } from "react-hook-form";
import InputFormComponent from "../../Inputs/InputFormComponent";
import IFormCreateAccountValues from "@/interfaces/App/Form/IFormCreateAccountValues";

type FormFieldProps<T = {}> = T & {
    control: Control<IFormCreateAccountValues, any>;
    name: "name" | "email" | "cpf" | "password" | "confirmPassword" | "phoneNumber" | "birthDate" | "gender";
    rules: any;
    placeholder: string;
};

export const FormField = <T extends object>({ control, name, rules, placeholder, ...inputProps }: FormFieldProps<T>) => (
    <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <InputFormComponent
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value || ""}
                errors={error}
                {...inputProps}
            />
        )}
    />
);
