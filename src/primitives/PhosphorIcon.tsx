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
  database: 'ph-database',
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
  warning: 'ph-warning',
};

export const ICON_RULES = [
  'Use icons as semantic cueing, never decoration.',
  'One dominant icon per slide; repeat icons only to clarify a sequence or category.',
  'Prefer bold/fill for key signals, regular/light for secondary labels, duotone for hero moments.',
  'Style icons only with font-size and color; Phosphor owns font-family, weight, and pseudo-elements.',
] as const;

export function PhosphorIcon({ icon, weight = 'bold', label, className = '' }: Props) {
  // WHY: All presentation icons route through this component so the visual-story rules
  // above stay enforceable in code, not scattered as design folklore across slides.
  const accessibility = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };

  return <i className={`story-icon ${WEIGHT_CLASS[weight]} ${ICON_CLASS[icon]} ${className}`} {...accessibility} />;
}
