"use client"
import { useState } from "react"

const NotesClient = () => {

    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)

    const createNote = async(e) => { // (e) is the form submit event object the browser gives automatically. it comes when onSubmit from form is fired.
        e.preventDefault();
        if(!title.trim() || !content.trim()) return;
        setLoading(true)
        try {
            const response = await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body:JSON.stringify({title, content})
            })
            const result = await response.json();
            console.log(result);
            setLoading(false)
        } catch (error) {
         console.error("Error creating note:", error);
        }
    }

    return (
        <div className="space-y-6">
            <form onSubmit={createNote} className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Create new note</h2>
                <div className="space-y-4">

                    <input type="text"
                        placeholder="Note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full p-3 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />

                    <textarea
                        placeholder="Note Content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        row={4}
                        className="w-full p-3 rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50">
                        {loading ? 'Creating' : "Create Note"}
                    </button>

                </div>
            </form>
        </div>
    )
}

export default NotesClient