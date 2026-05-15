import type {
  Card,
  ClosingCtaContent,
  FragmentedQuoteContent,
  LinkItem,
  Metric,
  ParallelResearchContent,
  PrincipleContrastContent,
  Slide,
  StoryIcon,
} from '../deck/types';
import { PhosphorIcon } from './PhosphorIcon';

interface Props {
  slide: Slide;
  fragmentStep: number;
}

export function SlidePrimitive({ slide, fragmentStep }: Props) {
  switch (slide.kind) {
    case 'hero': return <Hero slide={slide} />;
    case 'metricTriptych': return <MetricTriptych slide={slide} />;
    case 'linearScale': return <LinearScale slide={slide} />;
    case 'fragmentedQuote': return <FragmentedQuote slide={slide} fragmentStep={fragmentStep} />;
    case 'decisionFunnel': return <DecisionFunnel slide={slide} fragmentStep={fragmentStep} />;
    case 'pipelineFailure': return <PipelineFailure slide={slide} fragmentStep={fragmentStep} />;
    case 'iterativeLoop': return <IterativeLoop slide={slide} fragmentStep={fragmentStep} />;
    case 'parallelResearch': return <ParallelResearch slide={slide} fragmentStep={fragmentStep} />;
    case 'localVectorBreakthrough': return <LocalVectorBreakthrough slide={slide} />;
    case 'architectureSplit': return <ArchitectureSplit slide={slide} />;
    case 'impactDashboard': return <ImpactDashboard slide={slide} />;
    case 'principleContrast': return <PrincipleContrast slide={slide} />;
    case 'knowledgeMoat': return <KnowledgeMoat slide={slide} />;
    case 'closingCta': return <ClosingCta slide={slide} />;
  }
}

function Header({ slide, eyebrow, subtitle }: { slide: Slide; eyebrow?: string; subtitle?: string }) {
  const overline = eyebrow ?? (subtitle ? undefined : slide.subtitle);

  return (
    <header className="slide-header">
      {overline && <p className="header-eyebrow">{overline}</p>}
      <div className="header-title-block">
        <div className="title-lockup">
          <h1>{slide.title}</h1>
        </div>
        {subtitle && <p className="title-subtitle">{subtitle}</p>}
      </div>
    </header>
  );
}

function Hero({ slide }: { slide: Slide }) {
  const content = slide.content as { mark: string; caption: string };
  return (
    <section className="hero-stage">
      <div className="hero-copy">
        <p className="eyebrow">{slide.subtitle}</p>
        <div className="title-lockup hero-title">
          {slide.icon && <PhosphorIcon icon={slide.icon} weight={slide.iconWeight ?? 'duotone'} />}
          <h1>{slide.title}</h1>
        </div>
      </div>
      {content.mark && (
        <div className="terminal-card">
          <strong>{content.mark}</strong>
          {content.caption && <span>{content.caption}</span>}
        </div>
      )}
    </section>
  );
}

function MetricTriptych({ slide }: { slide: Slide }) {
  const content = slide.content as { metrics: Metric[]; backdrop: string };
  return (
    <>
      <Header slide={slide} />
      <div className="scale-story">
        <div className="codebase-field" aria-label="180 million lines represented as modules">
          {Array.from({ length: 48 }, (_, index) => <span className={index % 11 === 0 ? 'hot' : ''} key={index} />)}
        </div>
        <div className="metric-grid">{content.metrics.map((metric) => <MetricTile key={metric.value} metric={metric} />)}</div>
      </div>
      {content.backdrop && <p className="stage-caption">{content.backdrop}</p>}
    </>
  );
}

function MetricTile({ metric }: { metric: Metric }) {
  return (
    <article className={`metric-tile ${metric.emphasis ?? ''}`}>
      {metric.icon && <PhosphorIcon icon={metric.icon} weight="fill" />}
      <strong>{metric.value}</strong>
      <span>{metric.label}</span>
      {metric.caption && <small>{metric.caption}</small>}
    </article>
  );
}

interface ScaleReference { label: string; value: number; caption?: string }
interface LinearScaleContent {
  max: number;
  unit: string;
  references: ScaleReference[];
  subject: ScaleReference;
  callouts: string[];
  facts: string[];
  hyperscaleNote: string;
  caveat: string;
}

