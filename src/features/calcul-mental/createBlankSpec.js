import questions from './questions.js'
import fs from 'fs'
const qs = questions.questions

const specs = {}
Object.getOwnPropertyNames(qs).forEach(theme => {
    specs[theme] = {}
    Object.getOwnPropertyNames(qs[theme]).forEach(domain => {
        specs[theme][domain] = {}
        Object.getOwnPropertyNames(qs[theme][domain])
            .forEach(subdomain => {
                specs[theme][domain][subdomain] = []
                qs[theme][domain][subdomain].forEach((q,level) => {
                    // console.log(`${theme}-${domain}-${subdomain}-${level}`)
                    specs[theme][domain][subdomain][level] = []
                    const spec = {
                        description : q.description,
                        subdescription : q.subdescription,
                        expression:'',
                        expression2:'',
                        solutions:[],
                        type:q.type || 'result',
                        options:q.options || [],
                        status:'correct',
                        choices:[],
                        testAnswer: q.testAnswer


                    } 
                    specs[theme][domain][subdomain][level].push(spec)
                })
            })
    })
})

let data = JSON.stringify(specs, null, 2);
fs.writeFileSync('questions-specs.json', data);