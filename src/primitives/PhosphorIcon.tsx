import '@phosphor-icons/web/thin';
import '@phosphor-icons/web/light';
import '@phosphor-icons/web/regular';
import '@phosphor-icons/web/bold';
import '@phosphor-icons/web/fill';
import '@phosphor-icons/web/duotone';
import type { PhosphorWeight, StoryIcon } from '../deck/types';

interface Props {
  icon: StoryIcon;
  weight?: PhosphorWeight;
  label?: string;
  className?: string;
}

const WEIGHT_CLASS: Record<PhosphorWeight, string> = {
  thin: 'ph-thin',
  light: 'ph-light',
  regular: 'ph',
  bold: 'ph-bold',
  fill: 'ph-fill',
  duotone: 'ph-duotone',
};

const ICON_CLASS: Record<StoryIcon, string> = {
  architecture: 'ph-graph',
  code: 'ph-code',
  community: 'ph-users-three',
  cubes: 'ph-cubes',
  database: 'ph-database',
  hardDrives: 'ph-hard-drives',
  decision: 'ph-funnel',
  entryPoint: 'ph-map-pin',
  evidence: 'ph-seal-check',
  failure: 'ph-warning-diamond',
  future: 'ph-rocket-launch',
  hammer: 'ph-hammer',
  impact: 'ph-chart-line-up',
  knowledge: 'ph-brain',
  ledger: 'ph-notebook',
  leads: 'ph-brackets-curly',
  legacy: 'ph-clock-counter-clockwise',
  local: 'ph-pencil-simple-line',
  missingView: 'ph-eye-slash',
  privacy: 'ph-shield-check',
  price: 'ph-currency-dollar',
  question: 'ph-crosshair',
  research: 'ph-magnifying-glass',
  robot: 'ph-robot',
  scale: 'ph-arrows-out',
  summarize: 'ph-stack',
  sequence: 'ph-arrows-clockwise',
  smileyDead: 'ph-smiley-x-eyes',
  spark: 'ph-sparkle',
  table: 'ph-table',
  warning: 'ph-warning',
};

export const ICON_RULES = [
  'Use icons as semantic cueing, never decoration.',
  'One dominant icon per slide; repeat icons only to clarify a sequence or category.',
  'Match icon weight to the surrounding visual weight, not just importance.',
  'Use fill for dominant slide anchors and high-emphasis signals; use bold for supporting semantic icons.',
  'Avoid regular, light, thin, and duotone in this deck unless a slide explicitly needs a softer illustrative effect.',
  'Style icons only with font-size and color; Phosphor owns font-family, weight, and pseudo-elements.',
] as const;

export function PhosphorIcon({ icon, weight = 'bold', label, className = '' }: Props) {
  // WHY: All presentation icons route through this component so the visual-story rules
  // above stay enforceable in code, not scattered as design folklore across slides.
  const accessibility = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };

  return <i className={`story-icon ${WEIGHT_CLASS[weight]} ${ICON_CLASS[icon]} ${className}`} {...accessibility} />;
}