function LinearScale({ slide }: { slide: Slide }) {
  const content = slide.content as LinearScaleContent;
  const ticks = [0, 100, 150, 180, 200];
  const width = (value: number) => `${Math.min(100, (value / content.max) * 100)}%`;

  return (
    <>
      <Header slide={slide} />
      <div className="linear-scale-story">
        <div className="scale-axis" aria-hidden="true">
          {ticks.map((tick) => (
            <span className="axis-tick" style={{ left: width(tick) }} key={tick}>
              {tick === 0 ? '0' : `${tick}${content.unit.split(' ')[0]}`}
            </span>
          ))}
          {content.references.map((reference, index) => (
            <span className={`reference-tick ${index % 2 === 0 ? 'high' : 'low'}`} style={{ left: width(reference.value) }} key={reference.label}>
              <b>{reference.label}</b>
              <small>{reference.value}M</small>
            </span>
          ))}
        </div>
        <div className="scale-bars" aria-label="Linear codebase size comparison in millions of lines of code">
          <div className="scale-row subject">
            <div>
              <strong>{content.subject.label}</strong>
              {content.subject.caption && <small>{content.subject.caption}</small>}
            </div>
            <span className="scale-bar" style={{ width: width(content.subject.value) }}>
              <b>{content.subject.caption}</b>
            </span>
          </div>
        </div>
        <div className="scale-callouts">
          {content.callouts.map((callout) => {
            const [value, label] = callout.split('|');
            return <span key={callout}><b>{value}</b><small>{label}</small></span>;
          })}
        </div>
        {content.facts.length > 0 && <div className="scale-facts">
          {content.facts.map((fact) => <strong key={fact}>{fact}</strong>)}
        </div>}
        {content.hyperscaleNote && <p className="hyperscale-note">{content.hyperscaleNote}</p>}
        {content.caveat && <p className="scale-caveat">{content.caveat}</p>}
      </div>
    </>
  );
}

function FragmentedQuote({ slide, fragmentStep }: Props) {
  const content = slide.content as FragmentedQuoteContent;
  return (
    <>
      <Header slide={slide} />
      <div className="quote-map">
        <blockquote>{content.quote}</blockquote>
        <div className="knowledge-shards">
          {content.fragments.map((item, index) => (
            <span className={isVisible(index, fragmentStep)} key={item.label}>
              {item.icon && <PhosphorIcon icon={item.icon} weight="bold" className="knowledge-shard-icon" />}
              <strong>{item.label}</strong>
            </span>
          ))}
        </div>
      </div>
      {(content.footer || content.footerDetail) && (
        <div className="danger-block">
          {content.footer && <p className="danger-line">{content.footer}</p>}
          {content.footerDetail && <p className="danger-detail">{content.footerDetail}</p>}
        </div>
      )}
    </>
  );
}

function DecisionFunnel({ slide, fragmentStep }: Props) {
  const content = slide.content as { inputs: string[]; filters: string[]; result: string };
  const filterIcon = (label: string): StoryIcon | undefined => {
    if (label.startsWith('Scale:')) return 'scale';
    if (label.startsWith('Privacy:')) return 'privacy';
    if (label.startsWith('Price:')) return 'price';
    return undefined;
  };

  return (
    <>
      <Header slide={slide} />
      <div className="decision-funnel">
        <div className="option-stream" aria-label="Rejected options">
          {content.inputs.map((input) => <span key={input}>{input}</span>)}
        </div>
        <div className="filter-stack" aria-label="Decision constraint gates">
          {content.filters.map((filter, index) => {
            const icon = filterIcon(filter);
            return (
              <div className={`filter gate-${index} ${isVisible(index, fragmentStep)}`} key={filter}>
                {icon && <PhosphorIcon icon={icon} weight="bold" className="filter-icon" />}
                <span>{filter}</span>
              </div>
            );
          })}
        </div>
        {content.result && <strong>{content.result}</strong>}
      </div>
    </>
  );
}

function PipelineFailure({ slide, fragmentStep }: Props) {
  const content = slide.content as { steps: string[]; failureAt: number; scaleMismatch?: string; reason: string };

  return (
    <>
      <Header slide={slide} subtitle={slide.subtitle} />
      <div className="rag-failure">
        <div className="pipeline-diagram" aria-label="Textbook RAG pipeline">
          {content.steps.map((step, index) => <div className={`pipeline-step ${stepState(index, content.failureAt, fragmentStep)}`} key={step}>{step}</div>)}
        </div>
        {content.scaleMismatch && (
          <p className={`scale-mismatch reveal ${fragmentStep > 0 ? 'visible' : ''}`}>
            <strong>Scale mismatch:</strong> {content.scaleMismatch}
          </p>
        )}
      </div>
      {content.reason && <p className={`danger-line reveal ${fragmentStep > 0 ? 'visible' : ''}`}>✕ {content.reason}</p>}
    </>
  );
}

interface InvestigationStep {
  label: string;
  detail: string;
  note: string;
  icon: StoryIcon;
}

interface InvestigationContent {
  question: string;
  trail: InvestigationStep[];
  ledger: string[];
  answer: string;
}

