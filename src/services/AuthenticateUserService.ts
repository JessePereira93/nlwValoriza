import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm"
import { Subject } from "typeorm/persistence/Subject";
import { UsersRepositories } from "../repositories/UsersRepositories"

interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{
    async execute({ email, password }: IAuthenticateRequest ){
        const usersRepositories = getCustomRepository(UsersRepositories);

        //Verificar se o email existe
        const user = await usersRepositories.findOne({
            email
        });
        if(!user) throw new Error("Email/Password Incorrect");

        // Verificar se senha está correta
        const passwordMatch = await compare(password, user.password);
        if(!user) throw new Error("Email/Password Incorrect");

        // Gerar Token
        const token = sign(
            {
                email: user.email
            },
            "0058b84c46534d70bcbf244a851d4dfd",
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token;
    }
}

export { AuthenticateUserService }