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
          subdescription: 'Nombres entiers à 2 chiffres qui se marrient bien',
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
          description: 'Trouver le complément',
          subdescription: 'Complément à 10',
          expressions: ['?+&1=10', '&1+?=10'],
          solutions: [['#{10-&1}']],
          variables: [{ '&1': '$e[1;9]' }],
          type: 'trou',
          details: [['10-&1']],
          defaultDelay: 10,
        },
        {
          description: 'Trouver le complément',
          subdescription: 'Complément à 100',
          expressions: ['?+&1=100', '&1+?=100'],
          solutions: [['#{100-&1}']],
          variables: [{ '&1': '$e[1;99]' }],
          details: [['100-&1']],
          type: 'trou',
          defaultDelay: 10,
        },
        {
          description: 'Trouver le complément',
          subdescription: "Complément d'un nombre de dizines",
          expressions: ['?+&2=#{&1*10}', '&2+?=#{&1*10}'],
          solutions: [['#{&1*10-&2}']],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;&1*10-2]' }],
          details: [['#{&1*10}-&2']],
          type: 'trou',
          defaultDelay: 10,
        },
        {
          description: 'Trouver le complément à 1000',
          expressions: ['?+&1=1000', '&1+?=1000'],
          solutions: [['#{1000-&1}']],
          variables: [{ '&1': '$e[1;999]' }],
          details: [['1000-&1']],
          type: 'trou',
          defaultDelay: 15,
        },
      ],
      'A trous': [
        {
          description: 'Nombres à 1 chiffre',
          expressions: ['?+&1 = &2', '&1+? = &2'],
          solutions: [['#{&2-&1}']],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[11;&1+9]' }],
          details: [['&2-&1']],
          type: 'trou',
          defaultDelay: 10,
        },
        {
          description: 'Nombres à 2 chiffres',
          expressions: ['?+&1 = &2', '&1+? = &2'],
          solutions: [['#{&2-&1}']],
          variables: [{ '&1': '$e{2;2}', '&2': '$e[&1+12;&1+99]' }],
          details: [['&2-&1']],
          type: 'trou',
          defaultDelay: 10,
        },
        {
          description: 'Nombres à 3 chiffres',
          expressions: ['?+&1 = &2', '&1+? = &2'],
          solutions: [['#{&2-&1}', '#{&2-&1}']],
          variables: [{ '&1': '$e[101;897]', '&2': '$e[&1+102;999]' }],
          details: [['&2-&1']],
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
          defaultDelay: 10,
        },
        {
          description: 'Additionner par regroupements',
          subdescription: '3 Nombres à 2 chiffres',
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
          defaultDelay: 10,
        },
      ],
    },
    Soustraction: {
      Résultat: [
        {
          description: 'Calculer une différence (résultat positif)',
          subdescription: 'Nombres à 1 chiffre',
          expressions: ['&1-&2'],
          variables: [{ '&1': '$e[5;9]', '&2': '$e[1;&1-1]' }],
          solutions: [['#{&1-&2}']],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Calculer une différence (résultat positif)',
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
          solutions: [['#{&1*10 + &2 -  (&3*10 + &4)}']],
          defaultDelay: 15,
          type: 'result',
        },
        {
          description: 'Calculer une différence (résultat positif)',
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
          solutions: [['#{ &1*100 + &2*10 + &3 -( &4*100 + &5*10 + &6 )}']],
          type: 'result',
          defaultDelay: 20,
        },
        {
          description: 'Calculer une différence (résultat positif)',
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
          solutions: [['#{ &1*10 + &4 -( &3*10 + &2 )}']],
          type: 'result',
          defaultDelay: 15,
        },
        {
          description: 'Calculer une différence (résultat positif)',
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
          solutions: [['#{ &1*100 + &5*10 + &6 -( &4*100 + &2*10 + &3 )}']],
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
          solutions: [['#{&1+&2}', '#{&1-&2}']],
          details: [['&1+&2'], ['&1-&2']],
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
            [
              '#{ &1*10 + &2 -  ( &3*10 + &4) }',
              '#{ &1*10 + &2 + &3*10 + &4 }',
            ],
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
              '#{ &1*100 + &2*10 + &3 - (&4*100 + &5*10 + &6) }',
              '#{ &1*100 + &2*10 + &3 + &4*100 + &5*10 + &6 }',
            ],
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
            ['#{ &1*10 + &4 - (&3*10 + &2 )}', '#{ &1*10 + &2 + &3*10 + &4 }'],
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
              '#{ &1*100 + &5*10 + &6 - (&4*100 + &2*10 + &3) }',
              '#{&1*100 + &2*10 + &3 + &4*100 + &5*10 + &6}',
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
    },
    Multiplication: {
      Résultat: [
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Nombres à 1 chiffre',
          expressions: ['&1*&2'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Un facteur à 2 chiffres',
          expressions: ['&1*&2', '&2*&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[12;99]' }],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Produits à connaître par coeur',
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
          defaultDelay: 10,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Multiplication par 10, 100 ou 1000',
          expressions: ['&1*#{10^&2}'],
          variables: [{ '&1': '$e[2;99]', '&2': '$e[1;3]' }],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription:
            'Les 2 facteurs sont des multiples de 10, 100 ou 1000',
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
          defaultDelay: 10,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Multiplication par 50',
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
          defaultDelay: 10,
        },
        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Multiplication par 25',
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
          defaultDelay: 10,
        },

        {
          description: "Calculer un produit d'entiers",
          subdescription: 'Un facteur à 3 chiffres',
          expressions: ['&1*&2', '&2*&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[102;999]' }],
          type: 'result',
          defaultDelay: 10,
        },
      ],
      'A trou': [
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Facteurs à 1 chiffre',
          expressions: ['?*&1=#{&1*&2}', '&1*?=#{&1*&2}'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[3;9]' }],
          solutions: ['&2'],
          type: 'trou',
          defaultDelay: 10,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription: 'Produits classiques',
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
            [
              '25',
              '20',
              '50',
              '12',
              '15',
              '14',
              '18',
              '15',

              '4',
              '5',
              '2',
              '5',
              '4',
              '5',
              '5',
              '6',
            ],
          ],

          options: ['exhaust'],
          type: 'trou',
          defaultDelay: 10,
        },
        {
          description: 'Compléter une multiplication à trou',
          subdescription:
            'Les 2 facteurs sont des multiples de 10, 100 ou 1000',
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
          defaultDelay: 10,
        },
      ],
      Carrés: [
        {
          description: 'Calculer un carré',
          subdescription: 'Entier de 1 à 15',
          expressions: ['&1^2'],
          variables: [{ '&1': '$e[1;15]' }],
          type: 'result',
          defaultDelay: 10,
        },
      ],
      'Produits astucieux': [
        {
          description: 'Calculer astucieusement un produit',
          subdescription: 'Facteurs à 1 chiffre',
          expressions: ['?*&1=#{&1*&2}', '&1*?=#{&1*&2}'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[3;9]' }],
          solutions: [['&2']],
          type: 'result',
          defaultDelay: 10,
        },
      ],
      Distributivité: [
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Multiplication par 11',
          expressions: ['11*&1'],
          variables: [{ '&1': '$e[12;40]' }],
          details: [['10 \\times &1 + &1', '#{10*&1} + &1']],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Multiplication par 99',
          expressions: ['99*&1'],
          variables: [{ '&1': '$e[15;40]' }],
          details: [['100 \\times &1 - &1', '#{100*&1} - &1']],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Multiplication par 12',
          expressions: ['12*&1'],
          variables: [{ '&1': '$e[13;40]' }],
          details: [['10 \\times &1 + 2 \\times &1', '#{10*&1} + #{2*&1}']],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Multiplication par 98',
          expressions: ['98*&1'],
          variables: [{ '&1': '$e[15;40]' }],
          details: [['100 \\times &1 - 2 \\times &1', '#{100*&1} - #{2*&1}']],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Utiliser la distributivité',
          subdescription: 'Factorisation pour obtenir 100',
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
          defaultDelay: 10,
        },
      ],
      Décomposition: [
        {
          description: 'Décomposer un entier en produit',
          subdescription: 'Produit de deux nombres entiers',
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
          defaultDelay: 10,
        },
      ],
    },
    Division: {
      Résultat: [
        {
          description: 'Calculer un quotient entier',
          subdescription: 'Quotients associés aux tables de multiplication',
          expressions: ['#{&1*&2}:&2'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 10,
        },
      ],
      'A trou': [
        {
          description: 'Compléter une division à trou ',
          subdescription: 'Quotients associés aux tables de multiplication',
          expressions: ['?:&2=&1', '#{&1*&2}:?=&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          solutions: [['#{&1*&2}'], ['&2']],
          details: [['&1 \\times &2'], ['#{&1*&2} \\div &1']],
          type: 'trou',
          defaultDelay: 10,
        },
      ],
      'Division euclidienne': [
        {
          description: 'Effectuer une division euclidienne ',
          subdescription: '',
          enounce:
            "Ecrire l'égalité correspondant à la division euclidienne de #{&1*&2+&3} par &2",
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[0;&2-1]' }],
          expressions: ['#{&1*&2+&3}'],
          solutions: [['&1 * &2+&3']],
          options: ['no-exp'],
          type: 'result',
          defaultDelay: 10,
        },
      ],
    },
  },
  Décimaux: {
    Addition: {
      Résultat: [
        {
          description: 'Calculer une somme ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (pas de retenue)',
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
          defaultDelay: 10,
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Parties décimales à 1 et 2 chiffres (pas de retenue)',
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
          defaultDelay: 10,
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenue pour la partie decimale)',
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
          defaultDelay: 10,
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenues)',
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
          defaultDelay: 10,
        },
      ],
      'A trou': [
        {
          description: 'Compléter une addition à trou ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (pas de retenue)',
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
          expressions: ['&3+?=##{&3+&6}'],
          type: 'trou',
          solutions: [['&6']],
          'result-type': 'decimal',
          defaultDelay: 10,
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Parties décimales à 1 et 2 chiffres (pas de retenue)',
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
          defaultDelay: 10,
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenue pour la partie decimale)',
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
          defaultDelay: 10,
        },
        {
          description: 'Calculer une somme ',
          subdescription:
            'Partie entière et partie décimale à 1 chiffre (avec retenues)',
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
          defaultDelay: 10,
        },
      ],
    },
    Multiplication: {
      Résultat: [
        {
          description: 'Calculer un produit',
          subdescription: 'Un des facteurs est un entier',
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$d{1;1}',
            },
          ],
          expressions: ['&3*&4', '&4*&3'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 10,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Un des facteurs est un entier',
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$d{1;2}',
            },
          ],
          expressions: ['&1*&2', '&2*&1'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 10,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Multiplier par 10, 100 ou 1000',
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
          defaultDelay: 10,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Multiplier par 0,1 ; 0,01 ou 0,001',
          variables: [
            {
              '&1': '$d{$e[1;3];$e[0;2]}',
              '&2': '$l{0.1;0.01;0.001}',
            },
          ],
          expressions: ['&1*##{&2}', '##{&2}*&1'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 10,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'Multiplier deux nombres décimaux',
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
          defaultDelay: 10,
        },
        {
          description: 'Calculer un produit',
          subdescription: "Determiner un produit à partir d'un autre",
          enounce:
            'Sachant que $$%%{&1} \\times %%{&2}=%%{&1*&2}$$ combien vaut $$%%{&1*&3} \\times %%{&2}$$ ?',
          variables: [
            {
              '&1': '$d{$e[1;2];$e[0;2]}',
              '&2': '$d{2;1}',
              '&3': '$l{10;100;1000}',
            },
          ],
          options: ['no-exp'],
          expressions: ['##{&1*&3}* &2'],
          solutions: [['##{&1*&3*&2}']],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 10,
        },
      ],
    },
    Division: {
      Résultat: [
        {
          description: 'Calculer un quotient',
          subdescription: 'Diviser par 10, 100 ou 1000',
          variables: [
            {
              '&1': '$d{$e[1;3];$e[0;2]}',
              '&2': '$l{10;100;1000}',
            },
          ],
          expressions: ['&1:&2'],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 10,
        },
        {
          description: 'Calculer un quotient',
          subdescription: 'Diviser par 0,1 ; 0,01 ou 0,001',
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
          defaultDelay: 10,
        },
        {
          description: 'Calculer un quotient',
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
          defaultDelay: 10,
        },
      ],
    },
  },
  Relatifs: {
    Addition: {
      'Droite graduée': [
        {
          description: 'Calculer une somme ou une différence',
          subdescription: "A l'aide de la droite graduée",
          expressions: ['(-&1)+&2', '(-&1)-&2', '&3-&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[1;&1-1]' }],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Compléter une égalité',
          subdescription: "A l'aide de la droite graduée",
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
          defaultDelay: 10,
        },
      ],
      Résultat: [
        {
          description: 'Calculer une somme',
          subdescription: 'Cas général',
          expressions: ['(-&1)+&2', '(-&1)+(-&2)', '&1+(-&2)'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Compléter une égalité',
          subdescription: 'Cas général',
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
          defaultDelay: 10,
        },
        {
          description: "Simplifier l'écriture",
          enounce:
            'Simplifie cette expression en enlevant les doubles signes et les parenthèses inutiles',
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
          defaultDelay: 10,
        },
        {
          description: 'Calculer',
          subdescription: 'Avec écriture simplifiée',
          expressions: ['-&1+&2', '-&1-&2', '&3-&1'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[1;&1-1]' }],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Multiplier',
          expressions: ['(-&1)*&2', '(-&1)*(-&2)', '&1*(-&2)'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Diviser',
          expressions: [
            '(-#{&1*&2}):&2',
            '(-#{&1*&2}):(-&2)',
            '#{&1*&2}:(-&2)',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Multiplication à trou',
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
          defaultDelay: 10,
        },
      ],
    },
  },
  Fractions: {
    'Différentes écritures': {
      'Forme décimale': [
        {
          description: "Déterminer la forme décimale d'une fraction",
          expressions: ['&2/&1'],
          variables: [{ '&1': '$l{2;4;5;10}', '&2': '$e[1;&1+1]' }],
          type: 'result',
          'result-type': 'decimal',
          defaultDelay: 10,
        },
        {
          description: 'Déterminer la forme fractionnaire',
          expressions: ['##{&2/&1}'],
          variables: [{ '&1': '$l{2;4;5;10}', '&2': '$e[1;&1-1]' }],
          type: 'result',
          defaultDelay: 10,
        },
      ],
      'Egalité de fractions': [
        {
          description: 'Compléter une égalité de fractions',
          expressions: [
            '&2/&1=?/#{&1*&3}',
            '&2/&1=#{&2*&3}/?',
            '?/#{&1*&3}=&2/&1',
            '#{&2*&3}/?=&2/&1',
          ],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[1;&1-1]', '&3': '$e[2;9]' }],
          solutions: [['#{&2*&3}'], ['#{&1*&3}'], ['#{&2*&3}'], ['#{&1*&3}']],
          type: 'trou',
          defaultDelay: 10,
        },
      ],
      Simplification: [
        {
          description: 'Simplifier une fraction',
          enounce: 'Simplifier le plus possible',
          expressions: ['#{&2*&3}/#{&1*&3}', '#{&1*&3}/#{&2*&3}'],
          variables: [{ '&1': '$e[2;9]', '&2': '$e[1;&1-1]', '&3': '$e[2;9]' }],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: 'Simplifier une fraction',
          enounce: 'Simplifier le plus possible (avec signes)',
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
          defaultDelay: 10,
        },
      ],
    },
    'Egalité à compléter': {
      Définition: [
        {
          description: 'Compléter une égalité',
          subdescription: "Définition d'un quotient",
          expressions: ['&2*?=&1', '?*&2=&1'],
          variables: [{ '&1': '$e[2;19]', '&2': '$e[2;19]\\{cd(&1)}' }],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&1/&2']],
          details: [['&1:&2']],
          type: 'trou',
          defaultDelay: 10,
        },
      ],
      'Addition - Soustraction': [
        {
          description: 'Compléter une égalité',
          subdescription: 'Addition ou soustraction',
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
          defaultDelay: 10,
        },
        {
          description: 'Compléter une égalité',
          subdescription: 'Addition ou soustraction, avec nombres relatifs',
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
          defaultDelay: 10,
        },
      ],
      Multiplication: [
        {
          description: 'Compléter une égalité',
          subdescription: 'Multiplication',
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
          defaultDelay: 10,
        },
        {
          description: 'Compléter une égalité',
          subdescription: 'Multiplication avec nombres relatifs',
          expressions: [
            '(?/&3)*(&2/&4)=#{&1*&2}/#{&3*&4}',
            '(&1/?)*(&2/&4)=#{&1*&2}/#{&3*&4}',
            '(&1/&3)*(?/&4)=#{&1*&2}/#{&3*&4}',
            '(&1/&3)*(&2/?)=#{&1*&2}/#{&3*&4}',
          ],
          variables: [
            {
              '&1': '$er[2;9]',
              '&2': '$er[2;9]',
              '&3': '$er[2;9]\\{&1;&2;-&1;-&2}',
              '&4': '$er[2;9]\\{&1;&2;-&1;-&2}',
            },
          ],
          // details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          solutions: [['&1'], ['&3'], ['&2'], ['&4']],
          type: 'trou',
          defaultDelay: 10,
        },
      ],
    },
    Calcul: {
      'Addition et Soustraction': [
        {
          description: 'Additionner ou soustraire',
          description:
            'Fractions de même dénominateur, nombres positifs, sans simplification',
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
            'Fractions de même dénominateur, nombres positifs, simplification intermediaire possible, simplification finale',
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

          defaultDelay: 10,
        },
        {
          description: 'Additionner ou soustraire',
          subdescription:
            'Fractions de même dénominateur, nombres positifs, pas de simplification intermediaire, simplification finale',
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

          defaultDelay: 10,
        },
        {
          description: 'Additionner ou soustraire',
          subdescription:
            'Fractions de même dénominateur, nombres relatifs, simplification intermediaire possible, simplification finale',
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

          defaultDelay: 10,
        },
        {
          description: 'Additionner ou soustraire',
          description:
            "Dénominateur multiple de l'autre, nombres positifs, sans simplification",
          expressions: ['&1/&3+&2/#{&3*&4}', '&2/#{&3*&4}+&1/&3'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&1);cd(&2)}',
              '&4': '$e[2;9]\\{cd(&2)}',
            },
          ],
          conditions: ['pgcd(&1*&4+&2;&3*&4)=1'],
          type: 'result',
          details: [
            [
              '\\frac{&1\\times &4}{&3 \\times &4} + \\frac{&2}{#{&3*&4}}',
              '\\frac{#{&1*&4}}{#{&3*&4}} + \\frac{&2}{#{&3*&4}}',
              '\\frac{#{&1*&4}+&2}{#{&3*&4}}',
            ],
            [
              '\\frac{&2}{#{&3*&4}} + \\frac{&1\\times &4}{&3 \\times &4}',
              '\\frac{&2}{#{&3*&4}}+\\frac{#{&1*&4}}{#{&3*&4}}',
              '\\frac{&2+#{&1*&4}}{#{&3*&4}}',
            ],
          ],
          // solutions: [['#{&1+&3}/&2'],['#{&1-&2}/&3']],
          defaultDelay: 30,
        },

        {
          description: 'Additionner ou soustraire',
          description:
            "Dénominateur multiple de l'autre, nombres positifs, simplification initiale",
          expressions: ['&1/&3+#{&2*&4}/#{&3*&4}', '#{&2*&4}/#{&3*&4}+&1/&3'],
          variables: [
            {
              '&1': '$e[2;9]',
              '&2': '$e[2;9]',
              '&3': '$e[2;9]\\{cd(&1);cd(&2)}',
              '&4': '$e[2;9]\\{cd(&2);cd(&3)}',
            },
          ],
          conditions:[
            "pgcd(&1+&2;&3)=1"
          ],
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
      ],
      "Fraction d'une quantité": [
        {
          description: "Calculer une fraction d'une quantité",
          enounce: 'Calculer $$\\frac{&2}{&3}$$ de $$%{&1*&3}$$',
          expressions: ['(&2/&3)*#{&1*&3}'],
          options: ['no-exp'],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]\\{cd(&2)}' },
          ],
          details: [['(#{&1*&3}:&3) \\times &2', '&1 \\times &2']],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: "Calculer une fraction d'une quantité",
          expressions: ['(&2/&3)*#{&1*&3}', '#{&1*&3}*(&2/&3)'],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]\\{cd(&2)}' },
          ],
          details: [['\\frac{#{&1*&3}}{&3} \\times &2', '&1 \\times &2']],
          type: 'result',
          defaultDelay: 10,
        },
        {
          description: "Calculer une fraction d'une quantité",
          expressions: ['(#{&2*&3}/&3)*&1}', '&1*(#{&2*&3}/&3)'],
          variables: [
            { '&1': '$e[2;9]', '&2': '$e[2;9]', '&3': '$e[2;9]\\{cd(&1)}' },
          ],
          details: [['&2 \\times &1'], ['&1 \\times &2']],
          type: 'result',
          defaultDelay: 10,
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
          defaultDelay: 10,
        },
        {
          description: 'Calculer un produit',
          subdescription: 'avec simplification',
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
          defaultDelay: 10,
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
          defaultDelay: 10,
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
          defaultDelay: 10,
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
          defaultDelay: 10,
        },
        {
          description: "Calculer l'inverse d'un nombre",
          subdescription: 'Avec la notation puissance',
          expressions: ['&1^(-1)', '(1/&1)^(-1)', '(&1/&2)^(-1)'],
          variables: [{ '&1': '$e[2;19]', '&2': '$e[2;19]\\{cd(&1)}' }],
          solutions: [['1/&1'], ['&1'], ['&2/&1']],
          type: 'result',
          defaultDelay: 10,
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
          defaultDelay: 10,
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
          defaultDelay: 10,
        },
      ],
    },
  },
}
