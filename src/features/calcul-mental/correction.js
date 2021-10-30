import { math } from 'tinycas/build/math/math'
export const STATUS_EMPTY = 'empty'
export const STATUS_CORRECT = 'correct'
export const STATUS_INCORRECT = 'incorrect'
export const STATUS_UNOPTIMAL_FORM = 'unoptimal  form'
export const STATUS_BAD_FORM = 'bad form'

let status

const EMPTY_ANSWER = "Tu n'as rien répondu."
const ZEROS =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> contient des des zéros inutiles"
const FACTORE_ONE =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> contient un facteur égal à 1 que tu peux simplifier."
const FACTORE_ZERO =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> contient un produit nul que tu peux simplifier."
const NULL_TERMS =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> contient un terme nul que tu peux enlever."
const BRACKETS =
    "<span style='color:#_COLORANSWER_'>Ta réponse</span> contient des parenthèses inutiles."
const SPACES =
    "Les chiffres sont mal espacés dans <span style='color:_COLORANSWER_'>ta réponse</span>."
const SIGNS =
    "Tu peux faire des simplifications de signes dans <span style='color:_COLORANSWER_'>ta réponse</span>."
const BAD =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> n'est pas mathématiquement correcte."
const PRODUCTS =
    "Tu peux simplifier les symboles de multiplication dans <span style='color:_COLORANSWER_'>ta réponse</span>."
const FORM =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> n'est pas écrite sous la forme demandée."

// retourne un tableau des contraintes non respectées
function checkConstraints(item, coms) {
    console.log('check Constraints')

    const checks = [
        {
            option: ['no-penalty-for-incorrect-spaces', 'require-correct-spaces'],
            function: checkSpaces,
            com: SPACES,
        },
        {
            option: [
                'no-penalty-for-explicit-products',
                'require-implicit-products',
            ],
            function: checkProducts,
            com: PRODUCTS,
        },
        {
            option: [
                'no-penalty-for-extraneous-brackets',
                'require-no-extraneaous-brackets',
            ],
            function: checkBrackets,
            com: BRACKETS,
        },
        {
            option: [
                'no-penalty-for-extraneous-zeros',
                'require-no-extraneaous-zeros',
            ],
            function: checkZeros,
            com: ZEROS,
        },
        {
            option: [
                'no-penalty-for-extraneous-signs',
                'require-no-extraneaous-signs',
            ],
            function: checkSigns,
            com: SIGNS,
        },
        {
            option: ['no-penalty-for-factor-one', 'require-no-factor-one'],
            function: checkFactorsOne,
            com: FACTORE_ONE,
        },
        {
            option: ['no-penalty-for-factor-zero', 'require-no-factor-zero'],
            function: checkFactorsZero,
            com: FACTORE_ZERO,
        },
        {
            option: ['no-penalty-for-null-terms', 'require-no-null-terms'],
            function: checkNullTerms,
            com: NULL_TERMS,
        },
    ]

    checks.forEach((check) => {
        if (!item.options.includes(check.option[0]) && !check.function(item)) {
            coms.push(check.com)
            if (item.options.includes(check.option[1])) {
                status = STATUS_BAD_FORM
            } else {
                // penalty = true
                if (status !== STATUS_BAD_FORM) status = STATUS_UNOPTIMAL_FORM
            }
        }
        console.log('check', status)
    })
}

