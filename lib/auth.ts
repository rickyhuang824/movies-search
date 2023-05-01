import { compare, hash } from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
};

export const verifyPassword = async (
    password: string,
    passwordHashed: string
) => {
    return await compare(password, passwordHashed);
};
