export default {
  Entiers:{
    Addition:{
      Résultat:[
        {
          description: "Trouver le résultat d'une addition",
          subdescription: "Nombres entiers à 1 chiffre",
          expressions: ["&1 + &2"],
          solutions: ["#{&1+&2}"],
          variables: { "&1": "$e[2;9]", "&2": "$e[2;9]" },
          type: "result",
          defaultDelay: 10
        },
        {
          description: "Trouver le résultat d'une addition",
          subdescription: "Nombres entiers à 2 chiffres",
          expressions: ["&1 + &2"],
          solutions: ["#{&1+&2}"],
          variables: { "&1": "$e[10;99]", "&2": "$e[10;99]" },
          type: "result",
          defaultDelay: 15
        },
        {
          description: "Trouver le résultat d'une addition",
          subdescription: "Nombres entiers à 3 chiffres",
          expressions: ["&1 + &2"],
          solutions: ["#{&1+&2}"],
          variables: { "&1": "$e[100;999]", "&2": "$e[100;999]" },
          type: "result",
          defaultDelay: 15
        }
      ],
      Compléments:[
        {
          description: "Trouver le complément à 10",
          expressions: ["?+&1=10", "&1+?=10"],
          solutions: ["#{10-&1}","#{10-&1}"],
          variables: { "&1": "$e[1;9]"},
          type: "trou",
          defaultDelay: 10
        },
        {
          description: "Trouver le complément à 100",
          expressions: ["?+&1=100", "&1+?=100"],
          solutions: ["#{100-&1}","#{100-&1}"],
          variables: { "&1": "$e[1;99]"},
          type: "trou",
          defaultDelay: 10
        },
        {
          description: "Trouver le complément à 1000",
          expressions: ["?+&1=1000", "&1+?=1000"],
          solutions: ["#{1000-&1}","#{1000-&1}"],
          variables: { "&1": "$e[1;999]"},
          type: "trou",
          defaultDelay: 15
        }
      ],
      "A trous":[
        {
          description: "Nombres à 1 chiffre",
          expressions: ["?+&1 = &2", "&1+? = &2"],
          solutions: ["#{&2-&1}","#{&2-&1}"],
          variables: { "&1": "$e[2;9]", "&2":"$e[11;&1+9]"},
          type: "trou",
          defaultDelay: 10
        },
        {
          description: "Nombres à 2 chiffres",
          expressions: ["?+&1 = &2", "&1+? = &2"],
          solutions: ["#{&2-&1}","#{&2-&1}"],
          variables: { "&1": "$e{2;2}", "&2":"$e[&1+12;&1+99]"},
          type: "trou",
          defaultDelay: 10
        },
        {
          description: "Nombres à 3 chiffres",
          expressions: ["?+&1 = &2", "&1+? = &2"],
          solutions: ["#{&2-&1}","#{&2-&1}"],
          variables: { "&1": "$e[101;897]", "&2":"$e[&1+102;999]"},
          type: "trou",
          defaultDelay: 10
        }
      ],
      "Sommes astucieuses":[
        {
          description: "Nombres à 1 chiffre",
          expressions: ["&1+#{10-&1}+&2", "&1+&2+#{10-&2}", "&1+&2+#{10-&1}"],
          solutions: ["#{10+&2}","#{10+&1}","#{10+&2}"],
          variables: { "&1": "$e{1;1}", "&2":"$e{1;1}"},
          type: "result",
          defaultDelay: 10
        },
        {
          description: "Nombres à 2 chiffres",
          expressions: ["&1+#{100-&1}+&2", "&1+&2+#{100-&2}", "&1+&2+#{100-&1}"],
          solutions: ["#{100+&2}","#{100+&1}","#{100+&2}"],
          variables: { "&1": "$e{2;2}", "&2":"$e{2;2}"},
          type: "result",
          defaultDelay: 10
        },
        {
          description: "Nombres à 3 chiffres",
          expressions: ["&1+#{1000-&1}+&2", "&1+&2+#{1000-&2}", "&1+&2+#{1000-&1}"],
          solutions: ["#{1000+&2}","#{1000+&1}","#{1000+&2}"],
          variables: { "&1": "$e{3;3}", "&2":"$e{3;3}"},
          type: "result",
          defaultDelay: 10
        },
      ]
    },
    Soustraction:{
        "Résultat":[
              {
                
                description: "Trouver le résultat d'une soustraction (résultat positif)",
                subdescription: "Nombres à 1 chiffre",
                expressions: ["&1-&2"],
                variables: { "&1": "$e[2;9]", "&2":"$e[1;&1-1]"},
                "defaultDelay": 10,
              },
              {
                "description": "Trouver le résultat d'une soustraction (résultat positif)",
                "description": "Nombres à 2 chiffres sans retenue à effectuer",
                "expressions": ["${ $e[2;9]*10 + $e[2;9] } - ${ $e[1;$1-1]*10 + $e[1;$2-1] }"],
                "correction": "value",
                "answer": "decimal",
                "defaultDelay": 15,
                "point": 1
              },
              {
                "level": 3,
                "description": "Nombres à 3 chiffres sans retenue",
                "enounce": "",
                "expressions": ["${ $e[2;9]*100 + $e[2;9]*10 + $e[2;9] } - ${ $e[1;$1-1]*100 + $e[1;$2-1]*10 + $e[1;$3-1] }"],
                "correction": "value",
                "answer": "decimal",
                "defaultDelay": 20,
                "point": 1
              },
              {
                "level": 4,
                "description": "Nombres à 2 chiffres",
                "enounce": "",
                "expressions": ["$e[11;99]-$e[10;$1-1]"],
                "correction": "value",
                "answer": "decimal",
                "defaultDelay": 15,
                "point": 1
              },
              {
                "level": 5,
                "description": "Nombres à 3 chiffres",
                "enounce": "",
                "expressions": ["$e[101;999]-$e[100;$1-1]"],
                "correction": "value",
                "answer": "decimal",
                "defaultDelay": 20,
                "point": 1
              }
            ]
          },
          {
            "label": "A trou",
            "levels": [
              {
                "level": 1,
                "description": "Nombres à 1 chiffre.",
                "enounce": "",
                "expressions": ["?-$e[2;8]=$e[1;9-$1]","$e[2;9]-?=$e[1;$1-1]" ],
                "correction": "value",
                "answer": "decimal",
                "defaultDelay": 10,
                "point": 1
              },
              {
                "level": 2,
                "description": "Nombres à 2 chiffres sans retenue.",
                "enounce": "",
                "expressions": ["${ $e[2;9]*10 + $e[2;9] } - ? =  ${ $e[1;$1-1]*10 + $e[1;$2-1] }"],
                "correction": "value",
                "answer": "decimal",
                "defaultDelay": 15,
                "point": 1
              },
              {
                "level": 3,
                "description": "Nombres à 3 chiffres sans retenue.",
                "enounce": "",
                "expressions": ["${ $e[2;9]*100 + $e[2;9]*10 + $e[2;9] } - ? = ${ $e[1;$1-1]*100 + $e[1;$2-1]*10 + $e[1;$3-1] }"],
                "correction": "value",
                "answer": "decimal",
                "defaultDelay": 20,
                "point": 1
              },
              {
                "level": 4,
                "description": "Nombres à 2 chiffres",
                "enounce": "",
                "expressions": ["?-$e[12;98]=$e[1;99-$1]","$e[12;99]-?=$e[1;$1-10]"],
                "correction": "value",
                "answer": "decimal",
                "defaultDelay": 15,
                "point": 1
              },
              {
                "level": 5,
                "description": "Nombres à 3 chiffres",
                "enounce": "",
                "expressions": ["?-$e[102;998]=$e[1;999-$1]","$e[102;999]-?=$e[1;$1-100]"],
                "correction": "value",
                "answer": "decimal",
                "defaultDelay": 20,
                "point": 1
              }
            ]
          }
        ]
  }
}
