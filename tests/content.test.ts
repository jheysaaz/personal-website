import { describe, it, expect } from "vitest";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { projects } from "@/content/projects";
import { workExperiences } from "@/content/work";

describe("library markdown files", () => {
  const libraryDir = join(process.cwd(), "assets", "library");

  it("directory exists", () => {
    expect(existsSync(libraryDir)).toBe(true);
  });

  it("all .md files have valid frontmatter", () => {
    const files = readdirSync(libraryDir).filter((f) => f.endsWith(".md"));
    expect(files.length).toBeGreaterThan(0);

    for (const file of files) {
      const text = readFileSync(join(libraryDir, file), "utf-8");
      const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

      expect(match).not.toBeNull();
      if (!match) continue;

      const front = match[1];
      expect(front).toMatch(/^title:\s*.+/m);
      expect(front).toMatch(/^date:\s*.+/m);
    }
  });

  it("all status values are valid", () => {
    const files = readdirSync(libraryDir).filter((f) => f.endsWith(".md"));
    const validStatuses = ["draft", "in progress", "in-progress", "complete"];

    for (const file of files) {
      const text = readFileSync(join(libraryDir, file), "utf-8");
      const match = text.match(/^---\n([\s\S]*?)\n---\n/);
      if (!match) continue;

      const status = match[1].match(/^status:\s*(.+)/im)?.[1]?.trim().toLowerCase();
      if (status) {
        expect(validStatuses).toContain(status);
      }
    }
  });
});

describe("projects content", () => {
  it("has entries", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it("every project has localized description", () => {
    for (const project of projects) {
      expect(project.description.en).toBeTruthy();
      expect(project.description.es).toBeTruthy();
      expect(project.technologies).toBeInstanceOf(Array);
    }
  });
});

describe("work experiences content", () => {
  it("has entries", () => {
    expect(workExperiences.length).toBeGreaterThan(0);
  });

  it("every experience has required fields", () => {
    for (const exp of workExperiences) {
      expect(exp.title.en).toBeTruthy();
      expect(exp.title.es).toBeTruthy();
      expect(exp.company).toBeTruthy();
      expect(exp.description.en).toBeTruthy();
      expect(exp.description.es).toBeTruthy();
      expect(exp.achievements).toBeInstanceOf(Array);
      expect(exp.achievements.length).toBeGreaterThan(0);
      expect(exp.achievements[0].en).toBeTruthy();
      expect(exp.achievements[0].es).toBeTruthy();
    }
  });
});

describe("content parity", () => {
  it("projects have same count per locale", () => {
    for (const project of projects) {
      expect(project.description.en).toBeTruthy();
      expect(project.description.es).toBeTruthy();
      expect(project.longDescription.en).toBeTruthy();
      expect(project.longDescription.es).toBeTruthy();
    }
  });

  it("work experiences have same count per locale", () => {
    for (const exp of workExperiences) {
      expect(exp.title.en).toBeTruthy();
      expect(exp.title.es).toBeTruthy();
      expect(exp.achievements.length).toBeGreaterThan(0);
    }
  });
});
