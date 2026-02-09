export type ProjectStatus = "Released" | "In Development" | "On Hold" | "TBA" | "[REDACTED]"

export type Project = {
  title: string
  image: string
  description: string
  status: ProjectStatus
  link?: string
}

export type EventItem = {
  name: string
  type: string
  date: string
  location: string
  description: string
  image?: string
  status?: string
}

export type TeamMember = {
  name?: string
  role?: string
  bio?: string
  avatar?: string
}
