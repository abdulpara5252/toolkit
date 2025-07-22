import * as React from 'react';
import * as ReactTestUtils from 'react-dom/test-utils';


export const act =
  'act' in React
    ? (React.act as typeof ReactTestUtils.act)
    : ReactTestUtils.act;
