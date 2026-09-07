import { BODY_THEATER_DISCLOSURE, bodyTheaterScenes } from "@/lib/health-v3/body-theater";
import type { HealthArticleSlug } from "@/lib/health-v3/content";

export function BodyTheater({ slug }: { slug: HealthArticleSlug }) {
  const scene = bodyTheaterScenes[slug];
  const titleId = `body-theater-${scene.sceneKey}`;

  return (
    <section className="onurim-body-theater" aria-labelledby={titleId} data-scene-key={scene.sceneKey} data-motion={scene.motion}>
      <div className="onurim-body-theater-copy">
        <p className="onurim-mini-label">몸속 한 장면</p>
        <h2 id={titleId}>{scene.title}</h2>
        <p>{scene.explanation}</p>
        <ol>
          {scene.labels.map((label, index) => <li key={label}><span>{index + 1}</span>{label}</li>)}
        </ol>
      </div>
      <figure>
        <svg viewBox="0 0 360 190" role="img" aria-labelledby={`${titleId}-svg-title ${titleId}-svg-desc`}>
          <title id={`${titleId}-svg-title`}>{scene.concept}</title>
          <desc id={`${titleId}-svg-desc`}>{scene.explanation}</desc>
          <rect x="1" y="1" width="358" height="188" rx="26" className="onurim-theater-bg" />
          <path d={scene.secondaryPath} className="onurim-theater-secondary" />
          <path d={scene.path} className="onurim-theater-primary" />
          <circle cx={scene.focus[0]} cy={scene.focus[1]} r="13" className="onurim-theater-focus" />
          <circle r="7" className="onurim-theater-runner"><animateMotion dur="5.6s" repeatCount="indefinite" path={scene.path} /></circle>
        </svg>
        <figcaption>{BODY_THEATER_DISCLOSURE}</figcaption>
      </figure>
      <p className="onurim-body-theater-sources">근거: {scene.sourceIds.map((id, index) => <span key={id}>{index ? " · " : ""}<a href={`#source-${id}`}>{id}</a></span>)}</p>
    </section>
  );
}
