/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { stripSlashes } from 'slashes';
import isConstantStringLiteral from './is-constant-string-literal';
import parseType from './parse-type';
import resolve from './resolve';

const parseModuleSpecifier = (moduleSpecifierString, {
  isDynamicImport,
  resolveFrom
}) => {
  const {
    isConstant,
    value
  } = !isDynamicImport || isConstantStringLiteral(moduleSpecifierString) ? {
    isConstant: true,
    value: stripSlashes(moduleSpecifierString.substring(1, moduleSpecifierString.length - 1))
  } : {
    isConstant: false,
    value: undefined
  };
  return {
    type: isConstant ? parseType(value) : `unknown`,
    isConstant,
    code: moduleSpecifierString,
    value,
    resolved: typeof resolveFrom === `string` && isConstant ? resolve(resolveFrom, value) : undefined
  };
};

export default parseModuleSpecifier;