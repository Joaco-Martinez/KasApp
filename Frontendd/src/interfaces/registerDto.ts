interface RegisterUserDtoFront {
    name: string
    surname: string
    phone: string
    email: string
    password?: string | null
    document: string
    agencyName: string
    agencyDescription: string
    slug: string
    googleId?: string
    token?: string
}

export default RegisterUserDtoFront