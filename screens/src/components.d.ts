/**
 * This is an autogenerated file created by the Stencil build process.
 * It contains typing information for all components that exist in this project
 * and imports for stencil collections that might be configured in your stencil.config.js file
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;
    componentOnReady(done: (ele?: this) => void): void;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import '@apizi/ui';


declare global {

  namespace StencilComponents {
    interface IPreferCows {

    }
  }

  interface HTMLIPreferCowsElement extends StencilComponents.IPreferCows, HTMLStencilElement {}

  var HTMLIPreferCowsElement: {
    prototype: HTMLIPreferCowsElement;
    new (): HTMLIPreferCowsElement;
  };
  interface HTMLElementTagNameMap {
    'i-prefer-cows': HTMLIPreferCowsElement;
  }
  interface ElementTagNameMap {
    'i-prefer-cows': HTMLIPreferCowsElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'i-prefer-cows': JSXElements.IPreferCowsAttributes;
    }
  }
  namespace JSXElements {
    export interface IPreferCowsAttributes extends HTMLAttributes {

    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;