function checkAnswer(item, coms) {
    console.log('checkAnswer')

    if (item.testAnswer) {
        const tests = item.testAnswer.replace(/&answer/g, item.answer).split('&&')
        console.log('tests', tests)
        const failed = tests.some((test) => math(test).eval().isFalse())

        // TODO : tester les formats

        if (failed) {
            status = STATUS_INCORRECT
        } else if (status !== STATUS_UNOPTIMAL_FORM) {
            status = STATUS_CORRECT
        }
    } else {
        let e = math(item.answer)

        let sols = item.solutions.map((solution) => math(solution))

        // Les tests de contraintes ont été faits. Il faut simplifier la réonse pour pouvoir
        // la comparer à la solution : on enlève les parenthèses inutiles, les signes inutiles....

        e = e.removeUnecessaryBrackets()
        sols = sols.map((solution) => solution.removeUnecessaryBrackets())
        // }

        e = e.removeFactorsOne()
        sols = sols.map((solution) => solution.removeFactorsOne())

        e = e.simplifyNullProducts()
        sols = sols.map((solution) => solution.simplifyNullProducts())

        e = e.removeNullTerms()
        sols = sols.map((solution) => solution.removeNullTerms())

        e = e.removeMultOperator()
        sols = sols.map((solution) => solution.removeMultOperator())

        if (
            item.options.includes('disallow-terms-and-factors-permutation') ||
            item.options.includes('disallow-terms-permutation') ||
            item.options.includes('disallow-factors-permutation')
        ) {
            if (
                !item.options.includes('disallow-terms-permutation') &&
                !item.options.includes('disallow-terms-and-factors-permutation')
            ) {
                e = e.sortTerms()
                sols = sols.map((solution) => solution.sortTerms())
            } else if (
                !item.options.includes('disallow-factors-permutation') &&
                !item.options.includes('disallow-terms-and-factors-permutation')
            ) {
                e = e.sortFactors()
                sols = sols.map((solution) => solution.sortFactors())
            }
        } else {
            e = e.sortTermsAndFactors()
            sols = sols.map((solution) => solution.sortTermsAndFactors())
        }

        console.log('checkAnswer', sols, e.string)
        if (!sols.some((sol) => sol.strictlyEquals(e))) {
            status = STATUS_BAD_FORM
        } else if (status !== STATUS_UNOPTIMAL_FORM) {
            status = STATUS_CORRECT
        }
    }

    if (status === STATUS_BAD_FORM) coms.push(FORM)
}

function checkProducts(item) {
    const e = math(item.answer)
    return e.removeMultOperator().string === e.string
}

function checkNullTerms(item) {
    const e = math(item.answer)
    return e.removeNullTerms().string === e.string
}

function checkBrackets(item) {
    const e = math(item.answer)
    return e.removeUnecessaryBrackets().string === e.string
}

function checkSigns() {
    return true
}

function checkFactorsOne(item) {
    const e = math(item.answer)
    return e.removeFactorsOne().string === e.string
}

function checkFactorsZero(item) {
    const e = math(item.answer)
    return e.simplifyNullProducts().string === e.string
}

// retourne true si la vérification est OK
function checkSpaces(item) {
    //  TODO: a Remplacer par searchMisplacedSpaces

    const a = item.answer_latex.replace(/\\,/g, ' ').replace(',', '.').trim()

    const regex = /\d+[\d\s]*(\.[\d\s]*\d+)?/g
    const matches = a.match(regex)

    if (matches) {
        const regexsInt = [
            /\d{4}/,
            /\s$/,
            /\s\d{2}$/,
            /\s\d{2}\s/,
            /\s\d$/,
            /\s\d\s/,
        ]

        const regexsDec = [
            /\d{4}/,
            /^\s/,
            /^\d{2}\s/,
            /\s\d{2}\s/,
            /^\d\s/,
            /\s\d\s/,
        ]
        return !matches.some((match) => {
            let [int, dec] = match.split('.')

            return (
                regexsInt.some((regex) => int.match(regex)) ||
                (dec && regexsDec.some((regex) => dec.match(regex)))
            )
        })
    }

    return true
}

function checkOrder() {
    return true
}

// retourne true si la vérification est OK
function checkZeros(item) {
    return !math(item.answer).searchUnecessaryZeros()
}


export function getStatus(item, coms=[], classroom) {
    status = null
    if (!item.answer && item.answer_choice === null) {
        //answer_choice peut etre égal à 0
        if (!classroom) coms.push(EMPTY_ANSWER)
        status = STATUS_EMPTY
    } else {
        console.log('not empty')
        switch (item.type) {
            case 'choice':
                status =
                    item.solutions.includes(item.answer_choice) === true
                        ? STATUS_CORRECT
                        : STATUS_INCORRECT
                console.log('status', status)
                break

            default: {
                const badExpression =
                    item.type !== 'choice' && math(item.answer).type === '!! Error !!'
                const equivalent =
                item.testAnswer ||
                    (!badExpression &&
                        item.solutions.some((solution) =>
                            math(item.answer).equals(math(solution)),
                        ))
                if (badExpression) {
                    coms.push(BAD)
                    status = STATUS_INCORRECT
                } else if (!equivalent) {
                    status = STATUS_INCORRECT
                } else {
                    // vérification des contraintes de forme
                    checkConstraints(item, coms)
                    if (status !== STATUS_BAD_FORM) {
                        checkAnswer(item, coms)
                    }
                }
            }
        }
    }
    console.log('status', status)
    return status
}