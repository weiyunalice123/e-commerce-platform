export interface loginInput {
    username: string;
    password: string;
} 
export class loginData {
    ruleForm:loginInput = {
        username: '',
        password: ''
    }
}