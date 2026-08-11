/* CarbonWeb Monday Partner Card
   WebGL fluid gradient shine — iterative sine-wave domain warp
   remapped to brand teal/green. Falls back to CSS blobs if WebGL missing.

   Variants:
   - default: ambient flow (speed 0.55)
   - .monday-partner-card--interactive: faster flow (speed 1.0), cursor
     warps the field, clicks spawn expanding ripples */

(function () {
  var MAX_RIPPLES = 4;

  var VERT = [
    'attribute vec4 a_position;',
    'void main() { gl_Position = a_position; }'
  ].join('\n');

  /* Domain-warp wave field (inspired by lightswind gradient-background),
     recolored: dominance-weighted teal/green mix.
     Alpha fades toward bottom so logos/stats stay readable. */
  var FRAG = [
    '#ifdef GL_ES',
    'precision mediump float;',
    '#endif',
    'uniform vec2 iResolution;',
    'uniform float iTime;',
    'uniform float iSpeed;',
    'uniform vec2 iMouse;',          // uv space; (-10,-10) = inactive
    'uniform float iMouseStrength;', // eased 0..1
    'uniform vec4 iRipples[' + MAX_RIPPLES + '];', // xy = uv center, z = start time, w = active flag
    '',
    'float cosRange(float amt, float range, float minimum) {',
    '  return (((1.0 + cos(radians(amt))) * 0.5) * range) + minimum;',
    '}',
    '',
    'void main() {',
    '  const int zoom = 40;',
    '  float time = iTime * iSpeed;',
    '  vec2 uv = gl_FragCoord.xy / iResolution.xy;',
    '  vec2 p = (2.0 * gl_FragCoord.xy - iResolution.xy) / max(iResolution.x, iResolution.y);',
    '  float aspect = iResolution.x / max(iResolution.y, 1.0);',
    '',
    '  // ── Cursor warp: bend the field toward the cursor before iterating',
    '  if (iMouseStrength > 0.001) {',
    '    vec2 md = (uv - iMouse) * vec2(aspect, 1.0);',
    '    float mdist = length(md);',
    '    float pull = exp(-mdist * 3.5) * iMouseStrength;',
    '    p += normalize(md + 0.0001) * pull * 0.9;',      // push waves outward from cursor
    '    p += vec2(sin(time * 2.0), cos(time * 1.7)) * pull * 0.25;', // local swirl
    '  }',
    '',
    '  // ── Click ripples: expanding rings distort the domain',
    '  float rippleGlow = 0.0;',
    '  for (int r = 0; r < ' + MAX_RIPPLES + '; r++) {',
    '    if (iRipples[r].w > 0.5) {',
    '      float age = iTime - iRipples[r].z;',
    '      if (age > 0.0 && age < 3.0) {',
    '        vec2 rd = (uv - iRipples[r].xy) * vec2(aspect, 1.0);',
    '        float rdist = length(rd);',
    '        float radius = age * 0.55;',
    '        float ring = exp(-pow((rdist - radius) * 9.0, 2.0));',
    '        float decay = exp(-age * 1.4);',
    '        p += normalize(rd + 0.0001) * ring * decay * 0.6;',
    '        rippleGlow += ring * decay * 0.5;',
    '      }',
    '    }',
    '  }',
    '',
    '  float ct = cosRange(time * 5.0, 3.0, 1.1);',
    '  float xBoost = cosRange(time * 0.2, 5.0, 5.0);',
    '  float yBoost = cosRange(time * 0.1, 10.0, 5.0);',
    '  float fScale = cosRange(time * 15.5, 1.25, 0.5);',
    '',
    '  for (int i = 1; i < zoom; i++) {',
    '    float _i = float(i);',
    '    vec2 newp = p;',
    '    newp.x += 0.25 / _i * sin(_i * p.y + time * cos(ct) * 0.5 / 20.0 + 0.005 * _i) * fScale + xBoost;',
    '    newp.y += 0.25 / _i * sin(_i * p.x + time * ct * 0.3 / 40.0 + 0.03 * float(i + 15)) * fScale + yBoost;',
    '    p = newp;',
    '  }',
    '',
    '  // Wave channels: teal weight, green weight (phase-offset so regions separate)',
    '  float t = 0.5 + 0.5 * sin(2.0 * p.x);',
    '  float g = 0.5 + 0.5 * sin(2.0 * p.y + 1.7);',
    '',
    '  vec3 teal  = vec3(0.0, 0.690, 0.761);',   // #00B0C2
    '  vec3 green = vec3(0.412, 0.843, 0.341);', // #69D757
    '',
    '  // dominance-weighted blend: pure teal where t wins, pure green where g wins',
    '  vec3 col = (teal * t + green * g) / max(t + g, 0.001);',
    '',
    '  // vignette keeps shine centered, fades edges',
    '  float vigAmt = 3.0;',
    '  float vignette = (1.0 - vigAmt * (uv.y - 0.5) * (uv.y - 0.5)) * (1.0 - vigAmt * (uv.x - 0.5) * (uv.x - 0.5));',
    '  vignette = clamp(vignette, 0.0, 1.0);',
    '',
    '  // alpha from combined wave strength -> saturated pockets, soft gaps',
    '  float energy = smoothstep(0.35, 1.5, t + g);',
    '  float topFade = 0.3 + 0.7 * smoothstep(0.0, 0.8, uv.y);', // uv.y=1 top in GL
    '  float alpha = clamp((0.1 + 0.9 * energy) * (0.55 + 0.45 * vignette) * topFade, 0.0, 1.0);',
    '',
    '  // cursor halo + ripple flash brighten the shine locally',
    '  if (iMouseStrength > 0.001) {',
    '    vec2 md = (uv - iMouse) * vec2(aspect, 1.0);',
    '    alpha += exp(-length(md) * 4.0) * iMouseStrength * 0.25;',
    '  }',
    '  alpha = clamp(alpha + rippleGlow * 0.35, 0.0, 1.0);',
    '',
    '  gl_FragColor = vec4(col, alpha);',
    '}'
  ].join('\n');

  function initShine(shine, opts) {
    var canvas = document.createElement('canvas');
    canvas.className = 'monday-partner-card__shine-canvas';
    var gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    if (!gl) return false; // CSS blob fallback stays

    function compile(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    var vs = compile(gl.VERTEX_SHADER, VERT);
    var fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return false;

    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false;
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    var uRes = gl.getUniformLocation(prog, 'iResolution');
    var uTime = gl.getUniformLocation(prog, 'iTime');
    var uSpeed = gl.getUniformLocation(prog, 'iSpeed');
    var uMouse = gl.getUniformLocation(prog, 'iMouse');
    var uMouseStrength = gl.getUniformLocation(prog, 'iMouseStrength');
    var uRipples = gl.getUniformLocation(prog, 'iRipples');
    var start = performance.now();

    // WebGL active: hide CSS blob fallback, mount canvas
    shine.classList.add('monday-partner-card__shine--gl');
    shine.appendChild(canvas);

    var visible = true;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }).observe(canvas);
    }

    // ── Interaction state ──
    var mouse = { x: -10, y: -10 };        // uv space, offscreen = inactive
    var eased = { x: -10, y: -10 };        // lags behind cursor for fluid feel
    var strength = 0;                       // fades in on enter, out on leave
    var targetStrength = 0;
    var ripples = new Float32Array(MAX_RIPPLES * 4); // all zero = inactive
    var rippleIndex = 0;

    if (opts.interactive) {
      var card = opts.card;

      card.addEventListener('mousemove', function (e) {
        var rect = canvas.getBoundingClientRect();
        mouse.x = (e.clientX - rect.left) / rect.width;
        mouse.y = 1.0 - (e.clientY - rect.top) / rect.height; // GL y-up
        targetStrength = 1;
      });

      card.addEventListener('mouseleave', function () {
        targetStrength = 0;
      });

      card.addEventListener('click', function (e) {
        var rect = canvas.getBoundingClientRect();
        var i = rippleIndex * 4;
        ripples[i] = (e.clientX - rect.left) / rect.width;
        ripples[i + 1] = 1.0 - (e.clientY - rect.top) / rect.height;
        ripples[i + 2] = (performance.now() - start) / 1000;
        ripples[i + 3] = 1;
        rippleIndex = (rippleIndex + 1) % MAX_RIPPLES;
      });
    }

    function render() {
      if (visible) {
        var w = canvas.clientWidth, h = canvas.clientHeight;
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w;
          canvas.height = h;
        }
        gl.viewport(0, 0, w, h);
        gl.uniform2f(uRes, w, h);
        gl.uniform1f(uTime, (performance.now() - start) / 1000);
        gl.uniform1f(uSpeed, opts.speed);

        // ease cursor + strength for liquid lag
        eased.x += (mouse.x - eased.x) * 0.08;
        eased.y += (mouse.y - eased.y) * 0.08;
        strength += (targetStrength - strength) * 0.06;
        gl.uniform2f(uMouse, eased.x, eased.y);
        gl.uniform1f(uMouseStrength, strength);
        gl.uniform4fv(uRipples, ripples);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      requestAnimationFrame(render);
    }
    render();
    return true;
  }

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return; // static CSS blobs only

  document.querySelectorAll('.monday-partner-card__shine').forEach(function (shine) {
    var card = shine.closest('.monday-partner-card');
    var interactive = card && card.classList.contains('monday-partner-card--interactive');
    initShine(shine, {
      card: card,
      interactive: interactive,
      speed: interactive ? 1.0 : 0.55
    });
  });
})();
