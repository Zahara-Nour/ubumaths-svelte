import { math } from 'tinycas/build/math/math'
import emptyQuestion from './emptyQuestion'
import {lexicoSort} from '../../app/utils'


export default function generateQuestion(question) {
    // firestore returns objects with read-only properties
   
  if (!question) return emptyQuestion
  console.log('generate question', question)

  let tempQuestion = {
    ...question,
    variables: {}, 
  }
  
  // first select an expression
  const choice = Math.floor(question.expressions.length*Math.random())
  console.log("choice", choice)
  tempQuestion.expression = question.expressions[choice]
  tempQuestion.solution = question.solutions[choice]
  console.log("tempQuestion", tempQuestion)


     // generate variables which can depend on precedent ones
  if (question.variables.constructor === Object && Object.entries(question.variables).length !== 0 ) {
    const variables = question.variables
    Object.getOwnPropertyNames(variables)
      .sort(lexicoSort)
      .forEach((name, i) => {
        // console.log('\n treating', name, variables[name])
        let generated = variables[name]
    

        // replace the precent variables by their generated value
        for (let j = 1; j < i+1; j++) {
          const precedentName = `&${j}`
          const regex = new RegExp(precedentName, 'g')
          generated = generated.replace(
            regex,
            tempQuestion.variables[precedentName],
          )
       
   
        }
     
        generated = math(generated).generate().string

        const regex = new RegExp(name, 'g')
        tempQuestion.expression = tempQuestion.expression.replace(regex, generated)
        tempQuestion.solution = tempQuestion.solution.replace(regex, generated)
        tempQuestion.variables[name] = generated
      })
  }

  // const regex = /\*\*(.*?)\*\*/g
  //expression to evaluate
  const regex = /#\{(.*?)\}/g
  const replacement = (matched, p1) => {
    const e = math(p1)
    return e.string === 'Error' ? 'Error' : `${math(p1).eval().latex}`
  }

  tempQuestion.solution = tempQuestion.solution.replace(regex, replacement)
  tempQuestion.expression = tempQuestion.expression.replace(regex, replacement)
  tempQuestion.points = tempQuestion.points || 1
    // console.log('newCard', tempCard)
  
    return tempQuestion
  }