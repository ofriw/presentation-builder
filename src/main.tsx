import { createRoot } from 'react-dom/client';
import { deck } from './deck/geektime-code-2026';
import { SlideFrame } from './slides/SlideFrame';
import { PresenterConsole } from './presenter/PresenterConsole';
import './theme/applied-materials.css';

const isPresenter = new URLSearchParams(window.location.search).has('presenter');

createRoot(document.getElementById('root')!).render(
  isPresenter ? <PresenterConsole slides={deck} /> : <SlideFrame slides={deck} />,
);
