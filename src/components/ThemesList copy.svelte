<script>
  import { getCollection } from '../../../app/collections'
  import Spinner from './Spinner.svelte'
  import ThemeItem from './ThemeItem.svelte'
  import { lexicoSort, isEmpty } from '../../../app/utils'
  import { navigate } from 'svelte-routing'
  import { Button, Icon
  } from 'svelte-materialify/src'

  export let filters
  export let grade

  let subject
  let domain
  let themesP
  let cardsP
  let promise
  let levels

  let grades
  const gradesP = getCollection({
    collectionPath: 'Grades',
    sort: lexicoSort,
  })
    .then((values) => {
      grades = [...values]
        .sort((a, b) => a.rank - b.rank)
        .map((value) => value.name)
      return values
    })
    .catch((error) => console.log(error))

  const levelsByThemes = {}

  const findLevels = (theme, grade) => {
    const levelsTheme = levelsByThemes[theme]
    if (!levelsTheme) return []
    console.log('levelsTheme', theme)
    const levels = grades.reduce((prev, current) => {
      return grades.indexOf(current) >= grades.indexOf(grade) &&
        levelsTheme[current]
        ? prev.concat(levelsTheme[current])
        : prev
    }, [])
    return levels
  }

  $: if (Array.isArray(filters)) {
    ;[{ subject }, { domain }] = filters
  }

  $: themesP = getCollection({
    collectionPath: 'Themes',
    filters,
  }).then((themes) => themes.map((theme) => theme.name))

  $: cardsP = getCollection({
    collectionPath: 'FlashCards',
    filters,
  }).then((cards) => {
    cards.forEach((card) => {
      const { level, theme, grade } = card

      const levelsTheme = levelsByThemes[theme]
      if (levelsTheme) {
        if (!levelsTheme[grade]) levelsTheme[grade] = []
        levelsTheme[grade] = levelsTheme[grade].includes(level)
          ? levelsTheme[grade]
          : levelsTheme[grade].concat(level).sort((a, b) => a - b)
      } else {
        levelsByThemes[theme] = { [grade]: [level] }
      }
    })
    return cards
  })

  $: promise = Promise.all([themesP, cardsP, gradesP]).then(
    ([themes]) => themes,
  )
</script>

{#await promise}
  <Spinner />
{:then themes}
  {#each themes as theme}
    {#if findLevels(theme, grade).length}
      <ThemeItem>
        <div slot="text">{theme}</div>
        <div slot="buttons">
          {#each findLevels(theme, grade) as level}
              <Button  fab size="x-small" class="ml-1 mr-1 orange white-text" on:click="{() => navigate(`/flash-cards/play?subject=${subject}&domain=${domain}&theme=${theme}&level=${level}`)}">
                {level}
              </Button>
          {/each}
        </div>
      </ThemeItem>
    {/if}
  {/each}
{/await}

<style>

</style>
