<script>
  import { math } from 'tinycas/build/math/math'
  import Mathlive from 'mathlive/dist/mathlive.min.js'
  import { onMount } from 'svelte'
  import {
    STATUS_BAD_FORM,
    STATUS_CORRECT,
    STATUS_INCORRECT,
    STATUS_UNOPTIMAL_FORM,
    STATUS_EMPTY,
    STATUS_BAD_UNIT,
  } from './correction'

  export let item
  export let displayDetails
  export let size

  let number,
    options = '',
    qexp_latex,
    qexp2_latex,
    solutions,
    answer_latex,
    answer_choice,
    correctionFormat,
    correctionDetails,
    coms,
    status,
    image,
    imageBase64P,
    imageCorrection,
    imageCorrectionBase64,
    choices

  let answerColor = 'green'
  const regex = /\$\$(.*?)\$\$/g
  const replacement = (matched, p1) => Mathlive.convertLatexToMarkup(p1)
  const implicit = options && options.includes('implicit')
  // l'expression de départ doit être envoyé en latex également
  let correction_latex
  // less solutions doivent être envoyées en Latex
  let solutions_latex

  let penalty = false

  let correction
  let detailedCorrection

  function convertToMarkup(s) {
    return s.replace(regex, replacement)
  }
  // const validateFractions = checkFractions()

  // if (seemsCorrect && !validateAnswer) {
  //   coms.push(FORM)
  // }
  function updateItem() {
    ;({
      correction: correction_latex,
      number,
      options,
      qexp_latex,
      qexp2_latex,
      solutions,
      answer_latex,
      answer_choice,
      correctionFormat,
      correctionDetails,
      coms,
      status,
      image,
      imageBase64P,
      imageCorrection,
      imageCorrectionBase64,
      choices,
    } = item)
    // if (image) {
    //   imageBase64P = fetchImage(image)
    // }
    if (
      status === STATUS_BAD_FORM ||
      status === STATUS_INCORRECT ||
      status === STATUS_BAD_UNIT
    ) {
      answerColor = 'red'
    } else if (status === STATUS_UNOPTIMAL_FORM) {
      answerColor = 'orange'
    }

    solutions_latex = item.solutions
      ? item.solutions.map((solution) => {
          if (item.type === 'choice') {
            return item.choices[solution]
          } else {
            const e = math(solution)
            // TODO: verifier pourquoi implicit ?
            return e.type === '!! Error !!' ? solution : e.toLatex({ implicit })
          }
        })
      : null
    //  console.log('solution_latex', solutions_latex)
    correction = createCorrection()
    detailedCorrection = correctionDetails ? createDetailedCorrection() : null
  }

  onMount(() => {
    //  TODO: a remplacer par le markup direct
    // let score = 0
    // switch (status) {
    //   case STATUS_CORRECT:
    //     score = item.points
    //     break
    //   case STATUS_UNOPTIMAL_FORM:
    //     score = item.points / 2
    //     break
    //   default:
    //   // console.log('default case status')
    // }
    // console.log('score', score, status)
    // addPoints(score)
  })

  function createDetailedCorrection() {
    let lines = []
    let line

    correctionDetails.forEach((detail) => {
      if (detail.type === 'image') {
        // le base64 de l'image a été préparé lors de la génération de la question
        let img = detail.base64
        line = `<img src='${img}' style="max-width:400px;max-height:40vh;" alt='toto'>`
      } else {
        line = detail.text
          .replace(new RegExp('&exp2', 'g'), qexp2_latex)
          .replace(new RegExp('&exp', 'g'), qexp_latex)
          .replace(
            '&solution',
            () =>
              '<span style="color:green; border:2px solid green; border-radius: 5px;  margin:2px; padding:5px;display:inline-block">' +
              (item.type === 'choice'
                ? convertToMarkup(item.choices[solutions[0]].text)
                : convertToMarkup('$$' + solutions_latex[0] + '$$')) +
              '</span>',
          )
          .replace(
            new RegExp('&sol', 'g'),
            item.type === 'choice'
              ? item.choices[solutions[0]].text
              : '\\enclose{roundedbox}[3px solid green]{\\textcolor{green}{' +
                  solutions_latex[0] +
                  '}}',
          )
          
      }
      lines.push(line)
    })
    lines = lines.map((line) => line.replace(regex, replacement))
    return lines
  }

  function createCorrection() {
    let line
    let lines = []
    if (correctionFormat) {
      if (status === STATUS_CORRECT) {
        correctionFormat.correct.forEach((format) => {
          if (format === 'image') {
            let img = choices[solutions[0]].imageBase64
            line = `<img src='${img}' style="max-width:400px;max-height:40vh;" alt='toto'>`
          } else {
            line = format
              .replace(new RegExp('&exp2', 'g'), qexp2_latex)
              .replace(new RegExp('&exp', 'g'), qexp_latex)
              .replace(
                '&answer',
                () =>
                  '<span style="color:green; border:2px solid green; border-radius: 5px;  margin:2px; padding:5px;display:inline-block">' +
                  (item.type === 'choice'
                    ? convertToMarkup(item.choices[answer_choice].text)
                    : convertToMarkup('$$' + answer_latex + '$$')) +
                  '</span>',
              )
              .replace(
                new RegExp('&ans', 'g'),
                '\\enclose{roundedbox}[3px solid green]{\\textcolor{green}{' +
                  answer_latex +
                  '}}',
              )
          }

          lines.push(line)
        })
      } else {
        correctionFormat.uncorrect.forEach((format) => {
          if (format === 'image') {
            let img = choices[solutions[0]].imageBase64
            line = `<img style="max-width:400px;max-height:40vh;" src='${img}' alt='toto'>`
          } else {
            line = format
              .replace(new RegExp('&exp2', 'g'), qexp2_latex)
              .replace(new RegExp('&exp', 'g'), qexp_latex)
              .replace(
                '&solution',
                () =>
                  '<span style="color:green; border:2px solid green; border-radius: 5px; margin:2px;padding:5px;display:inline-block">' +
                  (item.type === 'choice'
                    ? convertToMarkup(item.choices[solutions[0]].text)
                    : convertToMarkup('$$' + solutions_latex[0] + '$$')) +
                  '</span>',
              )
              .replace(
                new RegExp('&sol', 'g'),
                item.type === 'choice'
                  ? item.choices[solutions[0]].text
                  : '\\enclose{roundedbox}[3px solid green]{\\textcolor{green}{' +
                      solutions_latex[0] +
                      '}}',
              )
          }

          lines.push(line)
        })

        if (correctionFormat.answer === 'image') {
          let img = choices[answer_choice].imageBase64
          coms.unshift(
            `<img src='${img}' style="padding:2px; border: 2px solid red ;max-width:400px;max-height:40vh;" alt='toto'>`,
          )
          coms.unshift('Ta réponse:')
        } else {
          coms.unshift(
            'Ta réponse : ' +
              correctionFormat.answer
                .replace(new RegExp('&exp2', 'g'), qexp2_latex)
                .replace(new RegExp('&exp', 'g'), qexp_latex)

                .replace(
                  '&answer',
                  () =>
                    `<span style="color:${answerColor};display:inline-block">` +
                    (item.type === 'choice'
                      ? convertToMarkup(item.choices[answer_choice].text)
                      : convertToMarkup('$$' + answer_latex + '$$')) +
                    '</span>',
                )
                .replace(
                  new RegExp('&ans', 'g'),
                  `\\textcolor{${answerColor}}{` + answer_latex + '}',
                ),
          )
        }
      }
    } else {
      switch (item.type) {
        case 'result':
        case 'rewrite': {
          line = `$$\\begin{align*}  ${qexp_latex}`
          if (status === STATUS_EMPTY) {
            line +=
              `=\\enclose{roundedbox}[3px solid green]{\\textcolor{green}{${solutions_latex[0]}}}` +
              '\\end{align*}$$'
          } else if (status === STATUS_INCORRECT) {
            line +=
              `&= \\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{${answer_latex}}}` +
              `\\\\&= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{${solutions_latex[0]}}}\\end{align*}$$`
          } else if (status === STATUS_BAD_FORM || status === STATUS_BAD_UNIT || status === STATUS_UNOPTIMAL_FORM) {
            line +=
              `&= \\textcolor{${answerColor}}{${answer_latex}}` +
              `\\\\&= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{${solutions_latex[0]}}}\\end{align*}$$`
          }  else {
            // STATUS_CORRECT
            line += `=\\enclose{roundedbox}[3px solid green]{\\textcolor{green}{${answer_latex}}}\\end{align*}$$`
          }
          lines.push(line)

          break
        }

        case 'equation': {
          // let exp = '$$\\begin{align*}x & =5-3 \\\\  & =2\\end{align*}$$'
          line = `La solution de $$${qexp_latex}$$ est :`
          lines.push(line)
          line = `$$\\begin{align*}  x`
          if (status === STATUS_EMPTY) {
            line +=
              `=\\textcolor{green}{${solutions_latex[0]}}` + '\\end{align*}$$'
          } else if (status === STATUS_INCORRECT) {
            line +=
              `&= \\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{${answer_latex}}}` +
              `\\\\&= \\textcolor{green}{${solutions_latex[0]}}\\end{align*}$$`
          } else if (
            status === STATUS_BAD_FORM ||
            status === STATUS_UNOPTIMAL_FORM
          ) {
            line +=
              `&= \\textcolor{orange}{${answer_latex}}` +
              `\\\\&= \\textcolor{green}{${solutions_latex[0]}}\\end{align*}$$`
          } else {
            line += `=\\textcolor{green}{${answer_latex}}\\end{align*}$$`
          }
          lines.push(line)

          break
        }
        case 'choice':
          line =
            correction_latex +
            '<span class="green-text">' +
            solutions_latex[0] +
            '</span>'

          lines.push(line)
          break

        case 'enonce':
          lines.push(item.enounce)

          if (empty) {
            line = '$$' + `\\textcolor{green}{${solutions_latex[0]}}` + '$$'
          } else if (badExpression || !correct) {
            line =
              '$$\\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{' +
              answer_latex +
              '}}\\text{  }\\textcolor{green}{' +
              solutions_latex[0] +
              '}$$'
          } else {
            line = '$$\\textcolor{green}{' + answer_latex + '}$$'

            // if (!strictlyCorrect) {
            //   line +=
            //     '\\color{black}\\text{ mais }\\color{green}' +
            //     s_exp.latex +
            //     "\\color{black}\\text{ c'est encore mieux !}"
            // }
          }
          lines.push(line)

          break

        case 'decomposition':
          
            // let exp = '$$\\begin{align*}x & =5-3 \\\\  & =2\\end{align*}$$'

            line = `$$\\begin{align*}  ${qexp_latex}`
            if (status === STATUS_EMPTY) {
              line +=
                `=\\textcolor{green}{${solutions_latex[0]}}` + '\\end{align*}$$'
            } else if (status === STATUS_INCORRECT) {
              line +=
                `&= \\enclose{updiagonalstrike}[6px solid rgba(205, 0, 11, .4)]{\\textcolor{red}{${answer_latex}}}` +
                `\\\\&= \\textcolor{green}{${solutions_latex[0]}}\\end{align*}$$`
            } else if (
              status === STATUS_BAD_FORM ||
              status === STATUS_UNOPTIMAL_FORM
            ) {
              line +=
                `&= \\textcolor{orange}{${answer_latex}}` +
                `\\\\&= \\textcolor{green}{${solutions_latex[0]}}\\end{align*}$$`
            } else {
              line += `=\\textcolor{green}{${answer_latex}}\\end{align*}$$`
            }
            lines.push(line)   
          break

      

        case 'trou':
          //TODO : empty ?
          if (status === STATUS_CORRECT) {
            line =
              '$$' +
              qexp_latex.replace(
                /\\ldots/,
                `\\textcolor{green}{${answer_latex}}`,
              ) +
              '$$'
          } else {
            line =
              '$$' +
              qexp_latex.replace(
                /\\ldots/,
                `\\textcolor{green}{${solutions_latex[0]}}`,
              ) +
              '$$'

            if (status === STATUS_INCORRECT) {
              coms.unshift(
                'Ta réponse : $$' +
                  qexp_latex.replace(
                    /\\ldots/,
                    `\\textcolor{red}{${answer_latex}}`,
                  ) +
                  '$$',
              )
            } else if (
              status === STATUS_BAD_FORM ||
              status === STATUS_UNOPTIMAL_FORM
            ) {
              coms.unshift(
                'Ta réponse : $$' +
                  qexp_latex.replace(
                    /\\ldots/,
                    `\\textcolor{orange}{${answer_latex}}`,
                  ) +
                  '$$',
              )
            }
          }
          lines.push(line)
      }
    }

    lines = lines.map((line) =>
      line.replace(regex, replacement).replace(/_COLORANSWER_/g, answerColor),
    )

    coms = coms.map((com) =>
      com.replace(regex, replacement).replace(/_COLORANSWER_/g, answerColor),
    )

    return lines
  }

  $: if (item) updateItem()
