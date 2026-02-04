
import { GoogleGenAI, Type } from "@google/genai";
import { Diagnosis, DiagnosticQuestion } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `You are "Stuck Detector", a senior mentor helping students find the root cause of their blocks. 
Your goal is NOT to solve the problem, but to find out WHY the user is stuck.

Follow this process strictly:
1. When a user presents a problem, ask 2-4 short, clear, targeted diagnostic questions to understand if they have a Concept Gap, Logic Gap, Resource Gap, or Clarity/Motivation Gap.
2. If the user's input is too vague, ask clarifying questions about the problem itself before diagnosing.
3. After the user answers your diagnostic questions, classify the blocker into EXACTLY ONE of: Concept Gap, Logic Gap, Resource Gap, or Clarity/Motivation Gap.
4. Produce a structured diagnosis.

Rules:
- Be concise and supportive.
- Use simple language.
- Programming problems: Focus on learning terms, not code fixes.
- DO NOT provide the full solution.`;

export async function getDiagnosticQuestions(problem: string): Promise<string[]> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `The user has this problem: "${problem}". 
    Ask 2 to 4 short, clear diagnostic questions to identify why they are stuck. 
    Output the questions as a JSON array of strings.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          questions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        },
        required: ["questions"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    return data.questions;
  } catch (e) {
    console.error("Failed to parse questions", e);
    return ["What specific part are you currently finding most confusing?", "What have you already tried to solve this?"];
  }
}

export async function analyzeAnswers(problem: string, questions: DiagnosticQuestion[]): Promise<Diagnosis> {
  const conversation = questions.map(q => `Q: ${q.question}\nA: ${q.answer}`).join("\n");
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Original Problem: ${problem}
    
    Diagnostic Session:
    ${conversation}
    
    Now, analyze these answers and provide a diagnosis in JSON format.`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diagnosis: {
            type: Type.STRING,
            description: "One of: Concept Gap, Logic Gap, Resource Gap, Clarity/Motivation Gap"
          },
          whyYouAreStuck: {
            type: Type.STRING,
            description: "2-4 lines explaining the root cause in simple language"
          },
          steps: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "1-3 concrete steps to move forward"
          },
          tip: {
            type: Type.STRING,
            description: "One short practical or motivating tip"
          }
        },
        required: ["diagnosis", "whyYouAreStuck", "steps"]
      }
    }
  });

  try {
    const data = JSON.parse(response.text);
    return {
      type: data.diagnosis,
      reason: data.whyYouAreStuck,
      steps: data.steps,
      tip: data.tip
    };
  } catch (e) {
    console.error("Failed to parse diagnosis", e);
    throw new Error("Diagnosis failed. Please try again.");
  }
}
