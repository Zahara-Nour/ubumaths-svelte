import { math } from 'tinycas/build/math/math'
import { getLogger } from '../../app/utils'
export const STATUS_EMPTY = 'empty'
export const STATUS_CORRECT = 'correct'
export const STATUS_INCORRECT = 'incorrect'
export const STATUS_UNOPTIMAL_FORM = 'unoptimal  form'
export const STATUS_BAD_FORM = 'bad form'

let { fail, trace, info } = getLogger('correction', 'info')


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
    "<span style='color:_COLORANSWER_'>Ta réponse</span> contient des parenthèses inutiles."
const SPACES =
    "Les chiffres sont mal espacés dans <span style='color:_COLORANSWER_'>ta réponse</span>."
const SIGNS =
    "Tu peux faire des simplifications de signes dans <span style='color:_COLORANSWER_'>ta réponse</span>."
const BAD =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> n'est pas mathématiquement correcte."
const PRODUCTS =
    "Tu peux simplifier les symboles de multiplication dans <span style='color:_COLORANSWER_'>ta réponse</span>."
const FRACTIONS =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> contient une ou des fractions non simplifiées."
const FORM =
    "<span style='color:_COLORANSWER_'>Ta réponse</span> n'est pas écrite sous la forme demandée."

// retourne un tableau des contraintes non respectées
function checkConstraints(item) {

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
                'no-penalty-for-extraneous-brackets-in-first-negative-term',
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
        {
            option: ['no-penalty-for-non-reduced-fractions', 'require-reduced-fractions'],
            function: checkFractions,
            com: FRACTIONS,
        },
    ]

    checks.forEach((check) => {
        if (!item.options.includes(check.option[0]) && !check.function(item)) {
            item.coms.push(check.com)
            if (item.options.includes(check.option[1])) {
                item.status = STATUS_BAD_FORM
            } else {
                // penalty = true
                if (item.status !== STATUS_BAD_FORM) item.status = STATUS_UNOPTIMAL_FORM
            }
        }
    })
}

function checkAnswer(item) {


    if (item.testAnswer) {
        const tests = item.testAnswer.replace(/&answer/g, item.answer).split('&&')
        console.log('tests', tests)
        const failed = tests.some((test) => math(test).eval().isFalse())

        // TODO : tester les formats

        if (failed) {
            item.status = STATUS_INCORRECT
        } else if (item.status !== STATUS_UNOPTIMAL_FORM) {
            item.status = STATUS_CORRECT
        }
    } else {
        let e = math(item.answer)

        let sols = item.solutions.map((solution) => math(solution))

        // Les tests de contraintes ont été faits. Il faut simplifier la réponse pour pouvoir
        // la comparer à la solution : on enlève les parenthèses inutiles, les signes inutiles....

        e = e.removeUnecessaryBrackets()
        sols = sols.map((solution) => solution.removeUnecessaryBrackets())
        // }

        e = e.reduceFractions()
        sols = sols.map((solution) => solution.reduceFractions())

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


        if (!sols.some((sol) => sol.strictlyEquals(e))) {
            item.status = STATUS_BAD_FORM
        } else if (item.status !== STATUS_UNOPTIMAL_FORM) {
            item.status = STATUS_CORRECT
        }
    }

    if (item.status === STATUS_BAD_FORM) item.coms.push(FORM)
}

function checkProducts(item) {
    const e = math(item.answer)
    return e.removeMultOperator().string === e.string
}

function checkFractions(item) {
    const e = math(item.answer)
    return e.reduceFractions().string === e.string
}

function checkNullTerms(item) {
    const e = math(item.answer)
    return e.removeNullTerms().string === e.string
}

function checkBrackets(item) {
    let e
    switch (item.type) {
        case 'trou':
            e = math(item.qexp.replace('?', item.answer))
            console.log('e check', e.string)
            break
        default:
            e = math(item.answer)
    }
    const allowBracketsInFirstNegativeTerm = item.options.includes('no-penalty-for-extraneous-brackets-in-first-negative-term')
    const check = e.removeUnecessaryBrackets(allowBracketsInFirstNegativeTerm
    )
        .string === e.string
    item.checkBrackets = check
    return check
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

export function assessItems(questions, answers, answers_latex, answers_choice, times, classroom) {
    let total = 0
    let score = 0
    const items = []
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i]
        total += question.points
        items[i] = {
            qexp: question.expression,
            qexp_latex: question.expression_latex,
            qexp2: question.expression2,
            qexp2_latex: question.expression2_latex,
            answer: answers[i],
            answer_latex: answers_latex[i],
            answer_choice: answers_choice[i],
            time: times[i],
            solutions: question.solutions,
            details: question.details,
            type: question.type,
            number: i + 1,
            points: question.points,
            options: question.options ? question.options : [],
            enounce: question.enounce,
            correction: question.correction,
            correctionFormat: question.correctionFormat,
            testAnswer: question.testAnswer,
            choices: question.choices,
            coms: [],
            status: null,
            image: question.image,
            imageBase64: question.imageBase64,
            imageCorrection: question.imageCorrection,
            imageCorrectionBase64: question.imageCorrectionBase64,

        }

        assessItem(items[i], classroom)
        switch (items[i].status) {
            case STATUS_CORRECT:
                score += items[i].points
                break

            case STATUS_UNOPTIMAL_FORM:
                score += items[i].points / 2
                break

            case STATUS_EMPTY:
            case STATUS_BAD_FORM:
            case STATUS_INCORRECT:
                break

            default:
                fail('status not set')
        }
    }
    info('corrected items', items)
    return { items, score, total }
}
export function assessItem(item, classroom) {


    if (!item.answer && item.answer_choice === null) {
        //answer_choice peut etre égal à 0
        if (!classroom) item.coms.push(EMPTY_ANSWER)
        item.status = STATUS_EMPTY
    } else {

        switch (item.type) {
            case 'choice':
                item.status =
                    item.solutions.includes(item.answer_choice) === true
                        ? STATUS_CORRECT
                        : STATUS_INCORRECT

                break

            default: {

                let isNotWellFormedExpression

                const expressionFormToBeChecked = item.type === 'trou'
                    ? item.qexp.replace('?', item.answer)
                    : item.answer
                isNotWellFormedExpression = math(expressionFormToBeChecked).isIncorrect()


                if (isNotWellFormedExpression) {
                    item.coms.push(BAD)
                    item.status = STATUS_INCORRECT
                } else {
                    const equivalent =
                        item.testAnswer ||
                        item.solutions.some((solution) =>
                            math(item.answer).equals(math(solution)),
                        )
                    if (!equivalent) {
                        item.status = STATUS_INCORRECT
                    } else {
                        // vérification des contraintes de forme
                        checkConstraints(item)
                        if (item.status !== STATUS_BAD_FORM) {
                            checkAnswer(item)
                        }
                    }
                }
            }
        }
    }
}