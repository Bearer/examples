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

  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}
}

import '@apizi/ui';


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


declare global {

  namespace StencilComponents {
    interface AttachPullRequestSetup {

    }
  }

  interface HTMLAttachPullRequestSetupElement extends StencilComponents.AttachPullRequestSetup, HTMLStencilElement {}

  var HTMLAttachPullRequestSetupElement: {
    prototype: HTMLAttachPullRequestSetupElement;
    new (): HTMLAttachPullRequestSetupElement;
  };
  interface HTMLElementTagNameMap {
    'attach-pull-request-setup': HTMLAttachPullRequestSetupElement;
  }
  interface ElementTagNameMap {
    'attach-pull-request-setup': HTMLAttachPullRequestSetupElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'attach-pull-request-setup': JSXElements.AttachPullRequestSetupAttributes;
    }
  }
  namespace JSXElements {
    export interface AttachPullRequestSetupAttributes extends HTMLAttributes {

    }
  }
}


declare global {

  namespace StencilComponents {
    interface HelloWorld {

    }
  }

  interface HTMLHelloWorldElement extends StencilComponents.HelloWorld, HTMLStencilElement {}

  var HTMLHelloWorldElement: {
    prototype: HTMLHelloWorldElement;
    new (): HTMLHelloWorldElement;
  };
  interface HTMLElementTagNameMap {
    'hello-world': HTMLHelloWorldElement;
  }
  interface ElementTagNameMap {
    'hello-world': HTMLHelloWorldElement;
  }
  namespace JSX {
    interface IntrinsicElements {
      'hello-world': JSXElements.HelloWorldAttributes;
    }
  }
  namespace JSXElements {
    export interface HelloWorldAttributes extends HTMLAttributes {

    }
  }
}

declare global { namespace JSX { interface StencilJSX {} } }

export declare function defineCustomElements(window: any): void;