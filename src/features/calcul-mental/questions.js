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

// * termes nuls
// require-no-null-terms = false
// no-penalty-for-null-terms = false


// * mélange des termes et facteurs
// shuffle-terms = false
// shuffle-factors = false
// shuffle-terms-and-factors = false
// shallow-shuffle-terms = false
// shallow-shuffle-factors = false



export default {
  Entiers: {
    Apprivoiser: {
      Ecriture: [{
        description: 'Ecrire un grand nombre entier avec des espaces',
        enounces: ["Réécris ce nombre  entiers  en rajoutant des espaces pour former des groupes de 3 chiffres."],
        expressions: ['&2'],
        variables: [
          { '&1': '$e[4;10]', '&2': '$e{&1;&1}' },
        ],
        options: ['exp-no-spaces', 'require-correct-spaces'],
        type: 'rewrite',
        defaultDelay: 1,
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
      },


      ],
      Décomposition: [
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
        },
        {
          description: "Nombre entier -> décomposition décimale",
          enounces: ["Donne la décomposition décimale de ce nombre. Exemple : $$345 = (3 \\times 100) +(4 \\times 10) + 5$$."],
          expressions: [
            '#{&2*100 + &3*10 + &4}',
            // '#{(&1*1000) +  (&2*100) + (&3*10) + &4}',
          ],
          variables: [
            {
              '&1': '$e[0;9]',
              '&2': '$e[0;9]',
              '&3': '$e[0;9]',
              '&4': '$e[0;9]',
            },
          ],
          solutions: [['&2*100 + &3*10 + &4']],
          // solutions:[['&1*1000 +  &2*100 + &3*10 + &4']],
          options: ['no-penalty-for-extraneous-brackets'],
          type: 'rewrite',
          defaultDelay: 20,
        },
      ],
      Comparer: [
        {
          description: "Comparer deux nombres entiers",
          enounces: ["Quel est le plus petit de ces 2 nombres ?"],
          variables: [
            {
              '&1': '$e[1;4]',
              '&2': '$e{&1;&1}',
              '&3': '$e{&1;&1}',
              '&4': '$e{5-&1;5-&1}',
              '&5': '&2+&4*10^&1',
              '&6': '&3+&4*10^&1',

            },

          ],
          conditions: ['&5!=&6'],
          choices: [
            ['$$%%{&5}$$', '$$%%{&6}$$'],
          ],
          corrections: [
            'Entre $$%%{&5}$$ et $$%%{&6}$$ le plus petit est ',
          ],
          solutions: [
            ['&5<&6 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 20,
        },
      ]

    },
    Additionner: {
      Somme: [
        {
          description: 'Calculer une somme',
          subdescription:
            'Nombres entiers à 1 chiffre (sans retenue)',
          enounces: ["Calcule."],
          expressions: ['&1 + &2', '&1 + &2'],
          variables: [
            { '&1': '$e[5;7]', '&2': '$e[2;9-&1]' },
            { '&1': '$e[2;4]', '&2': '$e[2;9-&1]' },
          ],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Nombres entiers à 2 chiffres (sans retenue)',
          enounces: ["Calcule."],
          expressions: [
            '#{&1*10 + &2} + #{&3*10 + &4}',
            '#{&1*10 + &2} + #{&3*10 + &4}',
            '#{&1*10 + &2} + #{&3*10 + &4}',
            '#{&1*10 + &2} + #{&3*10 + &4}',
          ],
          variables: [
            {
              '&1': '$e[5;7]',
              '&3': '$e[2;9-&1]',
              '&2': '$e[5;7]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[2;4]',
              '&3': '$e[2;9-&1]',
              '&2': '$e[2;4]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[5;7]',
              '&3': '$e[2;9-&1]',
              '&2': '$e[2;4]',
              '&4': '$e[2;9-&2]',
            },
            {
              '&1': '$e[2;4]',
              '&3': '$e[2;9-&1]',
              '&2': '$e[5;7]]',
              '&4': '$e[2;9-&2]',
            },
          ],
          type: 'result',
          defaultDelay: 20,
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
        },
        {
          description: 'Calculer une somme',
          subdescription:
            'Nombres entiers à 1 chiffre (avec retenue)',
          enounces: ["Calcule."],
          expressions: ['&1 + &2'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[11-&1;9]' }],
          type: 'result',
          defaultDelay: 20,
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
        },
      ],
      Complément: [
        {
          description: 'Trouver le complément',
          subdescription: 'Complément à 10',
          enounces: ["Quel est le terme manquant dans cette égalité ?"],
          expressions: ['?+&1=10', '&1+?=10'],
          solutions: [['#{10-&1}']],
          variables: [{ '&1': '$e[1;9]' }],
          type: 'trou',
          details: [['10-&1']],
          defaultDelay: 20,
        },
        {
          description: 'Trouver le complément',
          subdescription: 'Complément à 100',
          enounces: ["Quel est le terme manquant dans cette égalité ?"],
          expressions: ['?+&1=100', '&1+?=100'],
          solutions: [['#{100-&1}']],
          variables: [{ '&1': '$e[1;99]' }],
          details: [['100-&1']],
          type: 'trou',
          defaultDelay: 20,
        },
        {
          description: 'Trouver le complément',
          subdescription: "Complément d'un nombre de dizaines",
          enounces: ["Quel est le terme manquant dans cette égalité ?"],
          expressions: ['?+&2=#{&1*10}', '&2+?=#{&1*10}'],
          solutions: [['#{&1*10-&2}']],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;&1*10-2]' }],
          details: [['#{&1*10}-&2']],
          type: 'trou',
          defaultDelay: 20,
        },
        {
          description: 'Trouver le complément',
          subdescription: 'Complément à 1000',
          enounces: ["Quel est le terme manquant dans cette égalité ?"],
          expressions: ['?+&1=1000', '&1+?=1000'],
          solutions: [['#{1000-&1}']],
          variables: [{ '&1': '$e[1;999]' }],
          details: [['1000-&1']],
          type: 'trou',
          defaultDelay: 15,
        },
      ],
      'A trou': [
        {
          description: 'Compléter une égalité',
          subdescription:
            'Nombres entiers à 1 chiffre (sans retenue)',
          enounces: ["Quel est le terme manquant dans cette égalité ?"],
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
          defaultDelay: 20,
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
        },
      ],
      'Somme astucieuse': [
        {
          description: 'Ajouter 19, 29, 39, ....',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '#{&4}+#{&5}',
            '#{&5}+#{&4}',
          ],
          details: [
            [
              '#{&4}+\\textcolor{green}{#{&5}}',
              '#{&4}+\\textcolor{green}{#{&5+1}-1}',
              '#{&4+&5+1}-1',
            ],
            [
              '\\textcolor{green}{#{&5}}+#{&4}',
              '\\textcolor{green}{#{&5+1}-1}+#{&4}',
              '\\textcolor{orange}{#{&5+1}}-1+\\textcolor{orange}{#{&4}}',
              '\\textcolor{orange}{#{&4+&5+1}}-1',
            ],
          ],
          variables: [{
            '&1': '$e[1;7]',
            '&2': '$e[1;8-&1]',
            '&3': '$e[1;8]',
            '&4': '&2*10+&3',
            '&5': '&1*10+9'
          }],
          type: 'result',
          defaultDelay: 20,
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
          details: [
            [
              '\\textcolor{green}{&1}+\\textcolor{green}{#{10-&1}}+\\textcolor{orange}{&2}+\\textcolor{orange}{#{10-&2}}+&3',
              '\\textcolor{green}{10}+\\textcolor{orange}{10}+&3',
            ],
            [
              '\\textcolor{green}{&1}+\\textcolor{green}{#{10-&1}}+\\textcolor{orange}{&2}+&3+\\textcolor{orange}{#{10-&2}}',
              '\\textcolor{green}{10}+\\textcolor{orange}{10}+&3',
            ],
            [
              '\\textcolor{green}{&1}+\\textcolor{green}{#{10-&1}}+&3+\\textcolor{orange}{&2}+\\textcolor{orange}{#{10-&2}}',
              '\\textcolor{green}{10}+&3+\\textcolor{orange}{10}',
            ],
            [
              '\\textcolor{green}{&1}+&3+\\textcolor{green}{#{10-&1}}+\\textcolor{orange}{&2}+\\textcolor{orange}{#{10-&2}}',
              '\\textcolor{green}{10}+&3+\\textcolor{orange}{10}+\\textcolor{orange}{#{10-&2}}',
            ],
            [
              '&3+\\textcolor{green}{&1}+\\textcolor{green}{#{10-&1}}+\\textcolor{orange}{&2}+\\textcolor{orange}{#{10-&2}}',
              '&3+\\textcolor{green}{10}+\\textcolor{orange}{10}',
            ],
          ],
          variables: [{ '&1': '$e{1}', '&2': '$e{1}', '&3': '$e{1}' }],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Additionner par regroupements',
          subdescription: '3 Nombres à 2 chiffres',
          enounces: ['Calcule de manière astucieuse.'],
          details: [
            [
              '\\textcolor{green}{#{&6}}+\\textcolor{green}{#{&1*10-(&6)}}+#{&7}',
              '\\textcolor{green}{#{&1*10}}+#{&7}',
            ],
            [
              '\\textcolor{green}{#{&6}}+#{&7}+\\textcolor{green}{#{&1*10-(&6)}}',
              '#{&7}+\\textcolor{green}{#{&1*10}}',
            ],
            [
              '#{&7}+\\textcolor{green}{#{&6}}+\\textcolor{green}{#{&1*10-(&6)}}',
              '#{&7}+\\textcolor{green}{#{&1*10}}',
            ],
          ],
          expressions: [
            '#{&6}+#{&1*10-(&6)}+#{&7}',
            '#{&6}+#{&7}+#{&1*10-(&6)}',
            '#{&7}+#{&6}+#{&1*10-(&6)}',
          ],
          variables: [
            {
              '&1': '$e[3;9]',
              '&2': '$e[1;&1-2]',
              '&3': '$e{1}',
              '&4': '$e{1}',
              '&5': '$e{1}',
              '&6': '&2*10+&3',
              '&7': '&4*10+&5',
            },
          ],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Additionner par regroupements',
          subdescription: 'Nombres à 3 chiffres',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: [
            '&1+#{1000-&1}+&2',
            '&1+&2+#{1000-&2}',
            '&1+&2+#{1000-&1}',
          ],
          details: [
            [
              '\\textcolor{green}{&1}+\\textcolor{green}{#{1000-&1}}+&2',
              '\\textcolor{green}{1000}+&2',
            ],
            [
              '&1+\\textcolor{green}{&2}+\\textcolor{green}{#{1000-&2}}',
              '&1+\\textcolor{green}{1000}',
            ],
            [
              '\\textcolor{green}{&1}+&2+\\textcolor{green}{#{1000-&1}}',
              '\\textcolor{green}{1000}+&2',
            ],
          ],
          variables: [{ '&1': '$e{3;3}', '&2': '$e{3;3}' }],
          type: 'result',
          defaultDelay: 20,
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
          solutions: [['#{&1-&2}']],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: 'Nombres à 2 chiffres (sans retenue)',
          enounces: ['Calcule.'],
          expressions: ['#{ &1*10 + &2 } - #{ &3*10 + &4 }'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[5;9]',
              '&3': '$e[1;&1-1]',
              '&4': '$e[1;&2-1]',
            },
          ],
          solutions: [['#{&1*10 + &2 -  (&3*10 + &4)}']],
          defaultDelay: 15,
          type: 'result',
        },
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: 'Nombres à 3 chiffres (sans retenue)',
          enounces: ['Calcule.'],
          expressions: ['#{ &1*100 + &2*10 + &3 } - #{ &4*100 + &5*10 + &6 }'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[5;9]',
              '&4': '$e[1;&1-1]',
              '&5': '$e[1;&2-1]',
              '&6': '$e[1;&3-1]',
            },
          ],
          solutions: [['#{ &1*100 + &2*10 + &3 -( &4*100 + &5*10 + &6 )}']],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: '2 nombres à 1 chiffres (avec retenue)',
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
        },
      ],
      'A trou': [
        {
          description: 'Compléter une soustraction à trou (résultat positif)',
          subdescription: 'Nombres à 1 chiffre',
          enounces: ['Quel est le nombre manquant dans cette égalité ?'],
          expressions: ['?-&1=&2', '&1-?=&2'],
          variables: [
            { '&1': '$e[2;8]', '&2': '$e[1;9-&1]' },
            { '&1': '$e[2;9]', '&2': '$e[1;&1-1]' },
          ],
          solutions: [['#{&1+&2}'], ['#{&1-&2}']],
          details: [['&1+&2'], ['&1-&2']],
          type: 'trou',
          defaultDelay: 20,
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
        },
      ],
      'Différence astucieuse': [
        {
          description: 'Soustraire 9, 19, 29, ....',
          expressions: [
            '#{&4+&5}-#{&5}',
          ],
          enounces: ['Calcule de manière astucieuse.'],
          details: [
            [
              '#{&4+&5}-\\textcolor{green}{#{&5}}',
              '#{&4+&5}-\\textcolor{green}{\\left( #{&5+1}-1 \\right)}',
              '#{&4+&5}-\\textcolor{green}{#{&5+1}+1}',
              '#{&4-1}+1',

            ],
          ],
          variables: [{
            '&1': '$e[0;7]',
            '&2': '$e[1;8-&1]',
            '&3': '$e[1;8]',
            '&4': '&2*10+&3',
            '&5': '&1*10+9'
          }],
          type: 'result',
          defaultDelay: 20,
        },
      ]
    },
    Multiplier: {
      Tables: [
        {
          description: "Table de multiplication",
          subdescription: 'Par 2',
          enounces: ['Calcule.'],
          expressions: ['2*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 3',
          enounces: ['Calcule.'],
          expressions: ['3*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 4',
          enounces: ['Calcule.'],
          expressions: ['4*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 5',
          enounces: ['Calcule.'],
          expressions: ['5*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 6',
          enounces: ['Calcule.'],
          expressions: ['6*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 7',
          enounces: ['Calcule.'],
          expressions: ['7*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 8',
          enounces: ['Calcule.'],
          expressions: ['8*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
        },
        {
          description: "Table de multiplication",
          subdescription: 'Par 9',
          enounces: ['Calcule.'],
          expressions: ['9*&1'],
          variables: [{ '&1': '$e[2;12]' }],
          type: 'result',
          defaultDelay: 6,
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
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Un facteur à 2 chiffres',
          enounces: ['Calcule.'],
          expressions: ['&1*&2', '&2*&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[12;99]' }],
          type: 'result',
          defaultDelay: 30,
        },


        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Un facteur à 3 chiffres',
          enounces: ['Calcule.'],
          expressions: ['&1*&2', '&2*&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[102;999]' }],
          type: 'result',
          defaultDelay: 30,
        },
      ],
      'Produits particuliers': [
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
        },

        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Multiplication par 50',
          enounces: ['Calcule.'],
          expressions: ['#{&1*2+1}*50', '#{&1*2}*50'],
          type: 'result',
          details: [
            [
              '\\textcolor{green}{#{&1*2} \\times 50}+ \\textcolor{orange}{1 \\times 50}',
              '\\textcolor{green}{&1 \\times (2 \\times 50)}+\\textcolor{orange}{50}',
              '\\textcolor{green}{&1 \\times 100}+\\textcolor{orange}{50}',
              '\\textcolor{green}{#{&1*100}}+\\textcolor{orange}{50}',
            ],
            [
              '#{&1*2} \\times 50',
              '&1 \\times (2 \\times 50)',
              '&1 \\times #{2*50}',
            ],
          ],
          variables: [{ '&1': '$e[2;10]' }],
          defaultDelay: 20,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Multiplication par 25',
          enounces: ['Calcule.'],
          expressions: ['#{&1*4+&2}*25', '#{&1*4}*25'],
          type: 'result',
          details: [
            [
              '\\textcolor{green}{#{&1*4} \\times 25}+ \\textcolor{orange}{&2 \\times 25}',
              '\\textcolor{green}{&1 \\times (4 \\times 25)}+\\textcolor{orange}{#{&2*25}}',
              '\\textcolor{green}{&1 \\times 100}+\\textcolor{orange}{#{&2*25}}',
              '\\textcolor{green}{#{&1*100}}+\\textcolor{orange}{#{&2*25}}',
            ],
            [
              '#{&1*4} \\times 25',
              '&1 \\times (4 \\times 25)',
              '&1 \\times 100',
            ],
          ],
          variables: [{ '&1': '$e[2;10]', '&2': '$e[1;3]' }],
          defaultDelay: 20,
        },
      ],
      'Puissances de 10': [
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Multiplication par 10, 100 ou 1000',
          enounces: ['Calcule.'],
          expressions: ['&1*#{10^&2}'],
          variables: [{ '&1': '$e[2;99]', '&2': '$e[1;3]' }],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription:
            'Les 2 facteurs sont des multiples de 10, 100 ou 1000',
          enounces: ['Calcule.'],
          expressions: ['#{&1*10^&2}*#{&3*10^&4}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[1;3]',
              '&3': '$e[2;9]',
              '&4': '$e[1;3]',
            },
          ],
          type: 'result',
          defaultDelay: 20,
        },
      ],
      'A trou': [
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Facteurs à 1 chiffre',
          enounces: ['Quel est le facteur manquant dans cette égalité ?'],
          expressions: ['?*&1=#{&1*&2}', '&1*?=#{&1*&2}'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[3;9]' }],
          solutions: [['&2']],
          type: 'trou',
          defaultDelay: 20,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Produits classiques',
          enounces: ['Quel est le facteur manquant dans cette égalité ?'],
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
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription:
            'Les 2 facteurs sont des multiples de 10, 100 ou 1000',
          enounces: ['Quel est le facteur manquant dans cette égalité ?'],
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
        },
      ],

      'Carrés - Racines carrées': [
        {
          description: 'Calculer un carré',
          subdescription: 'Entier de 1 à 15',
          enounces: ['Calcule.'],
          expressions: ['&1^2'],
          variables: [{ '&1': '$e[2;15]' }],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Trouver une racine carré',
          subdescription: 'Entier de 1 à 15',
          enounces: ['Calcule.'],
          expressions: ['?^2=#{&1^2}'],
          variables: [{ '&1': '$e[2;15]' }],
          solutions: [['&1']],
          type: 'trou',
          defaultDelay: 20,
        },
        {
          description: 'Réduire une racine carré',
          enounces: ['Réduis sous la forme $$a\\sqrt{b}$$'],
          expressions: ['sqrt(#{&1*&1*&2})'],
          variables: [{ '&1': '$l{2;3;5;10}', '&2': '$l{2;3;5}' }],
          // solutions: [['&1sqrt(&2)']],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Réduire une expression avec des racines carré',
          enounces: ['Réduis sous la forme $$a\\sqrt{b}$$'],
          expressions: ['sqrt(#{&1*&1*&3})+sqrt(#{&2*&2*&3})'],
          variables: [{ '&1': '$l{2;3;5;10}', '&2': '$l{2;3;5;10}\\{&1}', '&3': '$l{2;3;5}' }],
          // solutions: [['&1sqrt(&2)']],
          type: 'result',
          defaultDelay: 20,
        },
      ],

      'Produits astucieux': [
        {
          description: 'Calculer astucieusement un produit',
          subdescription: 'Utiiser 2 facteurs dont le produit est 100',
          enounces: ['Calcule de manière astucieuse.'],
          expressions: ['&1*#{&2}*&3', '#{&2}*&1*&3', '#{&2}*&3*&1', '&1*&3*#{&2}', '&3*&1*#{&2}', '&3*#{&2}*&1',],
          variables: [{ '&1': '$l{20;25;50}', '&2': '100:&1', '&3': '$e[11;99]' }],
          type: 'result',
          defaultDelay: 20,
        },
      ],
      Distributivité: [
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Multiplication par 11',
          enounces: ["Calcule  à l'aide d'un développement"],
          expressions: ['11*&1'],
          variables: [{ '&1': '$e[12;40]' }],
          details: [['10 \\times &1 + &1', '#{10*&1} + &1']],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Multiplication par 99',
          enounces: ["Calcule  à l'aide d'un développement"],
          expressions: ['99*&1'],
          variables: [{ '&1': '$e[15;40]' }],
          details: [['100 \\times &1 - &1', '#{100*&1} - &1']],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Multiplication par 12',
          enounces: ["Calcule  à l'aide d'un développement"],
          expressions: ['12*&1'],
          variables: [{ '&1': '$e[13;40]' }],
          details: [['10 \\times &1 + 2 \\times &1', '#{10*&1} + #{2*&1}']],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Utiliser la distributivité',
          enounces: ["Calcule  à l'aide d'un développement"],
          subdescription: 'Multiplication par 98',
          expressions: ['98*&1'],
          variables: [{ '&1': '$e[15;40]' }],
          details: [['100 \\times &1 - 2 \\times &1', '#{100*&1} - #{2*&1}']],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Factorisation pour obtenir 100',
          enounces: ["Calcule  à l'aide d'une factorisation"],
          expressions: [
            '&2*&1+#{100-&2}*&1',
            '&1*&2+#{100-&2}*&1',
            '&2*&1+&1*#{100-&2}',
            '&1*&2+&1*#{100-&2}',
          ],
          variables: [{ '&1': '$e[21;99]', '&2': '$e[2;98]' }],
          details: [
            [
              '&2 \\times \\textcolor{orange}{&1}+#{100-&2} \\times \\textcolor{orange}{&1}',
              '\\textcolor{orange}{&1} \\times (&2+#{100-&2})',
              '&1 \\times 100',
            ],
            [
              '\\textcolor{orange}{&1}  \\times &2 +#{100-&2} \\times \\textcolor{orange}{&1}',
              '\\textcolor{orange}{&1} \\times (&2+#{100-&2})',
              '&1 \\times 100',
            ],
            [
              '&2 \\times \\textcolor{orange}{&1}+\\textcolor{orange}{&1} \\times #{100-&2}',
              '\\textcolor{orange}{&1} \\times (&2+#{100-&2})',
              '&1 \\times 100',
            ],
            [
              '\\textcolor{orange}{&1} \\times &2+\\textcolor{orange}{&1} \\times #{100-&2}',
              '\\textcolor{orange}{&1} \\times (&2+#{100-&2})',
              '&1 \\times 100',
            ],
          ],
          type: 'result',
          defaultDelay: 20,
        },
      ],
      Décomposition: [
        {
          description: 'Décomposer un entier en produit',
          subdescription: 'Produit de deux nombres entiers',
          enounces: ["Décompose ce nombre en un produit de 2 facteurs (1 n'est un facteur autorisé)."],
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
        },
      ],
      'A trou': [
        {
          description: 'Compléter une division à trou ',
          subdescription: 'Trouver le dividende',
          enounces: ["Quel est le nombre manquant dans cette égalité ?"],
          expressions: ['?:&2=&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          solutions: [['#{&1*&2}']],
          details: [['&1 \\times &2']],
          type: 'trou',
          defaultDelay: 20,
        },
        {
          description: 'Compléter une division à trou ',
          subdescription: 'Trouver le diviseur',
          enounces: ["Quel est le nombre manquant dans cette égalité ?"],
          expressions: ['#{&1*&2}:?=&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          solutions: [['&2']],
          details: [['#{&1*&2} \\div &1']],
          type: 'trou',
          defaultDelay: 20,
        },

      ],
      'Divisibilité': [
        {
          description: 'Effectuer une division euclidienne ',
          enounces:
            ["Ecris l'expression correspondant à la division euclidienne de $$#{&1*&2+&3}$$ par $$&2$$."],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[1;&2-1]' }],
          expressions: ['#{&1*&2+&3}'],
          solutions: [['&1 * &2+&3']],
          options: ['no-exp'],
          type: 'decomposition',
          defaultDelay: 30,
        },
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
            uncorrect: ['<span style="color:green;">$$&1$$</span> et <span style="color:green;">$$&2$$</span> sont des diviseurs de $$%{&1*&2}$$']
          }],
          defaultDelay: 30,
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
            uncorrect: ['<span style="color:green;">$$&1$$</span> et <span style="color:green;">$$&2$$</span> sont des diviseurs de $$%{&1*&2}$$']
          }],

          defaultDelay: 30,
        },
        {
          description: 'Utiliser un critère de divisibilité',
          subdescription: 'Par 2',
          enounces:
            ["Le nombre $$%{&1}$$ est-il divisible par 2 ?"],
          variables: [{ '&1': '2*$e{3}' }, { '&1': '2*$e{3}+1' }],

          type: 'choice',
          choices: [
            ['Oui', 'Non'],
          ],
          // corrections: [
          //   'Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est ',
          // ],
          solutions: [
            ['mod(&1;2)=0 ?? 0 :: 1'],
          ],
          correctionFormat: [{
            correct: ['$$2$$ est un diviseur de $$%{&1}$$ ? &solution'],
            uncorrect: ['$$2$$ est un diviseur de $$%{&1}$$ ? &solution']
          }],

          defaultDelay: 30,
        },
        {
          description: 'Utiliser un critère de divisibilité',
          subdescription: 'Par 3',
          enounces:
            ["Le nombre $$%{&1}$$ est-il divisible par 3 ?"],
          variables: [{ '&1': '3*$e[21;333]' }, { '&1': '3*$e[21;333]+$e[1;2]' }],

          type: 'choice',
          choices: [
            ['Oui', 'Non'],
          ],
          // corrections: [
          //   'Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est ',
          // ],
          solutions: [
            ['mod(&1;3)=0 ?? 0 :: 1'],
          ],
          correctionFormat: [{
            correct: ['$$3$$ est un diviseur de $$%{&1}$$ ? &solution'],
            uncorrect: ['$$3$$ est un diviseur de $$%{&1}$$ ? &solution']
          }],

          defaultDelay: 30,
        },
        {
          description: 'Utiliser un critère de divisibilité',
          subdescription: 'Par 5',
          enounces:
            ["Le nombre $$%{&1}$$ est-il divisible par 5 ?"],
          variables: [{ '&1': '5*$e{3}' }, { '&1': '5*$e{5}+$e[1;4]' }],

          type: 'choice',
          choices: [
            ['Oui', 'Non'],
          ],
          // corrections: [
          //   'Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est ',
          // ],
          solutions: [
            ['mod(&1;5)=0 ?? 0 :: 1'],
          ],
          correctionFormat: [{
            correct: ['$$5$$ est un diviseur de $$%{&1}$$ ? &solution'],
            uncorrect: ['$$5$$ est un diviseur de $$%{&1}$$ ? &solution']
          }],

          defaultDelay: 30,
        },
        {
          description: 'Utiliser un critère de divisibilité',
          subdescription: 'Par 10',
          enounces:
            ["Le nombre $$%{&1}$$ est-il divisible par 10 ?"],
          variables: [{ '&1': '10*$e{3}' }, { '&1': '10*$e{5}+$e[1;9]' }],

          type: 'choice',
          choices: [
            ['Oui', 'Non'],
          ],
          // corrections: [
          //   'Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est ',
          // ],
          solutions: [
            ['mod(&1;10)=0 ?? 0 :: 1'],
          ],
          correctionFormat: [{
            correct: ['$$10$$ est un diviseur de $$%{&1}$$ ? &solution'],
            uncorrect: ['$$10$$ est un diviseur de $$%{&1}$$ ? &solution']
          }],

          defaultDelay: 30,
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
            '#{&1*&2*&3}:(&1*&2)',
            '#{&1+&2+&3}-(&1+&2)',
          ],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;11-&1]', '&3': '$e[2;9]' },
            { '&1': '$e[2;9]', '&2': '$e[2;11-&1]', '&3': '$e[2;9]' },
            { '&1': '$e[4;9]', '&2': '$e[2;&1-2]', '&3': '$e[2;9]' },
            { '&1': '$e[4;9]', '&2': '$e[2;&1-2]', '&3': '$e[2;9]' },
            { '&1': '$e[2;7]', '&2': '$e[2;9-&1]', '&3': '$e[2;9]' },
            { '&1': '$e[4;9]', '&2': '$e[2;&1-2]', '&3': '$e[2;9]' },
            { '&1': '$e[4;9]', '&2': '$e[2;&1-2]', '&3': '$e[2;9]' },
            { '&1': '$l{2;3}', '&2': '$l{2;3}', '&3': '$e[2;9]' },
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]' },

          ],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Calculer une expression avec parenthèses',
          subdescription: '2 expressions parenthèsées (imbriquées ou non)',
          enounces: ["Calcule."],
          expressions: [
            '(&1+&2)*(&3+&4)',
            '(&1-&2)*(&3+&4)',
            '(&3+&4)*(&1-&2)',
            '((#{&1*&3}+#{&2*&3}):&3)*&4'


          ],
          variables: [
            { '&1': '$e[2;7]', '&2': '$e[2;9-&1]', '&3': '$e[2;7]', '&4': '$e[2;9-&3]' },
            { '&1': '$e[4;9]', '&2': '$e[2;&1-2]', '&3': '$e[2;7]', '&4': '$e[2;9-&3]' },
            { '&1': '$e[4;9]', '&2': '$e[2;&1-2]', '&3': '$e[2;7]', '&4': '$e[2;9-&3]' },
            { '&1': '$e[2;7]', '&2': '$e[2;9-&1]', '&3': '$e[2;9]', '&4': '$e[2;9]' },

          ],
          type: 'result',
          defaultDelay: 20,
        },
      ],
      'Sans parenthèses': [
        {
          description: 'Calculer une expression sans parenthèses',
          subdescription: "Priorité de la multiplication et de la division sur l'addition et la soustraction",
          enounces: ["Calcule."],
          expressions: [
            '&1+&2*&3',
            '#{&1*&2+&3}-&1*&2',
            '&1+#{&2*&3}:&3',
            '#{&2+&4}-#{&2*&3}:&3',
            '&2*&3+&1',
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
          type: 'result',
          defaultDelay: 20,
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
          type: 'result',
          defaultDelay: 20,
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
            { '&1': '$e[2;8]', '&2': '$e[2;8]', },

          ],
          type: 'result',
          defaultDelay: 20,
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
            '&1': '$e[2;9]',
            '&2': '$e[2;9]',
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
          type: 'enonce',
          defaultDelay: 20,
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
            '&2': '$e[2;9]',
            '&3': '$e[2;9]',
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
          type: 'enonce',
          defaultDelay: 20,
        },
      ]


    }
  },
  Décimaux: {
    Apprivoiser: {
      'Ecriture fractionnaire': [
        {
          description: 'Traduire une fraction décimale en nombre décimal ',
          subdescription:
            'Simple',
          enounces: ['Quelle est la forme décimale de cette fraction ?'],
          variables: [
            {
              '&1': '$e[1;3]',
              '&2': '$e{1;1};]'
            },
          ],
          expressions: ['&2/#{10^&1}'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20
        },
        {
          description: 'Traduire une fraction décimale en nombre décimal ',
          subdescription: "Débordementsur l'unité supérieur",
          enounces: ['Quelle est la forme décimale de cette fraction ?'],
          variables: [
            {
              '&1': '$e[1;3]',
              '&2': '$e{1;&1};]'
            },
          ],
          expressions: ['&2/#{10^&1}'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20
        },
        {
          description: 'Traduire une somme de fraction décimale en nombre décimal ',
          subdescription: 'Décomposition en fractions décimales vers nombre décimal',
          enounces: ['Quel est le nombre décimal égal à cette expression ?'],
          variables: [
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '$e{1;1}',
              '&4': '$e{1;1}',
            },
          ],
          expressions: ['&1+&2/10+&3/100+&4/1000'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20
        },
        {
          description: 'Traduire une somme de fractions décimales en nombre décimal',
          subdescription: 'Décomposition (mélangée) en fractions décimales vers nombre décimal',
          enounces: ['Quel est le nombre décimal égal à cette expression ?'],
          variables: [
            {
              '&1': '$e{1;1}',
              '&2': '$e{1;1}',
              '&3': '$e{1;1}',
              '&4': '$e{1;1}',
            },
          ],
          expressions: [
            '&1+&2/10+&3/100+&4/1000',
          ],
          options: ['shuffle-terms'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20
        },
      ],
      'Comparer': [
        {
          description: "Comparer deux nombres décimaux",
          subdescription: "",
          enounces: ["Quel est le plus petit de ces 2 nombres ?"],
          variables: [
            {
              '&1': '$e{3;3}',
              '&2': '$e{1;3}',
              '&3': '$e{1;3}',
              '&4': '$e[1;9]',
              '&5': '$e[1;9]',
              '&6': '&1*1000+&2+&4/10',
              '&7': '&1*1000+&3+&5/10',
            },
            {
              '&1': '$e[1;3]',
              '&2': '$e[1;3]',
              '&3': '$e{&1;&1}',
              '&4': '$e{&2;&2}',
              '&5': '$e[1;9]',
              '&6': '&5+&3/10^&1',
              '&7': '&5+&4/10^&2',
            },
          ],
          conditions: ['&6!=&7'],
          choices: [
            ['$$%%{&6}$$', '$$%%{&7}$$'],
          ],
          corrections: [
            'Entre $$%%{&6}$$ et $$%%{&7}$$ le plus petit est ',
          ],
          solutions: [
            ['&6<&7 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 20,
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
        },
      ],
      'A trou': [
        {
          description: 'Compléter une addition à trou ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (pas de retenue)',
          enounces: ['Quel est le terme manquant dans cette égalité ?'],
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
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Parties décimales à 1 et 2 chiffres (pas de retenue)',
          enounces: ['Quel est le terme manquant dans cette égalité ?'],
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
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenue pour la partie decimale)',
          enounces: ['Quel est le terme manquant dans cette égalité ?'],
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
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenues)',
          enounces: ['Quel est le terme manquant dans cette égalité ?'],
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
        },
      ],
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
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Un des facteurs est un entier',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$d{1;2}',
            },
          ],
          expressions: ['&1*&2', '&2*&1'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
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

            },
          ],
          options: ['no-exp'],
          expressions: ['##{&3:10^(&1-1)}*##{&4:10^(&2-1)}'],
          expressions2: ['##{&3:10^(&1-1)}*##{&4:10^(&2-1)}=#{&3*&4}'],
          conditions: ['mod(&3*&4;10)!=0'],
          solutions: [['##{&3*&4:10^(&1+&2-2)}']],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
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
        },
      ],
      'Produit particulier': [
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
          'result-type': 'decimal',
          defaultDelay: 20,
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
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
        },

      ],
      'Puissances de 10': [
        {
          description: 'Calculer un produit',
          subdescription: 'Multiplier par 10, 100 ou 1000',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$d{$e[1;2];$e[0;3]}',
              '&2': '$l{10;100;1000}',
              '&3': '$l{$e[1;9];$e[11;99];$e[101;999]}:1000',
            },
          ],
          expressions: ['##{&3}*&2', '&1*&2'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Multiplier par 0,1 ; 0,01 ou 0,001',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$d{$e[1;3];$e[0;2]}',
              '&2': '$l{0.1;0.01;0.001}',
            },
          ],
          expressions: ['&1*##{&2}', '##{&2}*&1'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
        },

      ]
    },
    Diviser: {
      Quotient: [
        {
          description: 'Calculer un quotient',
          subdescription: 'Diviser par 10, 100 ou 1000',
          enounces: ['Calcule.'],
          variables: [
            {
              '&1': '$d{$e[1;3];$e[0;2]}',
              '&2': '$l{10;100;1000}',
            },
          ],
          expressions: ['&1:&2'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
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
          expressions: ['##{&3}:##{&2}', '&1:##{&2}'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
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
          details: [['##{&1*&2}:##{&1}']],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
        },
      ],
    },
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
        },

        {
          description: 'Calculer avec des unités',
          subdescription: "",
          enounces: [
            " Calcule et donne le résutat en mètres (m)",
            " Calcule et donne le résutat en mètres (g)",
            " Calcule et donne le résutat en mètres (L)",
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
        },

      ]


    }
  },
  Relatifs: {
    'Apprivoiser': {
      "La définition d'un nombre négatif": [
        {
          description: "Nombre négatif défini par une soustraction",
          enounces: ["Quel est le résultat de $$0-&1$$ ?", "Quelle est la soustraction définissant le nombre $$-&1$$ ?"],
          expressions: ['-&1', '0-&1'],
          options: ['no-exp'],
          variables: [
            { '&1': '$e[2;20]' },
          ],
          solutions: [['-&1'], ['0-&1']],
          type: 'result',
          defaultDelay: 20,
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
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: "Comparer deux nombres relatifs.",
          subdescription: "Veleurs entières.",
          enounces: ["Quel est le plus petit de ces 2 nombres ?"],
          // expressions: ['-&1', '-(-&1)'],
          options: ['no-exp'],
          variables: [
            { '&1': '$e[1;19]', '&2': '$e[&1+1;20]', },
          ],
          choices: [
            ['$$-&1$$', '$$&2$$'],
            ['$$&1$$', '$$-&2$$'],
            ['$$-&1$$', '$$-&2$$'],
            ['$$-&2$$', '$$-&1$$'],
          ],
          corrections: [
            'Entre $$-&1$$ et $$&2$$, le plus petit est ',
            'Entre $$&1$$ et $$-&2$$, le plus petit est ',
            'Entre $$-&1$$ et $$-&2$$, le plus petit est ',
            'Entre $$-&2$$ et $$-&1$$, le plus petit est ',
          ],
          solutions: [
            [0],
            [1],
            [1],
            [0],

          ],
          type: 'choice',
          defaultDelay: 20,
        },

      ],
      Comparer: [
        {
          description: "Comparer deux nombres relatifs.",
          subdescription: "Veleurs entières.",
          enounces: ["Quel est le plus petit de ces 2 nombres ?"],
          // expressions: ['-&1', '-(-&1)'],
          options: ['no-exp'],
          variables: [
            { '&1': '$e[1;19]', '&2': '$e[&1+1;20]', },
          ],
          choices: [
            ['$$-&1$$', '$$&2$$'],
            ['$$&1$$', '$$-&2$$'],
            ['$$-&1$$', '$$-&2$$'],
            ['$$-&2$$', '$$-&1$$'],
          ],
          corrections: [
            'Entre $$-&1$$ et $$&2$$, le plus petit est ',
            'Entre $$&1$$ et $$-&2$$, le plus petit est ',
            'Entre $$-&1$$ et $$-&2$$, le plus petit est ',
            'Entre $$-&2$$ et $$-&1$$, le plus petit est ',
          ],
          solutions: [
            [0],
            [1],
            [1],
            [0],

          ],
          type: 'choice',
          defaultDelay: 20,
        },
      ]
    },
    'Additionner et soustraire': {
      'Sur la droite graduée': [

        {
          description: 'Calculer une somme ou une différence',
          subdescription: "A l'aide de la droite graduée",
          enounces: ['Calcule.'],
          expressions: ['(-&1)+&2', '(-&1)-&2', '&2-&1'],
          variables: [
            { '&1': '$e[1;5]', '&2': '$e[1;3+&1]' },
            { '&1': '$e[1;3]', '&2': '$e[1;4-&1]' },
            { '&1': '$e[2;9]', '&2': '$e[1;&1-1]' },
          ],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Compléter une égalité',
          subdescription: "A l'aide de la droite graduée",
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
          defaultDelay: 20,
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
          choices: [['positif', 'négatif']],
          corrections: [
            'Le résultat de $$(-&1)+&2$$ est ',
            'Le résultat de $$(-&2)+&1$$ est ',
            'Le résultat de $$(-&1)+(-&2)$$ est ',
            'Le résultat de $$&1+(-&2)$$ est ',
            'Le résultat de $$&2+(-&1)$$ est ',
          ],
          solutions: [
            [1],
            [0],
            [1],
            [0],
            [1],
          ],
          type: 'choice',
          defaultDelay: 20,

        },
        {
          description: 'Calculer une somme',
          subdescription: 'Cas général',
          enounces: ["Calcule."],
          expressions: ['(-&1)+&2', '(-&1)+(-&2)', '&1+(-&2)'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 20,
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
          defaultDelay: 20,
        },
        {
          description: "Transformer une soustraction en addition",
          enounces:
            ['Réécris cette soustraction en une addition équivalente.'],
          expressions: [
            '(-&1)-(-&2)',
            '&1-(-&2)',
            '&1-&2',
            '(-&1)-&2',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          solutions: [
            ['(-&1)+&2'],
            ['&1+&2'],
            ['&1+(-&2)'],
            ['(-&1)+(-&2)'],
          ],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: "Simplifier l'écriture",
          enounces:
            ['Simplifie cette expression en enlevant les doubles signes et les parenthèses inutiles.'],
          expressions: [
            '(-&1)+(-&2)',
            '(-&1)+&2',
            '&1+(-&2)',
            '(-&1)-(-&2)',
            '(-&1)-&2',
            '&1-(-&2)',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          solutions: [
            ['-&1-&2'],
            ['-&1+&2'],
            ['&1-&2'],
            ['-&1+&2'],
            ['-&1-&2'],
            ['&1+&2'],
          ],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Calculer',
          subdescription: 'Avec écriture simplifiée',
          enounces: ["Calcule."],
          expressions: ['-&1+&2', '-&1-&2', '&3-&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[1;&1-1]' }],
          type: 'result',
          defaultDelay: 20,
        },



      ],
    },
    'Multiplier et Diviser': {
      Produit: [
        {
          description: "Déterminer le signe d'un produit",
          enounces: ['Quel est le signe de ce produit ?'],
          expressions: ['(-&1)*&2', '(-&1)*(-&2)', '&1*(-&2)'],
          variables: [{ '&1': '$e[30;99]', '&2': '$e[30;99]' }],
          choices: [['positif', 'négatif']],
          corrections: [
            'Le résultat de $$(-&1) \\times &2$$ est ',
            'Le résultat de $$(-&1)  \\times (-&2)$$ est ',
            'Le résultat de $$&1  \\times (-&2)$$ est ',
          ],
          solutions: [
            [1],
            [0],
            [1],
          ],
          type: 'choice',
          defaultDelay: 20,

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
          choices: [['positif', 'négatif']],
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

        },

        {
          description: 'Calculer un produit',
          expressions: ['(-&1)*&2', '(-&1)*(-&2)', '&1*(-&2)'],
          enounces: ["Calcule."],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Multiplication à trou',
          enounces: ["Détermine le facteur manquant."],
          expressions: [
            '(-&1)*?=#{-&1*&2}',
            '(-&1)*?=#{(-&1)*(-&2)}',
            '&1*?=#{&1*(-&2)}',
            '?*(-&1)=#{-&1*&2}',
            '?*(-&1)=#{(-&1)*(-&2)}',
            '?*&1=#{&1*(-&2)}',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          solutions: [['&2'], ['-&2'], ['-&2'], ['&2'], ['-&2'], ['-&2']],
          type: 'trou',
          defaultDelay: 20,
        },

      ],
      'Quotient': [
        {
          description: "Déterminer le signe d'un quotient",
          enounces: ['Quel est le signe de ce quotient ?'],
          expressions: ['(-&1):&2', '(-&1):(-&2)', '&1:(-&2)'],
          variables: [{ '&1': '$e[30;99]', '&2': '$e[30;99]' }],
          choices: [['positif', 'négatif']],
          corrections: [
            'Le résultat de $$(-&1) \\div &2$$ est ',
            'Le résultat de $$(-&1)  \\div (-&2)$$ est ',
            'Le résultat de $$&1  \\div (-&2)$$ est ',
          ],
          solutions: [
            [1],
            [0],
            [1],
          ],
          type: 'choice',
          defaultDelay: 20,

        },
        {
          description: "Déterminer le signe dans un quotient",
          enounces: ['Quel est le signe du nombre manquant ?'],
          expressions: [
            '(-&1):?=&/2',
            '(-&1):?=-&2',
            '&1:?=-&2',
            '&1:?=&2',
            '?:(-&1)=&2',
            '?:(-&1)=-&2',
            '?:&1=-&2',
            '?:&1=&2'
          ],
          variables: [{ '&1': '$e[30;99]', '&2': '$e[30;99]' }],
          choices: [['positif', 'négatif']],
          corrections: [
            "Dans l'égalité $$(-&1) \\div \\ldots=&2$$, le facteur manquant est ",
            "Dans l'égalité $$(-&1) \\div \\ldots=-&2$$, le facteur manquant est ",
            "Dans l'égalité $$&1 \\div \\ldots=-&2$$, le facteur manquant est ",
            "Dans l'égalité $$&1 \\div \\ldots=&2$$, le facteur manquant est ",
            "Dans l'égalité $$\\ldots \\div (-&1)=&2$$, le facteur manquant est ",
            "Dans l'égalité $$\\ldots \\div (-&1)=-&2$$, le facteur manquant est ",
            "Dans l'égalité $$\\ldots \\div &1=-&2$$, le facteur manquant est ",
            "Dans l'égalité $$\\ldots \\div &1=&2$$, le facteur manquant est ",
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
        },
      ]
    }
  },
  Fractions: {
    'Apprivoiser': {
      Définition: [
        {
          description: "Définition d'un quotient",
          subdescription: "Compléter une multiplication à trou",
          enounces: ['Détermine le facteur manquant.'],
          expressions: ['&2*?=#{&1*&2}', '?*&2=#{&1*&2}'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&1']],
          type: 'trou',
          defaultDelay: 20,
        },
        {
          description: "Définition d'un quotient",
          subdescription: "Quelle opération faire dans une multiplication à trou ?",
          enounces: ['Quelle opération te permet de trouver le facteur manquant ?'],
          expressions: ['&2*?=&1', '?*&2=&1'],
          variables: [{ '&1': '$e[2;19]', '&2': '$e[2;19]\\{cd(&1)}' }],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&1:&2']],
          type: 'trou',
          defaultDelay: 20,
        },
        {
          description: "Définition d'un quotient",
          subdescription: "Déterminer le facteur manquant",
          enounces: ['Détermine le facteur manquant.'],
          expressions: ['&2*?=&1', '?*&2=&1'],
          variables: [{ '&1': '$e[2;19]', '&2': '$e[2;19]\\{cd(&1)}' }],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&1/&2']],
          details: [['&1:&2']],
          type: 'trou',
          defaultDelay: 20,
        },
      ],
      'Forme décimale': [
        {
          description: "Déterminer la forme décimale d'une fraction",
          subdescription: "La forme décimale est un entier",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['#{&2*&1}/&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
        },
        {
          description: "Déterminer la forme décimale d'une fraction",
          subdescription: "La forme décimale n'est pas entière",
          enounces: ['Ecris la forme décimale de la fraction'],
          expressions: ['&2/&1'],
          variables: [{ '&1': '$l{2;4;5;10}', '&2': '$e[1;&1+1]\\{&1}' }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 20,
        },
        {
          description: 'Déterminer une forme fractionnaire',
          enounces: ['Réécris ce nombre décimal sous forme fractionnaire.'],
          expressions: ['##{&2/&1}'],
          variables: [{ '&1': '$l{2;4;5;10}', '&2': '$e[1;&1-1]' }],
          type: 'result',
          defaultDelay: 20,
        },
      ],
      'Egalité de fractions': [
        {
          description: 'Compléter une égalité de fractions',
          subdescription:
            'Multiplier numérateur et dénominateur par le même nombre',
          enounces: ['Complète avec le  nombre manquant.'],
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
          type: 'trou',
          defaultDelay: 20,
          help: `<section>
          <h3 class="orange-text">Compléter une égalité de fractions</h3>
          <div class="r-stretch d-flex flex-column justify-center">
            $$\\frac{5}{4}=\\frac{\\ldots}{12}$$
          </div>
          <p>Pour passer de 4 à 12, je multiplie par 3</p>
        </section>
        <section>
          <h3 class="orange-text">Compléter une égalité de fractions</h3>
          <div class="r-stretch d-flex flex-column justify-center">
            $$\\frac{5}{4}=\\frac{\\textcolor{green}{15}}{12}$$
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
          type: 'trou',
          defaultDelay: 20,
        },
        {
          description: 'Compléter une égalité de fractions',
          subdescription: 'En utilisant le coefficient de proportionnalité',
          enounces: ['Complète avec le  nombre manquant.'],
          expressions: [
            '&1/#{&1*&3}=&2/?',
            '&1/?=&2/#{&2*&3}',
            '#{&1*&3}/&1=?/&2',
            '?/&1=#{&2*&3}/&2'
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
            ['#{&1*&3}'],
            ['#{&2*&3}'],
            ['#{&1*&3}'],
          ],
          type: 'trou',
          defaultDelay: 20,
        },
        {
          description: 'Compléter une égalité de fractions',
          subdescription: 'En utilisant le coefficient de proportionnalité (2)',
          enounces: ['Complète avec le  nombre manquant.'],
          expressions: [
            '&1/#{&1*&3}=?/#{&2*&3}',
            '?/#{&1*&3}=&2/#{&2*&3}',
            '#{&1*&3}/&1=#{&2*&3}/?',
            '#{&1*&3}/?=#{&2*&3}/&2'
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
            ['&1'],
            ['&2'],
            ['&1'],
          ],
          type: 'trou',
          defaultDelay: 20,
        },
        {
          description: 'Compléter une égalité de fractions',
          subdescription: 'En utilisant le produit en croix',
          enounces: ['Complète avec le  nombre manquant.'],
          expressions: [
            '#{&1*&3}/#{&2*&3}=#{&1*&4}/?',
            '#{&2*&3}/#{&1*&3}=?/#{&1*&4}',
            '#{&1*&4}/?=#{&1*&3}/#{&2*&3}',
            '?/#{&1*&4}=#{&2*&3}/#{&1*&3}',

          ],
          variables: [
            {
              '&1': '$e[2;5]',
              '&2': '$e[2;3]\\{m(&1);d(&1)}',
              '&3': '$e[2;3]',
              '&4': '$e[2;3]\\{&3}',
            },
          ],
          solutions: [
            ['#{&2*&4}'],

          ],
          type: 'trou',
          defaultDelay: 20,
        },

      ],
      Simplification: [
        {
          description: 'Simplifier une fraction',
          subdescription: 'Simplifier par 10; 100; 1000',
          enounces: ['Simplifie le plus possible cette fraction.'],
          expressions: ['#{&1*&3}/#{&2*&4}', '#{&1*&4}/#{&2*&3}'],
          variables: [{
            '&1': '$l{10;100;1000}',
            '&2': '$l{10;100;1000}',
            '&3': '$e[1;9]\\{cd&1}',
            '&4': '$e[2;9]\\{cd&1;cd&3}'
          },
          {
            '&1': '$l{10;100;1000}',
            '&2': '$l{10;100;1000}',
            '&3': '$e[2;9]\\{cd&1}',
            '&4': '$e[2;9]\\{cd&1;cd&3}'
          },
          ],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Simplifier une fraction',
          subdescription: 'Simplifier par 2 ; 3 ou 5',
          enounces: ['Simplifie cette fraction par 2 ; 3 ou 5.'],
          expressions: ['#{&1*&2}/#{&1*&3}', '#{&1*&3}/#{&1*&2}'],
          variables: [{
            '&1': '$l{2;3;5}',
            '&2': '$e[2;9]\\{cd&1}',
            '&3': '$e[2;9]\\{cd&1;cd&2}'
          },

          ],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Simplifier une fraction',
          subdescription: 'simplification par 2 ; 3 ; 5 ; 7 ; 11',
          enounces: ['Simplifie cette fraction.'],
          expressions: ['#{&1*&2}/#{&1*&3}', '#{&1*&3}/#{&1*&2}'],
          variables: [{
            '&1': '$l{2;3;5;7;11}',
            '&2': '$e[2;9]\\{cd&1}',
            '&3': '$e[2;9]\\{cd&1;cd&2}'
          },

          ],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Simplifier une fraction',
          subdescription: 'La simplification peut se faire en plusieurs étapes',
          enounces: ['Simplifie le plus possible.'],
          expressions: ['#{&2*&3}/#{&1*&3}', '#{&1*&3}/#{&2*&3}'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[1;&1-1]', '&3': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 20,
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
        },
        {
          description: 'Simplifier une fraction',
          subdescription: ['Simplifier le plus possible (avec signes)'],
          enounces: ['Simplifie le plus possible.'],
          expressions: [
            '(-#{&2*&3})/#{&1*&3}',
            '(-#{&1*&3})/#{&2*&3}',
            '#{&2*&3}/(-#{&1*&3})',
            '#{&1*&3}/(-#{&2*&3})',
            '(-#{&2*&3})/(-#{&1*&3})',
            '(-#{&1*&3})/(-#{&2*&3})',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[1;&1-1]', '&3': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 20,
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
            ['$$\\frac{&2}{&1}$$', '$$\\frac{&3}{&1}$$'],
          ],
          corrections: [
            'Entre $$\\frac{&2}{&1}$$ et $$\\frac{&3}{&1}$$ la plus petite fraction est  ',
          ],
          solutions: [
            ['&4<&5 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 20,
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
              '&4': '$e[&3+1;2*&3-1]',
              '&5': '&2/&1',
              '&6': '&4/&3'
            },

          ],
          choices: [
            ['$$\\frac{&2}{&1}$$', '$$\\frac{&4}{&3}$$'],
            ['$$\\frac{&4}{&3}$$', '$$\\frac{&2}{&1}$$'],
          ],

          corrections: [
            'Entre $$\\frac{&2}{&1}$$ et $$\\frac{&4}{&3}$$ la plus petite fraction est  ',
            'Entre $$\\frac{&4}{&3}$$ et $$\\frac{&2}{&1}$$ la plus petite fraction est  ',
          ],
          solutions: [
            ['&5<&6 ?? 0 :: 1'],
            ['&6<&5 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 20,
        },
        {
          description: "Comparer deux fractions",
          subdescription: "Fractions de dénominateurs multiples l'un de l'autre",
          enounces: ["Quelle est la plus petite de ces 2 fractions ?"],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{&1}',
              '&4': '$e[2;9]',
              '&5': '&2/&1',
              '&6': '(&3*&4)/(&1*&4)'
            },
          ],
          choices: [
            ['$$\\frac{&2}{&1}$$', '$$\\frac{#{&3*&4}}{#{&4*&1}}$$'],
          ],
          corrections: [
            'Entre $$\\frac{&2}{&1}$$ et $$\\frac{#{&3*&4}}{#{&4*&1}}$$ la plus petite fraction est  ',
          ],
          solutions: [
            ['&5<&6 ?? 0 :: 1'],
          ],
          type: 'choice',
          defaultDelay: 20,
        },
      ]
    },
    'Egalité à compléter': {

      'Addition - Soustraction': [
        {
          description: 'Compléter une égalité',
          subdescription: 'Addition ou soustraction',
          enounces: ['Complète cette égalité avec le  nombre manquant.'],
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
        },
        {
          description: 'Compléter une égalité',
          subdescription: 'Addition ou soustraction, avec nombres relatifs',
          enounces: ['Complète cette égalité avec le  nombre manquant.'],
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
              '&1': '$er[2;9]',
              '&2': '$er[2;9]',
              '&3': '$e[2;19]\\{cd(&1);cd(&2)}',
            },
          ],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&1'], ['&3'], ['&2'], ['&3'], ['&1'], ['&2']],
          type: 'trou',
          defaultDelay: 20,
        },
      ],
      Multiplication: [
        {
          description: 'Compléter une égalité',
          subdescription: 'Multiplication',
          enounces: ['Complète cette égalité avec le  nombre manquant.'],
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
        },
        {
          description: 'Compléter une égalité',
          subdescription: 'Multiplication avec nombres relatifs',
          enounces: ['Complète cette égalité avec le  nombre manquant.'],
          expressions: [

            '(?/(&3))*((&2)/(&4))=(#{&1*(&2)})/(#{&3*(&4)})',
            '((&1)/?)*((&2)/(&4))=(#{&1*(&2)})/(#{&3*(&4)})',
            '((&1)/(&3))*(?/(&4))=(#{&1*(&2)})/(#{&3*(&4)})',
            '((&1)/(&3))*((&2)/?)=(#{&1*(&2)})/(#{&3*(&4)})',
          ],
          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$er[2;9]',
              '&3': '$er[2;9]\\{&1;&2}',
              '&4': '$er[2;9]\\{&1;&2}',
            },
          ],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&1'],
          ['&3'], ['&2'], ['&4']
          ],
          type: 'trou',
          defaultDelay: 20,
        },
      ],
    },
    Calculer: {
      'Addition et Soustraction': [
        {
          description: 'Additionner ou soustraire',
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
          details: [['\\frac{&1+&2}{&3}'], ['\\frac{&1-&2}{&3}']],
          // solutions: [['#{&1+&3}/&2'],['#{&1-&2}/&3']],
          defaultDelay: 30,
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
            '&2/#{&3*&4}-&1/&3'
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
            '&1*&4<&2 && pgcd(&2-&1*&4;&3*&4)=1',
          ],
          type: 'result',
          // details: [
          //   [
          //     '\\frac{&1\\times &4}{&3 \\times &4} + \\frac{&2}{#{&3*&4}}',
          //     '\\frac{#{&1*&4}}{#{&3*&4}} + \\frac{&2}{#{&3*&4}}',
          //     '\\frac{#{&1*&4}+&2}{#{&3*&4}}',
          //   ],
          //   [
          //     '\\frac{&2}{#{&3*&4}} + \\frac{&1\\times &4}{&3 \\times &4}',
          //     '\\frac{&2}{#{&3*&4}}+\\frac{#{&1*&4}}{#{&3*&4}}',
          //     '\\frac{&2+#{&1*&4}}{#{&3*&4}}',
          //   ],
          // ],
          // solutions: [['#{&1+&3}/&2'],['#{&1-&2}/&3']],
          defaultDelay: 30,
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
          details: [
            [
              '\\frac{&1}{&3}+\\frac{#{&2*&4}:&4}{#{&3*&4}:&4}',
              '\\frac{&1}{&3}+\\frac{&2}{&3}',
              '\\frac{&1+&2}{&3}',
            ],

            [
              '\\frac{#{&2*&4}:&4}{#{&3*&4}:&4}+\\frac{&1}{&3}',
              '\\frac{&2}{&3}+\\frac{&1}{&3}',
              '\\frac{&2+&1}{&3}',
            ],
          ],
          // solutions: [['#{&1+&3}/&2'], ['#{&1-&2}/&3']],
          defaultDelay: 30,
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

          type: 'result',
          defaultDelay: 30,
        },
        {
          description: 'Additionner ou soustraire',
          subdescription:
            'Fractions de même dénominateur, nombres positifs, simplification intermediaire possible, simplification finale',
          enounces: ['Calcule.'],
          expressions: [
            '#{&2*&4}/#{&1*&3}+#{(&1-&2)*&4}/#{&1*&3}',
            '#{&1*&4}/#{&2*&3}-#{(&1-&2)*&4}/#{&2*&3}',
          ],
          // expressions: ['&1+&2+&3+&4'],
          details: [
            [
              '\\frac{#{&2*&4}+#{(&1-&2)*&4}}{#{&1*&3}}',
              '\\frac{#{&1*&4}}{#{&1*&3}}',
              '\\frac{#{&1*&4}:#{pgcd(&1*&3;&1*&4)}}{#{&1*&3}:#{pgcd(&1*&3;&1*&4)}}',
            ],
            [
              '\\frac{#{&1*&4}-#{(&1-&2)*&4}}{#{&2*&3}}',
              '\\frac{#{&2*&4}}{#{&2*&3}}',
              '\\frac{#{&2*&4}:#{pgcd(&2*&3;&2*&4)}}{#{&2*&3}:#{pgcd(&2*&3;&2*&4)}}',
            ],
          ],
          variables: [
            {
              '&1': '$e[3;9]',
              '&2': '$e[2;&1-1]',
              '&3': '$e[2;9]',
              '&4': '$e[2;9]',
            },
          ],
          type: 'result',

          defaultDelay: 20,
        },
        {
          description: 'Additionner ou soustraire',
          subdescription:
            'Fractions de même dénominateur, nombres positifs, pas de simplification intermediaire, simplification finale',
          enounces: ['Calcule.'],
          expressions: [
            '#{&2*&4}/#{&1*&3}+#{(&1-&2)*&4}/#{&1*&3}',
            '#{&1*&4}/#{&2*&3}-#{(&1-&2)*&4}/#{&2*&3}',
          ],
          // expressions: ['&1+&2+&3+&4'],
          details: [
            [
              '\\frac{#{&2*&4}+#{(&1-&2)*&4}}{#{&1*&3}}',
              '\\frac{#{&1*&4}}{#{&1*&3}}',
              '\\frac{#{&1*&4}:&1}{#{&1*&3}:&1}',
            ],
            [
              '\\frac{#{&1*&4}-#{(&1-&2)*&4}}{#{&2*&3}}',
              '\\frac{#{&2*&4}}{#{&2*&3}}',
              '\\frac{#{&2*&4}:&2}{#{&2*&3}:&2}',
            ],
          ],
          variables: [
            {
              '&1': '$l{3;5;7;11}',
              '&2': '$l{2;3;5;7;11}\\[&1;11]',
              '&3': '$l{2;3;5;7;11}\\{&1;&2;&1-&2}',
              '&4': '$l{2;3;5;7;11}\\{&1;&2;&3}',
            },
          ],
          type: 'result',

          defaultDelay: 20,
        },
        {
          description: 'Additionner ou soustraire',
          subdescription:
            'Fractions de même dénominateur, nombres relatifs, simplification intermediaire possible, simplification finale',
          enounces: ['Calcule.'],
          expressions: [
            '(-&1)/&3+(-&2)/&3',
            '(-&1)/&3+&2/&3',
            '&1/&3+(-&2)/&3',
            '&1/&3+&2/&3',
            '(-&1)/&3-(-&2)/&3',
            '(-&1)/&3-&2/&3',
            '&1/&3-(-&2)/&3',
            '&1/&3-&2/&3',
          ],

          details: [
            [
              '\\frac{-&1+(-&2)}{&3}',
              '\\frac{#{-&1+(-&2)}}{&3}',
              '&4>1 && &4<&3??\\frac{#{-&1+(-&2)}:#{&4}}{&3:#{&4}}',
            ],
            [
              '\\frac{-&1+&2}{&3}',
              '\\frac{#{-&1+&2}}{&3}',
              '&4>1 && &4<&3??\\frac{#{-&1+&2}:#{&4}}{&3:#{&4}}',
            ],
            [
              '\\frac{&1+(-&2)}{&3}',
              '\\frac{#{&1-&2}}{&3}',
              '&4>1 && &4<&3??\\frac{#{&1-&2}:#{&4}}{&3:#{&4}}',
            ],
            [
              '\\frac{&1+&2}{&3}',
              '\\frac{#{&1+&2}}{&3}',
              '&4>1 && &4<&3??\\frac{#{&1+&2}:#{&4}}{&3:#{&4}}',
            ],

            [
              '\\frac{-&1-(-&2)}{&3}',
              '\\frac{-&1+&2}{&3}',
              '\\frac{#{-&1+&2}}{&3}',
              '&4>1 && &4<&3??\\frac{#{-&1+&2}:#{&4}}{&3:#{&4}}',
            ],
            [
              '\\frac{-&1-&2}{&3}',
              '\\frac{#{-&1-&2}}{&3}',
              '&4>1 && &4<&3??\\frac{#{-&1-&2}:#{&4}}{&3:#{&4}}',
            ],
            [
              '\\frac{&1-(-&2)}{&3}',
              '\\frac{&1+&2}{&3}',
              '\\frac{#{&1+&2}}{&3}',
              '&4>1 && &4<&3??\\frac{#{&1+&2}:#{&4}}{&3:#{&4}}',
            ],
            [
              '\\frac{&1-&2}{&3}',
              '\\frac{#{&1-&2}}{&3}',
              '&4>1 && &4<&3??\\frac{#{&1-&2}:#{&4}}{&3:#{&4}}',
            ],
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]',
              '&4': 'pgcd(&1+&2;&3)',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]',
              '&4': 'pgcd(-&1+&2;&3)',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]',
              '&4': 'pgcd(&1-&2;&3)',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]',
              '&4': 'pgcd(&1+&2;&3)',
            },

            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]',
              '&4': 'pgcd(-&1+&2;&3)',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]',
              '&4': 'pgcd(&1+&2;&3)',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]',
              '&4': 'pgcd(&1+&2;&3)',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]',
              '&4': 'pgcd(&1-&2;&3)',
            },
          ],
          type: 'result',

          defaultDelay: 20,
        },

      ],
      "Fraction d'une quantité": [
        {
          description: "Calculer une fraction d'une quantité",
          enounces: ['Calculer $$\\frac{&2}{&3}$$ de $$%{&1*&3}$$'],
          expressions: ['(&2/&3)*#{&1*&3}'],
          options: ['no-exp'],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]\\{cd(&2)}' },
          ],
          details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: "Calculer une fraction d'une quantité",
          subdescription: "Dans les 2 sens",
          expressions: ['(&2/&3)*#{&1*&3}', '#{&1*&3}*(&2/&3)'],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]\\{cd(&2)}' },
          ],
          details: [['\\frac{#{&1*&3}}{&3} \\times &2', '&1 \\times &2']],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: "Calculer une fraction d'une quantité",
          subdescription: "En prenant la forme décimale de la fraction",
          expressions: ['(#{&2*&3}/&3)*&1}', '&1*(#{&2*&3}/&3)'],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]\\{cd(&1)}' },
          ],
          details: [['&2 \\times &1'], ['&1 \\times &2']],
          type: 'result',
          defaultDelay: 20,
        },
      ],
      Multiplication: [
        {
          description: 'Calculer un produit',
          subdescription: 'Pas de simplification',
          expressions: ['(&1/&3)*(&2/&4)}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&2);cd(&1)}',
              '&4': '$e[2;9]\\{cd(&2);cd(&1)}',
            },
          ],
          details: [['\\frac{&1 \\times &2}{&3 \\times &4}']],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'avec simplification simple',
          expressions: ['(&1/&3)*(&2/&1)}', '(&3/&1)*(&1/&2)}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]\\{&1;cd&2}',
            },
          ],
          type: 'result',
          defaultDelay: 20,
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
              '\\frac{&1 \\times &2}{&3 \\times &4}',
              '\\frac{#{&1*&2}}{#{&3*&4}}',
              '&5>1 && &5<&1*&2??\\frac{#{&1*&2}:#{&5}}{#{&3*&4}:#{&5}}',
            ],
          ],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'un entier par un quotient',
          expressions: ['&1*(&2/&3)}', '(&2/&3)*&1}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&2);cd(&1)}',
            },
          ],
          details: [
            [
              '\\frac{&1}{1} \\times \\frac{&2}{&3}',
              '\\frac{&1 \\times &2}{1 \\times &3}',
            ],
            [
              '\\frac{&2}{&3} \\times \\frac{&1}{1}',
              '\\frac{&2 \\times &1}{&3 \\times 1}',
            ],
          ],
          type: 'result',
          defaultDelay: 20,
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
            ['\\frac{&1 \\times &2}{&3 \\times &4}'],

            ['-\\frac{&1 \\times &2}{&3 \\times &4}'],
            ['-\\frac{&1 \\times &2}{&3 \\times &4}'],
            ['-\\frac{&1 \\times &2}{&3 \\times &4}'],
            ['-\\frac{&1 \\times &2}{&3 \\times &4}'],

            ['\\frac{&1 \\times &2 }{&3 \\times &4}'],

            ['\\frac{&1 \\times &2}{&3 \\times &4}'],
            ['\\frac{&1 \\times &2}{&3 \\times &4}'],
            ['\\frac{&1 \\times &2}{&3 \\times &4}'],
            ['\\frac{&1 \\times &2}{&3 \\times &4}'],
            ['\\frac{&1 \\times &2}{&3 \\times &4}'],
            ['\\frac{&1 \\times &2}{&3 \\times &4}'],

            ['-\\frac{&1 \\times &2}{&3 \\times &4}'],
            ['-\\frac{&1 \\times &2}{&3 \\times &4}'],
            ['-\\frac{&1 \\times &2}{&3 \\times &4}'],
            ['-\\frac{&1 \\times &2}{&3 \\times &4}'],
          ],
          type: 'result',
          defaultDelay: 20,
        },
      ],
      Inverse: [
        {
          description: "Calculer l'inverse d'un nombre",
          enounces: [
            "Calculer l'inverse de $$&1$$",
            "Calculer l'inverse de $$\\frac{1}{&1}$$",
            "Calculer l'inverse de $$\\frac{&1}{&2}$$",
          ],
          options: ['no-exp'],
          expressions: ['&1', '1/&1', '&1/&2'],
          variables: [{ '&1': '$e[2;19]', '&2': '$e[2;19]\\{cd(&1)}' }],
          solutions: [['1/&1'], ['&1'], ['&2/&1']],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: "Calculer l'inverse d'un nombre",
          subdescription: 'Avec la notation puissance',
          expressions: ['&1^(-1)', '(1/&1)^(-1)', '(&1/&2)^(-1)'],
          variables: [{ '&1': '$e[2;19]', '&2': '$e[2;19]\\{cd(&1)}' }],
          solutions: [['1/&1'], ['&1'], ['&2/&1']],
          type: 'result',
          defaultDelay: 20,
        },
      ],
      Division: [
        {
          description: 'Calculer un quotient',
          subdescription:
            'Pas de simplification, avec le symbole de la division',
          expressions: ['(&1/&3):(&4/&2)}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&2);cd(&1)}',
              '&4': '$e[2;9]\\{cd(&2);cd(&1)}',
            },
          ],
          details: [
            [
              '\\frac{&1}{&3} \\times \\frac{&2}{&4}',
              '\\frac{&1 \\times &2}{&3 \\times &4}',
            ],
          ],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Calculer un quotient',
          subdescription: 'Pas de simplification',
          expressions: ['(&1/&3)/(&4/&2)}'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&2);cd(&1)}',
              '&4': '$e[2;9]\\{cd(&2);cd(&1)}',
            },
          ],
          details: [
            [
              '\\frac{&1}{&3} \\times \\frac{&2}{&4}',
              '\\frac{&1 \\times &2}{&3 \\times &4}',
            ],
          ],
          type: 'result',
          defaultDelay: 20,
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
        },

      ]
    },
    'Calculer': {
      Multiplier: [
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
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: "Multiplier 2 puissances d'un même nombre.",
          subdescription: "Exposants relatifs",
          enounces: ["Calcule en écrivant le résultat sous la forme d'une puissance."],
          expressions: ['&1^(&2)*&1^(&3)'],
          variables: [
            {
              '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}',
              '&2': '$er[2;5]',
              '&3': '$er[2;5]\\{-(&2)}',
            }
          ],
          solutions: [
            ['&1^(#{&2+(&3)})'],

          ],
          type: 'result',
          defaultDelay: 20,
        },
      ],
      Diviser: [
        {
          description: "Diviser 2 puissances d'un même nombre.",
          subdescription: "Exposants positifs",
          enounces: ["Calcule en écrivant le résultat sous la forme d'une puissance."],
          expressions: ['(&1^&2)/(&1^&3)'],
          variables: [
            {
              '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}',
              '&2': '$e[4;10]',
              '&3': '$e[2;&2-2]',
            }
          ],
          solutions: [
            ['&1^(#{&2-&3})'],

          ],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: "Diviser 2 puissances d'un même nombre.",
          subdescription: "Exposants relatifs",
          enounces: ["Calcule en écrivant le résultat sous la forme d'une puissance."],
          expressions: ['(&1^(&2))/(&1^(&3))'],
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
          type: 'result',
          defaultDelay: 20,
        },
      ],
      'Puissance de puissance': [
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
          type: 'result',
          defaultDelay: 20,
        },

        {
          description: "Puissance d'une puissance",
          subdescription: "Exposants relatifs",
          enounces: ["Calcule en écrivant le résultat sous la forme d'une puissance."],
          expressions: ['(&1^(&2))^(&3)'],
          variables: [
            {
              '&1': '$l{a;b;c;x;y;2;3;4;5;6;7;8;9;10}',
              '&2': '$er[2;9]',
              '&3': '$er[2;9]',
            }
          ],
          solutions: [
            ['&1^(#{&2*(&3)})'],

          ],
          type: 'result',
          defaultDelay: 20,
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
        },
        {
          description: "Définition d'un pourcentage",
          subdescription: "Convertir un pourcentage en une fraction simplifiée.",
          enounces: ['Quelle est la fraction simplifiée correspondant à :'],
          expressions: ['&1%'],
          variables: [{ '&1': '$l{10;20;30;40;50;60;70;80;90;100;25;75;200;300;400}' }],
          type: 'result',
          defaultDelay: 10,
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
        },
        {
          description: "Diminution",
          enounces: ["Un article qui coûtait initialement $$%{&1}$$ Qr voit son prix diminuer de $$&2\\%$$. Quel est son nouveau prix?"],
          expressions: ['#{&1}-#{&1}*(&2/100)'],
          options: ['no-exp'],
          variables: [{ '&1': '$e[2;20]*10', '&2': '$l{10;20;30;50;100}' }],
          type: 'result',
          defaultDelay: 10,
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
            uncorrect: ['Un coefficient de $$&exp$$ correspond à une diminution de $$&solution$$']
          }],
          solutions: [['&1%']],
          defaultDelay: 10,
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
          details: [
            ['&3 \\times &2', '#{&3*&1}',],
          ],
          defaultDelay: 30,
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
          details: [
            ['&3 \\times &2', '#{&3*&1}',],
          ],
          defaultDelay: 30,
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
          details: [
            ['&3 \\times &2+&4', '#{&3*&2}+&4', '#{&3*&2+&4}'],
            ['&4+&3 \\times &2', '&4+#{&3*&2}', '#{&3*&2+&4}'],
            [
              '&4 \\times &6+&3 \\times &2',
              '#{&4*&6}+#{&3*&2}',
              '#{&4*&6+&3*&2}',
            ],
          ],
          // solutions: [['#{&1+&3}/&2'],['#{&1-&2}/&3']],
          defaultDelay: 30,
        },
      ],
    },
    Transformation: {
      "Simplification d'écriture": [
        {
          description: 'Simplifier le symbole de multiplication',
          subdescription: 'Devant une lettre',

          enounces: ["Enlève, quand c'est possible, le symbole de la multiplication:"],
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
          options: ['shallow-shuffle-factors', 'require-implicit-products', 'disallow-factors-permutation'],
          solutions: [
            ['&2&1'],
            ['&1*&2']
          ],
          type: 'result',
          defaultDelay: 30,
        },
        {
          description: 'Simplifier le symbole de multiplication',
          subdescription: 'Devant une parenthèse',

          enounces: ["Enlève, quand c'est possible, le symbole de la multiplication:"],
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
          options: ['shuffle-terms', 'require-implicit-products', 'disallow-factors-permutation'],
          solutions: [
            ['&3(&1+&2)'],
            ['&3(&1+&4)'],
            ['&5(&1+&2)'],
            ['&5(&1+&4)'],
            ['(&1+&2)*&5'],
            ['(&1+&4)*&5']

          ],
          type: 'result',
          defaultDelay: 30,
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
        },

      ],
      Réduction: [
        {
          description: 'Réduire une expression simple',
          subscription: 'Coefficients positifs',
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
          // solutions: [['#{&2+&3}&1']],
          type: 'result',
          defaultDelay: 30,

        },
        {
          description: 'Réduire une expression simple',
          subscription: 'Coefficients relatifs',
          enounces: ['Réduire :'],
          expressions: ['#{&2&1}#s{&3&1}'],
          variables: [
            {
              '&1': '$l{a;b;c}',
              '&2': '$er[1;9]',
              '&3': '$ers[1;9]',
            },
          ],
          // solutions: [['#{&2-&3}&1'], ['#{-&2+&3}&1'],['#{-&2-&3}&1']],
          type: 'result',
          defaultDelay: 30,

        },
        {
          description: 'Réduire une expression',
          subscription: 'Coefficients positifs',
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
          details: [['(&2+&3)&1+(&5+&6)&4']],
          type: 'result',
          defaultDelay: 30,

        },
        {
          description: 'Réduire une expression',
          subscription: 'Coefficients relatifs',
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
              '&3': '$ers[1;9]',
              '&4': '$l{a;b;c}\\{&1}',
              '&5': '$ers[1;9]',
              // '&5': '$l{+$e[2;9];-$e[2;9]}',
              // '&6': '+$e[2;9]',
              '&6': '$ers[1;9]',
            },
          ],
          // solutions: [
          //   ['#{(&2&3)&1}#s{(&5&6)&4}'],
          //   ['#{(&2&5)&1}#s{(&3&6)&4}'],
          //   ['#{(&2&6)&1}#s{(&3&5)&4}'],

          // ],
          type: 'result',
          defaultDelay: 30,

        },
        {
          description: 'Réduire une expression',
          subscription: 'Coefficients relatifs, expression du second degré',
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
              '&3': '$ers[1;9]',
              '&4': '$ers[1;9]',
              '&5': '$ers[1;9]',
              '&6': '$ers[1;9]',
              '&7': '$ers[1;9]',
            },
          ],

          type: 'result',
          defaultDelay: 30,

        },
        {
          description: 'Réduire un produit',
          subscription: 'Coefficients positifs',
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
          // solutions: [['#{&2+&3}&1']],
          type: 'result',
          // details: [['(&2+&3) \\times &1']],
          defaultDelay: 30,

        },
        {
          description: 'Réduire un produit',
          subscription: 'Coefficients relatifs',
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
          // solutions: [['#{&2+&3}&1']],
          type: 'result',
          // details: [['(&2+&3) \\times &1']],
          defaultDelay: 30,

        },
      ],
      'Simplification de parenthèses': [
        {
          description: 'Enlever les parenthèses',
          enounces: ["Réécrire l'expression en en elevant les parenthèses :"],
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
          defaultDelay: 30,

        },
        {
          description: 'Réduire avec parenthèses',
          enounces: ['Réduire:'],
          expressions: [
            '#{&1&2}+(#{&3&2}#s{&4})',
            '#{&1&2}+(#{&4}#s{&3&2})',
            '#{&1&2}-(#{&3&2}#s{&4})',
            '#{&1&2}-(#{&4}#s{&3&2})',
          ],
          variables: [
            {
              '&1': '$er[1;9]',
              '&2': '$l{a;b;c;x;y;z}',
              '&3': '$ers[1;9]',
              '&4': '$ers[1;9]',
            },
          ],
          // solutions: [['#{&2+&3}&1']],
          type: 'result',
          //   solutions:[
          //     ['#{&1&2}#s{&3&4}&5'],
          //     ['#{&1&2}#s{-&3&4}#s{-&5}'],
          // ],
          defaultDelay: 30,

        },
      ],
      Développement: [
        {
          description: 'Développer',
          subdescription: 'Simple - Coefficients positifs',
          enounces: ['Développer et réduire :'],
          expressions: [
            '&1(&2+&4)',
            '&1(&4+&2)',
            '(&2+&4)*&1',
            '(&4+&2)*&1',
            '&1(&2-&4)',
            '&1(&4-&2)',
            '(&2-&4)*&1',
            '(&4-&2)*&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&4': '$l{a;b;c;x;y;z}',
            },
          ],

          type: 'result',
          defaultDelay: 30,
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
              '&2': '$e[1;9]',
              '&3': '$e[1;9]',
              '&4': '$l{a;b;c;x;y;z}',
            },
          ],
          // solutions: [['#{&2+&3}&1']],
          type: 'result',
          // solutions: [
          //   ['#{&1*&2}+#{&1*&3&4}'],
          //   ['#{&1*&3&4}+#{&1*&2}'],
          //   ['#{&1*&2}+#{&1*&3&4}'],
          //   ['#{&1*&3&4}+#{&1*&2}'],
          //   ['#{&4*&2}+#{&4*&3&4}'],
          //   ['#{&4*&3&4}+#{&4*&2}'],
          //   ['#{&4*&2}+#{&4*&3&4}'],
          //   ['#{&4*&3&4}+#{&4*&2}'],
          // ],

          defaultDelay: 30,

        },
        {
          description: 'Développer',
          subdescription: 'Coefficients relatifs',
          enounces: ['Développer et réduire :'],
          expressions: [
            '&1(#{&2}#s{&3&4})',
            '&1(#{&3&4}#s{&2})',
            '-&1(#{&2}#s{&3&4})',
            '-&1(#{&3&4}#s{&2})',
            '(#{&2}#s{&3&4})*&1',
            '(#{&3&4}#s{&2})*&1',
            '(#{&2}#s{&3&4})*(-&1)',
            '(#{&3&4}#s{&2})*(-&1)',
            '&4(#{&2}#s{&3&4})',
            '&4(#{&3&4}#s{&2})',
            '(#{&2}#s{&3&4})&4',
            '(#{&3&4}#s{&2})&4',
            '-&4(#{&2}#s{&3&4})',
            '-&4(#{&3&4}#s{&2})',
            '(#{&2}#s{&3&4})*(-&4)',
            '(#{&3&4}#s{&2})*(-&4)',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$er[1;9]',
              '&3': '$er[1;9]',
              '&4': '$l{a;b;c;x;y;z}',
            },
          ],
          // solutions: [['#{&2+&3}&1']],
          type: 'result',
          // solutions: [
          //   ['#{&1*(&2)}#s{&1*(&3)&4}'], // (&2) à cause du signe
          //   ['#{&1*(&3)&4}#s{&1*(&2)}'],
          //   ['#{-&1*(&2)}#s{-&1*(&3)&4}'],
          //   ['#{-&1*(&3)&4}#s{-&1*(&2)}'],
          //   ['#{&1*(&2)}#s{&1*(&3)&4}'],
          //   ['#{&1*(&3)&4}#s{&1*(&2)}'],
          //   ['#{-&1*(&2)}#s{-&1*(&3)&4}'],
          //   ['#{-&1*(&3)&4}#s{-&1*(&2)}'],
          //   ['#{&4*(&2)}#s{&4*(&3)&4}'],
          //   ['#{&4*(&3)&4}#s{&4*(&2)}'],
          //   ['#{&4*(&2)}#s{&4*(&3)&4}'],
          //   ['#{&4*(&3)&4}#s{&4*(&2)}'],
          //   ['#{-&4*(&2)}#s{-&4*(&3)&4}'],
          //   ['#{-&4*(&3)&4}#s{-&4*(&2)}'],
          //   ['#{-&4*(&2)}#s{-&4*(&3)&4}'],
          //   ['#{-&4*(&3)&4}#s{-&4*(&2)}'],
          // ],

          defaultDelay: 30,
          options: ['implicit'],
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
              '&2': '$e[1;9]',
              '&3': '$l{a;b;c;x;y;z}',
              '&4': '$e[1;9]',
              '&5': '$e[1;9]',
            },
          ],
          // solutions: [['#{&2+&3}&1']],
          type: 'result',

          defaultDelay: 30,
          options: ['implicit'],
        },
        {
          description: 'Développer un double produit',
          subdescription: 'Coefficients relatifs',
          enounces: ['Développer et réduire :'],
          expressions: [
            '(#{&1}#s{&2&3})(#{&4}#s{&5&3})',
            '(#{&2&3}#s{&1})(#{&4}#s{&5&3})',
            '(#{&2&3}#s{&1})(#{&5&3}#s{&4})',
            '(#{&1}#s{&2&3})(#{&5&3}#s{&4})',
          ],
          variables: [
            {
              '&1': '$er[1;9]',
              '&2': '$er[1;9]',
              '&3': '$l{a;b;c;x;y;z}',
              '&4': '$er[1;9]',
              '&5': '$er[1;9]',
            },
          ],
          // solutions: [['#{&2+&3}&1']],
          type: 'result',

          defaultDelay: 40,
          options: ['implicit'],
        },
        {
          description: 'Développer $$(a+b)^2$$',

          enounces: ['Développer et réduire :'],
          expressions: ['(&1+#{&2&3})^2', '(#{&2&3}+&1)^2'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '$l{a;b;c;x;y;z}',
            },
          ],
          // solutions: [['#{&2+&3}&1']],
          type: 'result',

          defaultDelay: 30,
          options: ['implicit'],
        },
        {
          description: 'Développer $$(a-b)^2$$',

          enounces: ['Développer et réduire :'],
          expressions: ['(&1-#{&2&3})^2', '(#{&2&3}-&1)^2'],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '$l{a;b;c;x;y;z}',
            },
          ],
          // solutions: [['#{&2+&3}&1']],
          type: 'result',

          defaultDelay: 30,
          options: ['implicit'],
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
              '&2': '$e[1;9]',
              '&3': '$l{a;b;c;x;y;z}',
            },
          ],
          // solutions: [['#{&2+&3}&1']],
          type: 'result',

          defaultDelay: 30,
          options: ['implicit'],
        },
      ],
      Factorisation: [
        {
          description: 'Trouver un facteur commun',
          subdescription: 'Simple - Coefficients positifs',
          enounces: ['Quel est le facteur commun dans les 2 produits ?'],
          expressions: [
            '&1&3+&1&4',
            '&1&3+&4*&1',
            '&3*&1+&1&4',
            '&3*&1+&4*&1',
            '&1*&2+&1&3',
            '&2*&1+&1&3',
            '&2*&1+&3*&1',
            '&1*&2+&3*&1',
            '&1&3-&1&4',
            '&1&3-&4*&1',
            '&3*&1-&1&4',
            '&3*&1-&4*&1',
            '&1*&2-&1&3',
            '&2*&1-&1&3',
            '&2*&1-&3*&1',
            '&1*&2-&3*&1',
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
            ['&1']
          ],
          type: 'result',
          defaultDelay: 30,
        },
        {
          description: 'Factoriser',
          subdescription: 'Simple - Coefficients positifs',
          enounces: ['Factoriser :'],
          expressions: [
            '&1&3+&1&4',
            '&1&3+&4*&1',
            '&3*&1+&1&4',
            '&3*&1+&4*&1',
            '&1*&2+&1&3',
            '&2*&1+&1&3',
            '&2*&1+&3*&1',
            '&1*&2+&3*&1',
            '&1&3-&1&4',
            '&1&3-&4*&1',
            '&3*&1-&1&4',
            '&3*&1-&4*&1',
            '&1*&2-&1&3',
            '&2*&1-&1&3',
            '&2*&1-&3*&1',
            '&1*&2-&3*&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$l{x;y;z}',
              '&4': '$l{x;y;z}\\{&3}',

            },
          ],
          solutions: [
            ['&1(&3+&4)'],
            ['&1(&3+&4)'],
            ['&1(&3+&4)'],
            ['&1(&3+&4)'],
            ['&1(&2+&3)'],
            ['&1(&2+&3)'],
            ['&1(&2+&3)'],
            ['&1(&2+&3)'],
            ['&1(&3-&4)'],
            ['&1(&3-&4)'],
            ['&1(&3-&4)'],
            ['&1(&3-&4)'],
            ['&1(&2-&3)'],
            ['&1(&2-&3)'],
            ['&1(&2-&3)'],
            ['&1(&2-&3)'],
          ],
          type: 'result',
          defaultDelay: 30,
        },
        {
          description: 'Trouver un facteur commun',
          subdescription: 'Facteur non forcément apparent',
          enounces: ['Trouve un facteur commun à ces 2 produits.'],
          expressions: [
            '&1&3+#{&1*&2}&4',
            '&1&3-#{&1*&2}&4',
            '#{&1*&2}&4+&1&3',
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
            ['&1'],
          ],
          type: 'rewrite',
          defaultDelay: 30,

        },
        {
          description: 'Factoriser',
          subdescription: 'Coefficients positifs',
          enounces: ['Factoriser :'],
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
            ['&1(&3+&2&4)'],
            ['&1(&3-&2&4)'],
            ['&1(&3-&2&4)'],
          ],
          type: 'result',
          defaultDelay: 30,

        },
        {
          description: 'Trouver le plus grand facteur commun',
          subdescription: 'Le plus possible',
          enounces: ['Quel est le plus grand facteur commun dans ces 2 produits ?'],
          expressions: [
            '#{&1*&2}&5+#{&1*&3}&4',
            '#{&1*&2}&5-#{&1*&3}&4',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{&2}',
              '&4': '$l{x;y;z}',
              '&5': '$l{x;y;z}\\{&4}',
              '&6': 'pgcd(&1*&2;&1*&3)',
              '&7': '&1*&2:&6',
              '&8': '&1*&3:&6',
            },
          ],
          solutions: [
            ['#{&6}'],
          ],
          type: 'result',
          defaultDelay: 30,

        },
        {
          description: 'Factoriser',
          subdescription: 'Le plus possible',
          enounces: ['Factorise le plus possible :'],
          expressions: [
            '#{&1*&2}&5+#{&1*&3}&4',
            '#{&1*&2}&5-#{&1*&3}&4',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{&2}',
              '&4': '$l{x;y;z}',
              '&5': '$l{x;y;z}\\{&4}',
              '&6': 'pgcd(&1*&2;&1*&3)',
              '&7': '&1*&2:&6',
              '&8': '&1*&3:&6',
            },
          ],
          solutions: [
            ['#{&6}(#{&7*&5}+#{&8*&4})'],
            ['#{&6}(#{&7*&5}-#{&8*&4})'],

          ],
          type: 'result',
          defaultDelay: 30,

        },
        {
          description: 'Factoriser',
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
          type: 'result',
          defaultDelay: 30,

        },
        {
          description: 'Factoriser',
          subdescription: 'Avec des carrés',
          enounces: ['Factoriser :'],
          expressions: [
            '#{&1*&2*&3^2}+#{&1*&3}',
            '#{&1*&3^2}+#{&1*&2*&3}',
            '#{&1*&2*&3}+#{&1*&3^2}',
            '#{&1*&3}+#{&1*&2*&3^2}',
            '#{&1*&2*&3^2}-#{&1*&3}',
            '#{&1*&3^2}-#{&1*&2*&3}',
            '#{&1*&2*&3}-#{&1*&3^2}',
            '#{&1*&3}-#{&1*&2*&3^2}',
          ],
          variables: [
            {
              '&1': '$e[1;9]',
              '&2': '$e[1;9]',
              '&3': '$l{x;y;z}',
            },
          ],
          solutions: [
            ['#{&1&3}(#{&2*&3}+1)'],
            ['#{&1&3}(&3+&2)'],
            ['#{&1&3}(&2+&3)'],
            ['#{&1&3}(1+#{&2*&3})'],
            ['#{&1&3}(#{&2*&3}-1)'],
            ['#{&1&3}(&3-&2)'],
            ['#{&1&3}(&2-&3)'],
            ['#{&1&3}(1-#{&2*&3})'],
          ],
          type: 'result',
          defaultDelay: 30,

        },
        {
          description: 'Factoriser',
          subdescription: 'Coefficients positifs',
          enounces: ['Factoriser le plus possible :'],
          expressions: [
            '#{&1*&2*&4^2}+#{&1*&3*&4}',
            '#{&1*&2*&4}+#{&1*&3*&4^2}',
            '#{&1*&2*&4^2}-#{&1*&3*&4}',
            '#{&1*&2*&4}-#{&1*&3*&4^2}',
          ],
          variables: [
            {
              '&1': '$e[1;9]',
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
            ['#{&5&4}(#{&6}-#{&7*&4})']
          ],
          type: 'result',
          defaultDelay: 30,

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

        },
      ],
    },
    'Equations': {
      'Dans $$\\N$$': [
        {
          description: 'Addition',
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
          
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Soustraction',
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
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Soustraction (2)',
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
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Multiplication',
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
          solutions: [
            ['&2'],
          ],
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Division',
          enounces: ["Résouds cette équation."],
          expressions: [
            'x/&1=#{&2}',
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
          defaultDelay: 30,
        },
        {
          description: 'Division (2)',
          enounces: ["Résouds cette équation."],
          expressions: [
            '#{&1*&2}/x=#{&2}',
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
          type: 'equation',
          defaultDelay: 30,
        },
      ],
      'Dans $$\\Z$$': [
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
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Soustraction',
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
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Soustraction (2)',
          enounces: ["Résouds cette équation."],
          expressions: [
            '#{&1+(&2)}-x=&1',
          ],
          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$er[2;9]',
            },
          ],
          solutions: [
            ['&2'],
          ],
          type: 'equation',
          defaultDelay: 30,
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
              '&2': '-$e[2;9]',
            },
            {
              '&1': '-$e[2;9]',
              '&2': '$er[2;9]',
            },
          ],
          solutions: [
            ['&2'],
          ],
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Division',
          enounces: ["Résouds cette équation."],
          expressions: [
            'x/&1=#{&2}',
            'x/(&1)=#{&2}',
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
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Division (2)',
          enounces: ["Résouds cette équation."],
          expressions: [
            '(#{&1*(&2)})/x=#{&2}',
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
          type: 'equation',
          defaultDelay: 30,
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
          type: 'equation',
          defaultDelay: 30,
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
          type: 'equation',
          defaultDelay: 30,
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
            ['#{&2/&3}'],
          ],
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Multiplication',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&2x=#{&2*&3}/&1',
            'x*&2=#{&2*&3}/&1',
            '(&2/&1)x=#{&2*&3}/&1',
            'x*(&2/&1)=#{&2*&3}/&1',
            'x*&1=&2',
            '&1x=&2',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{&1}',
              '&3': '$e[2;9]',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{cd(&1)}',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{cd(&1)}',
            },
          ],
          solutions: [
            ['#{&3/&1}'],
            ['#{&3/&1}'],
            ['&3'],
            ['&3'],
            ['&2/&1'],
            ['&2/&1'],
          ],
          type: 'equation',
          defaultDelay: 30,
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
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Division (2)',
          enounces: ["Résouds cette équation."],
          expressions: [
            '#{&3*&2}/x=&3/&1',
            '&2/x=&1',
          ],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{&1}',
            },
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]\\{m(&1);d(&1)}',

            },
          ],
          solutions: [
            ['#{&2*&1}'],
            ['#{&2/&1}'],
          ],
          type: 'equation',
          defaultDelay: 30,
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
              '&2': '$e[1;9]',
            },
          ],
          solutions: [
            ['#{-&2/&1}'],
          ],
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Equation linéaire du premier degré',
          subdescription: 'Coefficients relatifs - Second membre nul',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&1x#s{&2}=0',
            '&2#s{&1}x=0',

          ],
          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$er[1;9]',
            },
          ],
          solutions: [
            ['#{-(&2)/(&1)}'],
          ],
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Equation linéaire du premier degré',
          subdescription: 'Coefficients positifs',
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
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Equation linéaire du premier degré',
          subdescription: 'Coefficients relatifs',
          enounces: ["Résouds cette équation."],
          expressions: [
            '&3x#s{&2}=&1',
            '&2#s{&3}x=&1',

          ],
          variables: [
            {
              '&1': '$er[1;9]',
              '&2': '$er[1;9]\\{&1}',
              '&3': '$er[2;9]',
            },

          ],
          solutions: [
            ['#{(&1-(&2))/(&3)}'],
          ],
          type: 'equation',
          defaultDelay: 30,
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
              '&4': '$e[2;&3-1]',
            },

          ],
          solutions: [
            ['#{(&1-&2)/(&3-&4)}'],
          ],
          type: 'equation',
          defaultDelay: 30,
        },
        {
          description: 'Equation linéaire du premier degré',
          subdescription: 'Coefficients positifs - Avec second membre',
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
          type: 'equation',
          defaultDelay: 30,
        },
      ]
    }
  },
}