function IterativeLoop({ slide, fragmentStep }: Props) {
  const content = slide.content as InvestigationContent;
  return (
    <>
      <Header slide={slide} subtitle={slide.subtitle} />
      <div className="investigation-board">
        <p className="case-question">“{content.question}”</p>
        <div className="clue-trail" aria-label="ChunkHound investigation trail">
          {content.trail.map((step, index) => (
            <article className={`clue-card ${isVisible(index, fragmentStep)}`} key={step.label}>
              <PhosphorIcon icon={step.icon} weight="bold" />
              <small>{step.label}</small>
              <strong>{step.detail}</strong>
              <span>{step.note}</span>
            </article>
          ))}
          <aside className={`case-ledger ${isVisible(content.trail.length, fragmentStep)}`}>
            <PhosphorIcon icon="ledger" weight="bold" />
            <b>Facts ledger</b>
            {content.ledger.map((item) => <small key={item}>{item}</small>)}
          </aside>
          <strong className={`case-answer ${isVisible(content.trail.length + 1, fragmentStep)}`}>{content.answer}</strong>
        </div>
      </div>
    </>
  );
}

function ParallelResearch({ slide, fragmentStep }: Props) {
  const content = slide.content as ParallelResearchContent;
  return (
    <>
      <Header slide={slide} />
      <div className="research-hub">
        {content.hub && <strong>{content.hub}{content.target && <small>{content.target}</small>}</strong>}
        {content.spokes.map((spoke, index) => <article className={`spoke-card ${isVisible(index, fragmentStep)}`} key={spoke.title}>{spoke.icon && <PhosphorIcon icon={spoke.icon} weight="bold" />}<h3>{spoke.title}</h3><p>{spoke.caption}</p></article>)}
      </div>
      {content.powerUpSequence && (
        <div className="power-up-strip" aria-label="Power-up sequence example">
          <b>Reconstructed power-up sequence</b>
          <div>
            {content.powerUpSequence.split('→').map((step) => <span key={step.trim()}>{step.trim()}</span>)}
          </div>
        </div>
      )}
    </>
  );
}

function LocalVectorBreakthrough({ slide }: { slide: Slide }) {
  const content = slide.content as {
    cloud: string;
    boundary: string;
    pressure: string[];
    source: { title: string; caption: string; icon?: StoryIcon };
    index: { title: string; shards: string[]; icon?: StoryIcon };
    bypass: string;
    result: string;
  };

  return (
    <>
      <Header slide={slide} />
      <div className="local-vector-story" aria-label="Cloud-scale vector database assumptions constrained inside a developer laptop">
        <section className="cloud-assumption">
          <svg className="cloud-shape" viewBox="0 0 390 223" aria-hidden="true" focusable="false">
            <path className="cloud-core" d="M47 168h267c36 0 60-22 60-54 0-33-28-58-69-58-15-30-49-49-90-49-49 0-90 27-106 67-41 1-73 25-73 58 0 14 5 25 11 36z" />
            <path className="cloud-outline" d="M47 168h267c36 0 60-22 60-54 0-33-28-58-69-58-15-30-49-49-90-49-49 0-90 27-106 67-41 1-73 25-73 58 0 14 5 25 11 36z" />
            <g className="cloud-vector-db" transform="translate(-11 -4.5)">
              <path className="db-body" d="M159 94v44c0 8 21 14 47 14s47-6 47-14V94z" />
              <ellipse className="db-cap" cx="206" cy="94" rx="47" ry="14" />
              <path className="db-slice" d="M161 114.65 L162.7 116.07 L164.88 117.41 L167.5 118.65 L170.53 119.8 L173.95 120.84 L177.71 121.77 L181.8 122.57 L186.18 123.24 L190.82 123.78 L195.69 124.18 L200.76 124.42 L206 124.5 L211.24 124.42 L216.31 124.18 L221.18 123.78 L225.82 123.24 L230.2 122.57 L234.29 121.77 L238.05 120.84 L241.47 119.8 L244.5 118.65 L247.12 117.41 L249.3 116.07 L251 114.65 L251 126.65 L249.3 128.07 L247.12 129.41 L244.5 130.65 L241.47 131.8 L238.05 132.84 L234.29 133.77 L230.2 134.57 L225.82 135.24 L221.18 135.78 L216.31 136.18 L211.24 136.42 L206 136.5 L200.76 136.42 L195.69 136.18 L190.82 135.78 L186.18 135.24 L181.8 134.57 L177.71 133.77 L173.95 132.84 L170.53 131.8 L167.5 130.65 L164.88 129.41 L162.7 128.07 L161 126.65 Z" />
              <path className="db-band" d="M159 109c0 8 21 14 47 14s47-6 47-14" />
              <path className="db-band" d="M159 124c0 8 21 14 47 14s47-6 47-14" />
            </g>
          </svg>
          <strong>{content.cloud}</strong>
          <small>millions of vectors</small>
        </section>

        <div className="compression-arrow" aria-hidden="true">→</div>

        <section className="laptop-boundary">
          <div className="laptop-screen">
            <p className="privacy-boundary">{content.boundary}</p>
            <div className="laptop-load">
              {content.pressure.map((item) => <span key={item}>{item}</span>)}
            </div>
            <div className="local-architecture">
              <article className="duckdb-node">
                <b>
                  {content.source.icon && <PhosphorIcon icon={content.source.icon} weight="regular" className="node-icon" />}
                  <span>{content.source.title}</span>
                </b>
                <small>{content.source.caption}</small>
              </article>
              <div className="semantic-lane">
                <span>{content.bypass}</span>
              </div>
              <article className="usearch-node">
                <b>
                  {content.index.icon && <PhosphorIcon icon={content.index.icon} weight="light" className="node-icon" />}
                  <span>{content.index.title}</span>
                </b>
                <div>{content.index.shards.map((shard) => <i key={shard}>{shard}</i>)}</div>
              </article>
            </div>
          </div>
          <div className="laptop-base" aria-hidden="true" />
          <strong className="local-result">{content.result}</strong>
        </section>
      </div>
    </>
  );
}

