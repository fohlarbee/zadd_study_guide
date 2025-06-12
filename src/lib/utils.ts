import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function cleanNotesHTML(raw: string | undefined): string {
  if (!raw) return "";

  return raw
    .replace(/\{\s*"html"\s*:\s*"/g, "") 
    .replace(/\{\s*"content"\s*:\s*"/g, "")
    .replace(/"\s*\},/g, "")
    .replace(/"\s*}/g, "")
    .replace(/\\n/g, '<br/>')                         // Replace newline escapes with line breaks
    .replace(/\\t/g, ' ')                             // Optional: tabs to spaces
    .replace(/\\+"/g, '"')                            // Remove escaped quotes
    .replace(/\\"/g, '"')                             // Remove other escaped double quotes
    .replace(/\\'/g, "'")                             // Remove escaped single quotes
    .replace(/\\r/g, '')                              // Remove carriage returns
    .replace(/^\[|\]$/g, '')                          // Trim leading/trailing brackets
    .replace(/^"|"$/g, '')                            // Trim outermost quotes
    .replace(/<\/section>\s*<section>/g, '</section><br/><section>') // Add spacing between sections
    .trim();
}



