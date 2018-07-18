/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */

import '@stencil/core';

declare global {
  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {}
  }
  namespace JSXElements {}

  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import '@bearer/ui';
import '@stencil/redux';


declare global {

  namespace StencilComponents {
    interface AttachPullRequest {

    }
  }

  interface HTMLAttachPullRequestElement extends StencilComponents.AttachPullRequest, HTMLStencilElement {}

  var HTMLAttachPullRequestElement: {
    prototype: HTMLAttachPullRequestElement;
    new (): HTMLAttachPullRequestElement;
  };
  interface HTMLElementTagNameMap {
    'attach-pull-request': HTMLAttachPullRequestElement;
  }
  interface ElementTagNameMap {
    'attach-pull-request': HTMLAttachPullRequestElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'attach-pull-request': JSXElements.AttachPullRequestAttributes;
    }
  }
  namespace JSXElements {
    export interface AttachPullRequestAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface AttachPullRequestDisplay {

    }
  }

  interface HTMLAttachPullRequestDisplayElement extends StencilComponents.AttachPullRequestDisplay, HTMLStencilElement {}

  var HTMLAttachPullRequestDisplayElement: {
    prototype: HTMLAttachPullRequestDisplayElement;
    new (): HTMLAttachPullRequestDisplayElement;
  };
  interface HTMLElementTagNameMap {
    'attach-pull-request-display': HTMLAttachPullRequestDisplayElement;
  }
  interface ElementTagNameMap {
    'attach-pull-request-display': HTMLAttachPullRequestDisplayElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'attach-pull-request-display': JSXElements.AttachPullRequestDisplayAttributes;
    }
  }
  namespace JSXElements {
    export interface AttachPullRequestDisplayAttributes extends HTMLAttributes {

    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }
