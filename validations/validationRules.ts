import { TFunction } from "i18next";

export const validationRules = (t: TFunction<"translation", undefined>) => ({
    name: { required: t("Name is required") },
    email: {
        required: t("E-mail is required"),
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: t("Invalid e-mail address"),
        },
    },
    cpf: {
        required: t("CPF is required"),
        validate: {
            cpf: (value: string) => {
                if (value.length < 14)
                    return t("CPF is required")
            }
        },
    },
    password: {
        required: t("Password is required"),
        pattern: {
            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
            message: t("Password must contain at least 8 characters, including a letter and a number"),
        },
    },
    confirmPassword: (password: string, t: TFunction<"translation", undefined>) => ({
        required: t("Confirm Password is required"),
        validate: (value: string) => value === password || t("Passwords do not match"),
    }),
});
