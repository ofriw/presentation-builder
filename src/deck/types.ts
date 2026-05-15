export type PhosphorWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

export type StoryIcon =
  | 'architecture'
  | 'code'
  | 'community'
  | 'database'
  | 'decision'
  | 'evidence'
  | 'entryPoint'
  | 'failure'
  | 'future'
  | 'hammer'
  | 'hardDrives'
  | 'impact'
  | 'knowledge'
  | 'ledger'
  | 'legacy'
  | 'leads'
  | 'local'
  | 'missingView'
  | 'privacy'
  | 'price'
  | 'question'
  | 'research'
  | 'robot'
  | 'scale'
  | 'summarize'
  | 'sequence'
  | 'smileyDead'
  | 'spark'
  | 'table'
  | 'warning'
  | 'cubes';

export type PrimitiveKind =
  | 'hero'
  | 'metricTriptych'
  | 'linearScale'
  | 'fragmentedQuote'
  | 'decisionFunnel'
  | 'pipelineFailure'
  | 'iterativeLoop'
  | 'parallelResearch'
  | 'localVectorBreakthrough'
  | 'architectureSplit'
  | 'impactDashboard'
  | 'principleContrast'
  | 'knowledgeMoat'
  | 'closingCta';

export type Emphasis = 'default' | 'accent' | 'muted' | 'danger' | 'success';

export type FragmentMode = 'reveal' | 'emphasize' | 'fail' | 'activate';

export interface Fragment {
  id: string;
  targetId: string;
  mode: FragmentMode;
}

export interface Metric {
  value: string;
  label: string;
  caption?: string;
  emphasis?: Emphasis;
  icon?: StoryIcon;
}

export interface Card {
  id?: string;
  title: string;
  body?: string;
  caption?: string;
  emphasis?: Emphasis;
  icon?: StoryIcon;
  items?: string[];
}

export interface Step {
  id?: string;
  label: string;
  caption?: string;
  emphasis?: Emphasis;
}

export interface LinkItem {
  label: string;
  href: string;
}

export interface PrincipleContrastContent {
  bad: Card;
  good: Card;
  insight: string;
  footerLink?: string;
}

export interface ClosingCtaContent {
  links: LinkItem[];
  prompt: string;
  rule?: string;
}

export interface FragmentedQuoteItem {
  label: string;
  icon?: StoryIcon;
}

export interface FragmentedQuoteContent {
  quote: string;
  fragments: FragmentedQuoteItem[];
  footer: string;
  footerDetail?: string;
}

export interface ParallelResearchContent {
  hub: string;
  spokes: Card[];
  target: string;
  powerUpSequence?: string;
}

export interface SlidePrimitive<TContent = unknown> {
  kind: PrimitiveKind;
  title?: string;
  subtitle?: string;
  tone?: 'light' | 'dark';
  icon?: StoryIcon;
  iconWeight?: PhosphorWeight;
  content: TContent;
  fragments?: Fragment[];
  notes?: string;
}

export type Slide = SlidePrimitive;