function ArchitectureSplit({ slide }: { slide: Slide }) {
  const content = slide.content as { problem: string[]; solution: string[] };
  return (
    <>
      <Header slide={slide} />
      <div className="architecture-split">
        <List title="Problem" items={content.problem} tone="danger" icon="failure" />
        <List title="Solution" items={content.solution} tone="accent" icon="architecture" />
      </div>
    </>
  );
}

function ImpactDashboard({ slide }: { slide: Slide }) {
  const content = slide.content as { metrics: Metric[]; proof: string[] };
  return (
    <>
      <Header slide={slide} />
      <div className="impact-dashboard">
        {content.metrics.map((metric) => <MetricTile key={metric.label} metric={metric} />)}
      </div>
      {content.proof?.length > 0 && <div className="chips">{content.proof.map((item) => <span key={item}>{item}</span>)}</div>}
    </>
  );
}

function PrincipleContrast({ slide }: { slide: Slide }) {
  const content = slide.content as PrincipleContrastContent;
  return (
    <>
      <Header slide={slide} />
      <div className="architecture-split">
        <List title={content.bad.title} items={content.bad.items ?? []} tone="danger" icon={content.bad.icon ?? 'warning'} />
        <List title={content.good.title} items={content.good.items ?? []} tone="accent" icon={content.good.icon ?? 'spark'} />
      </div>
      {content.insight && <p className="insight">{content.insight}</p>}
      {content.footerLink && <p className="footer-link">{content.footerLink}</p>}
    </>
  );
}

function KnowledgeMoat({ slide }: { slide: Slide }) {
  const content = slide.content as { layers: string[]; moat: string };
  return (
    <>
      <Header slide={slide} />
      <div className="moat-diagram">
        <strong>Private knowledge graph</strong>
        {content.layers.map((layer) => <span key={layer}>{layer}</span>)}
        <em>public model knowledge stops at the boundary</em>
      </div>
      {content.moat && <p className="insight">{content.moat}</p>}
    </>
  );
}

function ClosingCta({ slide }: { slide: Slide }) {
  const content = slide.content as ClosingCtaContent;
  return (
    <section className="hero-stage closing">
      <div className="hero-copy">
        <h1>{slide.title}</h1>
        {content.prompt && <p>{content.prompt}</p>}
      </div>
      <div className="links">{content.links.map((link) => <a href={link.href} key={link.href}>{link.label}</a>)}</div>
      {content.rule && <p className="closing-rule">{content.rule}</p>}
      {slide.subtitle && <strong className="closing-note">{slide.subtitle}</strong>}
    </section>
  );
}

function List({ title, items, tone, icon }: { title: string; items: string[]; tone?: string; icon?: StoryIcon }) {
  return <article className={`list-card ${tone ?? ''}`}>{icon && <PhosphorIcon icon={icon} weight="bold" />}<h2>{title}</h2><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></article>;
}

function isVisible(index: number, fragmentStep: number) {
  return index < fragmentStep ? 'visible' : '';
}

function isActive(index: number, fragmentStep: number, stepCount: number) {
  return fragmentStep > 0 && index === (fragmentStep - 1) % stepCount ? 'active' : '';
}

function stepState(index: number, failureAt: number, fragmentStep: number) {
  if (fragmentStep === 0) return '';
  if (index === failureAt) return 'danger';
  if (index > failureAt) return 'muted';
  return 'confirmed';
}
