import { CustomElement } from 'custom-elements-ts';

@CustomElement({
  tag: 'app-root',
  templateUrl: './app.element.html',
  styleUrl: './app.element.scss',
  shadow: false
})
export class AppElement extends HTMLElement { }