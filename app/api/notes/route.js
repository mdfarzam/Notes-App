import dbConnect from "@/lib/db";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await dbConnect()
        const notes = await Note.find({}).sort({createdAt:-1})
        // Note is the mongoose model which all notes are saves, and find({}) gets all the notes, actually {} here the exception would come but here its empty so all notes are coming, sort({createdAt:-1}) is making all the notes in newest ones first descesnding, -1 means descending and 1 is ascending. 
        return NextResponse.json({success:true, data:notes})
    } catch (error) {
        return NextResponse.json({success:false, error:error.message}, {status: 400})
    }
}

export async function POST(request) {
    try {
        await dbConnect() // call your dbConnect at the start of every route handler because the connection might not exist yet.
        const body = await request.json()
        const note = await Note.create(body)
        return NextResponse.json({ success: true, data: note }, { status: 201 })
    } catch (error) {
        return NextResponse.json({success:false, error:error.message}, {status: 400})
    }
}

