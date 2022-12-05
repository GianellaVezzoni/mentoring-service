import { Schema, model } from "mongoose"
const UserSchema = new Schema({
    name:{
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    role: {
        type: String,
        enum:['USER_ROLE', 'ADMIN_ROLE'],
        default: 'USER_ROLE'
    },
    status:{
        type: Boolean, 
        default: true
    }
})

UserSchema.methods.toJSON = function () {
    const { __v, _id, password, ...rest } = this.toObject()
    rest.id = _id
    return rest
}


export = model('User', UserSchema)