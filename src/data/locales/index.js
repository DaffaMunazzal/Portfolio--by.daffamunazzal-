/* src/data/locales/index.js
   Merges locale text with raw data (projects, experiences, skills). */
import id from "./id";
import en from "./en";
import deu from "./deu";
import { projects as rawProjects } from "../projects";
import { timelineItems as rawExperience } from "../experience";
import { skillGroups as rawSkillGroups } from "../skills";

export const locales = { id, en, deu };

/**
 * Returns merged projects for the given language code
 */
export function getProjects(langCode = "id") {
  const loc = locales[langCode]?.projects || locales.id.projects;
  return rawProjects.map((p) => {
    const itemText = loc.items?.[p.id] || {};
    return {
      ...p,
      title: itemText.title || p.title || `Project ${p.id}`,
      shortDesc: itemText.shortDesc || p.shortDesc || "",
      fullDesc: itemText.fullDesc || p.fullDesc || "",
    };
  });
}

/**
 * Returns merged experience timeline items for the given language code
 */
export function getExperience(langCode = "id") {
  const loc = locales[langCode]?.experience || locales.id.experience;
  return rawExperience.map((e) => {
    const itemText = loc.items?.[e.id] || {};
    return {
      ...e,
      title: itemText.title || e.title || "",
      institution: itemText.institution || e.institution || "",
      location: itemText.location || e.location || "",
      description: itemText.description || e.description || "",
      tags: itemText.tags || e.tags || [],
    };
  });
}

/**
 * Returns merged skill groups with translated category titles
 */
export function getSkillGroups(langCode = "id") {
  const loc = locales[langCode]?.skills || locales.id.skills;
  return rawSkillGroups.map((g) => ({
    ...g,
    label: loc.groupTitles?.[g.id] || g.label || g.id,
  }));
}
