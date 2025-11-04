import fs from 'fs';
import path from 'path';

import Resume from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';
import { error } from 'console';

export const uploadResumeImages = async (req, res) => {
  try {
    upload.single("thumbnail")(req, res, async (err) => {
      if (err) {
        console.error("Multer upload error:", err);
        return res.status(400).json({ message: "File upload failed", error: err.message });
      }

      console.log("Req.files:", req.files);
  console.log("Req.file:", req.file);


      if (!req.file) {
        console.log("No file received!");
        return res.status(400).json({ message: "No file uploaded" });
      }

      console.log("Incoming file:", req.file);

      const resumeId = req.params.id;
      const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });
      if (!resume) {
        return res.status(404).json({ message: "Resume not found or unauthorized" });
      }

      const uploadsFolder = path.join(process.cwd(), "uploads");
      const baseUrl = `${req.protocol}://${req.get("host")}`;

      // Delete old thumbnail if exists
      if (resume.thumbnailLink) {
        const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
        if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
      }

      // Save new thumbnail URL
      resume.thumbnailLink = `${baseUrl}/uploads/${req.file.filename}`;
      await resume.save();

      console.log("✅ Thumbnail uploaded successfully:", resume.thumbnailLink);

      res.status(200).json({
        message: "Thumbnail uploaded successfully",
        thumbnailLink: resume.thumbnailLink,
      });
    });
  } catch (err) {
    console.error("Error uploading images:", err);
    res.status(500).json({
      message: "Failed to upload images",
      error: err.message,
    });
  }
};
