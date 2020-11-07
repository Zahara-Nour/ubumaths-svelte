import { math } from 'tinycas/build/math/math'
import emptyCard from './emptyCard'
import {lexicoSort} from '../../app/utils'


export default function generateCard(card) {
    // firestore returns objects with read-only properties
   
  if (!card) return emptyCard
  // console.log('generate card', card)

  let tempCard = {
    ...card,
    variables: {},
    
  }
    

     // generate variables which can depend on precedent ones
  if (card.variables) {
    const variables = card.variables
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
            tempCard.variables[precedentName],
          )
       
   
        }
     
        generated = math(generated).generate().string

        const regex = new RegExp(name, 'g')
        tempCard.enounce = tempCard.enounce.replace(regex, generated)
        tempCard.answer = tempCard.answer.replace(regex, generated)
        if (tempCard.explanation) {
          tempCard.explanation = tempCard.explanation.replace(regex, generated)
        }
        tempCard.variables[name] = generated
       
      })
  }

  // const regex = /\*\*(.*?)\*\*/g
  //expression to evaluate
  const regex = /#\{(.*?)\}/g
  const replacement = (matched, p1) => {
    const e = math(p1)
    return e.string === 'Error' ? 'Error' : `${math(p1).eval().latex}`
  }

  tempCard.answer = tempCard.answer.replace(regex, replacement)
  tempCard.enounce = tempCard.enounce.replace(regex, replacement)
  if (tempCard.explanation) {
    tempCard.explanation = tempCard.explanation.replace(regex, replacement)
  }
  
    // console.log('newCard', tempCard)
  
    return tempCard
  }