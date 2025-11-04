import mongoose from 'mongoose';

const ResumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    theme: String,
    colorPalette: [String],
  },
  profileInfo: {
    profilePreviewUrl: String,
    fullName: String,
    designation: String,
    summary: String,
  },
   contactInfo: {
    email: String,
    phone: String,
    location: String,
    linkedIn: String,
    github: String,
    website: String,
  },
  // work experience section
    workExperience: [
    {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String,
    },
    ],
    education: [
    {
        degree: String,
        institution: String,
        startDate: Date,
        endDate: Date,
    },
    ],
    skills: [
    {
        name: String,
        progress: Number,
    },
    ],
    projects: [
        {
            title: String,
            description: String,
            github: String,
            liveDemo: String,
        },
    ],
    certifications: [
        {
            title: String,      
            issuer: String,
            year: String,
        },
    ],
    languages: [
        {
            name: String,
            progress: Number,
        },
    ],
    interests: [String],
}, 
{
     timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

export default mongoose.model('Resume', ResumeSchema);
   