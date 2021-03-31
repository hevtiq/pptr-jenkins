# Automated testing with Puppeteer and Jenkins

## 1. Setup project

### 1.1 Setup git

[ ] Setup SSH

```bat
    rem create new ssh key
    cd %userprofile%\.ssh && cd ~/.ssh
    ssh-keygen -t rsa -b 4096 -C "[email]"
    enter key name: [username]_[company]
    enter pass phase: ********
    type %userprofile%\.ssh\[username]_[company].pub | clip && cat ~/.ssh [username]_[company].pub | pbcopy

    rem paste into SSH setting in github

    rem check windows credentials

```

[ ] Setup github: [https://github.com/_username_/_repo_.git](https://github.com/_username_/_repo_.git)

[ ] Setup repo in local to async data with github

```bat
    mkdir pptr-jenkins && cd pptr-jenkins
    git clone _repo_
    git add README.md
    git commit -m "add first commit"
    git branch -M dev
    git push -u origin dev
```

### 1.2 Setup packages

```bat
    rem: create new package.json
    cd pptr-jenkins && git init -y

    rem: install packages
    npm install chai mocha puppeteer prettier
```

```json
// package.json
"scripts": {
    "e2e-test": "./node_modules/mocha/bin/mocha --timeout=30000 ./test/e2e.test.js",
    "smoke-test": "./node_modules/mocha/bin/mocha --timeout=30000 ./test/smoke.test.js"
  },
```

### 1.3 Create percy account

- In page [percy](https://percy.io/) create new account
- Create new pptr project
- Integrate github
- Setup percy variable to window environment

## 2. Start project
