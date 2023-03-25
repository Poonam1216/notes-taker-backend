const express = require("express");
const router = express.Router();
const Notes = require("../models/notes-model");


router.post("/api/notes", async (req, res) => {

    const { title, content, user } = req.body;

    const notesInfo = await Notes.create({
        title,
        content,
        user
    });
    return res.status(200).json({
        message: "success",
        notesInfo
    })
})



router.put("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const notesInfo = await Notes.findByIdAndUpdate(
        id,
        {
            $set: {
                title,
                content
            }
        });
    return res.status(200).json({
        message: "success",
        notesInfo
    })
})

router.delete("/api/notes/:id", async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;
    const notesInfo = await Notes.findByIdAndDelete(id)
    return res.status(200).json({
        message: "success",
        notesInfo
    })
})

router.get("/api/notes", async (req, res) => {

    const notesList = await Notes.find().populate({
        path: "user"
    }).sort({ createdAt: -1 })
    return res.status(200).json({
        message: "success",
        notesList
    })
})


module.exports = router;