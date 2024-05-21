import { FC, SVGProps } from 'react';

type SVGRElement = FC<SVGProps<SVGElement> | { title?: string }>;

declare module '*.svg' {
  const content: SVGRElement;
  export default content;
}

declare module '*.svg?url' {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const content: any;
  export default content;
}
