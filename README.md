# books.ropaolle.se

## Info

### Install

[info](https://www.hostingadvice.com/how-to/update-node-js-latest-version/)

```bash
# Install Node 10
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

# Create-react-app
sudo npm i -g create-react-app
create-react-app books.ropaolle.se
cd books.ropaolle.se

# Git
git config --global user.email "ropaolle@gmail.com"
git config --global user.name "ropaolle"
git init
git remote add origin https://github.com/ropaolle/books.ropaolle.se
git push origin master

# Add linting (https://alligator.io/react/linting-react/)
npm run eject
npm i --save-dev eslint eslint-loader babel-loader babel-eslint eslint-plugin-react eslint-config-airbnb
touch .eslintrc
{
  "parser": "babel-eslint",
  "plugins": [
    "react"
  ],
  "rules": {
    "no-undef": [ 1 ],
  }
}
```

### Hyper-V

User: olle/retro1971

```bash
# Add keys ./ssh/id_rsa och ./ssh/id_rsa.pub
chmod 400 ~/.ssh/* # WARNING: UNPROTECTED PRIVATE KEY FILE!

# Node/Npm
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install -y build-essential
```

### Ubuntu

```bash
# Repositories
sudo add-apt-repository universe # Add
sudo add-apt-repository -r universe # Remove
```

### Old lint rules

```bash
{
  "root": true,
  "extends": ["plugin:promise/recommended", "airbnb"],
  "plugins": ["react", "promise"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "jest": true
  },
  "rules": {
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ]
  }
}
```
