import {getConnection} from "typeorm";

export async function getUser(username: string, password: string): Promise<any> {
    const userRepo = await getConnection().getRepository('User');
    return await userRepo.find({where: {username, password}});
}
