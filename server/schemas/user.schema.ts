import { z } from "zod";

// Schema para Login
export const loginSchema = z.object({
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

// Schema para Registro
export const registerSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

// Schema para Atualização (todos os campos são opcionais)
export const updateSchema = z.object({
    name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres").optional(),
    email: z.string().email("E-mail inválido").optional(),
    password: z.string().min(6, "A nova senha deve ter pelo menos 6 caracteres").optional(),
    currentPassword: z.string().optional(),
}).refine((data) => {
    // Regra extra: Se for mudar a senha, a senha atual é obrigatória
    if (data.password && !data.currentPassword) return false;
    return true;
}, {
    message: "Senha atual é obrigatória para trocar a senha",
    path: ["currentPassword"],
});