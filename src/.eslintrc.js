module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "webextensions": true,
    },
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "parserOptions": {
        'ecmaVersion': 7,
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        'no-console' : 0,
        'no-cond-assign' : 0,
        'no-unused-vars': [
          'error',
          {'varsIgnorePattern': '^Preact$|_'},
        ],
        'react/react-in-jsx-scope': 0,
        'react/no-unknown-property': [2, {ignore: ['class']}]

    },

    "plugins": [
      "react"
    ]
};
