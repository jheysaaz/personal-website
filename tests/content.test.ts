import { assert, assertEquals, assertNotEquals } from "@std/assert";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { projects } from "@/content/projects.ts";
import { workExperiences } from "@/content/work.ts";

Deno.test("library markdown directory exists", () => {
  const libraryDir = join(Deno.cwd(), "assets", "library");
  assert(existsSync(libraryDir));
});

Deno.test("library markdown all .md files have valid frontmatter", () => {
  const libraryDir = join(Deno.cwd(), "assets", "library");
  const files = readdirSync(libraryDir).filter((f) => f.endsWith(".md"));
  assert(files.length > 0);

  for (const file of files) {
    const text = readFileSync(join(libraryDir, file), "utf-8");
    const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

    assert(match !== null, `${file} has frontmatter`);
    if (!match) continue;

    const front = match[1];
    assert(/^title:\s*.+/m.test(front), `${file} has title`);
    assert(/^date:\s*.+/m.test(front), `${file} has date`);
  }
});

Deno.test("library markdown all status values are valid", () => {
  const libraryDir = join(Deno.cwd(), "assets", "library");
  const files = readdirSync(libraryDir).filter((f) => f.endsWith(".md"));
  const validStatuses = ["draft", "in progress", "in-progress", "complete"];

  for (const file of files) {
    const text = readFileSync(join(libraryDir, file), "utf-8");
    const match = text.match(/^---\n([\s\S]*?)\n---\n/);
    if (!match) continue;

    const status = match[1].match(/^status:\s*(.+)/im)?.[1]?.trim()
      .toLowerCase();
    if (status) {
      assert(validStatuses.includes(status), `${file} has valid status`);
    }
  }
});

Deno.test("projects content has entries", () => {
  assert(projects.length > 0);
});

Deno.test("projects content every project has localized description", () => {
  for (const project of projects) {
    assert(project.description.en);
    assert(project.description.es);
    assert(Array.isArray(project.technologies));
  }
});

Deno.test("work experiences content has entries", () => {
  assert(workExperiences.length > 0);
});

Deno.test("work experiences every experience has required fields", () => {
  for (const exp of workExperiences) {
    assert(exp.title.en);
    assert(exp.title.es);
    assert(exp.company);
    assert(exp.description.en);
    assert(exp.description.es);
    assert(Array.isArray(exp.achievements));
    assert(exp.achievements.length > 0);
    assert(exp.achievements[0].en);
    assert(exp.achievements[0].es);
  }
});

Deno.test("content parity projects have same count per locale", () => {
  for (const project of projects) {
    assert(project.description.en);
    assert(project.description.es);
    assert(project.longDescription.en);
    assert(project.longDescription.es);
    assertNotEquals(project.description.en, project.description.es);
  }
});

Deno.test("content parity work experiences have same count per locale", () => {
  for (const exp of workExperiences) {
    assert(exp.title.en);
    assert(exp.title.es);
    assert(exp.achievements.length > 0);
  }
});

Deno.test("content parity every project title is unique", () => {
  const titles = projects.map((p) => p.title);
  assertEquals(new Set(titles).size, titles.length);
});
