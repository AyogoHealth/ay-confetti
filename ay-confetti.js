/*! Copyright (c) 2021 - 2023 Ayogo Health Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to
 * deal in the Software without restriction, including without limitation the
 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
 * sell copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
 * IN THE SOFTWARE.
 */

/**
 * Confetti Component
 * ==================
 *
 * This is a web component for displaying full-screen confetti. It's as easy as
 * adding `<ay-confetti></ay-confetti>` to your page.
 *
 * Attributes
 * ----------
 * ### `fading`
 * By default, the confetti will flutter down until it is all off-screen. If
 * you prefer it to gradually become transparent as it falls, add the `fading`
 * attribute to the element.
 *
 * ### `particles`
 * Controls the number of pieces of confetti to be shown on screen. The default
 * value is 60, and performance is noticeably impacted at values higher than
 * 100.
 *
 
 *
 * @name ay-confetti
 */
export class AyConfettiElement extends HTMLElement {
  #particles = 60;
  #container = null;
  #confetti = [];

  /** @nodoc */
  static get observedAttributes() {
    return [
      "particles",
      "color",
      "color1",
      "color2",
      "color3",
      "color4",
      "color5",
      "color6",
    ];
  }

  /**
   * The number of particles of confetti shown by the element.
   */
  get particles() {
    return this.#particles;
  }

  /**
   * Callback that runs when the element is connected to the DOM.
   *
   * @nodoc
   */
  connectedCallback() {
    if (!this.#container) {
      this.#container = this.attachShadow({ mode: "open" });
      this.#container.innerHTML = `<style>
        :host {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            overflow: hidden;
            pointer-events: none;
        }

        .confetti-piece {
            width: 8px;
            height: 16px;
            position: absolute;
            transform-origin: 50% 50%;
            top: 0;
            left: 0;
            will-change: transform, opacity;
        }

        .confetti-1 { background-color: var(--confetti-color-1, blue); }
        .confetti-2 { background-color: var(--confetti-color-2, var(--confetti-color-1, red)); }
        .confetti-3 { background-color: var(--confetti-color-3, var(--confetti-color-1, lime)); }
        .confetti-4 { background-color: var(--confetti-color-4, var(--confetti-color-2, var(--confetti-color-1, yellow))); }
        .confetti-5 { background-color: var(--confetti-color-5, var(--confetti-color-1, magenta)); }
        .confetti-6 { background-color: var(--confetti-color-6, var(--confetti-color-3, var(--confetti-color-2, var(--confetti-color-1, cyan)))); }
        </style>`;
    }

    requestAnimationFrame(() => {
      for (let i = this.#confetti.length, ii = this.#particles; i < ii; i++) {
        this.#makeParticle();
      }

      this.#updateConfetti();
    });
  }

  /**
   * Callback that runs when any observed attributes are changed (including on
   * initial parsing of the DOM).
   *
   * @nodoc
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "particles") {
      this.#particles = parseInt(newValue, 10);
    } else if (name === "color" || name === "color1") {
      this.style.setProperty("--confetti-color-1", newValue);
    } else if (name === "color2") {
      this.style.setProperty("--confetti-color-2", newValue);
    } else if (name === "color3") {
      this.style.setProperty("--confetti-color-3", newValue);
    } else if (name === "color4") {
      this.style.setProperty("--confetti-color-4", newValue);
    } else if (name === "color5") {
      this.style.setProperty("--confetti-color-5", newValue);
    } else if (name === "color6") {
      this.style.setProperty("--confetti-color-6", newValue);
    }
  }

  /**
   * Updates the state of the confetti every frame.
   *
   * @nodoc
   */
  #updateConfetti() {
    if (!this.isConnected) {
      this.#confetti.map((particle) => this.#deleteParticle(particle));
      this.#confetti.length = 0;
      return;
    }

    this.#confetti.forEach((particle) => this.#updateParticle(particle));

    requestAnimationFrame(() => this.#updateConfetti());
  }

  /**
   * Creates a single particle of confetti and adds it to the element.
   *
   * @nodoc
   */
  #makeParticle() {
    const classes = [
      "confetti-1",
      "confetti-2",
      "confetti-3",
      "confetti-4",
      "confetti-5",
      "confetti-6",
    ];

    const state = {
      x: Math.random() * innerWidth,
      y: Math.random() * -100,
      xRot: Math.random() * 360,
      yRot: Math.random() * 360,
      zRot: Math.random() * 360,
      xSpeed: Math.random() * 2 - 1,
      ySpeed: Math.random() * 2 + 1,
      xRotSpeed: Math.random() * 7 - 2,
      yRotSpeed: Math.random() * 7 - 2,
      zRotSpeed: Math.random() * 7 - 2,
      opacity: 100,
      element: document.createElement("div"),
    };

    if (this.hasAttribute("fading")) {
      state.opacity = Math.random() * 25 + 75;
    }

    state.element.setAttribute(
      "class",
      `confetti-piece ${classes[Math.floor(Math.random() * classes.length)]}`
    );
    state.element.setAttribute(
      "style",
      `transform: translate3d(${state.x}px, ${state.y}px, 0) rotateX(${state.xRot}deg) rotateY(${state.yRot}deg) rotateZ(${state.zRot}deg); opacity: ${state.opacity}%;`
    );

    this.#confetti.push(state);
    this.#container.appendChild(state.element);
  }

  /**
   * Removes the specified particle of confetti from the DOM.
   *
   * @nodoc
   */
  #deleteParticle(particle) {
    this.#container.removeChild(particle.element);
    if (
      this.#container.children.length === Math.round(this.#particles / 1.25)
    ) {
      document.dispatchEvent(
        new Event("confettiAnimationFading", { bubbles: true })
      );
    }
  }

  /**
   * Updates the state and DOM styling of a single particle of confetti.
   *
   * @nodoc
   */
  #updateParticle(state) {
    state.x += state.xSpeed;
    state.y += state.ySpeed;
    state.xRot += state.xRotSpeed;
    state.yRot += state.yRotSpeed;
    state.zRot += state.zRotSpeed;

    if (this.hasAttribute("fading")) {
      state.opacity *= 0.985;
    }

    if (
      state.x < -20 ||
      state.x > innerWidth + 20 ||
      state.y > innerHeight + 20 ||
      state.opacity <= 0
    ) {
      this.#deleteParticle(state);
      this.#confetti.splice(this.#confetti.indexOf(state), 1);
      return;
    }

    state.element.setAttribute(
      "style",
      `transform: translate3d(${state.x}px, ${state.y}px, 0) rotateX(${state.xRot}deg) rotateY(${state.yRot}deg) rotateZ(${state.zRot}deg); opacity: ${state.opacity}%;`
    );
  }
}

customElements.define("ay-confetti", AyConfettiElement);
