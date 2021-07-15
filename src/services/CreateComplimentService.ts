import { getCustomRepository } from "typeorm"
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories"
import { UsersRepositories } from "../repositories/UsersRepositories";



interface IComplimentRequest {
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService{
    async execute( { tag_id, user_sender, user_receiver, message} : IComplimentRequest){
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const userRepositories = getCustomRepository(UsersRepositories);

        // Verifica se o user que irá receber a tag é o mesmo que estaá enviando
        if(user_sender === user_receiver) throw new Error("Incorrect User Receiver");

        // Verifica se existe o user que irá receber a tag
        const userReceiverExists = await userRepositories.findOne(user_receiver);

        if(!userReceiverExists) throw new Error("User Receiver does nor exists!");

        const compliment = complimentsRepositories.create({
            tag_id,
            user_receiver,
            user_sender,
            message
        });

        await complimentsRepositories.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService }