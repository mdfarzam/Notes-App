import mongoose from "mongoose";
const NoteSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true,
        maxLength:100,
    },
    content: {
        type:String,
        required:true,
        maxLength:2000,
    },
    createdAt: {
        type:Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

NoteSchema.pre("save", function() {
    this.updatedAt = Date.now()
}) // before saving to database, runs this to set "updatedAt" to current time

export default mongoose.models.Note || mongoose.model("Note", NoteSchema) 
// This last line creates a new Model called "Note" using your schema. A Model is the class you use to create, read, update, delete documents. Note.create({title: "Hello"}) this creates a document, Note.findByIdAndDelete(id)

