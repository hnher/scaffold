<template>
  <view
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 overflow-hidden"
  >
    <view
      v-for="(particle, index) in particles"
      :key="`${particle.left}-${index}`"
      aria-hidden="true"
      class="animate-particle-float absolute rounded-full motion-reduce:animate-none"
      :class="
        particle.kind === 'indigo'
          ? 'bg-indigo-500/20 dark:bg-indigo-400/20'
          : 'bg-red-400/20 dark:bg-orange-300/20'
      "
      :style="particle"
    />
  </view>
</template>

<script>
function createParticle(
  left,
  top,
  size,
  kind,
  animationDelay,
  animationDuration,
  drift,
) {
  return {
    animationDelay,
    animationDuration,
    height: `${size}px`,
    kind,
    left,
    top,
    width: `${size}px`,
    '--particle-drift': drift,
  }
}

export default {
  name: 'ParticleBackground',

  data() {
    return {
      particles: [
        createParticle('8%', '78%', 8, 'indigo', '0ms', '9200ms', '16px'),
        createParticle('22%', '58%', 5, 'coral', '-1200ms', '10400ms', '-12px'),
        createParticle(
          '39%',
          '88%',
          10,
          'indigo',
          '-2800ms',
          '11800ms',
          '18px',
        ),
        createParticle('53%', '68%', 6, 'coral', '-600ms', '9800ms', '-16px'),
        createParticle('68%', '84%', 7, 'indigo', '-3600ms', '12600ms', '12px'),
        createParticle('82%', '54%', 9, 'coral', '-2100ms', '11000ms', '-10px'),
        createParticle('91%', '76%', 5, 'indigo', '-4300ms', '13200ms', '14px'),
        createParticle('13%', '38%', 6, 'coral', '-3200ms', '12200ms', '-14px'),
      ],
    }
  },
}
</script>
