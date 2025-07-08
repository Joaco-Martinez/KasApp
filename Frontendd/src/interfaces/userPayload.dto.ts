export interface userPayload{
        id: string;
        name: string;
        surname: string;
        email: string;
        isAdmin: boolean;
        agencyId?: string;
        onBoarding?: boolean;
        status?: string;
        suscriptionId?: string;
}
