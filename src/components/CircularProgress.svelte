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
  
  let gradient = [
    '#71db3f',
    '#79d837',
    '#81d52e',
    '#88d225',
    '#8ecf1b',
    '#95cc0d',
    '#9ac900',
    '#a0c600',
    '#a5c300',
    '#abbf00',
    '#b0bc00',
    '#b4b900',
    '#b9b500',
    '#bdb200',
    '#c2ae00',
    '#c6ab00',
    '#caa700',
    '#cea300',
    '#d19f00',
    '#d59c00',
    '#d89800',
    '#db9400',
    '#de9000',
    '#e18c00',
    '#e48700',
    '#e68300',
    '#e87f00',
    '#eb7b00',
    '#ed7601',
    '#ee720c',
    '#f06d15',
    '#f2691c',
    '#f36422',
    '#f46027',
    '#f55b2c',
    '#f55631',
    '#f65236',
    '#f64d3a',
    '#f6483f',
    '#f64343',
  ]
  let color=gradient[0]

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

  $: color=gradient[Math.floor((100-percentage)/100*40)]
</script>

<div style="--theme-color: {color};position: relative;display: inline-block;text-align: center;">
  <svg width="{sqSize}" height="{sqSize}" viewBox="{viewBox}">
    <circle
      class="circle-background"
      cx="{sqSize / 2}"
      cy="{sqSize / 2}"
      r="{radius}"
      stroke-width="{`${strokeWidth}px`}"
    >
    </circle>
    <circle
      class="circle-progress"
      cx="{sqSize / 2}"
      cy="{sqSize / 2}"
      r="{radius}"
      stroke-width="{`${strokeWidth}px`}"
      transform="{`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}"
      style="{`stroke-dasharray: ${dashArray};stroke-dashoffset: ${dashOffset};`}"
    >
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
    stroke: var(--theme-color);
    stroke-linecap: round;
    stroke-linejoin: round;
  }
</style>
