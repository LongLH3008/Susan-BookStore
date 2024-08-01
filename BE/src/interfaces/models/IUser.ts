export enum UserStatus {
    active = "active",
    block = "block",
    pending = "pending"
}

export enum UserRole {
    admin = "admin", user = "user", root = "root"
}

export enum UserTypeAuth {
    local = "local",
    google = "google"
}

export interface IUser {
    user_name: string
    user_otp: string
    user_email: string
    user_phone_number: string
    user_password: string
    user_status: UserStatus
    user_address: string
    user_role: UserRole
    user_avatar: string
    user_gender: string
    user_auth_type : UserTypeAuth
    createAt: Date | string
    updateAt: Date | string
    expiresAt: Date | string
}
export interface IAuthUser {
    id: string,
    user_name: string
    user_email: string
    user_phone_number: string
    user_password: string
    user_status: UserStatus
    user_address: string
    user_role: UserRole
    user_avatar: string
    user_gender: string
    createAt: Date | string
    updateAt: Date | string
}


