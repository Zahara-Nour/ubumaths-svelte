export default {
  Entiers: {
    Addition: {
      Résultat: [
        {
          description: 'Calculer une somme',
          subdescription:
            'Nombres entiers à 1 chiffre (résultat inférieur à 10)',
          expressions: ['&1 + &2', '&1 + &2'],
          variables: [
            { '&1': '$e[5;7]', '&2': '$e[2;9-&1]' },
            { '&1': '$e[2;4]', '&2': '$e[2;9-&1]' },
          ],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Nombres entiers à 2 chiffre (sans retenue)',
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
          defaultDelay: 10,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Nombres entiers à 3 chiffre (sans retenue)',
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
          defaultDelay: 10,
        },
        {
          description: 'Calculer une somme',
          subdescription:
            'Nombres entiers à 1 chiffre (résultat supérieur à 10)',
          expressions: ['&1 + &2'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[11-&1;9]' }],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Calculer une somme',
          subdescription: 'Nombres entiers à 2 chiffres (avec retenue)',
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
      Compléments: [
        {
          description: 'Trouver le complément à 10',
          expressions: ['?+&1=10', '&1+?=10'],
          solutions: ['#{10-&1}', '#{10-&1}'],
          variables: [{ '&1': '$e[1;9]' }],
          type: 'trou',
          defaultDelay: 10,
        },
        {
          description: 'Trouver le complément à 100',
          expressions: ['?+&1=100', '&1+?=100'],
          solutions: ['#{100-&1}', '#{100-&1}'],
          variables: [{ '&1': '$e[1;99]' }],
          type: 'trou',
          defaultDelay: 10,
        },
        {
          description: 'Trouver le complément à 1000',
          expressions: ['?+&1=1000', '&1+?=1000'],
          solutions: ['#{1000-&1}', '#{1000-&1}'],
          variables: [{ '&1': '$e[1;999]' }],
          type: 'trou',
          defaultDelay: 15,
        },
      ],
      'A trous': [
        {
          description: 'Nombres à 1 chiffre',
          expressions: ['?+&1 = &2', '&1+? = &2'],
          solutions: ['#{&2-&1}', '#{&2-&1}'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[11;&1+9]' }],
          type: 'trou',
          defaultDelay: 10,
        },
        {
          description: 'Nombres à 2 chiffres',
          expressions: ['?+&1 = &2', '&1+? = &2'],
          solutions: ['#{&2-&1}', '#{&2-&1}'],
          variables: [{ '&1': '$e{2;2}', '&2': '$e[&1+12;&1+99]' }],
          type: 'trou',
          defaultDelay: 10,
        },
        {
          description: 'Nombres à 3 chiffres',
          expressions: ['?+&1 = &2', '&1+? = &2'],
          solutions: ['#{&2-&1}', '#{&2-&1}'],
          variables: [{ '&1': '$e[101;897]', '&2': '$e[&1+102;999]' }],
          type: 'trou',
          defaultDelay: 10,
        },
      ],
      'Sommes astucieuses': [
        {
          description: 'Additionner par regroupements',
          subdescription: '5 Nombres à 1 chiffre',
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
              '\\textcolor{green}{10}+\\textcolor{orange}{10}+&3'
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
          defaultDelay: 10,
        },
        {
          description: 'Additionner par regroupements',
          subdescription: '3 Nombres à 2 chiffres',
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
          defaultDelay: 10,
        },
        {
          description: 'Additionner par regroupements',
          subdescription: 'Nombres à 3 chiffres',
          expressions: [
            '&1+#{1000-&1}+&2',
            '&1+&2+#{1000-&2}',
            '&1+&2+#{1000-&1}',
          ],
          variables: [{ '&1': '$e{3;3}', '&2': '$e{3;3}' }],
          type: 'result',
          defaultDelay: 10,
        },
      ],
    },
    Soustraction: {
      Résultat: [
        {
          description:
            "Trouver le résultat d'une soustraction (résultat positif)",
          subdescription: 'Nombres à 1 chiffre',
          expressions: ['&1-&2'],
          variables: [{ '&1': '$e[5;9]', '&2': '$e[1;&1-1]' }],
          solutions: ['#{&1-&2}'],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description:
            "Trouver le résultat d'une soustraction (résultat positif)",
          subdescription: 'Nombres à 2 chiffres (sans retenue)',
          expressions: ['#{ &1*10 + &2 } - #{ &3*10 + &4 }'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[5;9]',
              '&3': '$e[1;&1-1]',
              '&4': '$e[1;&2-1]',
            },
          ],
          solutions: ['#{&1*10 + &2 -  (&3*10 + &4)}'],
          defaultDelay: 15,
          type: 'result',
        },
        {
          description:
            "Trouver le résultat d'une soustraction (résultat positif)",
          subdescription: 'Nombres à 3 chiffres (sans retenue)',
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
          solutions: ['#{ &1*100 + &2*10 + &3 -( &4*100 + &5*10 + &6 )}'],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description:
            "Trouver le résultat d'une soustraction (résultat positif)",
          subdescription: 'Nombres à 2 chiffres (avec retenue)',
          expressions: ['#{ &1*10 + &4 } - #{ &3*10 + &2 }'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[1;&1-1]',
              '&4': '$e[1;&2-1]',
            },
          ],
          solutions: ['#{ &1*10 + &4 -( &3*10 + &2 )}'],
          type: 'result',
          defaultDelay: 15,
        },
        {
          description:
            "Trouver le résultat d'une soustraction (résultat positif)",
          subdescription: 'Nombres à 3 chiffres (avec retenue)',
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
          solutions: ['#{ &1*100 + &5*10 + &6 -( &4*100 + &2*10 + &3 )}'],
          type: 'result',
          defaultDelay: 20,
        },
      ],
      'A trou': [
        {
          description: 'Compléter une soustraction à trou (résultat positif)',
          subdescription: 'Nombres à 1 chiffre',
          expressions: ['?-&1=&2', '&1-?=&2'],
          variables: [
            { '&1': '$e[2;8]', '&2': '$e[1;9-&1]' },
            { '&1': '$e[2;9]', '&2': '$e[1;&1-1]' },
          ],
          solutions: ['#{&1+&2}', '#{&1-&2}'],
          type: 'trou',
          defaultDelay: 10,
        },
        {
          description: 'Compléter une soustraction à trou (résultat positif)',
          subdescription: 'Nombres à 2 chiffres sans retenue.',
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
            '#{ &1*10 + &2 -  ( &3*10 + &4) }',
            '#{ &1*10 + &2 + &3*10 + &4 }',
          ],
          type: 'trou',
          defaultDelay: 15,
        },
        {
          description: 'Compléter une soustraction à trou (résultat positif)',
          subdescription: 'Nombres à 3 chiffres (sans retenue)',
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
            '#{ &1*100 + &2*10 + &3 - (&4*100 + &5*10 + &6) }',
            '#{ &1*100 + &2*10 + &3 + &4*100 + &5*10 + &6 }',
          ],
          type: 'trou',
          defaultDelay: 20,
        },
        {
          description: 'Compléter une soustraction à trou (résultat positif)',
          subdescription: 'Nombres à 2 chiffres (avec retenue)',
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
            '#{ &1*10 + &4 - (&3*10 + &2 )}',
            '#{ &1*10 + &2 + &3*10 + &4 }',
          ],
          type: 'trou',
          defaultDelay: 15,
        },
        {
          description: 'Compléter une soustraction à trou (résultat positif)',
          subdescription: 'Nombres à 3 chiffres (avec retenue)',
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
            '#{ &1*100 + &5*10 + &6 - (&4*100 + &2*10 + &3) }',
            '#{&1*100 + &2*10 + &3 + &4*100 + &5*10 + &6}',
          ],
          type: 'trou',
          defaultDelay: 20,
        },
      ],
    },
    Multiplication: {
      Résultat: [
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Nombres à 1 chiffre',

          expressions: ['$e[2;9]*$e[2;9]'],
          variables: [''],
          solutions: [''],

          defaultDelay: 10,
        },
      ],
    },
  },
}
