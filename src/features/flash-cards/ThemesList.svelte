<script>
  import ThemeItem from '../../components/ThemeItem.svelte'
  import { navigate } from 'svelte-routing'
  import { Button } from 'svelte-materialify/src'
  import allGrades from './grades.json'
  import allCards from './cards.json'

  export let filters
  export let grade

  let themes, domain
  const levelsByThemes = {}
  const grades = allGrades
    .sort((a, b) => a.rank - b.rank)
    .map((value) => value.name)

  const findLevels = (theme, grade) => {
    const levelsTheme = levelsByThemes[theme]
    if (!levelsTheme) return []

    const levels = grades.reduce((prev, current) => {
      return grades.indexOf(current) >= grades.indexOf(grade) &&
        levelsTheme[current]
        ? levelsTheme[current].concat(prev)
        : prev
    }, [])

    return levels
  }

  function makeLevels() {
    themes.forEach((theme) => {
      levelsByThemes[theme] = {}

      const cards = allCards[domain][theme]
      cards.forEach((card) => {
        const { level, grade } = card
        const levelsTheme = levelsByThemes[theme]

        if (!levelsTheme[grade]) levelsTheme[grade] = []

        if (!levelsTheme[grade].includes(level)) {
          levelsTheme[grade] = levelsTheme[grade]
            .concat([level])
            .sort((a, b) => a - b)
        }
      })
    })
  }

  $: if (Array.isArray(filters)) {
    ;[{ domain }] = filters
  }

  $: if (domain) {
    themes = Object.keys(allCards[domain])

    makeLevels()
  }
</script>

{#if themes}
  {#each themes as theme}
    {#if findLevels(theme, grade).length}
      <ThemeItem>
        <div slot="text">{theme}</div>
        <div slot="buttons">
          {#each findLevels(theme, grade) as level}
            <Button
              fab
              size="x-small"
              class="ml-1 mr-1 orange white-text"
              on:click="{() =>
                navigate(
                  `/flash-cards/play?domain=${domain}&theme=${theme}&level=${level}`,
                )}"
            >
              {level}
            </Button>
          {/each}
        </div>
      </ThemeItem>
    {/if}
  {/each}
{/if}

<style>
</style>
