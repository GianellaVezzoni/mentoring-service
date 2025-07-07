export default interface IUser {
  name: string;
  email: string;
  password?: string;
  role?: string;
  status?: boolean;
  tags?: string[];
  mentorId?: string;
  objectives?: string[];
}
