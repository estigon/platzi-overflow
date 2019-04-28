export class User{
    constructor(
    	public email: string,
    	public password: any,
        public firstname?: string,
        public lastname?: string
    ){}

    fullName(){
    	return `${this.firstname} ${this.lastname}`;
    }
}