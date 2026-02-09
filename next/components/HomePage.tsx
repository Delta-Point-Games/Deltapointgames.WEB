"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import projectsData from "@/data/projects.json"
import eventsData from "@/data/events.json"
import teamData from "@/data/team.json"
import type { EventItem, Project, ProjectStatus, TeamMember } from "@/lib/types"
import { resolveImagePath, sortEventsDesc, statusToClass } from "@/lib/utils"

const projects = projectsData as Project[]
const events = sortEventsDesc(eventsData as EventItem[])
const team = teamData as TeamMember[]

const FILTER_OPTIONS: Array<ProjectStatus | "all"> = [
  "all",
  "Released",
  "In Development",
  "On Hold",
  "TBA"
]

export default function HomePage() {
  const [filterStatus, setFilterStatus] = useState<ProjectStatus | "all">("all")
  const heroBgRef = useRef<HTMLDivElement | null>(null)

  const filteredProjects = useMemo(() => {
    if (filterStatus === "all") return projects
    return projects.filter((project) => project.status === filterStatus)
  }, [filterStatus])

  useEffect(() => {
    // Fade-in observer for cards (re-run when filters update the list).
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible")
        })
      },
      { threshold: 0.12 }
    )

    document.querySelectorAll(".fade-up").forEach((node) => observer.observe(node))

    return () => observer.disconnect()
  }, [filterStatus])

  useEffect(() => {
    // If a video fallback exists for the hero animation, use it and slow playback.
    const base = "/Assets/Images/Snow_slow"
    const tryPaths = [`${base}.webm`, `${base}.mp4`]
    let cancelled = false

    async function attachVideo() {
      for (const path of tryPaths) {
        try {
          const res = await fetch(path, { method: "HEAD" })
          if (!res.ok) continue
          if (cancelled) return

          const bg = heroBgRef.current
          if (!bg || bg.dataset.videoReady === "true") return

          bg.style.backgroundImage = "none"
          const video = document.createElement("video")
          video.src = path
          video.autoplay = true
          video.loop = true
          video.muted = true
          video.playsInline = true
          video.style.width = "100%"
          video.style.height = "100%"
          video.style.objectFit = "cover"
          video.style.position = "absolute"
          video.style.inset = "0"
          video.style.zIndex = "-1"
          video.addEventListener("canplay", () => {
            try {
              video.playbackRate = 0.4
            } catch {
              // Best-effort only.
            }
          })

          bg.appendChild(video)
          bg.dataset.videoReady = "true"
          break
        } catch {
          // Ignore and continue to the next fallback.
        }
      }
    }

    attachVideo()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand-wrap">
            <img
              src="/Assets/Images/DPGIcon.png"
              alt="Delta Point Games logo"
              className="brand-icon"
            />
            <a className="brand" href="#hero">
              Delta Point Games
            </a>
          </div>
          <nav className="main-nav" aria-label="Primary">
            <a href="#projects">Projects</a>
            <a href="#events">Events</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
          </nav>
          <button
            type="button"
            id="themeToggle"
            aria-label="Toggle theme"
            className="theme-toggle"
            onClick={() => {
              document.documentElement.classList.toggle("light")
            }}
          >
            🌓
          </button>
        </div>
      </header>

      <main>
        <section id="hero" className="hero" role="region" aria-labelledby="hero-title">
          <div ref={heroBgRef} className="hero-bg" aria-hidden="true" />
          <div className="container hero-inner">
            <h1 id="hero-title">Delta Point Games</h1>
            <p className="tagline">
              Small Finnish Indie GameDev Team Working On Exciting And Passionate Gaming
              Projects.
            </p>
            <div className="hero-ctas">
              <a className="btn primary" href="#projects">
                View Projects
              </a>
              <a className="btn" href="#contact">
                Contact
              </a>
            </div>
          </div>
        </section>

        <section id="about" className="about container" role="region" aria-labelledby="about-title">
          <h2 id="about-title">About</h2>
          <p>
            Our mission here at Delta Point Games is to design and deliver creative,
            high-quality gaming experiences that inspire players and showcase the
            possibilities of interactive entertainment.
          </p>
          <p className="muted">
            Development philosophy: Player-first design, rapid prototyping, and polish
            over scope.
          </p>
        </section>

        <section
          id="projects"
          className="projects container"
          role="region"
          aria-labelledby="projects-title"
        >
          <h2 id="projects-title">Projects</h2>
          <div className="projects-controls">
            <label htmlFor="filterStatus">Filter:</label>
            <select
              id="filterStatus"
              aria-label="Filter projects by status"
              value={filterStatus}
              onChange={(event) => {
                setFilterStatus(event.target.value as ProjectStatus | "all")
              }}
            >
              {FILTER_OPTIONS.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All" : status}
                </option>
              ))}
            </select>
          </div>
          <div id="projectsGrid" className="grid" aria-live="polite">
            {filteredProjects.map((project) => (
              <article key={project.title} className="card fade-up" tabIndex={0}>
                <img src={resolveImagePath(project.image)} alt={`${project.title} key art`} />
                <h3>{project.title}</h3>
                <p className="muted">{project.description}</p>
                <div className="card-actions">
                  <span className={`status ${statusToClass(project.status)}`}>
                    {project.status}
                  </span>
                  {project.link ? (
                    <a className="btn open" href={project.link} target="_blank" rel="noopener">
                      Open
                    </a>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="events" className="events container" role="region" aria-labelledby="events-title">
          <h2 id="events-title">Events</h2>
          <div id="eventsList" className="grid">
            {events.map((event) => (
              <article key={event.name} className="card fade-up">
                <div className="event-row">
                  {event.image ? (
                    <img src={event.image} alt={`${event.name} logo`} />
                  ) : null}
                  <div>
                    <h3>
                      {event.name} <small className="muted">• {event.type}</small>
                    </h3>
                    <p className="muted">
                      {event.date} · {event.location}
                    </p>
                    <p>{event.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="team" className="team container" role="region" aria-labelledby="team-title">
          <h2 id="team-title">Team</h2>
          <div id="teamGrid" className="grid">
            {team.map((member, index) => {
              const avatar = member.avatar ?? "Assets/Images/Undisclosed.png"
              return (
                <article key={`${member.name ?? "member"}-${index}`} className="card team-card fade-up">
                  <img
                    className="avatar"
                    src={resolveImagePath(avatar)}
                    alt={`${member.name ?? "Team member"} avatar`}
                  />
                  <div>
                    <h3>{member.name ?? "Anonymous"}</h3>
                    <p className="muted">{member.role ?? "Contributor"}</p>
                    <p>{member.bio ?? ""}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </main>

      <footer id="contact" className="site-footer">
        <div className="container footer-inner">
          <div>
            <p>
              Contact: <a href="mailto:dpg.contact@deltapointgames.com">dpg.contact@deltapointgames.com</a>
            </p>
            <p>
              Follow us: <a href="https://discord.gg/3438hc8qvA">Discord</a> ·{" "}
              <a href="https://github.com/Delta-Point-Games/">GitHub</a> ·{" "}
              <a href="https://www.linkedin.com/company/dpgteam/">LinkedIn</a>
            </p>
          </div>
          <p className="copyright">© {new Date().getFullYear()} Delta Point Games. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  )
}
