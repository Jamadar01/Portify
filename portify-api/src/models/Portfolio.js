const mongoose = require('mongoose')

const portfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  theme: { type: String, required: true, enum: ['cosmic', 'cyberpunk', 'deepocean', 'minimalpaper'] },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  isPublic: { type: Boolean, default: true },
  data: {
    name: String,
    role: String,
    bio: String,
    email: String,
    avatarUrl: String,
    skills: [String],
    experience: [{
      company: String,
      role: String,
      period: String,
      description: String,
    }],
    projects: [{
      title: String,
      description: String,
      link: String,
    }],
    education: [{
      institution: String,
      degree: String,
      year: String,
    }],
    socials: {
      github: String,
      linkedin: String,
      twitter: String,
    },
  },
}, { timestamps: true })

module.exports = mongoose.model('Portfolio', portfolioSchema)
