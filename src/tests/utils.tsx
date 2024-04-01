import { ReactElement } from 'react';

import { render, RenderOptions, RenderResult } from '@testing-library/react';

type RootWrapperProps = {
  children?: React.ReactNode;
};

const RootWrapper = ({ children }: RootWrapperProps) => {
  // wrap `children` with wrapper components if needed e.g. context providers
  return <>{children}</>;
};

const customRender = (
  ui: ReactElement,
  wrapperProps?: RootWrapperProps,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult =>
  render(ui, {
    wrapper: (props) => <RootWrapper {...props} {...wrapperProps} />,
    ...options,
  });

export * from '@testing-library/react';

export { customRender as render };

// Reference: https://testing-library.com/docs/react-testing-library/setup/#custom-render
