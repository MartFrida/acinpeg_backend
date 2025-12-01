import { Schema, model } from 'mongoose';


const userSchema = new Schema(
{
username: { type: String, required: true, unique: true },
useremail: { type: String, required: true, unique: true },
password: { type: String, required: true },
role: { type: String, enum: ['alumno', 'profesor', 'admin'], default: 'alumno' }
},
{ timestamps: true }
);


export default model('User', userSchema);



