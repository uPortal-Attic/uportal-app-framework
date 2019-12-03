/*
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
define([], function() {

  class LaunchButtonElement extends HTMLElement {

    static get elementName() {
      return 'launch-button';
    }

    static get observedAttributes() {
      return [
        'aria-label',
        'ariaLabel',
        'buttonText',
        'href',
        'target',
        'data-aria-label',
        'data-button-text',
        'data-href',
        'data-target',
      ];
    }

    constructor() {
      super();
      this.anchorElement = document.createElement('a');
      this.anchorElement.className = 'launch-app-button';
      this.anchorElement.rel = 'noopener noreferrer';
      this.appendChild(this.anchorElement);
    }

    attributeChangedCallback(name, oldValue, newValue) {
      switch (name) {
        case 'ariaLabel':
        case 'aria-label':
        case 'data-aria-label':
          this.anchorElement.setAttribute('aria-label', newValue);
          break;
        case 'buttonText':
        case 'data-button-text':
          this.anchorElement.textContent = newValue;
          this.anchorElement.setAttribute(
            'aria-label',
            this.anchorElement.getAttribute('aria-label') || newValue
          );
          break;
        case 'href':
        case 'data-href':
          this.anchorElement.setAttribute('href', newValue);
          break;
        case 'target':
        case 'data-target':
          this.anchorElement.target = newValue;
          break;
      }
    }

  }

  if (customElements.get(LaunchButtonElement.elementName) === undefined) {
    customElements.define(LaunchButtonElement.elementName, LaunchButtonElement);
  }

  return LaunchButtonElement;

});
