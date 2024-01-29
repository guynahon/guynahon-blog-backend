class User {
    id: number;
    email: string;
    admin: boolean;

    constructor(id: number, email: string) { 
        this.id = id;
        this.email = email;
        this.admin = false;
    }
}

export default User;