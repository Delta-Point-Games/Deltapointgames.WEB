import type { ProjectStatus } from "@/lib/types"

const STATUS_CLASS_MAP: Record<ProjectStatus, string> = {
  Released: "status-released",
  "In Development": "status-in-development",
  "On Hold": "status-on-hold",
  TBA: "status-tba",
  "[REDACTED]": "status-redacted"
}

export function statusToClass(status: ProjectStatus) {
  return STATUS_CLASS_MAP[status] ?? ""
}

export function sortEventsDesc<T extends { date?: string }>(items: T[]) {
  // Keep legacy behavior: compare date strings as-is.
  return [...items].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""))
}

export function resolveImagePath(path: string) {
  if (/^https?:\/\//i.test(path)) return path
  return `/${path.replace(/^\//, "")}`
}
