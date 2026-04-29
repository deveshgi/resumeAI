import ai from "../services/ai.service.js";
import { Resume } from "../models/resume.model.js";
import { handler } from "../utils/handler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";


export const enhanceSummary = handler(async (req, res) => {
  const { summary } = req.body;

  if (!summary) {
    throw new ApiError(400, "Text is required");
  }

  const prompt = `You are an expert resume writer.
Improve the following resume summary:

"${summary}"

Make it:
- Professional
- ATS-friendly
- Concise (3-4 lines max)
- Impactful

Return only the improved summary.`;

  try {
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gemini-3-flash",
      messages: [
        {
          role: "system",
          content: "You are a professional resume expert."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
    });

    const enhancedSummary =
      response.choices?.[0]?.message?.content?.trim();

    if (!enhancedSummary) {
      throw new ApiError(500, "AI failed to generate summary");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        { enhancedSummary },
        "Summary enhanced successfully"
      )
    );

  } catch (error) {
    // console.error("AI ERROR:", error);

    if (error.status === 404) {
      throw new ApiError(
        500,
        "Model/endpoint issue — use gemini-3-flash"
      );
    }

    throw new ApiError(500, error.message);
  }
});

export const enhanceJobDescription = handler(async (req, res) => {
  const { description } = req.body;

  if (!description) {
    throw new ApiError(400, "Description is required");
  }

  const prompt = `Convert this into strong resume bullet points:

"${description}"

Make it:
- ATS friendly
- 3-5 bullet points
- Use action verbs
- Impactful

Return only bullet points.`;

  try {
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gemini-3-flash",
      messages: [
        { role: "system", content: "You are a resume expert." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const enhanced =
      response.choices?.[0]?.message?.content?.trim();

    return res.status(200).json(
      new ApiResponse(200, { enhanced }, "Success")
    );

  } catch (error) {
    // console.error(error);
    throw new ApiError(500, error.message);
  }
});

export const uploadResume = handler(async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.user?._id;

    if (!userId) throw new ApiError(401, "Unauthorized");
    if (!resumeText) throw new ApiError(400, "Resume text is required");

    const systemPrompt = "You are an expert AI agent to extract data form resume."

    const userPrompt = `extract dat from this resume: ${resumeText}
    
    Provide data in the following JSON format which no additional text before or after:

    {
    summary: { type: String, default: '' },
    accent_color: { type: String, default: '#3B82F6' },
    skills: [{ type: String }],
    personal_info: {
    image: { type: String, default: '' },
    full_name: { type: String, default: '' },
    profession: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    website: { type: String, default: '' },
  },
  experience: [{
      company: { type: String },
      position: { type: String },
      start_date: { type: String },
      end_date: { type: String },
      description: { type: String },
      is_current: { type: Boolean },
    }],
  project: [{
      name: { type: String },
      type: { type: String },
      description: { type: String },
    }],
  education: [{
      institution : { type: String },
      degree: { type: String },
      field: { type: String },
      graduation_date: { type: String },
      gpa: { type: String },
    }]
    }
    `
    const response = await ai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gemini-3-flash",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: userPrompt
        },
      ],
      response_format: { type: 'json_object' }
    })

    const extractedData = response.choices[0].message.content;
    let parsedData;

    try {
      parsedData = JSON.parse(extractedData);
    } catch (err) {
      console.error("JSON ERROR:", extractedData);
      throw new ApiError(500, "Invalid JSON from AI");
    }

    const newResume = await Resume.create({
      userId,
      title: title || "AI Generated Resume",
      ...parsedData
    });

    return res.status(201).json(
      new ApiResponse(201, { resumeId: newResume._id }, "Resume created")
    );
  } catch (error) {
    // console.error("UPLOAD ERROR:", error);
    throw new ApiError(500, error.message);
  }
})
