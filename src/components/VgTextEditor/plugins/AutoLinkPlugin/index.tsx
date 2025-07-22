/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  AutoLinkPlugin,
  createLinkMatcherWithRegExp,
} from '@lexical/react/LexicalAutoLinkPlugin';
import * as React from 'react';

// Safari-compatible URL regex without lookbehind assertion
const URL_REGEX =
  /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const EMAIL_REGEX =
  /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

// Custom function to clean up URL endings
function cleanUrlEnd(url: any) {
  // Remove trailing punctuation that shouldn't be part of URLs
  // This replaces the lookbehind functionality
  return url.replace(/[-.+():%\s]+$/, '').replace(/\.$/, '');
}

const MATCHERS = [
  createLinkMatcherWithRegExp(URL_REGEX, (text) => {
    const cleanedText = cleanUrlEnd(text);
    return cleanedText.startsWith('http') ? cleanedText : `https://${cleanedText}`;
  }),
  createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => {
    return `mailto:${text}`;
  }),
];

export default function LexicalAutoLinkPlugin(): JSX.Element {
  return <AutoLinkPlugin matchers={MATCHERS} />;
}
