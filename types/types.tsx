
export type IUser = {
    success : boolean,
    message : string,
    data : {
            id : string,
            name : string,
            email : string,
            status : string,
            role : string,
            created_at : string,
            updated_at : string,
            profiles : {
                id : string,
                profilePhoto : string,
                bio : string | null,
                userId : string,
                address : string,
                phone : string,
                createdAt : string,
                updatedAt : string
            }
        }
}

export type NavbarProps = {
    user : IUser
}