import { UserRepository } from "../repositories/user.repositories";
import bcrypt from "bcryptjs";

export class UserService {
    private userRepository = new UserRepository();

    // Lógica de Autenticação
    async login(email: string, password: string) {
        // Busca o usuario pelo e-email
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("INVALID_CREDENTIALS");

        // Compara a senha com bcrypt
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error("INVALID_CREDENTIALS");

        return user;
    }

    // Lógica de Registro
    async register(name: string, email: string, password: string) {
        // Verificação de e-mail já esta cadastrado
        const existing = await this.userRepository.findByEmail(email);
        if (existing) throw new Error("EMAIL_ALREADY_IN_USE");

        // Faz o hash da senha 
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.userRepository.create({ name, email, password: hashedPassword });
    }

    // Lógica para buscar perfil (limpando dados sensíveis)
    async getProfile(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("USER_NOT_FOUND");
        // Retorna apenas o que é seguro mostrar no front
        const { password, id, ...safeUser } = user;
        return safeUser;
    }

    // Lógica complexa de atualização
    async updateProfile(currentEmail: string, data: any) {
        const { name, email: newEmail, password, currentPassword } = data;

        // 1. Regra: Se for mudar senha, verifica a atual
        if (password) {
            const user = await this.userRepository.findByEmail(currentEmail);
            if (!user) throw new Error("USER_NOT_FOUND");
            const isValid = await bcrypt.compare(currentPassword, user.password);
            if (!isValid) throw new Error("INVALID_PASSWORD");
        }

        // 2. Regra: Se for mudar email, verifica disponibilidade
        if (newEmail && newEmail !== currentEmail) {
            const existing = await this.userRepository.findByEmail(newEmail);
            if (existing) throw new Error("EMAIL_ALREADY_IN_USE");
        }

        // 3. Prepara os dados (fazendo o hash se necessário)
        const updateData: any = {};
        if (name) updateData.name = name;
        if (newEmail) updateData.email = newEmail;
        if (password) updateData.password = await bcrypt.hash(password, 10);
        return this.userRepository.update(currentEmail, updateData);
    }

    // Lógica de exclusão
    async deleteAccount(email: string) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new Error("USER_NOT_FOUND");
        return this.userRepository.delete(email);
    }
}