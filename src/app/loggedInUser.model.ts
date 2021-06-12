export interface LoggedInUser {
    jwtToken: string,
    gpsUser: {
        userName: string;
        firstName: string;
        lastName: string;
        mobile: string;
        gender: string
    }
}