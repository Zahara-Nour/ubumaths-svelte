import { CP, CM1, CM2, SIXIEME, SECONDE, CINQUIEME, QUATRIEME, CE1, CE2, TROISIEME } from '../../app/grade'

const UNKNOWN = 'a determiner'
// OPTIONS
// 
// * espaces dans l'écriture des nombres
// enounce-no-spaces = false
// exp-no-spaces = false
// answer-require-spaces = false
// 
// require-correct-spaces = false
// no-penalty-for-incorrect-spaces = false


// * produits implicites
// answer-require-implicit-products = true


// require-implicit-products = false
// no-penalty-for-explicit-products = false
// 
// * parenthèses inutiles
// answer-allow-unecessary-brackets = false
// 
// require-no-extraneaous-brackets
// no-penalty-for-extraneous-brackets
// no-penalty-for-extraneous-brackets-in-first-negative-term



// * zéros inutiles
// answer-allow-unecessary-zeros = false
// exp-allow-unecessary-zeros = false
// 
// require-no-extraneaous-zeros
// no-penalty-for-extraneous-zeros


// * signes inutiles
// answer-allow-unecessary-signs = false
// 
// require-no-extraneaous-signs
// no-penalty-for-extraneous-signs

// * facteurs égaux à 1
// require-no-factor-one = false
// no-penalty-for-factor-one = false

// * facteurs égaux à 0
// require-no-factor-zero = false
// no-penalty-for-factor-zero = false

// * permutation des termes et facteurs
// disallow-terms-permutation=false
// disallow-factors-permutation=false
// disallow-terms-and-factors-permutation=false
// penalty-for-terms-and-factors-permutation = false
// penalty-for-terms-permutation = false
// penalty-for-factors-permutation = false

// * termes nuls
// require-no-null-terms = false
// no-penalty-for-null-terms = false


//  options pour fractions non simplifiées
// require-reduced-fractions
// no-penalty-for-non-reduced-fractions

// modifictaion de l'expression de la fonction
// shuffle-terms = false
// shuffle-factors = false
// shuffle-terms-and-factors = false
// shallow-shuffle-terms = false
// shallow-shuffle-factors = false
// exp-remove-unecessary-brackets = false




//*  mélange des choix (mélangés par défaut)
// no-shuffle-choices = false

// * unicité des questions 
// allow-same-expression = false
// allow-same-enounce = false

const code = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

const questions = {
  Entiers: {
    Apprivoiser: {
      Ecriture: [
        {
          description: "Connaître la position décimale",
          subdescription: "Jusqu'aux dizaines.",
          enounces: [
            "Dans le nombre $$&4$$,  quel est le chiffre des dizaines ?",
            "Dans le nombre $$&4$$, quel est le chiffre des unités ?"
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]\\{&1}',
              '&4': '#{&1*10+&2}',
            },

          ],
          solutions: [['&1'], ['&2'],],
          correctionFormat: [
            {
              correct: ['Dans $$%%{&4}$$ le chiffre des dizaines est &solution.'],
              uncorrect: ['Dans $$%%{&4}$$ le chiffre des dizaines est &solution.'],
              answer: 'Le chiffre des dizaines est &answer.'
            },
            {
              correct: ['Dans $$%%{&4}$$ le chiffre des unités est &solution.'],
              uncorrect: ['Dans $$%%{&4}$$ le chiffre des unités est &solution.'],
              answer: 'Le chiffre des unités est &answer.'
            }
          ],
          type: 'rewrite',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: "Connaître la position décimale",
          subdescription: "Jusqu'aux centaines",
          enounces: [
            "Dans le nombre $$&4$$, quel est le chiffre des centaines ?",
            "Dans le nombre $$&4$$,  quel est le chiffre des dizaines ?",
            "Dans le nombre $$&4$$, quel est le chiffre des unités ?"
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]\\{&1}',
              '&3': '$e[0;9]\\{&1;&2}',
              '&4': '#{&1*100+&2*10+&3}',
            },

          ],
          solutions: [['&1'], ['&2'], ['&3'],],
          correctionFormat: [
            {
              correct: ['Dans $$%%{&4}$$ le chiffre des centaines est &solution.'],
              uncorrect: ['Dans $$%%{&4}$$ le chiffre des centaines est &solution.'],
              answer: 'Le chiffre des centaines est &answer.'
            },
            {
              correct: ['Dans $$%%{&4}$$ le chiffre des dizaines est &solution.'],
              uncorrect: ['Dans $$%%{&4}$$ le chiffre des dizaines est &solution.'],
              answer: 'Le chiffre des dizaines est &answer.'
            },
            {
              correct: ['Dans $$%%{&4}$$ le chiffre des unités est &solution.'],
              uncorrect: ['Dans $$%%{&4}$$ le chiffre des unités est &solution.'],
              answer: 'Le chiffre des unités est &answer.'
            }
          ],
          type: 'rewrite',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: "Parité d'un nombre entier",
          enounces: ["Ce nombre est-il pair ou impair ?"],
          expressions: ['&2', '&3'],
          variables: [
            {
              '&1': '$e[0;49]',
              '&2': '#{2*&1}',
              '&3': '#{2*&1+1}',
            },

          ],
          choices: [
            [{ text: 'pair' }, { text: 'impair' }],
          ],
          correctionFormat: [{
            correct: ['Le nombre $$&exp$$ est &solution'],
            uncorrect: ['Le nombre $$&exp$$ est &solution'],
            answer: 'Le nombre $$&exp$$ est &answer'
          }],
          correctionDetails: [
            [
              { text: '$$&exp$$ est &solution car il se termine par 0, 2, 4, 6, ou 8.' }
            ],
            [
              { text: '$$&exp$$ est &solution car il se termine par 1, 3, 5, 7, ou 9.' }
            ],
          ],
          solutions: [
            [0], [1]
          ],
          options: ['no-shuffle-choices'],
          type: 'choice',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: "Connaître la position décimale",
          subdescription: "Jusqu'aux milliers",
          enounces: [
            "Dans le nombre $$%{&5}$$, quel est le chiffre des milliers ?",
            "Dans le nombre $$%{&5}$$, quel est le chiffre des centaines ?",
            "Dans le nombre $$%{&5}$$,  quel est le chiffre des dizaines ?",
            "Dans le nombre $$%{&5}$$, quel est le chiffre des unités ?"
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]\\{&1}',
              '&3': '$e[0;9]\\{&1;&2}',
              '&4': '$e[0;9]\\{&1;&2;&3}',
              '&5': '&1*1000+&2*100+&3*10+&4',
            },

          ],
          solutions: [['&1'], ['&2'], ['&3'], ['&4'],],
          correctionFormat: [
            {
              correct: ['Dans $$%{&5}$$ le chiffre des milliers est &solution.'],
              uncorrect: ['Dans $$%{&5}$$ le chiffre des milliers est &solution.'],
              answer: 'Le chiffre des milliers est &answer.'
            },
            {
              correct: ['Dans $$%{&5}$$ le chiffre des centaines est &solution.'],
              uncorrect: ['Dans $$%{&5}$$ le chiffre des centaines est &solution.'],
              answer: 'Le chiffre des centaines est &answer.'
            },
            {
              correct: ['Dans $$%{&5}$$ le chiffre des dizaines est &solution.'],
              uncorrect: ['Dans $$%{&5}$$ le chiffre des dizaines est &solution.'],
              answer: 'Le chiffre des dizaines est &answer.'
            },
            {
              correct: ['Dans $$%{&5}$$ le chiffre des unités est &solution.'],
              uncorrect: ['Dans $$%{&5}$$ le chiffre des unités est &solution.'],
              answer: 'Le chiffre des unités est &answer.'
            }
          ],
          type: 'rewrite',
          defaultDelay: 10,
          grade: CE2,
        },
        {
          description: 'Ecrire un grand nombre entier avec des espaces',
          description: 'Nombre à 4 chiffres',
          enounces: ["Réécris ce nombre  entiers  en ajoutant un espace pour séparer le chiffre des milliers."],
          expressions: ['&1'],
          variables: [
            { '&1': '$e{4;4}' },
          ],
          options: ['exp-no-spaces', 'require-correct-spaces'],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: 'Ecrire un grand nombre entier avec des espaces',
          description: "Jusqu'à 7 chiffres",
          enounces: ["Réécris ce nombre  entiers  en rajoutant des espaces pour former des groupes de 3 chiffres."],
          expressions: ['&2'],
          variables: [
            { '&1': '$e[4;7]', '&2': '$e{&1;&1}' },
          ],
          options: ['exp-no-spaces', 'require-correct-spaces'],
          type: 'result',
          defaultDelay: 30,
          grade: CM1,
        },
        {
          description: 'Ecrire un grand nombre entier sans les zéros inutiles',
          enounces: ["Réécris ce nombre entiers en enlevant les zéros inuiles."],
          expressions: [
            '00&1&2&3&4',
            '00&1&2&3&40',
            '00&1&2&3&400',
            '0&1&2&3&4',
            '0&1&2&3&40',
            '0&1&2&3&400',
          ],
          variables: [
            { '&1': '$e[1;9]', '&2': '$l{0;$e[1;9]}', '&3': '$l{0;$e[1;9]}', '&4': '$e[1;9]' },
          ],
          options: ['exp-allow-unecessary-zeros'],
          type: 'rewrite',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Ecrire un grand nombre entier avec des espaces',
          description: "Jusqu'à 10 chiffres",
          enounces: ["Réécris ce nombre  entiers  en rajoutant des espaces pour former des groupes de 3 chiffres."],
          expressions: ['&2'],
          variables: [
            { '&1': '$e[4;10]', '&2': '$e{&1;&1}' },
          ],
          options: ['exp-no-spaces', 'require-correct-spaces'],
          type: 'result',
          defaultDelay: 30,
          grade: CM2,
        },
        {
          description: 'Enigme pour trouver un nombre',
          enounces: [
            "Je suis un nombre à 3 chiffres. Mon <b>chiffre des unités</b> est $$&1$$. Le <b>nombre</b> de mes dizaines est le double du chiffre des unités. Qui suis-je ?",
            "Je suis un nombre à 3 chiffres. Mon <b>chiffre des unités</b> est $$&1$$. Le <b>nombre</b> de mes dizaines est le triple du chiffre des unités. Qui suis-je ?",
          ],
          expressions: ['&1*21', '&1*31'],
          variables: [
            { '&1': '$e[5;9]' },
          ],
          correctionFormat: [
            {
              correct: ['Je suis &solution.'],
              uncorrect: ['Je suis &solution.'],
              answer: 'Je suis &answer.'
            },
          ],
          options: ['no-exp'],
          type: 'result',
          defaultDelay: 30,
          grade: CM2,
        },


      ],
      Décomposition: [
        {
          description: "Décomposer l'écriture décimale un nombre",
          subdescription: 'En dizaines et unités',
          enounces: ["Décomposer ce nombre en dizaines et unités."],
          expressions: ['#{&1*10+&2}'],
          solutions: [['#{&1*10}+&2']],
          variables: [{ '&1': '$e[1;9]', '&2': '$e[1;9]', }],
          type: 'decomposition',
          defaultDelay: 20,
          grade: CP,
        },
        {
          description: "Décomposer l'écriture décimale un nombre",
          subdescription: 'En centaines, dizaines et unités',
          enounces: ["Décomposer ce nombre en centaines, dizaines et unités."],
          expressions: ['#{&1*100+&2*10+&3}'],
          solutions: [['#{&1*100}+#{&2*10}+&3']],
          variables: [{ '&1': '$e[1;9]', '&2': '$e[0;9]', '&3': '$e[0;9]', }],
          options: ['no-penalty-for-extraneous-brackets', 'no-penalty-for-factor-one', 'no-penalty-for-factor-zero'],
          type: 'decomposition',
          defaultDelay: 20,
          grade: CE1,
        },
        {
          description: "Décomposer l'écriture décimale un nombre",
          subdescription: "En centaines, dizaines et unités, à l'aide de produits",
          enounces: ["Décompose ce nombre comme dans cet exemple : $$345 = (3 \\times 100) +(4 \\times 10) + 5$$."],
          expressions: [
            '#{&1*100 + &2*10 + &3}',
            // '#{(&1*1000) +  (&2*100) + (&3*10) + &4}',
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
            },
          ],
          solutions: [['(&1*100) + (&2*10) + &3']],
          // solutions:[['&1*1000 +  &2*100 + &3*10 + &4']],
          options: ['no-penalty-for-extraneous-brackets', 'no-penalty-for-factor-one'],
          type: 'decomposition',
          defaultDelay: 30,
          grade: CE1,
        },
        {
          description: "Décomposer l'écriture décimale un nombre",
          subdescription: 'En milliers, centaines, dizaines et unités',
          enounces: ["Décompose ce nombre comme dans cet exemple : $$345 = 300 + 40 + 5$$."],
          expressions: ['#{&1*1000+&2*100+&3*10+&4}'],
          solutions: [['#{&1*1000}+#{&2*100}+#{&3*10}+&4']],
          variables: [{ '&1': '$e[1;9]', '&2': '$e[1;9]', '&3': '$e[1;9]', '&4': '$e[1;9]' }],
          type: 'decomposition',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: "Décomposer l'écriture décimale un nombre",
          subdescription: "En milliers, centaines, dizaines et unités, à l'aide de produits",
          enounces: ["Décompose ce nombre comme dans cet exemple : $$2\\,345 = (2 \\times 1\\,000) + (3 \\times 100) +(4 \\times 10) + 5$$."],
          expressions: [
            '#{&1*1000 + &2*100 + &3*10+&4}',
            // '#{(&1*1000) +  (&2*100) + (&3*10) + &4}',
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
              '&4': '$e[1;9]',
            },
          ],
          solutions: [['(&1*1000) + (&2*100) + (&3*10)+&4']],

          // solutions:[['&1*1000 +  &2*100 + &3*10 + &4']],
          options: ['no-penalty-for-extraneous-brackets', 'no-penalty-for-factor-one'],
          type: 'decomposition',
          defaultDelay: 40,
          grade: CE2,
        },
        {
          description: "Décomposition décimale -> nombre entier",
          enounces: ["Réécris cette expression sous la forme d'un nombre entier."],
          expressions: [
            '(&1*10000) +  (&2*1000) + (&3*100) + (&4*10) + &5',
          ],
          variables: [
            {
              '&1': '$e[0;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[0;9]',
              '&5': '$e[0;9]',
            },
          ],
          options: ['remove-null-terms'],
          type: 'rewrite',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: "Décomposition décimale -> nombre entier",
          subdescription: "Termes mélangés",
          enounces: ["Réécris cette expression sous la forme d'un nombre entier."],
          expressions: [
            '(&1*10000) +  (&2*1000) + (&3*100) + (&4*10) + &5',
          ],
          variables: [
            {
              '&1': '$e[0;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[0;9]',
              '&5': '$e[0;9]',
            },
          ],
          options: ['remove-null-terms', 'shuffle-terms'],
          type: 'rewrite',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: "Décomposer l'écriture décimale un nombre",
          subdescription: 'En dizaines de milliers, milliers, centaines, dizaines et unités',
          enounces: ["Décomposer ce nombre en dieaines de milliers, milliers, centaines, dizaines et unités."],
          enounces: ["Décompose ce nombre comme dans cet exemple : $$23\\,456 = 20\\,000 + 3\\,000 + 400 + 50 + 6$$."],
          expressions: ['#{&1*10000+&2*1000+&3*100+&4*10+&5}'],
          solutions: [['#{&1*10000}+#{&2*1000}+#{&3*100}+#{&4*10}+&5']],
          variables: [{ '&1': '$e[1;9]', '&2': '$e[1;9]', '&3': '$e[1;9]', '&4': '$e[1;9]', '&5': '$e[1;9]' }],

          type: 'decomposition',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: "Décomposer l'écriture décimale un nombre",
          subdescription: "En dizaines de milliers, milliers, centaines, dizaines et unités, à l'aide de produits",
          enounces: ["Décompose ce nombre comme dans cet exemple : $$12\\,345 = (1 \\times 10\\,000) +(2 \\times 1\\,000) + (3 \\times 100) +(4 \\times 10) + 5$$."],
          expressions: [
            '#{&1*10000 + &2*1000 + &3*100+&4*10+&5}',
            // '#{(&1*1000) +  (&2*100) + (&3*10) + &4}',
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
              '&4': '$e[1;9]',
              '&5': '$e[1;9]',
            },
          ],
          solutions: [['(&1*10000) + (&2*1000) + (&3*100)+(&4*10)+&5']],
          options: ['no-penalty-for-extraneous-brackets', 'no-penalty-for-factor-one'],
          type: 'decomposition',
          defaultDelay: 50,
          grade: CM1,
        },
      ],
      Repérage: [
        {
          description: "Repérer sur une demi-droite graduée.",
          enounces: ['Quel est ce nombre ?'],

          images: [
            'entiers/reperage/droite_graduee-10_en_10-0-600.png',
            'entiers/reperage/droite_graduee-10_en_10-1-600.png',
            'entiers/reperage/droite_graduee-10_en_10-2-600.png',
            'entiers/reperage/droite_graduee-10_en_10-3-600.png',
            'entiers/reperage/droite_graduee-10_en_10-4-600.png',
            'entiers/reperage/droite_graduee-10_en_10-5-600.png',
            'entiers/reperage/droite_graduee-10_en_10-6-600.png',
            'entiers/reperage/droite_graduee-10_en_10-7-600.png',
            'entiers/reperage/droite_graduee-10_en_10-8-600.png',
            'entiers/reperage/droite_graduee-10_en_10-9-600.png',
            'entiers/reperage/droite_graduee-10_en_10-10-600.png',
            'entiers/reperage/droite_graduee-10_en_10-11-600.png',
            'entiers/reperage/droite_graduee-10_en_10-12-600.png',
            'entiers/reperage/droite_graduee-10_en_10-13-600.png',
            'entiers/reperage/droite_graduee-10_en_10-14-600.png',
            'entiers/reperage/droite_graduee-10_en_10-15-600.png',
            'entiers/reperage/droite_graduee-10_en_10-16-600.png',
            'entiers/reperage/droite_graduee-10_en_10-17-600.png',
            'entiers/reperage/droite_graduee-10_en_10-18-600.png',
            'entiers/reperage/droite_graduee-10_en_10-19-600.png',
          ],
          type: 'rewrite',
          solutions: [['560']],
          correctionFormat: [{
            correct: ['Le nombre est &solution'],
            uncorrect: ['Le nombre est &solution'],
            answer: 'Le nombre est &answer'
          }],
          defaultDelay: 20,
          grade: CP,
        },
      ],
      Comparer: [
        {
          description: "Comparer deux nombres entiers",
          subdescription: "Nombres inférieurs à 100",
          enounces: ["Quel est le plus petit de ces 2 nombres ?"],
          variables: [
            {
              '&1': '$e[0;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[0;9]',
              '&5': '#{&1*10+&2}',
              '&6': '#{&3*10+&4}',
            },

          ],
          conditions: ['&5!=&6'],
          choices: [
            [{ text: '$$%%{&5}$$' }, { text: '$$%%{&6}$$' }],
          ],
          correctionFormat: [{
            correct: ['Entre $$%%{&5}$$ et $$%%{&6}$$ le plus petit est &solution'],
            uncorrect: ['Entre $$%%{&5}$$ et $$%%{&6}$$ le plus petit est &solution'],
            answer: 'Le plus petit est &answer'
          }],
          // corrections: [
          //   'Entre $$%%{&5}$$ et $$%%{&6}$$ le plus petit est ',
          // ],
          solutions: [
            ['&5<&6 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: "Comparer deux nombres entiers",
          subdescription: "Nombres inférieurs à 1000",
          enounces: ["Quel est le plus petit de ces 2 nombres ?"],
          variables: [
            {
              '&1': '$e[0;9]',
              '&2': '$e[0;9]',
              '&3': '$e[1;9]',
              '&4': '$e[0;9]',
              '&5': '$e[0;9]',
              '&6': '$e[1;9]',
              '&7': '#{&1*100+&2*10+&3}',
              '&8': '#{&4*100+&5*10+&6}',
            },

          ],
          conditions: ['&7!=&8'],
          choices: [
            [{ text: '$$%%{&7}$$' }, { text: '$$%%{&8}$$' }],
          ],
          correctionFormat: [{
            correct: ['Entre $$%%{&7}$$ et $$%%{&8}$$ le plus petit est &solution'],
            uncorrect: ['Entre $$%%{&7}$$ et $$%%{&8}$$ le plus petit est &solution'],
            answer: 'Le plus petit est &answer'
          }],
          // corrections: [
          //   'Entre $$%%{&5}$$ et $$%%{&6}$$ le plus petit est ',
          // ],
          solutions: [
            ['&7<&8 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: "Comparer deux nombres entiers",
          subdescription: "Nombres inférieurs à 10000",
          enounces: ["Quel est le plus petit de ces 2 nombres ?"],
          variables: [
            {
              '&1': '$e[0;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[0;9]',
              '&5': '$e[0;9]',
              '&6': '$e[0;9]',
              '&7': '&1*1000+&2*100+&3*10+$e[0;9]',
              '&8': '&4*1000+&5*100+&6*10+$e[0;9]',
            },

          ],
          conditions: ['#{&7}!=#{&8}'],
          choices: [
            [{ text: '$$%%{&7}$$' }, { text: '$$%%{&8}$$' }],
          ],
          correctionFormat: [{
            correct: ['Entre $$%%{&7}$$ et $$%%{&8}$$ le plus petit est &solution'],
            uncorrect: ['Entre $$%%{&7}$$ et $$%%{&8}$$ le plus petit est &solution'],
            answer: 'Le plus petit est &answer'
          }],
          // corrections: [
          //   'Entre $$%%{&5}$$ et $$%%{&6}$$ le plus petit est ',
          // ],
          solutions: [
            ['&7<&8 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 10,
          grade: CE2,
        },
        {
          description: "Comparer deux nombres entiers",
          subdescription: "Jusqu'au million",
          enounces: ["Quel est le plus petit de ces 2 nombres ?"],
          variables: [
            {
              '&1': '$e[0;4]', // nombre de chiffres identiques
              '&2': '$e[4-&1;7-&1]', // nombre de chiffres différents
              '&3': '$e{&1;&1}', //partie identique
              '&4': '$e{&2;&2}', // parties différentes
              '&5': '$e{&2;&2}',
              '&6': '#{&4+&3*10^&2}',
              '&7': '#{&5+&3*10^&2}',
            },
          ],
          conditions: ['&6!=&7'],
          choices: [
            [{ text: '$$%%{&6}$$' }, { text: '$$%%{&7}$$' }],
          ],
          correctionFormat: [{
            correct: ['Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est &solution'],
            uncorrect: ['Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est &solution'],
            answer: 'Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est &answer'
          }],
          solutions: [
            ['&6<&7 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 20,
          grade: CM1,
        },
      ]

    },
    Additionner: {
      Tables: [
        {
          description: "Table d'addition'",
          subdescription: 'de 1',
          enounces: ['Calcule.'],
          expressions: ['&1+1'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          defaultDelay: 15,
          grade: CP,
        },
        {
          description: "Table d'addition'",
          subdescription: 'de 2',
          enounces: ['Calcule.'],
          expressions: ['&1+2'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          defaultDelay: 15,
          grade: CP,
        },
        {
          description: "Table d'addition'",
          subdescription: 'de 3',
          enounces: ['Calcule.'],
          expressions: ['&1+3'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          defaultDelay: 15,
          grade: CP,
        },
        {
          description: "Table d'addition'",
          subdescription: 'de 4',
          enounces: ['Calcule.'],
          expressions: ['&1+4'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          defaultDelay: 15,
          grade: CP,
        },
        {
          description: "Table d'addition'",
          subdescription: 'de 5',
          enounces: ['Calcule.'],
          expressions: ['&1+5'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          defaultDelay: 15,
          grade: CP,
        },
        {
          description: "Table d'addition'",
          subdescription: 'de 6',
          enounces: ['Calcule.'],
          expressions: ['&1+6'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          defaultDelay: 15,
          grade: CP,
        },
        {
          description: "Table d'addition'",
          subdescription: 'de 7',
          enounces: ['Calcule.'],
          expressions: ['&1+7'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          defaultDelay: 15,
          grade: CP,
        },
        {
          description: "Table d'addition'",
          subdescription: 'de 8',
          enounces: ['Calcule.'],
          expressions: ['&1+8'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          defaultDelay: 15,
          grade: CP,
        },
        {
          description: "Table d'addition'",
          subdescription: 'de 9',
          enounces: ['Calcule.'],
          expressions: ['&1+9'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          defaultDelay: 15,
          grade: CP,
        },
      ],
      Somme: [
        {
          description: 'Calculer une somme',
          subdescription:
            'Somme égale à 10',
          enounces: ["Calcule."],
          expressions: ['&1 + #{10-&1}'],
          variables: [
            { '&1': '$e[0;9]' },
          ],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Calculer une somme',
          subdescription:
            'Nombres à 1 chiffre. Nombre plus grand en premier. Somme inférieure ou égale à 10',
          enounces: ["Calculer."],
          expressions: ['&1 + &2'],
          variables: [
            {
              '&1': '$e[3;8]',
              '&2': '$e[2;#{mini(10-&1;&1-1)}]',
              //  '&3':'$e[2;&2]'
            },
          ],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Calculer une somme',
          subdescription:
            'Nombres entiers à 1 chiffre. Somme inférieure à 10.',
          enounces: ["Calcule."],
          expressions: ['&1 + &2', '&1 + &2'],
          variables: [
            { '&1': '$e[5;7]', '&2': '$e[2;9-&1]' },
            { '&1': '$e[2;4]', '&2': '$e[2;9-&1]' },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CP,
        },
        {
          description: 'Calculer une somme',
          subdescription:
            'Nombres à 1 chiffre. Nombre plus grand en premier.',
          enounces: ["Calculer."],
          expressions: ['&1 + &2'],
          variables: [
            {
              '&1': '$e[3;9]',
              '&2': '$e[1;&1-1]',
              //  '&3':'$e[2;&2]'
            },
          ],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Somme sans retenue. Au moins un nombre à 2 chiffres.',
          enounces: ["Calcule."],
          expressions: [
            '#{&1*10 + &2} + #{&3*10 + &4}',
            '#{&1*10 + &2} + #{&3*10 + &4}',
            '#{&1*10 + &2} + #{&3*10 + &4}',
            '#{&1*10 + &2} + #{&3*10 + &4}',
            '#{&1*10 + &2} + &4',
            '#{&1*10 + &2} + &4',
            '#{&1*10 + &2} + &4',
            '#{&1*10 + &2} + &4',
          ],
          variables: [
            {
              '&1': '$e[5;7]',
              '&3': '$e[1;9-&1]',
              '&2': '$e[5;7]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[2;4]',
              '&3': '$e[1;9-&1]',
              '&2': '$e[2;4]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[5;7]',
              '&3': '$e[1;9-&1]',
              '&2': '$e[2;4]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[2;4]',
              '&3': '$e[1;9-&1]',
              '&2': '$e[5;7]]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[5;7]',
              '&2': '$e[5;7]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[2;4]',
              '&2': '$e[2;4]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[5;7]',
              '&2': '$e[2;4]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[2;4]',
              '&2': '$e[5;7]]',
              '&4': '$e[2;9-&2]',
            },
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CP,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Somme d’un nombre à deux chiffres et d’un nombre à un chiffre, avec franchissement de la dizaine',
          enounces: ["Calcule."],
          expressions: [
            '#{&1*10 + &2} + &3',

          ],
          variables: [
            {
              '&1': '$e[2;8]',
              '&2': '$e[2;9]',
              '&3': '$e[11-&2;9]',
            },

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CP,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'sommes d’un nombre à deux chiffres et de dizaines entières',
          enounces: ["Calcule."],
          expressions: [
            '#{&1*10 + &2} + #{&3*10}',

          ],
          variables: [
            {
              '&1': '$e[2;8]',
              '&2': '$e[1;9]',
              '&3': '$e[1;9-&1]',
            },

          ],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Calculer une somme',
          subdescription:
            'Nombres entiers à 1 chiffre',
          enounces: ["Calcule."],
          expressions: ['&1 + &2'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[11-&1;9]' }],
          type: 'result',
          defaultDelay: 20,
          grade: CE1,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Nombres entiers à 2 chiffres (sans retenue entre les unités et les dizaines)',
          enounces: ["Calcule."],
          expressions: ['#{&1*10 + &2} +#{&3*10+&4}'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&3': '$e[1;9]',
              '&2': '$e[1;8]',
              '&4': '$e[1;9-&2]',
            },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Somme d’un nombre ayant au plus trois chiffres et d’un nombre ayant un seul chiffre non nul',
          enounces: ["Calcule."],
          expressions: ['#{&1*100 + &2*10+&3} +#{&5*10^&4}'],
          variables: [
            {
              '&1': '$e[0;9]',
              '&2': '$e[0;9]',
              '&3': '$e[1;9]',
              '&4': '$e[0;2]',
              '&5': '$e[1;9]'
            },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Nombres entiers à 2 chiffres dont la somme vaut 100',
          enounces: ["Calcule."],
          expressions: ['#{&2}+#{100-&2}'],
          variables: [
            {
              '&1': '$e[3;9]',
              '&2': '$e[12;&1*10-12]',
            },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Nombres entiers à 2 chiffres qui se marrient bien',
          enounces: ["Calcule."],
          expressions: ['#{&2} +#{&1*10-&2}'],
          variables: [
            {
              '&1': '$e[3;9]',
              '&2': '$e[12;&1*10-12]',
            },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: 'Calculer une somme',
          subdescription:
            'somme de deux termes dont le résultat est inférieur à 100',
          enounces: ["Calcule."],
          expressions: ['&1 + &2', '&1 + &2'],
          variables: [
            { '&1': '$e[1;98]', '&2': '$e[1;99-&1]' },
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Somme d’un nombre ayant au plus 4 chiffres et d’un nombre ayant un seul chiffre non nul',
          enounces: ["Calcule."],
          expressions: ['#{&1*1000 + &2*100+&3*10+&4} +#{&6*10^&5}'],
          variables: [
            {
              '&1': '$e[0;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[1;9]',
              '&5': '$e[0;3]',
              '&6': '$e[1;9]'
            },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Nombres entiers à 2 chiffres (avec retenue)',
          enounces: ["Calcule."],
          expressions: ['#{&1*10 + &2} +#{&3*10+&4}'],
          variables: [
            {
              '&1': '$e[1;7]',
              '&3': '$e[1;8-&1]',
              '&2': '$e[2;9]',
              '&4': '$e[11-&2;9]',
            },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Nombres entiers à 3 chiffres (sans retenue)',
          enounces: ["Calcule."],
          expressions: ['#{&1*100 + &2*10 + &3} + #{&4*100 + &5*10 + &6}'],
          variables: [
            {
              '&1': '$e[1;8]',
              '&4': '$e[1;9-&1]',
              '&2': '$e[1;8]',
              '&5': '$e[1;9-&2]',
              '&3': '$e[1;8]',
              '&6': '$e[1;9-&3]',
            },
          ],
          type: 'result',
          defaultDelay: 30,
          grade: CM2,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Nombres entiers à 3 chiffres (avec retenue)',
          enounces: ["Calcule."],
          expressions: ['#{&1*100 + &2*10 + &3} +#{&4*100+&5*10+&6}'],
          variables: [
            {
              '&1': '$e[1;7]',
              '&4': '$e[1;8-&1]',
              '&2': '$e[1;7]',
              '&5': '$e[1;8-&2]',
              '&3': '$e[2;9]',
              '&6': '$e[11-&3;9]',
            },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CM2,
        },
      ],
      Complément: [
        {
          description: 'Trouver le complément',
          subdescription: 'Complément à 10',
          enounces: ["Complète."],
          expressions: ['?+&1=10', '&1+?=10'],
          solutions: [['#{10-&1}']],
          variables: [{ '&1': '$e[1;9]' }],
          type: 'trou',
          details: [['10-&1']],
          defaultDelay: 20,
          grade: CP,
        },
        {
          description: 'Trouver le complément',
          subdescription: 'A la dizaine supérieure',
          enounces: ["Complète."],
          expressions: ['?+#{&3-&2}=&3', '#{&3-&2}+?=&3'],
          solutions: [['&2']],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[1;9]', '&3': '#{&1*10}' }],
          type: 'trou',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: 'Trouver le complément',
          subdescription: "Complément à un multiple de 10",
          enounces: ["Complète."],
          expressions: ['?+&2=#{&1*10}', '&2+?=#{&1*10}'],
          solutions: [['#{&1*10-&2}']],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;&1*10-2]' }],
          details: [['#{&1*10}-&2']],
          type: 'trou',
          defaultDelay: 20,
          grade: CE1,
        },
        {
          description: 'Trouver le complément',
          subdescription: 'Complément à 100 des dizaines entières',
          enounces: ["Complète."],
          expressions: ['?+&2=100', '&2+?=100'],
          solutions: [['#{100-&2}']],
          variables: [{ '&1': '$e[1;9]', '&2': '#{10*&1}' }],
          // details: [['#{100-&2}']],
          type: 'trou',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: 'Trouver le complément',
          subdescription: 'A la centaine supérieure',
          enounces: ["Complète."],
          expressions: ['?+#{&4-&3}=&4', '#{&4-&3}+?=&4'],
          solutions: [['&3']],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[1;9]', '&3': '$e[1;99]', '&4': '#{&1*100}' }],
          type: 'trou',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Trouver le complément',
          subdescription: 'Complément à 100',
          enounces: ["Complète."],
          expressions: ['?+&1=100', '&1+?=100'],
          solutions: [['#{100-&1}']],
          variables: [{ '&1': '$e[1;99]' }],
          // details: [['100-&1']],
          type: 'trou',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Trouver le complément',
          subdescription: 'Complément à 1000',
          enounces: ["Complète."],
          expressions: ['?+&1=1000', '&1+?=1000'],
          solutions: [['#{1000-&1}']],
          variables: [{ '&1': '$e[1;999]' }],
          // details: [['1000-&1']],
          type: 'trou',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Trouver le complément',
          subdescription: 'Au millier supérieure',
          enounces: ["Complète."],
          expressions: ['?+#{&4-&3}=&4', '#{&4-&3}+?=&4'],
          solutions: [['&3']],
          variables: [{ '&1': '$e[2;9]', '&3': '$e[1;999]', '&4': '#{&1*1000}' }],
          type: 'trou',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Trouver le complément',
          subdescription: 'Complément à 10 000 - a trou',
          enounces: ["Complète."],
          expressions: ['?+#{10000-(&3)}=10000', '#{10000-(&3)}+?=10000'],
          solutions: [['#{&3}']],
          variables: [{ '&1': '$e[1;9]', '&2': '$e[1;9]', '&3': '&1*1000+&2*100' }],
          type: 'trou',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Trouver le complément',
          subdescription: 'Complément à 10 000 - description',
          enounces: ["Combien faut-il ajouter à $$%{10000-(&3)}$$ pour obtenir $$10\\,000$$ ?"],
          expressions: ['?+#{10000-(&3)}=10000', '#{10000-(&3)}+?=10000'],
          solutions: [['#{&3}']],
          variables: [{ '&1': '$e[1;9]', '&2': '$e[1;9]', '&3': '&1*1000+&2*100' }],
          options:['no-exp'],
          correctionFormat:[{
            correct:["Il faut ajouter &answer à $$%{10000-(&3)}$$ pour obtenir $$10\\,000$$."],
            uncorrect:["Il faut ajouter &solution à $$%{10000-(&3)}$$ pour obtenir $$10\\,000$$."],
            answer:'Il faut ajouter &answer',
          }],
          type: 'rewrite',
          defaultDelay: 20,
          grade: CM1,
        },

      ],
      Décomposition: [

      ],
      'A trou': [

        {
          description: 'Compléter une addition à trou',
          subdescription:
            'Nombres à 1 chiffre. Nombre plus grand en premier. Somme inférieure ou égale à 10',
          enounces: ["Complète."],
          expressions: [
            '&1 + ? = #{&2+&1}',
          ],
          variables: [
            {
              '&1': '$e[3;8]',
              '&2': '$e[2;#{mini(10-&1;&1-1)}]',
              //  '&3':'$e[2;&2]'
            },
          ],
          type: 'trou',
          solutions: [['&2']],
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription:
            'Nombres entiers à 1 chiffre. Somme inférieure à 10.',
          enounces: ["Complète."],
          expressions: [
            '&1+? = #{&1+&2}',
            '&1+?= #{&1+&2}',
            '?+&1= #{&1+&2}',
            '?+&1= #{&1+&2}',
          ],
          variables: [
            { '&1': '$e[5;7]', '&2': '$e[2;9-&1]' },
            { '&1': '$e[2;4]', '&2': '$e[2;9-&1]' },
            { '&1': '$e[5;7]', '&2': '$e[2;9-&1]' },
            { '&1': '$e[2;4]', '&2': '$e[2;9-&1]' },
          ],
          type: 'trou',
          solutions: [['&2']],
          defaultDelay: 15,
          grade: CP,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription:
            'Nombres à 1 chiffre. Nombre plus grand en premier.',
          enounces: ["Complète."],
          expressions: ['&1 + ? = #{&1+&2}'],
          variables: [
            {
              '&1': '$e[3;9]',
              '&2': '$e[1;&1-1]',
              //  '&3':'$e[2;&2]'
            },
          ],
          type: 'trou',
          solutions: [['&2']],
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription: 'Somme sans retenue. Au moins un nombre à 2 chiffres.',
          enounces: ["Complète."],
          expressions: [
            '#{&1*10 + &2} + ? = #{&1*10 + &2 + &3*10 + &4}',
            '#{&1*10 + &2} + ? = #{&1*10 + &2 + &3*10 + &4}',
            '#{&1*10 + &2} + ? = #{&1*10 + &2 + &3*10 + &4}',
            '#{&1*10 + &2} + ? = #{&1*10 + &2 + &3*10 + &4}',
            '#{&1*10 + &2} + ? = #{&1*10 + &2 + &4}',
            '#{&1*10 + &2} + ? = #{&1*10 + &2 + &4}',
            '#{&1*10 + &2} + ? = #{&1*10 + &2 + &4}',
            '#{&1*10 + &2} + ? = #{&1*10 + &2 + &4}',
          ],
          variables: [
            {
              '&1': '$e[5;7]',
              '&3': '$e[1;9-&1]',
              '&2': '$e[5;7]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[2;4]',
              '&3': '$e[1;9-&1]',
              '&2': '$e[2;4]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[5;7]',
              '&3': '$e[1;9-&1]',
              '&2': '$e[2;4]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[2;4]',
              '&3': '$e[1;9-&1]',
              '&2': '$e[5;7]]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[5;7]',
              '&2': '$e[5;7]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[2;4]',
              '&2': '$e[2;4]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[5;7]',
              '&2': '$e[2;4]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[2;4]',
              '&2': '$e[5;7]]',
              '&4': '$e[2;9-&2]',
            },
          ],
          type: 'trou',
          solutions: [
            ['#{&3*10 + &4}'],
            ['#{&3*10 + &4}'],
            ['#{&3*10 + &4}'],
            ['#{&3*10 + &4}'],
            ['&4'],
            ['&4'],
            ['&4'],
            ['&4'],
          ],
          defaultDelay: 20,
          grade: CP,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription: 'Somme d’un nombre à deux chiffres et d’un nombre à un chiffre, avec franchissement de la dizaine',
          enounces: ["Complète."],
          expressions: [
            '#{&1*10 + &2} + ? = #{&1*10 + &2 + &3}',

          ],
          variables: [
            {
              '&1': '$e[2;8]',
              '&2': '$e[2;9]',
              '&3': '$e[11-&2;9]',
            },

          ],
          type: 'trou',
          solutions: [['&3']],
          defaultDelay: 20,
          grade: CP,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription: 'sommes d’un nombre à deux chiffres et de dizaines entières',
          enounces: ["Complète."],
          expressions: [
            '#{&1*10 + &2} + ? = #{&1*10 + &2 + &3*10}',

          ],
          variables: [
            {
              '&1': '$e[2;8]',
              '&2': '$e[1;9]',
              '&3': '$e[1;9-&1]',
            },

          ],
          type: 'trou',
          solutions: [['#{&3*10}']],
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription:
            'Nombres entiers à 1 chiffre.',
          enounces: ["Complète."],
          expressions: [
            '&1+? = #{&1+&2}',
            '?+&1 = #{&1+&2}',
          ],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;9]' },

          ],
          type: 'trou',
          solutions: [['&2']],
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Compléter une addition à trou.',
          subdescription: 'Nombres entiers à 2 chiffres (sans retenue entre les unités et les dizaines)',
          enounces: ["Complète."],
          expressions: ['#{&1*10 + &2} + ? = #{&1*10 + &2 + &3*10+&4}'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&3': '$e[1;9]',
              '&2': '$e[1;8]',
              '&4': '$e[1;9-&2]',
            },
          ],
          type: 'trou',
          solutions: [['#{&3*10+&4}']],
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription: 'Somme d’un nombre ayant au plus trois chiffres et d’un nombre ayant un seul chiffre non nul',
          enounces: ["Complète."],
          expressions: ['#{&1*100 + &2*10+&3} + ? = #{&1*100 + &2*10+&3 + &5*10^&4}'],
          variables: [
            {
              '&1': '$e[0;9]',
              '&2': '$e[0;9]',
              '&3': '$e[1;9]',
              '&4': '$e[0;2]',
              '&5': '$e[1;9]'
            },
          ],
          type: 'trou',
          solutions: [['#{&5*10^&4}']],
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription:
            'somme de deux termes dont le résultat est inférieur à 100',
          enounces: ["Complète."],
          expressions: ['&1 + ? =  #{&2+&1}', '? + &2 = #{&2+&1}'],
          variables: [
            { '&1': '$e[1;98]', '&2': '$e[1;99-&1]' },
          ],
          type: 'trou',
          solutions: [
            ['&2'],
            ['&1']
          ],
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription: 'Somme d’un nombre ayant au plus 4 chiffres et d’un nombre ayant un seul chiffre non nul',
          enounces: ["Complète."],
          expressions: ['#{&1*1000 + &2*100+&3*10+&4} + ? = #{&1*1000 + &2*100+&3*10+&4 + &6*10^&5}'],
          variables: [
            {
              '&1': '$e[0;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[1;9]',
              '&5': '$e[0;3]',
              '&6': '$e[1;9]'
            },
          ],
          type: 'trou',
          solutions: [['#{&6*10^&5}']],
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: 'Compléter une addition',
          subdescription: 'Nombres entiers à 2 chiffres (avec retenue)',
          enounces: ["Complète."],
          expressions: ['#{&1*10 + &2} + ? = #{&1*10 + &2 + &3*10+&4}'],
          variables: [
            {
              '&1': '$e[1;7]',
              '&3': '$e[1;8-&1]',
              '&2': '$e[2;9]',
              '&4': '$e[11-&2;9]',
            },
          ],
          type: 'trou',
          solutions: [['#{&3*10+&4}']],
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription: 'Nombres entiers à 3 chiffres (sans retenue)',
          enounces: ["Complète."],
          expressions: ['#{&1*100 + &2*10 + &3} + ? = #{&1*100 + &2*10 + &3 + &4*100 + &5*10 + &6}'],
          variables: [
            {
              '&1': '$e[1;8]',
              '&4': '$e[1;9-&1]',
              '&2': '$e[1;8]',
              '&5': '$e[1;9-&2]',
              '&3': '$e[1;8]',
              '&6': '$e[1;9-&3]',
            },
          ],
          type: 'trou',
          solutions: [['#{&4*100 + &5*10 + &6}']],
          defaultDelay: 30,
          grade: CM2,
        },

        {
          description: 'Compléter une égalité',
          subdescription: 'Nombres entiers à 2 chiffres (sans retenue)',
          enounces: ["Quel est le terme manquant dans cette égalité ?"],
          expressions: [
            '#{&5}+?=#{&5+&6}',
            '#{&5}+?=#{&5+&6}',
            '?+#{&5}=#{&5+&6}',
            '?+#{&5}=#{&5+&6}',
          ],
          variables: [
            {
              '&1': '$e[5;7]',
              '&3': '$e[2;9-&1]',
              '&2': '$e[5;7]',
              '&4': '$e[2;9-&2]',
              '&5': '&1*10 + &2',
              '&6': '&3*10 + &4',
            },
            {
              '&1': '$e[2;4]',
              '&3': '$e[2;9-&1]',
              '&2': '$e[2;4]',
              '&4': '$e[2;9-&2]',
              '&5': '&1*10 + &2',
              '&6': '&3*10 + &4',
            },
            {
              '&1': '$e[5;7]',
              '&3': '$e[2;9-&1]',
              '&2': '$e[2;4]',
              '&4': '$e[2;9-&2]',
              '&5': '&1*10 + &2',
              '&6': '&3*10 + &4',
            },
            {
              '&1': '$e[2;4]',
              '&3': '$e[2;9-&1]',
              '&2': '$e[5;7]]',
              '&4': '$e[2;9-&2]',
              '&5': '&1*10 + &2',
              '&6': '&3*10 + &4',
            },
          ],
          type: 'trou',
          solutions: [['#{&6}']],
          defaultDelay: 20,
          grade: UNKNOWN,
        },
        {
          description: 'Compléter une égalité',
          subdescription: 'Nombres entiers à 3 chiffres (sans retenue)',
          enounces: ["Quel est le terme manquant dans cette égalité ?"],
          expressions: [
            '#{&7} + ? = #{&7+&8}',
            '? + #{&7} = #{&7+&8}'],
          variables: [
            {
              '&1': '$e[1;8]',
              '&4': '$e[1;9-&1]',
              '&2': '$e[1;8]',
              '&5': '$e[1;9-&2]',
              '&3': '$e[1;8]',
              '&6': '$e[1;9-&3]',
              '&7': '&1*100 + &2*10 + &3',
              '&8': '&4*100 + &5*10 + &6'
            },
            {
              '&1': '$e[1;8]',
              '&4': '$e[1;9-&1]',
              '&2': '$e[1;8]',
              '&5': '$e[1;9-&2]',
              '&3': '$e[1;8]',
              '&6': '$e[1;9-&3]',
              '&7': '&1*100 + &2*10 + &3',
              '&8': '&4*100 + &5*10 + &6'
            }
          ],
          solutions: [['#{&8}']],
          type: 'trou',
          defaultDelay: 20,
          grade: UNKNOWN,
        },
        {
          description: 'Compléter une égalité',
          subdescription: 'Nombres à 1 chiffre',
          enounces: ["Quel est le terme manquant dans cette égalité ?"],
          expressions: ['?+&1 = &2', '&1+? = &2'],
          solutions: [['#{&2-&1}']],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[11;&1+9]' }],
          details: [['&2-&1']],
          type: 'trou',
          defaultDelay: 20,
          grade: UNKNOWN,
        },
        {
          description: 'Compléter une égalité',
          subdescription: 'Nombres à 2 chiffres',
          enounces: ["Quel est le terme manquant dans cette égalité ?"],
          expressions: ['?+&1 = &2', '&1+? = &2'],
          solutions: [['#{&2-&1}']],
          variables: [{ '&1': '$e{2;2}', '&2': '$e[&1+12;&1+99]' }],
          details: [['&2-&1']],
          type: 'trou',
          defaultDelay: 20,
          grade: UNKNOWN,
        },
        {
          description: 'Compléter une  égalité',
          subdescription: 'Nombres à 3 chiffres',
          enounces: ["Quel est le terme manquant dans cette égalité ?"],
          expressions: ['?+&1 = &2', '&1+? = &2'],
          solutions: [['#{&2-&1}', '#{&2-&1}']],
          variables: [{ '&1': '$e[101;897]', '&2': '$e[&1+102;999]' }],
          details: [['&2-&1']],
          type: 'trou',
          defaultDelay: 30,
          grade: UNKNOWN,
        },
      ],
      'Double et moitié': [
        {
          description: "Trouver le double",
          subdescription: 'Nombre inférieur à 10',
          enounces: ['Quel est le double de $$&1$$ ?', 'Quel est le résultat de $$&1+&1$$ ?'],
          expressions: ['2*&1'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[0;9]' }],
          correctionFormat: [{
            correct: ['Le double de $$&1$$ est &solution.'],
            uncorrect: ['Le double de $$&1$$ est &solution.'],
            answer: 'Le double de $$&1$$ est &answer.'
          },
          {
            correct: ['$$&1+&1=$$&solution'],
            uncorrect: ['$$&1+&1=$$&solution'],
            answer: '$$&1+&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: "Trouver le double",
          subdescription: "Dizaines entières (jusqu'à 50)",
          enounces: ['Quel est le double de $$&2$$ ?', 'Quel est le résultat de $$&2+&2$$ ?'],
          expressions: ['2*&2'],
          options: ['no-exp'],
          variables: [{
            '&1': '$e[1;5]*10',
            '&2': '#{&1}'
          }],
          correctionFormat: [{
            correct: ['Le double de $$&2$$ est &solution.'],
            uncorrect: ['Le double de $$&2$$ est &solution.'],
            answer: 'Le double de $$&2$$ est &answer.'
          },
          {
            correct: ['$$&2+&2=$$&solution'],
            uncorrect: ['$$&2+&2=$$&solution'],
            answer: '$$&2+&2=$$&answer'
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: "Trouver la moitié",
          subdescription: 'Nombre pair inférieur à 20',
          enounces: ['Quelle est la moitié de $$#{2*&1}$$ ?'],
          expressions: ['&1'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[0;10]' }],
          correctionFormat: [{
            correct: ['La moitié de $$#{2*&1}$$ est &solution.'],
            uncorrect: ['La moitié de $$#{2*&1}$$ est &solution.'],
            answer: 'La moitié de $$#{2*&1}$$ est &answer.'
          }],
          correctionDetails: [
            [
              { text: 'Le moitié de $$#{2*&1}$$ est &solution car $$&1+&1=#{2*&1}$$' }
            ],
          ],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: "Trouver le double",
          subdescription: "Nombres de 1 à 15, 25, 30, 40, 50 et 100",
          enounces: ['Quel est le double de $$&1$$ ?', 'Quel est le résultat de $$&1+&1$$ ?'],
          expressions: ['2*&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;9];$e[11;15];25;30;40;50;100}',
          }],
          correctionFormat: [{
            correct: ['Le double de $$&1$$ est &solution.'],
            uncorrect: ['Le double de $$&1$$ est &solution.'],
            answer: 'Le double de $$&1$$ est &answer.'
          },
          {
            correct: ['$$&1+&1=$$&solution'],
            uncorrect: ['$$&1+&1=$$&solution'],
            answer: '$$&1+&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: "Trouver la moitié",
          subdescription: "Nombres pairs de 1 à 30, 40, 50 et 100",
          enounces: ['Quel est la moitié de $$&2$$ ?'],
          expressions: ['&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;9];$e[11;15];20;25;50}', '&2': '#{2*&1}',
          }],
          correctionFormat: [{
            correct: ['La moitié de $$&2$$ est &solution.'],
            uncorrect: ['La moitié de $$&2$$ est &solution.'],
            answer: 'La moitié de $$&2$$ est &answer.'
          },
          ],
          correctionDetails: [
            [
              { text: 'Le moitié de $$#{2*&1}$$ est &solution car $$&1 + &1=#{2*&1}$$' }
            ],
          ],
          type: 'rewrite',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: "Trouver le double",
          subdescription: "Nombres de 1 à 20, 25, 30, 40, 50, 60 et 100",
          enounces: ['Quel est le double de $$&1$$ ?', 'Quel est le résultat de $$&1+&1$$ ?'],
          expressions: ['2*&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;10];$e[11;15];$e[15;20];25;30;40;50;60;100}',
          }],
          correctionFormat: [{
            correct: ['Le double de $$&1$$ est &solution.'],
            uncorrect: ['Le double de $$&1$$ est &solution.'],
            answer: 'Le double de $$&1$$ est &answer.'
          },
          {
            correct: ['$$&1+&1=$$&solution'],
            uncorrect: ['$$&1+&1=$$&solution'],
            answer: '$$&1+&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: "Trouver la moitié",
          subdescription: "Nombres pairs de 1 à 40, 50, 60 et 100",
          enounces: ['Quel est la moitié de $$&2$$ ?'],
          expressions: ['&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;9];$e[11;15];$e[16;20];25;30;50}', '&2': '#{2*&1}',
          }],
          correctionFormat: [{
            correct: ['La moitié de $$&2$$ est &solution.'],
            uncorrect: ['La moitié de $$&2$$ est &solution.'],
            answer: 'La moitié de $$&2$$ est &answer.'
          },
          ],
          correctionDetails: [
            [
              { text: 'Le moitié de $$#{2*&1}$$ est &solution car $$&1+&1=#{2*&1}$$' }
            ],
          ],
          type: 'rewrite',
          defaultDelay: 15,
          grade: CE2,
        },

      ],
      'Triple et tiers': [
        {
          description: "Trouver le triple",
          subdescription: 'Nombre inférieur à 10',
          enounces: ['Quel est le triple de $$&1$$ ?', 'Quel est le résultat de $$&1+&1+&1$$ ?'],
          expressions: ['3*&1'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[0;9]' }],
          correctionFormat: [{
            correct: ['Le triple de $$&1$$ est &solution.'],
            uncorrect: ['Le triple de $$&1$$ est &solution.'],
            answer: 'Le triple de $$&1$$ est &answer.'
          },
          {
            correct: ['$$&1+&1+&1=$$&solution'],
            uncorrect: ['$$&1+&1+&1=$$&solution'],
            answer: '$$&1+&1+&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: "Trouver le triple",
          subdescription: "Dizaines entières (jusqu'à 50)",
          enounces: ['Quel est le triple de $$&2$$ ?', 'Quel est le résultat de $$&2+&2+&2$$ ?'],
          expressions: ['3*&2'],
          options: ['no-exp'],
          variables: [{
            '&1': '$e[1;5]*10',
            '&2': '#{&1}'
          }],
          correctionFormat: [{
            correct: ['Le triple de $$&2$$ est &solution.'],
            uncorrect: ['Le triple de $$&2$$ est &solution.'],
            answer: 'Le triple de $$&2$$ est &answer.'
          },
          {
            correct: ['$$&2+&2+&2=$$&solution'],
            uncorrect: ['$$&2+&2+&2=$$&solution'],
            answer: '$$&2+&2+&2=$$&answer'
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: "Trouver le tiers",
          subdescription: 'Multiples de 3 inférieurs à 30',
          enounces: ['Quelle est le tiers de $$#{3*&1}$$ ?'],
          expressions: ['&1'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[0;10]' }],
          correctionFormat: [{
            correct: ['Le tiers de $$#{3*&1}$$ est &solution.'],
            uncorrect: ['Le tiers de $$#{3*&1}$$ est &solution.'],
            answer: 'Le tiers de $$#{3*&1}$$ est &answer.'
          }],
          correctionDetails: [
            [
              { text: 'Le tiers de $$#{3*&1}$$ est &solution car $$&1 + &1 + &1=#{3*&1}$$' }
            ],
          ],
          type: 'result',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: "Trouver le triple",
          subdescription: "Nombres de 1 à 15, 25, 30, 40, 50 et 100",
          enounces: ['Quel est le triple de $$&1$$ ?', 'Quel est le résultat de $$&1+&1+&1$$ ?'],
          expressions: ['3*&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;9];$e[11;15];25;30;40;50;100}',
          }],
          correctionFormat: [{
            correct: ['Le triple de $$&1$$ est &solution.'],
            uncorrect: ['Le triple de $$&1$$ est &solution.'],
            answer: 'Le triple de $$&1$$ est &answer.'
          },
          {
            correct: ['$$&1+&1+&1=$$&solution'],
            uncorrect: ['$$&1+&1+&1=$$&solution'],
            answer: '$$&1+&1+&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: "Trouver le triple",
          subdescription: "Nombres de 1 à 20, 25, 30, 40, 50, 60 et 100",
          enounces: ['Quel est le triple de $$&1$$ ?', 'Quel est le résultat de $$&1+&1+&1$$ ?'],
          expressions: ['3*&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;10];$e[11;15];$e[15;20];25;30;40;50;60;100}',
          }],
          correctionFormat: [{
            correct: ['Le triple de $$&1$$ est &solution.'],
            uncorrect: ['Le triple de $$&1$$ est &solution.'],
            answer: 'Le triple de $$&1$$ est &answer.'
          },
          {
            correct: ['$$&1+&1+&1=$$&solution'],
            uncorrect: ['$$&1+&1+&1=$$&solution'],
            answer: '$$&1+&1+&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },


      ],
      'Somme astucieuse': [
        {
          description: 'Ajouter 9',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&3+9',
            '9+&3',
          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align} &3+\\bold{\\textcolor{teal}{9}} &= &3+\\bold{\\textcolor{teal}{10-1}} \\\\ &= #{&3+10}-1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3+9}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{9}} + &3 &= \\bold{\\textcolor{teal}{10-1}} + &3\\\\ &= &3 + 10-1 \\\\ &= #{&3+10}-1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3+9}}}\\end{align}$$' },
            ],
          ],
          variables: [{
            '&1': '$e[1;7]',
            '&2': '$e[2;9]',
            '&3': '#{&1*10+&2}',
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Additionner par regroupements',
          subdescription: 'Regrouper pour obtenir 10. 3 nombres à un chiffre.',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&2+&1+#{10-&1}',
            '&1+&2+#{10-&1}',
          ],

          correctionDetails: [
            [
              { text: '$$\\begin{align} &2+\\bold{\\textcolor{teal}{&1}}+\\bold{\\textcolor{teal}{#{10-&1}}} &= &2+\\bold{\\textcolor{teal}{10}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&2+10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}}+ &2 + \\bold{\\textcolor{teal}{#{10-&1}}} &= &2+\\bold{\\textcolor{teal}{10}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&2+10}}}\\end{align}$$' },
            ],

          ],
          variables: [{ '&1': '$e{1}', '&2': '$e[7;9]\\{&1}' }],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Ajouter 19, 29, 39, ....',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&4+&5',
            '&5+&4',
          ],

          variables: [{
            '&1': '$e[1;7]',
            '&2': '$e[1;8-&1]',
            '&3': '$e[1;8]',
            '&4': '#{&2*10+&3}',
            '&5': '#{&1*10+9}'
          }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} &4+\\bold{\\textcolor{teal}{&5}} &= &4+\\bold{\\textcolor{teal}{#{&5+1}-1}} \\\\ &= #{&4+&5+1}-1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&4+&5}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&5}} + &4 &= \\bold{\\textcolor{teal}{#{&5+1}-1}} + &4\\\\ &= &4 + #{&5+1}-1 \\\\ &= #{&4+&5+1}-1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&4+5}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Additionner par regroupements',
          subdescription: 'Regrouper pour obtenir 10. 2 nombres à un chiffre et un à 2 chiffres.',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&2+&1+#{10-&1}',
            '&1+&2+#{10-&1}',
          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align} &2+\\bold{\\textcolor{teal}{&1}}+\\bold{\\textcolor{teal}{#{10-&1}}} &= &2+\\bold{\\textcolor{teal}{10}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&2+10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}}+ &2 + \\bold{\\textcolor{teal}{#{10-&1}}} &= &2+\\bold{\\textcolor{teal}{10}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&2+10}}}\\end{align}$$' },
            ],

          ],
          variables: [{ '&1': '$e{1}', '&2': '$e[19;99]' }],
          type: 'result',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: 'Additionner par regroupements',
          subdescription: '5 Nombres à 1 chiffre',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&1+#{10-&1}+&2+#{10-&2}+&3',
            '&1+#{10-&1}+&2+&3+#{10-&2}',
            '&1+#{10-&1}+&3+&2+#{10-&2}',
            '&1+&3+#{10-&1}+&2+#{10-&2}',
            '&3+&1+#{10-&1}+&2+#{10-&2}',
          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}}+\\bold{\\textcolor{teal}{#{10-&1}}}+\\bold{\\textcolor{yellow}{&2}}+\\bold{\\textcolor{yellow}{#{10-&2}}}+&3 &= \\bold{\\textcolor{teal}{10}}+\\bold{\\textcolor{yellow}{10}}+&3 \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3+20}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}}+\\bold{\\textcolor{teal}{#{10-&1}}}+\\bold{\\textcolor{yellow}{&2}}+ &3 + \\bold{\\textcolor{yellow}{#{10-&2}}} &= \\bold{\\textcolor{teal}{10}}+\\bold{\\textcolor{yellow}{10}}+&3 \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3+20}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}}+\\bold{\\textcolor{teal}{#{10-&1}}}+ &3 + \\bold{\\textcolor{yellow}{&2}}+\\bold{\\textcolor{yellow}{#{10-&2}}} &= \\bold{\\textcolor{teal}{10}}+\\bold{\\textcolor{yellow}{10}}+&3 \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3+20}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}}+ &3 + \\bold{\\textcolor{teal}{#{10-&1}}}+\\bold{\\textcolor{yellow}{&2}}+\\bold{\\textcolor{yellow}{#{10-&2}}} &= \\bold{\\textcolor{teal}{10}}+\\bold{\\textcolor{yellow}{10}}+&3 \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3+20}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &3 + \\bold{\\textcolor{teal}{&1}}+\\bold{\\textcolor{teal}{#{10-&1}}}+\\bold{\\textcolor{yellow}{&2}}+\\bold{\\textcolor{yellow}{#{10-&2}}} &= \\bold{\\textcolor{teal}{10}}+\\bold{\\textcolor{yellow}{10}}+&3 \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3+20}}}\\end{align}$$' },
            ],
          ],

          variables: [{ '&1': '$e{1}', '&2': '$e{1}\\{&1;#{10-&1}}', '&3': '$e{1}\\{&1;#{10-&1};&2;#{10-&2}}' }],
          type: 'result',
          defaultDelay: 20,
          grade: CE1,
        },
        {
          description: 'Additionner par regroupements',
          subdescription: '3 Nombres à 2 chiffres. Regrouper pour obtenir 100',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&2+&1+#{100-&1}',
            '&1+&2+#{100-&1}',
          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align} &2+\\bold{\\textcolor{teal}{&1}}+\\bold{\\textcolor{teal}{#{100-&1}}} &= &2+\\bold{\\textcolor{teal}{100}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&2+100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}}+ &2 + \\bold{\\textcolor{teal}{#{100-&1}}} &= &2+\\bold{\\textcolor{teal}{100}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&2+100}}}\\end{align}$$' },
            ],

          ],
          variables: [{ '&1': '$e{2;2}', '&2': '$e[19;99]' }],
          type: 'result',
          defaultDelay: 20,
          grade: CE1,
        },

        {
          description: 'Additionner par regroupements',
          subdescription: '3 Nombres à 2 chiffres.',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&6+#{&1*10-&6}+&7',
            '&6+&7+#{&1*10-&6}',
            '&7+&6+#{&1*10-&6}',
          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&6}}+\\bold{\\textcolor{teal}{#{&1*10-&6}}} + &7 &= \\bold{\\textcolor{teal}{#{&1*10}}} + &7\\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&7+&1*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&6}}+ &7 + \\bold{\\textcolor{teal}{#{&1*10-&6}}} &= &7+\\bold{\\textcolor{teal}{#{&1*10}}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&7+&1*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &7+\\bold{\\textcolor{teal}{&6}}+\\bold{\\textcolor{teal}{#{&1*10-&6}}} &= &7+\\bold{\\textcolor{teal}{#{&1*10}}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&7+&1*10}}}\\end{align}$$' },
            ],

          ],
          variables: [
            {
              '&1': '$e[3;9]',
              '&2': '$e[1;&1-2]',
              '&3': '$e{1}',
              '&4': '$e{1}',
              '&5': '$e{1}\\{&3}',
              '&6': '#{&2*10+&3}',
              '&7': '#{&4*10+&5}',
            },
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CE1,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Somme d’un nombre ayant au plus quatre chiffres et de 9 ou 19',
          enounces: ["Calcule."],
          expressions: ['&5+9', '&5+19'],
          variables: [
            {
              '&1': '$e[0;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[1;9]',
              '&5': '#{&1*1000+&2*100+&3*10+&4}',
            },
          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align} &5+\\bold{\\textcolor{teal}{9}} &= &5+\\bold{\\textcolor{teal}{10-1}} \\\\ &= #{&5+10}-1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&5+9}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &5+\\bold{\\textcolor{teal}{19}} &= &5+\\bold{\\textcolor{teal}{20-1}} \\\\ &= #{&5+20}-1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&5+19}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: 'Additionner par regroupements',
          subdescription: 'Nombres à 3 chiffres. Regrouper pour faire 1000',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&2+&1+#{1000-&1}',
            '&1+&2+#{1000-&1}',
          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align} &2+\\bold{\\textcolor{teal}{&1}}+\\bold{\\textcolor{teal}{#{1000-&1}}} &= &2+\\bold{\\textcolor{teal}{1000}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&2+1000}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}}+ &2 + \\bold{\\textcolor{teal}{#{1000-&1}}} &= &2+\\bold{\\textcolor{teal}{1000}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&2+1000}}}\\end{align}$$' },
            ],

          ],
          variables: [{ '&1': '$e{3;3}', '&2': '$e{3;3}' }],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },
      ],
    },
    Soustraire: {
      Différence: [
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: 'Nombres à 1 chiffre',
          enounces: ['Calcule.'],
          expressions: ['&1-&2'],
          variables: [{ '&1': '$e[5;9]', '&2': '$e[1;&1-1]' }],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: 'Soustraire un nombre à un chiffre à un nombre à deux chiffres, sans franchissement de la dizaine',
          enounces: ['Calcule.'],
          expressions: ['#{&1*10+&3}-&2'],
          variables: [{
            '&1': '$e[1;9]',
            '&2': '$e[1;8]',
            '&3': '$e[&2+1;9]',
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: 'Soustraire des dizaines entières à un nombre.',
          enounces: ['Calcule.'],
          expressions: ['#{&2*10+&3}-#{&1*10}'],
          variables: [{
            '&1': '$e[1;8]',
            '&2': '$e[&1+1;9]',
            '&3': '$e[0;9]',
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: 'Une dizaine et un nombre à un chiffre (avec franchissement de la dizaine)',
          enounces: ['Calcule.'],
          expressions: ['#{&1+&2} - &1'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[11-&1;9]',
            },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: 'Soustraire un nombre à un chiffre à un nombre à deux chiffres, avec franchissement de la dizaine',
          enounces: ['Calcule.'],
          expressions: ['#{&1*10+&2}-&3'],
          variables: [{
            '&1': '$e[1;9]',
            '&2': '$e[1;8]',
            '&3': '$e[&2+1;9]',
          }],
          type: 'result',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: ' Soustraire un nombre à deux chiffres à un nombre à 3 chiffres, sans retenue',
          enounces: ['Calcule.'],
          expressions: ['#{ &1*100 + &2*10 + &3 } - #{ &4*10 + &5 }'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
              '&4': '$e[1;&2-1]',
              '&5': '$e[0;&3-1]',
            },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE1,
        },

        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: '  Soustraire des centaines entières à un nombre',
          enounces: ['Calcule.'],
          expressions: ['#{ &1*100 + &2*10 + &3 } - #{&4*100}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
              '&4': '$e[1;&1-1]',
            },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: "Soustraire un nombre d'au plus 3 chiffres à un nombre à 4 chiffres, sans retenue",
          enounces: ['Calcule.'],
          expressions: ['#{ &1*1000 + &2*100 + &3*10+&4}-#{ &5*100 + &6*10+&7 }'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
              '&4': '$e[2;9]',
              '&5': '$e[0;&2-1]',
              '&6': '$e[0;&3-1]',
              '&7': '$e[1;&4-1]',
            },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: 'Soustraire des dizaines entières, des centaines entières ou des milliers entiers à un nombre',
          enounces: ['Calcule.'],
          expressions: [
            '#{ &1*100 + &2*10 + &3 } - #{&5*100}',
            '#{ &1*100 + &2*10 + &3 } - #{&5*10}',
            '#{ &1*1000 + &2*100 + &3*10 + &4 } - #{&5*1000}',
            '#{ &1*1000 + &2*100 + &3*10 + &4 } - #{&5*100}',
            '#{ &1*1000 + &2*100 + &3*10 + &4 } - #{&5*10}',

          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&5': '$e[1;&1-1]',
            },
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&5': '$e[1;9]',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[0;9]',
              '&5': '$e[1;&1-1]',
            },
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[0;9]',
              '&5': '$e[1;9]',
            },
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[0;9]',
              '&5': '$e[1;9]',
            },
          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },



        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: 'Nombres à 2 chiffres (avec retenue)',
          enounces: ['Calcule.'],
          expressions: ['#{ &1*10 + &4 } - #{ &3*10 + &2 }'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[1;&1-1]',
              '&4': '$e[1;&2-1]',
            },
          ],
          solutions: [['#{ &1*10 + &4 -( &3*10 + &2 )}']],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: 'Nombres à 3 chiffres (avec retenue)',
          enounces: ['Calcule.'],
          expressions: ['#{ &1*100 + &5*10 + &6 } - #{ &4*100 + &2*10 + &3 }'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
              '&4': '$e[1;&1-1]',
              '&5': '$e[1;&2-1]',
              '&6': '$e[1;&3-1]',
            },
          ],
          solutions: [['#{ &1*100 + &5*10 + &6 -( &4*100 + &2*10 + &3 )}']],
          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },
      ],
      'A trou': [
        {
          description: 'Compléter une soustraction à trou (résultat positif)',
          subdescription: 'Nombres à 1 chiffre',
          enounces: ['Complète'],
          expressions: ['?-&1=&2', '&1-?=&2'],
          variables: [
            { '&1': '$e[2;8]', '&2': '$e[1;9-&1]' },
            { '&1': '$e[2;9]', '&2': '$e[1;&1-1]' },
          ],
          solutions: [['#{&1+&2}'], ['#{&1-&2}']],
          details: [['&1+&2'], ['&1-&2']],
          type: 'trou',
          defaultDelay: 20,
          grade: CP,
        },
        {
          description: 'Compléter une soustraction à trou',
          subdescription: 'Soustraire un nombre à un chiffre à un nombre à deux chiffres, sans franchissement de la dizaine',
          enounces: ['Complète.'],
          expressions: ['#{&1*10+&3} - ? = #{&1*10+&3-&2}'],
          variables: [{
            '&1': '$e[1;9]',
            '&2': '$e[1;8]',
            '&3': '$e[&2+1;9]',
          }],
          type: 'trou',
          solutions: [['&2']],
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Compléter une soustraction à trou',
          subdescription: 'Soustraire des dizaines entières à un nombre.',
          enounces: ['Complète.'],
          expressions: ['#{&2*10+&3} - ? = #{&2*10+&3 - &1*10}'],
          variables: [{
            '&1': '$e[1;8]',
            '&2': '$e[&1+1;9]',
            '&3': '$e[0;9]',
          }],
          type: 'trou',
          solutions: [['#{&1*10}']],
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: 'Compléter une soustraction à trou',
          subdescription: 'Une dizaine et un nombre à un chiffre (avec franchissement de la dizaine)',
          enounces: ['Complète.'],
          expressions: ['#{&1+&2} - ? = &2'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[11-&1;9]',
            },
          ],
          type: 'trou',
          solutions: [['&1']],
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Compléter une soustraction à trou',
          subdescription: 'Soustraire un nombre à un chiffre à un nombre à deux chiffres, avec franchissement de la dizaine',
          enounces: ['Complète.'],
          expressions: ['#{&1*10+&2} - ? = #{&1*10+&2-&3}'],
          variables: [{
            '&1': '$e[1;9]',
            '&2': '$e[1;8]',
            '&3': '$e[&2+1;9]',
          }],
          type: 'trou',
          solutions: [['&3']],
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Compléter une soustraction à trou',
          subdescription: ' Soustraire un nombre à deux chiffres à un nombre à 3 chiffres, sans retenue',
          enounces: ['Complète.'],
          expressions: ['#{ &1*100 + &2*10 + &3 } - ? =  #{ &1*100 + &2*10 + &3 - (&4*10 + &5) }'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
              '&4': '$e[1;&2-1]',
              '&5': '$e[0;&3-1]',
            },
          ],
          type: 'trou',
          solutions: [['#{ &4*10 + &5 }']],
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Compléter une soustraction à trou',
          subdescription: '  Soustraire des centaines entières à un nombre',
          enounces: ['COmplète.'],
          expressions: ['#{ &1*100 + &2*10 + &3 } - ? =  #{&1*100 + &2*10 + &3 - &4*100}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
              '&4': '$e[1;&1-1]',
            },
          ],
          type: 'trou',
          solutions: [['#{&4*100}']],
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Compléter une soustraction à trou',
          subdescription: "Soustraire un nombre d'au plus 3 chiffres à un nombre à 4 chiffres, sans retenue",
          enounces: ['Complète.'],
          expressions: ['#{ &1*1000 + &2*100 + &3*10+&4}- ? = #{&1*1000 + &2*100 + &3*10+&4-(&5*100 + &6*10+&7) }'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
              '&4': '$e[2;9]',
              '&5': '$e[0;&2-1]',
              '&6': '$e[0;&3-1]',
              '&7': '$e[1;&4-1]',
            },
          ],
          type: 'trou',
          solutions: [['#{ &5*100 + &6*10+&7 }']],
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Compléter une soustraction à trou',
          subdescription: 'Soustraire des dizaines entières, des centaines entières ou des milliers entiers à un nombre',
          enounces: ['Complète.'],
          expressions: [
            '#{ &1*100 + &2*10 + &3 } - ? = #{&1*100 + &2*10 + &3 - &5*100}',
            '#{ &1*100 + &2*10 + &3 } - ? = #{&1*100 + &2*10 + &3 - &5*10}',
            '#{ &1*1000 + &2*100 + &3*10 + &4 } - ? = #{&1*1000 + &2*100 + &3*10 + &4 - &5*1000}',
            '#{ &1*1000 + &2*100 + &3*10 + &4 } - ? = #{&1*1000 + &2*100 + &3*10 + &4 - &5*100}',
            '#{ &1*1000 + &2*100 + &3*10 + &4 } - ? = #{&1*1000 + &2*100 + &3*10 + &4 - &5*10}',

          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&5': '$e[1;&1-1]',
            },
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&5': '$e[1;9]',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[0;9]',
              '&5': '$e[1;&1-1]',
            },
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[0;9]',
              '&5': '$e[1;9]',
            },
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[0;9]',
              '&5': '$e[1;9]',
            },
          ],
          type: 'trou',
          solutions: [
            ['#{&5*100}'],
            ['#{&5*10}'],
            ['#{&5*1000}'],
            ['#{&5*100}'],
            ['#{&5*10}'],
          ],
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: 'Compléter une soustraction à trou (résultat positif)',
          subdescription: 'Nombres à 2 chiffres sans retenue.',
          enounces: ['Quel est le nombre manquant dans cette égalité ?'],
          expressions: [
            '#{ &1*10 + &2 } - ? =  #{ &3*10 + &4 }',
            '? - #{ &1*10 + &2 } =  #{ &3*10 + &4 }',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[1;&1-1]',
              '&4': '$e[1;&2-1]',
            },
            {
              '&1': '$e[2;8]',
              '&2': '$e[2;8]',
              '&3': '$e[1;9-&1]',
              '&4': '$e[1;9-&2]',
            },
          ],
          solutions: [
            ['#{ &1*10 + &2 -  ( &3*10 + &4) }'],
            ['#{ &1*10 + &2 + &3*10 + &4 }'],
          ],
          details: [
            ['#{ &1*10 + &2} -  #{ &3*10 + &4}'],
            ['#{ &1*10 + &2} +#{&3*10 + &4 }'],
          ],
          type: 'trou',
          defaultDelay: 15,
          grade: UNKNOWN,
        },
        {
          description: 'Compléter une soustraction à trou (résultat positif)',
          subdescription: 'Nombres à 3 chiffres (sans retenue)',
          enounces: ['Quel est le nombre manquant dans cette égalité ?'],
          expressions: [
            '#{ &1*100 + &2*10 + &3 } - ? = #{ &4*100 + &5*10 + &6 }',
            '? - #{ &1*100 + &2*10 + &3 } = #{ &4*100 + &5*10 + &6 }',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
              '&4': '$e[1;&1-1]',
              '&5': '$e[1;&2-1]',
              '&6': '$e[1;&3-1]',
            },
            {
              '&1': '$e[2;8]',
              '&2': '$e[2;8]',
              '&3': '$e[2;8]',
              '&4': '$e[1;9-&1]',
              '&5': '$e[1;9-&2]',
              '&6': '$e[1;9-&3]',
            },
          ],
          solutions: [
            [
              '#{ &1*100 + &2*10 + &3 - (&4*100 + &5*10 + &6) }'],
            ['#{ &1*100 + &2*10 + &3 + &4*100 + &5*10 + &6 }'],
          ],
          details: [
            ['#{ &1*100 + &2*10 + &3} - #{&4*100 + &5*10 + &6 }'],
            ['#{ &1*100 + &2*10 + &3} + #{&4*100 + &5*10 + &6 }'],
          ],
          type: 'trou',
          defaultDelay: 20,
          grade: UNKNOWN,
        },
        {
          description: 'Compléter une soustraction à trou (résultat positif)',
          subdescription: '2 nombres à 1 chiffres (avec retenue)',
          enounces: ['Quel est le nombre manquant dans cette égalité ?'],
          expressions: [
            '#{&1+&2} - ?= &2',
            '?-&1= &2',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[11-&1;9]',
            },
          ],
          solutions: [
            ['&1'],
            ['#{&1+&2}'],
          ],
          details: [
            ['#{&2+&1}-&2'],
            ['&2+&1'],
          ],
          type: 'trou',
          defaultDelay: 15,
          grade: UNKNOWN,
        },
        {
          description: 'Compléter une soustraction à trou (résultat positif)',
          subdescription: 'Nombres à 2 chiffres (avec retenue)',
          enounces: ['Quel est le nombre manquant dans cette égalité ?'],
          expressions: [
            '#{ &1*10 + &4 } - ? =  #{ &3*10 + &2 }',
            '? - #{ &1*10 + &2 } =  #{ &3*10 + &4 }',
          ],
          variables: [
            {
              '&1': '$e[3;9]',
              '&2': '$e[2;9]',
              '&3': '$e[1;&1-2]',
              '&4': '$e[1;&2-1]',
            },
            {
              '&1': '$e[1;7]',
              '&2': '$e[1;9]',
              '&3': '$e[1;8-&1]',
              '&4': '$e[9-&2+1;9]',
            },
          ],
          solutions: [
            ['#{ &1*10 + &4 - (&3*10 + &2 )}'], ['#{ &1*10 + &2 + &3*10 + &4 }'],
          ],
          details: [
            ['#{ &1*10 + &4} - #{(&3*10 + &2 )}'],
            ['#{ &1*10 + &2} + #{&3*10 + &4 }'],
          ],
          type: 'trou',
          defaultDelay: 15,
          grade: UNKNOWN,
        },
        {
          description: 'Compléter une soustraction à trou (résultat positif)',
          subdescription: 'Nombres à 3 chiffres (avec retenue)',
          enounces: ['Quel est le nombre manquant dans cette égalité ?'],
          expressions: [
            '#{ &1*100 + &5*10 + &6 } - ? =  #{ &4*100 + &2*10 + &3 }',
            '? - #{ &1*100 + &2*10 + &3 } =  #{ &4*100 + &5*10 + &6}',
          ],
          variables: [
            {
              '&1': '$e[3;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
              '&4': '$e[1;&1-2]',
              '&5': '$e[1;&2-1]',
              '&6': '$e[1;&3-1]',
            },
            {
              '&1': '$e[1;7]',
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
              '&4': '$e[1;8-&1]',
              '&5': '$e[9-&2+1;9]',
              '&6': '$e[9-&3+1;9]',
            },
          ],
          solutions: [
            [
              '#{ &1*100 + &5*10 + &6 - (&4*100 + &2*10 + &3) }'],
            ['#{&1*100 + &2*10 + &3 + &4*100 + &5*10 + &6}',
            ],
          ],
          details: [
            ['#{ &1*100 + &5*10 + &6} - #{&4*100 + &2*10 + &3 }'],
            ['#{&1*100 + &2*10 + &3} + #{&4*100 + &5*10 + &6}'],
          ],
          type: 'trou',
          defaultDelay: 20,
          grade: UNKNOWN,
        },
      ],
      'Différence astucieuse': [
        {
          description: 'Soustraire 9.',
          expressions: [
            '&3-9',
          ],
          enounces: ['Calcule de manière astucieuse.'],

          correctionDetails: [
            [
              { text: '$$\\begin{align} &3-\\bold{\\textcolor{teal}{9}} &= &3\\bold{\\textcolor{teal}{-10+1}} \\\\ &= #{&3-10}+1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3-9}}}\\end{align}$$' },
            ],
          ],
          variables: [{
            '&1': '$e[1;8]',
            '&2': '$e[1;9]',
            '&3': '#{&2*10+&1}',
          }],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Soustraire 19, 29, ....',
          expressions: [
            '&4-&5',
          ],
          enounces: ['Calcule de manière astucieuse.'],

          variables: [{
            '&1': '$e[0;8]',
            '&2': '$e[&1+1;9]',
            '&3': '$e[1;8]',
            '&4': '#{&2*10+&3}',
            '&5': '#{&1*10+9}'
          }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} &4-\\bold{\\textcolor{teal}{&5}} &= &4\\bold{\\textcolor{teal}{-#{&5+1}+1}} \\\\ &= #{&4-&5-1}+1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&4-&5}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },
      ]
    },
    Multiplier: {
      Tables: [
        {
          description: "Table de multiplication",
          subdescription: 'Par 1',
          enounces: ['Calcule.'],
          expressions: ['1*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
          grade: CE1,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 2',
          enounces: ['Calcule.'],
          expressions: ['2*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
          grade: CE1,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 3',
          enounces: ['Calcule.'],
          expressions: ['3*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
          grade: CE1,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 4',
          enounces: ['Calcule.'],
          expressions: ['4*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
          grade: CE1,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 5',
          enounces: ['Calcule.'],
          expressions: ['5*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
          grade: CE1,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 6',
          enounces: ['Calcule.'],
          expressions: ['6*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
          grade: CE2,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 7',
          enounces: ['Calcule.'],
          expressions: ['7*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
          grade: CE2,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 8',
          enounces: ['Calcule.'],
          expressions: ['8*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
          grade: CE2,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 9',
          enounces: ['Calcule.'],
          expressions: ['9*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
          grade: CE2,
        },
      ],
      Produit: [
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Nombres à 1 chiffre',
          enounces: ['Calcule.'],
          expressions: ['&1*&2'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: "Multiplier par 20",
          subdescription: 'Nombre à 1 chiffre',
          enounces: ['Calcule.'],
          expressions: ['&1*20', '20*&1'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: "Multiplier par 20",
          subdescription: 'Nombre à 2 chiffres',
          enounces: ['Calcule.'],
          expressions: ['&1*20', '20*&1'],
          variables: [{ '&1': '$l{$e[11;15];$e[15;20];25;30;40;50}' }],
          type: 'result',
          correctionDetails: [
            [
              { text: '$$\\begin{align} &1 \\times \\bold{\\textcolor{teal}{20}} &= &1 \\times \\bold{\\textcolor{teal}{2 \\times 10}}  \\\\ &= #{&1*2} \\times 10 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*20}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{20}} \\times &1 &=  \\bold{\\textcolor{teal}{10 \\times 2}} \\times &1 \\\\ &= 10 \\times #{&1*2}  \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*20}}}\\end{align}$$' },
            ],
          ],
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: "Multiplier par 30, 40, 50, 60, 70, 80, 90",
          subdescription: 'Nombre à 1 chiffres',
          enounces: ['Calcule.'],
          expressions: ['#{&1*10}*&2', '&2*#{&1*10}'],
          variables: [{ '&1': '$e[3;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: "Multiplier deux multiples de 10",
          enounces: ['Calcule.'],
          expressions: ['&3*&4'],
          variables: [{
            '&1': '$e[2;9]',
            '&2': '$e[2;9]',
            '&3': '#{&1*10}',
            '&4': '#{&2*10}',
          }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&3}} \\times \\bold{\\textcolor{yellow}{&4}} &= \\bold{\\textcolor{teal}{&1 \\times 10}} \\times \\bold{\\textcolor{yellow}{&2 \\times 10}} \\\\ &= &1 \\times &2 \\times 10 \\times 10 \\\\ &= #{&1*&2} \\times 100 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3*&4}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription:
            'Les 2 facteurs sont des multiples de 10, 100 ou 1000',
          enounces: ['Calcule.'],
          expressions: ['&5*&6'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;3]',
              '&3': '$e[2;9]',
              '&4': '$e[1;3]',
              '&5': '#{&1*10^&2}',
              '&6': '#{&3*10^&4}',

            },
          ],
          type: 'result',
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&5}} \\times \\bold{\\textcolor{yellow}{&6}} &= \\bold{\\textcolor{teal}{&1 \\times #{10^&2}}} \\times \\bold{\\textcolor{yellow}{&3 \\times #{10^&4}}} \\\\ &= &1 \\times &3 \\times #{10^&2} \\times #{10^&4} \\\\ &= #{&1*&3} \\times #{10^(&2+&4)} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&5*&6}}}\\end{align}$$' },
            ],

          ],
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Un facteur à 2 chiffres',
          enounces: ['Calcule.'],
          expressions: ['&1*&2', '&2*&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[12;99]' }],
          type: 'result',
          defaultDelay: 30,
          grade: CM2,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Un facteur à 3 chiffres',
          enounces: ['Calcule.'],
          expressions: ['&1*&2', '&2*&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[102;999]' }],
          type: 'result',
          defaultDelay: 30,
          grade: SIXIEME,
        },
        {
          description: "Chiffre des unités d'un produit",
          enounces: ['Quel est le chiffre des unités du produit de $$&1$$ par $$&2$$ ?'],
          variables: [{
            '&1': '$e[11;99]',
            '&2': '$e[102;999]',
            '&3': '&2*&1',
          }],
          solutions: [['#{(&3:10-floor(&3:10))*10}']],
          correctionFormat: [
            {
              correct: ['Le chiffre des unités de $$&1 \\times &2$$ est &solution.'],
              uncorrect: ['Le chiffre des unités de $$&1 \\times &2$$ est &solution.'],
              answer: 'Le chiffre des unités est &answer.'
            },
          ],
          options: ['no-exp'],
          type: 'rewrite',
          defaultDelay: 30,
          grade: SIXIEME,
        },
      ],
      'Double et moitié': [
        {
          description: "Trouver le double",
          subdescription: 'Nombre inférieur à 10',
          enounces: ['Quel est le double de $$&1$$ ?', 'Quel est le résultat de $$2*&1$$ ?'],
          expressions: ['2*&1'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[0;9]' }],
          correctionFormat: [{
            correct: ['Le double de $$&1$$ est &solution.'],
            uncorrect: ['Le double de $$&1$$ est &solution.'],
            answer: 'Le double de $$&1$$ est &answer.'
          },
          {
            correct: ['$$2*&1=$$&solution'],
            uncorrect: ['$$2*&1=$$&solution'],
            answer: '$$2*&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: "Trouver le double",
          subdescription: "Dizaines entières (jusqu'à 50)",
          enounces: ['Quel est le double de $$&2$$ ?', 'Quel est le résultat de $$2*&2$$ ?'],
          expressions: ['2*&2'],
          options: ['no-exp'],
          variables: [{
            '&1': '$e[1;5]*10',
            '&2': '#{&1}'
          }],
          correctionFormat: [{
            correct: ['Le double de $$&2$$ est &solution.'],
            uncorrect: ['Le double de $$&2$$ est &solution.'],
            answer: 'Le double de $$&2$$ est &answer.'
          },
          {
            correct: ['$$2*&2=$$&solution'],
            uncorrect: ['$$2*&2=$$&solution'],
            answer: '$$2*&2=$$&answer'
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: "Trouver la moitié",
          subdescription: 'Nombre pair inférieur à 20',
          enounces: ['Quelle est la moitié de $$#{2*&1}$$ ?'],
          expressions: ['&1'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[0;10]' }],
          correctionFormat: [{
            correct: ['La moitié de $$#{2*&1}$$ est &solution.'],
            uncorrect: ['La moitié de $$#{2*&1}$$ est &solution.'],
            answer: 'La moitié de $$#{2*&1}$$ est &answer.'
          }],
          correctionDetails: [
            [
              { text: 'Le moitié de $$#{2*&1}$$ est &solution car $$2*&1=#{2*&1}$$' }
            ],
          ],
          type: 'result',
          defaultDelay: 10,
          grade: CP,
        },
        {
          description: "Trouver le double",
          subdescription: "Nombres de 1 à 15, 25, 30, 40, 50 et 100",
          enounces: ['Quel est le double de $$&1$$ ?', 'Quel est le résultat de $$2*&1$$ ?'],
          expressions: ['2*&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;9];$e[11;15];25;30;40;50;100}',
          }],
          correctionFormat: [{
            correct: ['Le double de $$&1$$ est &solution.'],
            uncorrect: ['Le double de $$&1$$ est &solution.'],
            answer: 'Le double de $$&1$$ est &answer.'
          },
          {
            correct: ['$$2*&1=$$&solution'],
            uncorrect: ['$$2*&1=$$&solution'],
            answer: '$$2*&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: "Trouver la moitié",
          subdescription: "Nombres pairs de 1 à 30, 40, 50 et 100",
          enounces: ['Quel est la moitié de $$&2$$ ?'],
          expressions: ['&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;9];$e[11;15];20;25;50}', '&2': '#{2*&1}',
          }],
          correctionFormat: [{
            correct: ['La moitié de $$&2$$ est &solution.'],
            uncorrect: ['La moitié de $$&2$$ est &solution.'],
            answer: 'La moitié de $$&2$$ est &answer.'
          },
          ],
          correctionDetails: [
            [
              { text: 'Le moitié de $$#{2*&1}$$ est &solution car $$2*&1=#{2*&1}$$' }
            ],
          ],
          type: 'rewrite',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: "Trouver le double",
          subdescription: "Nombres de 1 à 20, 25, 30, 40, 50, 60 et 100",
          enounces: ['Quel est le double de $$&1$$ ?', 'Quel est le résultat de $$2*&1$$ ?'],
          expressions: ['2*&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;10];$e[11;15];$e[15;20];25;30;40;50;60;100}',
          }],
          correctionFormat: [{
            correct: ['Le double de $$&1$$ est &solution.'],
            uncorrect: ['Le double de $$&1$$ est &solution.'],
            answer: 'Le double de $$&1$$ est &answer.'
          },
          {
            correct: ['$$2*&1=$$&solution'],
            uncorrect: ['$$2*&1=$$&solution'],
            answer: '$$2*&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: "Trouver la moitié",
          subdescription: "Nombres pairs de 1 à 40, 50, 60 et 100",
          enounces: ['Quel est la moitié de $$&2$$ ?'],
          expressions: ['&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;9];$e[11;15];$e[16;20];25;30;50}', '&2': '#{2*&1}',
          }],
          correctionFormat: [{
            correct: ['La moitié de $$&2$$ est &solution.'],
            uncorrect: ['La moitié de $$&2$$ est &solution.'],
            answer: 'La moitié de $$&2$$ est &answer.'
          },
          ],
          correctionDetails: [
            [
              { text: 'Le moitié de $$#{2*&1}$$ est &solution car $$2*&1=#{2*&1}$$' }
            ],
          ],
          type: 'rewrite',
          defaultDelay: 15,
          grade: CE2,
        },

      ],
      'Triple et tiers': [
        {
          description: "Trouver le triple",
          subdescription: 'Nombre inférieur à 10',
          enounces: ['Quel est le triple de $$&1$$ ?', 'Quel est le résultat de $$3*&1$$ ?'],
          expressions: ['3*&1'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[0;9]' }],
          correctionFormat: [{
            correct: ['Le triple de $$&1$$ est &solution.'],
            uncorrect: ['Le triple de $$&1$$ est &solution.'],
            answer: 'Le triple de $$&1$$ est &answer.'
          },
          {
            correct: ['$$3*&1=$$&solution'],
            uncorrect: ['$$3*&1=$$&solution'],
            answer: '$$3*&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: "Trouver le triple",
          subdescription: "Dizaines entières (jusqu'à 50)",
          enounces: ['Quel est le triple de $$&2$$ ?', 'Quel est le résultat de $$3*&2$$ ?'],
          expressions: ['3*&2'],
          options: ['no-exp'],
          variables: [{
            '&1': '$e[1;5]*10',
            '&2': '#{&1}'
          }],
          correctionFormat: [{
            correct: ['Le triple de $$&2$$ est &solution.'],
            uncorrect: ['Le triple de $$&2$$ est &solution.'],
            answer: 'Le triple de $$&2$$ est &answer.'
          },
          {
            correct: ['$$3*&2=$$&solution'],
            uncorrect: ['$$3*&2=$$&solution'],
            answer: '$$3*&2=$$&answer'
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: "Trouver le tiers",
          subdescription: 'Multiples de 3 inférieurs à 30',
          enounces: ['Quelle est le tiers de $$#{3*&1}$$ ?'],
          expressions: ['&1'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[0;10]' }],
          correctionFormat: [{
            correct: ['Le tiers de $$#{3*&1}$$ est &solution.'],
            uncorrect: ['Le tiers de $$#{3*&1}$$ est &solution.'],
            answer: 'Le tiers de $$#{3*&1}$$ est &answer.'
          }],
          correctionDetails: [
            [
              { text: 'Le tiers de $$#{3*&1}$$ est &solution car $$3*&1=#{3*&1}$$' }
            ],
          ],
          type: 'result',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: "Trouver le triple",
          subdescription: "Nombres de 1 à 15, 25, 30, 40, 50 et 100",
          enounces: ['Quel est le triple de $$&1$$ ?', 'Quel est le résultat de $$3*&1$$ ?'],
          expressions: ['3*&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;9];$e[11;15];25;30;40;50;100}',
          }],
          correctionFormat: [{
            correct: ['Le triple de $$&1$$ est &solution.'],
            uncorrect: ['Le triple de $$&1$$ est &solution.'],
            answer: 'Le triple de $$&1$$ est &answer.'
          },
          {
            correct: ['$$3*&1=$$&solution'],
            uncorrect: ['$$3*&1=$$&solution'],
            answer: '$$3*&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: "Trouver le triple",
          subdescription: "Nombres de 1 à 20, 25, 30, 40, 50, 60 et 100",
          enounces: ['Quel est le triple de $$&1$$ ?', 'Quel est le résultat de $$3*&1$$ ?'],
          expressions: ['3*&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;10];$e[11;15];$e[15;20];25;30;40;50;60;100}',
          }],
          correctionFormat: [{
            correct: ['Le triple de $$&1$$ est &solution.'],
            uncorrect: ['Le triple de $$&1$$ est &solution.'],
            answer: 'Le triple de $$&1$$ est &answer.'
          },
          {
            correct: ['$$3*&1=$$&solution'],
            uncorrect: ['$$3*&1=$$&solution'],
            answer: '$$3*&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 15,
          grade: CE2,
        },


      ],
      'Quadruple et quart': [
        {
          description: "Trouver le quadruple",
          subdescription: 'Nombre inférieur à 10',
          enounces: ['Quel est le triple de $$&1$$ ?', 'Quel est le résultat de $$4*&1$$ ?'],
          expressions: ['4*&1'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[0;9]' }],
          correctionFormat: [{
            correct: ['Le quadruple de $$&1$$ est &solution.'],
            uncorrect: ['Le quadruple de $$&1$$ est &solution.'],
            answer: 'Le quadruple de $$&1$$ est &answer.'
          },
          {
            correct: ['$$4*&1=$$&solution'],
            uncorrect: ['$$4*&1=$$&solution'],
            answer: '$$4*&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CE2,
        },
        {
          description: "Trouver le quadruple",
          subdescription: "Dizaines entières (jusqu'à 50)",
          enounces: ['Quel est le quadruple de $$&2$$ ?', 'Quel est le résultat de $$4*&2$$ ?'],
          expressions: ['4*&2'],
          options: ['no-exp'],
          variables: [{
            '&1': '$e[1;5]*10',
            '&2': '#{&1}'
          }],
          correctionFormat: [{
            correct: ['Le quadruple de $$&2$$ est &solution.'],
            uncorrect: ['Le quadruple de $$&2$$ est &solution.'],
            answer: 'Le quadruple de $$&2$$ est &answer.'
          },
          {
            correct: ['$$4*&2=$$&solution'],
            uncorrect: ['$$4*&2=$$&solution'],
            answer: '$$4*&2=$$&answer'
          }],
          type: 'result',
          defaultDelay: 10,
          grade: CE2,
        },
        {
          description: "Trouver le quart",
          subdescription: 'Multiples de 4 inférieurs à 40',
          enounces: ['Quelle est le quart de $$#{4*&1}$$ ?'],
          expressions: ['&1'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[0;10]' }],
          correctionFormat: [{
            correct: ['Le quart de $$#{4*&1}$$ est &solution.'],
            uncorrect: ['Le quart de $$#{4*&1}$$ est &solution.'],
            answer: 'Le quart de $$#{4*&1}$$ est &answer.'
          }],
          correctionDetails: [
            [
              { text: 'Le quart de $$#{4*&1}$$ est &solution car $$4*&1=#{4*&1}$$' }
            ],
          ],
          type: 'result',
          defaultDelay: 10,
          grade: CE2,
        },
        {
          description: "Trouver le quadruple",
          subdescription: "Nombres de 1 à 15, 25, 30, 40, 50 et 100",
          enounces: ['Quel est le quadruple de $$&1$$ ?', 'Quel est le résultat de $$4*&1$$ ?'],
          expressions: ['4*&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;9];$e[11;15];25;30;40;50;100}',
          }],
          correctionFormat: [{
            correct: ['Le quadruple de $$&1$$ est &solution.'],
            uncorrect: ['Le quadruple de $$&1$$ est &solution.'],
            answer: 'Le quadruple de $$&1$$ est &answer.'
          },
          {
            correct: ['$$4*&1=$$&solution'],
            uncorrect: ['$$4*&1=$$&solution'],
            answer: '$$4*&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: "Trouver le quadruple",
          subdescription: "Nombres de 1 à 20, 25, 30, 40, 50, 60 et 100",
          enounces: ['Quel est le quadruple de $$&1$$ ?', 'Quel est le résultat de $$4*&1$$ ?'],
          expressions: ['4*&1'],
          options: ['no-exp'],
          variables: [{
            '&1': '$l{$e[1;10];$e[11;15];$e[15;20];25;30;40;50;60;100}',
          }],
          correctionFormat: [{
            correct: ['Le quadruple de $$&1$$ est &solution.'],
            uncorrect: ['Le quadruple de $$&1$$ est &solution.'],
            answer: 'Le quadruple de $$&1$$ est &answer.'
          },
          {
            correct: ['$$4*&1=$$&solution'],
            uncorrect: ['$$4*&1=$$&solution'],
            answer: '$$4*&1=$$&answer'
          }],
          type: 'result',
          defaultDelay: 15,
          grade: CM1,
        },


      ],
      'Produits particuliers': [
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Premiers multiples de 25 et 50',
          enounces: ['Calcule.'],
          expressions: ['&1*50', '&1*25'],
          type: 'result',
          variables: [{ '&1': '$e[0;4]' }],
          defaultDelay: 10,
          grade: CM1,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Produits à connaître par coeur',
          enounces: ['Calcule.'],
          options: ['exhaust'],
          expressions: [
            '4*25',
            '2*50',
            '5*12',
            '4*15',
            '4*20',
            '5*14',
            '5*18',
            '6*15',
            '6*20',
            '8*15',
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Multiplication par 50',
          enounces: ['Calcule.'],
          expressions: ['#{&1*2+1}*50', '#{&1*2}*50'],
          type: 'result',
          variables: [{ '&1': '$e[2;10]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{#{&1*2+1}}} \\times 50 &= \\bold{\\textcolor{teal}{(&1 \\times 2 + 1)}} \\times 50 \\\\ &= &1 \\times 2 \\times 50  + 50 \\\\ &= &1 \\times 100  + 50 \\\\ &=  #{&1*100}  + 50 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*100+50}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{#{&1*2}}} \\times 50 &= \\bold{\\textcolor{teal}{(&1 \\times 2)}} \\times 50 \\\\ &= &1 \\times 2 \\times 50 \\\\ &= &1 \\times 100 \\\\ &=  #{&1*100} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*100}}}\\end{align}$$' },
            ],
          ],
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Multiplication par 25',
          enounces: ['Calcule.'],
          expressions: ['#{&1*4+&2}*25', '#{&1*4}*25'],
          type: 'result',
          variables: [
            {
              '&1': '$e[2;5]',
              '&2': '$e[1;3]'
            }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{#{&1*4+&2}}} \\times 25 &= \\bold{\\textcolor{teal}{(&1 \\times 4 + &2)}} \\times 25 \\\\ &= &1 \\times \\bold{\\textcolor{yellow}{4 \\times 25}}  + &2 \\times 25 \\\\ &= &1 \\times \\bold{\\textcolor{yellow}{100}} + #{&2*25} \\\\ &=  #{&1*100}  + #{&2*25} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{(&1*4+&2)*25}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{#{&1*4}}} \\times 25 &= \\bold{\\textcolor{teal}{(&1 \\times 4)}} \\times 25 \\\\ &= &1 \\times \\bold{\\textcolor{yellow}{4 \\times 25}} \\\\ &= &1 \\times \\bold{\\textcolor{yellow}{100}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*100}}}\\end{align}$$' },
            ],

          ],
          defaultDelay: 20,
          grade: CM2,
        },
      ],
      'Puissances de 10': [
        {
          description: "Calculer un produit d'entiers",
          subdescription: "Multiplication par 10 d'un nombre inférieur à 100",
          enounces: ['Calcule.'],
          expressions: ['&1*10', '10*&1'],
          variables: [{ '&1': '$e[1;99]' }],
          type: 'result',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: "Multiplication par 100 d'un nombre inférieur à 100",
          enounces: ['Calcule.'],
          expressions: ['&1*100', '100*&1'],
          variables: [{ '&1': '$e[1;99]' }],
          type: 'result',
          defaultDelay: 10,
          grade: CE2,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Multiplication par 10, 100 ou 1000',
          enounces: ['Calcule.'],
          expressions: ['&1*#{10^&2}'],
          variables: [{ '&1': '$e[2;99]', '&2': '$e[1;3]' }],
          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },

      ],
      'A trou': [
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplication par 2',
          enounces: ['Complète.'],
          expressions: ['?*2=#{&1*2}', '2*?=#{&1*2}'],
          variables: [{ '&1': '$e[2;9]' }],
          solutions: [['&1']],
          type: 'trou',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplication par 3',
          enounces: ['Complète.'],
          expressions: ['?*3=#{&1*3}', '3*?=#{&1*3}'],
          variables: [{ '&1': '$e[2;9]' }],
          solutions: [['&1']],
          type: 'trou',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplication par 4',
          enounces: ['Complète.'],
          expressions: ['?*4=#{&1*4}', '4*?=#{&1*4}'],
          variables: [{ '&1': '$e[2;9]' }],
          solutions: [['&1']],
          type: 'trou',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplication par 5',
          enounces: ['Complète.'],
          expressions: ['?*5=#{&1*5}', '5*?=#{&1*5}'],
          variables: [{ '&1': '$e[2;9]' }],
          solutions: [['&1']],
          type: 'trou',
          defaultDelay: 10,
          grade: CE1,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplication par 6',
          enounces: ['Complète.'],
          expressions: ['?*6=#{&1*6}', '6*?=#{&1*6}'],
          variables: [{ '&1': '$e[2;9]' }],
          solutions: [['&1']],
          type: 'trou',
          defaultDelay: 10,
          grade: CE2,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplication par 7',
          enounces: ['Complète.'],
          expressions: ['?*7=#{&1*7}', '7*?=#{&1*7}'],
          variables: [{ '&1': '$e[2;9]' }],
          solutions: [['&1']],
          type: 'trou',
          defaultDelay: 10,
          grade: CE2,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplication par 8',
          enounces: ['Complète.'],
          expressions: ['?*8=#{&1*8}', '8*?=#{&1*8}'],
          variables: [{ '&1': '$e[2;9]' }],
          solutions: [['&1']],
          type: 'trou',
          defaultDelay: 10,
          grade: CE2,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplication par 9',
          enounces: ['Complète.'],
          expressions: ['?*9=#{&1*9}', '9*?=#{&1*9}'],
          variables: [{ '&1': '$e[2;9]' }],
          solutions: [['&1']],
          type: 'trou',
          defaultDelay: 10,
          grade: CE2,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Facteurs à 1 chiffre',
          enounces: ['Complète.'],
          expressions: ['?*&1=#{&1*&2}', '&1*?=#{&1*&2}'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[3;9]' }],
          solutions: [['&2']],
          type: 'trou',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: "Compléter une multiplication à trou",
          subdescription: 'Multiplier par 20. Nombre à 1 chiffre',
          enounces: ['Complète.'],
          expressions: ['?*20=#{&1*20}', '20*?=#{20*&1}'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'trou',
          solutions: [['&1']],
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: "Compléter une multiplication à trou",
          subdescription: 'Multiplier par 20.Nombre à 2 chiffres',
          enounces: ['Complète.'],
          expressions: ['?*20=#{&1*20}', '20*?=#{20*&1}'],
          variables: [{ '&1': '$l{$e[11;15];$e[15;20];25;30;40;50}' }],
          type: 'trou',
          solutions: [['&1']],
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: "Compléter une multiplication à trou.",
          subdescription: 'Multiplier par 30, 40, 50, 60, 70, 80, 90. Nombre à 1 chiffres',
          enounces: ['Complète.'],
          expressions: ['#{&1*10}*? = #{&1*10*&2}', '?*#{&1*10} = #{&2*&1*10}'],
          variables: [{ '&1': '$e[3;9]', '&2': '$e[2;9]' }],
          type: 'trou',
          solutions: [['&2']],
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: "Compléter une multiplication à trou.",
          subdescription: 'Multiplier par 30, 40, 50, 60, 70, 80, 90. Nombre à 1 chiffres',
          enounces: ['Complète.'],
          expressions: ['?*&2 = #{&1*10*&2}', '&2*? = #{&2*&1*10}'],
          variables: [{ '&1': '$e[3;9]', '&2': '$e[2;9]' }],
          type: 'trou',
          solutions: [['#{&1*10}']],
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: "Combien de fois ... dans ....",
          subdescription: 'Multiplier par 30, 40, 50, 60, 70, 80, 90. Nombre à 1 chiffres',
          enounces: ['Dans $$%{&1*10*&2}$$ combien de fois $$&2$$ ?'],
          // expressions: ['?*&2 = #{&1*10*&2}', '&2*? = #{&2*&1*10}'],
          variables: [{ '&1': '$e[3;9]', '&2': '$e[2;9]' }],
          type: 'rewrite',
          options: ['no-exp'],
          solutions: [['#{&1*10}']],
          correctionFormat: [{
            correct: ['Dans $$%{&1*10*&2}$$, on peut mettre &solution fois $$&2$$.'],
            uncorrect: ['Dans $$%{&1*10*&2}$$, on peut mettre &solution fois $$&2$$.'],
            answer: 'On peut mettre &answer fois $$&2$$.'
          },
          ],
          //   correctionDetails: [
          //     [
          //     {text:'toto'}
          //   ],
          // ],
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: "Compléter une multiplication à trou",
          subdescription: "Multiplier deux multiples de 10",
          enounces: ['Complète.'],
          expressions: ['#{&1*10}* ?= #{&1*10*&2*10}', '?*#{&1*10}=#{&2*10*&1*10}'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'trou',
          solutions: [['#{&2*10}']],
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: "Compléter une multiplication à trou.",
          subdescription: 'Premiers multiples de 25 et 50',
          enounces: ['Complète.'],
          expressions: ['?*50=#{&1*50}', '?*25=#{&1*25}'],
          type: 'trou',
          solutions: [['&1']],
          variables: [{ '&1': '$e[0;4]' }],
          defaultDelay: 10,
          grade: CM1,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription:
            'Les 2 facteurs sont des multiples de 10, 100 ou 1000',
          enounces: ['Complète.'],
          expressions: [
            '#{&1*10^&2}*?= #{&1*10^&2*&3*10^&4}',
            '?*#{&1*10^&2}= #{&1*10^&2*&3*10^&4}',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;3]',
              '&3': '$e[2;9]',
              '&4': '$e[1;3]',
            },
          ],
          solutions: [['#{&3*10^&4}']],
          type: 'trou',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Produits classiques',
          enounces: ['Complète.'],
          expressions: [
            '?*4=100',
            '?*5=100',
            '?*2=100',
            '?*5=60',
            '?*4=60',
            '?*5=70',
            '?*5=90',
            '?*6=90',

            '?*25=100',
            '?*20=100',
            '?*50=100',
            '?*12=60',
            '?*15=60',
            '?*14=70',
            '?*18=90',
            '?*15=90',
          ],
          solutions: [

            ['25'],
            ['20'],
            ['50'],
            ['12'],
            ['15'],
            ['14'],
            ['18'],
            ['15'],

            ['4'],
            ['5'],
            ['2'],
            ['5'],
            ['4'],
            ['5'],
            ['5'],
            ['6'],

          ],

          options: ['exhaust'],
          type: 'trou',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: "Compléter une multiplication à trou",
          subdescription: 'Multiplication par 50',
          enounces: ['Complète.'],
          expressions: ['?*50=#{(&1*2+1)*50}', '?*50 = #{&1*2*50}'],
          type: 'trou',
          solutions: [
            ['#{&1*2+1}'],
            ['#{&1*2}'],
          ],
          variables: [{ '&1': '$e[1;6]' }],
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: "Compléter une multiplication à trou",
          subdescription: 'Multiplication par 50',
          enounces: ['Complète.'],
          expressions: ['?*25=#{(&1*4+&2)*25}', '?*25=#{&1*4*25}'],
          type: 'trou',
          solutions: [
            ['#{&1*4+&2}'],
            ['#{&1*4}'],

          ],
          variables: [{ '&1': '$e[2;5]', '&2': '$e[1;3]' }],
          defaultDelay: 20,
          grade: CM2,
        },

      ],

      'Carrés': [
        {
          description: 'Calculer un carré',
          subdescription: 'Entier de 1 à 12',
          enounces: ['Calcule.'],
          expressions: ['&1^2'],
          variables: [{ '&1': '$e[1;12]' }],
          type: 'result',
          defaultDelay: 10,
          grade: CINQUIEME,
        },

      ],

      'Produits astucieux': [
        {
          description: 'Calculer astucieusement un produit',
          subdescription: 'Utiiser 2 facteurs dont le produit est 10',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '2*&1*5',
            '5*&1*2',
            '&1*5*2',
            '&1*2*5',
          ],
          variables: [{ '&1': '$e[19;40]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{2}} \\times &1 \\times  \\bold{\\textcolor{teal}{5}} &= \\bold{\\textcolor{teal}{10}} \\times &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{5}} \\times &1 \\times  \\bold{\\textcolor{teal}{2}} &= \\bold{\\textcolor{teal}{10}} \\times &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &1 \\times \\bold{\\textcolor{teal}{2}} \\times  \\bold{\\textcolor{teal}{5}} &= &1 \\times \\bold{\\textcolor{teal}{10}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &1 \\times \\bold{\\textcolor{teal}{5}} \\times  \\bold{\\textcolor{teal}{2}} &=   &1 \\times \\bold{\\textcolor{teal}{10}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*10}}}\\end{align}$$' },
            ],


          ],
          type: 'result',
          defaultDelay: 15,
          grade: CE1,
        },
        {
          description: 'Calculer astucieusement un produit',
          subdescription: 'Utiiser 2 facteurs dont le produit est 100',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&1*&2*&3',
            '&2*&1*&3',
            '&2*&3*&1',
            '&1*&3*&2',
            '&3*&2*&1',
            '&3*&1*&2',
          ],
          variables: [{ '&1': '$l{20;25;50}', '&2': '#{100:&1}', '&3': '$e[11;99]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}}  \\times  \\bold{\\textcolor{teal}{&2}} \\times &3 &= \\bold{\\textcolor{teal}{100}} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&2}}  \\times  \\bold{\\textcolor{teal}{&1}} \\times &3 &= \\bold{\\textcolor{teal}{100}} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&2}}  \\times  &3 \\times \\bold{\\textcolor{teal}{&1}} &= \\bold{\\textcolor{teal}{100}} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}}  \\times  &3 \\times \\bold{\\textcolor{teal}{&2}} &= \\bold{\\textcolor{teal}{100}} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &3 \\times \\bold{\\textcolor{teal}{&2}} \\times \\bold{\\textcolor{teal}{&1}} &= &3 \\times \\bold{\\textcolor{teal}{100}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &3 \\times \\bold{\\textcolor{teal}{&1}} \\times \\bold{\\textcolor{teal}{&2}} &= &3 \\times \\bold{\\textcolor{teal}{100}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*100}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Calculer astucieusement un produit',
          subdescription: 'Utiiser 2 facteurs dont le produit est 10 (avec 0,5)',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '20*#{2*&1}*0,5',
            '0,5*#{2*&1}*20',
            '#{2*&1}*0,5*20',
            '#{2*&1}*20*0,5',
          ],
          variables: [{ '&1': '$e[3;19]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{20}} \\times %{2*&1} \\times  \\bold{\\textcolor{teal}{0,5}} &= \\bold{\\textcolor{teal}{10}} \\times %{2*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{2*&1*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{0,5}} \\times %{2*&1} \\times  \\bold{\\textcolor{teal}{20}} &= \\bold{\\textcolor{teal}{10}} \\times %{2*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{2*&1*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} %{2*&1} \\times \\bold{\\textcolor{teal}{20}} \\times  \\bold{\\textcolor{teal}{0,5}} &= %{2*&1} \\times \\bold{\\textcolor{teal}{10}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{2*&1*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} %{2*&1} \\times \\bold{\\textcolor{teal}{0,5}} \\times  \\bold{\\textcolor{teal}{20}} &=   %{2*&1} \\times \\bold{\\textcolor{teal}{10}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{2*&1*10}}}\\end{align}$$' },
            ],


          ],
          type: 'result',
          defaultDelay: 15,
          grade: CM2,
        },
        {
          description: 'Calculer astucieusement un produit',
          subdescription: 'Utiiser 2 facteurs dont le produit est 10 (avec 0,2 ; 0,25 ; 0,5)',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&1*&2*&3',
            '&2*&1*&3',
            '&2*&3*&1',
            '&1*&3*&2',
            '&3*&2*&1',
            '&3*&1*&2',
          ],
          variables: [{ '&1': '$l{0,2;0,25;0,5}', '&2': '#{10:&1}', '&3': '$e[3;19]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{%%{&1}}}  \\times  \\bold{\\textcolor{teal}{&2}} \\times &3 &= \\bold{\\textcolor{teal}{10}} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&2}}  \\times  \\bold{\\textcolor{teal}{%%{&1}}} \\times &3 &= \\bold{\\textcolor{teal}{10}} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&2}}  \\times  &3 \\times \\bold{\\textcolor{teal}{%%{&1}}} &= \\bold{\\textcolor{teal}{10}} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{%%{&1}}}  \\times  &3 \\times \\bold{\\textcolor{teal}{&2}} &= \\bold{\\textcolor{teal}{10}} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &3 \\times \\bold{\\textcolor{teal}{&2}} \\times \\bold{\\textcolor{teal}{%%{&1}}} &= &3 \\times \\bold{\\textcolor{teal}{10}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &3 \\times \\bold{\\textcolor{teal}{%%{&1}}} \\times \\bold{\\textcolor{teal}{&2}} &= &3 \\times \\bold{\\textcolor{teal}{10}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*10}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM2,
        },
      ],
      Distributivité: [
        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 1 chiffre par 12",
          enounces: ["Calculer."],
          expressions: ['12*&1'],
          variables: [{ '&1': '$e[0;9]' }],
          // details: [['10 \\times &1 + &1', '#{10*&1} + &1']],
          type: 'result',
          correctionDetails: [
            [
              { text: '$$\\begin{align} 12 \\times \\bold{\\textcolor{teal}{&1}}  &= 10 \\times \\bold{\\textcolor{teal}{&1}} + 2 \\times \\bold{\\textcolor{teal}{&1}} \\\\ &= #{10*&1} + #{2*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*12}}}\\end{align}$$' },
            ],
          ],
          defaultDelay: 20,
          grade: CE1,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 1 chiffre par 13",
          enounces: ["Calculer."],
          expressions: ['13*&1'],
          variables: [{ '&1': '$e[0;9]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 13 \\times \\bold{\\textcolor{teal}{&1}}  &= 10 \\times \\bold{\\textcolor{teal}{&1}} + 3 \\times \\bold{\\textcolor{teal}{&1}} \\\\ &= #{10*&1} + #{3*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*13}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 1 chiffre par 21",
          enounces: ["Calculer."],
          expressions: ['21*&1'],
          variables: [{ '&1': '$e[0;9]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 21 \\times \\bold{\\textcolor{teal}{&1}}  &= 20 \\times \\bold{\\textcolor{teal}{&1}} +  \\bold{\\textcolor{teal}{&1}} \\\\ &= #{20*&1} + &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*21}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },

        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 1 chiffre par 22",
          enounces: ["Calculer."],
          expressions: ['22*&1'],
          variables: [{ '&1': '$e[0;9]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 22 \\times \\bold{\\textcolor{teal}{&1}}  &= 20 \\times \\bold{\\textcolor{teal}{&1}} + 2 \\times \\bold{\\textcolor{teal}{&1}} \\\\ &= #{20*&1} + #{2*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*22}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 1 chiffre par 19",
          enounces: ["Calculer."],
          expressions: ['19*&1'],
          variables: [{ '&1': '$e[0;9]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 19 \\times \\bold{\\textcolor{teal}{&1}}  &= 20 \\times \\bold{\\textcolor{teal}{&1}} - \\bold{\\textcolor{teal}{&1}} \\\\ &= #{20*&1} - &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*19}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 1 chiffre par 18",
          enounces: ["Calculer."],
          expressions: ['18*&1'],
          variables: [{ '&1': '$e[0;9]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 18 \\times \\bold{\\textcolor{teal}{&1}}  &= 20 \\times \\bold{\\textcolor{teal}{&1}} - 2 \\times \\bold{\\textcolor{teal}{&1}} \\\\ &= #{20*&1} - #{2*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*18}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 2 chiffres par 11",
          enounces: ["Calculer."],
          expressions: ['11*&1'],
          variables: [{ '&1': '$e[13;45]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 11 \\times \\bold{\\textcolor{teal}{&1}}  &= 10 \\times \\bold{\\textcolor{teal}{&1}} + \\bold{\\textcolor{teal}{&1}} \\\\ &= #{10*&1} + &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*11}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 2 chiffres par  12",
          enounces: ["Calculer."],
          expressions: ['12*&1'],
          variables: [{ '&1': '$l{13;14;15;23;24;25;33;34;35;45}' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 12 \\times \\bold{\\textcolor{teal}{&1}}  &= 10 \\times \\bold{\\textcolor{teal}{&1}} + 2 \\times \\bold{\\textcolor{teal}{&1}} \\\\ &= #{10*&1} + #{2*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*12}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 1 ou 2 chiffres par  21",
          enounces: ["Calculer."],
          expressions: ['21*&1'],
          variables: [{ '&1': '$l{5;6;7;8;9;13;14;15;23;24;25;35;45}]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 21 \\times \\bold{\\textcolor{teal}{&1}}  &= 20 \\times \\bold{\\textcolor{teal}{&1}} +  \\bold{\\textcolor{teal}{&1}} \\\\ &= #{20*&1} + &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*21}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 1 ou 2 chiffres par  22",
          enounces: ["Calculer."],
          expressions: ['22*&1'],
          variables: [{ '&1': '$l{5;6;7;8;9;13;14;15;23;24;25;35;45}]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 22 \\times \\bold{\\textcolor{teal}{&1}}  &= 20 \\times \\bold{\\textcolor{teal}{&1}} + 2 \\times \\bold{\\textcolor{teal}{&1}} \\\\ &= #{20*&1} + #{2*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*22}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 2 chiffres par  9",
          enounces: ["Calculer."],
          expressions: ['9*&1'],
          variables: [{ '&1': '$e[12;19]' }, { '&1': '$e[23;29]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 9 \\times \\bold{\\textcolor{teal}{&1}}  &= 10 \\times \\bold{\\textcolor{teal}{&1}} - \\bold{\\textcolor{teal}{&1}} \\\\ &= #{10*&1} - &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*9}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 1 ou 2 chiffres par  19",
          enounces: ["Calculer."],
          expressions: ['19*&1'],
          variables: [{ '&1': '$e[13;19]' }, { '&1': '$e[5;9]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 19 \\times \\bold{\\textcolor{teal}{&1}}  &= 20 \\times \\bold{\\textcolor{teal}{&1}} - \\bold{\\textcolor{teal}{&1}} \\\\ &= #{20*&1} - &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*19}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: "Multiplication d'un nombre à 1 ou 2 chiffres par  18",
          enounces: ["Calculer."],
          expressions: ['18*&1'],
          variables: [{ '&1': '$e[4;9]' }, { '&1': '$l{13;14;15;25}' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 18 \\times \\bold{\\textcolor{teal}{&1}}  &= 20 \\times \\bold{\\textcolor{teal}{&1}} - 2 \\times \\bold{\\textcolor{teal}{&1}} \\\\ &= #{20*&1} - #{2*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*18}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Multiplication par 101',
          enounces: ["Calculer"],
          expressions: ['101*&1'],
          variables: [{ '&1': '$e[15;40]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 101 \\times \\bold{\\textcolor{teal}{&1}}  &= 100 \\times \\bold{\\textcolor{teal}{&1}} + \\bold{\\textcolor{teal}{&1}} \\\\ &= %{100*&1} + &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*101}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Multiplication par 102',
          enounces: ["Calculer"],
          expressions: ['102*&1'],
          variables: [{ '&1': '$e[15;49]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 102 \\times \\bold{\\textcolor{teal}{&1}}  &= 100 \\times \\bold{\\textcolor{teal}{&1}} + 2 \\times \\bold{\\textcolor{teal}{&1}} \\\\ &= %{100*&1} + #{2*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*102}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Multiplication par 99',
          enounces: ["Calculer"],
          expressions: ['99*&1'],
          variables: [{ '&1': '$e[15;40]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 99 \\times \\bold{\\textcolor{teal}{&1}}  &= 100 \\times \\bold{\\textcolor{teal}{&1}} - \\bold{\\textcolor{teal}{&1}} \\\\ &= %{100*&1} - &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*99}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM2,
        },

        {
          description: 'Utiliser la distributivité',
          enounces: ["Calculer"],
          subdescription: 'Multiplication par 98',
          expressions: ['98*&1'],
          variables: [{ '&1': '$e[15;40]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} 98 \\times \\bold{\\textcolor{teal}{&1}}  &= 100 \\times \\bold{\\textcolor{teal}{&1}} - 2 \\times \\bold{\\textcolor{teal}{&1}} \\\\ &= %{100*&1} - #{2*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*98}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Factorisation pour un facteur 10',
          enounces: ["Calcule."],
          expressions: [
            '&2*&1+#{10-&2}*&1',
            '&1*&2+#{10-&2}*&1',
            '&2*&1+&1*#{10-&2}',
            '&1*&2+&1*#{10-&2}',
          ],
          variables: [{ '&1': '$e[23;99]', '&2': '$e[2;8]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} &2 \\times \\bold{\\textcolor{teal}{&1}} + %{10-&2} \\times \\bold{\\textcolor{teal}{&1}} &=  10 \\times \\bold{\\textcolor{teal}{&1}}\\\\  &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}} \\times &2 + %{10-&2} \\times \\bold{\\textcolor{teal}{&1}} &=  10 \\times \\bold{\\textcolor{teal}{&1}}\\\\  &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &2 \\times \\bold{\\textcolor{teal}{&1}} + \\bold{\\textcolor{teal}{&1}} \\times %{10-&2} &=  10 \\times \\bold{\\textcolor{teal}{&1}}\\\\  &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}  \\bold{\\textcolor{teal}{&1}} \\times &2+ \\bold{\\textcolor{teal}{&1}} \\times %{10-&2} &=  10 \\times \\bold{\\textcolor{teal}{&1}}\\\\  &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*10}}}\\end{align}$$' },
            ],

          ],

          type: 'result',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Factorisation pour un facteur 100',
          enounces: ["Calculer"],
          expressions: [
            '&2*&1+#{100-&2}*&1',
            '&1*&2+#{100-&2}*&1',
            '&2*&1+&1*#{100-&2}',
            '&1*&2+&1*#{100-&2}',
          ],
          variables: [{ '&1': '$e[21;99]', '&2': '$e[2;98]' }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} &2 \\times \\bold{\\textcolor{teal}{&1}} + %{100-&2} \\times \\bold{\\textcolor{teal}{&1}} &=  100 \\times \\bold{\\textcolor{teal}{&1}}\\\\  &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}} \\times &2 + %{100-&2} \\times \\bold{\\textcolor{teal}{&1}} &=  100 \\times \\bold{\\textcolor{teal}{&1}}\\\\  &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &2 \\times \\bold{\\textcolor{teal}{&1}} + \\bold{\\textcolor{teal}{&1}} \\times %{100-&2} &=  100 \\times \\bold{\\textcolor{teal}{&1}}\\\\  &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}  \\bold{\\textcolor{teal}{&1}} \\times &2+ \\bold{\\textcolor{teal}{&1}} \\times %{100-&2} &=  100 \\times \\bold{\\textcolor{teal}{&1}}\\\\  &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*100}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: SIXIEME,
        },
      ],
      Décomposition: [
        {
          description: 'Décomposer un entier en produit',
          subdescription: 'Produit de deux nombres entiers',
          enounces: ["Décompose ce nombre en un produit de 2 facteurs (1 n'est pas un facteur autorisé)."],
          expressions: [
            '#{&1*&2}',
            '#{&1*4}',
            '#{&1*8}',
            '#{&1*6}',
            '#{&1*9}',
            '32',
            '36',
            '48',
            '54',
            '64',
            '72',
            '81',
          ],
          variables: [
            { '&1': '$l{2;3;5;7}', '&2': '$l{2;3;5;7}' },
            { '&1': '$l{2;3;5;7}' },
            { '&1': '$l{2;3;5;7}' },
            { '&1': '$l{2;3;5;7}' },
            { '&1': '$l{2;3;5;7}' },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          solutions: [
            ['&1*&2'],
            ['2*#{2*&1}', '4*&1'],
            ['2*#{4*&1}', '4*#{2*&1}', '8*&1'],
            ['2*#{3*&1}', '3*#{2*&1}', '6*&1'],
            ['3*#{3*&1}', '9*&1'],
            ['2*16', '4*8'],
            ['2*18', '4*9', '6*6'],
            ['2*24', '3*16', '4*12', '6*8'],
            ['2*27', '3*18', '6*9'],
            ['2*32', '4*16', '8*8'],
            ['2*36', '3*24', '4*18', '6*12', '8*9'],
            ['3*27', '9*9'],
          ],
          options: ['multiples'],
          format: '$e[2;9]*$e[2;9]',
          type: 'decomposition',
          defaultDelay: 20,
          grade: CM1,
        },
      ],
    },
    Diviser: {
      Quotient: [
        {
          description: 'Calculer un quotient entier',
          subdescription: 'Quotients associés aux tables de multiplication',
          enounces: ["Calcule."],
          expressions: ['#{&1*&2}:&2'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Calculer un quotient entier',
          subdescription: 'Le dividende est un nombre de dizaines (simple)',
          enounces: ["Calcule."],
          expressions: ['#{&1*&2*10}:&2'],
          variables: [{ '&1': '$e[3;6]', '&2': '$e[3;5]' }],
          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Calculer un quotient entier',
          subdescription: 'Le dividende est un nombre de dizaine',
          enounces: ["Calcule."],
          expressions: ['#{&1*&2*10}:&2'],
          variables: [{ '&1': '$e[3;9]', '&2': '$e[3;9]' }],
          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },
      ],
      'A trou': [
        {
          description: 'Compléter une division à trou ',
          subdescription: 'Trouver le dividende',
          enounces: ["Complète."],
          expressions: ['?:&2=&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          solutions: [['#{&1*&2}']],
          details: [['&1 \\times &2']],
          type: 'trou',
          defaultDelay: 20,
          grade: CE2,
        },
        {
          description: 'Compléter une division à trou ',
          subdescription: 'Trouver le diviseur',
          enounces: ["Complète."],
          expressions: ['#{&1*&2}:?=&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          solutions: [['&2']],
          details: [['#{&1*&2} \\div &1']],
          type: 'trou',
          defaultDelay: 20,
          grade: CE2,
        },

      ],
      'Divisibilité': [
        {
          description: 'Trouver un diviseur',
          subdescription: 'Une décomposition est donnée',
          enounces:
            ["Trouve un diviseur de $$%{&1*&2}$$ (autre que $$1$$ et $$#{&1*&2}$$), sachant que :"],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]\\{&1}' }],
          expressions: ['#{&1*&2}=&1*&2'],
          // solutions: [['&1']],
          testAnswer: ['&answer!=1 && &answer!=#{&1*&2} && mod(#{&1*&2}; &answer)=0'],
          type: 'rewrite',
          correctionFormat: [{
            correct: ['$$&solution$$ est un diviseur de $$%{&1*&2}$$'],
            uncorrect: ['<span style="color:green;">$$&1$$</span> et <span style="color:green;">$$&2$$</span> sont des diviseurs de $$%{&1*&2}$$'],
            answer: '&answer est un diviseur de $$%{&1*&2}$$'
          }],
          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: 'Trouver un diviseur',
          enounces:
            ["Trouve un diviseur de $$%{&1*&2}$$ (autre que $$1$$ et $$#{&1*&2}$$)."],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]\\{&1}' }],
          testAnswer: ['&answer!=1 && &answer!=#{&1*&2} && mod(#{&1*&2}; &answer)=0'],
          type: 'rewrite',
          correctionFormat: [{
            correct: ['&solution est un diviseur de $$%{&1*&2}$$'],
            uncorrect: ['<span style="color:green;">$$&1$$</span> et <span style="color:green;">$$&2$$</span> sont des diviseurs de $$%{&1*&2}$$'],
            answer: '&answer est un diviseur de $$%{&1*&2}$$'
          }],

          defaultDelay: 15,
          grade: CE2,
        },
        {
          description: 'Effectuer une division euclidienne ',
          enounces:
            ["Ecris l'expression correspondant à la division euclidienne de $$#{&1*&2+&3}$$ par $$&2$$."],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;10]', '&3': '$e[1;&2-1]' }],
          expressions: ['#{&1*&2+&3}'],
          solutions: [['(&1*&2)+&3']],
          options: ['no-exp'],
          type: 'decomposition',
          defaultDelay: 30,
          grade: CE2,
        },
        {
          description: 'Utiliser un critère de divisibilité',
          subdescription: 'Par 2',
          enounces:
            ["Le nombre $$%{&1}$$ est-il divisible par 2 ?"],
          variables: [{ '&1': '2*$e{3}' }, { '&1': '2*$e{3}+1' }],

          type: 'choice',
          choices: [
            [{ text: 'Oui' }, { text: 'Non' }],
          ],
          // corrections: [
          //   'Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est ',
          // ],
          solutions: [
            ['mod(&1;2)=0 ?? 0 :: 1'],
          ],
          correctionFormat: [{
            correct: ['$$2$$ est un diviseur de $$%{&1}$$ ? &solution'],
            uncorrect: ['$$2$$ est un diviseur de $$%{&1}$$ ? &solution'],
            answer: ' &answer'
          }],
          options: ['no-shuffle-choices'],
          defaultDelay: 10,
          grade: CM1,
        },
        {
          description: 'Utiliser un critère de divisibilité',
          subdescription: 'Par 5',
          enounces:
            ["Le nombre $$%{&1}$$ est-il divisible par 5 ?"],
          variables: [{ '&1': '5*$e{3}' }, { '&1': '5*$e{5}+$e[1;4]' }],

          type: 'choice',
          choices: [
            [{ text: 'Oui' }, { text: 'Non' }],
          ],
          // corrections: [
          //   'Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est ',
          // ],
          solutions: [
            ['mod(&1;5)=0 ?? 0 :: 1'],
          ],
          correctionFormat: [{
            correct: ['$$5$$ est un diviseur de $$%{&1}$$ ? &solution'],
            uncorrect: ['$$5$$ est un diviseur de $$%{&1}$$ ? &solution'],
            answer: ' &answer'
          }],
          options: ['no-shuffle-choices'],
          defaultDelay: 10,
          grade: CM1,
        },
        {
          description: 'Utiliser un critère de divisibilité',
          subdescription: 'Par 10',
          enounces:
            ["Le nombre $$%{&1}$$ est-il divisible par 10 ?"],
          variables: [{ '&1': '10*$e{3}' }, { '&1': '10*$e{5}+$e[1;9]' }],

          type: 'choice',
          choices: [
            [{ text: 'Oui' }, { text: 'Non' }],
          ],
          // corrections: [
          //   'Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est ',
          // ],
          solutions: [
            ['mod(&1;10)=0 ?? 0 :: 1'],
          ],
          correctionFormat: [{
            correct: ['$$10$$ est un diviseur de $$%{&1}$$ ? &solution'],
            uncorrect: ['$$10$$ est un diviseur de $$%{&1}$$ ? &solution'],
            answer: ' &answer'
          }],
          options: ['no-shuffle-choices'],
          defaultDelay: 30,
          grade: CM1,
        },
        {
          description: 'Utiliser un critère de divisibilité',
          subdescription: 'Par 3',
          enounces:
            ["Le nombre $$%{&1}$$ est-il divisible par 3 ?"],
          variables: [{ '&1': '3*$e[21;333]' }, { '&1': '3*$e[21;332]+$e[1;2]' }],

          type: 'choice',
          choices: [
            [{ text: 'Oui' }, { text: 'Non' }],
          ],
          // corrections: [
          //   'Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est ',
          // ],
          solutions: [
            ['mod(&1;3)=0 ?? 0 :: 1'],
          ],
          correctionFormat: [{
            correct: ['$$3$$ est un diviseur de $$%{&1}$$ ? &solution'],
            uncorrect: ['$$3$$ est un diviseur de $$%{&1}$$ ? &solution'],
            answer: ' &answer'
          }],
          options: ['no-shuffle-choices'],
          defaultDelay: 15,
          grade: CM2,
        },
        {
          description: 'Utiliser un critère de divisibilité',
          subdescription: 'Par 9',
          enounces:
            ["Le nombre $$%{&1}$$ est-il divisible par 3 ?"],
          variables: [{ '&1': '9*$e[21;333]' }, { '&1': '9*$e[21;110]+$e[1;8]' }],

          type: 'choice',
          choices: [
            [{ text: 'Oui' }, { text: 'Non' }],
          ],
          // corrections: [
          //   'Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est ',
          // ],
          solutions: [
            ['mod(&1;9)=0 ?? 0 :: 1'],
          ],
          correctionFormat: [{
            correct: ['$$9$$ est un diviseur de $$%{&1}$$ ? &solution'],
            uncorrect: ['$$9$$ est un diviseur de $$%{&1}$$ ? &solution'],
            answer: ' &answer'
          }],
          options: ['no-shuffle-choices'],
          defaultDelay: 15,
          grade: CM2,
        },





      ],
    },
    'Priorités opératoires': {
      'Avec parenthèses': [
        {
          description: 'Calculer une expression avec parenthèses',
          subdescription: 'Un niveau de parenthèse',
          enounces: ["Calcule."],
          expressions: [
            '(&1+&2)*&3',
            '&3*(&1+&2)',
            '(&1-&2)*&3',
            '&3*(&1-&2)',
            '(#{&1*&3}+#{&2*&3}):&3',
            '(#{&1*&3}-#{&2*&3}):&3',
            '#{(&1+&2)*&3}:(&1+&2)',
            '#{&1+&2+&3}-(&1+&2)',
          ],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;11-&1]', '&3': '$e[2;9]' },
            { '&1': '$e[2;9]', '&2': '$e[2;11-&1]', '&3': '$e[2;9]' },
            { '&1': '$e[4;9]', '&2': '$e[2;&1-2]', '&3': '$e[2;9]' },
            { '&1': '$e[4;9]', '&2': '$e[2;&1-2]', '&3': '$e[2;9]' },
            { '&1': '$e[1;9]', '&2': '$e[1;10-&1]', '&3': '$e[2;9]' },
            { '&1': '$e[3;9]', '&2': '$e[1;&1-2]', '&3': '$e[2;9]' },
            { '&1': '$e[1;8]', '&2': '$e[1;9-&1]', '&3': '$e[2;9]' },
            { '&1': '$e[1;9]', '&2': '$e[1;9]', '&3': '$e[1;9]' },


          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\left( &1 \\bold{\\textcolor{teal}{\\large{+}}} &2 \\right) \\times &3  &=  %{&1+&2} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1+&2)*&3}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &3 \\times \\left( &1 \\bold{\\textcolor{teal}{\\large{+}}} &2 \\right) &=  &3 \\times %{&1+&2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1+&2)*&3}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\left( &1 \\bold{\\textcolor{teal}{\\large{-}}} &2 \\right) \\times &3  &=  %{&1-&2} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1-&2)*&3}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &3 \\times \\left( &1 \\bold{\\textcolor{teal}{\\large{-}}} &2 \\right) &=  &3 \\times %{&1-&2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1-&2)*&3}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\left( %{&1*&3} \\bold{\\textcolor{teal}{\\large{+}}} #{&2*&3} \\right) \\div &3  &=  %{(&1+&2)*&3} \\div &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1+&2}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\left( %{&1*&3} \\bold{\\textcolor{teal}{\\large{-}}} #{&2*&3} \\right) \\div &3  &=  %{(&1-&2)*&3} \\div &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1-&2}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}  %{(&1+&2)*&3} \\div \\left( &1 \\bold{\\textcolor{teal}{\\large{+}}} &2 \\right) &= %{(&1+&2)*&3} \\div %{&1+&2}   \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&3}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} %{&1+&2+&3} - \\left( &1\\bold{\\textcolor{teal}{\\large{+}}} &2 \\right)  &= %{&1+&2+&3} - %{&1+&2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3}}}\\end{align}$$' },
            ],



          ],
          type: 'result',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: 'Calculer une expression avec parenthèses',
          subdescription: '2 expressions parenthèsées (imbriquées ou non)',
          enounces: ["Calcule."],
          expressions: [
            '(&1+&2)*(&3+&4)',
            '(&1-&2)*(&3+&4)',
            '&4*((#{&1*&3}+#{&2*&3}):&3)'
          ],
          variables: [
            { '&1': '$e[2;7]', '&2': '$e[2;9-&1]', '&3': '$e[2;7]', '&4': '$e[2;9-&3]' },
            { '&1': '$e[4;9]', '&2': '$e[2;&1-2]', '&3': '$e[2;7]', '&4': '$e[2;9-&3]' },
            { '&1': '$e[2;7]', '&2': '$e[2;9-&1]', '&3': '$e[2;9]', '&4': '$e[2;9]' },

          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\left( &1 \\bold{\\textcolor{teal}{\\large{+}}} &2 \\right) \\times \\left( &3 \\bold{\\textcolor{teal}{\\large{+}}} &4 \\right) &=  %{&1+&2} \\times %{&3+&4} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1+&2)*(&3+&4)}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\left( &1 \\bold{\\textcolor{teal}{\\large{-}}} &2 \\right) \\times \\left( &3 \\bold{\\textcolor{teal}{\\large{+}}} &4 \\right) &=  %{&1-&2} \\times %{&3+&4} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1-&2)*(&3+&4)}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}   &4 \\times \\left( \\left(%{&1*&3} \\bold{\\textcolor{teal}{\\large{+}}} %{&2*&3} \\right) \\div &3 \\right)  &= &4 \\times \\left( %{&1*&3+&2*&3} \\bold{\\textcolor{teal}{\\large{\\div}}} &3 \\right)   \\\\ &=  &4 \\times %{&1+&2}  \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1+&2)*&4}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: SIXIEME,
        },
      ],
      'Sans parenthèses': [
        {
          description: 'Calculer une expression sans parenthèses',
          subdescription: "Priorité de la multiplication et de la division sur l'addition et la soustraction",
          enounces: ["Calcule."],
          expressions: [
            '&1+&2*&3',
            '&2*&3+&1',
            '#{&1*&2+&3}-&1*&2',
            '#{&2+&4}-#{&2*&3}:&3',
            '&1+#{&2*&3}:&3',
            '#{&2*&3}:&3+&1',
          ],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]' },
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]' },
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]' },
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]', '&4': '$e[2;9]' },
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]' },
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]' },
          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align}  &1 +  &2 \\bold{\\textcolor{teal}{\\large{\\times}}} &3 &=  &1 +  %{&2*&3} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1+&2*&3}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}  &2 \\bold{\\textcolor{teal}{\\large{\\times}}} &3 + &1 &=   %{&2*&3} + &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1+&2*&3}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}  %{&1*&2+&3} - &1 \\bold{\\textcolor{teal}{\\large{\\times}}} &2 &=  %{&1*&2+&3} - %{&1*&2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&3}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}  %{&2+&4} - %{&2*&3} \\bold{\\textcolor{teal}{\\large{\\div}}} &3 &=  %{&2+&4} - &2 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&4}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}  &1+ %{&2*&3} \\bold{\\textcolor{teal}{\\large{\\div}}} &3 &=  &1 + &2 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1+&2}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}   %{&2*&3} \\bold{\\textcolor{teal}{\\large{\\div}}} &3 + &1 &=  &2 + &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1+&2}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Calculer une expression sans parenthèses',
          subdescription: 'Même priorité',
          enounces: ["Calcule."],
          expressions: [
            '#{&1*&2}:&1*&3',
            '&3-&1+&2',
          ],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]' },
            { '&1': '$e[2;8]', '&2': '$e[2;9]', '&3': '$e[&1+1;9]' },
          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align}  %{&1*&2} \\bold{\\textcolor{teal}{\\large{\\div}}} &1 \\times &3 &=  &2 \\times &3\\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&3}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}  &3 \\bold{\\textcolor{teal}{\\large{-}}} &1 + &2  &=  %{&3-&1} + &2 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3-&1+&2}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Calculer une expression sans parenthèses',
          subdescription: 'Cas général',
          enounces: ["Calcule."],
          expressions: [
            '&1*&2+&3*&4',
            '&1*&2+#{&3*&4}:&4',
            '#{&3*&4}:&4+&1*&2',
            '#{&3*&4}:&4+#{&1*&2}:&2',
            '#{&1+1}*#{&2+1}-&1*&2',
          ],
          variables: [
            { '&1': '$e[2;5]', '&2': '$e[2;9]', '&3': '$e[2;9]', '&4': '$e[2;9]' },
            { '&1': '$e[2;5]', '&2': '$e[2;9]', '&3': '$e[2;9]', '&4': '$e[2;9]' },
            { '&1': '$e[2;5]', '&2': '$e[2;9]', '&3': '$e[2;9]', '&4': '$e[2;9]' },
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]', '&4': '$e[2;9]' },
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]', '&4': '$e[2;9]' },
            // { '&1': '$e[2;8]', '&2': '$e[2;8]', },

          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align}  &1 \\bold{\\textcolor{teal}{\\large{\\times}}} &2 + &3 \\bold{\\textcolor{teal}{\\large{\\times}}} &4 &=  %{&1*&2} + %{&3*&4} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2+&3*&4}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}  &1 \\bold{\\textcolor{teal}{\\large{\\times}}} &2 + %{&3*&4} \\bold{\\textcolor{teal}{\\large{\\div}}} &4 &= %{&1*&2}+&3\\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2+&3}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}  %{&3*&4} \\bold{\\textcolor{teal}{\\large{\\div}}} &4 + &1 \\bold{\\textcolor{teal}{\\large{\\times}}} &2 &= &3+%{&1*&2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2+&3}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}  %{&3*&4} \\bold{\\textcolor{teal}{\\large{\\div}}} &4 + %{&1*&2}\\bold{\\textcolor{teal}{\\large{\\div}}} &2 &= &3+&1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1+&3}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align}  %{&1+1} \\bold{\\textcolor{teal}{\\large{\\times}}} %{&2+1} - &1 \\bold{\\textcolor{teal}{\\large{\\times}}} &2 &= %{(&1+1)*(&2+1)}-%{&1*&2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1+&2+1}}}\\end{align}$$' },
            ],




          ],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
      ]
    },
    Vocabulaire: {
      Traduire: [
        {
          description: 'Traduire une phrase en expression mathématique',
          enounces: [
            'Traduis cette phrase par une expression mathématique : la somme de $$&1$$ et de $$&2$$',
            'Traduis cette phrase par une expression mathématique : le produit de $$&1$$ par $$&2$$',
            'Traduis cette phrase par une expression mathématique : la différence entre $$&1$$ et $$&2$$',
            'Traduis cette phrase par une expression mathématique : le quotient de $$&1$$ par de $$&2$$',

          ],
          options: ['no-exp'],
          variables: [{
            '&1': '$e[3;9]',
            '&2': '$e[2;&1-1]\\{&1}',
          }
          ],
          expressions: [
            '&1+&2',
            '&1*&2',
            '&1-&2',
            '&1:&2',
          ],
          solutions: [
            ['&1+&2'],
            ['&1*&2'],
            ['&1-&2'],
            ['&1:&2', '&1/&2'],
          ],
          correctionFormat: [{
            correct: ["La somme de $$&1$$ et de $$&2$$ s'écrit &solution"],
            uncorrect: ["La somme de $$&1$$ et de $$&2$$ s'écrit &solution"],
            answer: "L'expression est &answer."
          }
            , {
            correct: ["Le produit de $$&1$$ par $$&2$$ s'écrit &solution"],
            uncorrect: ["Le produit de $$&1$$ par $$&2$$ s'écrit &solution"],
            answer: "L'expression est &answer."
          },
          {
            correct: ["La différence entre $$&1$$ et $$&2$$ s'écrit &solution"],
            uncorrect: ["La différence entre $$&1$$ et $$&2$$ s'écrit &solution"],
            answer: "L'expression est &answer."
          }
            , {
            correct: ["Le quotient de $$&1$$ par $$&2$$ s'écrit &solution"],
            uncorrect: ["Le quotient de $$&1$$ par $$&2$$ s'écrit &solution"],
            answer: "L'expression est &answer."
          }],

          type: 'enonce',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: 'Traduire une phrase en expression mathématique',
          enounces: [
            'Traduis cette phrase par une expression mathématique : la somme du produit de $$&1$$ par $$&3$$ et de $$&2$$',
            'Traduis cette phrase par une expression mathématique : le produit de $$&1$$ par la différence  entre $$&2$$ et $$&3$$',
            'Traduis cette phrase par une expression mathématique : la différence entre $$&1$$ et le quotient de $$&2$$ par $$&3$$',
            'Traduis cette phrase par une expression mathématique : le quotient de la somme $$&1$$ et de $$&3$$ par $$&2$$',

          ],
          options: ['no-exp'],
          variables: [{
            '&1': '$e[2;9]',
            '&2': '$e[2;9]\\{&1}',
            '&3': '$e[2;&2-1]\\{&1}',
          }
          ],
          expressions: [
            '&1*&3+&2',
            '&1*(&2-&3)',
            '&1-&2:&3',
            '(&1+&3):&2',
          ],
          solutions: [
            ['&1*&3+&2'],
            ['&1*(&2-&3)'],
            ['&1-&2:&3'],
            ['(&1+&3):&2'],
          ],
          correctionFormat: [{
            correct: ["La somme du produit de $$&1$$ par $$&3$$ et de $$&2$$ s'écrit &solution"],
            uncorrect: ["La somme du produit de $$&1$$ par $$&3$$ et de $$&2$$ s'écrit &solution"],
            answer: "L'expression est &answer."
          },
          {
            correct: ["Le produit de $$&1$$ par la différence  entre $$&2$$ et $$&3$$ s'écrit &solution"],
            uncorrect: ["Le produit de $$&1$$ par la différence  entre $$&2$$ et $$&3$$ s'écrit &solution"],
            answer: "L'expression est &answer."
          },
          {
            correct: ["La différence entre $$&1$$ et le quotient de $$&2$$ par $$&3$$ s'écrit &solution"],
            uncorrect: ["La différence entre $$&1$$ et le quotient de $$&2$$ par $$&3$$ s'écrit &solution"],
            answer: "L'expression est &answer."
          },
          {
            correct: ["Le quotient de la somme $$&1$$ et de $$&3$$ par $$&2$$ s'écrit &solution"],
            uncorrect: ["Le quotient de la somme $$&1$$ et de $$&3$$ par $$&2$$ s'écrit &solution"],
            answer: "L'expression est &answer."
          },
          ],
          type: 'enonce',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
      ]
    }
  },
  Décimaux: {
    Apprivoiser: {
      Ecriture: [
        {
          description: "Connaître la position décimale",
          subdescription: "Des unités jusqu'aux centièmes",
          enounces: [
            "Quel est le chiffre des <b>centièmes</b> dans le nombre $$%%{&4}$$ ?",
            "Quel est le chiffre des <b>dizièmes</b> dans le nombre $$%%{&4}$$ ?",
            "Quel est le chiffre des <b>unités</b> dans le nombre $$%%{&4}$$ ?"
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]\\{&1}',
              '&3': '$e[0;9]\\{&1;&2}',
              '&4': '##{&1*0,01+&2*0,1+&3}',
            },

          ],
          solutions: [['&1'], ['&2'], ['&3'],],
          correctionFormat: [
            {
              correct: ['Dans $$%%{&4}$$ le chiffre des centièmes est &solution.'],
              uncorrect: ['Dans $$%%{&4}$$ le chiffre des centièmes est &solution.'],
              answer: 'Le chiffre des centièmes est &answer.'
            },
            {
              correct: ['Dans $$%%{&4}$$ le chiffre des dizièmes est &solution.'],
              uncorrect: ['Dans $$%%{&4}$$ le chiffre des dizièmes est &solution.'],
              answer: 'Le chiffre des dizièmes est &answer.'
            },
            {
              correct: ['Dans $$%%{&4}$$ le chiffre des unités est &solution.'],
              uncorrect: ['Dans $$%%{&4}$$ le chiffre des unités est &solution.'],
              answer: 'Le chiffre des unités est &answer.'
            }
          ],
          type: 'rewrite',
          defaultDelay: 10,
          grade: CM1,
        },
        {
          description: "Connaître la position décimale",
          subdescription: "Des centaines jusqu'aux centièmes",
          enounces: [
            "Quel est le chiffre des <b>centièmes</b> dans le nombre $$%%{&6}$$ ?",
            "Quel est le chiffre des <b>dizièmes</b> dans le nombre $$%%{&6}$$ ?",
            "Quel est le chiffre des <b>unités</b> dans le nombre $$%%{&6}$$ ?",
            "Quel est le chiffre des <b>dizaines</b> dans le nombre $$%%{&6}$$ ?",
            "Quel est le chiffre des <b>centaines</b> dans le nombre $$%%{&6}$$ ?",
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]\\{&1}',
              '&3': '$e[0;9]\\{&1;&2}',
              '&4': '$e[0;9]\\{&1;&2;&3}',
              '&5': '$e[0;9]\\{&1;&2;&3;&4}',
              '&6': '##{&1*0,01+&2*0,1+&3+&4*10+&5*100}',
            },

          ],
          solutions: [['&1'], ['&2'], ['&3'], ['&4'], ['&5'],],
          correctionFormat: [
            {
              correct: ['Dans $$%%{&6}$$ le chiffre des centièmes est &solution.'],
              uncorrect: ['Dans $$%%{&6}$$ le chiffre des centièmes est &solution.'],
              answer: 'Le chiffre des centièmes est &answer.'
            },
            {
              correct: ['Dans $$%%{&6}$$ le chiffre des dizièmes est &solution.'],
              uncorrect: ['Dans $$%%{&6}$$ le chiffre des dizièmes est &solution.'],
              answer: 'Le chiffre des dizièmes est &answer.'
            },
            {
              correct: ['Dans $$%%{&6}$$ le chiffre des unités est &solution.'],
              uncorrect: ['Dans $$%%{&6}$$ le chiffre des unités est &solution.'],
              answer: 'Le chiffre des unités est &answer.'
            },
            {
              correct: ['Dans $$%%{&6}$$ le chiffre des dizaines est &solution.'],
              uncorrect: ['Dans $$%%{&6}$$ le chiffre des dizaines est &solution.'],
              answer: 'Le chiffre des dizaines est &answer.'
            },
            {
              correct: ['Dans $$%%{&6}$$ le chiffre des centaines est &solution.'],
              uncorrect: ['Dans $$%%{&6}$$ le chiffre des centaines est &solution.'],
              answer: 'Le chiffre des centaines est &answer.'
            }
          ],
          type: 'rewrite',
          defaultDelay: 10,
          grade: CM1,
        },
        {
          description: "Définition à l'aide de fractions décimales",
          subdescription: "Jusqu'au centièmes",
          enounces: ['Quel est le nombre décimal représenté par cette expression ?'],
          variables: [
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '0',
              '&3': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '0',
            },
          ],
          expressions: ['&1+&2/10+&3/100'],
          options: ['remove-null-terms'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: "Définition à l'aide de fractions décimales",
          subdescription: "Jusqu'au centièmes (mélangée)",
          enounces: ['Quel est le nombre décimal représenté par cette expression ?'],
          variables: [
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '0',
              '&3': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '0',
            },
          ],
          expressions: ['&1+&2/10+&3/100'],
          options: ['remove-null-terms', 'shuffle-terms'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: "Définition à l'aide de fractions décimales (2)",
          subdescription: "Jusqu'au centièmes",
          enounces: ['Quel est le nombre décimal représenté par cette expression ?'],
          variables: [
            {
              '&1': '$e{1;1}',
              '&2': '$e[1;2]',
              '&3': '$e{&2;&2}',
              '&4': '&1+&3/100',
            },

          ],
          expressions: ['&4'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 10,
          grade: CM1,
        },
        {
          description: "Connaître la position décimale",
          subdescription: "Des unités jusqu'aux millièmes",
          enounces: [
            "Quel est le chiffre des <b>millièmes</b> dans le nombre $$%%{&5}$$ ?",
            "Quel est le chiffre des <b>centièmes</b> dans le nombre $$%%{&5}$$ ?",
            "Quel est le chiffre des <b>dizièmes</b> dans le nombre $$%%{&5}$$ ?",
            "Quel est le chiffre des <b>unités</b> dans le nombre $$%%{&5}$$ ?"
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]\\{&1}',
              '&3': '$e[0;9]\\{&1;&2}',
              '&4': '$e[0;9]\\{&1;&2;&3}',
              '&5': '##{&1*0,001+&2*0,01+&3*0,1+&4}',
            },

          ],
          solutions: [['&1'], ['&2'], ['&3'], ['&4'],],
          correctionFormat: [
            {
              correct: ['Dans $$%%{&5}$$ le chiffre des millièmes est &solution.'],
              uncorrect: ['Dans $$%%{&5}$$ le chiffre des millièmes est &solution.'],
              answer: 'Le chiffre des millièmes est &answer.'
            },
            {
              correct: ['Dans $$%%{&5}$$ le chiffre des centièmes est &solution.'],
              uncorrect: ['Dans $$%%{&5}$$ le chiffre des centièmes est &solution.'],
              answer: 'Le chiffre des centièmes est &answer.'
            },
            {
              correct: ['Dans $$%%{&5}$$ le chiffre des dizièmes est &solution.'],
              uncorrect: ['Dans $$%%{&5}$$ le chiffre des dizièmes est &solution.'],
              answer: 'Le chiffre des dizièmes est &answer.'
            },
            {
              correct: ['Dans $$%%{&5}$$ le chiffre des unités est &solution.'],
              uncorrect: ['Dans $$%%{&5}$$ le chiffre des unités est &solution.'],
              answer: 'Le chiffre des unités est &answer.'
            }
          ],
          type: 'rewrite',
          defaultDelay: 10,
          grade: CM2,
        },
        {
          description: "Connaître la position décimale",
          subdescription: "Des milliers jusqu'aux millièmes",
          enounces: [
            "Quel est le chiffre des <b>millièmes</b> dans le nombre $$%%{&8}$$ ?",
            "Quel est le chiffre des <b>centièmes</b> dans le nombre $$%%{&8}$$ ?",
            "Quel est le chiffre des <b>dizièmes</b> dans le nombre $$%%{&8}$$ ?",
            "Quel est le chiffre des <b>unités</b> dans le nombre $$%%{&8}$$ ?",
            "Quel est le chiffre des <b>dizaines</b> dans le nombre $$%%{&8}$$ ?",
            "Quel est le chiffre des <b>centaines</b> dans le nombre $$%%{&8}$$ ?",
            "Quel est le chiffre des <b>milliers</b> dans le nombre $$%%{&8}$$ ?",
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[0;9]\\{&1}',
              '&3': '$e[0;9]\\{&1;&2}',
              '&4': '$e[0;9]\\{&1;&2;&3}',
              '&5': '$e[0;9]\\{&1;&2;&3;&4}',
              '&6': '$e[0;9]\\{&1;&2;&3;&4;&5}',
              '&7': '$e[0;9]\\{&1;&2;&3;&4;&5;&6}',
              '&8': '##{&1*0,001+&2*0,01+&3*0,1+&4+&5*10+&6*100+&7*1000}',
            },

          ],
          solutions: [['&1'], ['&2'], ['&3'], ['&4'], ['&5'], ['&6'], ['&7'],],
          correctionFormat: [
            {
              correct: ['Dans $$%%{&8}$$ le chiffre des millièmes est &solution.'],
              uncorrect: ['Dans $$%%{&8}$$ le chiffre des millièmes est &solution.'],
              answer: 'Le chiffre des millièmes est &answer.'
            },
            {
              correct: ['Dans $$%%{&8}$$ le chiffre des centièmes est &solution.'],
              uncorrect: ['Dans $$%%{&8}$$ le chiffre des centièmes est &solution.'],
              answer: 'Le chiffre des centièmes est &answer.'
            },
            {
              correct: ['Dans $$%%{&8}$$ le chiffre des dizièmes est &solution.'],
              uncorrect: ['Dans $$%%{&8}$$ le chiffre des dizièmes est &solution.'],
              answer: 'Le chiffre des dizièmes est &answer.'
            },
            {
              correct: ['Dans $$%%{&8}$$ le chiffre des unités est &solution.'],
              uncorrect: ['Dans $$%%{&8}$$ le chiffre des unités est &solution.'],
              answer: 'Le chiffre des unités est &answer.'
            },
            {
              correct: ['Dans $$%%{&8}$$ le chiffre des dizaines est &solution.'],
              uncorrect: ['Dans $$%%{&8}$$ le chiffre des dizaines est &solution.'],
              answer: 'Le chiffre des dizaines est &answer.'
            },
            {
              correct: ['Dans $$%%{&8}$$ le chiffre des centaines est &solution.'],
              uncorrect: ['Dans $$%%{&8}$$ le chiffre des centaines est &solution.'],
              answer: 'Le chiffre des centaines est &answer.'
            },
            {
              correct: ['Dans $$%%{&8}$$ le chiffre des milliers est &solution.'],
              uncorrect: ['Dans $$%%{&8}$$ le chiffre des milliers est &solution.'],
              answer: 'Le chiffre des milliers est &answer.'
            },
          ],
          type: 'rewrite',
          defaultDelay: 10,
          grade: CM2,
        },
        {
          description: "Définition à l'aide de fractions décimales",
          subdescription: "Jusqu'aux millièmes",
          enounces: ['Quel est le nombre décimal représenté par cette expression ?'],
          variables: [
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '$e{1;1}',
              '&4': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '0',
              '&3': '$e{1;1}',
              '&4': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '0',
              '&4': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '0',
              '&3': '0',
              '&4': '$e{1;1}',
            },
          ],
          expressions: ['&1+&2/10+&3/100+&4/1000'],
          type: 'result',
          options: ['remove-null-terms'],
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: "Définition à l'aide de fractions décimales",
          subdescription: "Jusqu'aux millièmes (mélangée)",
          enounces: ['Quel est le nombre décimal représenté par cette expression ?'],
          variables: [
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '$e{1;1}',
              '&4': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '0',
              '&3': '$e{1;1}',
              '&4': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '0',
              '&4': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '0',
              '&3': '0',
              '&4': '$e{1;1}',
            },
          ],
          expressions: ['&1+&2/10+&3/100+&4/1000'],
          type: 'result',
          options: ['remove-null-terms', 'shuffle-terms'],
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: "Définition à l'aide de fractions décimales (2)",
          subdescription: "Jusqu'aux millièmes",
          enounces: ['Quel est le nombre décimal représenté par cette expression ?'],
          variables: [
            {
              '&1': '$e{1;1}',
              '&2': '$e[1;3]',
              '&3': '$e{&2;&2}',
              '&4': '&1+&3/1000',
            },

          ],
          expressions: ['&4'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 10,
          grade: CM2,
        },
      ],
      Décomposition: [
        {
          description: "Décomposer en unités, dixièmes, centièmes",
          subdescription: "avec décimaux",
          enounces: ['Décompose comme dans cet exemple : $$5,34=5+0,3+0,04$$.'],
          variables: [
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '$e{1;1}',
            },
          ],
          expressions: ['##{&1+&2/10+&3/100}'],
          solutions: [['&1+##{&2*0,1}+##{&3*0,01}']],
          options: ['no-penalty-for-null-terms'],
          type: 'decomposition',
          defaultDelay: 25,
          grade: CM1,
        },
        {
          description: "Décomposer en unités, dixièmes, centièmes",
          subdescription: "avec fractions décimales",
          enounces: ['Décomposer comme dans cet exemple : $$5,34=5+\\dfrac{3}{10}+\\dfrac{4}{100}$$.'],
          variables: [
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '0',
              '&3': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '0',
            },
          ],
          expressions: ['##{&1+&2/10+&3/100}'],
          solutions: [['&1+&2/10+&3/100']],
          options: ['no-penalty-for-null-terms',
            'no-penalty-for-extraneous-brackets',
            'no-penalty-for-factor-zero',
            'no-penalty-for-factor-one'],
          type: 'decomposition',

          defaultDelay: 25,
          grade: CM1,
        },
        {
          description: "Décomposer en unités, dixièmes, centièmes, millièmes",
          subdescription: "avec décimaux",
          enounces: ['Décompose comme dans cet exemple : $$5,346=5+0,3+0,04+0,006$$.'],
          variables: [
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '$e{1;1}',
              '&4': '$e{1;1}',
            },

          ],
          expressions: ['##{&1+&2/10+&3/100+&4/1000}'],
          solutions: [['&1+##{&2*0,1}+##{&3*0,01}+##{&4*0,001}']],
          options: ['no-penalty-for-null-terms'],
          type: 'decomposition',

          defaultDelay: 30,
          grade: CM2,
        },
        {
          description: "Décomposer en unités, dixièmes, centièmes, millièmes",
          subdescription: "avec des fractions décimales",
          enounces: ['Décomposer comme dans cet exemple : $$5,346=5+\\dfrac{3}{10}+\\dfrac{4}{100}+\\dfrac{6}{1000}$$.'],
          variables: [
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '$e{1;1}',
              '&4': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '0',
              '&3': '$e{1;1}',
              '&4': '$e{1;1}',
            },
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '0',
              '&4': '$e{1;1}',
            },
          ],
          expressions: ['##{&1+&2/10+&3/100+&4/1000}'],
          solutions: [['&1+&2/10+&3/100+&4/1000']],
          options: ['no-penalty-for-null-terms',
            'no-penalty-for-extraneous-brackets',
            'no-penalty-for-factor-zero',
            'no-penalty-for-factor-one'],
          type: 'decomposition',

          defaultDelay: 30,
          grade: CM2,
        },
      ],
      'Forme fractionnaire': [
        {
          description: 'Déterminer une forme fractionnaire',
          enounces: ['Réécris ce nombre décimal sous forme fractionnaire.'],
          expressions: ['##{&2/&1}'],
          variables: [{ '&1': '$l{2;4;5;10}', '&2': '$e[1;&1-1]' }],
          type: 'result',
          defaultDelay: 20,
          // TODO: autoriser fraction non simplifiée
          grade: SIXIEME,
        },

      ],
      'Comparer': [
        {
          description: "Trouver le plus entier supérieur",
          enounces: ["Quel est le plus entier supérieur à $$%%{&3}$$ ?"],
          variables: [

            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '&1+&2*0,1',
            },
          ],
          solutions: [['#{&1+1}']],

          correctionFormat: [{
            correct: ['Le plus entier supérieur à $$%%{&3}$$ est &answer'],
            uncorrect: ['Le plus entier supérieur à $$%%{&3}$$ est &solution'],
            answer: 'Le plus petit entier est &answer'
          }],
          type: 'rewrite',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: "Comparer deux nombres entiers",
          enounces: ["Quel est le plus petit de ces 2 nombres ?"],
          variables: [
            // {
            //   '&1': '$e[0;2]', // nombre de chiffres identiques
            //   '&2': '$e[3-&1;4-&1]', // nombre de chiffres différents
            //   '&3': '$e{&1;&1}', //partie identique
            //   '&4': '$e{&2;&2}', // parties différentes
            //   '&5': '$e{&2;&2}',
            //   '&6': '$e[1;2]',  // nombre de décimales
            //   '&7': '##{(&4+&3*10^&2)/10^&6}',
            //   '&8': '##{(&5+&3*10^&2)/10^&6}',
            // },
            {
              '&1': '$e[1;2]', // nombre de chiffres identiques
              '&2': '$e[1;2]', // nombre de chiffres différents
              '&3': '$e{&1;&1}', //partie identique
              '&4': '$e{&2;&2}', // parties différentes
              '&5': '$e{&2;&2}',

              '&7': '##{(&4+&3*10^&2)/10^&2}',
              '&8': '##{(&5+&3*10^&2)/10^&2}',
            },
            {
              '&1': '$e[1;2]', // nombre de chiffres identiques
              '&2': '$e{&1;&1}', //partie identique
              '&3': '$e{1;1}', // parties différentes
              '&4': '$e{2;2}',

              '&7': '##{(&3+&2*10)/10}',
              '&8': '##{(&4+&2*100)/100}',
            },
          ],
          conditions: ['&7!=&8'],
          choices: [
            [{ text: '$$%%{&7}$$' }, { text: '$$%%{&8}$$' }],
          ],
          correctionFormat: [{
            correct: ['Entre $$%%{&7}$$ et $$%%{&8}$$ le plus petit est &solution'],
            uncorrect: ['Entre $$%%{&7}$$ et $$%%{&8}$$ le plus petit est &solution'],
            answer: 'Le plus petit est &answer'
          }],
          solutions: [
            ['&7<&8 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 20,
          grade: CM1,
        },
      ]
    },
    Additionner: {
      Somme: [
        {
          description: 'Calculer une somme ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (pas de retenue)',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[1;8]',
              '&2': '$e[1;8]',
              '&3': '&1.&2',
              '&4': '$e[1;9-&1]',
              '&5': '$e[1;9-&2]',
              '&6': '&4.&5',
            },
          ],
          expressions: ['&3+&6'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Parties décimales à 1 et 2 chiffres (pas de retenue)',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[1;8]',
              '&2': '$e[1;8]',
              '&3': '&1.&2',
              '&4': '$e[1;9-&1]',
              '&5': '$e[1;9-&2]',
              '&6': '$e[1;9-&2]',
              '&7': '&4.&5&6',
            },
          ],
          expressions: ['&3+&7', '&7+&3'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenue pour la partie decimale)',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[1;7]',
              '&2': '$e[2;9]',
              '&3': '&1.&2',
              '&4': '$e[1;8-&1]',
              '&5': '$e[10-&2;9]',
              '&6': '&4.&5',
            },
          ],
          expressions: ['&3+&6'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenues)',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '&1.&2',
              '&4': '$e[10-&1;9]',
              '&5': '$e[10-&2;9]',
              '&6': '&4.&5',
            },
          ],
          expressions: ['&3+&6'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
      ],
      'A trou': [
        {
          description: 'Trouver le complément ',
          subdescription:
            "A l'entier supérieur",
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$d{0;$e[1;2]}',
            },
          ],
          expressions: ['?+##{&1-&2}=&1', '##{&1-&2}+?=&1'],
          type: 'trou',
          solutions: [['&2']],
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Compléter une addition à trou ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (pas de retenue)',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[1;8]',
              '&2': '$e[1;8]',
              '&3': '&1.&2',
              '&4': '$e[1;9-&1]',
              '&5': '$e[1;9-&2]',
              '&6': '&4.&5',
            },
          ],
          expressions: ['&3+?=##{&3+&6}', '?+&3=##{&3+&6}'],
          type: 'trou',
          solutions: [['&6']],
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription:
            'Parties décimales à 1 et 2 chiffres (pas de retenue)',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[1;8]',
              '&2': '$e[1;8]',
              '&3': '&1.&2',
              '&4': '$e[1;9-&1]',
              '&5': '$e[1;9-&2]',
              '&6': '$e[1;9-&2]',
              '&7': '&4.&5&6',
            },
          ],
          expressions: ['&3+?=##{&7+&3}', '?+&3=##{&7+&3}'],
          solutions: [['&7']],
          type: 'trou',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenue pour la partie decimale)',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[1;7]',
              '&2': '$e[2;9]',
              '&3': '&1.&2',
              '&4': '$e[1;8-&1]',
              '&5': '$e[10-&2;9]',
              '&6': '&4.&5',
            },
          ],
          expressions: ['&3+?=##{&6+&3}', '?+&3=##{&6+&3}'],
          type: 'trou',
          solutions: [['&6']],
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenues)',
          enounces: ['Complète'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '&1.&2',
              '&4': '$e[10-&1;9]',
              '&5': '$e[10-&2;9]',
              '&6': '&4.&5',
            },
          ],
          expressions: ['&3+?=##{&6+&3}', '?+&3=##{&6+&3}'],
          solutions: [['&6']],
          type: 'trou',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
      ],
      'Somme astucieuse': [
        {
          description: 'Additionner par regroupements',
          subdescription: 'Regrouper pour obtenir un nombre entier. 3 nombres à une décimale.',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&5+&8+&6',
            '&8+&5+&6',
          ],

          variables: [{
            '&1': '$e{1}',
            '&2': '10-&1',
            '&3': '$e[0;9]',
            '&4': '$e[0;9-&3]',
            '&5': '##{&3+&1/10}',
            '&6': '##{&4+(&2)/10}',
            '&7': '$e{1}+($e[1;9]\\{&1;#{&2}})/10',
            '&8': '##{&7}'
          }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} %%{&8} +\\bold{\\textcolor{teal}{%%{&5}}} + \\bold{\\textcolor{teal}{%%{&6}}} &= %%{&8} + \\bold{\\textcolor{teal}{%%{&5+&6}}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&5+&6+&8}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{%%{&5}}}+ %%{&8} + \\bold{\\textcolor{teal}{%%{&6}}} &= %%{&8} + \\bold{\\textcolor{teal}{%%{&5+&6}}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&5+&6+&8}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Additionner par regroupements',
          subdescription: 'Regrouper pour obtenir un nombre entier. 4 nombres à une décimale.',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '##{&3}+##{&4}+##{&5}+##{&6}',
            '##{&3}+##{&5}+##{&4}+##{&6}',
            '##{&3}+##{&5}+##{&6}+##{&4}',
          ],
          variables: [{
            '&1': '$e[1;9]',
            '&2': '$e[1;9]\\{&1;10-&1}',
            '&3': '$e[1;9]+&1*0,1',
            '&4': '$e[1;9]+(10-&1)*0,1',
            '&5': '$e[1;9]+&2*0,1',
            '&6': '$e[1;9]+(10-&2)*0,1',
          }],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              \\bold{\\textcolor{teal}{%%{&3}}} + \\bold{\\textcolor{teal}{%%{&4}}} + \\bold{\\textcolor{orange}{%%{&5}}} + \\bold{\\textcolor{orange}{%%{&6}}} \
              &=  \\bold{\\textcolor{teal}{%%{&3+&4}}} + \\bold{\\textcolor{orange}{%%{&5+&6}}} \\\\ \
              &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&5+&6+&3+&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\bold{\\textcolor{teal}{%%{&3}}} + \\bold{\\textcolor{orange}{%%{&5}}} + \\bold{\\textcolor{teal}{%%{&4}}} + \\bold{\\textcolor{orange}{%%{&6}}} \
              &=  \\bold{\\textcolor{teal}{%%{&3+&4}}} + \\bold{\\textcolor{orange}{%%{&5+&6}}} \\\\ \
              &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&5+&6+&3+&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\bold{\\textcolor{teal}{%%{&3}}} + \\bold{\\textcolor{orange}{%%{&5}}} + \\bold{\\textcolor{orange}{%%{&6}}} + \\bold{\\textcolor{teal}{%%{&4}}} \
              &=  \\bold{\\textcolor{teal}{%%{&3+&4}}} + \\bold{\\textcolor{orange}{%%{&5+&6}}} \\\\ \
              &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&5+&6+&3+&4}}} \
              \\end{align}$$' },
            ]


          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
      ],

      'Moitié': [
        {
          description: "Trouver la moitié",
          subdescription: "Nombres de 1 à 20",
          enounces: ['Quel est la moitié du nombre $$##{&1}$$ ?'],
          expressions: ['&2'],
          options: ['no-exp'],
          variables: [{
            '&1': '$e[0;14]*2+1',
            '&2': '##{(&1)/2}',
          }],
          correctionFormat: [{
            correct: ['La moitié de $$##{&1}$$ est &solution.'],
            uncorrect: ['La moitié de $$##{&1}$$ est &solution.'],
            answer: 'La moitié de $$##{&1}$$ est &answer.'
          },
          ],
          correctionDetails: [
            [
              { text: 'Le moitié de $$##{&1}$$ est &solution car $$\\textcolor{green}{2 \\times} %%{&2} = #{&1}$$' }
            ],
          ],
          type: 'rewrite',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM1,
        },
      ]
    },
    Soustraire: {
      Différence: [
        {
          description: 'Calculer une différence ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (pas de retenue)',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[2;8]',
              '&2': '$e[2;8]',
              '&3': '&1.&2',
              '&4': '$e[1;&1-1]',
              '&5': '$e[1;&2-1]',
              '&6': '&4.&5',
            },
          ],
          expressions: ['&3-&6'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Calculer une différence ',
          subdescription:
            'Partie entière à 2 chiffres et partie entière à 1 (retenue sur la partie entière)',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[1;8]',
              '&2': '$e[2;9]',
              '&3': '1&1.&2',
              '&4': '$e[&1+1;9]',
              '&5': '$e[1;&2-1]',
              '&7': '&4.&5',
            },
          ],
          expressions: ['&3-&7'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Calculer une différence ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenue)',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[0;8]',
              '&3': '&1.&2',
              '&4': '$e[1;&1-1]',
              '&5': '$e[&2+1;9]',
              '&6': '&4.&5',
            },
          ],
          expressions: ['&3-&6'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenues)',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '&1.&2',
              '&4': '$e[10-&1;9]',
              '&5': '$e[10-&2;9]',
              '&6': '&4.&5',
            },
          ],
          expressions: ['&3+&6'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
      ],
      'A trou': [
        {
          description: 'Trouver le complément ',
          subdescription:
            "A l'entier supérieur",
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$d{0;$e[1;2]}',
            },
          ],
          expressions: ['?+##{&1-&2}=&1', '##{&1-&2}+?=&1'],
          type: 'trou',
          solutions: [['&2']],
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Compléter une addition à trou ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (pas de retenue)',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[1;8]',
              '&2': '$e[1;8]',
              '&3': '&1.&2',
              '&4': '$e[1;9-&1]',
              '&5': '$e[1;9-&2]',
              '&6': '&4.&5',
            },
          ],
          expressions: ['&3+?=##{&3+&6}', '?+&3=##{&3+&6}'],
          type: 'trou',
          solutions: [['&6']],
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription:
            'Parties décimales à 1 et 2 chiffres (pas de retenue)',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[1;8]',
              '&2': '$e[1;8]',
              '&3': '&1.&2',
              '&4': '$e[1;9-&1]',
              '&5': '$e[1;9-&2]',
              '&6': '$e[1;9-&2]',
              '&7': '&4.&5&6',
            },
          ],
          expressions: ['&3+?=##{&7+&3}', '?+&3=##{&7+&3}'],
          solutions: [['&7']],
          type: 'trou',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenue pour la partie decimale)',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[1;7]',
              '&2': '$e[2;9]',
              '&3': '&1.&2',
              '&4': '$e[1;8-&1]',
              '&5': '$e[10-&2;9]',
              '&6': '&4.&5',
            },
          ],
          expressions: ['&3+?=##{&6+&3}', '?+&3=##{&6+&3}'],
          type: 'trou',
          solutions: [['&6']],
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Compléter une addition à trou',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenues)',
          enounces: ['Complète'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '&1.&2',
              '&4': '$e[10-&1;9]',
              '&5': '$e[10-&2;9]',
              '&6': '&4.&5',
            },
          ],
          expressions: ['&3+?=##{&6+&3}', '?+&3=##{&6+&3}'],
          solutions: [['&6']],
          type: 'trou',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
      ],
      'Somme astucieuse': [
        {
          description: 'Additionner par regroupements',
          subdescription: 'Regrouper pour obtenir un nombre entier. 2 nombres à une décimale.',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&5+&8+&6',
            '&8+&5+&6',
          ],

          variables: [{
            '&1': '$e{1}',
            '&2': '10-&1',
            '&3': '$e[0;9]',
            '&4': '$e[0;9-&3]',
            '&5': '##{&3+&1/10}',
            '&6': '##{&4+(&2)/10}',
            '&7': '$e{1}+($e[1;9]\\{&1;#{&2}})/10',
            '&8': '##{&7}'
          }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} %%{&8} +\\bold{\\textcolor{teal}{%%{&5}}} + \\bold{\\textcolor{teal}{%%{&6}}} &= %%{&8} + \\bold{\\textcolor{teal}{%%{&5+&6}}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&5+&6+&8}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{%%{&5}}}+ %%{&8} + \\bold{\\textcolor{teal}{%%{&6}}} &= %%{&8} + \\bold{\\textcolor{teal}{%%{&5+&6}}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&5+&6+&8}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
      ],

      'Moitié': [
        {
          description: "Trouver la moitié",
          subdescription: "Nombres de 1 à 20",
          enounces: ['Quel est la moitié du nombre $$##{&1}$$ ?'],
          expressions: ['&2'],
          options: ['no-exp'],
          variables: [{
            '&1': '$e[0;14]*2+1',
            '&2': '##{(&1)/2}',
          }],
          correctionFormat: [{
            correct: ['La moitié de $$##{&1}$$ est &solution.'],
            uncorrect: ['La moitié de $$##{&1}$$ est &solution.'],
            answer: 'La moitié de $$##{&1}$$ est &answer.'
          },
          ],
          correctionDetails: [
            [
              { text: 'Le moitié de $$##{&1}$$ est &solution car $$\\textcolor{green}{2 \\times} %%{&2} = #{&1}$$' }
            ],
          ],
          type: 'rewrite',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM1,
        },
      ]
    },
    Multiplier: {
      Produit: [
        {
          description: 'Calculer un produit',
          subdescription: 'Un des facteurs est un entier',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$d{1;1}',
            },
          ],
          expressions: ['&1*&2', '&2*&1'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: 'Placer la virgule dans le produit',
          enounces: ['La virgule a été oubliée dans le produit. Réécris le produit en rajoutant la virgule.'],
          variables: [
            {
              '&1': '$e[2;4]',
              '&2': '$e[2;4]',
              '&3': '$e{&1;&1}\\{m10}',
              '&4': '$e{&2;&2}\\{m10}',
              // '&5': '##{&3:10^(&1-1)}*##{&4:10^(&2-1)}'

            },
          ],
          // options: ['no-exp'],
          // expressions: ['##{&3:10^(&1-1)}*##{&4:10^(&2-1)}'],
          expressions: ['##{&3:10^(&1-1)}*##{&4:10^(&2-1)}=#{&3*&4}'],
          conditions: ['mod(&3*&4;10)!=0'],
          solutions: [['##{&3*&4:10^(&1+&2-2)}']],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Multiplier deux nombres décimaux',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$l{0.1;0.01}',
              '&3': '$e[2;9]',
              '&4': '$l{0.1;0.01}',
            },
          ],
          expressions: ['##{&1*&2}*##{&3*&4}'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: 'Calculer un produit',
          subdescription: "Determiner un produit à partir d'un autre",
          enounces:
            [
              'Sachant que $$%%{&1} \\times %%{&2}=%%{&1*&2}$$ combien vaut $$%%{&1*&3} \\times %%{&2}$$ ?',
              'Sachant que $$%%{&2} \\times %%{&1}=%%{&1*&2}$$ combien vaut $$%%{&2} \\times %%{&1*&3}$$ ?',
            ],
          variables: [
            {
              '&1': '$d{$e[1;2];$e[0;2]}',
              '&2': '$d{2;1}',
              '&3': '$l{10;100;1000}',
            },
          ],
          options: ['no-exp'],
          expressions: ['##{&1*&3}* &2', '&2*##{&1*&3}'],
          solutions: [['##{&1*&3*&2}']],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },
      ],
      'Produit particulier': [
        {
          description: 'Multiplier par 0,5',
          subdescription: 'Un entier',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[1;20]',
            },
          ],
          expressions: ['&1*0,5', '0,5*&1'],
          correctionDetails: [
            [
              { text: '$$\\begin{align} &1 \\times 0,5 &= &1 \\div 2 \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1:2}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} 0,5 \\times &1 &= &1 \\div 2 \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1:2}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: 'Multiplier par 0,5',
          subdescription: 'Un nombre décimal',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$l{2;4;6;8}',
              '&2': '$e{1}',
              '&3': '##{&1+&2/10}'
            },
          ],
          expressions: ['&3*0,5', '0,5*&3'],
          correctionDetails: [
            [
              { text: '$$\\begin{align} %%{&3} \\times 0,5 &= %%{&3} \\div 2 \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3:2}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} 0,5 \\times %%{&3} &= %%{&3} \\div 2 \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3:2}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: 'Multiplier par 1,5',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[2;20]',
            },
          ],
          expressions: ['&1*1,5', '1,5*&1'],
          type: 'result',
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}} \\times 1,5 &= \\bold{\\textcolor{teal}{&1}} + \\bold{\\textcolor{teal}{&1}} \\times 0,5 \\\\ &= &1 + %%{0,5*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*1,5}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} 1,5 \\times \\bold{\\textcolor{teal}{&1}} &= \\bold{\\textcolor{teal}{&1}} + 0,5 \\times \\bold{\\textcolor{teal}{&1}} \\\\ &= &1 + %%{0,5*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*1,5}}}\\end{align}$$' },
            ],
          ],
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: 'Multiplier par 2,5',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[2;20]',
            },
          ],
          expressions: ['&1*2,5', '2,5*&1'],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}} \\times 2,5 &= \\bold{\\textcolor{teal}{&1}} \\times 2 + \\bold{\\textcolor{teal}{&1}} \\times 0,5 \\\\ &= #{&1*2} + %%{0,5*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*2,5}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} 2,5 \\times \\bold{\\textcolor{teal}{&1}} &= 2 \\times \\bold{\\textcolor{teal}{&1}} + 0,5 \\times \\bold{\\textcolor{teal}{&1}} \\\\ &= #{&1*2} + %%{0,5*&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*2,5}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },

      ],
      'Puissances de 10': [
        {
          description: 'Calculer un produit',
          subdescription: 'Multiplier par 10',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$d{$e[0;2];$e[0;2]}',
            },
          ],
          expressions: ['&1*10'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Multiplier par 100',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$d{$e[0;2];$e[0;2]}',
            },
          ],
          expressions: ['&1*100'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Multiplier par 1000',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$d{$e[0;2];$e[0;2]}',
            },
          ],
          expressions: ['&1*1000'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Multiplier par 10, 100 ou 1000',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[1;3]',
              '&2': '$d{$e[0;4-&1];$e[0;4]}',

            },
          ],
          expressions: ['#{10^&1}*&2', '&2*#{10^&1}'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: 'Multiplier par 0,1',
          subdescription: 'Nombre entier',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[1;3]',
              '&2': '$e{&1;&1}',
            },
          ],
          expressions: ['&2*0,1', '0,1*&2'],
          correctionDetails: [
            [
              { text: '$$\\begin{align} &1 \\bold{\\textcolor{teal}{\\times 0,1}} &= &1 \\bold{\\textcolor{teal}{\\div 10}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1:10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{0,1 \\times}} &1 &= &1 \\bold{\\textcolor{teal}{\\div 10}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1:10}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: 'Multiplier par 0,1',
          subdescription: 'Nombre décimal',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[0;3]',
              '&2': '$e[1;2]',
              '&3': '$d{&1;&2}',
            },
          ],
          expressions: ['&3*0,1', '0,1*&3'],
          correctionDetails: [
            [
              { text: '$$\\begin{align} %%{&3} \\bold{\\textcolor{teal}{\\times 0,1}} &= %%{&3} \\bold{\\textcolor{teal}{\\div 10}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3:10}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{0,1 \\times}} %%{&3} &= %%{&3} \\bold{\\textcolor{teal}{\\div 10}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3:10}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: 'Multiplier par 0,01',
          subdescription: 'Nombre entier ou décimal',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[0;3]',
              '&2': '$e[0;2]',
              '&3': '$d{&1;&2}',
            },
          ],
          expressions: ['&3*0,01', '0,01*&3'],
          type: 'result',
          correctionDetails: [
            [
              { text: '$$\\begin{align} %%{&3} \\bold{\\textcolor{teal}{\\times 0,01}} &= %%{&3} \\bold{\\textcolor{teal}{\\div 100}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3:100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{0,01 \\times}} %%{&3} &= %%{&3} \\bold{\\textcolor{teal}{\\div 100}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3:100}}}\\end{align}$$' },
            ],
          ],
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: 'Multiplier par 0,001',
          subdescription: 'Nombre entier ou décimal',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[0;3]',
              '&2': '$e[0;1]',
              '&3': '$d{&1;&2}',
            },
          ],
          expressions: ['&3*0,001', '0,001*&3'],
          correctionDetails: [
            [
              { text: '$$\\begin{align} %%{&3} \\bold{\\textcolor{teal}{\\times 0,001}} &= %%{&3} \\bold{\\textcolor{teal}{\\div 1000}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3:1000}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} 0,001 \\bold{\\textcolor{teal}{\\times %%{&3}}} &= %%{&3} \\bold{\\textcolor{teal}{\\div 1000}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3:1000}}}\\end{align}$$' },
            ],
          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Multiplier par 0,1 ; 0,01 ou 0,001',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[1;3]',
              '&2': '$d{$e[1;3];$e[0;4-&1]}',

            },
          ],
          expressions: ['##{10^(-&1)}*##{&2}', '##{&2}*##{10^(-&1)}'],
          type: 'result',
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{%%{10^(-&1)}}} \\times %%{&2} &= %%{&2} \\bold{\\textcolor{teal}{\\div %%{10^&1}}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&2*10^(-&1)}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} %%{&2} \\bold{\\textcolor{teal}{\\times %%{10^(-&1)}}} &= %%{&2} \\bold{\\textcolor{teal}{\\div %%{10^&1}}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&2*10^(-&1)}}}\\end{align}$$' },
            ],

          ],
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },

      ],
      'Produits astucieux': [
        {
          description: 'Calculer astucieusement un produit',
          subdescription: 'Utiiser 2 facteurs dont le produit est 100',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&1*#{&2}*&3',
            '#{&2}*&1*&3',
            '#{&2}*&3*&1',
            '&1*&3*#{&2}',
            '&3*&1*#{&2}',
            '&3*#{&2}*&1',
          ],
          variables: [{
            '&1': '$l{20;25;50}',
            '&2': '#{100:&1}',
            '&3': '$d{$e[1;2];$e[1;3]}'
          }],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}}  \\times  \\bold{\\textcolor{teal}{&2}} \\times &3 &= \\bold{\\textcolor{teal}{100}} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&2}}  \\times  \\bold{\\textcolor{teal}{&1}} \\times &3 &= \\bold{\\textcolor{teal}{100}} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&2}}  \\times  &3 \\times \\bold{\\textcolor{teal}{&1}} &= \\bold{\\textcolor{teal}{100}} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\bold{\\textcolor{teal}{&1}}  \\times  &3 \\times \\bold{\\textcolor{teal}{&2}} &= \\bold{\\textcolor{teal}{100}} \\times &3 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &3 \\times \\bold{\\textcolor{teal}{&2}} \\times \\bold{\\textcolor{teal}{&1}} &= &3 \\times \\bold{\\textcolor{teal}{100}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3*100}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &3 \\times \\bold{\\textcolor{teal}{&1}} \\times \\bold{\\textcolor{teal}{&2}} &= &3 \\times \\bold{\\textcolor{teal}{100}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3*100}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM2,
        },
      ],
      'A trou': [
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplication par 0,5',
          enounces: ['Complète'],
          variables: [
            {
              '&1': '$e[1;20]',
            },
          ],
          expressions: ['?*0,5=##{&1*0,5}', '0,5*?=##{0,5*&1}'],
          correctionDetails: [
            [
              { text: '$$\\textcolor{green}{&1} \\times 0,5 = %%{&1*0,5}$$ car  $$%%{&1*0,5} \\times 2 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1}$$' },
            ],
            [
              { text: '$$ 0,5 \\times \\textcolor{green}{&1} = %%{&1*0,5}$$ car  $$%%{&1*0,5} \\times 2 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1}$$' },
            ],
          ],
          type: 'trou',
          'solutions': [['&1']],

          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplier par 0,5 un nombre décimal',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$l{2;4;6;8}',
              '&2': '$e{1}',
              '&3': '##{&1+&2/10}'
            },
          ],
          expressions: ['?*0,5 = ##{&3*0,5}', '?*0,5 = ##{0,5*&3}'],
          correctionDetails: [
            [
              { text: '$$\\textcolor{green}{%%{&3}} \\times 0,5 = %%{&3*0,5}$$ car  $$%%{&3*0,5} \\times 2 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3}}$$' },
            ],
            [
              { text: '$$0,5 \\times \\textcolor{green}{%%{&3}}  = %%{&3*0,5}$$ car  $$%%{&3*0,5} \\times 2 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3}}$$' },
            ],
          ],
          type: 'trou',
          solutions: [['&3']],
          // 'result-type': 'decimal',
          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplier par 10',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$d{$e[0;2];$e[1;2]}',
            },
          ],
          expressions: ['?*10=##{&1*10}', '10*?=##{&1*10}'],
          correctionDetails: [
            [
              { text: '$$\\textcolor{green}{%%{&1}} \\times 10 = %%{&1*10}$$ car  $$%%{&1*10} \\div 10 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1}}$$' },
            ],
            [
              { text: '$$10 \\times \\textcolor{green}{%%{&1}} = %%{&1*10}$$ car  $$%%{&1*10} \\div 10 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1}}$$' },
            ],
          ],
          type: 'trou',
          // 'result-type': 'decimal',
          solutions: [['&1']],
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplier par 100',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$d{$e[0;2];$e[1;2]}',
            },
          ],
          expressions: ['?*100 = ##{&1*100}', '100*? = ##{&1*100}'],
          correctionDetails: [
            [
              { text: '$$\\textcolor{green}{%%{&1}} \\times 100 = %%{&1*100}$$ car  $$%%{&1*100} \\div 100 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1}}$$' },
            ],
            [
              { text: '$$100 \\times \\textcolor{green}{%%{&1}} = %%{&1*100}$$ car  $$%%{&1*100} \\div 100 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1}}$$' },
            ],
          ],
          type: 'trou',
          solutions: [['&1']],
          // 'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplier par 1000',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$d{$e[0;2];$e[1;2]}',
            },
          ],
          expressions: ['?*1000 = ##{&1*1000}', '1000*? = ##{&1*1000}'],
          correctionDetails: [
            [
              { text: '$$\\textcolor{green}{%%{&1}} \\times 1000 = %%{&1*1000}$$ car  $$%%{&1*1000} \\div 1000 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1}}$$' },
            ],
            [
              { text: '$$1000 \\times \\textcolor{green}{%%{&1}} = %%{&1*1000}$$ car  $$%%{&1*1000} \\div 1000 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1}}$$' },
            ],
          ],
          type: 'trou',
          solutions: [['&1']],
          // 'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplier par 10, 100 ou 1000',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[1;3]',
              '&2': '$d{$e[0;4-&1];$e[1;4]}',

            },
          ],
          expressions: ['?*#{10^&1} = ##{10^&1*&2}', '#{10^&1}*? = ##{10^&1*&2}'],
          correctionDetails: [
            [
              { text: '$$\\textcolor{green}{%%{&2}} \\times %{10^&1} = %%{&2*10^&1}$$ car  $$%%{&2*10^&1} \\div %{10^&1} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&2}}$$' },
            ],
            [
              { text: '$$%{10^&1} \\times \\textcolor{green}{%%{&2}} = %%{&2*10^&1}$$ car  $$%%{&2*10^&1} \\div %{10^&1} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&2}}$$' },
            ],
          ],
          type: 'trou',
          solutions: [['&2']],
          // 'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },

        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplier par 0,1 un nombre décimal',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[0;3]',
              '&2': '$e[1;2]',
              '&3': '$d{&1;&2}',
            },
          ],
          expressions: ['?*0,1 = ##{&3*0,1}', '0,1*? = ##{0,1*&3}'],
          type: 'trou',
          solutions: [['&3']],
          correctionDetails: [
            [
              { text: '$$\\textcolor{green}{%%{&3}} \\times 0,1 = %%{&3*0,1}$$ car  $$%%{&3*0,1} \\times 10 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3}}$$' },
            ],
            [
              { text: '$$0,1 \\times \\textcolor{green}{%%{&3}} = %%{&3*0,1}$$ car  $$%%{&3*0,1} \\times 10 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3}}$$' },
            ],
          ],
          // 'result-type': 'decimal',
          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplier par 0,01 un nombre décimal',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[0;3]',
              '&2': '$e[1;2]',
              '&3': '$d{&1;&2}',
            },
          ],
          correctionDetails: [
            [
              { text: '$$\\textcolor{green}{%%{&3}} \\times 0,01 = %%{&3*0,01}$$ car  $$%%{&3*0,01} \\times 100 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3}}$$' },
            ],
            [
              { text: '$$0,01 \\times \\textcolor{green}{%%{&3}} = %%{&3*0,01}$$ car  $$%%{&3*0,01} \\times 100 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3}}$$' },
            ],
          ],
          expressions: ['?*0,01 = ##{&3*0,01}', '0,01*? = ##{0,01*&3}'],
          type: 'trou',
          solutions: [['&3']],
          // 'result-type': 'decimal',
          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplier par 0,001 un nombre décimal',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[0;3]',
              '&2': '$e[1;1]',
              '&3': '$d{&1;&2}',
            },
          ],
          expressions: ['?*0,001 = ##{&3*0,001}', '0,001*?=##{0,001*&3}'],
          correctionDetails: [
            [
              { text: '$$\\textcolor{green}{%%{&3}} \\times 0,001 = %%{&3*0,001}$$ car  $$%%{&3*0,001} \\times 1\\,000 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3}}$$' },
            ],
            [
              { text: '$$0,001 \\times \\textcolor{green}{%%{&3}} = %%{&3*0,001}$$ car  $$%%{&3*0,001} \\times 1\\,000 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3}}$$' },
            ],
          ],
          type: 'trou',
          solutions: [['&3']],
          // 'result-type': 'decimal',
          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Multiplier par 0,1 ; 0,01 ou 0,001',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[1;3]',
              '&2': '$d{$e[1;3];$e[1;4-&1]}',

            },
          ],
          expressions: ['##{10^(-&1)}*? = ##{10^(-&1)*&2}', '?*##{10^(-&1)} = ##{&2*10^(-&1)}'],
          correctionDetails: [
            [
              { text: '$$%%{10^(-&1)} \\times \\textcolor{green}{%%{&2}} = %%{&2*10^(-&1)}$$ car  $$%%{&2*10^(-&1)} \\times %{10^&1} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&2}}$$' },
            ],
            [
              { text: '$$ \\textcolor{green}{%%{&2}} \\times %%{10^(-&1)} = %%{&2*10^(-&1)}$$ car  $$%%{&2*10^(-&1)} \\times %{10^&1} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&2}}$$' },
            ],


          ],
          solutions: [['&2']],
          type: 'trou',
          // 'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },

      ]
    },
    Diviser: {
      Quotient: [
        {
          description: 'Calculer un quotient',
          subdescription: 'Diviser par 10',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$d{$e[0;3];$e[0;1]}',
            },
          ],
          expressions: ['&1:10'],

          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Calculer un quotient',
          subdescription: 'Diviser par 100',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$d{$e[0;3];$e[0;1]}',
            },
          ],
          expressions: ['&1:100'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM2,
        },
        {
          description: 'Calculer un quotient',
          subdescription: 'Diviser par 1000',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[0;4]',
              '&2': '$e{&1;&1}'
            },
          ],
          expressions: ['&2:1000'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM2,
        },
        {
          description: 'Calculer un quotient',
          subdescription: 'Diviser par 10, 100 ou 1000',
          enounces: ['Calcule.'],
          variables: [
            {

              '&1': '$e[1;3]',
              '&2': '$d{$e[0;4];$e[0;4-&1]}',

            },
          ],
          expressions: ['&2:#{10^&1}'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: 'Calculer un quotient',
          subdescription: 'Un nombre décimal par un entier',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '##{&1*&2/10}:&2'
            },
          ],
          expressions: ['&3'],
          correctionDetails: [
            [
              { text: '$$%%{&1*&2/10} \\div &2 = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3}}}$$ car $$ %%{&3} \\times &2 = %%{&1*&2/10}$$' },
            ],


          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM2,
        },


        {
          description: 'Calculer un quotient',
          subdescription: 'Diviser par 0,1 ; 0,01 ou 0,001',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$d{$e[1;2];$e[0;3]}',
              '&2': '$l{0.1;0.01;0.001}',
              '&3': '$l{$e[1;9];$e[11;99];$e[101;999]}:1000',
            },
          ],
          expressions: ['##{&3}:&2', '&1:&2'],
          correctionDetails: [
            [
              { text: '$$\\begin{align} %%{&3} \\bold{\\textcolor{teal}{\\div %%{&2}}} &= %%{&3} \\bold{\\textcolor{teal}{\\times %%{1:&2}}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&3:&2}}}\\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} %%{&1} \\bold{\\textcolor{teal}{\\div %%{&2}}} &= %%{&1} \\bold{\\textcolor{teal}{\\times %%{1:&2}}} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1:&2}}}\\end{align}$$' },
            ],

          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: 'Calculer un quotient',
          enounces: ['Calcule.'],
          subdescription: 'Deux nombres décimaux',
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$l{0.1;0.01}',
            },
          ],
          expressions: ['##{&1*&2*&3}:##{&1*&3}'],
          correctionDetails: [
            [
              { text: '$$\\begin{align} %%{&1*&2*&3} \\div %%{&1*&3} &= %%{&1*&2} \\div %%{&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \\end{align}$$' },
            ],


          ],
          details: [['##{&1*&2}:##{&1}']],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },
      ],
      'A trou': [
        {
          description: 'Compléter une division a trou',
          subdescription: 'Diviser par 10',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$d{$e[0;3];$e[0;1]}',
            },
          ],
          expressions: ['?:10 = ##{&1:10}'],
          type: 'trou',
          solutions: [['&1']],
          // 'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM1,
        },
        {
          description: 'Compléter une division a trou',
          subdescription: 'Diviser par 100',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$d{$e[0;3];$e[0;1]}',
            },
          ],
          expressions: ['?:100 = ##{&1:100}'],
          type: 'trou',
          solutions: [['&1']],
          // 'result-type': 'decimal',
          defaultDelay: 15,
          grade: CM2,
        },
        {
          description: 'Compléter une division a trou',
          subdescription: 'Diviser par 1000',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$e[0;4]',
              '&2': '$e{&1;&1}'
            },
          ],
          expressions: ['?:1000 = ##{&2:1000}'],
          type: 'trou',
          // 'result-type': 'decimal',
          solutions: [['&2']],
          defaultDelay: 15,
          grade: CM2,
        },
        {
          description: 'Compléter une division a trou',
          subdescription: 'Diviser par 10, 100 ou 1000',
          enounces: ['Complète.'],
          variables: [
            {

              '&1': '$e[1;3]',
              '&2': '$d{$e[0;4];$e[0;4-&1]}',

            },
          ],
          expressions: ['?:#{10^&1}=##{&2:10^&1}'],
          type: 'trou',
          solutions: [['&2']],
          // 'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM2,
        },

        {
          description: 'Compléter une division a trou',
          subdescription: 'Diviser par 0,1 ; 0,01 ou 0,001',
          enounces: ['Complète.'],
          variables: [
            {
              '&1': '$d{$e[1;2];$e[0;3]}',
              '&2': '$l{0.1;0.01;0.001}',
              '&3': '$l{$e[1;9];$e[11;99];$e[101;999]}:1000',
            },
          ],
          expressions: ['?:##{&2} = ##{&3:&2}', '?:##{&2} = ##{&1:&2}'],
          type: 'trou',
          solutions: [['##{&3}'], ['&1']],
          // 'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },


      ],
    },
  },
  Relatifs: {
    'Apprivoiser': {
      "La définition d'un nombre négatif": [
        {
          description: "Une soustraction enfin possible",
          enounces: ["Comment écrit-on le résultat de : "],
          expressions: ['0-&1'],
          variables: [
            { '&1': '$e[2;20]' },
          ],

          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: "Nombre négatif défini par une soustraction",
          enounces: ["Quelle est la soustraction définissant le nombre $$-&1$$ ?"],
          expressions: ['0-&1',],
          options: ['no-exp', 'no-penalty-for-null-terms'],
          variables: [
            { '&1': '$e[2;20]' },
          ],
          solutions: [['0-&1']],
          correctionFormat: [
            {
              correct: ["$$-&1$$ est défini par la soustraction &solution."],
              uncorrect: ["$$-&1$$ est défini par la soustraction &solution."],
              answer: "$$-&1$$ est défini par la soustraction &answer."
            },
          ],
          type: 'rewrite',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: "Trouver l'opposé d'un nombre",
          enounces: ["Quel est l'opposé du nombre $$&1$$ ?", "Quel est l'opposé du nombre $$-&1$$ ?"],
          expressions: ['-&1', '-(-&1)'],
          options: ['no-exp'],
          variables: [
            { '&1': '$e[1;20]' },
          ],
          solutions: [['-&1'], ['&1']],
          correctionFormat: [
            {
              correct: ["L'opposé de $$&1$$ est &solution"],
              uncorrect: ["L'opposé de $$&1$$ est &solution"],
              answer: "L'opposé est &answer"
            },
            {
              correct: ["L'opposé de $$-&1$$ est &solution"],
              uncorrect: ["L'opposé de $$-&1$$ est &solution"],
              answer: "L'opposé est &answer"
            },
          ],
          type: 'rewrite',
          defaultDelay: 20,
          grade: CINQUIEME,
        },


      ],
      Comparer: [
        {
          description: "Comparer deux nombres relatifs.",
          subdescription: "Valeurs entières.",
          enounces: ["Quel est le plus petit de ces 2 nombres ?"],
          // expressions: ['-&1', '-(-&1)'],
          options: ['no-exp'],
          variables: [
            { '&1': '$e[1;19]', '&2': '$e[&1+1;20]', },
          ],
          choices: [

            [{ text: '$$&1$$' }, { text: '$$-&2$$' }],
            [{ text: '$$-&1$$' }, { text: '$$-&2$$' }],
            [{ text: '$$-&2$$' }, { text: '$$-&1$$' }],
          ],
          correctionFormat: [

            {
              correct: ['Entre $$&1$$ et $$-&2$$ le plus petit est &solution'],
              uncorrect: ['Entre $$&1$$ et $$-&2$$ le plus petit est &solution'],
              answer: 'Le plus petit est &answer'
            },
            {
              correct: ['Entre $$-&1$$ et $$-&2$$ le plus petit est &solution'],
              uncorrect: ['Entre $$-&1$$ et $$-&2$$ le plus petit est &solution'],
              answer: 'Le plus petit est &answer'
            },
            {
              correct: ['Entre $$-&2$$ et $$-&1$$ le plus petit est &solution'],
              uncorrect: ['Entre $$-&2$$ et $$-&1$$ le plus petit est &solution'],
              answer: 'Le plus petit est &answer'
            }],

          solutions: [
            [1],
            [1],
            [0],

          ],
          type: 'choice',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: "Comparer deux nombres relatifs.",
          subdescription: "Valeurs décimales.",
          enounces: ["Quel est le plus petit de ces 2 nombres ?"],
          // expressions: ['-&1', '-(-&1)'],
          options: ['no-exp'],
          variables: [
            {
              '&1': '$e{1}',
              '&2': '$e[1;2]',
              '&3': '$e{&2;&2}\\{m(10)}',
              '&4': '$e{1;1}\\{&3}',
              '&6': '##{-&1,&3}',
              '&7': '##{-&1,&4}'
            },
            {
              '&1': '$er{1}',
              '&2': '$er{1}',
              '&3': '$e[1;2]',
              '&4': '$e{&3;&3}\\{m(10)}',
              '&5': '$e{1}\\{&4}',
              '&6': '##{&1,&4}',
              '&7': '##{&2,&5}'
            },
          ],
          choices: [
            [{ text: '$$%%{&6}$$' }, { text: '$$%%{&7}$$' }],

          ],
          correctionFormat: [

            {
              correct: ['Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est &solution'],
              uncorrect: ['Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est &solution'],
              answer: 'Le plus petit est &answer'
            },
          ],
          solutions: [
            ['&6<&7 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
      ]
    },
    'Additionner et soustraire': {
      'Sur la droite graduée': [

        {
          description: 'Calculer une somme ou une différence',
          subdescription: "A l'aide de la droite graduée",
          enounces: ["Calcule en t'aidant de la droite graduée."],
          expressions: ['(-&1)+&2', '(-&1)-&2', '&1-&2'],
          variables: [
            { '&1': '$e[1;4]', '&2': '$e[1;4]' },
            { '&1': '$e[1;3]', '&2': '$e[1;4-&1]' },
            { '&1': '$e[1;3]', '&2': '$e[&1+1;4]' },
          ],
          images: [
            'relatifs/droite-graduee-operations/droite-graduee--4-4-600.png',
          ],

          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Calculer une somme ou une différence',
          subdescription: "A l'aide de la droite graduée",
          enounces: ["Calcule en t'aidant de la droite graduée."],
          expressions: ['(-&1)+&2', '(-&1)-&2', '&1-&2'],
          variables: [
            { '&1': '$e[1;7]', '&2': '$e[1;8]' },
            { '&1': '$e[1;6]', '&2': '$e[1;7-&1]' },
            { '&1': '$e[1;7]', '&2': '$e[&1+1;8]' },
          ],
          images: [
            'relatifs/droite-graduee-operations/droite-graduee--7-7-600.png',
          ],

          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Compléter une adition à trou',
          subdescription: "Relatifs entre -4 et 4. A l'aide de la droite graduée.",
          enounces: ["Complète en t'aidant de la droite graduée."],
          expressions: [
            '(-&1)+? = #{(-&1)+&2}',
            '(-&1)-? = #{(-&1)-&2}',
            '&1-? = #{&1-&2}'],
          variables: [
            { '&1': '$e[1;4]', '&2': '$e[1;4]' },
            { '&1': '$e[1;3]', '&2': '$e[1;4-&1]' },
            { '&1': '$e[1;3]', '&2': '$e[&1+1;4]' },
          ],
          images: [
            'relatifs/droite-graduee-operations/droite-graduee--4-4-600.png',
          ],

          type: 'trou',
          solutions: [['&2']],
          options: ['no-penalty-for-extraneous-brackets-in-first-negative-term'],
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Compléter une adition à trou',
          subdescription: "Relatifs entre -4 et 4. A l'aide de la droite graduée.",
          enounces: ["Complète en t'aidant de la droite graduée."],
          expressions: ['(-&1)+?= #{(-&1)+&2}', '(-&1)-?=#{(-&1)-&2}', '&1-?=#{&1-&2}'],
          variables: [
            { '&1': '$e[1;7]', '&2': '$e[1;8]' },
            { '&1': '$e[1;6]', '&2': '$e[1;7-&1]' },
            { '&1': '$e[1;7]', '&2': '$e[&1+1;8]' },
          ],
          images: [
            'relatifs/droite-graduee-operations/droite-graduee--7-7-600.png',
          ],
          type: 'trou',
          solutions: [['&2']],
          type: 'trou',
          options: ['no-penalty-for-extraneous-brackets-in-first-negative-term'],
          defaultDelay: 20,
          grade: CINQUIEME,
        },

      ],
      'Sommes algébriques': [
        {
          description: "Déterminer le signe d'une somme",
          expressions: ['(-&1)+&2', '(-&2)+&1', '(-&1)+(-&2)', '&1+(-&2)', '&2+(-&1)'],
          enounces: ['Quel est le signe de cette somme ?'],
          variables: [
            { '&1': '$e[30;99]', '&2': '$e[1;&1-1]' },
            { '&1': '$e[30;99]', '&2': '$e[1;&1-1]' },
            { '&1': '$e[30;99]', '&2': '$e[30;99]', },
            { '&1': '$e[30;99]', '&2': '$e[1;&1-1]' },
            { '&1': '$e[30;99]', '&2': '$e[1;&1-1]' },

          ],
          choices: [[{ text: 'positif' }, { text: 'négatif' }]],
          correctionFormat: [
            {
              correct: ['Le résultat de $$(-&1)+&2$$ est &solution'],
              uncorrect: ['Le résultat de $$(-&1)+&2$$ est est &solution'],
              answer: 'Le résultat est &answer'
            },
            {
              correct: ['Le résultat de $$(-&2)+&1$$ est  &solution'],
              uncorrect: ['Le résultat de $$(-&2)+&1$$ est  &solution'],
              answer: 'Le résultat est &answer'
            },
            {
              correct: ['Le résultat de $$(-&1)+(-&2)$$ est &solution'],
              uncorrect: ['Le résultat de $$(-&1)+(-&2)$$ est  &solution'],
              answer: 'Le résultat est &answer'
            },
            {
              correct: ['Le résultat de $$&1+(-&2)$$ est &solution'],
              uncorrect: ['Le résultat de $$&1+(-&2)$$ est &solution'],
              answer: 'Le résultat est &answer'
            },
            {
              correct: ['Le résultat de $$&2+(-&1)$$ est &solution'],
              uncorrect: ['Le résultat de $$&2+(-&1)$$ est est &solution'],
              answer: 'Le résultat est &answer'
            },

          ],
          solutions: [
            [1],
            [0],
            [1],
            [0],
            [1],
          ],
          type: 'choice',
          options: ['no-shuffle-choices'],
          defaultDelay: 20,
          grade: CINQUIEME,

        },
        {
          description: 'Calculer une somme',
          subdescription: 'Cas général',
          enounces: ["Calcule."],
          expressions: ['(-&1)+&2', '(-&1)+(-&2)', '&1+(-&2)'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Compléter une égalité',
          subdescription: 'Cas général',
          enounces: ["Complète l'égalité avec le nombre manquant."],
          expressions: [
            '(-&1)+?=#{(-&1)+&2}',
            '(-&1)+?=#{(-&1)+(-&2)}',
            '&1+?=#{&1+(-&2)}',
            '?+(-&1)=#{(-&1)+&2}',
            '?+(-&1)=#{(-&1)+(-&2)}',
            '?+&1=#{&1+(-&2)}',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          solutions: [
            ['&2'],
            ['(-&2)'],
            ['(-&2)'],
            ['&2'],
            ['(-&2)'],
            ['(-&2)'],
          ],
          type: 'trou',
          options: ['no-penalty-for-extraneous-brackets-in-first-negative-term'],
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: "Transformer une soustraction en addition",
          enounces:
            ['Réécris cette soustraction en une addition équivalente.'],
          expressions: [
            '-&1-(-&2)',
            '&1-(-&2)',
            '&1-&2',
            '-&1-&2',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          solutions: [
            ['-&1+&2'],
            ['&1+&2'],
            ['&1+(-&2)'],
            ['-&1+(-&2)'],
          ],
          type: 'result',
          options: ['no-penalty-for-extraneous-signs'],
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: "Simplifier l'écriture",
          enounces:
            ['Simplifie les doubles signes de cette expression.'],
          expressions: [
            '-&1+(-&2)',
            '&1+(-&2)',
            '-&1-(-&2)',
            '&1-(-&2)',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          solutions: [
            ['-&1-&2'],
            ['&1-&2'],
            ['-&1+&2'],
            ['&1+&2'],
          ],
          type: 'result',
          options: ['require-no-extraneaous-signs'],
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Calculer',
          subdescription: 'Avec écriture simplifiée',
          enounces: ["Calcule."],
          expressions: ['-&1+&2', '-&1-&2', '&3-&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[1;&1-1]' }],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Compléter une somme algébrique à trou',
          subdescription: 'Avec écriture simplifiée',
          enounces: ["Complète."],
          expressions: ['-&1+?= #{-&1+&2}', '-&1-?= #{-&1-&2}', '&3-? = #{&3-&1}'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[1;&1-1]' }],
          type: 'trou',
          solutions: [
            ['&2'],
            ['&2'],
            ['&1'],
          ],
          defaultDelay: 20,
          grade: CINQUIEME,
        },



      ],
    },
    'Multiplier et Diviser': {
      Produit: [
        {
          description: "Déterminer le signe d'un produit",
          subdescription: "2 facteurs",
          enounces: ['Quel est le signe de ce produit ?'],
          expressions: ['(&1)*(&2)'],
          conditions: ['&1<=0 || &2<=0'],
          variables: [{ '&1': '$er[30;99]', '&2': '$er[30;99]' }],
          choices: [[{ text: 'positif' }, { text: 'négatif' }]],
          correctionFormat: [
            {
              correct: ['Le résultat de $$&exp$$ est &solution'],
              uncorrect: ['Le résultat de $$&exp$$ est &solution'],
              answer: 'Le résultat est &answer'
            },
          ],
          solutions: [
            ['(&1)*(&2) >0 ?? 0 :: 1'],
          ],
          type: 'choice',
          options: ['no-shuffle-choices', 'exp-remove-unecessary-brackets'],
          defaultDelay: 20,
          grade: QUATRIEME,

        },
        {
          description: "Déterminer le signe d'un facteur",
          enounces: ['Quel est le signe du facteur manquant ?'],
          expressions: [
            '(-&1)*?=&2',
            '(-&1)*?=-&2',
            '&1*?=-&2',
            '&1*?=&2',
            '?*(-&1)=&2',
            '?*(-&1)=-&2',
            '?*&1=-&2',
            '?*&1=&2'
          ],
          variables: [{ '&1': '$e[30;99]', '&2': '$e[30;99]' }],
          choices: [[{ text: 'positif' }, { text: 'négatif' }]],
          corrections: [
            "Dans l'égalité $$(-&1) \\times \\ldots=&2$$, le facteur manquant est ",
            "Dans l'égalité $$(-&1) \\times \\ldots=-&2$$, le facteur manquant est ",
            "Dans l'égalité $$&1 \\times \\ldots=-&2$$, le facteur manquant est ",
            "Dans l'égalité $$&1 \\times \\ldots=&2$$, le facteur manquant est ",
            "Dans l'égalité $$\\ldots \\times (-&1)  = &2$$, le facteur manquant est ",
            "Dans l'égalité $$\\ldots \\times (-&1) = -&2$$, le facteur manquant est ",
            "Dans l'égalité $$\\ldots \\times &1 = -&2$$, le facteur manquant est ",
            "Dans l'égalité $$\\ldots \\times &1 = &2$$, le facteur manquant est ",
          ],
          solutions: [
            [1],
            [0],
            [1],
            [0],
            [1],
            [0],
            [1],
            [0],
          ],
          type: 'choice',
          defaultDelay: 20,
          grade: QUATRIEME,

        },

        {
          description: "Déterminer le signe d'un produit",
          subdescription: "3 facteurs",
          enounces: ['Quel est le signe de ce produit ?'],
          expressions: ['(&1)*(&2)*(&3)'],
          variables: [{ '&1': '$er[30;99]', '&2': '$er[30;99]', '&3': '$er[30;99]' }],
          choices: [[{ text: 'positif' }, { text: 'négatif' }]],
          correctionFormat: [
            {
              correct: ['Le résultat de $$&exp$$ est &solution'],
              uncorrect: ['Le résultat de $$&exp$$ est &solution'],
              answer: 'Le résultat est &answer'
            },
          ],
          solutions: [
            ['(&1)*(&2)*(&3) >0 ?? 0 :: 1'],
          ],
          type: 'choice',
          options: ['no-shuffle-choices', 'exp-remove-unecessary-brackets'],
          defaultDelay: 20,
          grade: QUATRIEME,

        },
        {
          description: "Déterminer le signe d'un produit",
          subdescription: "4 facteurs",
          enounces: ['Quel est le signe de ce produit ?'],
          expressions: ['(&1)*(&2)*(&3)*(&4)'],
          variables: [{ '&1': '$er[30;99]', '&2': '$er[30;99]', '&3': '$er[30;99]', '&4': '$er[30;99]' }],
          choices: [[{ text: 'positif' }, { text: 'négatif' }]],
          correctionFormat: [
            {
              correct: ['Le résultat de $$&exp$$ est &solution'],
              uncorrect: ['Le résultat de $$&exp$$ est &solution'],
              answer: 'Le résultat est &answer'
            },
          ],
          solutions: [
            ['(&1)*(&2)*(&3)*(&4) >0 ?? 0 :: 1'],
          ],
          type: 'choice',
          options: ['no-shuffle-choices', 'exp-remove-unecessary-brackets'],
          defaultDelay: 20,
          grade: QUATRIEME,

        },

        {
          description: 'Calculer un produit',
          expressions: ['(-&1)*&2', '(-&1)*(-&2)', '&1*(-&2)'],
          enounces: ["Calcule."],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: 'Compléter une multiplication à trou',
          enounces: ["Complète."],
          expressions: [
            '(-&1)*?=#{-&1*&2}',
            '(-&1)*?=#{(-&1)*(-&2)}',
            '&1*?=#{&1*(-&2)}',
            '?*(-&1)=#{-&1*&2}',
            '?*(-&1)=#{(-&1)*(-&2)}',
            '?*&1=#{&1*(-&2)}',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          solutions: [['&2'], ['(-&2)'], ['(-&2)'], ['&2'], ['(-&2)'], ['(-&2)']],
          type: 'trou',
          defaultDelay: 20,
          grade: QUATRIEME,
        },


      ],
      'Quotient': [
        {
          description: "Déterminer le signe d'un quotient",
          enounces: ['Quel est le signe de ce quotient ?'],
          expressions: ['(&1):(&2)'],
          variables: [{ '&1': '$er[30;99]', '&2': '$er[30;99]' }],
          conditions: ['&1<=0 || &2<0'],
          choices: [[{ text: 'positif' }, { text: 'négatif' }]],
          correctionFormat: [
            {
              correct: ['Le résultat de $$&exp$$ est &solution'],
              uncorrect: ['Le résultat de $$&exp$$ est &solution'],
              answer: 'Le résultat est &answer'
            },
          ],
          solutions: [
            ['(&1):(&2)>0 ?? 0 :: 1'],
          ],
          type: 'choice',
          options: ['no-shuffle-choices', 'exp-remove-unecessary-brackets'],
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Déterminer le signe dans un quotient",
          enounces: ['Quel est le signe du nombre manquant ?'],
          expressions: [
            '(&1):?=(&2)',
            '?:(&1)=(&2)',

          ],
          variables: [{ '&1': '$er[30;99]', '&2': '$er[30;99]' }],
          conditions: ['&1<=0 || &2<0'],
          choices: [[{ text: 'positif' }, { text: 'négatif' }]],
          correctionFormat: [
            {
              correct: ["Dans $$&exp$$ le facteur manquant est &solution"],
              uncorrect: ["Dans $$&exp$$ le facteur manquant est &solution"],
              answer: 'Le facteur manquant est &answer'
            },
          ],
          solutions: [
            ['(&1)*(&2)>0 ?? 0 :: 1'],
          ],
          type: 'choice',
          options: ['no-shuffle-choices', 'exp-remove-unecessary-brackets'],
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: 'Diviser',
          enounces: ["Calcule."],
          expressions: [
            '(-#{&1*&2}):&2',
            '(-#{&1*&2}):(-&2)',
            '#{&1*&2}:(-&2)',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: 'Compléter une division à trou',
          subdescription: 'Nombres relatifs',
          enounces: ["Complète."],
          expressions: [
            '(-#{&1*&2}):? = -&1 ',
            '(-#{&1*&2}):?= &1',
            '#{&1*&2}:? = -&1',
            '?:&2 = -&1 ',
            '?:(-&2)= &1',
            '?:(-&2) = -&1',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'trou',
          solutions: [
            ['&2'],
            ['(-&2)'],
            ['(-&2)'],
            ['(-#{&1*&2})'],
            ['(-#{&1*&2})'],
            ['#{&1*&2}'],
          ],
          defaultDelay: 20,
          grade: QUATRIEME,
        },
      ]
    },

  },
  Fractions: {
    'Apprivoiser': {
      Définition: [

        {
          description: "Définition par quotient",
          enounces: ['Détermine le facteur manquant.'],
          expressions: ['&2*?=&1', '?*&2=&1'],
          variables: [{ '&1': '$e[2;19]', '&2': '$e[2;19]\\{cd(&1)}' }],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&1/&2']],
          details: [['&1:&2']],
          type: 'trou',
          correctionDetails: [
            [
              { text: "Dans $$&2 \\times \\cdots = &1$$, le nombre cherché est le résultat de $$&1 \\div &2$$ qui s'écrit $$\\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{&1}{&2}}$$ car on ne peut pas le mettre sous forme décimale." },
            ],
            [
              { text: "Dans $$ \\cdots \\times &2 = &1$$, le nombre cherché est le résultat de $$&1 \\div &2$$ qui s'écrit $$\\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{&1}{&2}}$$ car on ne peut pas le mettre sous forme décimale." },
            ],
          ],
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: "Définition par quotient",
          subdescription: "$$a/b*a=a$$",
          enounces: ['Calculer.'],
          expressions: ['{&2/&1}*&1', '&1*{&2/&1}'],
          variables: [{ '&1': '$l{3;6;7;9;11;12;13}', '&2': '$e[2;10]\\{cd(&1)}' }],
          correctionDetails: [
            [
              { text: "$$\\textcolor{teal}{\\dfrac{&2}{&1}} \\times &1=\\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}}$$ car $$\\textcolor{teal}{\\dfrac{&2}{&1}}$$ désigne le résultat de la division $$\\textcolor{teal}{&2 \\div &1}$$ et $$\\textcolor{teal}{&2 \\div &1} \\times &1 = &2$$. " },
            ],
            [
              { text: "$$&1 \\times \\textcolor{teal}{\\dfrac{&2}{&1}} =\\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}}$$ car $$\\textcolor{teal}{\\dfrac{&2}{&1}}$$ désigne le résultat de la division $$\\textcolor{teal}{&2 \\div &1}$$ et $$&1 \\times \\textcolor{teal}{&2 \\div &1} = &2$$. " },
            ],
          ],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],       
          type: 'result',
          defaultDelay: 10,
          grade: SIXIEME,
        },
      ],
      Décomposition: [
        {
          description: "Décomposer une fraction",
          subdescription: "Une fraction décimale (jusqu'aux centièmes) en une somme d'un entier et d'une fraction décimale inférieure à 1",
          enounces: ["Décomposer cette fraction en une somme d'un entier et d'une fraction décimale inférieure à 1, comme dans l'exemple : $$\\dfrac{345}{100} = 3 + \\dfrac{45}{100}$$. "],
          expressions: ['#{&1*&2+&3}/&1'],
          variables: [{ '&1': '$l{10;100}', '&2': '$e[2;9]', '&3': '$e[1;&1-1]' }],
          solutions: [['&2+&3/&1']],
          type: 'decomposition',
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{#{&1*&2+&3}}{&1} &= \\dfrac{#{&1*&2}}{&1} + \\dfrac{&3}{&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2 + \\dfrac{&3}{&1}}} \\end{align}$$" },
            ],

          ],
          options: ['no-penalty-for-non-reduced-fractions'],
          defaultDelay: 30,
          grade: CM1,
        },
        {
          description: "Décomposer une fraction",
          subdescription: "Une fraction décimale (jusqu'aux millièmes) en une somme d'un entier et d'une fraction décimale inférieure à 1",
          enounces: ["Décomposer cette fraction en une somme d'un entier et d'une fraction décimale inférieure à 1, comme dans l'exemple : $$\\dfrac{3456}{1000} = 3 + \\dfrac{456}{1000}$$."],
          expressions: ['#{&1*&2+&3}/&1'],
          variables: [{ '&1': '$l{10;100;1000}', '&2': '$e[2;9]', '&3': '$e[1;&1-1]' }],
          solutions: [['&2+&3/&1']],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{#{&1*&2+&3}}{&1} &= \\dfrac{#{&1*&2}}{&1} + \\dfrac{&3}{&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2 + \\dfrac{&3}{&1}}} \\end{align}$$" },
            ],

          ],
          options: ['no-penalty-for-non-reduced-fractions'],
          type: 'decomposition',
          defaultDelay: 30,
          grade: CM2,
        },
        {
          description: "Décomposer une fraction",
          subdescription: "Une fraction  en une somme d'un entier et d'une fraction inférieure à 1",
          enounces: ["Décomposer cette fraction en une somme d'un entier et d'une fraction inférieure à 1, comme dans l'exemple : $$\\dfrac{14}{3} = 4 + \\dfrac{2}{3}$$"],
          expressions: ['#{&1*&2+&3}/&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[1;&1-1]' }],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&2+&3/&1']],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{#{&1*&2+&3}}{&1} &= \\dfrac{#{&1*&2}}{&1} + \\dfrac{&3}{&1} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2 + \\dfrac{&3}{&1}}} \\end{align}$$" },
            ],
          ],
          options: ['no-penalty-for-non-reduced-fractions'],
          type: 'decomposition',
          defaultDelay: 30,
          grade: CM2,
        },


      ],
      'Forme décimale': [
        {
          description: "Forme décimale d'une fraction",
          subdescription: "Dixièmes",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['&1/10'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: "Forme décimale d'une fraction",
          subdescription: "Centièmes",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['&1/100'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },

        {
          description: "Forme décimale d'une fraction",
          subdescription: "Centièmes (2)",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['#{&1}/100'],
          variables: [{ '&1': '$e[1;9]*10+$e[1;9]' }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },

        {
          description: "Forme décimale d'une fraction",
          subdescription: "Fraction décimale jusqu'au centième",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['&2/#{&3}'],
          variables: [{
            '&1': '$e[2;4]', // nombre de chiffre au numérateur
            '&2': '$e{&1;&1}', // numérateur
            '&3': '10^$e[1;2]' // dénominateur
          }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: "Déterminer la forme décimale d'une fraction",
          subdescription: "Cas à connaître par coeur",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['&1'],
          variables: [{ '&1': '$l{1/2;1/4;1/10;2/10;3/2;5/2;1/100;2/1000;7/2;9/2}' }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: "Forme décimale d'une fraction",
          subdescription: "Millièmes",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['&1/1000'],
          variables: [{ '&1': '$e[0;9]' }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: "Forme décimale d'une fraction",
          subdescription: "Millièmes (2)",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['#{&1}/1000'],
          variables: [{ '&1': '$e[1;9]*100+$e[0;9]*10+$e[1;9]' }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: "Forme décimale d'une fraction",
          subdescription: "Fraction décimale jusqu'au millième",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['&2/#{&3}'],
          variables: [{
            '&1': '$e[2;4]', // nombre de chiffre au numérateur
            '&2': '$e{&1;&1}', // numérateur
            '&3': '10^$e[1;3]' // dénominateur
          }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: "Déterminer la forme décimale d'une fraction",
          subdescription: "Cas à connaître par coeur",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['&1'],
          variables: [{ '&1': '$l{1/2;1/4;3/1000;2/10;3/2;5/2;3/4;1/5;7/2;9/2}' }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: CM2,
        },
        {
          description: "Déterminer la forme décimale d'une fraction",
          subdescription: "La forme décimale est un entier",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['#{&2*&1}/&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{%{&2*&1}}{&1} &= %{&2*&1} \\div &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \\end{align}$$" },
            ],

          ],
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: "Déterminer la forme décimale d'une fraction",
          subdescription: "La forme décimale n'est pas entière",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['&2/&1'],
          variables: [{ '&1': '$l{2;4;5;10}', '&2': '$e[1;&1+1]\\{&1}' }],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{&2}{&1} &= &2 \\div &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&2/&1}}} \\end{align}$$" },
            ],

          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: 'Déterminer une forme fractionnaire',
          enounces: ['Réécris ce nombre décimal sous forme fractionnaire la plus simple.'],
          expressions: ['##{&2/&1}'],
          variables: [{ '&1': '$l{2;4;5;10}', '&2': '$e[1;&1-1]' }],
          type: 'result',
          // TODO : autoriser fractions non simplifiées
          defaultDelay: 20,
          grade: SIXIEME,
        },
      ],
      'Egalité de fractions': [
        {
          description: 'Compléter une égalité de fractions',
          subdescription:
            'Multiplier numérateur et dénominateur par le même nombre',
          enounces: ['Complète avec le nombre manquant.'],
          expressions: [
            '&2/&1=?/#{&1*&3}',
            '&2/&1=#{&2*&3}/?',
            '?/#{&1*&3}=&2/&1',
            '#{&2*&3}/?=&2/&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{m(&1);d(&1)}',
              '&3': '$e[2;9]',
            },
          ],
          solutions: [['#{&2*&3}'], ['#{&1*&3}'], ['#{&2*&3}'], ['#{&1*&3}']],
          correctionDetails: [
            [
              { text: "$$\\dfrac{&2}{&1} = \\dfrac{\\textcolor{green}{%{&2*&3}}}{%{&1*&3}}$$ car $$&1 \\textcolor{teal}{\\times &3} = %{&1*&3}$$ et $$&2 \\textcolor{teal}{\\times &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&3}}}$$" },
            ],
            [
              { text: "$$\\dfrac{&2}{&1} = \\dfrac{%{&2*&3}}{\\textcolor{green}{%{&1*&3}}}$$ car $$&2 \\textcolor{teal}{\\times &3} = %{&2*&3}$$ et $$&1 \\textcolor{teal}{\\times &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&3}}}$$" },
            ],
            [
              { text: "$$\\dfrac{\\textcolor{green}{%{&2*&3}}}{%{&1*&3}} = \\dfrac{&2}{&1}$$ car $$&1 \\textcolor{teal}{\\times &3} = %{&1*&3}$$ et $$&2 \\textcolor{teal}{\\times &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&3}}}$$" },
            ],
            [
              { text: "$$\\dfrac{%{&2*&3}}{\\textcolor{green}{%{&1*&3}}}  = \\dfrac{&2}{&1}$$ car $$&2 \\textcolor{teal}{\\times &3} = %{&2*&3}$$ et $$&1 \\textcolor{teal}{\\times &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&3}}}$$" },
            ],

          ],
          type: 'trou',
          defaultDelay: 20,
          grade: SIXIEME,
          help: `<section>
          <h3 class="orange-text">Compléter une égalité de fractions</h3>
          <div class="r-stretch d-flex flex-column justify-center">
            $$\\dfrac{5}{4}=\\dfrac{\\ldots}{12}$$
          </div>
          <p>Pour passer de 4 à 12, je multiplie par 3</p>
        </section>
        <section>
          <h3 class="orange-text">Compléter une égalité de fractions</h3>
          <div class="r-stretch d-flex flex-column justify-center">
            $$\\dfrac{5}{4}=\\dfrac{\\textcolor{green}{15}}{12}$$
          </div>
          <p>Donc je multiplie également 5 par 4</p>
        </section>`
        },
        {
          description: 'Compléter une égalité de fractions',
          subdescription:
            'Diviser numérateur et dénominateur par le même nombre',
          enounces: ['Complète avec le  nombre manquant.'],
          expressions: [
            '#{&2*&3}/#{&1*&3}=?/&1',
            '#{&2*&3}/#{&1*&3}=&2/?',
            '?/&1=#{&2*&3}/#{&1*&3}',
            '&2/?=#{&2*&3}/#{&1*&3}',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{m(&1);d(&1)}',
              '&3': '$e[2;9]',
            },
          ],
          solutions: [['&2'], ['&1'], ['&2'], ['&1']],
          correctionDetails: [
            [
              { text: "$$\\dfrac{%{&2*&3}}{%{&1*&3}} = \\dfrac{\\textcolor{green}{&2}}{&1}$$ car $$%{&1*&3} \\textcolor{teal}{\\div &3} = &1$$ et $$%{&2*&3} \\textcolor{teal}{\\div &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}}$$" },
            ],
            [
              { text: "$$\\dfrac{%{&2*&3}}{%{&1*&3}} = \\dfrac{&2}{\\textcolor{green}{&1}}$$ car $$%{&2*&3} \\textcolor{teal}{\\div &3} = &2$$ et $$%{&1*&3} \\textcolor{teal}{\\div &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1}}$$" },
            ],
            [
              { text: "$$\\dfrac{\\textcolor{green}{&2}}{&1}  = \\dfrac{%{&2*&3}}{%{&1*&3}}$$ car $$%{&1*&3} \\textcolor{teal}{\\div &3} = &1$$ et $$%{&2*&3} \\textcolor{teal}{\\div &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}}$$" },
            ],
            [
              { text: "$$\\dfrac{&2}{\\textcolor{green}{&1}}  = \\dfrac{%{&2*&3}}{%{&1*&3}}$$ car $$%{&2*&3} \\textcolor{teal}{\\div &3} = &2$$ et $$%{&1*&3} \\textcolor{teal}{\\div &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1}}$$" },
            ],

          ],
          type: 'trou',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Compléter une égalité de fractions',
          subdescription: 'En utilisant le coefficient de proportionnalité',
          enounces: ['Complète avec le  nombre manquant.'],
          expressions: [
            '&1/#{&1*&3}=&2/?',
            '#{&1*&3}/&1=?/&2',
            '&2/?=&1/#{&1*&3}',
            '?/&2=#{&1*&3}/&1'
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{m(&1);d(&1)}',
              '&3': '$e[2;9]',
            },
          ],
          solutions: [
            ['#{&2*&3}'],
          ],
          correctionDetails: [
            [
              { text: "$$\\dfrac{&1}{%{&1*&3}} = \\dfrac{&2}{\\textcolor{green}{%{&2*&3}}}$$ car $$&1 \\textcolor{teal}{\\times &3} = %{&1*&3}$$ et $$&2 \\textcolor{teal}{\\times &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&3}}}$$" },
            ],
            [
              { text: "$$ \\dfrac{%{&1*&3}}{&1}  = \\dfrac{\\textcolor{green}{%{&2*&3}}}{&2}$$ car $$&1 \\textcolor{teal}{\\times &3} = %{&1*&3}$$ et $$&2 \\textcolor{teal}{\\times &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&3}}}$$" },
            ],
            [
              { text: "$$\\dfrac{&2}{\\textcolor{green}{%{&2*&3}}}  = \\dfrac{&1}{%{&1*&3}}$$ car $$&1 \\textcolor{teal}{\\times &3} = %{&1*&3}$$ et $$&2 \\textcolor{teal}{\\times &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&3}}}$$" },
            ],
            [
              { text: "$$ \\dfrac{\\textcolor{green}{%{&2*&3}}}{&2} = \\dfrac{%{&1*&3}}{&1}$$ car $$&1 \\textcolor{teal}{\\times &3} = %{&1*&3}$$ et $$&2 \\textcolor{teal}{\\times &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&3}}}$$" },
            ],

          ],
          type: 'trou',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Compléter une égalité de fractions',
          subdescription: 'En utilisant le coefficient de proportionnalité (2)',
          enounces: ['Complète avec le  nombre manquant.'],
          expressions: [
            '&1/#{&1*&3}=?/#{&2*&3}',
            '#{&1*&3}/&1=#{&2*&3}/?',
            '?/#{&2*&3}=&1/#{&1*&3}',
            '#{&2*&3}/?=#{&1*&3}/&1'
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{m(&1);d(&1)}',
              '&3': '$e[2;9]',
            },
          ],
          solutions: [
            ['&2'],
          ],
          correctionDetails: [
            [
              { text: "$$\\dfrac{&1}{%{&1*&3}} = \\dfrac{\\textcolor{green}{&2}}{%{&2*&3}}$$ car $$%{&1*&3} \\textcolor{teal}{\\div &3} = &1$$ et $$%{&2*&3} \\textcolor{teal}{\\div &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}}$$" },
            ],
            [
              { text: "$$ \\dfrac{%{&1*&3}}{&1}  = \\dfrac{%{&2*&3}}{\\textcolor{green}{&2}}$$ car $$%{&1*&3} \\textcolor{teal}{\\div &3} = &1$$ et $$%{&2*&3} \\textcolor{teal}{\\div &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}}$$" },
            ],
            [
              { text: "$$\\dfrac{\\textcolor{green}{&2}}{%{&2*&3}}  = \\dfrac{&1}{%{&1*&3}}$$ car $$%{&1*&3} \\textcolor{teal}{\\div &3} = &1$$ et $$%{&2*&3} \\textcolor{teal}{\\div &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}}$$" },
            ],
            [
              { text: "$$ \\dfrac{%{&2*&3}}{\\textcolor{green}{&2}}  = \\dfrac{%{&1*&3}}{&1}$$ car $$%{&1*&3} \\textcolor{teal}{\\div &3} = &1$$ et $$%{&2*&3} \\textcolor{teal}{\\div &3} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}}$$" },
            ],

          ],
          type: 'trou',
          defaultDelay: 20,
          grade: CINQUIEME,
        },

      ],
      Simplification: [
        {
          description: 'Simplifier une fraction',
          subdescription: 'Simplifier par 10; 100; 1000',
          enounces: ['Simplifie le plus possible cette fraction.'],
          expressions: ['#{&1*&3}/#{&2*&4}'],
          variables: [{
            '&1': '$l{10;100;1000}',
            '&2': '$l{10;100;1000}',
            '&3': '$e[1;9]\\{cd&2}',
            '&4': '$e[2;9]\\{cd&1;cd&3}'
          },
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{%{&1*&3}}{%{&2*&4}} &= \\dfrac{%{&1*&3} \\textcolor{teal}{\\div %{mini(&1;&2)}}}{%{&2*&4} \\textcolor{teal}{\\div %{mini(&1;&2)}}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&3/(&2*&4)}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Simplifier une fraction',
          subdescription: 'Simplifier par 2 ; 3 ou 5',
          enounces: ['Simplifie cette fraction par 2 ; 3 ou 5.'],
          expressions: ['#{&1*&2}/#{&1*&3}'],
          variables: [{
            '&1': '$l{2;3;5}',
            '&2': '$e[1;9]\\{cd&1}',
            '&3': '$e[2;9]\\{cd&1;cd&2}'
          },
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{%{&1*&2}}{%{&1*&3}} &= \\dfrac{%{&1*&2} \\textcolor{teal}{\\div &1}}{%{&1*&3} \\textcolor{teal}{\\div &1}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&3}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Simplifier une fraction',
          subdescription: 'simplification par 2 ; 3 ; 5 ; 7 ; 11',
          enounces: ['Simplifie cette fraction.'],
          expressions: ['#{&1*&2}/#{&1*&3}'],
          variables: [{
            '&1': '$l{2;3;5;7;11}',
            '&2': '$e[1;9]\\{cd&1}',
            '&3': '$e[2;9]\\{cd&1;cd&2}'
          },

          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{%{&1*&2}}{%{&1*&3}} &= \\dfrac{%{&1*&2} \\textcolor{teal}{\\div &1}}{%{&1*&3} \\textcolor{teal}{\\div &1}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&3}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Simplifier une fraction',
          subdescription: 'La simplification peut se faire en plusieurs étapes',
          enounces: ['Simplifie le plus possible.'],
          expressions: ['#{&2*&3}/#{&1*&3}'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[1;9]\\{&1}', '&3': '$e[2;9]' }],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{%{&2*&3}}{%{&1*&3}} &= \\dfrac{%{&2*&3} \\textcolor{teal}{\\div %{&3*pgcd(&1;&2)}}}{%{&1*&3} \\textcolor{teal}{\\div  %{&3*pgcd(&1;&2)}}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Simplifier une fraction',
          enounces: ['Simplifie les signes.'],
          expressions: [
            '(-&1)/&2',
            '&1/(-&2)',
            '(-&1)/(-&2)',
          ],
          variables: [{ '&1': '$e[1;9]', '&2': '$e[2;9]\\{cd&1}' }],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: 'Simplifier une fraction',
          subdescription: 'Simplifier le plus possible (avec signes)',
          enounces: ['Simplifie le plus possible.'],
          expressions: [
            '(-#{&2*&3})/#{&1*&3}',
            '#{&2*&3}/(-#{&1*&3})',
            '(-#{&2*&3})/(-#{&1*&3})',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[1;9]\\{&1}', '&3': '$e[2;9]' }],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{-%{&2*&3}}{%{&1*&3}} &= -\\dfrac{%{&2*&3} \\textcolor{teal}{\\div %{&3*pgcd(&1;&2)}}}{%{&1*&3} \\textcolor{teal}{\\div  %{&3*pgcd(&1;&2)}}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{-%{&2/&1}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\dfrac{%{&2*&3}}{-%{&1*&3}} &= -\\dfrac{%{&2*&3} \\textcolor{teal}{\\div %{&3*pgcd(&1;&2)}}}{%{&1*&3} \\textcolor{teal}{\\div  %{&3*pgcd(&1;&2)}}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{-%{&2/&1}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\dfrac{-%{&2*&3}}{-%{&1*&3}} &= \\dfrac{%{&2*&3} \\textcolor{teal}{\\div %{&3*pgcd(&1;&2)}}}{%{&1*&3} \\textcolor{teal}{\\div  %{&3*pgcd(&1;&2)}}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
      ],
      Comparer: [
        {
          description: "Comparer deux fractions",
          subdescription: "Fractions de même dénominateur",
          enounces: ["Quelle est la plus petite de ces 2 fractions ?"],
          variables: [
            {
              '&1': '$e[8;19]',
              '&2': '$e[1;&1-1]\\{&1}',
              '&3': '$e[1;&1-1]\\{&1;&2}',
              '&4': '&2/&1',
              '&5': '&3/&1'
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[&1+1;3*&1-1]\\{&1}',
              '&3': '$e[&1+1;3*&1-1]\\{&1;&2}',
              '&4': '&2/&1',
              '&5': '&3/&1'
            },
          ],
          choices: [
            [{ text: '$$\\dfrac{&2}{&1}$$' }, { text: '$$\\dfrac{&3}{&1}$$' }],
          ],

          correctionFormat: [{
            correct: ['Entre $$\\dfrac{&2}{&1}$$ et $$\\dfrac{&3}{&1}$$ la plus petite fraction est &solution'],
            uncorrect: ['Entre $$\\dfrac{&2}{&1}$$ et $$\\dfrac{&3}{&1}$$ la plus petite fraction est &solution'],
            answer: 'La plus petite fraction est &answer'
          }],
          correctionDetails: [
            [
              { text: "&solution est plus petite que $$\\dfrac{%{maxi(&2;&3)}}{&1}$$ car les deux fractions ont <b>même dénominateur</b> et $$%{mini(&2;&3)}<%{maxi(&2;&3)}$$" },
            ],
          ],
          solutions: [
            ['&4<&5 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: "Comparer deux fractions",
          subdescription: "Fractions de même numérateur",
          enounces: ["Quelle est la plus petite de ces 2 fractions ?"],
          variables: [
            {
              '&1': '$e[8;19]',
              '&2': '$e[2;&1-1]\\{&1}',
              '&3': '$e[2;&1-1]\\{&1;&2}',
              '&4': '&1/&2',
              '&5': '&1/&3'
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[&1+1;3*&1-1]\\{&1}',
              '&3': '$e[&1+1;3*&1-1]\\{&1;&2}',
              '&4': '&1/&2',
              '&5': '&1/&3'
            },
          ],
          choices: [
            [{ text: '$$\\dfrac{&1}{&2}$$' }, { text: '$$\\dfrac{&1}{&3}$$' }],
          ],

          correctionFormat: [{
            correct: ['Entre $$\\dfrac{&1}{&2}$$ et $$\\dfrac{&1}{&3}$$ la plus petite fraction est &solution'],
            uncorrect: ['Entre $$\\dfrac{&1}{&2}$$ et $$\\dfrac{&1}{&3}$$ la plus petite fraction est &solution'],
            answer: 'La plus petite fraction est &answer'
          }],
          correctionDetails: [
            [
              { text: "&solution est plus petite que $$\\dfrac{&1}{%{mini(&2;&3)}}$$ car les deux fractions ont <b>même numérateur</b> et $$%{maxi(&2;&3)}>%{mini(&2;&3)}$$" },
            ],
          ],
          solutions: [
            ['&4<&5 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: "Comparer deux fractions",
          subdescription: "En comparant à 1",
          enounces: ["Quelle est la plus petite de ces 2 fractions ?"],
          variables: [
            {
              '&1': '$e[8;19]',
              '&2': '$e[1;&1-1]',
              '&3': '$e[8;19]\\{&1}',
              '&4': '$e[&3+1;2*&3-1]\\{&2}',
              '&5': '&2/&1',
              '&6': '&4/&3'
            },

          ],
          choices: [
            [{ text: '$$\\dfrac{&2}{&1}$$' }, { text: '$$\\dfrac{&4}{&3}$$' }],
            [{ text: '$$\\dfrac{&4}{&3}$$' }, { text: '$$\\dfrac{&2}{&1}$$' }],
          ],
          correctionFormat: [{
            correct: ['Entre $$\\dfrac{&2}{&1}$$ et $$\\dfrac{&4}{&3}$$ la plus petite fraction est &solution'],
            uncorrect: ['Entre $$\\dfrac{&2}{&1}$$ et $$\\dfrac{&4}{&3}$$ la plus petite fraction est &solution'],
            answer: 'La plus petite fraction est &answer'
          }],
          solutions: [
            ['&5<&6 ?? 0 :: 1'],
            ['&6<&5 ?? 0 :: 1'],
          ],
          correctionDetails: [
            [
              { text: "&solution est plus petite que $$%{maxi(&2/&1;&4/&3)}$$ car $$%{mini(&2/&1;&4/&3)}<1$$ et $$%{maxi(&2/&1;&4/&3)}>1$$" },
            ],
          ],
          type: 'choice',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: "Comparer deux fractions",
          subdescription: "Fractions de dénominateurs multiples l'un de l'autre",
          enounces: ["Quelle est la plus petite de ces 2 fractions ?"],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;8]',
              '&3': '$e[&2+1;9]',
              '&4': '$e[&2*2;&3*&1-1]\\{&2*&1}',
              '&5': '&2/&3',
              '&6': '&4/(&3*&1)'
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;8]',
              '&3': '$e[&2+1;9]',
              '&4': '$e[&2*&1+1;80]\\{&2*&1}',
              '&5': '&3/&2',
              '&6': '&4/(&2*&1)'
            },
          ],
          choices: [
            [{ text: '$$\\dfrac{&2}{&3}$$' }, { text: '$$\\dfrac{#{&4}}{#{&3*&1}}$$' }],
            [{ text: '$$\\dfrac{&3}{&2}$$' }, { text: '$$\\dfrac{#{&4}}{#{&2*&1}}$$' }],
          ],
          correctionFormat: [{
            correct: ['Entre $$\\dfrac{&2}{&3}$$ et $$\\dfrac{#{&4}}{#{&3*&1}}$$ la plus petite fraction est &solution'],
            uncorrect: ['Entre $$$\\dfrac{&2}{&3}$$ et $$\\dfrac{#{&4}}{#{&3*&1}}$$ la plus petite fraction est &solution'],
            answer: 'La plus petite fraction est &answer'
          },
          {
            correct: ['Entre $$\\dfrac{&3}{&2}$$ et $$\\dfrac{#{&4}}{#{&3*&1}}$$ la plus petite fraction est &solution'],
            uncorrect: ['Entre $$$\\dfrac{&3}{&2}$$ et $$\\dfrac{#{&4}}{#{&2*&1}}$$ la plus petite fraction est &solution'],
            answer: 'La plus petite fraction est &answer'
          }
          ],

          solutions: [
            ['&5<&6 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 20,
          grade: CINQUIEME,
        },

      ]
    },
    'A trou': {

      'Addition - Soustraction': [
        {
          description: 'Compléter une addition ou soustraction à trou',
          subdescription: 'Avec des quotients.',
          enounces: ['Complète.'],
          expressions: [
            '?/&3+&2/&3=#{&1+&2}/&3',
            '&1/?+&2/&3=#{&1+&2}/&3',
            '&1/&3+?/&3=#{&1+&2}/&3',
            '&1/&3-&2/?=#{&1-&2}/&3',
            '?/&3-&2/&3=#{&1-&2}/&3',
            '&1/&3-?/&3=#{&1-&2}/&3',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;19]\\{cd(&1);cd(&2)}',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;19]\\{cd(&1);cd(&2)}',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;19]\\{cd(&1);cd(&2)}',
            },
            {
              '&1': '$e[3;9]',
              '&2': '$e[2;&1-1]',
              '&3': '$e[2;19]\\{cd(&1);cd(&2)}',
            },
            {
              '&1': '$e[3;9]',
              '&2': '$e[2;&1-1]',
              '&3': '$e[2;19]\\{cd(&1);cd(&2)}',
            },
            {
              '&1': '$e[3;9]',
              '&2': '$e[2;&1-1]',
              '&3': '$e[2;19]\\{cd(&1);cd(&2)}',
            },
          ],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&1'], ['&3'], ['&2'], ['&3'], ['&1'], ['&2']],
          type: 'trou',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: 'Compléter une addition ou soustraction à trou',
          subdescription: 'Quotients avec nombres relatifs',
          enounces: ['Complète cette égalité avec le  nombre manquant.'],
          expressions: [
            '?/&3+{&2}/&3=#{&1+(&2)}/&3',
            '{&1}/?+{&2}/&3=#{&1+(&2)}/&3',
            '{&1}/&3+?/&3=#{&1+(&2)}/&3',
            '{&1}/&3-{&2}/?=#{&1-(&2)}/&3',
            '?/&3-{&2}/&3=#{&1-(&2)}/&3',
            '{&1}/&3-?/&3=#{&1-(&2)}/&3',
          ],
          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$er[2;9]',
              '&3': '$e[2;19]\\{cd(&1);cd(&2)}',
            },
          ],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&1'], ['&3'], ['&2'], ['&3'], ['&1'], ['&2']],
          type: 'trou',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
      ],
      Multiplication: [
        {
          description: 'Compléter une égalité une multiplication à trou',
          subdescription: 'Avec des quotients. Nombres positifs.',
          enounces: ['Complète.'],
          expressions: [
            '(?/&3)*(&2/&4)=#{&1*&2}/#{&3*&4}',
            '(&1/?)*(&2/&4)=#{&1*&2}/#{&3*&4}',
            '(&1/&3)*(?/&4)=#{&1*&2}/#{&3*&4}',
            '(&1/&3)*(&2/?)=#{&1*&2}/#{&3*&4}',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{&1;&2}',
              '&4': '$e[2;9]\\{&1;&2}',
            },
          ],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&1'], ['&3'], ['&2'], ['&4']],
          type: 'trou',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Quotients avec nombres relatifs',
          enounces: ['Complète.'],
          expressions: [

            '(?/(&3))*((&2)/(&4))=#{(&1*(&2))/(&3*(&4))}',
            '((&1)/?)*((&2)/(&4))=#{&1*(&2)/(&3*(&4))}',
            '((&1)/(&3))*(?/(&4))=#{&1*(&2)/(&3*(&4))}',
            '((&1)/(&3))*((&2)/?)=#{&1*(&2)/(&3*(&4))}',
          ],
          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$er[2;9]',
              '&3': '$er[2;9]\\{cd(&1);cd(&2)}',
              '&4': '$er[2;9]\\{cd(&1);cd(&2)}',
            },
          ],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&1'],
          ['&3'], ['&2'], ['&4']
          ],
          type: 'trou',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
      ],
    },
    Calculer: {
      'Addition et Soustraction': [
        {
          description: 'Additionner des fractions',
          subdescription:
            'Fractions décimales.',
          enounces: ['Calcule.'],
          expressions: ['&1/10+&2/10', '&1/10+&2/10+&3/10', '&1/100+&2/100',],
          variables: [
            {
              '&1': '$e[2;13]',
              '&2': '$e[2;13]',

            },
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
            },
            {
              '&1': '$e[1;80]',
              '&2': '$e[1;50]',
            },
          ],
          type: 'result',
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{&1}{\\textcolor{teal}{10}}+\\dfrac{&2}{\\textcolor{teal}{10}} &= \\dfrac{&1+&2}{\\textcolor{teal}{10}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&1+&2}}{10}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\dfrac{&1}{\\textcolor{teal}{10}}+\\dfrac{&2}{\\textcolor{teal}{10}}+\\dfrac{&3}{\\textcolor{teal}{10}} &= \\dfrac{&1+&2+&3}{\\textcolor{teal}{10}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&1+&2+&3}}{10}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\dfrac{&1}{\\textcolor{teal}{100}}+\\dfrac{&2}{\\textcolor{teal}{100}} &= \\dfrac{&1+&2}{\\textcolor{teal}{100}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&1+&2}}{100}}} \\end{align}$$" },
            ],

          ],
          defaultDelay: 30,
          grade: CM1,
        },
        {
          description: 'Additionner des fractions',
          subdescription:
            'Fractions de même dénominateur, nombres positifs, sans simplification',
          enounces: ['Calcule.'],
          expressions: ['&1/&3+&2/&3'],
          variables: [
            {
              '&1': '$e[2;13]',
              '&2': '$e[2;13]',
              '&3': '$e[2;25]\\{cd(&1);cd(&2);cd(&2+&1)}',
            }
          ],
          type: 'result',
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{&1}{\\textcolor{teal}{&3}}+\\dfrac{&2}{\\textcolor{teal}{&3}} &= \\dfrac{&1+&2}{\\textcolor{teal}{&3}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&1+&2}}{&3}}} \\end{align}$$" },
            ],
          ],

          defaultDelay: 30,
          grade: SIXIEME,
        },
        {
          description: 'Additionner ou soustraire des fractions',
          subdescription:
            'Fractions de même dénominateur, nombres positifs, sans simplification',
          enounces: ['Calcule.'],
          expressions: ['&1/&3+&2/&3', '&1/&3-&2/&3'],
          variables: [
            {
              '&1': '$e[2;13]',
              '&2': '$e[2;13]',
              '&3': '$e[2;25]\\{cd(&1);cd(&2);cd(&2+&1)}',
            },
            {
              '&1': '$e[3;13]',
              '&2': '$e[2;&1-1]',
              '&3': '$e[2;25]\\{cd(&1);cd(&2);cd(&1-&2)}',
            },
          ],
          type: 'result',
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{&1}{\\textcolor{teal}{&3}}+\\dfrac{&2}{\\textcolor{teal}{&3}} &= \\dfrac{&1+&2}{\\textcolor{teal}{&3}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&1+&2}}{&3}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\dfrac{&1}{\\textcolor{teal}{&3}}-\\dfrac{&2}{\\textcolor{teal}{&3}} &= \\dfrac{&1-&2}{\\textcolor{teal}{&3}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&1-&2}}{&3}}} \\end{align}$$" },
            ],
          ],
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Additionner ou soustraire',
          subdescription:
            "Dénominateur multiple de l'autre, nombres positifs, sans simplification",
          enounces: ['Calcule.'],
          expressions: [
            '&1/&3+&2/#{&3*&4}',
            '&2/#{&3*&4}+&1/&3',
            '&1/&3-&2/#{&3*&4}',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&1);cd(&2)}',
              '&4': '$e[2;9]\\{cd(&2)}',
            },

          ],
          conditions: [
            'pgcd(&1*&4+&2;&3*&4)=1',
            'pgcd(&1*&4+&2;&3*&4)=1',
            '&1*&4>&2 && pgcd(&1*&4-&2;&3*&4)=1',
          ],
          type: 'result',
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{&1}{&3} + \\dfrac{&2}{%{&3*&4}} &= \\dfrac{&1\\textcolor{orange}{\\times &4}}{&3\\textcolor{orange}{\\times &4}} + \\dfrac{&2}{%{&3*&4}} \\\\ &= \\dfrac{%{&1*&4}}{\\textcolor{teal}{%{&3*&4}}} + \\dfrac{&2}{\\textcolor{teal}{%{&3*&4}}} \\\\ &= \\dfrac{%{&1*&4}+&2}{\\textcolor{teal}{%{&3*&4}}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&1*&4+&2}}{%{&3*&4}}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\dfrac{&2}{%{&3*&4}} + \\dfrac{&1}{&3} &= \\dfrac{&2}{%{&3*&4}} + \\dfrac{&1\\textcolor{orange}{\\times &4}}{&3\\textcolor{orange}{\\times &4}} \\\\ &= \\dfrac{&2}{\\textcolor{teal}{%{&3*&4}}} + \\dfrac{%{&1*&4}}{\\textcolor{teal}{%{&3*&4}}} \\\\ &= \\dfrac{&2+%{&1*&4}}{\\textcolor{teal}{%{&3*&4}}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&1*&4+&2}}{%{&3*&4}}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\dfrac{&1}{&3} - \\dfrac{&2}{%{&3*&4}} &= \\dfrac{&1\\textcolor{orange}{\\times &4}}{&3\\textcolor{orange}{\\times &4}} - \\dfrac{&2}{%{&3*&4}} \\\\ &= \\dfrac{%{&1*&4}}{\\textcolor{teal}{%{&3*&4}}} - \\dfrac{&2}{\\textcolor{teal}{%{&3*&4}}} \\\\ &= \\dfrac{%{&1*&4}-&2}{\\textcolor{teal}{%{&3*&4}}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&1*&4-&2}}{%{&3*&4}}}} \\end{align}$$" },
            ],


          ],
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Additionner ou soustraire',
          subdescription:
            "Dénominateur multiple de l'autre, nombres positifs, simplification initiale",
          enounces: ["Calcule en simplifiant d'abord une des 2 fractions"],
          expressions: ['&1/&3+#{&2*&4}/#{&3*&4}', '#{&2*&4}/#{&3*&4}+&1/&3'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&1);cd(&2)}',
              '&4': '$e[2;9]\\{cd(&2);cd(&3)}',
            },
          ],
          conditions: ['pgcd(&1+&2;&3)=1'],
          type: 'result',
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{&1}{&3} + \\dfrac{%{&2*&4}}{%{&3*&4}} &= \\dfrac{&1}{&3} + \\dfrac{%{&2*&4}\\textcolor{orange}{\\div &4}}{%{&3*&4}\\textcolor{orange}{\\div &4}} \\\\ &= \\dfrac{&1}{\\textcolor{teal}{&3}} + \\dfrac{&2}{\\textcolor{teal}{&3}} \\\\ &= \\dfrac{&1+&2}{\\textcolor{teal}{&3}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&1+&2}}{&3}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\dfrac{%{&2*&4}}{%{&3*&4}} + \\dfrac{&1}{&3} &= \\dfrac{%{&2*&4}\\textcolor{orange}{\\div &4}}{%{&3*&4}\\textcolor{orange}{\\div &4}} + \\dfrac{&1}{&3} \\\\ &= \\dfrac{&2}{\\textcolor{teal}{&3}} + \\dfrac{&1}{\\textcolor{teal}{&3}} \\\\ &= \\dfrac{&2+&1}{\\textcolor{teal}{&3}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&1+&2}}{&3}}} \\end{align}$$" },
            ],

          ],
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Additionner ou soustraire',
          subdescription:
            "Un entier et une fraction",
          enounces: ['Calcule.'],
          expressions: ['&2/&1+&3', '&3+&2/&1'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{cd&1}',
              '&3': '$e[2;9]',
            },
          ],

          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{&2}{&1} + &3 &= \\dfrac{&2}{&1} + \\dfrac{&3\\textcolor{orange}{\\times &1}}{\\textcolor{orange}{&1}} \\\\ &= \\dfrac{&2}{\\textcolor{teal}{&1}} + \\dfrac{%{&3*&1}}{\\textcolor{teal}{&1}} \\\\ &= \\dfrac{&2+%{&3*&1}}{\\textcolor{teal}{%{&1}}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&3*&1+&2}}{&1}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} &3 + \\dfrac{&2}{&1} &= \\dfrac{&3\\textcolor{orange}{\\times &1}}{\\textcolor{orange}{&1}} + \\dfrac{&2}{&1} \\\\ &= \\dfrac{%{&3*&1}}{\\textcolor{teal}{&1}} + \\dfrac{&2}{\\textcolor{teal}{&1}} \\\\ &= \\dfrac{%{&3*&1}+&2}{\\textcolor{teal}{%{&1}}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&3*&1+&2}}{&1}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Additionner ou soustraire',
          subdescription:
            'Fractions de même dénominateur, nombres positifs, simplification intermediaire possible, simplification finale',
          enounces: ["Calcule."],
          expressions: [
            '#{&2*&4}/#{&1*&3}+#{(&1-&2)*&4}/#{&1*&3}',
            '#{&1*&4}/#{&2*&3}-#{(&1-&2)*&4}/#{&2*&3}',
          ],

          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{%{&2*&4}}{\\textcolor{teal}{%{&1*&3}}} + \\dfrac{%{(&1-&2)*&4}}{\\textcolor{teal}{%{&1*&3}}} &= \\dfrac{%{&2*&4}+%{(&1-&2)*&4}}{\\textcolor{teal}{%{&1*&3}}} \\\\ &= \\dfrac{%{&1*&4}}{%{&1*&3}} \\\\ &=  \\dfrac{%{&1*&4}\\textcolor{orange}{\\div %{pgcd(&1*&3;&1*&4)}}}{%{&1*&3}\\textcolor{orange}{\\div %{pgcd(&1*&3;&1*&4)}}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&4/(&1*&3)}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\dfrac{%{&1*&4}}{\\textcolor{teal}{%{&2*&3}}} - \\dfrac{%{(&1-&2)*&4}}{\\textcolor{teal}{%{&2*&3}}} &= \\dfrac{%{&1*&4}-%{(&1-&2)*&4}}{\\textcolor{teal}{%{&2*&3}}} \\\\ &= \\dfrac{%{&2*&4}}{%{&2*&3}} \\\\ &=  \\dfrac{%{&2*&4}\\textcolor{orange}{\\div %{pgcd(&2*&3;&2*&4)}}}{%{&2*&3}\\textcolor{orange}{\\div %{pgcd(&2*&3;&2*&4)}}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&4/(&2*&3)}}} \\end{align}$$" },
            ],
          ],
          variables: [
            {
              '&1': '$e[3;9]',
              '&2': '$e[2;&1-1]',
              '&3': '$e[2;9]',
              '&4': '$e[2;9]\\{&3}',
            },
          ],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        // {
        //   description: 'Additionner ou soustraire',
        //   subdescription:
        //     'Fractions de même dénominateur, nombres relatifs, simplification intermediaire possible, simplification finale',
        //   enounces: ['Calcule.'],
        //   expressions: [
        //     '(-&1)/&3+(-&2)/&3',
        //     '(-&1)/&3+&2/&3',
        //     '&1/&3+(-&2)/&3',
        //     '&1/&3+&2/&3',
        //     '(-&1)/&3-(-&2)/&3',
        //     '(-&1)/&3-&2/&3',
        //     '&1/&3-(-&2)/&3',
        //     '&1/&3-&2/&3',
        //   ],

        //   details: [
        //     [
        //       '\\dfrac{-&1+(-&2)}{&3}',
        //       '\\dfrac{#{-&1+(-&2)}}{&3}',
        //       '&4>1 && &4<&3??\\dfrac{#{-&1+(-&2)}:#{&4}}{&3:#{&4}}',
        //     ],
        //     [
        //       '\\dfrac{-&1+&2}{&3}',
        //       '\\dfrac{#{-&1+&2}}{&3}',
        //       '&4>1 && &4<&3??\\dfrac{#{-&1+&2}:#{&4}}{&3:#{&4}}',
        //     ],
        //     [
        //       '\\dfrac{&1+(-&2)}{&3}',
        //       '\\dfrac{#{&1-&2}}{&3}',
        //       '&4>1 && &4<&3??\\dfrac{#{&1-&2}:#{&4}}{&3:#{&4}}',
        //     ],
        //     [
        //       '\\dfrac{&1+&2}{&3}',
        //       '\\dfrac{#{&1+&2}}{&3}',
        //       '&4>1 && &4<&3??\\dfrac{#{&1+&2}:#{&4}}{&3:#{&4}}',
        //     ],

        //     [
        //       '\\dfrac{-&1-(-&2)}{&3}',
        //       '\\dfrac{-&1+&2}{&3}',
        //       '\\dfrac{#{-&1+&2}}{&3}',
        //       '&4>1 && &4<&3??\\dfrac{#{-&1+&2}:#{&4}}{&3:#{&4}}',
        //     ],
        //     [
        //       '\\dfrac{-&1-&2}{&3}',
        //       '\\dfrac{#{-&1-&2}}{&3}',
        //       '&4>1 && &4<&3??\\dfrac{#{-&1-&2}:#{&4}}{&3:#{&4}}',
        //     ],
        //     [
        //       '\\dfrac{&1-(-&2)}{&3}',
        //       '\\dfrac{&1+&2}{&3}',
        //       '\\dfrac{#{&1+&2}}{&3}',
        //       '&4>1 && &4<&3??\\dfrac{#{&1+&2}:#{&4}}{&3:#{&4}}',
        //     ],
        //     [
        //       '\\dfrac{&1-&2}{&3}',
        //       '\\dfrac{#{&1-&2}}{&3}',
        //       '&4>1 && &4<&3??\\dfrac{#{&1-&2}:#{&4}}{&3:#{&4}}',
        //     ],
        //   ],
        //   variables: [
        //     {
        //       '&1': '$e[2;9]',
        //       '&2': '$e[2;9]\\{&1}',
        //       '&3': '$e[2;9]',
        //       '&4': 'pgcd(&1+&2;&3)',
        //     },
        //     {
        //       '&1': '$e[2;9]',
        //       '&2': '$e[2;9]\\{&1}',
        //       '&3': '$e[2;9]',
        //       '&4': 'pgcd(-&1+&2;&3)',
        //     },
        //     {
        //       '&1': '$e[2;9]',
        //       '&2': '$e[2;9]\\{&1}',
        //       '&3': '$e[2;9]',
        //       '&4': 'pgcd(&1-&2;&3)',
        //     },
        //     {
        //       '&1': '$e[2;9]',
        //       '&2': '$e[2;9]\\{&1}',
        //       '&3': '$e[2;9]',
        //       '&4': 'pgcd(&1+&2;&3)',
        //     },

        //     {
        //       '&1': '$e[2;9]',
        //       '&2': '$e[2;9]\\{&1}',
        //       '&3': '$e[2;9]',
        //       '&4': 'pgcd(-&1+&2;&3)',
        //     },
        //     {
        //       '&1': '$e[2;9]',
        //       '&2': '$e[2;9]\\{&1}',
        //       '&3': '$e[2;9]',
        //       '&4': 'pgcd(&1+&2;&3)',
        //     },
        //     {
        //       '&1': '$e[2;9]',
        //       '&2': '$e[2;9]\\{&1}',
        //       '&3': '$e[2;9]',
        //       '&4': 'pgcd(&1+&2;&3)',
        //     },
        //     {
        //       '&1': '$e[2;9]',
        //       '&2': '$e[2;9]\\{&1}',
        //       '&3': '$e[2;9]',
        //       '&4': 'pgcd(&1-&2;&3)',
        //     },
        //   ],
        //   type: 'result',

        //   defaultDelay: 20,
        //   grade: QUATRIEME,
        // },

      ],
      "Fraction d'une quantité": [
        {
          description: "Calculer une fraction d'une quantité",
          enounces: ['Calculer $$\\dfrac{&2}{&3}$$ de $$%{&1*&3}$$'],
          expressions: ['(&2/&3)*#{&1*&3}'],
          options: ['no-exp'],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]\\{cd(&2)}' },
          ],
          correctionFormat: [{
            correct: ['$$\\dfrac{&2}{&3}$$ de $$%{&1*&3}$$ est égal à &answer'],
            uncorrect: ['$$\\dfrac{&2}{&3}$$ de $$%{&1*&3}$$ est égal à &solution'],
            answer: '$$\\dfrac{&2}{&3}$$ de $$%{&1*&3}$$ est égal à &answer',

          }],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{\\textcolor{teal}{&2}}{\\textcolor{orange}{&3}} \\text{ de } %{&1*&3} &= %{&1*&3}\\textcolor{orange}{\\div &3} \\textcolor{teal}{\\times &2} \\\\ &= &1 \\times &2 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2}}}} \\end{align}$$" },
            ],

          ],
          details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: "Calculer une fraction d'une quantité",
          subdescription: "Dans les 2 sens",
          expressions: ['(&2/&3)*#{&1*&3}', '#{&1*&3}*(&2/&3)'],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]\\{cd(&2)}' },
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{\\textcolor{teal}{&2}}{\\textcolor{orange}{&3}} \\times %{&1*&3} &= %{&1*&3}\\textcolor{orange}{\\div &3} \\textcolor{teal}{\\times &2} \\\\ &= &1 \\textcolor{teal}{\\times &2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2}}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} %{&1*&3} \\times \\dfrac{\\textcolor{teal}{&2}}{\\textcolor{orange}{&3}}  &= %{&1*&3}\\textcolor{orange}{\\div &3} \\textcolor{teal}{\\times &2} \\\\ &= &1 \\textcolor{teal}{\\times &2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2}}}} \\end{align}$$" },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
        {
          description: "Calculer une fraction d'une quantité",
          subdescription: "En prenant la forme décimale de la fraction",
          enounces: ['Calcule.'],
          expressions: ['{#{&2*&3}/&3}*&1}', '&1*{#{&2*&3}/&3}'],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]\\{cd(&1)}' },
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{%{&2*&3}}{&3} \\times &1 &= %{&2*&3} \\div &3 \\times &1 \\\\ &= &2 \\times &1 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&1}}}} \\end{align}$$" },
            ],

            [
              { text: "$$\\begin{align} &1 \\times \\dfrac{%{&2*&3}}{&3} &= &1 \\times \\left(%{&2*&3} \\div &3 \\right) \\\\ &= &1 \\times &2 \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&1}}}} \\end{align}$$" },
            ],

          ],
          details: [['&2 \\times &1'], ['&1 \\times &2']],
          type: 'result',
          defaultDelay: 20,
          grade: CINQUIEME,
        },
      ],
      Multiplication: [
        {
          description: 'Calculer un produit',
          subdescription: 'un entier par un quotient de numérateur 1',
          expressions: ['&1*{1/&2}', '{1/&2}*&1'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;10]\\{cd(&1)}',
            },
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} &1 \\times \\dfrac{1}{&2} &= \\dfrac{&1 \\times 1}{&2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1/&2}}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\dfrac{1}{&2} \\times &1 &= \\dfrac{1 \\times &1}{&2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1/&2}}}} \\end{align}$$" },
            ],
          ],

          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'un entier par un quotient',
          expressions: ['&1*{&3/&2}', '{&3/&2}*&1}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;10]\\{cd(&1)}',
              '&3': '$e[2;9]\\{cd(&2)}'
            },
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} &1 \\times \\dfrac{&3}{&2} &= \\dfrac{&1 \\times &3}{&2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&3/&2}}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\dfrac{&3}{&2} \\times &1 &= \\dfrac{&3 \\times &1}{&2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&3/&2}}}} \\end{align}$$" },
            ],
          ],

          type: 'result',
          defaultDelay: 20,
          grade: CM1,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Pas de simplification',
          expressions: ['{&1/&3}*{&2/&4}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&2);cd(&1)}',
              '&4': '$e[2;9]\\{cd(&2);cd(&1)}',
            },
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{&1}{&3} \\times \\dfrac{&2}{&4} &= \\dfrac{&1 \\times &2}{&3 \\times &4} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\dfrac{%{&1* &2}}{%{&3*&4}}}} \\end{align}$$" },
            ],
          ],
          details: [['\\dfrac{&1 \\times &2}{&3 \\times &4}']],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'avec simplification simple',
          enounces: ['Calcule en remarquant la simplification.'],
          expressions: ['{&1/&3}*{&2/&1}', '{&3/&1}*{&1/&2}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]\\{&1;cd&2}',
            },
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{&1}{&3} \\times \\dfrac{&2}{&1} &= \\dfrac{\\enclose{updiagonalstrike}[3px solid orange]{&1}}{&3} \\times \\dfrac{&2}{\\enclose{updiagonalstrike}[3px solid orange]{&1}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1/&2}}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\dfrac{&3}{&1} \\times \\dfrac{&1}{&2} &= \\dfrac{&3}{\\enclose{updiagonalstrike}[3px solid orange]{&1}} \\times \\dfrac{\\enclose{updiagonalstrike}[3px solid orange]{&1}}{&2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1/&2}}}} \\end{align}$$" },
            ],

          ],

          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'avec peut-être une simplification simple',
          enounces: [''],
          expressions: ['(&1/&3)*(&2/&4)}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
              '&4': '$e[2;9]',
              '&5': 'pgcd(&1*&2;&3*&4)',
            },
          ],
          details: [
            [
              '\\dfrac{&1 \\times &2}{&3 \\times &4}',
              '\\dfrac{#{&1*&2}}{#{&3*&4}}',
              '&5>1 && &5<&1*&2??\\dfrac{#{&1*&2}:#{&5}}{#{&3*&4}:#{&5}}',
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Nombres, relatifs, pas de simplification',
          expressions: [
            '(&1/&3)*(&2/&4)',
            '((-&1)/&3)*(&2/&4)',
            '(&1/(-&3))*(&2/&4)',
            '(&1/&3)*((-&2)/&4)',
            '(&1/&3)*(&2/(-&4))',
            '((-&1)/(-&3))*((-&2)/(-&4))',

            '((-&1)/(-&3))*(&2/&4)',
            '(&1/&3)*((-&2)/(-&4))',
            '((-&1)/&3)*((-&2)/&4)',
            '(&1/(-&3))*(&2/(-&4))',
            '((-&1)/&3)*(&2/(-&4))',
            '(&1/(-&3))*((-&2)/&4)',

            '(&1/(-&3))*((-&2)/(-&4))',
            '((-&1)/(-&3))*(&2/(-&4))',
            '((-&1)/&3)*((-&2)/(-&4))',
            '((-&1)/(-&3))*((-&2)/&4)',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&2);cd(&1)}',
              '&4': '$e[2;9]\\{cd(&2);cd(&1)}',
            },
          ],
          details: [
            ['\\dfrac{&1 \\times &2}{&3 \\times &4}'],

            ['-\\dfrac{&1 \\times &2}{&3 \\times &4}'],
            ['-\\dfrac{&1 \\times &2}{&3 \\times &4}'],
            ['-\\dfrac{&1 \\times &2}{&3 \\times &4}'],
            ['-\\dfrac{&1 \\times &2}{&3 \\times &4}'],

            ['\\dfrac{&1 \\times &2 }{&3 \\times &4}'],

            ['\\dfrac{&1 \\times &2}{&3 \\times &4}'],
            ['\\dfrac{&1 \\times &2}{&3 \\times &4}'],
            ['\\dfrac{&1 \\times &2}{&3 \\times &4}'],
            ['\\dfrac{&1 \\times &2}{&3 \\times &4}'],
            ['\\dfrac{&1 \\times &2}{&3 \\times &4}'],
            ['\\dfrac{&1 \\times &2}{&3 \\times &4}'],

            ['-\\dfrac{&1 \\times &2}{&3 \\times &4}'],
            ['-\\dfrac{&1 \\times &2}{&3 \\times &4}'],
            ['-\\dfrac{&1 \\times &2}{&3 \\times &4}'],
            ['-\\dfrac{&1 \\times &2}{&3 \\times &4}'],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
      ],
      Inverse: [
        {
          description: "Calculer l'inverse d'un nombre",
          enounces: [
            "Quel est l'inverse de $$&1$$",
            "Quel est l'inverse de $$\\dfrac{1}{&1}$$",
            "Quel est l'inverse de $$\\dfrac{&1}{&2}$$",
          ],
          options: ['no-exp'],
          expressions: ['&1', '1/&1', '&1/&2'],
          variables: [{ '&1': '$e[2;19]', '&2': '$e[2;19]\\{cd(&1)}' }],
          solutions: [['1/&1'], ['&1'], ['&2/&1']],
          correctionFormat: [{
            correct: ["L'inverse de $$&exp$$ est &solution"],
            uncorrect: ["L'inverse de $$&exp$$ est &solution"],
            answer: "L'inverse de $$&exp$$ est &answer"
          }],
          type: 'rewrite',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Calculer l'inverse d'un nombre",
          subdescription: 'Avec la notation puissance',
          expressions: ['&1^(-1)', '(1/&1)^(-1)', '(&1/&2)^(-1)'],
          variables: [{ '&1': '$e[2;19]', '&2': '$e[2;19]\\{cd(&1)}' }],
          solutions: [['1/&1'], ['&1'], ['&2/&1']],

          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
      ],
      Division: [
        {
          description: 'Calculer un quotient',
          subdescription:
            'Pas de simplification, avec le symbole de la division',
          expressions: ['{&1/&3}:{&4/&2}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&2);cd(&1)}',
              '&4': '$e[2;9]\\{cd(&2);cd(&1)}',
            },
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{&1}{&3} \\textcolor{teal}{\\div \\dfrac{&4}{&2}} &= \\dfrac{&1}{&3} \\textcolor{teal}{\\times \\dfrac{&2}{&4}} \\\\ &= \\dfrac{&1 \\times &2}{&3 \\times &4}  \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2/(&3*&4)}}}} \\end{align}$$" },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: 'Calculer un quotient',
          subdescription:
            'Division par un entier, avec le symbole de la division',
          expressions: ['{&1/&3}:&2'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{cd(&1)}',
              '&3': '$e[2;9]\\{cd(&1)}',
            },
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{&1}{&3} \\textcolor{teal}{\\div &2} &= \\dfrac{&1}{&3} \\textcolor{teal}{\\div \\dfrac{&2}{1}} \\\\ &= \\dfrac{&1}{&3} \\textcolor{teal}{\\times \\dfrac{1}{&2}} \\\\&= \\dfrac{&1 \\times 1}{&3 \\times &2}  \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1/(&3*&2)}}}} \\end{align}$$" },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: 'Calculer un quotient',
          subdescription: 'Pas de simplification',
          expressions: ['{&1/&3}/{&4/&2}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&2);cd(&1)}',
              '&4': '$e[2;9]\\{cd(&2);cd(&1)}',
            },
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{\\dfrac{&1}{&3}}{\\textcolor{teal}{\\dfrac{&4}{&2}}} &= \\dfrac{&1}{&3} \\textcolor{teal}{\\times \\dfrac{&2}{&4}} \\\\ &= \\dfrac{&1 \\times &2}{&3 \\times &4}  \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2/(&3*&4)}}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: 'Calculer un quotient',
          subdescription: 'Division par un entier, avec fraction',
          expressions: ['{&1/&3}/&2'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{cd(&1)}',
              '&3': '$e[2;9]\\{cd(&1)}',
            },
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\dfrac{\\dfrac{&1}{&3}}{\\textcolor{teal}{&2}} &= \\dfrac{&1}{&3} \\textcolor{teal}{\\div \\dfrac{&2}{1}} \\\\ &= \\dfrac{&1}{&3} \\textcolor{teal}{\\times \\dfrac{1}{&2}} \\\\ &= \\dfrac{&1 \\times 1}{&3 \\times &2}  \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1/(&2*&3)}}}} \\end{align}$$" },
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
      ],
    },
  },
  Puissances: {
    'Apprivoiser': {
      Définition: [

        {
          description: "Traduire un produit en puissance",
          enounces: ["Réécris cette expression à l'aide d'une puissance"],
          expressions: ['&1*&1', '&1*&1*&1', '&1*&1*&1*&1', '&1*&1*&1*&1*&1', '&1*&1*&1*&1*&1*&1', '&1*&1*&1*&1*&1*&1*&1'],
          variables: [
            { '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}' }
          ],
          solutions: [
            ['&1^2'],
            ['&1^3'],
            ['&1^4'],
            ['&1^5'],
            ['&1^6'],
            ['&1^7'],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Traduire une puissance en produit",
          enounces: ["Réécris cette expression à l'aide d'un produit"],
          expressions: ['&1^2',
            '&1^3',
            '&1^4',
            '&1^5',
            '&1^6',
            '&1^7'
          ],

          variables: [
            { '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}' }
          ],
          solutions: [
            ['&1*&1'], ['&1*&1*&1'], ['&1*&1*&1*&1'], ['&1*&1*&1*&1*&1'], ['&1*&1*&1*&1*&1*&1'], ['&1*&1*&1*&1*&1*&1*&1']
          ],
          type: 'result',
          options: ['no-penalty-for-explicit-products'],
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Définition d'une puissance à exposant négatif",
          enounces: ["Ecris la définition de cette puissance."],
          expressions: ['&1^(-&2)'],

          variables: [
            {
              '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}',
              '&2': '$e[2;9]'
            }
          ],
          solutions: [
            ['1/(&1^&2)'],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Puissances de 10",
          enounces: ["Ecris cette puissance sous forme décimale."],
          expressions: ['10^{&1}'],

          variables: [
            {
              '&1': '$er[0;5]'
            }
          ],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: QUATRIEME,
        },

      ]
    },
    'Calculer': {
      Multiplier: [
        {
          description: "Multiplier 2 puissances de 10.",
          subdescription: "Exposants positifs",
          enounces: ["Simplifie en écrivant sous la forme d'une seule puissance de 10."],
          expressions: ['10^&2*10^&3'],
          variables: [
            {
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
            }
          ],
          solutions: [
            ['10^#{&2+&3}'],
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} 10^&2 \\times 10^&3 &= 10^{&2+&3} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{10^{%{&2+&3}}}}}} \\end{align}$$" },
            ],
          ],
          // bug de mathlive sur les puissances
          // qui rajoute des parenthèses à l'exposant
          options: ['no-penalty-for-extraneous-brackets'],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Multiplier 2 puissances d'un même nombre.",
          subdescription: "Exposants positifs",
          enounces: ["Calcule en écrivant le résultat sous la forme d'une puissance."],
          expressions: ['&1^&2*&1^&3'],
          variables: [
            {
              '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}',
              '&2': '$e[2;5]',
              '&3': '$e[2;5]',
            }
          ],
          solutions: [
            ['&1^(#{&2+&3})'],
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} &1^&2 \\times &1^&3 &= &1^{&2+&3} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1^{%{&2+&3}}}}}} \\end{align}$$" },
            ],
          ],
          // bug de mathlive sur les puissances
          // qui rajoute des parenthèses à l'exposant
          options: ['no-penalty-for-extraneous-brackets'],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Multiplier 2 puissances de 10",
          subdescription: "Exposants relatifs",
          enounces: ["Ecris sous la forme d'une seule puissance de 10."],
          expressions: ['10^{&1}*10^{&2}'],
          variables: [
            {
              '&1': '$er[2;5]',
              '&2': '$er[2;5]',
            }
          ],
          solutions: [
            ['10^{#{&1+(&2)}}', '10^(#{&1+(&2)})'],
          ],
          conditions: ['abs(&1+(&2))>1'],
          correctionDetails: [
            [
              { text: "$$\\begin{align} 10^{&1} \\times 10^{&2} &= 10^{&1#s{&2}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{10^{%{&1+(&2)}}}}}} \\end{align}$$" },
            ],
          ],
          // bug de mathlive sur les puissances
          // qui rajoute des parenthèses à l'exposant
          options: ['no-penalty-for-extraneous-brackets'],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Multiplier 2 puissances d'un même nombre.",
          subdescription: "Exposants relatifs",
          enounces: ["Calcule en écrivant le résultat sous la forme d'une puissance."],
          expressions: ['&1^{&2}*&1^{&3}'],
          variables: [
            {
              '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}',
              '&2': '$er[2;5]',
              '&3': '$er[2;5]\\{-(&2)}',
            }
          ],
          conditions: ['abs(&2+(&3))>1'],
          solutions: [
            ['&1^{#{&2+(&3)}}', '&1^(#{&2+(&3)})'],

          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} &1^{&2} \\times &1^{&3} &= &1^{&2#s{&3}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1^{%{&2+(&3)}}}}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          // bug de mathlive sur les puissances
          // qui rajoute des parenthèses à l'exposant
          options: ['no-penalty-for-extraneous-brackets'],
          defaultDelay: 20,
          grade: QUATRIEME,
        },
      ],
      Diviser: [
        {
          description: "Diviser 2 puissances de 10.",
          subdescription: "Exposants positifs",
          enounces: ["Réécris sous la forme d'une seule puissance de 10."],
          expressions: ['{10^&1}/{10^&2}'],
          variables: [
            {
              '&1': '$e[4;10]',
              '&2': '$e[2;&1-2]',
            }
          ],
          solutions: [
            ['10^#{&1-&2}'],

          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\frac{10^{&1}}{10^{&2}} &= 10^{&1#s{-&2}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{10^{%{&1-(&2)}}}}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Diviser 2 puissances d'un même nombre.",
          subdescription: "Exposants positifs",
          enounces: ["Calcule en écrivant le résultat sous la forme d'une puissance."],
          expressions: ['{&1^&2}/{&1^&3}'],
          variables: [
            {
              '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}',
              '&2': '$e[4;10]',
              '&3': '$e[2;&2-2]',
            }
          ],
          solutions: [
            ['&1^#{&2-&3}'],

          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\frac{&1^{&2}}{&1^{&3}} &= &1^{&2#s{-&3}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1^{%{&2-(&3)}}}}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: TROISIEME,
        },
        {
          description: "Diviser 2 puissances de 10.",
          subdescription: "Exposants relatifs",
          enounces: ["Réécris sous la forme d'une seule puissance de 10."],
          expressions: ['{10^{&1}}/{10^{&2}}'],
          variables: [
            {
              '&1': '$er[2;5]',
              '&2': '$er[2;5]',
            }
          ],
          conditions: ['abs(&1-(&2))>1'],

          solutions: [
            ['10^(#{&1-(&2)})'],

          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\frac{10^{&1}}{10^{&2}} &= 10^{&1#s{-(&2)}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{10^{%{&1-(&2)}}}}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Diviser 2 puissances d'un même nombre.",
          subdescription: "Exposants relatifs",
          enounces: ["Calcule en écrivant le résultat sous la forme d'une puissance."],
          expressions: ['{&1^{&2}}/{&1^{&3}}'],
          variables: [
            {
              '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}',
              '&2': '$er[2;5]',
              '&3': '$er[2;5]',
            }
          ],
          conditions: ['abs(&2-(&3))>1'],
          solutions: [
            ['&1^(#{&2-(&3)})'],
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\frac{&1^{&2}}{&1^{&3}} &= &1^{&2#s{-(&3)}} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1^{%{&2-(&3)}}}}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          defaultDelay: 20,
          grade: TROISIEME,
        },
      ],
      'Puissance de puissance': [
        {
          description: "Puissance d'une puissance de 10",
          subdescription: "Exposants positifs",
          enounces: ["Réécris sous la forme d'une seule puissance de 10."],
          expressions: ['(10^&1)^&2'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
            }
          ],
          solutions: [
            ['10^(#{&1*&2})'],
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\left(10^&1\\right)^&2 &= 10^{&1 \\times &2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{10^{%{&1*&2}}}}}} \\end{align}$$" },
            ],
          ],
          // bug de mathlive sur les puissances
          // qui rajoute des parenthèses à l'exposant
          options: ['no-penalty-for-extraneous-brackets'],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Puissance d'une puissance",
          subdescription: "Exposants positifs",
          enounces: ["Calcule en écrivant le résultat sous la forme d'une puissance."],
          expressions: ['(&1^&2)^&3'],
          variables: [
            {
              '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
            }
          ],
          solutions: [
            ['&1^(#{&2*&3})'],
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\left(&1^&2\\right)^&3 &= &1^{&2 \\times &3} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1^{%{&2*&3}}}}}} \\end{align}$$" },
            ],
          ],
          // bug de mathlive sur les puissances
          // qui rajoute des parenthèses à l'exposant
          options: ['no-penalty-for-extraneous-brackets'],
          type: 'result',
          // bug de mathlive sur les puissances
          // qui rajoute des parenthèses à l'exposant
          options: ['no-penalty-for-extraneous-brackets'],
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Puissance d'une puissance de 10",
          subdescription: "Exposants relatifs",
          enounces: ["Réécris sous la forme d'une seule puissance de 10."],
          expressions: ['(10^{&1})^{&2}'],
          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$e[2;9]',
            },
            {
              '&1': '$er[2;9]',
              '&2': '-$e[2;9]',
            }
          ],
          solutions: [
            ['10^{#{&1*(&2)}}'],

          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\left(10^{&1}\\right)^{&2} &= 10^{&1 \\times &2} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{10^{%{&1*&2}}}}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\left(10^{&1}\\right)^{&2} &= 10^{&1 \\times (&2)} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{10^{%{&1*(&2)}}}}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          // bug de mathlive sur les puissances
          // qui rajoute des parenthèses à l'exposant
          options: ['no-penalty-for-extraneous-brackets'],
          defaultDelay: 20,
          grade: QUATRIEME,
        },

        {
          description: "Puissance d'une puissance",
          subdescription: "Exposants relatifs",
          enounces: ["Calcule en écrivant le résultat sous la forme d'une puissance."],
          expressions: ['(&1^{&2})^{&3}'],
          variables: [
            {
              '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}',
              '&2': '$er[2;9]',
              '&3': '$e[2;9]',
            },
            {
              '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}',
              '&2': '$er[2;9]',
              '&3': '-$e[2;9]',
            }
          ],
          solutions: [
            ['&1^(#{&2*(&3)})'],
          ],
          correctionDetails: [
            [
              { text: "$$\\begin{align} \\left(&1^{&2}\\right)^{&3} &= &1^{&2 \\times &3} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1^{%{&2*&3}}}}}} \\end{align}$$" },
            ],
            [
              { text: "$$\\begin{align} \\left(&1^{&2}\\right)^{&3} &= &1^{&2 \\times (&3)} \\\\ &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1^{%{&2*(&3)}}}}}} \\end{align}$$" },
            ],
          ],
          type: 'result',
          // bug de mathlive sur les puissances
          // qui rajoute des parenthèses à l'exposant
          options: ['no-penalty-for-extraneous-brackets'],
          defaultDelay: 20,
          grade: TROISIEME,
        },
      ]
    }
  },
  Grandeurs: {
    Unités: {
      'Unités simples': [
        {
          description: 'Convertir dans une autre unité',
          subdescription: "Conversion vers l'unité de référence",
          enounces: ["Convertis dans l'unité demandée."],
          variables: [
            {
              '&1': '$e[1;9]',

            },
          ],
          expressions: [
            '&1 km = ? m',
            '&1 hm = ? m',
            '&1 dam = ? m',
            '&1 dm = ? m',
            '&1 cm = ? m',
            '&1 mm = ? m',
            '&1 kL = ? L',
            '&1 hL = ? L',
            '&1 daL = ? L',
            '&1 dL = ? L',
            '&1 cL = ? L',
            '&1 mL = ? L',
            '&1 kg = ? g',
            '&1 hg = ? g',
            '&1 dag = ? g',
            '&1 dg = ? g',
            '&1 cg = ? g',
            '&1 mg = ? g',
          ],
          solutions: [
            ['##{&1*1000}'],
            ['##{&1*100}'],
            ['##{&1*10}'],
            ['##{&1*0.1}'],
            ['##{&1*0.01}'],
            ['##{&1*0.001}'],
            ['##{&1*1000}'],
            ['##{&1*100}'],
            ['##{&1*10}'],
            ['##{&1*0.1}'],
            ['##{&1*0.01}'],
            ['##{&1*0.001}'],
            ['##{&1*1000}'],
            ['##{&1*100}'],
            ['##{&1*10}'],
            ['##{&1*0.1}'],
            ['##{&1*0.01}'],
            ['##{&1*0.001}'],
          ],
          type: 'trou',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: 'Convertir dans une autre unité',
          subdescription: "Autres conversions",
          enounces: ["Convertis dans l'unité demandée."],
          variables: [
            {
              '&1': '$e[1;9]',

            },
          ],
          expressions: [
            '&1 km = ? mm',
            '&1 km = ? cm',
            '&1 km = ? dm',
            '&1 km = ? m',
            '&1 km = ? dam',
            '&1 km = ? hm',

            '&1 hm = ? mm',
            '&1 hm = ? cm',
            '&1 hm = ? dm',
            '&1 hm = ? m',
            '&1 hm = ? dam',

            '&1 dam = ? mm',
            '&1 dam = ? cm',
            '&1 dam = ? dm',
            '&1 dam = ? m',

            '&1 m = ? mm',
            '&1 m = ? cm',
            '&1 m = ? dm',

            '&1 dm = ? mm',
            '&1 dm = ? cm',

            '&1 cm = ? mm',

            '&1 mm = ? km',
            '&1 cm = ? km ',
            '&1 dm = ? km',
            '&1 m = ? km',
            '&1 dam = ? km',
            '&1 hm = ? km',

            '&1 mm = ? hm',
            '&1 cm = ? hm',
            '&1 dm = ? hm',
            '&1 m = ? hm',
            '&1 dam = ? hm',

            '&1 mm = ? dam',
            '&1 cm = ? dam',
            '&1 dm = ? dam',
            '&1 m = ? dam',

            '&1 mm = ? m',
            '&1 cm = ? m',
            '&1 dm = ? m',

            '&1 mm = ? dm',
            '&1 cm = ? dm',

            '&1 mm = ? cm',


            '&1 kg = ? mg',
            '&1 kg = ? cg',
            '&1 kg = ? dg',
            '&1 kg = ? g',
            '&1 kg = ? dag',
            '&1 kg = ? hg',

            '&1 hg = ? mg',
            '&1 hg = ? cg',
            '&1 hg = ? dg',
            '&1 hg = ? g',
            '&1 hg = ? dag',

            '&1 dag = ? mg',
            '&1 dag = ? cg',
            '&1 dag = ? dg',
            '&1 dag = ? g',

            '&1 g = ? mg',
            '&1 g = ? cg',
            '&1 g = ? dg',

            '&1 dg = ? mg',
            '&1 dg = ? cg',

            '&1 cg = ? mg',

            '&1 mg = ? kg',
            '&1 cg = ? kg ',
            '&1 dg = ? kg',
            '&1 g = ? kg',
            '&1 dag = ? kg',
            '&1 hg = ? kg',

            '&1 mg = ? hg',
            '&1 cg = ? hg',
            '&1 dg = ? hg',
            '&1 g = ? hg',
            '&1 dag = ? hg',

            '&1 mg = ? dag',
            '&1 cg = ? dag',
            '&1 dg = ? dag',
            '&1 g = ? dag',

            '&1 mg = ? g',
            '&1 cg = ? g',
            '&1 dg = ? g',

            '&1 mg = ? dg',
            '&1 cg = ? dg',

            '&1 mg = ? cg',

            '&1 kL = ? mL',
            '&1 kL = ? cL',
            '&1 kL = ? dL',
            '&1 kL = ? L',
            '&1 kL = ? daL',
            '&1 kL = ? hL',

            '&1 hL = ? mL',
            '&1 hL = ? cL',
            '&1 hL = ? dL',
            '&1 hL = ? L',
            '&1 hL = ? daL',

            '&1 daL = ? mL',
            '&1 daL = ? cL',
            '&1 daL = ? dL',
            '&1 daL = ? L',

            '&1 L = ? mL',
            '&1 L = ? cL',
            '&1 L = ? dL',

            '&1 dL = ? mL',
            '&1 dL = ? cL',

            '&1 cL = ? mL',

            '&1 mL = ? kL',
            '&1 cL = ? kL ',
            '&1 dL = ? kL',
            '&1 L = ? kL',
            '&1 daL = ? kL',
            '&1 hL = ? kL',

            '&1 mL = ? hL',
            '&1 cL = ? hL',
            '&1 dL = ? hL',
            '&1 L = ? hL',
            '&1 daL = ? hL',

            '&1 mL = ? daL',
            '&1 cL = ? daL',
            '&1 dL = ? daL',
            '&1 L = ? daL',

            '&1 mL = ? L',
            '&1 cL = ? L',
            '&1 dL = ? L',

            '&1 mL = ? dL',
            '&1 cL = ? dL',

            '&1 mL = ? cL',

          ],
          solutions: [
            ['#{&1*1000000}'],
            ['#{&1*100000}'],
            ['#{&1*10000}'],
            ['#{&1*1000}'],
            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*100000}'],
            ['#{&1*10000}'],
            ['#{&1*1000}'],
            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*10000}'],
            ['#{&1*1000}'],
            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*1000}'],
            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*10}'],

            ['##{&1:1000000}'],
            ['##{&1:100000}'],
            ['##{&1:10000}'],
            ['##{&1:1000}'],
            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:100000}'],
            ['##{&1:10000}'],
            ['##{&1:1000}'],
            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:10000}'],
            ['##{&1:1000}'],
            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:1000}'],
            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:10}'],


            ['#{&1*1000000}'],
            ['#{&1*100000}'],
            ['#{&1*10000}'],
            ['#{&1*1000}'],
            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*100000}'],
            ['#{&1*10000}'],
            ['#{&1*1000}'],
            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*10000}'],
            ['#{&1*1000}'],
            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*1000}'],
            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*10}'],

            ['##{&1:1000000}'],
            ['##{&1:100000}'],
            ['##{&1:10000}'],
            ['##{&1:1000}'],
            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:100000}'],
            ['##{&1:10000}'],
            ['##{&1:1000}'],
            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:10000}'],
            ['##{&1:1000}'],
            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:1000}'],
            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:10}'],


            ['#{&1*1000000}'],
            ['#{&1*100000}'],
            ['#{&1*10000}'],
            ['#{&1*1000}'],
            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*100000}'],
            ['#{&1*10000}'],
            ['#{&1*1000}'],
            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*10000}'],
            ['#{&1*1000}'],
            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*1000}'],
            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*100}'],
            ['#{&1*10}'],

            ['#{&1*10}'],

            ['##{&1:1000000}'],
            ['##{&1:100000}'],
            ['##{&1:10000}'],
            ['##{&1:1000}'],
            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:100000}'],
            ['##{&1:10000}'],
            ['##{&1:1000}'],
            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:10000}'],
            ['##{&1:1000}'],
            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:1000}'],
            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:100}'],
            ['##{&1:10}'],

            ['##{&1:10}'],

          ],
          type: 'trou',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: 'Calculer avec des unités',
          subdescription: "",
          enounces: [
            " Calcule et donne le résutat en mètres (m)",
            " Calcule et donne le résutat en grammes (g)",
            " Calcule et donne le résutat en litres (L)",
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '$l{&1 km; &1 hm ; &1 dam ; &1 dm ; &1 cm ; &1 mm}',
              '&4': '$l{&2 m}',
            },
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '$l{&1 kg; &1 hg ; &1 dag ; &1 dg ; &1 cg ; &1 mg}',
              '&4': '$l{&2 g}',
            },
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '$l{&1 kL; &1 hL ; &1 daL ; &1 dL ; &1 cL ; &1 mL}',
              '&4': '$l{&2 L}',
            },
          ],
          expressions: [
            '&3 + &4'
          ],

          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },
      ],
      'Unités composées': [
        {
          description: 'Convertir dans une autre unité',
          subdescription: "Unités d'aire",
          enounces: ["Convertis dans l'unité demandée."],
          variables: [
            {
              '&1': '$e[1;9]',

            },
          ],
          expressions: [
            '&1 km^2 = ? m^2',
            '&1 hm^2 = ? m^2',
            '&1 dam^2 = ? m^2',
            '&1 dm^2 = ? m^2',
            '&1 cm^2 = ? m^2',
            '&1 mm^2 = ? m^2',

            '&1 km^2 = ? hm^2',
            '&1 hm^2 = ? dam^2',
            '&1 m^2 = ? dm^2',
            '&1 dm^2 = ? cm^2',
            '&1 cm^2 = ? mm^2',

            '&1 mm^2 = ? cm^2',
            '&1 cm^2 = ? dm^2',
            '&1 dm^2 = ? m^2',
            '&1 m^2 = ? dam^2',
            '&1 dam^2 = ? hm^2',
            '&1 hm^2 = ? km^2',
          ],
          solutions: [
            ['##{&1*1000000}'],
            ['##{&1*10000}'],
            ['##{&1*100}'],
            ['##{&1*0.01}'],
            ['##{&1*0.0001}'],
            ['##{&1*0.000001}'],

            ['##{&1*100}'],
            ['##{&1*100}'],
            ['##{&1*100}'],
            ['##{&1*100}'],
            ['##{&1*100}'],

            ['##{&1*0.01}'],
            ['##{&1*0.01}'],
            ['##{&1*0.01}'],
            ['##{&1*0.01}'],
            ['##{&1*0.01}'],
            ['##{&1*0.01}'],

          ],
          type: 'trou',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },
        {
          description: 'Convertir dans une autre unité',
          subdescription: "Unités de volume",
          enounces: ["Convertis dans l'unité demandée."],
          variables: [
            {
              '&1': '$e[1;9]',

            },
          ],
          expressions: [

            '&1 hm^3 = ? m^3',
            '&1 dam^3 = ? m^3',
            '&1 dm^3 = ? m^3',
            '&1 cm^3 = ? m^3',


            '&1 km^3 = ? hm^3',
            '&1 hm^3 = ? dam^3',
            '&1 m^3 = ? dm^3',
            '&1 dm^3 = ? cm^3',
            '&1 cm^3 = ? mm^3',

            '&1 mm^3 = ? cm^3',
            '&1 cm^3 = ? dm^3',
            '&1 dm^3 = ? m^3',
            '&1 m^3 = ? dam^3',
            '&1 dam^3 = ? hm^3',
            '&1 hm^3 = ? km^3',
          ],
          solutions: [

            ['##{&1*1000000}'],
            ['##{&1*1000}'],
            ['##{&1*0.001}'],
            ['##{&1*0.000001}'],


            ['##{&1*1000}'],
            ['##{&1*1000}'],
            ['##{&1*1000}'],
            ['##{&1*1000}'],
            ['##{&1*1000}'],

            ['##{&1*0.001}'],
            ['##{&1*0.001}'],
            ['##{&1*0.001}'],
            ['##{&1*0.001}'],
            ['##{&1*0.001}'],
            ['##{&1*0.001}'],

          ],
          type: 'trou',
          'result-type': 'decimal',
          defaultDelay: 20,
          grade: SIXIEME,
        },

      ]
    },
    Aires: {
      "Aire d'un carré": [
        {
          description: "Calcul de l'aire d'un carré.",
          subdescription: "A partir d'une description",
          enounces: [
            "Quelle est l'aire d'un <b>carré</b> de côté $$&1 mm$$ ?",
            "Quelle est l'aire d'un <b>carré</b> de côté $$&1 cm$$ ?",
            "Quelle est l'aire d'un <b>carré</b> de côté $$&1 dm$$ ?",
            "Quelle est l'aire d'un <b>carré</b> de côté $$&1 m$$ ?",
            "Quelle est l'aire d'un <b>carré</b> de côté $$&1 dam$$ ?",
            "Quelle est l'aire d'un <b>carré</b> de côté $$&1 hm$$ ?",
            "Quelle est l'aire d'un <b>carré</b> de côté $$&1 km$$ ?",
          ],
          variables: [
            {
              '&1': '$e[1;11]',
            },
          ],
          solutions: [
            ['#{&1*&1} mm^2'],
            ['#{&1*&1} cm^2'],
            ['#{&1*&1} dm^2'],
            ['#{&1*&1} m^2'],
            ['#{&1*&1} dam^2'],
            ['#{&1*&1} hm^2'],
            ['#{&1*&1} km^2'],
          ],
          options: ['no-exp'],
          correctionFormat: [
            {
              correct: ["L'aire d'un carré de côté $$&1\\,mm$$ est &answer."],
              uncorrect: ["L'aire d'un carré de côté $$&1\\,mm$$ est &solution."],
              answer: "L'aire du carré est &answer."
            },
            {
              correct: ["L'aire d'un carré de côté $$&1\\,cm$$ est &answer."],
              uncorrect: ["L'aire d'un carré de côté $$&1\\,cm$$ est &solution."],
              answer: "L'aire du carré est &answer."
            },
            {
              correct: ["L'aire d'un carré de côté $$&1\\,dm$$ est &answer."],
              uncorrect: ["L'aire d'un carré de côté $$&1\\,dm$$ est &solution."],
              answer: "L'aire du carré est &answer."
            },
            {
              correct: ["L'aire d'un carré de côté $$&1\\,m$$ est &answer."],
              uncorrect: ["L'aire d'un carré de côté $$&1\\,m$$ est &solution."],
              answer: "L'aire du carré est &answer."
            },
            {
              correct: ["L'aire d'un carré de côté $$&1\\,dam$$ est &answer."],
              uncorrect: ["L'aire d'un carré de côté $$&1\\,dam$$ est &solution."],
              answer: "L'aire du carré est &answer."
            },
            {
              correct: ["L'aire d'un carré de côté $$&1\\,hm$$ est &answer."],
              uncorrect: ["L'aire d'un carré de côté $$&1\\,hm$$ est &solution."],
              answer: "L'aire du carré est &answer."
            },
            {
              correct: ["L'aire d'un carré de côté $$&1\\,km$$ est &answer."],
              uncorrect: ["L'aire d'un carré de côté $$&1\\,km$$ est &solution."],
              answer: "L'aire du carré est &answer."
            },
          ],
          correctionDetails: [
            [
              { text: "L'aire d'un carré de côté $$&1\\,mm$$  est $$&1\\,mm \\times &1\\,mm = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&1}\\,mm^2}$$." }
            ],
            [
              { text: "L'aire d'un carré de côté $$&1\\,cm$$  est $$&1\\,cm \\times &1\\,cm = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&1}\\,cm^2}$$." }
            ],
            [
              { text: "L'aire d'un carré de côté $$&1\\,dm$$  est $$&1\\,dm \\times &1\\,dm = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&1}\\,dm^2}$$." }
            ],
            [
              { text: "L'aire d'un carré de côté $$&1\\,m$$  est $$&1\\,m \\times &1\\,m = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&1}\\,m^2}$$." }
            ],
            [
              { text: "L'aire d'un carré de côté $$&1\\,dam$$  est $$&1\\,dam \\times &1\\,dam = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&1}\\,dam^2}$$." }
            ],
            [
              { text: "L'aire d'un carré de côté $$&1\\,hm$$  est $$&1\\,hm \\times &1\\,hm = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&1}\\,hm^2}$$." }
            ],
            [
              { text: "L'aire d'un carré de côté $$&1\\,km$$  est $$&1\\,km \\times &1\\,km = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&1}\\,km^2}$$." }
            ],
          ],
          type: 'result',
          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: "Trouver le côté d'un carré connaissant son aire.",
          subdescription: "A partir d'une description.",
          enounces: [
            "Quelle est la longueur du côté d'un <b>carré</b> d'aire $$%%{&1*&1}\\,mm^2$$ ?",
            "Quelle est la longueur du côté d'un <b>carré</b> d'aire $$%%{&1*&1}\\, cm^2$$ ?",
            "Quelle est la longueur du côté d'un <b>carré</b> d'aire $$%%{&1*&1}\\, dm^2$$ ?",
            "Quelle est la longueur du côté d'un <b>carré</b> d'aire $$%%{&1*&1}\\, m^2$$ ?",
            "Quelle est la longueur du côté d'un <b>carré</b> d'aire $$%%{&1*&1}\\, dam^2$$ ?",
            "Quelle est la longueur du côté d'un <b>carré</b> d'aire $$%%{&1*&1}\\, hm^2$$ ?",
            "Quelle est la longueur du côté d'un <b>carré</b> d'aire $$%%{&1*&1}\\, km^2$$ ?",

          ],
          variables: [
            {
              '&1': '$e[1;11]',
            },
          ],
          solutions: [
            ['&1 mm'],
            ['&1 cm'],
            ['&1 dm'],
            ['&1 m'],
            ['&1 dam'],
            ['&1 hm'],
            ['&1 km'],
          ],
          options: ['no-exp'],
          correctionFormat: [
            {
              correct: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,mm^2$$ est &answer."],
              uncorrect: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,mm^2$$ est &solution."],
              answer: "La longueur du côté est &answer."
            },
            {
              correct: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,cm^2$$ est &answer."],
              uncorrect: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,cm^2$$ est &solution."],
              answer: "La longueur du côté est &answer."
            },
            {
              correct: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,dm^2$$ est &answer."],
              uncorrect: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,dm^2$$ est &solution."],
              answer: "La longueur du côté est &answer."
            },
            {
              correct: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,m^2$$ est &answer."],
              uncorrect: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,m^2$$ est &solution."],
              answer: "La longueur du côté est &answer."
            },
            {
              correct: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,dam^2$$ est &answer."],
              uncorrect: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,dam^2$$ est &solution."],
              answer: "La longueur du côté est &answer."
            },
            {
              correct: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,hm^2$$ est &answer."],
              uncorrect: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,hm^2$$ est &solution."],
              answer: "La longueur du côté est &answer."
            },
            {
              correct: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,km^2$$ est &answer."],
              uncorrect: ["La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,km^2$$ est &solution."],
              answer: "La longueur du côté est &answer."
            },


          ],
          correctionDetails: [
            [
              { text: "La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,mm^2$$ est &solution car $$&1\\,mm \\times &1\\,mm = #{&1*&1}\\,mm^2$$." }
            ],
            [
              { text: "La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,cm^2$$ est &solution car $$&1\\,cm \\times &1\\,cm = #{&1*&1}\\,cm^2$$." }
            ],
            [
              { text: "La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,dm^2$$ est &solution car $$&1\\,dm \\times &1\\,dm = #{&1*&1}\\,dm^2$$." }
            ],
            [
              { text: "La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,m^2$$ est &solution car $$&1\\,m \\times &1\\,m = #{&1*&1}\\,m^2$$." }
            ],
            [
              { text: "La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,dam^2$$ est &solution car $$&1\\,dam \\times &1\\,dam = #{&1*&1}\\,dam^2$$." }
            ],
            [
              { text: "La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,hm^2$$ est &solution car $$&1\\,hm \\times &1\\,hm = #{&1*&1}\\,hm^2$$." }
            ],
            [
              { text: "La longueur du côté d'un carré d'aire $$%%{&1*&1}\\,km^2$$ est &solution car $$&1\\,km \\times &1\\,km = #{&1*&1}\\,km^2$$." }
            ],

          ],
          type: 'result',
          defaultDelay: 15,
          grade: SIXIEME,
        },

      ],

      "Aire d'un rectangle": [
        {
          description: "Calcul de l'aire d'un rectangle.",
          subdescription: "A partir d'une description",
          enounces: [
            "Quelle est l'aire d'un <b>rectangle</b> de longueur $$&1\\,mm$$ et de largeur $$&2\\,mm$$ ?",
            "Quelle est l'aire d'un <b>rectangle</b> de longueur $$&1\\,cm$$ et de largeur $$&2\\,cm$$ ?",
            "Quelle est l'aire d'un <b>rectangle</b> de longueur $$&1\\,dm$$ et de largeur $$&2\\,dm$$ ?",
            "Quelle est l'aire d'un <b>rectangle</b> de longueur $$&1\\,m$$ et de largeur $$&2\\,m$$ ?",
            "Quelle est l'aire d'un <b>rectangle</b> de longueur $$&1\\,dam$$ et de largeur $$&2\\,dam$$ ?",
            "Quelle est l'aire d'un <b>rectangle</b> de longueur $$&1\\,hm$$ et de largeur $$&2\\,hm$$ ?",
            "Quelle est l'aire d'un <b>rectangle</b> de longueur $$&1\\,km$$et de largeur $$&2\\,km$$ ?",

          ],
          variables: [
            {
              '&1': '$e[1;11]',
              '&2': '$e[1;11]',
            },
          ],
          solutions: [
            ['#{&1*&2} mm^2'],
            ['#{&1*&2} cm^2'],
            ['#{&1*&2} dm^2'],
            ['#{&1*&2} m^2'],
            ['#{&1*&2} dam^2'],
            ['#{&1*&2} hm^2'],
            ['#{&1*&2} km^2'],
          ],
          options: ['no-exp'],
          correctionFormat: [
            {
              correct: ["L'aire d'un rectangle de longueur $$&1\\,mm$$ et de largeur $$&2\\,mm$$ est &answer."],
              uncorrect: ["L'aire d'un rectangle de longueur $$&1\\,mm$$ et de largeur $$&2\\,mm$$ est &solution."],
              answer: "L'aire du rectangle est &answer."
            },
            {
              correct: ["L'aire d'un rectangle de longueur $$&1\\,cm$$ et de largeur $$&2\\,cm$$ est &answer."],
              uncorrect: ["L'aire d'un rectangle de longueur $$&1\\,cm$$ et de largeur $$&2\\,cm$$ est &solution."],
              answer: "L'aire du rectangle est &answer."
            },
            {
              correct: ["L'aire d'un rectangle de longueur $$&1\\,dm$$ et de largeur $$&2\\,dm$$ est &answer."],
              uncorrect: ["L'aire d'un rectangle de longueur $$&1\\,dm$$ et de largeur $$&2\\,dm$$ est &solution."],
              answer: "L'aire du rectangle est &answer."
            },
            {
              correct: ["L'aire d'un rectangle de longueur $$&1\\,m$$ et de largeur $$&2\\,m$$ est &answer."],
              uncorrect: ["L'aire d'un rectangle de longueur $$&1\\,m$$ et de largeur $$&2\\,m$$ est &solution."],
              answer: "L'aire du rectangle est &answer."
            },
            {
              correct: ["L'aire d'un rectangle de longueur $$&1\\,dam$$ et de largeur $$&2\\,dam$$ est &answer."],
              uncorrect: ["L'aire d'un rectangle de longueur $$&1\\,dam$$ et de largeur $$&2\\,dam$$ est &solution."],
              answer: "L'aire du rectangle est &answer."
            },
            {
              correct: ["L'aire d'un rectangle de longueur $$&1\\,hm$$ et de largeur $$&2\\,hm$$ est &answer."],
              uncorrect: ["L'aire d'un rectangle de longueur $$&1\\,hm$$ et de largeur $$&2\\,hm$$ est &solution."],
              answer: "L'aire du rectangle est &answer."
            },
            {
              correct: ["L'aire d'un rectangle de longueur $$&1\\,km$$ et de largeur $$&2\\,km$$ est &answer."],
              uncorrect: ["L'aire d'un rectangle de longueur $$&1\\,km$$ et de largeur $$&2\\,km$$ est &solution."],
              answer: "L'aire du rectangle est &answer."
            },

          ],
          correctionDetails: [
            [
              { text: "L'aire d'un rectangle de longueur $$&1\\,mm$$ et de largeur $$&2\\,mm$$  est $$&1\\,mm \\times &2\\,mm = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,mm^2}$$." }
            ],
            [
              { text: "L'aire d'un rectangle de longueur $$&1\\,cm$$ et de largeur $$&2\\,cm$$  est $$&1\\,cm \\times &2\\,cm = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,cm^2}$$." }
            ],
            [
              { text: "L'aire d'un rectangle de longueur $$&1\\,dm$$ et de largeur $$&2\\,dm$$  est $$&1\\,dm \\times &2\\,dm = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,dm^2}$$." }
            ],
            [
              { text: "L'aire d'un rectangle de longueur $$&1\\,m$$ et de largeur $$&2\\,m$$  est $$&1\\,m \\times &2\\,m = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,m^2}$$." }
            ],
            [
              { text: "L'aire d'un rectangle de longueur $$&1\\,dam$$ et de largeur $$&2\\,dam$$  est $$&1\\,dam \\times &2\\,dam = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,dam^2}$$." }
            ],
            [
              { text: "L'aire d'un rectangle de longueur $$&1\\,hm$$ et de largeur $$&2\\,hm$$  est $$&1\\,hm \\times &2\\,hm = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,hm^2}$$." }
            ],
            [
              { text: "L'aire d'un rectangle de longueur $$&1\\,km$$ et de largeur $$&2\\,km$$  est $$&1\\,km \\times &2\\,km = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,km^2}$$." }
            ],

          ],
          type: 'result',
          defaultDelay: 15,
          grade: SIXIEME,
        },
        {
          description: "Trouver la largeur d'un rectangle.",
          subdescription: "A partir de son aire et de sa longueur.",
          enounces: [
            "Quelle est la largeur d'un <b>rectangle</b> de longueur $$&1\\,mm$$ et d'aire $$%{&1*&2}\\,mm^2$$ ?",
            "Quelle est la largeur d'un <b>rectangle</b> de longueur $$&1\\,cm$$ et d'aire $$%{&1*&2}\\,cm^2$$ ?",
            "Quelle est la largeur d'un <b>rectangle</b> de longueur $$&1\\,dm$$ et d'aire $$%{&1*&2}\\,dm^2$$ ?",
            "Quelle est la largeur d'un <b>rectangle</b> de longueur $$&1\\,m$$ et d'aire $$%{&1*&2}\\,m^2$$ ?",
            "Quelle est la largeur d'un <b>rectangle</b> de longueur $$&1\\,dam$$ et d'aire $$%{&1*&2}\\,dam^2$$ ?",
            "Quelle est la largeur d'un <b>rectangle</b> de longueur $$&1\\,hm$$ et d'aire $$%{&1*&2}\\,hm^2$$ ?",
            "Quelle est la largeur d'un <b>rectangle</b> de longueur $$&1\\,km$$ et d'aire $$%{&1*&2}\\,km^2$$ ?",

          ],
          variables: [
            {
              '&1': '$e[1;11]',
              '&2': '$e[1;11]',
            },
          ],
          solutions: [
            ['&2 mm'],
            ['&2 cm'],
            ['&2 dm'],
            ['&2 m'],
            ['&2 dam'],
            ['&2 hm'],
            ['&2 km'],
          ],
          options: ['no-exp'],
          correctionFormat: [
            {
              correct: ["La largeur d'un rectangle de longueur $$&1\\,mm$$ et d'aire $$%{&2*&1}\\,mm^2$$ est &answer."],
              uncorrect: ["La largeur d'un rectangle de longueur $$&1\\,mm$$ et d'aire $$%{&2*&1}\\,mm^2$$ est &solution."],
              answer: "La largeur du rectangle est &answer."
            },
            {
              correct: ["La largeur d'un rectangle de longueur $$&1\\,cm$$ et d'aire $$%{&2*&1}\\,cm^2$$ est &answer."],
              uncorrect: ["La largeur d'un rectangle de longueur $$&1\\,cm$$ et d'aire $$%{&2*&1}\\,cm^2$$ est &solution."],
              answer: "La largeur du rectangle est &answer."
            },
            {
              correct: ["La largeur d'un rectangle de longueur $$&1\\,dm$$ et d'aire $$%{&2*&1}\\,dm^2$$ est &answer."],
              uncorrect: ["La largeur d'un rectangle de longueur $$&1\\,dm$$ et d'aire $$%{&2*&1}\\,dm^2$$ est &solution."],
              answer: "La largeur du rectangle est &answer."
            },
            {
              correct: ["La largeur d'un rectangle de longueur $$&1\\,m$$ et d'aire $$%{&2*&1}\\,m^2$$ est &answer."],
              uncorrect: ["La largeur d'un rectangle de longueur $$&1\\,m$$ et d'aire $$%{&2*&1}\\,m^2$$ est &solution."],
              answer: "La largeur du rectangle est &answer."
            },
            {
              correct: ["La largeur d'un rectangle de longueur $$&1\\,dam$$ et d'aire $$%{&2*&1}\\,dam^2$$ est &answer."],
              uncorrect: ["La largeur d'un rectangle de longueur $$&1\\,dam$$ et d'aire $$%{&2*&1}\\,dam^2$$ est &solution."],
              answer: "La largeur du rectangle est &answer."
            },
            {
              correct: ["La largeur d'un rectangle de longueur $$&1\\,hm$$ et d'aire $$%{&2*&1}\\,hm^2$$ est &answer."],
              uncorrect: ["La largeur d'un rectangle de longueur $$&1\\,hm$$ et d'aire $$%{&2*&1}\\,hm^2$$ est &solution."],
              answer: "La largeur du rectangle est &answer."
            },
            {
              correct: ["La largeur d'un rectangle de longueur $$&1\\,km$$ et d'aire $$%{&2*&1}\\,km^2$$ est &answer."],
              uncorrect: ["La largeur d'un rectangle de longueur $$&1\\,km$$ et d'aire $$%{&2*&1}\\,km^2$$ est &solution."],
              answer: "La largeur du rectangle est &answer."
            },


          ],
          correctionDetails: [
            [
              { text: "La largeur d'un rectangle de longueur $$&1\\,mm$$ et d'aire $$%{&2*&1}\\,mm^2$$  est &solution car   $$&1\\,mm \\times &2\\,mm = #{&1*&2}\\,mm^2$$." }
            ],
            [
              { text: "La largeur d'un rectangle de longueur $$&1\\,cm$$ et d'aire $$%{&2*&1}\\,cm^2$$  est &solution car   $$&1\\,cm \\times &2\\,cm = #{&1*&2}\\,cm^2$$." }
            ],
            [
              { text: "La largeur d'un rectangle de longueur $$&1\\,dm$$ et d'aire $$%{&2*&1}\\,dm^2$$  est &solution car   $$&1\\,dm \\times &2\\,dm = #{&1*&2}\\,dm^2$$." }
            ],
            [
              { text: "La largeur d'un rectangle de longueur $$&1\\,m$$ et d'aire $$%{&2*&1}\\,m^2$$  est &solution car   $$&1\\,m \\times &2\\,m = #{&1*&2}\\,m^2$$." }
            ],
            [
              { text: "La largeur d'un rectangle de longueur $$&1\\,dam$$ et d'aire $$%{&2*&1}\\,dam^2$$  est &solution car   $$&1\\,dam \\times &2\\,dam = #{&1*&2}\\,dam^2$$." }
            ],
            [
              { text: "La largeur d'un rectangle de longueur $$&1\\,hm$$ et d'aire $$%{&2*&1}\\,hm^2$$  est &solution car   $$&1\\,hm \\times &2\\,hm = #{&1*&2}\\,hm^2$$." }
            ],
            [
              { text: "La largeur d'un rectangle de longueur $$&1\\,km$$ et d'aire $$%{&2*&1}\\,km^2$$  est &solution car   $$&1\\,km \\times &2\\,km = #{&1*&2}\\,km^2$$." }
            ],


          ],
          type: 'result',
          defaultDelay: 20,
          grade: SIXIEME,
        },

      ],
      "Aire d'un triangle rectangle": [
        {
          description: "Calcul de l'aire d'un triangle rectangle.",
          subdescription: "A partir d'une description",
          enounces: [
            "Quelle est l'aire d'un <b>triangle rectangle</b> de longueur $$&1\\,mm$$ et de largeur $$&2\\,mm$$ ?",
            "Quelle est l'aire d'un <b>triangle rectangle</b> de longueur $$&1\\,cm$$ et de largeur $$&2\\,cm$$ ?",
            "Quelle est l'aire d'un <b>triangle rectangle</b> de longueur $$&1\\,dm$$ et de largeur $$&2\\,dm$$ ?",
            "Quelle est l'aire d'un <b>triangle rectangle</b> de longueur $$&1\\,m$$ et de largeur $$&2\\,m$$ ?",
            "Quelle est l'aire d'un <b>triangle rectangle</b> de longueur $$&1\\,dam$$ et de largeur $$&2\\,dam$$ ?",
            "Quelle est l'aire d'un <b>triangle rectangle</b> de longueur $$&1\\,hm$$ et de largeur $$&2\\,hm$$ ?",
            "Quelle est l'aire d'un <b>triangle rectangle</b> de longueur $$&1\\,km$$et de largeur $$&2\\,km$$ ?",

          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
            },
          ],
          solutions: [
            ['##{&1*&2/2} mm^2'],
            ['##{&1*&2/2} cm^2'],
            ['##{&1*&2/2} dm^2'],
            ['##{&1*&2/2} m^2'],
            ['##{&1*&2/2} dam^2'],
            ['##{&1*&2/2} hm^2'],
            ['##{&1*&2/2} km^2'],
          ],
          options: ['no-exp'],
          correctionFormat: [
            {
              correct: ["L'aire d'un triangle rectangle de longueur $$&1\\,mm$$ et de largeur $$&2\\,mm$$ est &answer."],
              uncorrect: ["L'aire d'un triangle rectangle de longueur $$&1\\,mm$$ et de largeur $$&2\\,mm$$ est &solution."],
              answer: "L'aire du triangle rectangle est &answer."
            },
            {
              correct: ["L'aire d'un triangle rectangle de longueur $$&1\\,cm$$ et de largeur $$&2\\,cm$$ est &answer."],
              uncorrect: ["L'aire d'un triangle rectangle de longueur $$&1\\,cm$$ et de largeur $$&2\\,cm$$ est &solution."],
              answer: "L'aire du triangle rectangle est &answer."
            },
            {
              correct: ["L'aire d'un triangle rectangle de longueur $$&1\\,dm$$ et de largeur $$&2\\,dm$$ est &answer."],
              uncorrect: ["L'aire d'un triangle rectangle de longueur $$&1\\,dm$$ et de largeur $$&2\\,dm$$ est &solution."],
              answer: "L'aire du triangle rectangle est &answer."
            },
            {
              correct: ["L'aire d'un triangle rectangle de longueur $$&1\\,m$$ et de largeur $$&2\\,m$$ est &answer."],
              uncorrect: ["L'aire d'un triangle rectangle de longueur $$&1\\,m$$ et de largeur $$&2\\,m$$ est &solution."],
              answer: "L'aire du triangle rectangle est &answer."
            },
            {
              correct: ["L'aire d'un triangle rectangle de longueur $$&1\\,dam$$ et de largeur $$&2\\,dam$$ est &answer."],
              uncorrect: ["L'aire d'un triangle rectangle de longueur $$&1\\,dam$$ et de largeur $$&2\\,dam$$ est &solution."],
              answer: "L'aire du triangle rectangle est &answer."
            },
            {
              correct: ["L'aire d'un triangle rectangle de longueur $$&1\\,hm$$ et de largeur $$&2\\,hm$$ est &answer."],
              uncorrect: ["L'aire d'un triangle rectangle de longueur $$&1\\,hm$$ et de largeur $$&2\\,hm$$ est &solution."],
              answer: "L'aire du triangle rectangle est &answer."
            },
            {
              correct: ["L'aire d'un triangle rectangle de longueur $$&1\\,km$$ et de largeur $$&2\\,km$$ est &answer."],
              uncorrect: ["L'aire d'un triangle rectangle de longueur $$&1\\,km$$ et de largeur $$&2\\,km$$ est &solution."],
              answer: "L'aire du triangle rectangle est &answer."
            },
          ],
          correctionDetails: [
            [
              { text: "L'aire d'un triangle rectangle de longueur $$&1\\,mm$$ et de largeur $$&2\\,mm$$  est $$\\frac{&1\\,mm \\times &2\\,mm}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,mm^2}$$." }
            ],
            [
              { text: "L'aire d'un triangle rectangle de longueur $$&1\\,cm$$ et de largeur $$&2\\,cm$$  est $$\\frac{&1\\,cm \\times &2\\,cm}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,cm^2}$$." }
            ],
            [
              { text: "L'aire d'un triangle rectangle de longueur $$&1\\,dm$$ et de largeur $$&2\\,dm$$  est $$\\frac{&1\\,dm \\times &2\\,dm}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,dm^2}$$." }
            ],
            [
              { text: "L'aire d'un triangle rectangle de longueur $$&1\\,m$$ et de largeur $$&2\\,m$$  est $$\\frac{&1\\,m \\times &2\\,m}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,m^2}$$." }
            ],
            [
              { text: "L'aire d'un triangle rectangle de longueur $$&1\\,dam$$ et de largeur $$&2\\,dam$$  est $$\\frac{&1\\,dam \\times &2\\,dam}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,dam^2}$$." }
            ],
            [
              { text: "L'aire d'un triangle rectangle de longueur $$&1\\,hm$$ et de largeur $$&2\\,hm$$  est $$\\frac{&1\\,hm \\times &2\\,hm}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,hm^2}$$." }
            ],
            [
              { text: "L'aire d'un triangle rectangle de longueur $$&1\\,km$$ et de largeur $$&2\\,km$$  est $$\\frac{&1\\,km \\times &2\\,km}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,km^2}$$." }
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: SIXIEME,
        },

      ],
      "Aire d'un triangle quelconque": [
        {
          description: "Calcul de l'aire d'un triangle quelconque.",
          subdescription: "A partir d'une description",
          enounces: [
            "Quelle est l'aire d'un <b>triangle</b> de base $$&1\\,mm$$ et de hauteur $$&2\\,mm$$ ?",
            "Quelle est l'aire d'un <b>triangle</b> de base $$&1\\,cm$$ et de hauteur $$&2\\,cm$$ ?",
            "Quelle est l'aire d'un <b>triangle</b> de base $$&1\\,dm$$ et de hauteur $$&2\\,dm$$ ?",
            "Quelle est l'aire d'un <b>triangle</b> de base $$&1\\,m$$ et de hauteur $$&2\\,m$$ ?",
            "Quelle est l'aire d'un <b>triangle</b> de base $$&1\\,dam$$ et de hauteur $$&2\\,dam$$ ?",
            "Quelle est l'aire d'un <b>triangle</b> de base $$&1\\,hm$$ et de hauteur $$&2\\,hm$$ ?",
            "Quelle est l'aire d'un <b>triangle</b> de base $$&1\\,km$$et de hauteur $$&2\\,km$$ ?",

          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
            },
          ],
          solutions: [
            ['##{&1*&2/2} mm^2'],
            ['##{&1*&2/2} cm^2'],
            ['##{&1*&2/2} dm^2'],
            ['##{&1*&2/2} m^2'],
            ['##{&1*&2/2} dam^2'],
            ['##{&1*&2/2} hm^2'],
            ['##{&1*&2/2} km^2'],
          ],
          options: ['no-exp'],
          correctionFormat: [
            {
              correct: ["L'aire d'un triangle de base $$&1\\,mm$$ et de hauteur $$&2\\,mm$$ est &answer."],
              uncorrect: ["L'aire d'un triangle de base $$&1\\,mm$$ et de hauteur $$&2\\,mm$$ est &solution."],
              answer: "L'aire du triangle est &answer."
            },
            {
              correct: ["L'aire d'un triangle de base $$&1\\,cm$$ et de hauteur $$&2\\,cm$$ est &answer."],
              uncorrect: ["L'aire d'un triangle de base $$&1\\,cm$$ et de hauteur $$&2\\,cm$$ est &solution."],
              answer: "L'aire du triangle est &answer."
            },
            {
              correct: ["L'aire d'un triangle de base $$&1\\,dm$$ et de hauteur $$&2\\,dm$$ est &answer."],
              uncorrect: ["L'aire d'un triangle de base $$&1\\,dm$$ et de hauteur $$&2\\,dm$$ est &solution."],
              answer: "L'aire du triangle est &answer."
            },
            {
              correct: ["L'aire d'un triangle de base $$&1\\,m$$ et de hauteur $$&2\\,m$$ est &answer."],
              uncorrect: ["L'aire d'un triangle de base $$&1\\,m$$ et de hauteur $$&2\\,m$$ est &solution."],
              answer: "L'aire du triangle est &answer."
            },
            {
              correct: ["L'aire d'un triangle de base $$&1\\,dam$$ et de hauteur $$&2\\,dam$$ est &answer."],
              uncorrect: ["L'aire d'un triangle de base $$&1\\,dam$$ et de hauteur $$&2\\,dam$$ est &solution."],
              answer: "L'aire du triangle est &answer."
            },
            {
              correct: ["L'aire d'un triangle de base $$&1\\,hm$$ et de hauteur $$&2\\,hm$$ est &answer."],
              uncorrect: ["L'aire d'un triangle de base $$&1\\,hm$$ et de hauteur $$&2\\,hm$$ est &solution."],
              answer: "L'aire du triangle est &answer."
            },
            {
              correct: ["L'aire d'un triangle de base $$&1\\,km$$ et de hauteur $$&2\\,km$$ est &answer."],
              uncorrect: ["L'aire d'un triangle de base $$&1\\,km$$ et de hauteur $$&2\\,km$$ est &solution."],
              answer: "L'aire du triangle est &answer."
            },
          ],
          correctionDetails: [
            [
              { text: "L'aire d'un triangle de base $$&1\\,mm$$ et de hauteur $$&2\\,mm$$  est $$\\frac{&1\\,mm \\times &2\\,mm}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,mm^2}$$." }
            ],
            [
              { text: "L'aire d'un triangle de base $$&1\\,cm$$ et de hauteur $$&2\\,cm$$  est $$\\frac{&1\\,cm \\times &2\\,cm}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,cm^2}$$." }
            ],
            [
              { text: "L'aire d'un triangle de base $$&1\\,dm$$ et de hauteur $$&2\\,dm$$  est $$\\frac{&1\\,dm \\times &2\\,dm}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,dm^2}$$." }
            ],
            [
              { text: "L'aire d'un triangle de base $$&1\\,m$$ et de hauteur $$&2\\,m$$  est $$\\frac{&1\\,m \\times &2\\,m}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,m^2}$$." }
            ],
            [
              { text: "L'aire d'un triangle de base $$&1\\,dam$$ et de hauteur $$&2\\,dam$$  est $$\\frac{&1\\,dam \\times &2\\,dam}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,dam^2}$$." }
            ],
            [
              { text: "L'aire d'un triangle de base $$&1\\,hm$$ et de hauteur $$&2\\,hm$$  est $$\\frac{&1\\,hm \\times &2\\,hm}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,hm^2}$$." }
            ],
            [
              { text: "L'aire d'un triangle de base $$&1\\,km$$ et de hauteur $$&2\\,km$$  est $$\\frac{&1\\,km \\times &2\\,km}{2} = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%%{&1*&2/2}\\,km^2}$$." }
            ],

          ],
          type: 'result',
          defaultDelay: 20,
          grade: SIXIEME,
        },

      ],
      "Aire d'un parallélogramme": [
        {
          description: "Calcul de l'aire d'un parallélogramme.",
          subdescription: "A partir d'une description",
          enounces: [
            "Quelle est l'aire d'un <b>parallélogramme</b> de base $$&1\\,mm$$ et de hauteur $$&2\\,mm$$ ?",
            "Quelle est l'aire d'un <b>parallélogramme</b> de base $$&1\\,cm$$ et de hauteur $$&2\\,cm$$ ?",
            "Quelle est l'aire d'un <b>parallélogramme</b> de base $$&1\\,dm$$ et de hauteur $$&2\\,dm$$ ?",
            "Quelle est l'aire d'un <b>parallélogramme</b> de base $$&1\\,m$$ et de hauteur $$&2\\,m$$ ?",
            "Quelle est l'aire d'un <b>parallélogramme</b> de base $$&1\\,dam$$ et de hauteur $$&2\\,dam$$ ?",
            "Quelle est l'aire d'un <b>parallélogramme</b> de base $$&1\\,hm$$ et de hauteur $$&2\\,hm$$ ?",
            "Quelle est l'aire d'un <b>parallélogramme</b> de base $$&1\\,km$$et de hauteur $$&2\\,km$$ ?",

          ],
          variables: [
            {
              '&1': '$e[1;11]',
              '&2': '$e[1;11]',
            },
          ],
          solutions: [
            ['#{&1*&2} mm^2'],
            ['#{&1*&2} cm^2'],
            ['#{&1*&2} dm^2'],
            ['#{&1*&2} m^2'],
            ['#{&1*&2} dam^2'],
            ['#{&1*&2} hm^2'],
            ['#{&1*&2} km^2'],
          ],
          options: ['no-exp'],
          correctionFormat: [
            {
              correct: ["L'aire d'un parallélogramme de base $$&1\\,mm$$ et de hauteur $$&2\\,mm$$ est &answer."],
              uncorrect: ["L'aire d'un parallélogramme de base $$&1\\,mm$$ et de hauteur $$&2\\,mm$$ est &solution."],
              answer: "L'aire du carré est &answer."
            },
            {
              correct: ["L'aire d'un parallélogramme de base $$&1\\,cm$$ et de hauteur $$&2\\,cm$$ est &answer."],
              uncorrect: ["L'aire d'un parallélogramme de base $$&1\\,cm$$ et de hauteur $$&2\\,cm$$ est &solution."],
              answer: "L'aire du parallélogramme est &answer."
            },
            {
              correct: ["L'aire d'un parallélogramme de base $$&1\\,dm$$ et de hauteur $$&2\\,dm$$ est &answer."],
              uncorrect: ["L'aire d'un parallélogramme de base $$&1\\,dm$$ et de hauteur $$&2\\,dm$$ est &solution."],
              answer: "L'aire du parallélogramme est &answer."
            },
            {
              correct: ["L'aire d'un parallélogramme de base $$&1\\,m$$ et de hauteur $$&2\\,m$$ est &answer."],
              uncorrect: ["L'aire d'un parallélogramme de base $$&1\\,m$$ et de hauteur $$&2\\,m$$ est &solution."],
              answer: "L'aire du parallélogramme est &answer."
            },
            {
              correct: ["L'aire d'un parallélogramme de base $$&1\\,dam$$ et de hauteur $$&2\\,dam$$ est &answer."],
              uncorrect: ["L'aire d'un parallélogramme de base $$&1\\,dam$$ et de hauteur $$&2\\,dam$$ est &solution."],
              answer: "L'aire du parallélogramme est &answer."
            },
            {
              correct: ["L'aire d'un parallélogramme de base $$&1\\,hm$$ et de hauteur $$&2\\,hm$$ est &answer."],
              uncorrect: ["L'aire d'un parallélogramme de base $$&1\\,hm$$ et de hauteur $$&2\\,hm$$ est &solution."],
              answer: "L'aire du parallélogramme est &answer."
            },
            {
              correct: ["L'aire d'un parallélogramme de base $$&1\\,km$$ et de hauteur $$&2\\,km$$ est &answer."],
              uncorrect: ["L'aire d'un parallélogramme de base $$&1\\,km$$ et de hauteur $$&2\\,km$$ est &solution."],
              answer: "L'aire du parallélogramme est &answer."
            },

          ],
          correctionDetails: [
            [
              { text: "L'aire d'un parallélogramme de base $$&1\\,mm$$ et de hauteur $$&2\\,mm$$  est $$&1\\,mm \\times &2\\,mm = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,mm^2}$$." }
            ],
            [
              { text: "L'aire d'un parallélogramme de base $$&1\\,cm$$ et de hauteur $$&2\\,cm$$  est $$&1\\,cm \\times &2\\,cm = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,cm^2}$$." }
            ],
            [
              { text: "L'aire d'un parallélogramme de base $$&1\\,dm$$ et de hauteur $$&2\\,dm$$  est $$&1\\,dm \\times &2\\,dm = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,dm^2}$$." }
            ],
            [
              { text: "L'aire d'un parallélogramme de base $$&1\\,m$$ et de hauteur $$&2\\,m$$  est $$&1\\,m \\times &2\\,m = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,m^2}$$." }
            ],
            [
              { text: "L'aire d'un parallélogramme de base $$&1\\,dam$$ et de hauteur $$&2\\,dam$$  est $$&1\\,dam \\times &2\\,dam = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,dam^2}$$." }
            ],
            [
              { text: "L'aire d'un parallélogramme de base $$&1\\,hm$$ et de hauteur $$&2\\,hm$$  est $$&1\\,hm \\times &2\\,hm = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,hm^2}$$." }
            ],
            [
              { text: "L'aire d'un parallélogramme de base $$&1\\,km$$ et de hauteur $$&2\\,km$$  est $$&1\\,km \\times &2\\,km = \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1*&2}\\,km^2}$$." }
            ],

          ],
          type: 'result',
          defaultDelay: 15,
          grade: CINQUIEME,
        },

      ],
    }

  },
  "Racines carré": {
    Apprivoiser: {
      Définition: [
        {
          description: 'Trouver un nombre de carré donné',
          subdescription: 'Entier de 1 à 12',
          enounces: ['Complète.'],
          expressions: ['?^2=#{&1^2}'],
          variables: [{ '&1': '$e[1;15]' }],
          solutions: [['&1']],
          type: 'trou',
          defaultDelay: 10,
          grade: CINQUIEME,
        },
        {
          description: 'Trouver une racine carré',
          subdescription: 'Entier de 1 à 12',
          enounces: ['Calcule.'],
          expressions: ['sqrt(#{&1*&1})'],
          variables: [{ '&1': '$e[1;15]' }],
          solutions: [['&1']],
          type: 'result',
          correctionDetails: [
            [
              { text: '$$&exp=$$&solution car $$&1 \\times &1 = #{&1^2}$$.' }
            ],
          ],
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Existence d'une racine carré",
          enounces: ["Est-ce que ce nombre existe ?"],
          expressions: [
            'sqrt(#{&1^2})',
            'sqrt(##{&1^2})',
            'sqrt(&1)',
            'sqrt(-#{&1^2})',
            'sqrt(-##{&1^2})',
            'sqrt(-&1)',
            'sqrt(&1)',
            'sqrt(-&1)',
          ],
          variables: [
            { '&1': '$e[2;15]' },
            { '&1': '$d{1;1}' },
            { '&1': '$l{2;3;5;7;10;11;13}' },
            { '&1': '$e[2;15]' },
            { '&1': '$d{1;1}' },
            { '&1': '$l{2;3;5;7;10;11;13}' },
            { '&1': 'pi' },
            { '&1': 'pi' }
          ],
          choices: [
            [{ text: 'Oui' }, { text: 'Non' }],
          ],
          correctionFormat: [{
            correct: ['&solution, $$&exp$$ existe'],
            uncorrect: ['&solution, $$&exp$$ existe'],
            answer: "<span style='color:red;'>Non</span>, ce nombre n'existe pas."
          },
          {
            correct: ['&solution, $$&exp$$ existe'],
            uncorrect: ['&solution, $$&exp$$ existe'],
            answer: "<span style='color:red;'>Non</span>, ce nombre n'existe pas."
          },
          {
            correct: ['&solution, $$&exp$$ existe'],
            uncorrect: ['&solution, $$&exp$$ existe'],
            answer: "<span style='color:red;'>Non</span>, ce nombre n'existe pas."
          },
          {
            correct: ["&solution, $$&exp$$ n'existe pas."],
            uncorrect: ["&solution, $$&exp$$ n'existe pas."],
            answer: "<span style='color:red;'>Oui</span>, ce nombre existe."
          },
          {
            correct: ["&solution, $$&exp$$ n'existe pas."],
            uncorrect: ["&solution, $$&exp$$ n'existe pas."],
            answer: "<span style='color:red;'>Oui</span>, ce nombre existe."
          },
          {
            correct: ["&solution, $$&exp$$ n'existe pas."],
            uncorrect: ["&solution, $$&exp$$ n'existe pas."],
            answer: "<span style='color:red;'>Oui</span>, ce nombre existe."
          },
          {
            correct: ['&solution, $$&exp$$ existe'],
            uncorrect: ['&solution, $$&exp$$ existe'],
            answer: "<span style='color:red;'>Non</span>, ce nombre n'existe pas."
          },
          {
            correct: ["&solution, $$&exp$$ n'existe pas."],
            uncorrect: ["&solution, $$&exp$$ n'existe pas."],
            answer: "<span style='color:red;'>Oui</span>, ce nombre existe."
          },
          ],
          correctionDetails: [
            [
              { text: '&solution, $$&exp$$ existe car $$#{&1^2}$$ est positif.' },
              { text: '$$&exp=&1$$ car $$&1 \\times &1 = #{&1^2}$$.' }
            ],
            [
              { text: '&solution, $$&exp$$ existe car $$%%{&1^2}$$ est positif.' },
              { text: '$$&exp=%%{&1}$$ car $$%%{&1} \\times %%{&1} = %%{&1^2}$$.' }
            ],
            [
              { text: '&solution, $$&exp$$ existe car $$&1$$ est positif.' },
              { text: "On ne peut pas mettre $$&exp$$ sous la forme d'un nombre décimal." },
              { text: "On peut seulement écrire que $$&exp \\times &exp=%{&1}$$, et trouver une <b>valeur approchée</b> à la calculatrice : $$&exp \\simeq %%{sqrt(&1)}$$." },

            ],
            [
              { text: "&solution, $$&exp$$ n'existe pas car $$-#{&1^2}$$ est négatif." },
            ],
            [
              { text: "&solution, $$&exp$$ n'existe pas car $$-%%{&1^2}$$ est négatif." },
            ],
            [
              { text: "&solution, $$&exp$$ n'existe pas car $$-&1$$ est négatif." },
            ],
            [
              { text: '&solution, $$&exp$$ existe car $$\\pi$$ est positif.' },
              { text: "On ne peut pas mettre $$&exp$$ sous la forme d'un nombre décimal." },
              { text: "On peut seulement écrire que $$&exp \\times &exp=\\pi$$, et trouver une <b>valeur approchée</b> à la calculatrice : $$&exp \\simeq %%{sqrt(&1)}$$." },

            ],
            [
              { text: "&solution, $$&exp$$ n'existe pas car $$-\\pi$$ est négatif." },
            ],
          ],
          solutions: [
            [0],
            [0],
            [0],
            [1],
            [1],
            [1],
            [0],
            [1],
          ],
          type: 'choice',
          options: ['no-shuffle-choices'],
          defaultDelay: 10,
          grade: QUATRIEME,
        },

        {
          description: "Carré d'une racine",
          enounces: ['Calcule.'],
          expressions: [
            '(sqrt(&1))^2',
            'sqrt(&1)*sqrt(&1)',

          ],
          correctionDetails: [
            [
              { text: '$$&exp =$$ &solution, car par définition,' },
              { text: "$$\\sqrt{&1}$$ est le nombre positif dont le carré est $$%{(sqrt(&1))^2}$$." },
            ],

          ],
          variables: [{ '&1': '$e{2}' }],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },


      ]
    },
    Manipuler: {
      Propriétés: [
        {
          description: "Vrai ou Faux : racines et opérations",
          enounces: ["Vrai ou Faux ?"],
          expressions: [
            'sqrt(&1)+sqrt(&2)=sqrt(#{&1+&2})',
            'sqrt(&1)*sqrt(&2)=sqrt(#{&1*&2})',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
            },
          ],
          choices: [
            [{ text: 'Vrai' }, { text: 'Faux' }],
          ],
          correctionFormat: [{
            correct: ["&solution, $$\\sqrt{&1}+\\sqrt{&2} \\textcolor{green}{\\ne} \\sqrt{#{&1+&2}}$$"],
            uncorrect: ["&solution, $$\\sqrt{&1}+\\sqrt{&2} \\textcolor{green}{\\ne} \\sqrt{#{&1+&2}}$$"],
            answer: "$$\\sqrt{&1}+\\sqrt{&2} \\textcolor{red}{=} \\sqrt{#{&1+&2}}$$"
          },
          {
            correct: ["&solution, $$\\sqrt{&1} \\times \\sqrt{&2} \\textcolor{green}{=} \\sqrt{#{&1*&2}}$$"],
            uncorrect: ["&solution, $$\\sqrt{&1} \\times \\sqrt{&2} \\textcolor{green}{=} \\sqrt{#{&1*&2}}$$"],
            answer: "$$\\sqrt{&1} \\times \\sqrt{&2} \\textcolor{red}{\\ne} \\sqrt{#{&1*&2}}$$"
          }],
          correctionDetails: [
            [
              { text: '&solution, $$\\sqrt{&1} + \\sqrt{&2} \\gt \\sqrt{&1 + &2}$$ ' },
              { text: "En effet, on peut comparer les carrés des 2 membres de l'inégalité :" },
              { text: '$$\\begin{align} \\left(\\sqrt{&1} + \\sqrt{&2}\\right)^2 &= \\left(\\sqrt{&1}\\right)^2 +\\left(\\sqrt{&2}\\right)^2 + 2\\sqrt{&1}\\sqrt{&2} \\\\ &= &1 +&2\\textcolor{orange}{+2\\sqrt{#{&1*&2}}} \\\\ \\left(\\sqrt{&1+&2}\\right)^2 &= &1+&2\\end{align}$$' },
            ],
            [
              { text: '&solution' },
              { text: '$$\\begin{align} \\sqrt{&1} \\times \\sqrt{&2} &=  \\sqrt{&1 \\times &2} \\\\ &= \\sqrt{#{&1*&2}} \\\\ \\end{align}$$' },
            ],
          ],
          // corrections: [
          //   'Entre $$%%{&5}$$ et $$%%{&6}$$ le plus petit est ',
          // ],
          solutions: [
            [1],
            [0]
          ],
          options: ['no-shuffle-choices'],
          type: 'choice',
          defaultDelay: 20,
          grade: SECONDE,
        },
      ],
      Réduire: [
        {
          description: 'Réduire une racine carré',
          enounces: ['Réduis sous la forme $$a\\sqrt{b}$$'],
          expressions: ['sqrt(#{&1*&1*&2})'],
          variables: [{
            '&1': '$l{2;3;5;10}',
            '&2': '$l{2;3;5}'
          }],
          // solutions: [['&1sqrt(&2)']],
          type: 'result',
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\sqrt{#{&1*&1*&2}} &= \\sqrt{#{&1*&1} \\times &2} \\\\ &= \\sqrt{#{&1*&1}} \\times \\sqrt{&2} \\\\  &= &1 \\times \\sqrt{&2} \\\\  &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1 \\sqrt{&2}}} \\\\ \\end{align}$$' },
            ],
          ],
          options: ['penalty-for-factors-permutation'],
          defaultDelay: 20,
          grade: SECONDE,
        },
        {
          description: 'Réduire une expression avec des racines carré',
          enounces: ['Réduis sous la forme $$a\\sqrt{b}$$, avec $$b$$ le plus petit possible.'],
          expressions: ['sqrt(#{&1*&1*&3})+sqrt(#{&2*&2*&3})'],
          variables: [{ '&1': '$l{2;3;5;10}', '&2': '$l{2;3;5;10}\\{&1}', '&3': '$l{2;3;5}' }],
          solutions: [['#{&1+&2}sqrt(&3)']],
          type: 'result',
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              \\sqrt{#{&1*&1*&3}} + \\sqrt{#{&2*&2*&3}} &= \\sqrt{#{&1*&1}} \\times \\sqrt{&3} + \\sqrt{#{&2*&2}} \\times \\sqrt{&3} \\\\ \
              &= &1 \\times \\textcolor{teal}{\\sqrt{&3}} + &2 \\times \\textcolor{teal}{\\sqrt{&3}} \\\\ \
              &= &1 \\textcolor{teal}{\\sqrt{&3}} + &2 \\textcolor{teal}{\\sqrt{&3}} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&1+&2} \\sqrt{&3}}} \\\\ \
              \\end{align}$$' },
            ],
          ],
          options: ['penalty-for-factors-permutation'],
          defaultDelay: 40,
          grade: SECONDE,
        }
      ],
      Egalité: [
        {
          description: "Vérifier l'égalité de deux expressions comportant des racines carrées",
          enounces: ['Ces 2 expressions sont-elles égales ?'],
          expressions: ['sqrt(#{&1*&1*&2})', 'sqrt(#{&1*&1*&2})'],
          expressions2: ['&1sqrt(&2)', '&1sqrt(#{&2+(&3)})'],

          variables: [{
            '&1': '$e[2;5]',
            '&2': '$e[2;4]',
            '&3': '$er[1;1]}'

          }],
          choices: [
            [
              { text: 'Oui' },
              { text: 'Non' },
            ],

          ],
          conditions: ['true', '&2+(&3) !=1'],
          solutions: [[0], [1]],
          type: 'choice',
          options: ['no-shuffle-choices'],
          correctionFormat: [
            {
              correct: ["&solution, $$&exp=&exp2$$"],
              uncorrect: ["&solution, $$&exp=&exp2$$"],
              answer: " C'est une fonction affine ? &answer"
            },
            {
              correct: ["&solution, $$&exp \\neq &exp2$$"],
              uncorrect: ["&solution, $$&exp\\neq &exp2$$"],
              answer: " C'est une fonction affine ? &answer"
            },
          ],
          correctionDetails: [
            [
              { text: '$$\\begin{align} \\sqrt{#{&1*&1*&2}} &= \\sqrt{#{&1*&1} \\times &2} \\\\ &= \\sqrt{#{&1*&1}} \\times \\sqrt{&2} \\\\  &= &1 \\times \\sqrt{&2} \\\\  &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1 \\sqrt{&2}}} \\\\ \\end{align}$$' },
            ],
          ],

          defaultDelay: 20,
          grade: SECONDE,
        },

      ],
      Calculer: [
        {
          description: "Carré et racine carré",
          enounces: ['Calcule.'],
          expressions: [
            '(sqrt(&1))^2',
            'sqrt(&1^2)',
            'sqrt((-&1)^2)',
            'sqrt(&1)*sqrt(&1)',

          ],
          variables: [{ '&1': '$e[2;50]' }],
          type: 'result',
          defaultDelay: 20,
          grade: QUATRIEME,
        },
        {
          description: "Calculer avec des racines",
          enounces: ['Calcule.'],
          expressions: [
            '(&2sqrt(&1))^2',
            'sqrt(&1)*&2*sqrt(&1)'
          ],
          variables: [{
            '&1': '$e[2;9]',
            '&2': '$l{2;3}',
          },
          {
            '&1': '$e[2;9]',
            '&2': '$e[2;9]',
          }],
          type: 'result',
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              \\left(&2\\sqrt{&1}\\right)^2 &= &2^2 \\times \\left(\\sqrt{&1}\\right)^2 \\\\ \
               &= #{&2^2} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&2^2*&1}}} \\\\ \
              \\end{align}$$'
              }
            ],
            [
              {
                text: '$$\\begin{align} \
              \\left(&2\\sqrt{&1}\\right)^2 &= &2^2 \\times \\left(\\sqrt{&1}\\right)^2 \\\\ \
               &= #{&2^2} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&2^2*&1}}} \\\\ \
              \\end{align}$$'
              }
            ],
          ],
          defaultDelay: 20,
          grade: QUATRIEME,
        },

      ]
    }
  },
  Proportionnalité: {
    'Pourcentages': {
      Définition: [
        {
          description: "Définition d'un pourcentage",
          subdescription: "Convertir un pourcentage en une fraction de dénominateur 100.",
          enounces: ['Quelle est la fraction correspondant à :'],
          expressions: ['&1%'],
          variables: [{ '&1': '$e[1;100]' }],
          solutions: [['&1/100']],
          type: 'result',
          defaultDelay: 10,
          grade: SIXIEME,
        },
        {
          description: "Définition d'un pourcentage",
          subdescription: "convertir une fraction de dénominateur 100 en pourcentage.",
          enounces: ['Quelle est pourcentage correspondant à la fraction :'],
          expressions: ['&1/100'],
          variables: [{ '&1': '$e[1;100]' }],
          solutions: [['&1%']],
          type: 'result',
          defaultDelay: 10,
          grade: SIXIEME,
        },
        {
          description: "Définition d'un pourcentage",
          subdescription: "Convertir un pourcentage en une fraction simplifiée.",
          enounces: ['Quelle est la fraction simplifiée correspondant à :'],
          expressions: ['&1%'],
          variables: [{ '&1': '$l{10;20;30;40;50;60;70;80;90;100;25;75;200;300;400}' }],
          type: 'result',
          defaultDelay: 10,
          grade: SIXIEME,
        },

      ],
      'Proportions': [

      ],
      "Calculer": [
        {
          description: "Calculer le pourcentage d'une quantité",
          subdescription: "50%",
          enounces: ['Calcule $$50\\%$$ de $$#{&1*2}$$.'],
          expressions: ['50%*#{&1*2}'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[1;50]' }],
          type: 'result',
          defaultDelay: 10,
          grade: SIXIEME,
        },
        {
          description: "Calculer le pourcentage d'une quantité",
          subdescription: "10%",
          enounces: ['Calcule $$10\\%$$ de $$#{&1*10}$$.'],
          expressions: ['10%*#{&1*10}'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[1;50]' }],
          type: 'result',
          defaultDelay: 10,
          grade: SIXIEME,
        },
        {
          description: "Calculer le pourcentage d'une quantité",
          subdescription: "10% d'un nombre non multiple de 10",
          enounces: ['Calcule $$10\\%$$ de $$#{&1}$$.'],
          expressions: ['10%*#{&1}'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[1;100]\\{m10}' }],
          'result-type': 'decimal',
          type: 'result',
          defaultDelay: 10,
          grade: SIXIEME,
        },
        {
          description: "Calculer le pourcentage d'une quantité",
          subdescription: "20%-40%",
          enounces: ['Calcule $$&1\\%$$ de $$#{&2*10}$$.'],
          expressions: ['&1%*#{&2*10}'],
          options: ['no-exp'],
          variables: [{ '&1': '$l{20;30;40}', '&2': '$e[1;40]' }],
          type: 'result',
          defaultDelay: 10,
          grade: SIXIEME,
        },
        {
          description: "Calculer le pourcentage d'une quantité",
          subdescription: "25%",
          enounces: ['Calcule $$25\\%$$ de $$#{&1*4}$$.'],
          expressions: ['25%*#{&1*4}'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[1;15]' }],
          type: 'result',
          defaultDelay: 10,
          grade: SIXIEME,
        },
        {
          description: "Calculer le pourcentage d'une quantité",
          subdescription: "75%",
          enounces: ['Calcule $$75\\%$$ de $$#{&1*4}$$.'],
          expressions: ['75%*#{&1*4}'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[1;12]' }],
          type: 'result',
          defaultDelay: 10,
          grade: SIXIEME,
        },

      ],
      "Variations": [
        {
          description: "Augmentation",
          enounces: ["Un article qui coûtait initialement $$%{&1}$$ Qr voit son prix augmenter de $$&2\\%$$. Quel est son nouveau prix?"],
          expressions: ['#{&1}+#{&1}*(&2/100)'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[2;20]*10', '&2': '$l{10;20;50;100;200}' }],
          type: 'result',
          defaultDelay: 10,
          grade: SIXIEME,
        },
        {
          description: "Diminution",
          enounces: ["Un article qui coûtait initialement $$%{&1}$$ Qr voit son prix diminuer de $$&2\\%$$. Quel est son nouveau prix?"],
          expressions: ['#{&1}-#{&1}*(&2/100)'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[2;20]*10', '&2': '$l{10;20;30;50;100}' }],
          type: 'result',
          defaultDelay: 10,
          grade: SIXIEME,
        },
        {
          description: "Trouver le coefficient multiplicateur",
          subdescription: "Augmentation",
          enounces: ["Quel est le coefficient multiplicateur correspondant à une augmentation de $$&1\\%$$?"],
          expressions: ['1+&1/100'],
          options: ['no-exp'],
          variables: [{ '&1': '$l{$e[1;30];100;200;50}', }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 10,
          grade: SECONDE,
        },
        {
          description: "Trouver le coefficient multiplicateur",
          subdescription: "Diminution",
          enounces: ["Quel est le coefficient multiplicateur correspondant à une diminution de $$&1\\%$$?"],
          expressions: ['1-&1/100'],
          options: ['no-exp'],
          variables: [{ '&1': '$l{$e[1;30];100}', }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 10,
          grade: SECONDE,
        },
        {
          description: "Trouver le pourcentage d'augmentation",
          enounces: ["Quel est le pourcentage d'augmentation correspondant à un coefficient multiplicateur de $$%%{1+&1/100}$$?"],
          expressions: ['##{1+&1/100}'],
          options: ['no-exp'],
          variables: [{ '&1': '$l{$e[1;30];100;200;50}', }],
          type: 'result',
          solutions: [['&1%']],
          defaultDelay: 10,
          grade: SECONDE,
        },
        {
          description: "Trouver le pourcentage de diminution",
          enounces: ["Quel est le pourcentage de diminution correspondant à un coefficient multiplicateur de $$%%{1-&1/100}$$?"],
          expressions: ['##{1-&1/100}'],
          options: ['no-exp'],
          variables: [{ '&1': '$l{$e[1;30];100}', }],
          type: 'rewrite',
          correctionFormat: [{
            correct: ['Un coefficient de $$&exp$$ correspond à une diminution de $$&solution$$'],
            uncorrect: ['Un coefficient de $$&exp$$ correspond à une diminution de $$&solution$$'],
            answer: 'Un coefficient de $$&exp$$ correspond à une diminution de &answer'
          }],
          solutions: [['&1%']],
          defaultDelay: 10,
          grade: SECONDE,
        },


      ]




    }
  },

  'Fonctions': {
    'Fonctions affines': {
      Apprivoiser: [
        {
          description: "Reconnaître une fonction affine",
          subdescription: "A partir de l'expression algébrique",
          enounces: [
            'Cette fonction est-elle une fonction affine ?',
          ],
          expressions: [
            'f(x)=#{&1x}#s{&2}',
            'f(x)=&2#s{&1x}',
            'f(x)={#{&1/&3}}x#s{&2/&4}',
            'f(x)=&2/&4+{#{abs(&1)/&3}}x',
            'f(x)=#{&1x}',
            'f(x)=&2',
            'f(x)=#{&1x^2}#s{&2}',
            'f(x)=&2#s{&1x^3}',
            'f(x)=&1/x#s{&2}',
          ],
          variables: [
            {
              '&1': '$er[1;9]',
              '&2': '$er[1;9]',
              '&3': '$e[2;9]\\{cd(&1)}',
              '&4': '$e[2;9]\\{cd(&2)}',
            }
          ],

          type: 'choice',

          choices: [
            [
              { text: 'Oui' },
              { text: 'Non' },
            ],

          ],
          correctionFormat: [
            {
              correct: ["$$&exp$$ est-elle une fonction affine ? &solution"],
              uncorrect: ["$$&exp$$ est-elle une fonction affine ? &solution"],
              answer: " C'est une fonction affine ? &answer"
            },
          ],

          solutions: [
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [1],
            [1],
            [1],
          ],
          options: ['no-shuffle-choices'],
          defaultDelay: 20,
          grade: TROISIEME,
        },
        {
          description: "Reconnaître une fonction affine",
          subdescription: "A partir de la représentation graphique",
          enounces: [
            'Cette courbe représente-t-elle une fonction affine ?',
          ],
          images: [
            'fonctions-affines/reconnaitre/reconnaitre_fonction_affine-0-600.png',
            'fonctions-affines/reconnaitre/reconnaitre_fonction_affine-1-600.png',
            'fonctions-affines/reconnaitre/reconnaitre_fonction_affine-2-600.png',
            'fonctions-affines/reconnaitre/reconnaitre_fonction_affine-3-600.png',
            'fonctions-affines/reconnaitre/reconnaitre_fonction_affine-4-600.png',
            'fonctions-affines/reconnaitre/reconnaitre_fonction_affine-5-600.png',
            'fonctions-affines/reconnaitre/reconnaitre_fonction_affine-6-600.png',
            'fonctions-affines/reconnaitre/reconnaitre_fonction_affine-7-600.png',
            'fonctions-affines/reconnaitre/reconnaitre_fonction_affine-8-600.png',
            'fonctions-affines/reconnaitre/reconnaitre_fonction_affine-9-600.png',
            'fonctions-affines/reconnaitre/reconnaitre_fonction_affine-10-600.png',
            'fonctions-affines/reconnaitre/reconnaitre_fonction_affine-11-600.png',
          ],

          type: 'choice',
          choices: [
            [
              { text: 'Oui' },
              { text: 'Non' },
            ],

          ],
          correctionFormat: [
            {
              correct: ["Est-ce la courbe représentative d'une fonction affine ? &solution"],
              uncorrect: ["Est-ce la courbe représentative d'une fonction affine ? &solution"],
              answer: " &answer"
            },
          ],

          solutions: [
            [0],
            [0],
            [0],
            [0],
            [0],
            [0],
            [1],
            [1],
            [1],
            [1],
            [1],
            [1],
          ],
          options: ['no-shuffle-choices'],
          defaultDelay: 20,
          grade: TROISIEME,
        },
        {
          description: "Vocabulaire des fonctions affines",
          enounces: [
            "Dans la fonction affine $$f(x)=&1x#s{&2}$$, le nombre $$&1$$ s'appelle ...",
            "Dans la fonction affine $$f(x)=&1x#s{&2}$$, le nombre $$&2$$ s'appelle ...",
            "Dans la fonction affine $$f(x)=&2#s{&1}x$$, le nombre $$&1$$ s'appelle ...",
            "Dans la fonction affine $$f(x)=&2#s{&1}x$$, le nombre $$&2$$ s'appelle ...",
          ],
          expressions: [
            'f(x)=&1x#s{&2}',
            'f(x)=&1x#s{&2}',
            'f(x)=&2#s{&1}x',
            'f(x)=&2#s{&1}x'
          ],

          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$e[1;9]\\{&1;-(&1)}',
            },
          ],
          type: 'choice',
          choices: [
            [{ text: 'le coefficient directeur' }, { text: "l'ordonnée à l'origine " }],
          ],
          options: ['no-exp', 'no-shuffle-choices'],
          correctionFormat: [
            {
              correct: ["Dans la fonction affine $$&exp$$, le nombre $$&1$$ s'appelle &solution."],
              uncorrect: ["Dans la fonction affine $$&exp$$, Le nombre $$&1$$ s'appelle &solution."],
              answer: "Le nombre s'appelle &answer."
            },
            {
              correct: ["Dans la fonction affine $$&exp$$, le nombre $$&2$$ s'appelle &solution."],
              uncorrect: ["Dans la fonction affine $$&exp$$, le nombre $$&2$$ s'appelle &solution."],
              answer: "Le nombre s'appelle &answer."
            },
            {
              correct: ["Dans la fonction affine $$&exp$$, le nombre $$&1$$ s'appelle &solution."],
              uncorrect: ["Dans la fonction affine $$&exp$$, Le nombre $$&1$$ s'appelle &solution."],
              answer: "Le nombre s'appelle &answer."
            },
            {
              correct: ["Dans la fonction affine $$&exp$$, le nombre $$&2$$ s'appelle &solution."],
              uncorrect: ["Dans la fonction affine $$&exp$$, le nombre $$&2$$ s'appelle &solution."],
              answer: "Le nombre s'appelle &answer."
            },
          ],


          solutions: [
            [0],
            [1],
            [0],
            [1],
          ],

          defaultDelay: 10,
          grade: TROISIEME,
        },
        {
          description: "Déterminer l'ordonnée à l'origine",
          subdescription: "Graphiquement",
          enounces: ["Quelle est l'ordonnée à l'origine de cette fonction affine ?"],
          // expressions:['1'],
          images: [
            'fonctions-affines/exemples/fonction_affine-0-600.png',
            'fonctions-affines/exemples/fonction_affine-1-600.png',
            'fonctions-affines/exemples/fonction_affine-2-600.png',
            'fonctions-affines/exemples/fonction_affine-3-600.png',
            'fonctions-affines/exemples/fonction_affine-4-600.png',
            'fonctions-affines/exemples/fonction_affine-5-600.png',
            'fonctions-affines/exemples/fonction_affine-6-600.png',
            'fonctions-affines/exemples/fonction_affine-7-600.png',
            'fonctions-affines/exemples/fonction_affine-8-600.png',
            'fonctions-affines/exemples/fonction_affine-9-600.png',
            'fonctions-affines/exemples/fonction_affine-10-600.png',
            'fonctions-affines/exemples/fonction_affine-11-600.png',
            'fonctions-affines/exemples/fonction_affine-12-600.png',
            'fonctions-affines/exemples/fonction_affine-13-600.png',
            'fonctions-affines/exemples/fonction_affine-14-600.png',
            'fonctions-affines/exemples/fonction_affine-15-600.png',
            'fonctions-affines/exemples/fonction_affine-16-600.png',
            'fonctions-affines/exemples/fonction_affine-17-600.png',
            'fonctions-affines/exemples/fonction_affine-18-600.png',
            'fonctions-affines/exemples/fonction_affine-19-600.png',
            'fonctions-affines/exemples/fonction_affine-20-600.png',
            'fonctions-affines/exemples/fonction_affine-21-600.png',
            'fonctions-affines/exemples/fonction_affine-22-600.png',
            'fonctions-affines/exemples/fonction_affine-23-600.png',
            'fonctions-affines/exemples/fonction_affine-24-600.png',
            'fonctions-affines/exemples/fonction_affine-25-600.png',
            'fonctions-affines/exemples/fonction_affine-26-600.png',
            'fonctions-affines/exemples/fonction_affine-27-600.png',
            'fonctions-affines/exemples/fonction_affine-28-600.png',
            'fonctions-affines/exemples/fonction_affine-29-600.png',

          ],
          imagesCorrection: [
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-0-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-1-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-2-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-3-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-4-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-5-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-6-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-7-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-8-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-9-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-10-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-11-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-12-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-13-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-14-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-15-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-16-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-17-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-18-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-19-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-20-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-21-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-22-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-23-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-24-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-25-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-26-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-27-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-28-600.png',
            'fonctions-affines/ordonnee-origine/correction_ordonnee_origine-29-600.png',

          ],
          solutions: [
            [
              "0"
            ],
            [
              "2"
            ],
            [
              "0"
            ],
            [
              "2"
            ],
            [
              "-2"
            ],
            [
              "-1"
            ],
            [
              "0"
            ],
            [
              "1"
            ],
            [
              "0"
            ],
            [
              "1"
            ],
            [
              "-2"
            ],
            [
              "0"
            ],
            [
              "2"
            ],
            [
              "1"
            ],
            [
              "-2"
            ],
            [
              "1"
            ],
            [
              "2"
            ],
            [
              "0"
            ],
            [
              "-2"
            ],
            [
              "-2"
            ],
            [
              "1"
            ],
            [
              "-2"
            ],
            [
              "1"
            ],
            [
              "0"
            ],
            [
              "0"
            ],
            [
              "-1"
            ],
            [
              "0"
            ],
            [
              "2"
            ],
            [
              "0"
            ],
            [
              "0"
            ]
          ],
          correctionFormat: [{
            correct: ["L'ordonnée à l'origine est &solution."],
            uncorrect: ["L'ordonnée à l'origine est &solution."],
            answer: "L'ordonnée à l'origine est &answer."
          }],
          options: ['no-exp'],
          type: 'result',
          defaultDelay: 10,
          grade: SECONDE,
        },
        {
          description: "Déterminer le coefficient directeur",
          subdescription: "Graphiquement",
          enounces: ["Quel est le coefficient directeur de cette fonction affine ?"],
          // expressions:['1'],
          images: [
            'fonctions-affines/exemples/fonction_affine-0-600.png',
            'fonctions-affines/exemples/fonction_affine-1-600.png',
            'fonctions-affines/exemples/fonction_affine-2-600.png',
            'fonctions-affines/exemples/fonction_affine-3-600.png',
            'fonctions-affines/exemples/fonction_affine-4-600.png',
            'fonctions-affines/exemples/fonction_affine-5-600.png',
            'fonctions-affines/exemples/fonction_affine-6-600.png',
            'fonctions-affines/exemples/fonction_affine-7-600.png',
            'fonctions-affines/exemples/fonction_affine-8-600.png',
            'fonctions-affines/exemples/fonction_affine-9-600.png',
            'fonctions-affines/exemples/fonction_affine-10-600.png',
            'fonctions-affines/exemples/fonction_affine-11-600.png',
            'fonctions-affines/exemples/fonction_affine-12-600.png',
            'fonctions-affines/exemples/fonction_affine-13-600.png',
            'fonctions-affines/exemples/fonction_affine-14-600.png',
            'fonctions-affines/exemples/fonction_affine-15-600.png',
            'fonctions-affines/exemples/fonction_affine-16-600.png',
            'fonctions-affines/exemples/fonction_affine-17-600.png',
            'fonctions-affines/exemples/fonction_affine-18-600.png',
            'fonctions-affines/exemples/fonction_affine-19-600.png',
            'fonctions-affines/exemples/fonction_affine-20-600.png',
            'fonctions-affines/exemples/fonction_affine-21-600.png',
            'fonctions-affines/exemples/fonction_affine-22-600.png',
            'fonctions-affines/exemples/fonction_affine-23-600.png',
            'fonctions-affines/exemples/fonction_affine-24-600.png',
            'fonctions-affines/exemples/fonction_affine-25-600.png',
            'fonctions-affines/exemples/fonction_affine-26-600.png',
            'fonctions-affines/exemples/fonction_affine-27-600.png',
            'fonctions-affines/exemples/fonction_affine-28-600.png',
            'fonctions-affines/exemples/fonction_affine-29-600.png',

          ],
          imagesCorrection: [
            'fonctions-affines/coef-directeur/correction_coef_directeur-0-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-1-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-2-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-3-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-4-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-5-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-6-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-7-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-8-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-9-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-10-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-11-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-12-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-13-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-14-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-15-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-16-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-17-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-18-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-19-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-20-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-21-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-22-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-23-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-24-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-25-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-26-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-27-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-28-600.png',
            'fonctions-affines/coef-directeur/correction_coef_directeur-29-600.png',

          ],
          solutions: [
            [
              "-3"
            ],
            [
              "3"
            ],
            [
              "-2"
            ],
            [
              "-2"
            ],
            [
              "-4"
            ],
            [
              "2"
            ],
            [
              "4"
            ],
            [
              "4"
            ],
            [
              "-4"
            ],
            [
              "2"
            ],
            [
              "-1"
            ],
            [
              "3"
            ],
            [
              "2"
            ],
            [
              "-2"
            ],
            [
              "-3"
            ],
            [
              "1/2"
            ],
            [
              "-3/2"
            ],
            [
              "-4/3"
            ],
            [
              "4/3"
            ],
            [
              "2/3"
            ],
            [
              "-4/3"
            ],
            [
              "-2/3"
            ],
            [
              "2/3"
            ],
            [
              "-3/2"
            ],
            [
              "-1/3"
            ],
            [
              "-1/2"
            ],
            [
              "-1/2"
            ],
            [
              "3/4"
            ],
            [
              "-3/4"
            ],
            [
              "2/3"
            ]
          ],
          correctionFormat: [{
            correct: ["Le coefficent directeur est &solution."],
            uncorrect: ["Le coefficent directeur est &solution."],
            answer: "Le coefficent directeur est &answer."
          }],
          options: ['no-exp'],
          type: 'result',
          defaultDelay: 20,
          grade: SECONDE,
        },
        {
          description: "Déterminer une image par une fonction affine",
          enounces: [
            "Quelle est l'image de $$&3$$ par la fonction affine :"
          ],
          expressions: [
            'f(x)=&1x#s{&2}',
          ],

          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$er[1;9]',
              '&3': '$er[0;9]',
              '&4': '&1*(&3)+(&2)'
            },

          ],
          type: 'rewrite',
          solutions: [
            ['#{&4}']
          ],

          correctionFormat: [
            {
              correct: ["L'image de $$&3$$ par la fonction $$&exp$$ est &solution."],
              uncorrect: ["L'image de $$&3$$ par la fonction $$&exp$$ est &solution."],
              answer: "L'image de $$&3$$ est &answer."
            },
          ],
          defaultDelay: 20,
          grade: TROISIEME,
        },
        {
          description: "Déterminer si un point appartient à la courbe représentative d'un fonction affine",
          enounces: [
            'Le point $$A(&3;#{&4})$$ appartient-il à la courbe représentatice de la fonction affine :',
          ],
          expressions: [
            'f(x)=&1x#s{&2}',
            'f(x)=&1x#s{&2}', // pour correspondre au nombre de variables

          ],

          variables: [
            {
              '&1': '$er[2;6]',
              '&2': '$er[1;9]',
              '&3': '$er[0;5]',
              '&4': '&1*(&3)+(&2)'
            },
            {
              '&1': '$er[2;6]',
              '&2': '$er[1;9]',
              '&3': '$er[0;5]',
              '&4': '&1*(&3)+(&2)+($er[1;3])'
            },
          ],
          type: 'choice',
          choices: [
            [{ text: 'Oui' }, { text: 'Non' }],
          ],
          options: ['no-shuffle-choices'],
          correctionFormat: [
            {
              correct: ['&solution, le point $$A(&3;#{&4})$$ est sur la courbe représentative de la fonction $$&exp$$.'],
              uncorrect: ['&solution, le point $$A(&3;#{&4})$$ est sur la courbe représentative de la fonction $$&exp$$.'],
              answer: "&answer, le point $$A$$ n'appartient pas à la courbe."
            },
            {
              correct: ["&solution, le point $$A(&3;#{&4})$$ n'est pas sur la courbe représentative de la fonction $$&exp$$."],
              uncorrect: ["&solution, le point $$A(&3;#{&4})$$ n'est pas sur la courbe représentative de la fonction $$&exp$$."],
              answer: "&answer, le point $$A$$ appartient à la courbe."
            },
          ],


          solutions: [
            [0],
            [1]
          ],

          defaultDelay: 20,
          grade: TROISIEME,
        },

      ],
      'Variations-Signe': [
        {
          description: "Déterminer le sens de variation d'une fonction affine",
          enounces: [
            'Quel est le sens de variation de cette fonction?',
          ],
          expressions: [
            'f(x)=&1x#s{&4}',
            'f(x)=-&1x#s{&4}',
            'f(x)=#{&4}+&1x',
            'f(x)=#{&4}-&1x',
            'f(x)={&3}x#s{&7}',
            'f(x)={-&3}x#s{&7}',
            'f(x)=#{&7}+{&3}x',
            "f(x)=#{&7}-{&3}x"
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;9]\\{&1}',
              '&3': '$l{-1;1}',
              '&4': '&2*(&3)',

            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;9]\\{&1}',
              '&3': '$l{-1;1}',
              '&4': '&2*(&3)',

            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;9]\\{&1}',
              '&3': '$l{-1;1}',
              '&4': '&2*(&3)',

            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;9]\\{&1}',
              '&3': '$l{-1;1}',
              '&4': '&2*(&3)',

            },

            {
              '&1': '$e[1;9]',
              '&2': '$e[2;9]\\{cd(&1)}',
              '&3': '&1/&2',
              '&4': '$e[1;9]',
              '&5': '$e[2;9]\\{cd(&4)}',
              '&6': '$l{-1;1}',
              '&7': '&6*&4/&5',
            },
            {
              '&1': '$e[1;9]',
              '&2': '$e[2;9]\\{cd(&1)}',
              '&3': '&1/&2',
              '&4': '$e[1;9]',
              '&5': '$e[2;9]\\{cd(&4)}',
              '&6': '$l{-1;1}',
              '&7': '&6*&4/&5',
            },
            {
              '&1': '$e[1;9]',
              '&2': '$e[2;9]\\{cd(&1)}',
              '&3': '&1/&2',
              '&4': '$e[1;9]',
              '&5': '$e[2;9]\\{cd(&4)}',
              '&6': '$l{-1;1}',
              '&7': '&6*&4/&5',
            },
            {
              '&1': '$e[1;9]',
              '&2': '$e[2;9]\\{cd(&1)}',
              '&3': '&1/&2',
              '&4': '$e[1;9]',
              '&5': '$e[2;9]\\{cd(&4)}',
              '&6': '$l{-1;1}',
              '&7': '&6*&4/&5',
            },

          ],

          choices: [
            [{ text: 'croissante' }, { text: 'décroissante' }],
          ],
          correctionFormat: [
            {
              correct: ['La fonction $$&exp$$ est &solution car $$%{&1}$$ est positif.'],
              uncorrect: ['La fonction $$&exp$$ est &solution car $$%{&1}$$ est positif.'],
              answer: 'La fonction $$&exp$$ est &answer.'
            },
            {
              correct: ['La fonction $$&exp$$ est &solution car $$%{-&1}$$ est négatif.'],
              uncorrect: ['La fonction $$&exp$$ est &solution car $$%{-&1}$$ est négatif.'],
              answer: 'La fonction $$&exp$$ est &answer.'
            },
            {
              correct: ['La fonction $$&exp$$ est &solution car $$%{&1}$$ est positif.'],
              uncorrect: ['La fonction $$&exp$$ est &solution car $$%{&1}$$ est positif.'],
              answer: 'La fonction $$&exp$$ est &answer.'
            },
            {
              correct: ['La fonction $$&exp$$ est &solution car $$%{-&1}$$ est négatif.'],
              uncorrect: ['La fonction $$&exp$$ est &solution car $$%{-&1}$$ est négatif.'],
              answer: 'La fonction $$&exp$$ est &answer.'
            },
            {
              correct: ['La fonction $$&exp$$ est &solution car $$%{&3}$$ est positif.'],
              uncorrect: ['La fonction $$&exp$$ est &solution car $$%{&3}$$ est positif.'],
              answer: 'La fonction $$&exp$$ est &answer.'
            },
            {
              correct: ['La fonction $$&exp$$ est &solution car $$%{-&3}$$ est négatif.'],
              uncorrect: ['La fonction $$&exp$$ est &solution car $$%{-&3}$$ est négatif.'],
              answer: 'La fonction $$&exp$$ est &answer.'
            },
            {
              correct: ['La fonction $$&exp$$ est &solution car $$%{&3}$$ est positif.'],
              uncorrect: ['La fonction $$&exp$$ est &solution car $$%{&3}$$ est positif.'],
              answer: 'La fonction $$&exp$$ est &answer.'
            },
            {
              correct: ['La fonction $$&exp$$ est &solution car $$%{-&3}$$ est négatif.'],
              uncorrect: ['La fonction $$&exp$$ est &solution car $$%{-&3}$$ est négatif.'],
              answer: 'La fonction $$&exp$$ est &answer.'
            },

          ],
          solutions: [
            [0],
            [1],
            [0],
            [1],
            [0],
            [1],
            [0],
            [1],

          ],
          type: 'choice',
          options: ['no-shuffle-choices'],
          defaultDelay: 10,
          grade: TROISIEME,
        },
        {
          description: "Déterminer si deux fonctions affines ont des droites représentatives parallèles",
          enounces: [
            'Les droites représentatives de ces 2 fonctions affines sont-elles parallèles?',
          ],
          expressions: [
            'f(x)=&1x#s{&2}',
          ],
          expressions2: [
            'g(x)=&1x#s{&3}',
            'g(x)=&3#s{&1}x',
            'g(x)=&3x#s{&2}',
            'g(x)=&2#s{&3}x',
            'g(x)=#{-(&1)}x#s{&3}',
            'g(x)=&3#s{-(&1)}x',
          ],
          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$e[1;9]\\{&1}',
              '&3': '$er[2;9]',
            },
          ],
          type: 'choice',
          choices: [
            [{ text: 'parallèles' }, { text: '<b>non</b> parallèles' }],
          ],
          options: ['no-shuffle-choices'],
          correctionFormat: [
            {
              correct: ['Les droites représentatives des fonctions $$&exp$$ et $$&exp2$$ sont &solution.'],
              uncorrect: ['Les droites représentatives des fonctions $$&exp$$ et $$&exp2$$ sont &solution.'],
              answer: 'Les droites sont &answer.'
            },
          ],


          solutions: [
            [0],
            [0],
            [1],
            [1],
            [1],
            [1],
          ],

          defaultDelay: 10,
          grade: TROISIEME,
        },
        {
          description: "Reconnaître le tableau de signe d'une fonction affine",
          enounces: [
            'Quel est le tableau de signe correspondant à la fonction affine:',
          ],
          expressions: [
            "f(x)=-6x+7",
            "f(x)=-9x-1",
            "f(x)=-5x+9",
            "f(x)=3x+3",
            "f(x)=7x-8",
            "f(x)=-2x-4",
            "f(x)=6x+8",
            "f(x)=4x+9",
            "f(x)=-7x+2",
            "f(x)=2x+5",
            "f(x)=8x-1",
            "f(x)=-4x",
            "f(x)=-5x-1",
            "f(x)=-x+7",
            "f(x)=x-8",
            "f(x)=-7x+6",
            "f(x)=x",
            "f(x)=-3x+4",
            "f(x)=-5x-5",
            "f(x)=5x-7"
          ],

          type: 'choice',
          choices: [
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-0-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-0-600.png' },

            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-1-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-1-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-2-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-2-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-3-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-3-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-4-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-4-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-5-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-5-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-6-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-6-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-7-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-7-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-8-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-8-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-9-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-9-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-10-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-10-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-11-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-11-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-12-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-12-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-13-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-13-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-14-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-14-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-15-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-15-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-16-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-16-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-17-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-17-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-18-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-18-600.png' },
            ],
            [
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_correct-19-600.png' },
              { image: 'fonctions-affines/tableau-de-signe/tableau_de_signe_fonction_affine_uncorrect-19-600.png' },
            ],

          ],
          correctionFormat: [
            {
              correct: ['Le tableau de signe de la fonction $$&exp$$ est :', 'image'],
              uncorrect: ['Le tableau de signe de la fonction $$&exp$$ est :', 'image'],
              answer: 'image'
            },
          ],

          solutions: [[0]],

          defaultDelay: 20,
          grade: TROISIEME,
        },

      ],
      Equations: [
        {
          description: "Racine d'une fonction affine",
          enounces: [
            "Pour quelle valeur de $$x$$ la fonction $$f$$ s'annulle-t-elle?",
          ],
          expressions: [
            'f(x)=&1x#s{&2}',
            'f(x)=&2#s{&1}x',
          ],
          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$er[1;9]',

            },

          ],
          type: 'rewrite',
          correctionFormat: [
            {
              correct: ["La fonction $$&exp$$ s'annule en &solution"],
              uncorrect: ["La fonction $$&exp$$ s'annule en &solution"],
              answer: "La fonction $$&exp$$ s'annule en &answer."
            },
          ],


          solutions: [
            ['#{-(&2)/(&1)}'],
          ],

          defaultDelay: 20,
          grade: TROISIEME,
        },
        {
          description: "Résoudre l'équation $$f(x)=k$$",
          subdescription: "Graphiquement",
          enounces: ["Résoudre graphiquement l'équation $$f(x)=&1$$"],
          expressions: ['f(x)=&1'],
          variables: [
            {
              '&1': "-3"
            },
            {
              '&1': "-1"
            },
            {
              '&1': "2"
            },
            {
              '&1': "-4"
            },
            {
              '&1': "2"
            },
            {
              '&1': "-1"
            },
            {
              '&1': "4"
            },
            {
              '&1': "-3"
            },
            {
              '&1': "4"
            },
            {
              '&1': "1"
            },
            {
              '&1': "1"
            },
            {
              '&1': "3"
            },
            {
              '&1': "-4"
            },
            {
              '&1': "-1"
            },
            {
              '&1': "-2"
            },
            {
              '&1': "2"
            },
            {
              '&1': "-1"
            },
            {
              '&1': "0"
            },
            {
              '&1': "2"
            },
            {
              '&1': "0"
            },
            {
              '&1': "-3"
            },
            {
              '&1': "-2"
            },
            {
              '&1': "1"
            },
            {
              '&1': "0"
            },
            {
              '&1': "0"
            },
            {
              '&1': "0"
            },
            {
              '&1': "-2"
            },
            {
              '&1': "2"
            },
            {
              '&1': "0"
            },
            {
              '&1': "2"
            }
          ],
          images: [
            'fonctions-affines/exemples/fonction_affine-0-600.png',
            'fonctions-affines/exemples/fonction_affine-1-600.png',
            'fonctions-affines/exemples/fonction_affine-2-600.png',
            'fonctions-affines/exemples/fonction_affine-3-600.png',
            'fonctions-affines/exemples/fonction_affine-4-600.png',
            'fonctions-affines/exemples/fonction_affine-5-600.png',
            'fonctions-affines/exemples/fonction_affine-6-600.png',
            'fonctions-affines/exemples/fonction_affine-7-600.png',
            'fonctions-affines/exemples/fonction_affine-8-600.png',
            'fonctions-affines/exemples/fonction_affine-9-600.png',
            'fonctions-affines/exemples/fonction_affine-10-600.png',
            'fonctions-affines/exemples/fonction_affine-11-600.png',
            'fonctions-affines/exemples/fonction_affine-12-600.png',
            'fonctions-affines/exemples/fonction_affine-13-600.png',
            'fonctions-affines/exemples/fonction_affine-14-600.png',
            'fonctions-affines/exemples/fonction_affine-15-600.png',
            'fonctions-affines/exemples/fonction_affine-16-600.png',
            'fonctions-affines/exemples/fonction_affine-17-600.png',
            'fonctions-affines/exemples/fonction_affine-18-600.png',
            'fonctions-affines/exemples/fonction_affine-19-600.png',
            'fonctions-affines/exemples/fonction_affine-20-600.png',
            'fonctions-affines/exemples/fonction_affine-21-600.png',
            'fonctions-affines/exemples/fonction_affine-22-600.png',
            'fonctions-affines/exemples/fonction_affine-23-600.png',
            'fonctions-affines/exemples/fonction_affine-24-600.png',
            'fonctions-affines/exemples/fonction_affine-25-600.png',
            'fonctions-affines/exemples/fonction_affine-26-600.png',
            'fonctions-affines/exemples/fonction_affine-27-600.png',
            'fonctions-affines/exemples/fonction_affine-28-600.png',
            'fonctions-affines/exemples/fonction_affine-29-600.png',

          ],
          imagesCorrection: [
            'fonctions-affines/equation/correction_equation-0-600.png',
            'fonctions-affines/equation/correction_equation-1-600.png',
            'fonctions-affines/equation/correction_equation-2-600.png',
            'fonctions-affines/equation/correction_equation-3-600.png',
            'fonctions-affines/equation/correction_equation-4-600.png',
            'fonctions-affines/equation/correction_equation-5-600.png',
            'fonctions-affines/equation/correction_equation-6-600.png',
            'fonctions-affines/equation/correction_equation-7-600.png',
            'fonctions-affines/equation/correction_equation-8-600.png',
            'fonctions-affines/equation/correction_equation-9-600.png',
            'fonctions-affines/equation/correction_equation-10-600.png',
            'fonctions-affines/equation/correction_equation-11-600.png',
            'fonctions-affines/equation/correction_equation-12-600.png',
            'fonctions-affines/equation/correction_equation-13-600.png',
            'fonctions-affines/equation/correction_equation-14-600.png',
            'fonctions-affines/equation/correction_equation-15-600.png',
            'fonctions-affines/equation/correction_equation-16-600.png',
            'fonctions-affines/equation/correction_equation-17-600.png',
            'fonctions-affines/equation/correction_equation-18-600.png',
            'fonctions-affines/equation/correction_equation-19-600.png',
            'fonctions-affines/equation/correction_equation-20-600.png',
            'fonctions-affines/equation/correction_equation-21-600.png',
            'fonctions-affines/equation/correction_equation-22-600.png',
            'fonctions-affines/equation/correction_equation-23-600.png',
            'fonctions-affines/equation/correction_equation-24-600.png',
            'fonctions-affines/equation/correction_equation-25-600.png',
            'fonctions-affines/equation/correction_equation-26-600.png',
            'fonctions-affines/equation/correction_equation-27-600.png',
            'fonctions-affines/equation/correction_equation-28-600.png',
            'fonctions-affines/equation/correction_equation-29-600.png',

          ],
          solutions: [
            [
              "1"
            ],
            [
              "-1"
            ],
            [
              "-1"
            ],
            [
              "3"
            ],
            [
              "-1"
            ],
            [
              "0"
            ],
            [
              "1"
            ],
            [
              "-1"
            ],
            [
              "-1"
            ],
            [
              "0"
            ],
            [
              "-3"
            ],
            [
              "1"
            ],
            [
              "-3"
            ],
            [
              "1"
            ],
            [
              "0"
            ],
            [
              "2"
            ],
            [
              "2"
            ],
            [
              "0"
            ],
            [
              "3"
            ],
            [
              "0"
            ],
            [
              "3"
            ],
            [
              "0"
            ],
            [
              "0"
            ],
            [
              "0"
            ],
            [
              "0"
            ],
            [
              "-2"
            ],
            [
              "4"
            ],
            [
              "0"
            ],
            [
              "0"
            ],
            [
              "3"
            ],
          ],
          correctionFormat: [{
            correct: ["La solution de l'équation $$&exp$$ est &solution."],
            uncorrect: ["La solution de l'équation $$&exp$$ est &solution."],
            answer: "La solution est &answer."
          }],
          options: ['no-exp'],
          type: 'result',
          defaultDelay: 20,
          grade: SECONDE,
        },
      ]
    }
  },
  'Calcul littéral': {
    Calculs: {
      'Par substitution': [
        {
          description: 'Calculer en substituant les variables',
          subdescription: 'Expressions simples. Pas de simplification de la multiplication.',
          enounces: [
            'Calculer $$&3 \\times &1$$ avec $$&1=&2$$',
            'Calculer $$&1 \\times &3$$ avec $$&1=&2$$',
            'Calculer $$&3 + &1$$ avec $$&1=&2$$',
            'Calculer $$&1 + &3$$ avec $$&1=&2$$',

          ],
          expressions: ['&3*&1', '&1*&3', '&3+&1', '&1+&3'],
          variables: [
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
            },
          ],
          letters: [
            {
              '&1': '&2',
            },
          ],
          options: ['no-exp'],
          type: 'result',
          correctionDetails: [
            [
              { text: '$$\\begin{align} &3 \\times \\textcolor{teal}{&1} &= &3 \\times \\textcolor{teal}{&2} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3*&2}}} \\\\ \\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\textcolor{teal}{&1} \\times &3 &= \\textcolor{teal}{&2} \\times &3 \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3*&2}}} \\\\ \\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &3 + \\textcolor{teal}{&1} &= &3 + \\textcolor{teal}{&2} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3+&2}}} \\\\ \\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} \\textcolor{teal}{&1} + &3 &= \\textcolor{teal}{&2} + &3 \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3+&2}}} \\\\ \\end{align}$$' },
            ],
          ],
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Calculer en substituant les variables',
          subdescription: 'Expressions simples. Simplification de la multiplication.',
          enounces: [
            'Calculer $$&3&1$$ avec $$&1=&2$$',
            'Calculer $$&3 + &1$$ avec $$&1=&2$$',
          ],
          expressions: ['&3&1', '&3+&1'],
          variables: [
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
            },
          ],
          letters: [
            {
              '&1': '&2',
            },
          ],
          options: ['no-exp'],
          type: 'result',
          correctionDetails: [
            [
              { text: '$$\\begin{align} &3 \\textcolor{teal}{&1} &= &3 \\times \\textcolor{teal}{&2} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3*&2}}} \\\\ \\end{align}$$' },
            ],

            [
              { text: '$$\\begin{align} &3 + \\textcolor{teal}{&1} &= &3 + \\textcolor{teal}{&2} \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3+&2}}} \\\\ \\end{align}$$' },
            ],

          ],
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Calculer en substituant les variables',
          subdescription: 'Entiers naturels',
          enounces: [
            'Calculer $$&3&1+&4$$ avec $$&1=&2$$',
            'Calculer $$&4+&3&1$$ avec $$&1=&2$$',
            'Calculer $$&4&5+&3&1$$ avec $$&1=&2$$ et $$&5=&6$$',
          ],
          expressions: ['&3&1+&4', '&4+&3&1', '&4&5+&3&1'],
          variables: [
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
              '&4': '$e[2;9]',
              '&5': '$l{a;b;c}\\{&1}',
              '&6': '$e[2;9]',
            },
          ],
          letters: [
            {
              '&1': '&2',
              '&5': '&6',
            },
          ],
          options: ['no-exp'],
          type: 'result',

          correctionDetails: [
            [
              { text: '$$\\begin{align} &3 \\textcolor{teal}{&1} + &4 &= &3 \\times \\textcolor{teal}{&2} + &4 \\\\ &= #{&3*&2} + &4  \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3*&2+&4}}} \\\\ \\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &4 + &3 \\textcolor{teal}{&1} &= &4 + &3 \\times \\textcolor{teal}{&2} \\\\ &= &4 + #{&3*&2}  \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3*&2+&4}}} \\\\ \\end{align}$$' },
            ],
            [
              { text: '$$\\begin{align} &4 \\textcolor{orange}{&5} + &3 \\textcolor{teal}{&1} &= &4 \\times \\textcolor{orange}{&6} + &3 \\times \\textcolor{teal}{&2} \\\\ &= #{&4*&6} + #{&3*&2}  \\\\ &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&4*&6+&3*&2}}} \\\\ \\end{align}$$' },
            ],

          ],
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Calculer en substituant les variables',
          subdescription: 'Entiers relatifs',
          enounces: [
            'Calculer $$&3&1#s{&4}$$ avec $$&1=&2$$',
            'Calculer $$&3&1#s{&4}$$ avec $$&1=&2$$',
            'Calculer $$&4#s{&3}&1$$ avec $$&1=&2$$',
            'Calculer $$&4#s{&3}&1$$ avec $$&1=&2$$',
            'Calculer $$&4&5#s{&3}&1$$ avec $$&1=&2$$ et $$&5=&6$$',
          ],
          expressions: [
            '&3&1#s{&4}',
            '&3&1#s{&4}',
            '&4#s{&3}&1',
            '&4#s{&3}&1',
            '&4&5#s{&3}&1'
          ],
          variables: [
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[2;5]',
              '&3': '$er[2;5]',
              '&4': '$er[2;9]',
              '&5': '$l{a;b;c}\\{&1}',
              '&6': '$er[2;9]',

            },
            {
              '&1': '$l{a;b;c}',
              '&2': '-$e[2;5]',
              '&3': '$er[2;5]',
              '&4': '$er[2;9]',
              '&5': '$l{a;b;c}\\{&1}',
              '&6': '$er[2;9]',

            },
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[2;5]',
              '&3': '$er[2;5]',
              '&4': '$er[2;9]',
              '&5': '$l{a;b;c}\\{&1}',
              '&6': '$er[2;9]',

            },
            {
              '&1': '$l{a;b;c}',
              '&2': '-$e[2;5]',
              '&3': '$er[2;5]',
              '&4': '$er[2;9]',
              '&5': '$l{a;b;c}\\{&1}',
              '&6': '$er[2;9]',

            },
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[2;5]',
              '&3': '$er[2;5]',
              '&4': '$er[2;9]',
              '&5': '$l{a;b;c}\\{&1}',
              '&6': '$e[2;9]',

            },

          ],
          letters: [
            {
              '&1': '&2',
              '&5': '&6',
            },
          ],
          options: ['no-exp'],
          type: 'result',
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              &3 \\textcolor{teal}{&1} %s{&4} \
              &= &3 \\times \\textcolor{teal}{&2} %s{&4} \\\\ \
              &= #{&3*(&2)} %s{&4}  \\\\ \
              &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3*&2+(&4)}}} \\\\ \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &3 \\textcolor{teal}{&1} %s{&4} \
              &= &3 \\times  \\textcolor{teal}{\\left( &2 \\right) } %s{&4} \\\\ \
              &= #{&3*(&2)} %s{&4}  \\\\ \
              &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3*(&2)+(&4)}}} \\\\ \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &4 %s{&3} \\textcolor{teal}{&1} \
              &= &4 %s{&3} \\times \\textcolor{teal}{&2} \\\\\ \
              &= &4  %s{&3*&2}  \\\\ \
              &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3*&2+(&4)}}} \\\\ \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &4 %s{&3} \\textcolor{teal}{&1} \
              &= &4 %s{&3} \\times  \\textcolor{teal}{\\left( &2 \\right)}  \\\\\ \
              &= &4 %s{&3*(&2)}  \\\\ \
              &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&3*(&2)+(&4)}}} \\\\ \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &4 \\textcolor{orange}{&5}  %s{&3} \\textcolor{teal}{&1} \
              &= &4 \\times \\textcolor{orange}{&6} %s{&3} \\times \\textcolor{teal}{&2} \\\\ \
              &= #{&4*&6} %s{&3*&2}  \\\\ \
              &=  \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{#{&4*&6+(&3)*&2}}} \\\\ \
              \\end{align}$$' },
            ],

          ],
          defaultDelay: 30,
          grade: CINQUIEME,
        },
      ],
    },
    Transformation: {
      "Simplification d'écriture": [
        {
          description: 'Simplifier le symbole de multiplication',
          subdescription: 'Devant une lettre',

          enounces: ["Réécris l'expression en la simplifiant."],
          expressions: [
            '&2*&1',
            '&1*&2'
          ],
          variables: [
            {
              '&1': '$l{a;b;c;x;y}',
              '&2': '$e[2;9]',
            },
          ],
          options: ['require-implicit-products', 'disallow-factors-permutation'],
          solutions: [
            ['&2&1'],
          ],
          type: 'result',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Simplifier le symbole de multiplication',
          subdescription: 'Devant une parenthèse',

          enounces: ["Simplifie l'écriture de cette expression."],
          expressions: [
            '&3*(&1+&2)',
            '&3*(&1+&4)',
            '&5*(&1+&2)',
            '&5*(&1+&4)',
            '(&1+&2)*&5',
            '(&1+&4)*&5',
          ],
          variables: [
            {
              '&1': '$l{a;b;c;x;y}',
              '&2': '$l{a;b;c;x;y}\\{&1}',
              '&3': '$l{a;b;c;x;y}',
              '&4': '$e[2;9]',
              '&5': '$e[2;9]',
            },
          ],
          options: ['require-implicit-products', 'disallow-factors-permutation'],
          solutions: [
            ['&3(&1+&2)'],
            ['&3(&1+&4)'],
            ['&5(&1+&2)'],
            ['&5(&1+&4)'],
            ['&5(&1+&2)'],
            ['&5(&1+&4)']

          ],
          type: 'result',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Simplifier un produit par 0 ou 1',
          enounces: ["Ecris plus simplement cette expression littérale :"],
          expressions: [
            '1&1',
            '0&1'
          ],
          variables: [
            {
              '&1': '$l{a;b;c;x;y}',
            },
          ],
          options: ['require-no-factor-one', 'require-no-factor-zero'],
          solutions: [
            ['&1'],
            ['0']
          ],
          type: 'result',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: "Simplifier à l'aide d'un carré ou d'un cube",
          enounces: ["Simlifie l'écriture de cette expression littérale :"],
          expressions: [
            '&1*&1',
            '&1*&1*&1'
          ],
          variables: [
            {
              '&1': '$l{a;b;c;x;y}',
            },
          ],
          solutions: [['&1^2'], ['&1^3']],
          type: 'rewrite',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
      ],
      Réduction: [
        {
          description: 'Réduire une somme',
          subdescription: 'Coefficients positifs, 2 même littéraux',
          enounces: ['Réduire :'],
          expressions: [
            '#{&2&1}+#{&3&1}',
            '#{&3&1}-#{&2&1}'
          ],
          variables: [
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
            },
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[1;8]',
              '&3': '$e[&2;9]',
            },
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              %{&2&1}+%{&3&1} \
              &= (&2+&3) \\times &1 \\\\ \
              &= %{&2+&3} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&2+&3)&1}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              %{&3&1}-%{&2&1} \
              &= (&3-&2) \\times &1 \\\\ \
              &= %{&3-&2} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&3-&2)&1}}} \
              \\end{align}$$' },
            ],

          ],
          type: 'result',
          options: ['penalty-for-factors-permutation'],
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Réduire une somme',
          subdescription: 'Coefficients positifs, deux même littéraux + un entier',
          enounces: ['Réduire :'],
          expressions: [
            '&4+#{&2&1}+#{&3&1}',
            '#{&2&1}+&4+#{&3&1}',
            '#{&2&1}+#{&3&1}+&4',
            '&4+#{&3&1}-#{&2&1}',
            '#{&3&1}+&4-#{&2&1}',
            '#{&3&1}-#{&2&1}+&4',
          ],
          variables: [
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
              '&4': '$e[1;9]',
            },
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
              '&4': '$e[1;9]',
            },
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
              '&4': '$e[1;9]',
            },
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[1;8]',
              '&3': '$e[&2;9]',
              '&4': '$e[1;9]',
            },
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[1;8]',
              '&3': '$e[&2;9]',
              '&4': '$e[1;9]',
            },
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[1;8]',
              '&3': '$e[&2;9]',
              '&4': '$e[1;9]',
            },
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              &4+%{&2&1}+%{&3&1} \
              &= &4 + (&2+&3) \\times &1 \\\\ \
              &= &4 + %{&2+&3} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&4 + %{(&2+&3)&1}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              %{&2&1}+&4+%{&3&1} \
              &= &4 + (&2+&3) \\times &1 \\\\ \
              &= &4 + %{&2+&3} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&4 + %{(&2+&3)&1}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              %{&2&1}+%{&3&1} + &4\
              &= (&2+&3) \\times &1 + &4\\\\ \
              &= %{&2+&3} \\times &1  + &4 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&2+&3)&1}  + &4}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &4+%{&3&1}-%{&2&1} \
              &= &4 + (&3-&2) \\times &1 \\\\ \
              &= &4 + %{&3-&2} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&4 + (&3-&2)&1}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              %{&3&1} + &4 -%{&2&1} \
              &= &4 + (&3-&2) \\times &1 \\\\ \
              &= &4 + %{&3-&2} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&4 + (&3-&2)&1}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              %{&3&1}-%{&2&1} + &4\
              &= (&3-&2) \\times &1  + &4 \\\\ \
              &= %{&3-&2} \\times &1  + &4 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&4 + (&3-&2)&1}}} \
              \\end{align}$$' },
            ],


          ],
          type: 'result',
          options: ['penalty-for-factors-permutation'],
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Réduire une expression',
          subdescription: 'Coefficients positifs',
          enounces: ['Réduire :'],
          expressions: [
            '&2&1+&3&1+&5&4+&6&4',
            '&2&1+&5&4+&3&1+&6&4',
            '&2&1+&5&4+&6&4+&3&1',
          ],
          variables: [
            {
              '&1': '$l{a;b;c}',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
              '&4': '$l{a;b;c}\\{&1}',
              '&5': '$e[2;9]',
              '&6': '$e[2;9]',
            },
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              &2\\textcolor{teal}{&1}+&3\\textcolor{teal}{&1}+&5\\textcolor{orange}{&4}+&6\\textcolor{orange}{&4} \
              &= (&2+&3) \\times \\textcolor{teal}{&1} + (&5+&6) \\times \\textcolor{orange}{&4} \\\\ \
              &= %{&2+&3} \\times \\textcolor{teal}{&1} + %{&5+&6} \\times \\textcolor{orange}{&4} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2+&3}&1 + %{&5+&6}&4}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &2\\textcolor{teal}{&1} + &5\\textcolor{orange}{&4} + &3\\textcolor{teal}{&1}+&6\\textcolor{orange}{&4} \
              &= (&2+&3) \\times \\textcolor{teal}{&1} + (&5+&6) \\times \\textcolor{orange}{&4} \\\\ \
              &= %{&2+&3} \\times \\textcolor{teal}{&1} + %{&5+&6} \\times \\textcolor{orange}{&4} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2+&3}&1 + %{&5+&6}&4}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &2\\textcolor{teal}{&1} + &5\\textcolor{orange}{&4} + &6\\textcolor{orange}{&4} + &3\\textcolor{teal}{&1} \
              &= (&2+&3) \\times \\textcolor{teal}{&1} + (&5+&6) \\times \\textcolor{orange}{&4} \\\\ \
              &= %{&2+&3} \\times \\textcolor{teal}{&1} + %{&5+&6} \\times \\textcolor{orange}{&4} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2+&3}&1 + %{&5+&6}&4}} \
              \\end{align}$$' },
            ],

          ],
          options: ['penalty-for-factors-permutation'],
          type: 'result',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Réduire un produit',
          subdescription: 'Coefficients positifs',
          enounces: ['Réduire :'],
          expressions: [
            '&1*&2*&3',
            '&2*&1*&3',
            '&3*&2*&1',
            '&1*&2*&1',
            '&1*&1*&2',
            '&2*&1*&1',
          ],
          variables: [
            {
              '&1': '$l{a;b;c;x;y;z}',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
            },
          ],
          type: 'result',
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              &1 \\times &2 \\times &3 \
              &= &1 \\times %{&2*&3} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&3*&1}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &2 \\times &1 \\times &3 \
              &= &2 \\times &3 \\times &1 \\\\ \
              &= %{&3*&2} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&3*&1}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &3 \\times &2 \\times &1 \
              &= %{&3*&2} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&3*&1}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &1 \\times &2 \\times &1 \
              &= &2 \\times &1 \\times &1 \\\\ \
              &= &2 \\times &1^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2*&1}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &1 \\times &1 \\times &2 \
              &= &1^2 \\times &2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2*&1}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &2 \\times &1 \\times &1 \
              &= &2 \\times &1^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2*&1}}} \
              \\end{align}$$' },
            ],



          ],
          options: ['penalty-for-factors-permutation'],
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Réduire une somme',
          subdescription: 'Coefficients relatifs',
          enounces: ['Réduire :'],
          expressions: ['#{&2&1}#s{&3&1}'],
          variables: [
            {
              '&1': '$l{a;b;c}',
              '&2': '$er[1;9]',
              '&3': '$ers[1;9]',
            },
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              %{&2&1}%s{&3&1} \
              &= (&2%s{&3}) \\times &1 \\\\ \
              &= %{&2+(&3)} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&2+(&3))&1}}} \
              \\end{align}$$' },
            ],


          ],
          type: 'result',
          defaultDelay: 30,
          options: ['penalty-for-factors-permutation'],
          grade: TROISIEME,
        },

        {
          description: 'Réduire une somme',
          subdescription: 'Coefficients relatifs',
          enounces: ['Réduire :'],
          expressions: [
            '#{&2&1}#s{&3&1}#s{&5&4}#s{&6&4}',
            '#{&2&1}#s{&3&4}#s{&5&1}#s{&6&4}',
            '#{&2&1}#s{&3&4}#s{&5&4}#s{&6&1}',
          ],
          variables: [
            {
              '&1': '$l{a;b;c}',
              '&2': '$er[1;9]',
              // '&3': '$l{+$e[2;9];-$e[2;9]}',
              '&3': '$er[1;9]',
              '&4': '$l{a;b;c}\\{&1}',
              '&5': '$er[1;9]',
              // '&5': '$l{+$e[2;9];-$e[2;9]}',
              // '&6': '+$e[2;9]',
              '&6': '$er[1;9]',
            },
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              %{&2&1}%s{&3&1}%s{&5&4}%s{&6&4} \
              &= (&2%s{&3}) \\times &1 + (&5%s{&6}) \\times &4 \\\\ \
              &= %{&2+(&3)} \\times &1 %s{&5+(&6)} \\times &4 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&2+(&3))&1+ (&5+(&6))&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              %{&2&1}%s{&3&4}%s{&5&1}%s{&6&4} \
              &= (&2%s{&5}) \\times &1 + (&3%s{&6}) \\times &4 \\\\ \
              &= %{&2+(&5)} \\times &1 %s{&3+(&6)} \\times &4 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&2+(&5))&1 + (&3+(&6))&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              %{&2&1}%s{&3&4}%s{&5&4}%s{&6&1} \
              &= (&2%s{&6}) \\times &1 + (&3%s{&5}) \\times &4 \\\\ \
              &= %{&2+(&6)} \\times &1 %s{&3+(&5)} \\times &4 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&2+(&6))&1 +(&3+(&5))&4}}} \
              \\end{align}$$' },
            ],


          ],
          type: 'result',
          options: ['penalty-for-factors-permutation'],
          defaultDelay: 30,
          grade: TROISIEME,
        },
        {
          description: 'Réduire un produit',
          subdescription: 'Coefficients relatifs',
          enounces: ['Réduire :'],
          expressions: [
            '&1*(-&2)*&3',
            '(-&2)*&1*&3',
            '&3*(-&2)*&1',
            '&1*&2*(-&3)',
            '&2*&1*(-&3)',
            '(-&3)*&2*&1',
            '&1*(-&2)*(-&3)',
            '(-&2)*&1*(-&3)',
            '(-&3)*(-&2)*&1',
            '(-&1)*(-&2)*&3',
            '(-&2)*(-&1)*&3',
            '&3*(-&2)*(-&1)',
            '(-&1)*&2*(-&3)',
            '&2*(-&1)*(-&3)',
            '(-&3)*&2*(-&1)',
            '(-&1)*(-&2)*(-&3)',
            '(-&2)*(-&1)*(-&3)',
            '(-&3)*(-&2)*(-&1)',
          ],
          variables: [
            {
              '&1': '$l{a;b;c;x;y;z}',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]',
            },
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              &1 \\times \\bold{\\textcolor{teal}{(-&2) \\times &3}} \
              &= &1 \\times \\bold{\\textcolor{teal}{(-%{&2*&3})}} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (-&2) \\times &1 \\times &3 \
              &= \\bold{\\textcolor{teal}{(-&2) \\times &3}} \\times &1 \\\\ \
              &=  \\bold{\\textcolor{teal}{(-%{&2*&3})}} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\bold{\\textcolor{teal}{&3 \\times (-&2)}} \\times &1 \
              &=  \\bold{\\textcolor{teal}{(-%{&2*&3})}} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &1 \\times \\bold{\\textcolor{teal}{&2 \\times (-&3)}} \
              &= &1 \\times \\bold{\\textcolor{teal}{(-%{&2*&3})}} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &2 \\times &1 \\times (-&3) \
              &= \\bold{\\textcolor{teal}{&2 \\times (-&3)}} \\times &1 \\\\ \
              &=  \\bold{\\textcolor{teal}{(-%{&2*&3})}} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\bold{\\textcolor{teal}{(-&3) \\times &2}} \\times &1 \
              &=  \\bold{\\textcolor{teal}{(-%{&2*&3})}} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &1 \\times \\bold{\\textcolor{teal}{(-&2) \\times (-&3)}} \
              &= &1 \\times \\bold{\\textcolor{teal}{%{&2*&3}}} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (-&2) \\times &1 \\times (-&3) \
              &=  \\bold{\\textcolor{teal}{(-&2) \\times (-&3)}} \\times &1 \\\\ \
              &=  \\bold{\\textcolor{teal}{%{&2*&3}}} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\bold{\\textcolor{teal}{(-&3) \\times (-&2)}} \\times &1 \
              &=  \\bold{\\textcolor{teal}{%{&2*&3}}} \\times &1 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (-&1) \\times \\bold{\\textcolor{teal}{(-&2) \\times &3}} \
              &=  (-&1) \\times \\bold{\\textcolor{teal}{(%{-&2*&3})}} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (-&2) \\times (-&1) \\times &3 \
              &=  \\bold{\\textcolor{teal}{(-&2) \\times &3}} \\times (-&1) \\\\ \
              &=  \\bold{\\textcolor{teal}{(%{-&2*&3})}} \\times (-&1) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\bold{\\textcolor{teal}{&3 \\times (-&2)}} \\times (-&1) \
              &=  \\bold{\\textcolor{teal}{(%{-&2*&3})}} \\times (-&1) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (-&1) \\times \\bold{\\textcolor{teal}{&2 \\times (-&3)}} \
              &=  (-&1) \\times \\bold{\\textcolor{teal}{(%{-&2*&3})}} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &2 \\times (-&1) \\times (-&3) \
              &=  \\bold{\\textcolor{teal}{&2 \\times (-&3)}} \\times (-&1) \\\\ \
              &=  \\bold{\\textcolor{teal}{(%{-&2*&3})}} \\times (-&1) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\bold{\\textcolor{teal}{(-&3) \\times &2}} \\times (-&1) \
              &=  \\bold{\\textcolor{teal}{(%{-&2*&3})}} \\times (-&1) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (-&1) \\times \\bold{\\textcolor{teal}{(-&2) \\times (-&3)}} \
              &=  (-&1) \\times  \\bold{\\textcolor{teal}{%{&2*&3}}} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (-&2) \\times (-&1) \\times (-&3) \
              &=  \\bold{\\textcolor{teal}{(-&2) \\times (-&3)}} \\times (-&1) \\\\ \
              &=  \\bold{\\textcolor{teal}{%{&2*&3}}} \\times (-&1) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*&2*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\bold{\\textcolor{teal}{(-&3) \\times (-&2)}} \\times (-&1) \
              &=  \\bold{\\textcolor{teal}{%{&2*&3}}} \\times (-&1) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*&2*&3}}} \
              \\end{align}$$' },
            ],



          ],
          type: 'result',
          options: ['penalty-for-factors-permutation'],
          // details: [['(&2+&3) \\times &1']],
          defaultDelay: 30,
          grade: TROISIEME,
        },
        {
          description: 'Réduire une expression',
          subdescription: 'Coefficients relatifs, expression du second degré',
          enounces: ['Réduire :'],
          expressions: [
            '#{&2&1^2}#s{&3&1}#s{&4}#s{&5&1^2}#s{&6&1}#s{&7}',
            '#{&2&1}#s{&3&1^2}#s{&4}#s{&5&1^2}#s{&6&1}#s{&7}',
            '#{&2&1}#s{&3}#s{&4^2}#s{&5&1^2}#s{&6&1}#s{&7}',
          ],
          variables: [
            {
              '&1': '$l{a;b;c}',
              '&2': '$er[1;9]',
              '&3': '$er[1;9]',
              '&4': '$er[1;9]',
              '&5': '$er[1;9]',
              '&6': '$er[1;9]',
              '&7': '$er[1;9]',
            },
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              %{&2&1^2}%s{&3&1}%s{&4}%s{&5&1^2}%s{&6&1}%s{&7} \
              &= (&2%s{&5}) \\times &1^2 + (&3%s{&6}) \\times &1 %s{&4} %s{&7} \\\\ \
              &= %{&2+(&5)} \\times &1^2  %s{&3+(&6)} \\times &1 %s{&4+(&7)} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&2+(&5))*&1^2 + (&3+(&6))*&1 +(&4) +(&7)}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              %{&2&1}%s{&3&1^2}%s{&4}%s{&5&1^2}%s{&6&1}%s{&7} \
              &= (&3%s{&5}) \\times &1^2 + (&2%s{&6}) \\times &1 %s{&4} %s{&7} \\\\ \
              &= %{&3+(&5)} \\times &1^2  %s{&2+(&6)} \\times &1 %s{&4+(&7)} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&3+(&5))*&1^2 + (&2+(&6))*&1 +(&4) +(&7)}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              #{&2&1}#s{&3}#s{&4^2}#s{&5&1^2}#s{&6&1}#s{&7} \
              &= (&4%s{&5}) \\times &1^2 + (&2%s{&6}) \\times &1 %s{&3} %s{&7} \\\\ \
              &= %{&4+(&5)} \\times &1^2  %s{&2+(&6)} \\times &1 %s{&3+(&7)} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&4+(&5))*&1^2 + (&2+(&6))*&1 +(&3) +(&7)}}} \
              \\end{align}$$' },
            ],


          ],
          options: ['penalty-for-factors-permutation'],
          type: 'result',
          defaultDelay: 30,
          grade: SECONDE,
        },


      ],
      "Opposé d'une expression": [
        {
          description: "Déterminer l'opposé d'une expression",
          subdescription: "Expression simple",
          enounces: ["Quel est l'opposé de cette expression ?"],
          expressions: ['#{&1&2}'],
          variables: [
            {
              '&1': '$er[1;9]',
              '&2': '$l{a;b;x;y}',
            },
          ],
          // solutions: [['#{&2+&3}&1']],
          type: 'rewrite',
          solutions: [['#{-(&1)&2}']],
          options: ['penalty-for-factors-permutation'],
          correctionFormat: [{
            correct: ["L'opposé de $$&exp$$ est &solution"],
            uncorrect: ["L'opposé de $$&exp$$ est &solution"],
            answer: "L'opposé de $$&exp$$ est &answer"
          }],
          defaultDelay: 30,
          grade: TROISIEME,
        },
        {
          description: "Déterminer l'opposé d'une expression",
          subdescription: "opposé d'une somme algébrique",
          enounces: ["Quel est l'opposé de cette expression ?"],
          expressions: ['#{&1&3}#s{&2}'],
          variables: [
            {
              '&1': '$er[1;9]',
              '&2': '$er[1;9]',
              '&3': '$l{a;b;x;y}',
            },
          ],
          // solutions: [['#{&2+&3}&1']],
          type: 'rewrite',
          solutions: [['#{-(&1)&3}#s{-(&2)}']],
          options: ['penalty-for-factors-permutation'],
          correctionFormat: [{
            correct: ["L'opposé de $$&exp$$ est &solution"],
            uncorrect: ["L'opposé de $$&exp$$ est &solution"],
            answer: "L'opposé de $$&exp$$ est &answer"
          }],
          defaultDelay: 30,
          grade: TROISIEME,
        },
        {
          description: 'Enlever les parenthèses',
          enounces: ["Réécris l'expression en enlevant les parenthèses."],
          expressions: ['#{&1&2}+(#{&3&4}&5)', '#{&1&2}-(#{&3&4}&5)'],
          variables: [
            {
              '&1': '$er[1;9]',
              '&2': '$l{a;b;c}',
              '&3': '$er[1;9]',
              '&4': '$l{a;b;c}\\{&2}',
              '&5': '$ers[1;9]',
            },
          ],
          // solutions: [['#{&2+&3}&1']],
          type: 'result',
          solutions: [['#{&1&2}#s{&3&4}&5'], ['#{&1&2}#s{-(&3&4)}#s{-(&5)}']],
          options: ['penalty-for-factors-permutation'],
          defaultDelay: 30,
          grade: TROISIEME,
        },
        // {
        //   description: 'Réduire avec parenthèses',
        //   enounces: ['Réduire:'],
        //   expressions: [
        //     '#{&1&2}+(#{&3&2}#s{&4})',
        //     '#{&1&2}+(#{&4}#s{&3&2})',
        //     '#{&1&2}-(#{&3&2}#s{&4})',
        //     '#{&1&2}-(#{&4}#s{&3&2})',
        //   ],
        //   variables: [
        //     {
        //       '&1': '$er[1;9]',
        //       '&2': '$l{a;b;c;x;y;z}',
        //       '&3': '$ers[1;9]',
        //       '&4': '$ers[1;9]',
        //     },
        //   ],
        //   // solutions: [['#{&2+&3}&1']],
        //   type: 'result',
        //   //   solutions:[
        //   //     ['#{&1&2}#s{&3&4}&5'],
        //   //     ['#{&1&2}#s{-&3&4}#s{-&5}'],
        //   // ],
        //   defaultDelay: 30,
        //   grade: TROISIEME,
        // },
      ],
      Développement: [
        {
          description: 'Développer',
          subdescription: 'Simple - Coefficients positifs',
          enounces: ['Développer et réduire :'],
          expressions: [
            '&1(&2+&3)',
            '&1(&3+&2)',
            '(&2+&3)*&1',
            '(&3+&2)*&1',
            '&1(&2-&3)',
            '&1(&3-&2)',
            '(&2-&3)*&1',
            '(&3-&2)*&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$l{a;b;c;x;y;z}',
            },
          ],
          solutions: [
            ['#{&1*&2}+&1&3'],
            ['&1&3+#{&1*&2}'],
            ['#{&2*&1}+&1&3'],
            ['&1&3+#{&1*&2}'],
            ['#{&2*&1}-&1&3'],
            ['&1&3-#{&2*&1}'],
            ['#{&2*&1}-&1&3'],
            ['&1&3-#{&2*&1}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1}(&2+&3) \
              &= \\textcolor{teal}{&1} \\times &2 + \\textcolor{teal}{&1} \\times &3 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2}+&1&3}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1}(&3+&2) \
              &= \\textcolor{teal}{&1} \\times &3 + \\textcolor{teal}{&1} \\times &2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1&3+%{&1*&2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (&2+&3) \\times \\textcolor{teal}{&1} \
              &= &2 \\times \\textcolor{teal}{&1} + &3 \\times \\textcolor{teal}{&1} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2}+&1&3}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (&3+&2) \\times \\textcolor{teal}{&1} \
              &= &3 \\times \\textcolor{teal}{&1} + &2 \\times \\textcolor{teal}{&1} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1&3+%{&1*&2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1}(&2-&3) \
              &= \\textcolor{teal}{&1} \\times &2 - \\textcolor{teal}{&1} \\times &3 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2}-&1&3}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1}(&3-&2) \
              &= \\textcolor{teal}{&1} \\times &3 - \\textcolor{teal}{&1} \\times &2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1&3-%{&1*&2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (&2-&3) \\times \\textcolor{teal}{&1} \
              &= &2 \\times \\textcolor{teal}{&1} - &3 \\times \\textcolor{teal}{&1} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2}-&1&3}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (&3-&2) \\times \\textcolor{teal}{&1} \
              &= &3 \\times \\textcolor{teal}{&1} - &2 \\times \\textcolor{teal}{&1} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1&3-%{&1*&2}}} \
              \\end{align}$$' },
            ],


          ],
          type: 'result',
          options: ['penalty-for-factors-permutation'],
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Développer',
          subdescription: 'Coefficients positifs',
          enounces: ['Développer et réduire :'],
          expressions: [
            '&1(&2+#{&3&4})',
            '&1(#{&3&4}+&2)',
            '(&2+#{&3&4})*&1',
            '(#{&3&4}+&2)*&1',
            '&4(&2+#{&3&4})',
            '&4(#{&3&4}+&2)',
            '(&2+#{&3&4})&4',
            '(#{&3&4}+&2)&4',
            '&1(&2-#{&3&4})',
            '&1(#{&3&4}-&2)',
            '(&2-#{&3&4})*&1',
            '(#{&3&4}-&2)*&1',
            '&4(&2-#{&3&4})',
            '&4(#{&3&4}-&2)',
            '(&2-#{&3&4})&4',
            '(#{&3&4}-&2)&4',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;9]\\{&1}',
              '&3': '$e[1;9]\\{&1;&2}',
              '&4': '$l{a;b;c;x;y;z}',
            },
          ],
          // solutions: [['#{&2+&3}&1']],
          type: 'result',
          solutions: [
            ['#{&1*&2}+#{&1*&3&4}'],
            ['#{&1*&3&4}+#{&1*&2}'],
            ['#{&1*&2}+#{&1*&3&4}'],
            ['#{&1*&3&4}+#{&1*&2}'],
            ['#{&2&4}+#{&3&4^2}'],
            ['#{&3&4^2}+#{&2&4}'],
            ['#{&2&4}+#{&3&4^2}'],
            ['#{&3&4^2}+#{&2&4}'],
            ['#{&1*&2}-#{&1*&3&4})'],
            ['#{&1*&3&4}-#{&1*&2}'],
            ['#{&1*&2}-#{&1*&3&4}'],
            ['#{&1*&3&4}-#{&1*&2}'],
            ['#{&2&4}-#{&3&4^2}'],
            ['#{&3&4^2}-#{&2&4}'],
            ['#{&2&4}-#{&3&4^2}'],
            ['#{&3*&4^2}-#{&2&4}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1}(&2+#{&3&4}) \
              &= \\textcolor{teal}{&1} \\times &2 + \\textcolor{teal}{&1} \\times %{&3&4} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2}+%{&1*&3&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1}(#{&3&4}+&2) \
              &= \\textcolor{teal}{&1} \\times %{&3&4} + \\textcolor{teal}{&1} \\times &2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&3&4} + %{&1*&2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (&2+#{&3&4}) \\times \\textcolor{teal}{&1} \
              &=   &2 \\times \\textcolor{teal}{&1} +%{&3&4} \\times \\textcolor{teal}{&1} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2}+%{&1*&3&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (#{&3&4}+&2) \\times \\textcolor{teal}{&1} \
              &=  %{&3&4} \\times \\textcolor{teal}{&1} + &2 \\times \\textcolor{teal}{&1}  \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&3&4} + %{&1*&2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&4}(&2+#{&3&4}) \
              &= \\textcolor{teal}{&4} \\times &2 + \\textcolor{teal}{&4} \\times %{&3&4} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2&4}+%{&3&4^2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&4}(#{&3&4}+&2) \
              &= \\textcolor{teal}{&4} \\times %{&3&4} + \\textcolor{teal}{&4} \\times &2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3&4^2} + %{&2&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (&2+#{&3&4}) \\times \\textcolor{teal}{&4} \
              &=   &2 \\times \\textcolor{teal}{&4} +%{&3&4} \\times \\textcolor{teal}{&4} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2&4}+%{&3&4^2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (#{&3&4}+&2) \\times \\textcolor{teal}{&4} \
              &=  %{&3&4} \\times \\textcolor{teal}{&4} + &2 \\times \\textcolor{teal}{&4}  \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3&4^2} + %{&2&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1}(&2 - #{&3&4}) \
              &= \\textcolor{teal}{&1} \\times &2 - \\textcolor{teal}{&1} \\times %{&3&4} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2} - %{&1*&3&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1}(#{&3&4}-&2) \
              &= \\textcolor{teal}{&1} \\times %{&3&4} - \\textcolor{teal}{&1} \\times &2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&3&4} - %{&1*&2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (&2-#{&3&4}) \\times \\textcolor{teal}{&1} \
              &=   &2 \\times \\textcolor{teal}{&1} - %{&3&4} \\times \\textcolor{teal}{&1} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&2} - %{&1*&3&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (#{&3&4} - &2) \\times \\textcolor{teal}{&1} \
              &=  %{&3&4} \\times \\textcolor{teal}{&1} - &2 \\times \\textcolor{teal}{&1}  \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&3&4} - %{&1*&2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&4}(&2 - #{&3&4}) \
              &= \\textcolor{teal}{&4} \\times &2 - \\textcolor{teal}{&4} \\times %{&3&4} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2&4} - %{&3&4^2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&4}(#{&3&4} - &2) \
              &= \\textcolor{teal}{&4} \\times %{&3&4} - \\textcolor{teal}{&4} \\times &2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3&4^2} - %{&2&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (&2-#{&3&4}) \\times \\textcolor{teal}{&4} \
              &=   &2 \\times \\textcolor{teal}{&4} - %{&3&4} \\times \\textcolor{teal}{&4} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2&4} - %{&3&4^2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (#{&3&4}+&2) \\times \\textcolor{teal}{&4} \
              &=  %{&3&4} \\times \\textcolor{teal}{&4} - &2 \\times \\textcolor{teal}{&4}  \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3&4^2} - %{&2&4}}} \
              \\end{align}$$' },
            ],


          ],
          options: ['penalty-for-factors-permutation'],
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Développer',
          subdescription: 'Coefficients relatifs',
          enounces: ['Développer et réduire :'],
          expressions: [
            '&1(&2#s{&3&4})',
            '&1(#{&3&4}#s{&2})',
            '-&1(&2#s{&3&4})',
            '-&1(#{&3&4}#s{&2})',
            '(&2#s{&3&4})*&1',
            '(#{&3&4}#s{&2})*&1',
            '(&2#s{&3&4})*(-&1)',
            '(#{&3&4}#s{&2})*(-&1)',
            '&4(&2#s{&3&4})',
            '&4(#{&3&4}#s{&2})',
            '(&2#s{&3&4})&4',
            '(#{&3&4}#s{&2})&4',
            '-&4(&2#s{&3&4})',
            '-&4(#{&3&4}#s{&2})',
            '(&2#s{&3&4})*(-&4)',
            '(#{&3&4}#s{&2})*(-&4)',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$er[1;9]\\{&1;-(&1)}',
              '&3': '$er[1;9]\\{&1;-(&1);&2;-(&2)}',
              '&4': '$l{a;b;c;x;y;z}',
            },
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1}(&2%s{&3&4}) \
              &=   &2 \\times \\textcolor{teal}{&1} %s{&3&4} \\times \\textcolor{teal}{&1} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*(&2)} %s{&1*(&3)*&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1}(#{&3&4}#s{&2}) \
              &=    %{&3&4} \\times \\textcolor{teal}{&1}  %s{&2} \\times \\textcolor{teal}{&1}\\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*(&3)*&4} %s{&1*(&2)} }} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{-&1}(&2%s{&3&4}) \
              &=   &2 \\times \\textcolor{teal}{(-&1)} %s{&3&4} \\times \\textcolor{teal}{(-&1)} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*(&2)} %s{-&1*(&3)*&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{-&1}(#{&3&4}#s{&2}) \
              &=    %{&3&4} \\times \\textcolor{teal}{(-&1)}  %s{&2} \\times \\textcolor{teal}{(-&1)}\\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*(&3)*&4} %s{-&1*(&2)} }} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (&2%s{&3&4}) \\times \\textcolor{teal}{&1} \
              &=   &2 \\times \\textcolor{teal}{&1} %s{&3&4} \\times \\textcolor{teal}{&1} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*(&2)} %s{&1*(&3)*&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (#{&3&4}#s{&2}) \\times \\textcolor{teal}{&1} \
              &=    %{&3&4} \\times \\textcolor{teal}{&1}  %s{&2} \\times \\textcolor{teal}{&1}\\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*(&3)*&4} %s{&1*(&2)} }} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (&2%s{&3&4}) \\times \\textcolor{teal}{(-&1)} \
              &=   &2 \\times \\textcolor{teal}{(-&1)} %s{&3&4} \\times \\textcolor{teal}{(-&1)} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*(&2)} %s{-&1*(&3)*&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (#{&3&4}#s{&2}) \\times \\textcolor{teal}{(-&1)} \
              &=    %{&3&4} \\times \\textcolor{teal}{(-&1)}  %s{&2} \\times \\textcolor{teal}{(-&1)}\\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&1*(&3)*&4} %s{-&1*(&2)} }} \
              \\end{align}$$' },
            ],


            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&4}(&2%s{&3&4}) \
              &=   &2 \\times \\textcolor{teal}{&4} %s{&3&4} \\times \\textcolor{teal}{&4} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&4*(&2)} %s{&4*(&3)*&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&4}(#{&3&4}#s{&2}) \
              &=    %{&3&4} \\times \\textcolor{teal}{&4}  %s{&2} \\times \\textcolor{teal}{&4}\\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&4*(&3)*&4} %s{&4*(&2)} }} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (&2%s{&3&4}) \\times \\textcolor{teal}{&4} \
              &=   &2 \\times \\textcolor{teal}{&4} %s{&3&4} \\times \\textcolor{teal}{&4} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&4*(&2)} %s{&4*(&3)*&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (#{&3&4}#s{&2}) \\times \\textcolor{teal}{&4} \
              &=    %{&3&4} \\times \\textcolor{teal}{&4}  %s{&2} \\times \\textcolor{teal}{&4}\\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&4*(&3)*&4} %s{&4*(&2)} }} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{-&4}(&2%s{&3&4}) \
              &=   &2 \\times \\textcolor{teal}{(-&4)} %s{&3&4} \\times \\textcolor{teal}{(-&4)} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&4*(&2)} %s{-&4*(&3)*&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{-&4}(#{&3&4}#s{&2}) \
              &=    %{&3&4} \\times \\textcolor{teal}{(-&4)}  %s{&2} \\times \\textcolor{teal}{(-&4)}\\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&4*(&3)*&4} %s{-&4*(&2)} }} \
              \\end{align}$$' },
            ],

            [
              {
                text: '$$\\begin{align} \
              (&2%s{&3&4}) \\times \\textcolor{teal}{(-&4)} \
              &=   &2 \\times \\textcolor{teal}{(-&4)} %s{&3&4} \\times \\textcolor{teal}{(-&4)} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&4*(&2)} %s{-&4*(&3)*&4}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (#{&3&4}#s{&2}) \\times \\textcolor{teal}{(-&4)} \
              &=    %{&3&4} \\times \\textcolor{teal}{(-&4)}  %s{&2} \\times \\textcolor{teal}{(-&4)}\\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&4*(&3)*&4} %s{-&4*(&2)} }} \
              \\end{align}$$' },
            ],
          ],
          type: 'result',
          solutions: [
            ['#{&2*&1}#s{&3&4*&1}'],
            ['#{&3&4*&1}#s{&2*&1}'],
            ['#{&2*(-&1)}#s{&3&4*(-&1)}'],
            ['#{&3&4*(-&1)}#s{&2*(-&1)}'],
            ['#{&2*&1}#s{&3&4*&1}'],
            ['#{&3&4*&1}#s{&2*&1}'],
            ['#{&2*(-&1)}#s{&3&4*(-&1)}'],
            ['#{&3&4*(-&1)}#s{&2*(-&1)}'],
            ['#{&2&4}#s{&3&4^2}'],
            ['#{&3&4^2}#s{&2&4}'],
            ['#{&2&4}#s{&3&4^2}'],
            ['#{&3&4^2}#s{&2&4}'],
            ['#{&2*(-&4)}#s{-(&3)&4^2}'],
            ['#{-(&3)&4^2}#s{&2*(-&4)}'],
            ['#{&2*(-&4)}#s{-(&3)&4^2}'],
            ['#{-(&3)&4^2}#s{&2*(-&4)}'],

          ],

          defaultDelay: 30,
          options: ['penalty-for-factors-permutation'],
          grade: TROISIEME,
        },
        {
          description: 'Développer un double produit',
          subdescription: 'Coefficients positifs',
          enounces: ['Développer et réduire :'],
          expressions: [
            '(&1+#{&2&3})(&4+#{&5&3})',
            '(#{&2&3}+&1)(&4+#{&5&3})',
            '(&1+#{&2&3})(#{&5&3}+&4)',
            '(#{&2&3}+&1)(#{&5&3}+&4)',
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]\\{&1}',
              '&3': '$l{a;b;c;x;y;z}',
              '&4': '$e[1;9]\\{&1;&2}',
              '&5': '$e[1;9]\\{&1;&2;&3}',
            },
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              (\\textcolor{teal}{&1}+\\textcolor{orange}{%{&2&3}})(&4+%{&5&3}) \
              &= \\textcolor{teal}{&1} \\times &4 + \\textcolor{teal}{&1} \\times %{&5&3} + \\textcolor{orange}{%{&2&3}} \\times &4 + \\textcolor{orange}{%{&2&3}} \\times %{&5&3} \\\\ \
              &= %{&1*&4} +   %{&5*&1&3} + %{&2*&4&3} + %{&2&3*&5&3} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&4} +   %{(&5*&1+&2*&4)&3} + %{&2&3*&5&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (\\textcolor{orange}{%{&2&3}} + \\textcolor{teal}{&1})(&4+%{&5&3}) \
              &= \\textcolor{orange}{%{&2&3}} \\times &4 + \\textcolor{orange}{%{&2&3}} \\times %{&5&3} + \\textcolor{teal}{&1} \\times &4 + \\textcolor{teal}{&1} \\times %{&5&3}  \\\\ \
              &= %{&2*&4&3} + %{&2&3*&5&3} + %{&1*&4} +   %{&5*&1&3} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&4} +   %{(&5*&1+&2*&4)&3} + %{&2&3*&5&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (\\textcolor{teal}{&1}+\\textcolor{orange}{%{&2&3}})(%{&5&3}+&4) \
              &= \\textcolor{teal}{&1} \\times %{&5&3} + \\textcolor{teal}{&1} \\times &4 + \\textcolor{orange}{%{&2&3}} \\times %{&5&3} + \\textcolor{orange}{%{&2&3}} \\times &4 \\\\ \
              &= %{&5*&1&3} + %{&1*&4} + %{&2&3*&5&3}  + %{&2*&4&3} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&4} +   %{(&5*&1+&2*&4)&3} + %{&2&3*&5&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (\\textcolor{orange}{%{&2&3}} + \\textcolor{teal}{&1})(%{&5&3}+&4) \
              &= \\textcolor{orange}{%{&2&3}} \\times %{&5&3} + \\textcolor{orange}{%{&2&3}} \\times &4 + \\textcolor{teal}{&1} \\times %{&5&3} + \\textcolor{teal}{&1} \\times &4  \\\\ \
              &= %{&2&3*&5&3} + %{&2*&4&3} +  %{&5*&1&3} + %{&1*&4}  \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*&4} +   %{(&5*&1+&2*&4)&3} + %{&2&3*&5&3}}} \
              \\end{align}$$' },
            ],
          ],
          type: 'result',

          defaultDelay: 30,
          options: ['penalty-for-factors-permutation'],
          grade: TROISIEME,
        },
        {
          description: 'Développer un double produit',
          subdescription: 'Coefficients relatifs',
          enounces: ['Développer et réduire :'],
          expressions: [
            '(&1#s{&2&3})(&4#s{&5&3})',
            '(#{&2&3}#s{&1})(&4#s{&5&3})',
            '(#{&2&3}#s{&1})(#{&5&3}#s{&4})',
            '(&1#s{&2&3})(#{&5&3}#s{&4})',
          ],
          variables: [
            {
              '&1': '$er[1;9]',
              '&2': '$er[1;9]\\{&1;-(&1)}',
              '&3': '$l{a;b;c;x;y;z}',
              '&4': '$er[1;9]\\{&1;-(&1);&2;-(&2)}',
              '&5': '$er[1;9]\\{&1;-(&1);&2;-(&2);&4;-(&4)}',
            },
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              (&1%s{&2&3})(&4%s{&5&3}) \
              &= %{&1*(&4)} %s{&1*(&5)*&3} %s{&2&3*(&4)} %s{&2&3*(&5)*&3} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*(&4) + (&1*(&5)+(&2)*(&4))&3 + (&2&3)*(&5)*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (%{&2&3}%s{&1})(&4%s{&5&3}) \
              &= %{&2&3*(&4)} %s{&2&3*(&5)*&3} %s{&1*(&4)} %s{&1*(&5)*&3} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*(&4) + (&1*(&5)+(&2)*(&4))&3 + (&2&3)*(&5)*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (%{&2&3}%s{&1})(%{&5&3}%s{&4}) \
              &=  %{&2&3*(&5)*&3} %s{&2&3*(&4)} %s{&1*(&5)*&3} %s{&1*(&4)} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*(&4) + (&1*(&5)+(&2)*(&4))&3 + (&2&3)*(&5)*&3}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              (&1%s{&2&3})(%{&5&3}%s{&4}) \
              &=  %{&1*(&5)*&3} %s{&1*(&4)} %s{&2&3*(&5)*&3} %s{&2&3*(&4)} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1*(&4) + (&1*(&5)+(&2)*(&4))&3 + (&2&3)*(&5)*&3}}} \
              \\end{align}$$' },
            ],


          ],
          type: 'result',

          defaultDelay: 40,
          options: ['penalty-for-factors-permutation'],
          grade: TROISIEME,
        },


      ],
      Factorisation: [
        {
          description: 'Trouver un facteur commun',
          subdescription: 'Facteur commun numérique apparent ',
          enounces: ['Trouve un facteur commun.'],
          expressions: [
            '&1*&2+&1*&3',
            '&2*&1+&1*&3',
            '&1*&2+&3*&1',
            '&2*&1+&3*&1',
            '&1*&2-&1*&3',
            '&2*&1-&1*&3',
            '&1*&2-&3*&1',
            '&2*&1-&3*&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]\\{&1;cd(&2)}',
            },
          ],
          correctionFormat: [{
            correct: ["Dans l'expression $$&exp$$ un facteur commun aux 2 produits est &solution."],
            uncorrect: ["Dans l'expression $$&exp$$ un facteur commun aux 2 produits est &solution."],
            answer: "Un facteur commun est &answer"
          }],

          solutions: [
            ['&1'],
          ],
          type: 'result',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Factoriser',
          subdescription: 'Facteur commun apparent',
          enounces: ['Factorise.'],
          expressions: [
            '&1*&2+&1*&3',
            '&2*&1+&1*&3',
            '&1*&2+&3*&1',
            '&2*&1+&3*&1',
            '&1*&2-&1*&3',
            '&2*&1-&1*&3',
            '&1*&2-&3*&1',
            '&2*&1-&3*&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]\\{&1;cd(&2)}',
            },
          ],
          solutions: [
            ['&1(&2+&3)'],
            ['&1(&2+&3)'],
            ['&1(&2+&3)'],
            ['&1(&2+&3)'],
            ['&1(&2-&3)'],
            ['&1(&2-&3)'],
            ['&1(&2-&3)'],
            ['&1(&2-&3)'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1} \\times &2+\\textcolor{teal}{&1} \\times &3 \
              &= \\textcolor{teal}{&1} \\times (&2+&3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2+&3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &2 \\times \\textcolor{teal}{&1}+\\textcolor{teal}{&1} \\times &3 \
              &= \\textcolor{teal}{&1} \\times &2 + \\textcolor{teal}{&1} \\times &3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2+&3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2+&3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1} \\times &2 +  &3 \\times \\textcolor{teal}{&1} \
              &= \\textcolor{teal}{&1} \\times &2 +  \\textcolor{teal}{&1} \\times &3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2+&3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2+&3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &2 \\times \\textcolor{teal}{&1} + &3 \\times \\textcolor{teal}{&1} \
              &= \\textcolor{teal}{&1} \\times &2 + \\textcolor{teal}{&1} \\times &3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2+&3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2+&3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1} \\times &2 - \\textcolor{teal}{&1} \\times &3 \
              &= \\textcolor{teal}{&1} \\times (&2 - &3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2 - &3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &2 \\times \\textcolor{teal}{&1} - \\textcolor{teal}{&1} \\times &3 \
              &= \\textcolor{teal}{&1} \\times &2 - \\textcolor{teal}{&1} \\times &3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2 - &3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2 - &3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1} \\times &2 -  &3 \\times \\textcolor{teal}{&1} \
              &= \\textcolor{teal}{&1} \\times &2 -  \\textcolor{teal}{&1} \\times &3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2 - &3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2 - &3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &2 \\times \\textcolor{teal}{&1} + &3 \\times \\textcolor{teal}{&1} \
              &= \\textcolor{teal}{&1} \\times &2 + \\textcolor{teal}{&1}  \\times &3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2 - &3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2 - &3)}} \
              \\end{align}$$' },
            ],
          ],

          options: ["no-penalty-for-explicit-products"],
          type: 'result',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Trouver un facteur commun',
          subdescription: 'Facteur commun apparent - littéral',
          enounces: ['Trouve un facteur commun.'],
          expressions: [
            '&1*&2+&1&3',
            '&1&3+&1*&2',
            '&1&3+&1&4',
            '&1&3-&1&4',
            '&1*&2-&1&3',
            '&1&3-&1*&2',

            '&1&3+&2&3',
            '&1&3-&2&3',
            '&4&3+&1&3',
            '&3&4+&1&3',
            '&4&3-&1&3',
            '&3&4-&1&3',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{cd(&1)}',
              '&3': '$l{x;y;z}',
              '&4': '$l{x;y;z}\\{&3}',
            },
          ],
          correctionFormat: [{
            correct: ["Dans l'expression $$&exp$$ un facteur commun aux 2 produits est &solution,"],
            uncorrect: ["Dans l'expression $$&exp$$ un facteur commun aux 2 produits est &solution,"],
            answer: "Un facteur commun est &answer"
          }],
          solutions: [
            ['&1'],
            ['&1'],
            ['&1'],
            ['&1'],
            ['&1'],
            ['&1'],

            ['&3'],
            ['&3'],
            ['&3'],
            ['&3'],
            ['&3'],
            ['&3'],
          ],
          type: 'result',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Factoriser',
          subdescription: 'Facteur commun apparent - littéral',
          enounces: ['Factorise.'],
          expressions: [
            '&1*&2+&1&3',
            '&1&3+&1*&2',
            '&1&3+&1&4',
            '&1&3-&1&4',
            '&1*&2-&1&3',
            '&1&3-&1*&2',

            '&1&3+&2&3',
            '&1&3-&2&3',
            '&4&3+&1&3',
            '&3&4+&1&3',
            '&4&3-&1&3',
            '&3&4-&1&3',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{cd(&1)}',
              '&3': '$l{x;y;z}',
              '&4': '$l{x;y;z}\\{&3}',
            },
          ],
          solutions: [
            ['&1(&2+&3)'],
            ['&1(&3+&2)'],
            ['&1(&3+&4)'],
            ['&1(&3-&4)'],
            ['&1(&2-&3)'],
            ['&1(&3-&2)'],

            ['(&1+&2)&3'],
            ['(&1-&2)&3'],
            ['&3(&4+&1)'],
            ['&3(&4+&1)'],
            ['&3(&4-&1)'],
            ['&3(&4-&1)'],

          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1} \\times &2 + \\textcolor{teal}{&1} &3 \
              &= \\textcolor{teal}{&1} \\times &2 + \\textcolor{teal}{&1}  \\times &3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2+&3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2+&3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                \\textcolor{teal}{&1} &3 + \\textcolor{teal}{&1} \\times &2 \
               &= \\textcolor{teal}{&1}  \\times &3 + \\textcolor{teal}{&1} \\times &2 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&3+&2) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&3+&2)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                \\textcolor{teal}{&1} &3 + \\textcolor{teal}{&1}&4 \
               &= \\textcolor{teal}{&1} \\times &3 + \\textcolor{teal}{&1} \\times &4 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&3+&4) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&3+&4)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                \\textcolor{teal}{&1} &3 - \\textcolor{teal}{&1}&4 \
              &=  \\textcolor{teal}{&1} \\times &3 - \\textcolor{teal}{&1} \\times &4 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&3-&4) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&3-&4)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&1} \\times &2 - \\textcolor{teal}{&1} &3 \
              &= \\textcolor{teal}{&1} \\times &2 - \\textcolor{teal}{&1} \\times &3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2-&3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2-&3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                \\textcolor{teal}{&1} &3 - \\textcolor{teal}{&1} \\times &2 \
              &= \\textcolor{teal}{&1} \\times &3 - \\textcolor{teal}{&1} \\times &2 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&3-&2) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&3-&2)}} \
              \\end{align}$$' },
            ],

            [
              {
                text: '$$\\begin{align} \
              &1\\textcolor{teal}{&3} + &2\\textcolor{teal}{&3} \
              &= &1 \\times \\textcolor{teal}{&3} + &2 \\times \\textcolor{teal}{&3} \\\\ \
              &= (&1+&2)\\times \\textcolor{teal}{&3}  \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{(&1+&2)&3}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &1\\textcolor{teal}{&3} - &2\\textcolor{teal}{&3} \
              &= &1  \\times \\textcolor{teal}{&3} - &2 \\times \\textcolor{teal}{&3} \\\\ \
              &= (&1-&2)\\times \\textcolor{teal}{&3}  \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{(&1-&2)&3}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &4\\textcolor{teal}{&3} + &1\\textcolor{teal}{&3} \
              &= \\textcolor{teal}{&3}  \\times &4 + \\textcolor{teal}{&3}  \\times &1 \\\\ \
              &= \\textcolor{teal}{&3} \\times (&4+&1)  \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&3(&4+&1)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&3}&4 + &1\\textcolor{teal}{&3} \
              &= \\textcolor{teal}{&3} \\times &4 + \\textcolor{teal}{&3} \\times &1 \\\\ \
              &= \\textcolor{teal}{&3}  \\times (&4+&1) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&3(&4+&1)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &4\\textcolor{teal}{&3} - &1\\textcolor{teal}{&3} \
              &= \\textcolor{teal}{&3}  \\times &4 - \\textcolor{teal}{&3} \\times &1 \\\\ \
              &= \\textcolor{teal}{&3} \\times (&4-&1)  \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&3(&4-&1)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&3}&4 - &1\\textcolor{teal}{&3} \
              &= \\textcolor{teal}{&3} \\times &4 - \\textcolor{teal}{&3} \\times &1 \\\\ \
              &= \\textcolor{teal}{&3}  \\times (&4-&1) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&3(&4-&1)}} \
              \\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Trouver le plus grand facteur commun ',
          subdescription: 'Le facteur commun est apparent dans un seul des produits',
          enounces: ['Trouve le plus grand facteur commun.'],
          expressions: [
            '&1&3+#{&1*&2}&4',
            '&1&3-#{&1*&2}&4',
            '#{&1*&2}&4+&1&3',
            '#{&1*&2}&4-&1&3'
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$l{x;y;z}',
              '&4': '$l{x;y;z}\\{&3}',
            },
          ],
          correctionFormat: [{
            correct: ["Dans l'expression $$&exp$$ le plus grand facteur commun aux 2 produits est &solution.",
            ],
            uncorrect: ["Dans l'expression $$&exp$$ le plus grand facteur commun aux 2 produits est &solution,",],
            answer: "Le plus grand facteur commun est &answer"
          }],
          correctionDetails: [
            [
              {
                text: "Dans l'expression $$&exp$$ le plus grand facteur commun aux 2 produits est &solution,"
              },
              {
                text: "car $$&1&3=\\textcolor{green}{&1}\\times{&3}$$ et $$#{&1*&2}&4=\\textcolor{green}{&1}\\times{&2&4}$$"
              },
            ],
          ],
          solutions: [
            ['&1'],
          ],
          type: 'rewrite',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Factoriser',
          subdescription: 'Le facteur commun est apparent dans un seul des produits',
          enounces: ['Factorise.'],
          expressions: [
            '&1&3+#{&1*&2}&4',
            '#{&1*&2}&4+&1&3',
            '&1&3-#{&1*&2}&4',
            '#{&1*&2}&4-&1&3'
          ],
          variables: [
            {
              '&1': '$l{2;3;5;7}',
              '&2': '$e[2;9]\\{cd(&1)}',
              '&3': '$l{x;y;z}',
              '&4': '$l{x;y;z}\\{&3}',
            },
          ],
          solutions: [
            ['&1(&3+&2&4)'],
            ['&1(&2&4+&3)'],
            ['&1(&3-&2&4)'],
            ['&1(&2&4-&3)'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                &1&3+%{&1*&2}&4 \
              &= \\textcolor{teal}{&1} \\times &3+\\textcolor{teal}{&1} \\times &2&4 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&3 + &2&4) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&3 + &2&4)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2}&4 + &1&3\
              &= \\textcolor{teal}{&1} \\times &2&4 + \\textcolor{teal}{&1} \\times &3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2&4 + &3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2&4 + &3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                &1&3 - %{&1*&2}&4 \
              &= \\textcolor{teal}{&1} \\times &3 - \\textcolor{teal}{&1} \\times &2&4 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&3 - &2&4) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&3 - &2&4)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2}&4 - &1&3\
              &= \\textcolor{teal}{&1} \\times &2&4 - \\textcolor{teal}{&1} \\times &3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2&4 - &3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2&4 - &3)}} \
              \\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Trouver le plus grand facteur commun',
          subdescription: "Le plus grand facteur commun n'est pas apparent",
          enounces: ['Quel est le plus grand facteur commun dans ces 2 produits ?'],
          expressions: [
            '#{&1*&2}&5+#{&1*&3}&4',
            '#{&1*&2}&5-#{&1*&3}&4',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&2)}',
              '&4': '$l{x;y;z}',
              '&5': '$l{x;y;z}\\{&4}',
              // '&6': 'pgcd(&1*&2;&1*&3)',
              // '&7': '&1*&2:&6',
              // '&8': '&1*&3:&6',
            },
          ],
          correctionFormat: [{
            correct: ["Dans l'expression $$&exp$$ le plus grand facteur commun est &solution,"],
            uncorrect: ["Dans l'expression $$&exp$$ le plus grand facteur commun est &solution.",],
            answer: "Le plus grand facteur commun est &answer."
          }],
          correctionDetails: [
            [
              {
                text: "Dans l'expression $$&exp$$ le plus grand facteur commun aux 2 produits est &solution,"
              },
              {
                text: "car $$#{&1*&2}&5=\\textcolor{green}{&1}\\times{&2&5}$$ et $$#{&1*&3}&4=\\textcolor{green}{&1}\\times{&3&4}$$"
              },
            ],
          ],
          solutions: [
            ['&1'],
          ],
          type: 'result',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Factoriser',
          subdescription: "Le plus grand facteur commun n'est pas apparent",
          enounces: ['Factorise le plus possible :'],
          expressions: [
            '#{&1*&2}&5+#{&1*&3}&4',
            '#{&1*&2}&5-#{&1*&3}&4',
            '#{&1*&2}&5+#{&1*&3}',
            '#{&1*&2}&5-#{&1*&3}',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&2)}',
              '&4': '$l{x;y;z}',
              '&5': '$l{x;y;z}\\{&4}',
              // '&6': 'pgcd(&1*&2;&1*&3)',
              // '&7': '&1*&2:&6',
              // '&8': '&1*&3:&6',
            },
          ],
          solutions: [
            ['&1(&2&5+&3&4)'],
            ['&1(&2&5-&3&4)'],
            ['&1(&2&5+&3)'],
            ['&1(&2&5-&3)'],

          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2}&5+%{&1*&3}&4 \
              &= \\textcolor{teal}{&1} \\times &2&5 + \\textcolor{teal}{&1} \\times &3&4 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2&5 + &3&4) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2&5 + &3&4)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2}&5 - %{&1*&3}&4 \
              &= \\textcolor{teal}{&1} \\times &2&5 - \\textcolor{teal}{&1} \\times &3&4 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2&5 - &3&4) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2&5 - &3&4)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2}&5+%{&1*&3} \
              &= \\textcolor{teal}{&1} \\times &2&5 + \\textcolor{teal}{&1} \\times &3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2&5 + &3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2&5 + &3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2}&5-%{&1*&3} \
              &= \\textcolor{teal}{&1} \\times &2&5 - \\textcolor{teal}{&1} \\times &3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2&5 - &3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2&5 - &3)}} \
              \\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Factoriser',
          subdescription: 'Cas particulier',
          enounces: ['Factoriser le plus possible:'],
          expressions: [
            '&1+#{&1*&2}&3',
            '#{&1*&2}&3+&1',
            '&1-#{&1*&2}&3',
            '#{&1*&2}&3-&1'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$l{x;y;z}',
            },
          ],
          solutions: [
            ['&1(1+&2&3)'],
            ['&1(&2&3+1)'],
            ['&1(1-&2&3)'],
            ['&1(&2&3-1)'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                &1+%{&1*&2}&3 \
              &= \\textcolor{teal}{&1} \\times 1 + \\textcolor{teal}{&1} \\times &2&3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (1 + &2&3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(1 + &2&3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2}&3 + &1 \
              &= \\textcolor{teal}{&1} \\times &2&3 + \\textcolor{teal}{&1} \\times 1 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2&3 + 1) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2&3 + 1)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                &1 - %{&1*&2}&3 \
              &= \\textcolor{teal}{&1} \\times 1 - \\textcolor{teal}{&1} \\times &2&3 \\\\ \
              &= \\textcolor{teal}{&1} \\times (1 - &2&3) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(1 - &2&3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2}&3 - &1 \
              &= \\textcolor{teal}{&1} \\times &2&3 - \\textcolor{teal}{&1} \\times 1 \\\\ \
              &= \\textcolor{teal}{&1} \\times (&2&3 - 1) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1(&2&3 - 1)}} \
              \\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Factoriser',
          subdescription: 'Cas général - avec des carrés',
          enounces: ['Factoriser le plus possible.'],
          expressions: [
            '#{&1*&2*&4^2}+#{&1*&3*&4}',
            '#{&1*&2*&4}+#{&1*&3*&4^2}',
            '#{&1*&2*&4^2}-#{&1*&3*&4}',
            '#{&1*&2*&4}-#{&1*&3*&4^2}',
            '#{&1*&2*&4^2}+#{&1*&3}',
            '#{&1*&2}+#{&1*&3*&4^2}',
            '#{&1*&2*&4^2}-#{&1*&3}',
            '#{&1*&2}-#{&1*&3*&4^2}',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;9]',
              '&3': '$e[1;9]\\{&2}',
              '&4': '$l{x;y;z}',
              '&5': 'pgcd(&1*&3;&1*&2)',
              '&6': '&1*&2:&5',
              '&7': '&1*&3:&5',
            },
          ],
          solutions: [
            ['#{&5&4}(#{&6*&4}+#{&7})'],
            ['#{&5&4}(#{&6}+#{&7*&4})'],
            ['#{&5&4}(#{&6*&4}-#{&7})'],
            ['#{&5&4}(#{&6}-#{&7*&4})'],

            ['#{&5}(#{&6*&4^2}+#{&7})'],
            ['#{&5}(#{&6}+#{&7*&4^2})'],
            ['#{&5}(#{&6*&4^2}-#{&7})'],
            ['#{&5}(#{&6}-#{&7*&4^2})'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2*&4^2}+%{&1*&3*&4} \
              &= \\textcolor{teal}{%{&5}&4} \\times %{&6*&4} + \\textcolor{teal}{%{&5}&4} \\times %{&7} \\\\ \
              &= \\textcolor{teal}{%{&5}&4} \\times (%{&6*&4} + %{&7}) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&5}&4(%{&6*&4} + %{&7})}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2*&4}+%{&1*&3*&4^2} \
              &= \\textcolor{teal}{%{&5}&4} \\times %{&6} + \\textcolor{teal}{%{&5}&4} \\times %{&7*&4} \\\\ \
              &= \\textcolor{teal}{%{&5}&4} \\times (%{&6} + %{&7*&4}) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&5}&4(%{&6} + %{&7*&4})}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2*&4^2} - %{&1*&3*&4} \
              &= \\textcolor{teal}{%{&5}&4} \\times %{&6*&4} - \\textcolor{teal}{%{&5}&4} \\times %{&7} \\\\ \
              &= \\textcolor{teal}{%{&5}&4} \\times (%{&6*&4} - %{&7}) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&5}&4(%{&6*&4} - %{&7})}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2*&4} - %{&1*&3*&4^2} \
              &= \\textcolor{teal}{%{&5}&4} \\times %{&6} - \\textcolor{teal}{%{&5}&4} \\times %{&7*&4} \\\\ \
              &= \\textcolor{teal}{%{&5}&4} \\times (%{&6} - %{&7*&4}) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&5}&4(%{&6} - %{&7*&4})}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2*&4^2}+%{&1*&3} \
              &= \\textcolor{teal}{%{&5}} \\times %{&6*&4^2} + \\textcolor{teal}{%{&5}} \\times %{&7} \\\\ \
              &= \\textcolor{teal}{%{&5}} \\times (%{&6*&4^2} + %{&7}) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&5}(%{&6*&4^2} + %{&7})}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2}+%{&1*&3*&4^2} \
              &= \\textcolor{teal}{%{&5}} \\times %{&6} + \\textcolor{teal}{%{&5}} \\times %{&7*&4^2} \\\\ \
              &= \\textcolor{teal}{%{&5}} \\times (%{&6} + %{&7*&4^2}) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&5}(%{&6} + %{&7*&4^2})}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2*&4^2} - %{&1*&3} \
              &= \\textcolor{teal}{%{&5}} \\times %{&6*&4^2} - \\textcolor{teal}{%{&5}} \\times %{&7} \\\\ \
              &= \\textcolor{teal}{%{&5}} \\times (%{&6*&4^2} - %{&7}) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&5}(%{&6*&4^2} - %{&7})}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1*&2} - %{&1*&3*&4^2} \
              &= \\textcolor{teal}{%{&5}} \\times %{&6} - \\textcolor{teal}{%{&5}} \\times %{&7*&4^2} \\\\ \
              &= \\textcolor{teal}{%{&5}} \\times (%{&6} - %{&7*&4^2}) \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&5}(%{&6} - %{&7*&4^2})}} \
              \\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 30,
          grade: QUATRIEME,
        },

      ],
      'Identités remarquables': [
        {
          description: 'Développer $$(a+b)(a-b)$$',
          subdescription: 'Coefficients positifs',
          enounces: ['Développer et réduire :'],
          expressions: [
            '(&1+&2)(&1-&2)',
            '(&1-&2)(&1+&2)',
            '(&2+&1)(&2-&1)',
            '(&2-&1)(&2+&1)',
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$l{a;b;c;x;y;z}',
            },
          ],
          solutions: [
            ['#{&1^2}-&2^2'],
            ['#{&1^2}-&2^2'],
            ['&2^2-#{&1^2}'],
            ['&2^2-#{&1^2}'],
          ],
          type: 'result',
          defaultDelay: 30,
          options: ['penalty-for-factors-permutation'],
          grade: TROISIEME,
        },
        {
          description: 'Développer $$(a+b)(a-b)$$',
          subdescription: 'Coefficients positifs',
          enounces: ['Développer et réduire :'],
          expressions: [
            '(&1+#{&2&3})(&1-#{&2&3})',
            '(&1-#{&2&3})(&1+#{&2&3})',
            '(#{&2&3}+&1)(#{&2&3}-&1)',
            '(#{&2&3}-&1)(#{&2&3}+&1)',
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]\\{&1}',
              '&3': '$l{a;b;c;x;y;z}',
            },
          ],
          solutions: [
            ['#{&1^2}-#{(&2&3)^2}'],
            ['#{&1^2}-#{(&2&3)^2}'],
            ['#{(&2&3)^2}-#{&1^2}'],
            ['#{(&2&3)^2}-#{&1^2}'],

          ],
          type: 'result',
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                (\\textcolor{teal}{&1}+\\textcolor{orange}{%{&2&3}})(\\textcolor{teal}{&1}-\\textcolor{orange}{%{&2&3}}) \
              &= \\textcolor{teal}{&1}^2 -(\\textcolor{orange}{%{&2&3}})^2 \\\\ \
              &= %{&1^2} -&2^2 \\times &3^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1^2} - %{&2^2&3^2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                (\\textcolor{teal}{&1}-\\textcolor{orange}{%{&2&3}})(\\textcolor{teal}{&1}+\\textcolor{orange}{%{&2&3}}) \
              &= \\textcolor{teal}{&1}^2 -(\\textcolor{orange}{%{&2&3}})^2 \\\\ \
              &= %{&1^2} -&2^2 \\times &3^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1^2} - %{&2^2&3^2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                (\\textcolor{teal}{%{&2&3}} + \\textcolor{orange}{&1})(\\textcolor{teal}{%{&2&3}} - \\textcolor{orange}{&1}) \
              &=  (\\textcolor{teal}{%{&2&3}})^2 - \\textcolor{orange}{&1}^2 \\\\ \
              &= &2^2 \\times &3^2 - %{&1^2} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2^2&3^2} - %{&1^2}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                (\\textcolor{teal}{%{&2&3}} - \\textcolor{orange}{&1})(\\textcolor{teal}{%{&2&3}} - \\textcolor{orange}{&1}) \
              &= (\\textcolor{teal}{%{&2&3}})^2 - \\textcolor{orange}{&1}^2 \\\\ \
              &=  &2^2 \\times &3^2 - %{&1^2} \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2^2&3^2} - %{&1^2}}} \
              \\end{align}$$' },
            ],
          ],
          defaultDelay: 30,
          options: ['penalty-for-factors-permutation'],
          grade: TROISIEME,
        },
        {
          description: 'Factoriser $$a^2-b^2$$',
          enounces: ['Factoriser :'],
          expressions: ['#{&1^2}-&3^2', '&3^2-#{&1^2}'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '$l{x;y;z}',
            },
          ],
          solutions: [['(&1+&3)(&1-&3)'], ['(&3+&1)(&3-&1)']],
          type: 'result',
          defaultDelay: 30,
          grade: TROISIEME,
        },
        {
          description: 'Factoriser $$a^2-b^2$$',
          enounces: ['Factoriser :'],
          expressions: ['#{&1^2}-#{(&2&3)^2}', '#{(&2&3)^2}-#{&1^2}'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]\\{&1}',
              '&3': '$l{x;y;z}',
            },
          ],
          solutions: [['(&1+#{&2&3})(&1-#{&2&3})'], ['(#{&2&3}+&1)(#{&2&3}-&1)']],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                %{&1^2}-%{(&2&3)^2} \
              &=  &1^2-(%{&2&3})^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{(&1+&2&3)(&1-&2&3)}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{(&2&3)^2} - %{&1^2} \
              &=  (%{&2&3})^2 - &1^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{(&2&3+&1)(&2&3-&1)}} \
              \\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 30,
          grade: TROISIEME,
        },
        {
          description: 'Développer $$(a+b)^2$$',

          enounces: ['Développer et réduire :'],
          expressions: [
            '(&1+&2)^2',
            '(&2+&1)^2'
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$l{a;b;c;x;y;z}',
            },
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                (\\textcolor{teal}{&1}+\\textcolor{orange}{&2})^2 \
              &=  \\textcolor{teal}{&1}^2 + 2 \\times \\textcolor{teal}{&1} \\times \\textcolor{orange}{&2} + \\textcolor{orange}{&2}^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1^2} + %{2*&1*&2} + &2^2 }} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                (\\textcolor{teal}{&2}+\\textcolor{orange}{&1})^2 \
              &=  \\textcolor{teal}{&2}^2 + 2 \\times \\textcolor{teal}{&2} \\times \\textcolor{orange}{&1} + \\textcolor{orange}{&1}^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2^2 + %{2*&1*&2} + %{&1^2} }} \
              \\end{align}$$' },
            ],
          ],
          solutions: [
            ['#{&1^2}+#{2*&1*&2}+&2^2'],
            ['&2^2+#{2*&1*&2}+#{&1^2}'],
          ],
          type: 'result',
          defaultDelay: 30,
          options: ['penalty-for-factors-permutation'],
          grade: SECONDE,
        },
        {
          description: 'Développer $$(a-b)^2$$',
          enounces: ['Développer et réduire :'],
          expressions: ['(&1-&2)^2', '(&2-&1)^2'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$l{a;b;c;x;y;z}',
            },
          ],
          solutions: [
            ['#{&1^2}-#{2*&1*&2}+&2^2'],
            ['&2^2-#{2*&1*&2}+#{&1^2}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                (\\textcolor{teal}{&1}-\\textcolor{orange}{&2})^2 \
              &=  \\textcolor{teal}{&1}^2 - 2 \\times \\textcolor{teal}{&1} \\times \\textcolor{orange}{&2} + \\textcolor{orange}{&2}^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1^2} - %{2*&1*&2} + &2^2 }} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                (\\textcolor{teal}{&2} - \\textcolor{orange}{&1})^2 \
              &=  \\textcolor{teal}{&2}^2 - 2 \\times \\textcolor{teal}{&2} \\times \\textcolor{orange}{&1} + \\textcolor{orange}{&1}^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2^2 - %{2*&1*&2} + %{&1^2} }} \
              \\end{align}$$' },
            ],
          ],
          type: 'result',
          defaultDelay: 30,
          options: ['penalty-for-factors-permutation'],
          grade: SECONDE,
        },
        {
          description: 'Développer $$(a+b)^2$$',

          enounces: ['Développer et réduire :'],
          expressions: [
            '(&1+#{&2&3})^2',
            '(#{&2&3}+&1)^2'
          ],
          variables: [
            {
              '&1': '$e[1;7]',
              '&2': '$e[1;7]\\{&1}',
              '&3': '$l{a;b;c;x;y;z}',
            },
          ],
          solutions: [
            ['#{&1^2}+#{2*&1*&2&3}+#{(&2&3)^2}'],
            ['#{(&2&3)^2}+#{2*&1*&2&3}+#{&1^2}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                (\\textcolor{teal}{&1} + \\textcolor{orange}{%{&2&3}})^2 \
              &=  \\textcolor{teal}{&1}^2 + 2 \\times \\textcolor{teal}{&1} \\times \\textcolor{orange}{%{&2&3}} + (\\textcolor{orange}{%{&2&3}})^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1^2} + %{2*&1*&2*&3} + %{(&2&3)^2} }} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                (\\textcolor{teal}{%{&2&3}}+\\textcolor{orange}{&1})^2 \
              &=  (\\textcolor{teal}{%{&2&3}})^2 + 2 \\times \\textcolor{teal}{%{&2&3}} \\times \\textcolor{orange}{&1} + \\textcolor{orange}{&1}^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&2&3)^2} + %{2*&1*&2*&3} + %{&1^2} }} \
              \\end{align}$$' },
            ],
          ],
          type: 'result',

          defaultDelay: 30,
          options: ['penalty-for-factors-permutation'],
          grade: SECONDE,
        },
        {
          description: 'Développer $$(a-b)^2$$',

          enounces: ['Développer et réduire :'],
          expressions: ['(&1-#{&2&3})^2', '(#{&2&3}-&1)^2'],
          variables: [
            {
              '&1': '$e[1;7]',
              '&2': '$e[1;7]\\{&1}',
              '&3': '$l{a;b;c;x;y;z}',
            },
          ],
          solutions: [
            ['#{&1^2}-#{2*&1*&2&3}+#{(&2&3)^2}'],
            ['#{(&2&3)^2}-#{2*&1*&2&3}+#{&1^2}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                (\\textcolor{teal}{&1} - \\textcolor{orange}{%{&2&3}})^2 \
              &=  \\textcolor{teal}{&1}^2 - 2 \\times \\textcolor{teal}{&1} \\times \\textcolor{orange}{%{&2&3}} + (\\textcolor{orange}{%{&2&3}})^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1^2} - %{2*&1*&2*&3} + %{(&2&3)^2} }} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                (\\textcolor{teal}{%{&2&3}} - \\textcolor{orange}{&1})^2 \
              &=  (\\textcolor{teal}{%{&2&3}})^2 - 2 \\times \\textcolor{teal}{%{&2&3}} \\times \\textcolor{orange}{&1} + \\textcolor{orange}{&1}^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&2&3)^2} - %{2*&1*&2*&3} + %{&1^2} }} \
              \\end{align}$$' },
            ],
          ],
          type: 'result',

          defaultDelay: 30,
          options: ['penalty-for-factors-permutation'],
          grade: SECONDE,
        },

        {
          description: 'Factoriser une expression du second degré',
          enounces: ['Factoriser :'],
          expressions: ['&3^2-#{2*&1}&3+#{&1^2}', '&3^2+#{2*&1}&3+#{&1^2}'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&3': '$l{x;y;z}',
            },
          ],
          solutions: [['(&3-&1)^2'], ['(&3+&1)^2']],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                &3^2 - %{2*&1}&3 + %{&1^2} \
              &= &3^2 - 2 \\times &3 \\times &1 + &1^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{(&3-&1)^2 }} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                &3^2 + %{2*&1}&3 + %{&1^2} \
              &= &3^2 + 2 \\times &3 \\times &1 + &1^2 \\\\ \
              &= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{(&3+&1)^2 }} \
              \\end{align}$$' },
            ],

          ],
          type: 'result',
          defaultDelay: 30,
          grade: SECONDE,
        },
      ],
    },
    'Equations': {
      'Dans $$\\N$$': [

        {
          description: 'Addition $$a+x=b$$',
          enounces: ["Résouds cette équation."],
          expressions: [
            'x+&1=#{&1+&2}',
            '&1+x=#{&1+&2}',
          ],
          variables: [
            {
              '&1': '$e[5;9]',
              '&2': '$e[2;9]',
            },
          ],
          solutions: [
            ['&2'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                x+&1=%{&1+&2}  \
              & \\quad \\lrArr \\quad x=%{&1+&2}-&1 \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],
          ],
          type: 'equation',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Soustraction  $$x-a=b$$',
          enounces: ["Résouds cette équation."],
          expressions: [
            'x-&1=&2',
          ],
          variables: [
            {
              '&1': '$e[5;9]',
              '&2': '$e[2;9]',
            },
          ],
          solutions: [
            ['#{&1+&2}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                x-&1=&2  \
              & \\quad \\lrArr \\quad x=&1+&2\\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&1+&2}}} \
              \\end{align}$$' },
            ],
          ],
          type: 'equation',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Soustraction (2)  $$a-x=b$$',
          enounces: ["Résouds cette équation."],
          expressions: [
            '#{&1+&2}-x=&1',
          ],
          variables: [
            {
              '&1': '$e[5;9]',
              '&2': '$e[2;9]',
            },
          ],
          solutions: [
            ['&2'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                %{&1+&2}-x=&1  \
              & \\quad \\lrArr \\quad x=%{&1+&2}-&1\\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],
          ],
          type: 'equation',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Multiplication $$a \\times x=b$$',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&1x=#{&1*&2}',
            'x*&1=#{&1*&2}',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
            },
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                &1x=#{&1*&2}  \
              & \\quad \\lrArr \\quad x=\\frac{#{&1*&2}}{&1}\\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                x \\times &1=#{&1*&2}  \
              & \\quad \\lrArr \\quad x=\\frac{#{&1*&2}}{&1}\\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],
          ],
          solutions: [
            ['&2'],
          ],

          type: 'equation',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Division $$x \\div a=b$$',
          enounces: ["Résouds cette équation."],
          expressions: [
            'x/&1=&2',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
            },
          ],
          solutions: [
            ['#{&1*&2}'],
          ],
          type: 'equation',
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                \\frac{x}{&1}=&2  \
              & \\quad \\lrArr \\quad x=&2 \\times &1 \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&1}}} \
              \\end{align}$$' },
            ],

          ],
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Division (2) $$a \\div = b$$',
          enounces: ["Résouds cette équation."],
          expressions: [
            '#{&1*&2}/x=&2',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
            },
          ],
          solutions: [
            ['&1'],
          ],
          correctionDetails: [
            [
              {
                text: 'Pour $$x \\neq 0$$, '
              },
              {
                text: '$$\\begin{align} \
                \\frac{%{&1*&2}}{x}=&2  \
              & \\quad \\lrArr \\quad %{&1*&2} = &2 \\times x \\\\ \
              & \\quad \\lrArr \\quad x= \\frac {%{&1*&2}}{&2} \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1}} \
              \\end{align}$$' },
            ],

          ],
          type: 'equation',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
      ],
      'Dans $$\\Z$$': [
        {
          description: 'Opposé $$-x=a$$',
          enounces: ["Résouds cette équation."],
          expressions: [
            '-x=&1',
          ],
          variables: [
            {
              '&1': '$er[1;9]',
            },
          ],
          solutions: [
            ['#{-(&1)}'],
          ],
          correctionDetails: [
            [
              {
                text: 'Pour $$x \\neq 0$$, '
              },
              {
                text: '$$\\begin{align} \
                -x=&1 \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-(&1)}}} \
              \\end{align}$$' },
            ],

          ],
          type: 'equation',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Addition',
          enounces: ["Résouds cette équation."],
          expressions: [
            'x+&1=#{&1+(&2)}',
            '&1+x=#{&1+(&2)}',
            'x+(&1)=#{&1+(&2)}',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$er[2;9]',
            },
            {
              '&1': '$er[2;9]',
              '&2': '$er[2;9]',
            },
            {
              '&1': '-$e[2;9]',
              '&2': '$er[2;9]',
            },

          ],
          solutions: [
            ['&2'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                x+&1=%{&1+(&2)}  \
              & \\quad \\lrArr \\quad x=%{&1+(&2)}-&1 \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                &1+x=%{&1+(&2)}  \
              & \\quad \\lrArr \\quad x=%{&1+(&2)}-&1 \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                x+(&1)=%{&1+(&2)}  \
              & \\quad \\lrArr \\quad x=%{&1+(&2)}-(&1) \\\\ \
              & \\quad \\lrArr \\quad x=%{&1+(&2)} + %{-(&1)} \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],
          ],
          type: 'equation',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Soustraction $$x-a=b$$',
          enounces: ["Résouds cette équation."],
          expressions: [
            'x-&1=&2',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '-$e[2;9]',
            },
          ],
          solutions: [
            ['#{&1+(&2)}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                x-&1=&2  \
              & \\quad \\lrArr \\quad x=&2+&1 \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2+&1}}} \
              \\end{align}$$' },
            ],

          ],
          type: 'equation',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Soustraction (2) $$a-x=b$$',
          enounces: ["Résouds cette équation."],
          expressions: [
            '#{&1+(&2)}-x=&1',
            '#{&1+(&2)}-x=&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$er[2;9]',
            },
            {
              '&1': '-$e[2;9]',
              '&2': '$er[2;9]',
            },
          ],
          solutions: [
            ['&2'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                %{&1+(&2)}-x=&1  \
              & \\quad \\lrArr \\quad x=%{&2+(&1)}-&1 \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                %{&1+(&2)}-x=&1  \
              & \\quad \\lrArr \\quad x=%{&2+(&1)}-(&1) \\\\ \
              & \\quad \\lrArr \\quad x=%{&2+(&1)}+%{-(&1)} \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],

          ],
          type: 'equation',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Multiplication',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&1x=#{&1*(&2)}',
            '&1x=#{&1*(&2)}',
            'x*&1=#{&1*(&2)}',
            'x*(&1)=#{&1*(&2)}',
          ],
          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$er[2;9]',
            },
            {
              '&1': '$er[2;9]',
              '&2': '$er[2;9]',
            },

            {
              '&1': '$e[2;9]',
              '&2': '$er[2;9]',
            },
            {
              '&1': '-$e[2;9]',
              '&2': '$er[2;9]',
            },
          ],
          solutions: [
            ['&2'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                &1x=#{&1*(&2)}  \
              & \\quad \\lrArr \\quad x=\\frac{%{&2*(&1)}}{&1} \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                &1x=#{&1*(&2)}  \
              & \\quad \\lrArr \\quad x=\\frac{%{&2*(&1)}}{&1} \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                x \\times &1=#{&1*(&2)}  \
              & \\quad \\lrArr \\quad x=\\frac{%{&2*(&1)}}{&1} \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                x \\times (&1)=#{&1*(&2)}  \
              & \\quad \\lrArr \\quad x=\\frac{%{&2*(&1)}}{&1} \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&2}} \
              \\end{align}$$' },
            ],


          ],
          type: 'equation',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Division',
          enounces: ["Résouds cette équation."],
          expressions: [
            'x/{&1}=&2',

          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$er[2;9]',
            },
            {
              '&1': '-$e[2;9]',
              '&2': '$er[2;9]',
            },
          ],
          solutions: [
            ['#{&1*(&2)}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                \\frac{x}{&1}=&2  \
              & \\quad \\lrArr \\quad x=&2 \\times &1 \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&1}}} \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                \\frac{x}{&1}=&2  \
              & \\quad \\lrArr \\quad x=&2 \\times (&1) \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*(&1)}}} \
              \\end{align}$$' },
            ],
          ],
          type: 'equation',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Division (2) $$a/x=b',
          enounces: ["Résouds cette équation."],
          expressions: [
            '{#{&1*(&2)}}/x=&2',
          ],
          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$er[2;9]',
            },
          ],
          solutions: [
            ['&1'],
          ],
          correctionDetails: [
            [
              {
                text: 'Pour $$x \\neq 0$$, '
              },
              {
                text: '$$\\begin{align} \
                \\frac{%{&1*(&2)}}{x}=&2  \
              & \\quad \\lrArr \\quad %{&1*(&2)} = &2 \\times x \\\\ \
              & \\quad \\lrArr \\quad x= \\frac {%{&1*(&2)}}{&2} \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{&1}} \
              \\end{align}$$' },
            ],

          ],
          type: 'equation',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
      ],
      'Dans $$\\Q$$': [
        {
          description: 'Addition',
          enounces: ["Résouds cette équation."],
          expressions: [
            'x+&2/&1=#{&2+&3}/&1',
            '&2/&1+x=#{&3+&2}/&1',

          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[5;9]\\{&1}',
              '&3': '$e[2;9]\\{&1}',
            },
          ],
          solutions: [
            ['#{&3/&1}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                x+\\frac{&2}{&1}=\\frac{%{&2+&3}}{&1} \
              & \\quad \\lrArr \\quad x=\\frac{%{&2+&3}}{&1}-\\frac{&2}{&1} \\\\ \
              @@ pgcd(&3;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\frac{&3}{&1}}} @@ \
              @@ pgcd(&3;&1) != 1 ?? & \\quad \\lrArr \\quad  x= \\frac{&3}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3/&1}}} @@ \
              \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                \\frac{&2}{&1} + x = \\frac{%{&2+&3}}{&1} \
              & \\quad \\lrArr \\quad x=\\frac{%{&2+&3}}{&1}-\\frac{&2}{&1} \\\\ \
              @@ pgcd(&3;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\frac{&3}{&1}}} @@ \
              @@ pgcd(&3;&1) != 1 ?? & \\quad \\lrArr \\quad  x= \\frac{&3}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3/&1}}} @@ \
              \\end{align}$$' },
            ],
          ],
          type: 'equation',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Soustraction',
          enounces: ["Résouds cette équation."],
          expressions: [
            'x-&2/&1=&3/&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[5;9]\\{&1}',
              '&3': '$e[2;9]\\{&1}',
            },
          ],
          solutions: [
            ['#{(&2+&3)/&1}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                x - \\frac{&2}{&1}=\\frac{&3}{&1} \
              & \\quad \\lrArr \\quad x=\\frac{&3}{&1}+\\frac{&2}{&1} \\\\ \
              @@ pgcd(&3+&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&3+&2)/&1}}} @@ \
              @@ pgcd(&3+&2;&1) != 1 ?? & \\quad \\lrArr \\quad  x= \\frac{%{&3+&2}}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&3+&2)/&1}}} @@ \
              \\end{align}$$' },
            ],

          ],
          type: 'equation',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Soustraction (2)',
          enounces: ["Résouds cette équation."],
          expressions: [
            '#{&2+&3}/&1-x=&2/&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[5;9]\\{&1}',
              '&3': '$e[2;9]\\{&1}',
            },
          ],
          solutions: [
            ['#{&3/&1}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                \\frac{%{&2+&3}}{&1} - x = \\frac{&2}{&1} \
              & \\quad \\lrArr \\quad x = \\frac{%{&2+&3}}{&1}-\\frac{&2}{&1} \\\\ \
              @@ pgcd(&3;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3/&1}}} @@ \
              @@ pgcd(&3;&1) != 1 ?? & \\quad \\lrArr \\quad  x= \\frac{&3}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3/&1}}} @@ \
              \\end{align}$$' },
            ],

          ],
          type: 'equation',
          defaultDelay: 30,
          grade: CINQUIEME,
        },
        {
          description: 'Multiplication',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&2x=#{&2*&3}/&1',
            'x*&2=#{&2*&3}/&1',
            '&2x=&1/&3',
            'x*&2=&1/&3',
            'x*&1=&2',
            '&1x=&2',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&1)}',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&1)}',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{cd(&1)}',
              '&3': '$e[2;9]\\{cd(&1)}',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{cd(&1)}',
              '&3': '$e[2;9]\\{cd(&1)}',
            },

            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
            },
          ],
          solutions: [
            ['#{&3/&1}'],
            ['#{&3/&1}'],
            ['#{&3/(&2*&1)}'],
            ['#{&3/(&2*&1)}'],
            ['&2/&1'],
            ['&2/&1'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                \\textcolor{teal}{&2}x = \\frac{%{&2*&3}}{&1} \
              & \\quad \\lrArr \\quad x = \\frac{%{&2*&3}}{&1} \\textcolor{teal}{\\div &2} \\\\ \
              & \\quad \\lrArr \\quad x = \\frac{%{&2*&3} \\div &2 }{&1} \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\frac{&3}{&1}}} \
              \\end{align}$$' },
            ], [
              {
                text: '$$\\begin{align} \
                x \\textcolor{teal}{\\times &2} = \\frac{%{&2*&3}}{&1} \
              & \\quad \\lrArr \\quad x = \\frac{%{&2*&3}}{&1} \\textcolor{teal}{\\div &2} \\\\ \
              & \\quad \\lrArr \\quad x = \\frac{%{&2*&3} \\div &2 }{&1} \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\frac{&3}{&1}}} \
              \\end{align}$$' },
            ], [
              {
                text: '$$\\begin{align} \
                \\textcolor{teal}{&2}x=\\frac{&1}{&3} \
              & \\quad \\lrArr \\quad x = \\frac{&1}{&3} \\textcolor{teal}{\\times \\frac{1}{&2}} \\\\ \
              & \\quad \\lrArr \\quad x = \\frac{&1}{&3 \\times &2} \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\frac{&1}{%{&3*&2}}}} \
              \\end{align}$$' },
            ], [
              {
                text: '$$\\begin{align} \
                x \\textcolor{teal}{\\times &2} = \\frac{&1}{&3} \
              & \\quad \\lrArr \\quad x = \\frac{&1}{&3} \\textcolor{teal}{\\times \\frac{1}{&2}} \\\\ \
              & \\quad \\lrArr \\quad x = \\frac{&1}{&3 \\times &2} \\\\ \
              & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\frac{&1}{%{&3*&2}}}} \
              \\end{align}$$' },
            ], [
              {
                text: '$$\\begin{align} \
                x \\textcolor{teal}{\\times &1} = &2\
                @@ pgcd(&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} @@ \
                @@ pgcd(&2;&1) != 1 ?? & \\quad \\lrArr \\quad  x= \\frac{&2}{\\textcolor{teal}{&1}} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} @@ \
                \\end{align}$$' },
            ], [
              {
                text: '$$\\begin{align} \
                \\textcolor{teal}{&1}x = &2\
                @@ pgcd(&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} @@ \
                @@ pgcd(&2;&1) != 1 ?? & \\quad \\lrArr \\quad  x= \\frac{&2}{\\textcolor{teal}{&1}} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} @@ \
                \\end{align}$$' },
            ],
          ],
          type: 'equation',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Division',
          enounces: ["Résouds cette équation."],
          expressions: [
            'x/&2=&3/&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{&1}',
            },
          ],
          solutions: [
            ['#{&2*&3/&1}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                \\frac{x}{\\textcolor{teal}{&2}}=\\frac{&3}{&1} \
              & \\quad \\lrArr \\quad x = \\frac{&3}{&1} \\textcolor{teal}{\\times &2} \\\\ \
              & \\quad \\lrArr \\quad x = \\frac{&3 \\times &2}{&1} \\\\ \
              @@ pgcd(&2*&3;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*&2/&1}}} @@ \
              @@ pgcd(&2*&3;&1) != 1 ?? & \\quad \\lrArr \\quad  x= \\frac{%{&2*&3}}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&3*&2/&1}}} @@ \
              \\end{align}$$' },
            ]
          ],
          type: 'equation',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Division (2)',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&2/x=&3/&1',
            '&2/x=&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&1);&2}',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',

            },
          ],
          solutions: [
            ['#{&2*&1/&3}'],
            ['#{&2/&1}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                \\frac{&2}{x}=\\frac{&3}{&1} \
              & \\quad \\lrArr \\quad \\frac{x}{\\textcolor{teal}{&2}} = \\frac{&1}{&3} \\\\ \
              & \\quad \\lrArr \\quad x = \\frac{&1}{&3} \\times \\textcolor{teal}{&2} \\\\ \
              & \\quad \\lrArr \\quad x = \\frac{&1 \\times &2}{&3} \\\\ \
              @@ pgcd(&2*&1;&3) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&1/&3}}} @@ \
              @@ pgcd(&2*&1;&3) != 1 ?? & \\quad \\lrArr \\quad  x= \\frac{%{&2*&1}}{&3} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2*&1/&3}}} @@ \
             \\end{align}$$' },
            ],

            [
              {
                text: '$$\\begin{align} \
                \\frac{&2}{x}=&1 \
              & \\quad \\lrArr \\quad \\frac{x}{\\textcolor{teal}{&2}} = \\frac{1}{&1} \\\\ \
              & \\quad \\lrArr \\quad x = \\frac{1}{&1} \\times \\textcolor{teal}{&2} \\\\ \
              @@ pgcd(&1;&2) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{\\frac{&2}{&1}}} @@ \
              @@ pgcd(&1;&2) != 1 ?? & \\quad \\lrArr \\quad  x= \\frac{&2}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} @@ \
             \\end{align}$$' },
            ],
          ],
          type: 'equation',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
      ],
      'Linéaire du premier degré': [
        {
          description: 'Equation linéaire du premier degré',
          subdescription: 'Coefficients positifs - Second Membre nul',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&1x+&2=0',
            '&2+&1x=0',

          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;9]\\{&1}',
            },
          ],
          solutions: [
            ['#{-&2/&1}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                &1x\\textcolor{teal}{+&2}=0 \
              & \\quad \\lrArr \\quad \\textcolor{orange}{&1}x = \\textcolor{teal}{-&2}\\\\ \
              & \\quad \\lrArr \\quad x = \\frac{-&2}{\\textcolor{orange}{&1}}\\\\ \
              @@ pgcd(&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{-\\frac{&2}{&1}}} @@ \
              @@ pgcd(&2;&1) != 1 ?? & \\quad \\lrArr \\quad  x= -\\frac{&2}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&2/&1}}} @@ \
             \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
                \\textcolor{teal}{&2+}&1x=0 \
              & \\quad \\lrArr \\quad \\textcolor{orange}{&1}x = \\textcolor{teal}{-&2}\\\\ \
              & \\quad \\lrArr \\quad x = \\frac{-&2}{\\textcolor{orange}{&1}}\\\\ \
              @@ pgcd(&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{-\\frac{&2}{&1}}}} @@ \
              @@ pgcd(&2;&1) != 1 ?? & \\quad \\lrArr \\quad  x= -\\frac{&2}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&2/&1}}} @@ \
             \\end{align}$$' },
            ],

          ],
          type: 'equation',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Equation linéaire du premier degré',
          subdescription: 'Coefficients relatifs - Second membre nul',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&1x+&2=0',
            '&2+&1x=0',
            '&1x-&2=0',
            '-&2+&1x=0',
            '-&1x+&2=0',
            '&2-&1x=0',
            '-&1x-&2=0',
            '-&2-&1x=0',

          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;9]\\{&1}',
            },
          ],
          solutions: [
            ['#{-&2/&1}'],
            ['#{-&2/&1}'],
            ['#{&2/&1}'],
            ['#{&2/&1}'],
            ['#{&2/&1}'],
            ['#{&2/&1}'],
            ['#{-&2/&1}'],
            ['#{-&2/&1}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              &1x\\textcolor{teal}{+&2}=0 \
              & \\quad \\lrArr \\quad  \\textcolor{orange}{&1}x = \\textcolor{teal}{-&2} \\\\ \
              & \\quad \\lrArr \\quad  x = \\frac{-&2}{\\textcolor{orange}{&1}} \\\\ \
              @@ pgcd(&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&2/&1}}}} @@ \
            @@ pgcd(&2;&1) != 1 ?? & \\quad \\lrArr \\quad  x= -\\frac{&2}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&2/&1}}} @@ \
           \\end{align}$$' },
            ], [
              {
                text: '$$\\begin{align} \
            \\textcolor{teal}{&2}+&1x=0 \
            & \\quad \\lrArr \\quad  \\textcolor{orange}{&1}x = \\textcolor{teal}{-&2} \\\\ \
            & \\quad \\lrArr \\quad  x = \\frac{-&2}{\\textcolor{orange}{&1}} \\\\ \
            @@ pgcd(&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&2/&1}}}} @@ \
          @@ pgcd(&2;&1) != 1  ?? & \\quad \\lrArr \\quad  x= -\\frac{&2}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&2/&1}}} @@ \
         \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              &1x\\textcolor{teal}{-&2}=0 \
              & \\quad \\lrArr \\quad  \\textcolor{orange}{&1}x = \\textcolor{teal}{&2} \\\\ \
              @@ pgcd(&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} @@ \
            @@ pgcd(&2;&1) != 1  ?? & \\quad \\lrArr \\quad  x= \\frac{&2}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} @@ \
           \\end{align}$$' },
            ], [
              {
                text: '$$\\begin{align} \
            \\textcolor{teal}{-&2}+&1x=0 \
            & \\quad \\lrArr \\quad  \\textcolor{orange}{&1}x = \\textcolor{teal}{&2} \\\\ \
            @@ pgcd(&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} @@ \
          @@ pgcd(&2;&1) != 1  ?? & \\quad \\lrArr \\quad  x= \\frac{&2}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} @@ \
         \\end{align}$$' },
            ],

            [
              {
                text: '$$\\begin{align} \
              -&1x\\textcolor{teal}{+&2}=0 \
              & \\quad \\lrArr \\quad  \\textcolor{orange}{-&1}x = \\textcolor{teal}{-&2} \\\\ \
              & \\quad \\lrArr \\quad  x = \\frac{-&2}{\\textcolor{orange}{-&1}} \\\\ \
              @@ pgcd(&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}}} @@ \
            @@ pgcd(&2;&1) != 1 ?? & \\quad \\lrArr \\quad  x= \\frac{&2}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} @@ \
           \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
            \\textcolor{teal}{&2}-&1x=0 \
            & \\quad \\lrArr \\quad  \\textcolor{orange}{-&1}x = \\textcolor{teal}{-&2} \\\\ \
            & \\quad \\lrArr \\quad  x = \\frac{-&2}{\\textcolor{orange}{-&1}} \\\\ \
            @@ pgcd(&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}}} @@ \
          @@ pgcd(&2;&1) != 1  ?? & \\quad \\lrArr \\quad  x= \\frac{&2}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{&2/&1}}} @@ \
         \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              -&1x\\textcolor{teal}{-&2}=0 \
              & \\quad \\lrArr \\quad  \\textcolor{orange}{-&1}x = \\textcolor{teal}{&2} \\\\ \
              & \\quad \\lrArr \\quad  x = \\frac{&2}{\\textcolor{orange}{-&1}} \\\\ \
              @@ pgcd(&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&2/&1}}} @@ \
            @@ pgcd(&2;&1) != 1  ?? & \\quad \\lrArr \\quad  x= -\\frac{&2}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&2/&1}}} @@ \
           \\end{align}$$' },
            ], [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{-&2}-&1x=0 \
              & \\quad \\lrArr \\quad  \\textcolor{orange}{-&1}x = \\textcolor{teal}{&2} \\\\ \
              & \\quad \\lrArr \\quad  x = \\frac{&2}{\\textcolor{orange}{-&1}} \\\\ \
              @@ pgcd(&2;&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&2/&1}}} @@ \
            @@ pgcd(&2;&1) != 1  ?? & \\quad \\lrArr \\quad  x= -\\frac{&2}{&1} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{-&2/&1}}} @@ \
           \\end{align}$$' },
            ],


          ],
          type: 'equation',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Equation linéaire du premier degré',
          subdescription: 'Coefficients positifs  $$ax+b=c$$',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&3x+&2=&1',
            '&2+&3x=&1',

          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;&1-1]',
              '&3': '$e[2;9]',
            },

          ],
          solutions: [
            ['#{(&1-&2)/&3}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                &3x\\textcolor{teal}{+&2}=&1 \
              & \\quad \\lrArr \\quad &3x = &1\\textcolor{teal}{-&2} \\\\ \
              & \\quad \\lrArr \\quad \\textcolor{orange}{&3}x = %{&1-&2} \\\\ \
              @@ pgcd(&1-&2;&3) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1-&2)/&3}}} @@ \
              @@ pgcd(&1-&2;&3) != 1 ?? & \\quad \\lrArr \\quad  x= \\frac{%{&1-&2}}{\\textcolor{orange}{&3}} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1-&2)/&3}}} @@ \
             \\end{align}$$' },
            ],


          ],
          type: 'equation',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Equation linéaire du premier degré',
          subdescription: 'Coefficients relatifs',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&1x#s{&2}=&3',
            '&2#s{&1}x=&3',

          ],

          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$er[1;9]\\{&1}',
              '&3': '$er[1;9]\\{&2;-(&2)}',
            },

          ],
          solutions: [
            ['#{(&3-(&2))/(&1)}'],


          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              &1x\\textcolor{teal}{%s{&2}}=&3 \
              & \\quad \\lrArr \\quad  &1x = &3\\textcolor{teal}{%s{-(&2)}} \\\\  \
              & \\quad \\lrArr \\quad  \\textcolor{orange}{&1}x = %{&3-(&2)} \\\\ \
              & \\quad \\lrArr \\quad  x = \\frac{%{&3-(&2)}}{\\textcolor{orange}{&1}} \\\\ \
              @@ pgcd(abs(&3-(&2));&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&3-(&2))/(&1)}}} @@ \
            @@ pgcd(abs(&3-(&2));&1) != 1 && (&3-(&2))*(&1)>0  ?? & \\quad \\lrArr \\quad  x= \\frac{%{abs(&3-(&2))}}{%{abs(&1)}} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&3-(&2))/(&1)}}} @@ \
            @@ pgcd(abs(&3-(&2));&1) != 1 && (&3-(&2))*(&1)<0  ?? & \\quad \\lrArr \\quad  x= -\\frac{%{abs(&3-(&2))}}{%{abs(&1)}} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&3-(&2))/(&1)}}} @@ \
           \\end{align}$$' },
            ],
            [
              {
                text: '$$\\begin{align} \
              \\textcolor{teal}{&2}%s{&1}x=&3 \
              & \\quad \\lrArr \\quad  &1x = &3\\textcolor{teal}{%s{-(&2)}} \\\\  \
              & \\quad \\lrArr \\quad  \\textcolor{orange}{&1}x = %{&3-(&2)} \\\\ \
              & \\quad \\lrArr \\quad  x = \\frac{%{&3-(&2)}}{\\textcolor{orange}{&1}} \\\\ \
              @@ pgcd(abs(&3-(&2));&1) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&3-(&2))/(&1)}}} @@ \
            @@ pgcd(abs(&3-(&2));&1) != 1 && (&3-(&2))*(&1)>0  ?? & \\quad \\lrArr \\quad  x= \\frac{%{abs(&3-(&2))}}{%{abs(&1)}} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&3-(&2))/(&1)}}} @@ \
            @@ pgcd(abs(&3-(&2));&1) != 1 && (&3-(&2))*(&1)<0  ?? & \\quad \\lrArr \\quad  x= -\\frac{%{abs(&3-(&2))}}{%{abs(&1)}} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&3-(&2))/(&1)}}} @@ \
           \\end{align}$$' },
            ],
          ],
          type: 'equation',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Equation linéaire du premier degré',
          subdescription: 'Coefficients positifs - Avec second membre',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&3x+&2=&4x+&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;&1-1]',
              '&3': '$e[3;9]',
              '&4': '$e[1;&3-2]',
            },

          ],
          solutions: [
            ['#{(&1-&2)/(&3-&4)}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
                &3x\\textcolor{teal}{+&2}=\\textcolor{orange}{%{&4x}}+&1 \
              & \\quad \\lrArr \\quad &3x \\textcolor{orange}{-%{&4x}} = &1\\textcolor{teal}{-&2} \\\\ \
              & \\quad \\lrArr \\quad \\textcolor{violet}{%{&3-&4}}x = %{&1-&2} \\\\ \
              @@ pgcd(&3-&4;&1-&2) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1-&2)/(&3-&4)}}} @@ \
              @@ pgcd(&3-&4;&1-&2) != 1 ?? & \\quad \\lrArr \\quad  x= \\frac{%{&1-&2}}{\\textcolor{violet}{%{&3-&4}}} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1-&2)/(&3-&4)}}} @@ \
             \\end{align}$$' },
            ],


          ],
          type: 'equation',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
        {
          description: 'Equation linéaire du premier degré',
          subdescription: 'Coefficients relatifs - Avec second membre',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&3x#s{&2}=&4x#s{&1}',
          ],
          variables: [
            {
              '&1': '$er[1;9]',
              '&2': '$er[1;9]\\{&1}',
              '&3': '$er[2;9]',
              '&4': '$er[2;9]\\{&3}',
            },

          ],
          solutions: [
            ['#{(&1-(&2))/(&3-(&4))}'],
          ],
          correctionDetails: [
            [
              {
                text: '$$\\begin{align} \
              &3x\\textcolor{teal}{%s{&2}}=\\textcolor{orange}{&4x}%s{&1} \
              & \\quad \\lrArr \\quad &3x \\textcolor{orange}{%s{-(&4)x}} = &1\\textcolor{teal}{%s{-(&2)}} \\\\ \
              & \\quad \\lrArr \\quad  \\textcolor{violet}{%{&3-(&4)}}x = %{&1-(&2)} \\\\  \
              & \\quad \\lrArr \\quad  x = \\frac{%{&1-(&2)}}{\\textcolor{violet}{%{&3-(&4)}}} \\\\ \
              @@ pgcd(abs(&1-(&2));abs(&3-(&4))) = 1 ?? & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1-(&2))/(&3-(&4))}}} @@ \
            @@ pgcd(abs(&1-(&2));abs(&3-(&4))) != 1 && (&1-(&2))*(&3-(&4))>0  ?? & \\quad \\lrArr \\quad  x= \\frac{%{abs(&1-(&2))}}{%{abs(&3-(&4))}} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1-(&2))/(&3-(&4))}}} @@ \
            @@ pgcd(abs(&1-(&2));abs(&3-(&4))) != 1 && (&1-(&2))*(&3-(&4))<0  ?? & \\quad \\lrArr \\quad  x= -\\frac{%{abs(&1-(&2))}}{%{abs(&3-(&4))}} \\\\ & \\quad \\lrArr \\quad  x= \\enclose{roundedbox}[3px solid green]{\\textcolor{green}{%{(&1-(&2))/(&1-(&4))}}} @@ \
           \\end{align}$$' },
            ],
          ],
          type: 'equation',
          defaultDelay: 30,
          grade: QUATRIEME,
        },
      ]
    }
  },
}

const generateds = {}
const ids = {}
const themes = Object.getOwnPropertyNames(questions)

themes.forEach((theme, t_id) => {
  generateds[theme] = {}
  

  let domains = Object.getOwnPropertyNames(questions[theme])
  domains.forEach((domain, d_id) => {
    generateds[theme][domain] = {}
    let subdomains = Object.getOwnPropertyNames(questions[theme][domain])
    subdomains.forEach((subdomain, s_id) => {
      generateds[theme][domain][subdomain] = []
      let qs = questions[theme][domain][subdomain]
      qs.forEach((q, q_id) => {
        const id = code[t_id] + code[d_id] + code[s_id] + code[q_id+1]
        const newq = { ...q, id }
        console.log(theme, domain, subdomain,q_id+1, id)
        generateds[theme][domain][subdomain].push(newq)
        ids[id]={theme, domain, subdomain, level:q_id+1}
      })
    })
  })
})


// let data = JSON.stringify(generateds, null, 2);
// fs.writeFileSync('questionsWithIds.json', data);

console.log('generateds', generateds)
console.log('ids', ids)


export default {questions:generateds, ids}