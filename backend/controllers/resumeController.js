import Resume from '../models/resumeModel.js';
import fs from 'fs';
import path from 'path';

// Create a new resume  
export const createResume = async (req, res) =>
 {
    try {
        const { title } = req.body;
        //default template
        // Default template
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
        };
        const newResume = await Resume.create({
            userId: req.user._id,
            title,
            ...defaultResumeData,
            ...req.body,
        });
        res.status(201).json(newResume)
        
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to create resume', error: error.message });
    }
}
//get function
export const getUserResumes = async (req, res) => {
  try {
    console.log("👉 protect injected user:", req.user);

    if (!req.user?._id) {
      console.log("❌ req.user missing");
      return res.status(401).json({ message: "Unauthorized" });
    }

    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });

    console.log("✅ resumes found:", resumes.length);
    res.json(resumes)



  } catch (error) {
    console.error("🔥 ERROR in getUserResumes:", error);
    res.status(500).json({ 
      message: 'Failed to fetch resumes', 
      error: error.message 
    });
  }
};

//get resume by id
export const getResumeById = async (req, res) =>
{
    try {
        const resume = await Resume.findOne({_id: req.params.id, userId: req.user._id});
        if(!resume){
            return res.status(404).json({message: 'Resume not found'});
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch resume', error: error.message });
    }
}
//update resume
export const updateResume = async (req, res) =>
{
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        })
        if(!resume){
            return res.status(404).json({message: 'Resume not found or not authorised'})
         }
         //merge updated resumes
         Object.assign(resume, req.body);
        //save updated resume
        const savedResume = await resume.save();
        res.json(savedResume);
        }
    catch (error) {
        res.status(500).json({ message: 'Failed to update resume', error: error.message });
    }
}
//delete resume
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!resume) {
      return res
        .status(404)
        .json({ message: "Resume not found or not authorised" });
    }

    const uploadsFolder = path.join(process.cwd(), "uploads");

    // delete thumbnail
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(
        uploadsFolder,
        path.basename(resume.thumbnailLink)
      );
      if (fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail);
      }
    }

    // delete profile image
    if (resume.profileInfo?.profilePreviewUrl) {
      const oldProfile = path.join(
        uploadsFolder,
        path.basename(resume.profileInfo.profilePreviewUrl)
      );
      if (fs.existsSync(oldProfile)) {
        fs.unlinkSync(oldProfile);
      }
    }

    // delete actual resume document
    await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    res.json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res
      .status(500)
      .json({ message: "Failed to delete resume", error: error.message });
  }
};