</script>


{#if correction}
  <div
    id="{`correction${number}`}"
    style="word-break: break-word ;min-width: 0;white-space: normal;"
  >
    {#if image}
      {#if imageCorrection}
        {#await imageCorrectionBase64}
          loading image
        {:then base64}
          <img
            src="{base64}"
            class="mt-3 mb-3"
            style="max-width:500px;max-height:40vh;"
            alt="Alright Buddy!"
          />
        {:catch error}
          {error}
        {/await}
      {:else}
        {#await imageBase64P}
          loading image
        {:then base64}
          <img
            src="{base64}"
            class="mt-3 mb-3"
            style="max-width:500px;max-height:40vh;"
            alt="Alright Buddy!"
          />
        {:catch error}
          {error}
        {/await}
      {/if}
    {/if}
    {#if displayDetails && item.correctionDetails}
      {#each detailedCorrection as line}
        <div class="ml-2 mr-2 mt-2 mb-2" style="font-size:{size}px;">
          {@html line}
        </div>
      {/each}
    {:else}
      {#each correction as line}
        <p class="ml-2 mr-2 mt-2 mb-2" style="font-size:{size}px;">
          {@html line}
        </p>
      {/each}

      {#if coms.length}
        {#each coms as com}
          <p
            class="ml-2 mr-2 mt-2 mb-2"
            style="font-size:{size}px;font-family: 'Handlee', cursive;"
          >
            {@html com}
          </p>
        {/each}
      {/if}
    {/if}
  </div>
{/if}
