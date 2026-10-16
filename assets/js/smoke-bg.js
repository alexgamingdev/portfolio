(() => {
  if (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
    || new URLSearchParams(window.location.search).get("a11y") === "true"
  ) return;

  const canvas = document.createElement("canvas");
  canvas.className = "cursor-smoke";
  canvas.setAttribute("aria-hidden", "true");
  document.body.append(canvas);

  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
  });
  if (!gl) {
    canvas.remove();
    console.warn("Cursor smoke requires WebGL support.");
    return;
  }

  const vertexSource = `
    attribute vec2 a_pos;
    void main() {
      gl_Position = vec4(a_pos, 0.0, 1.0);
    }
  `;

  const noiseSource = `
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
    }

    float fbm(vec2 p, int octaves) {
      float value = 0.0;
      float amplitude = 0.5;
      mat2 rotation = mat2(0.8, 0.6, -0.6, 0.8);
      for (int i = 0; i < 6; i++) {
        if (i >= octaves) break;
        value += amplitude * noise(p);
        p = rotation * p * 2.03;
        amplitude *= 0.5;
      }
      return value;
    }
  `;

  const simulationSource = `
    precision highp float;
    ${noiseSource}

    uniform sampler2D u_prev;
    uniform vec2 u_res;
    uniform float u_aspect;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_mouse_prev;
    uniform vec2 u_mouse_vel;
    uniform float u_inject;

    vec2 curl(vec2 p) {
      float e = 0.06;
      float n1 = fbm(p + vec2(0.0, e), 3);
      float n2 = fbm(p - vec2(0.0, e), 3);
      float n3 = fbm(p + vec2(e, 0.0), 3);
      float n4 = fbm(p - vec2(e, 0.0), 3);
      return vec2(n1 - n2, n4 - n3) / (2.0 * e);
    }

    float segmentDistance(vec2 p, vec2 a, vec2 b) {
      vec2 pa = p - a;
      vec2 ba = b - a;
      float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-5), 0.0, 1.0);
      return length(pa - ba * h);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      vec4 previous = texture2D(u_prev, uv);
      vec2 velocity = (previous.gb - 0.5) * 2.0;
      vec2 flow = curl(vec2(uv.x * u_aspect, uv.y) * 2.4 + vec2(0.0, u_time * 0.05));
      vec2 total = velocity + flow * 0.05;
      vec2 source = uv - total * 0.006;
      vec4 advected = texture2D(u_prev, source);
      float density = advected.r * 0.994;
      vec2 nextVelocity = (advected.gb - 0.5) * 2.0 * 0.985;

      vec2 point = vec2(uv.x * u_aspect, uv.y);
      float distanceToStroke = segmentDistance(
        point,
        vec2(u_mouse_prev.x * u_aspect, u_mouse_prev.y),
        vec2(u_mouse.x * u_aspect, u_mouse.y)
      );
      float brush = exp(-distanceToStroke * distanceToStroke / 0.006);
      brush *= brush;
      density += brush * 0.13 * u_inject;
      nextVelocity += u_mouse_vel * brush * 1.1;

      density = clamp(density, 0.0, 1.0);
      nextVelocity = clamp(nextVelocity, -1.0, 1.0);
      gl_FragColor = vec4(density, nextVelocity * 0.5 + 0.5, 1.0);
    }
  `;

  const renderSource = `
    precision highp float;
    ${noiseSource}

    uniform sampler2D u_field;
    uniform vec2 u_res;
    uniform vec2 u_field_res;
    uniform float u_aspect;
    uniform float u_time;
    uniform vec3 u_accent;

    vec4 blurField(vec2 uv, vec2 texel) {
      vec4 sum = texture2D(u_field, uv) * 0.25;
      sum += texture2D(u_field, uv + vec2(texel.x, 0.0)) * 0.125;
      sum += texture2D(u_field, uv - vec2(texel.x, 0.0)) * 0.125;
      sum += texture2D(u_field, uv + vec2(0.0, texel.y)) * 0.125;
      sum += texture2D(u_field, uv - vec2(0.0, texel.y)) * 0.125;
      sum += texture2D(u_field, uv + texel) * 0.0625;
      sum += texture2D(u_field, uv - texel) * 0.0625;
      sum += texture2D(u_field, uv + vec2(texel.x, -texel.y)) * 0.0625;
      sum += texture2D(u_field, uv + vec2(-texel.x, texel.y)) * 0.0625;
      return sum;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_res;
      vec2 texel = 2.2 / u_field_res;
      vec4 field = blurField(uv, texel);
      vec2 velocity = (field.gb - 0.5) * 2.0;
      float density = field.r;

      vec2 point = uv * 3.0;
      point.x *= u_aspect;
      point += velocity * 0.85;

      vec2 warp = vec2(
        fbm(point + vec2(0.0, u_time * 0.10), 4),
        fbm(point + vec2(5.2, 1.3) + vec2(u_time * 0.07, 0.0), 4)
      );
      float f = fbm(point + 2.2 * warp + vec2(u_time * 0.03, -u_time * 0.05), 5);

      float painted = smoothstep(0.0, 0.5, density);
      f += painted * 0.4;

      float smoke = smoothstep(0.26, 1.02, f);
      smoke *= smoke * (3.0 - 2.0 * smoke);

      vec3 colA = vec3(0.22, 0.16, 0.42);
      vec3 colB = u_accent;
      vec3 color = mix(colA, colB, smoke * 0.6 + painted * 0.28);

      float alpha = smoke * 0.17 + painted * 0.05;
      alpha += (hash(uv * u_res) - 0.5) * 0.006;
      gl_FragColor = vec4(color * max(alpha, 0.0), max(alpha, 0.0));
    }
  `;

  const compileShader = (type, source) => {
    const shader = gl.createShader(type);
    if (!shader) {
      console.error("Unable to create cursor smoke shader.");
      return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Cursor smoke shader compilation failed:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  const createProgram = source => {
    const vertex = compileShader(gl.VERTEX_SHADER, vertexSource);
    const fragment = compileShader(gl.FRAGMENT_SHADER, source);
    if (!vertex || !fragment) return null;
    const program = gl.createProgram();
    if (!program) {
      console.error("Unable to create cursor smoke program.");
      return null;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Cursor smoke program linking failed:", gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    return program;
  };

  const simulationProgram = createProgram(simulationSource);
  const renderProgram = createProgram(renderSource);
  if (!simulationProgram || !renderProgram) {
    canvas.remove();
    return;
  }

  const buffer = gl.createBuffer();
  if (!buffer) {
    console.error("Unable to create cursor smoke buffer.");
    canvas.remove();
    return;
  }
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  for (const program of [simulationProgram, renderProgram]) {
    const position = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  }

  const uniform = (program, name) => gl.getUniformLocation(program, name);
  const simulation = {
    previous: uniform(simulationProgram, "u_prev"),
    resolution: uniform(simulationProgram, "u_res"),
    aspect: uniform(simulationProgram, "u_aspect"),
    time: uniform(simulationProgram, "u_time"),
    mouse: uniform(simulationProgram, "u_mouse"),
    mousePrevious: uniform(simulationProgram, "u_mouse_prev"),
    mouseVelocity: uniform(simulationProgram, "u_mouse_vel"),
    inject: uniform(simulationProgram, "u_inject"),
  };
  const render = {
    field: uniform(renderProgram, "u_field"),
    resolution: uniform(renderProgram, "u_res"),
    fieldResolution: uniform(renderProgram, "u_field_res"),
    aspect: uniform(renderProgram, "u_aspect"),
    time: uniform(renderProgram, "u_time"),
    accent: uniform(renderProgram, "u_accent"),
  };

  const root = document.documentElement;
  const colorProbe = document.createElement("canvas");
  const colorContext = colorProbe.getContext("2d", { willReadFrequently: true });
  const readAccent = () => {
    const accent = getComputedStyle(root).getPropertyValue("--accent").trim();
    if (!colorContext || !CSS.supports("color", accent)) return [0, 1, 1];
    colorContext.clearRect(0, 0, 1, 1);
    colorContext.fillStyle = accent;
    colorContext.fillRect(0, 0, 1, 1);
    const [red, green, blue] = colorContext.getImageData(0, 0, 1, 1).data;
    return [red / 255, green / 255, blue / 255];
  };
  const accent = readAccent();
  const simulationScale = 0.2;
  const viewScale = Math.min(0.42, 640 / Math.max(window.innerWidth, 1));
  const frameInterval = 1000 / 24;
  let simulationWidth = 1;
  let simulationHeight = 1;
  let targets = [];

  const createTarget = (width, height) => {
    const texture = gl.createTexture();
    const framebuffer = gl.createFramebuffer();
    if (!texture || !framebuffer) {
      console.error("Unable to allocate cursor smoke texture.");
      return null;
    }
    gl.bindTexture(gl.TEXTURE_2D, texture);
    const pixels = new Uint8Array(width * height * 4);
    for (let index = 0; index < width * height; index++) {
      pixels[index * 4 + 1] = 128;
      pixels[index * 4 + 2] = 128;
      pixels[index * 4 + 3] = 255;
    }
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      console.error("Cursor smoke framebuffer is incomplete.");
      gl.deleteFramebuffer(framebuffer);
      gl.deleteTexture(texture);
      return null;
    }
    return { framebuffer, texture };
  };

  const resize = () => {
    canvas.width = Math.max(1, Math.floor(window.innerWidth * viewScale));
    canvas.height = Math.max(1, Math.floor(window.innerHeight * viewScale));
    simulationWidth = Math.max(1, Math.floor(window.innerWidth * simulationScale));
    simulationHeight = Math.max(1, Math.floor(window.innerHeight * simulationScale));
    targets.forEach(target => {
      gl.deleteFramebuffer(target.framebuffer);
      gl.deleteTexture(target.texture);
    });
    const first = createTarget(simulationWidth, simulationHeight);
    const second = createTarget(simulationWidth, simulationHeight);
    if (!first || !second) {
      canvas.remove();
      return false;
    }
    targets = [first, second];
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    return true;
  };
  if (!resize()) return;

  let resizeTimer = 0;
  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(resize, 150);
  };
  window.addEventListener("resize", onResize);

  const pointer = {
    x: 0.5,
    y: 0.5,
    previousX: 0.5,
    previousY: 0.5,
    velocityX: 0,
    velocityY: 0,
    active: 0,
  };
  let pointerInitialized = false;
  const onPointerMove = event => {
    const x = event.clientX / window.innerWidth;
    const y = 1 - event.clientY / window.innerHeight;
    if (!pointerInitialized) {
      pointer.x = x;
      pointer.y = y;
      pointer.previousX = x;
      pointer.previousY = y;
      pointer.active = 0.8;
      pointerInitialized = true;
      return;
    }
    pointer.velocityX += (x - pointer.x) * 3.5;
    pointer.velocityY += (y - pointer.y) * 3.5;
    pointer.x = x;
    pointer.y = y;
    pointer.active = Math.max(pointer.active, 1);
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  let animationFrame = 0;
  let lastFrame = 0;
  let readIndex = 0;
  const started = performance.now();
  const drawFrame = now => {
    animationFrame = window.requestAnimationFrame(drawFrame);
    if (now - lastFrame < frameInterval) return;
    lastFrame = now;
    const time = (now - started) / 1000;
    const writeIndex = 1 - readIndex;
    const aspect = window.innerWidth / window.innerHeight;
    const inject = Math.max(pointer.active, 0.18);

    gl.useProgram(simulationProgram);
    gl.bindFramebuffer(gl.FRAMEBUFFER, targets[writeIndex].framebuffer);
    gl.viewport(0, 0, simulationWidth, simulationHeight);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, targets[readIndex].texture);
    gl.uniform1i(simulation.previous, 0);
    gl.uniform2f(simulation.resolution, simulationWidth, simulationHeight);
    gl.uniform1f(simulation.aspect, aspect);
    gl.uniform1f(simulation.time, time);
    gl.uniform2f(simulation.mouse, pointer.x, pointer.y);
    gl.uniform2f(simulation.mousePrevious, pointer.previousX, pointer.previousY);
    gl.uniform2f(simulation.mouseVelocity, pointer.velocityX, pointer.velocityY);
    gl.uniform1f(simulation.inject, inject);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    gl.useProgram(renderProgram);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, targets[writeIndex].texture);
    gl.uniform1i(render.field, 0);
    gl.uniform2f(render.resolution, canvas.width, canvas.height);
    gl.uniform2f(render.fieldResolution, simulationWidth, simulationHeight);
    gl.uniform1f(render.aspect, aspect);
    gl.uniform1f(render.time, time);
    gl.uniform3f(render.accent, ...accent);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    readIndex = writeIndex;
    pointer.previousX = pointer.x;
    pointer.previousY = pointer.y;
    pointer.velocityX *= 0.86;
    pointer.velocityY *= 0.86;
    pointer.active = Math.max(pointer.active * 0.9, 0.18);
  };

  const syncAnimation = () => {
    window.cancelAnimationFrame(animationFrame);
    if (!document.hidden) animationFrame = window.requestAnimationFrame(drawFrame);
  };
  const onAccessibilityModeChange = event => {
    if (event.detail.enabled) {
      window.cancelAnimationFrame(animationFrame);
      targets.forEach(target => {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.framebuffer);
        gl.viewport(0, 0, simulationWidth, simulationHeight);
        gl.clearColor(0, 0.5, 0.5, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
      });
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      pointer.active = 0;
      return;
    }
    syncAnimation();
  };
  document.addEventListener("visibilitychange", syncAnimation);
  window.addEventListener("accessibilitymodechange", onAccessibilityModeChange);
  window.addEventListener("pagehide", () => {
    window.cancelAnimationFrame(animationFrame);
    window.clearTimeout(resizeTimer);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("visibilitychange", syncAnimation);
    window.removeEventListener("accessibilitymodechange", onAccessibilityModeChange);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  }, { once: true });
  syncAnimation();
})();
