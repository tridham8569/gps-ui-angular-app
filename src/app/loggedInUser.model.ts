export interface LoggedInUser {
    jwtToken: string,
    gpsUsers: {
        userName: string;
        firstName: string;
        lastName: string;
        mobile: string;
        gender: string;
        email?:string;
        address?:string;
    }
}