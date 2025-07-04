declare module '*.module.sass' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.jpg';
declare module '*.png';
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  const src: string;
  export default src;
}