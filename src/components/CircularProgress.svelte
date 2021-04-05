<script>
  export let number
  export let fontSize
  export let strokeWidth
  export let percentage

  let sqSize
  let radius
  let viewBox
  let dashArray
  let dashOffset

  // Size of the enclosing square
  // SVG centers the stroke width on the radius, subtract out so circle fits in square
  //   const sqSize = sqSize
  
  $: sqSize = fontSize * 1.8

  $: radius = (sqSize - strokeWidth) / 2
  // Enclose cicle in a circumscribing square
  $: viewBox = `0 0 ${sqSize} ${sqSize}`
  // Arc length at 100% coverage is the circle circumference
  $: dashArray = radius * Math.PI * 2
  // Scale 100% coverage overlay with the actual percent
  $: dashOffset = dashArray - (dashArray * percentage) / 100
</script>

<div style="position: relative;display: inline-block;text-align: center;">
  <svg width="{sqSize}" height="{sqSize}" viewBox="{viewBox}">
    <circle
      class="circle-background"
      cx="{sqSize / 2}"
      cy="{sqSize / 2}"
      r="{radius}"
      stroke-width="{`${strokeWidth}px`}">
    </circle>
    <circle
      class="circle-progress"
      cx="{sqSize / 2}"
      cy="{sqSize / 2}"
      r="{radius}"
      stroke-width="{`${strokeWidth}px`}"
      transform="{`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}"
      style="{`stroke-dasharray: ${dashArray};stroke-dashoffset: ${dashOffset};`}">
    </circle>
  </svg>
  <div
    style="{`font-size: ${fontSize}px;position: absolute;left: 50%;top: 50%;transform: translate(-50%, -55%);`}"
  >
    {number}
  </div>
</div>

<style>
  .circle-background,
  .circle-progress {
    fill: none;
  }

  .circle-background {
    stroke: #ddd;
  }

  .circle-progress {
    stroke: red;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
