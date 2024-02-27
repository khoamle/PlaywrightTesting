export interface IUser {
    username: string;
    password: string;
}

export const loginData = {
    standardUser: {
        username: "standard_user" as const,
        password: "secret_sauce"
    },
    lockedOutUser: {
        username: "locked_out_user" as const,
        password: "secret_sauce"
    },
    problemUser: {
        username: "problem_user" as const,
        password: "secret_sauce"
    }

}