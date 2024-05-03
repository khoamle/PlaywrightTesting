export interface IUser {
    username: string;
    password: string;
}

const password = process.env.PASSWORD

export const loginData = {
    standardUser: {
        username: "standard_user" as const,
        password: String(password)
    },
    lockedOutUser: {
        username: "locked_out_user" as const,
        password: String(password)
    },
    problemUser: {
        username: "problem_user" as const,
        password: String(password)
    }

}