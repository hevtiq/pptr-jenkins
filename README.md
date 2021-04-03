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
    "e2e-test": "node ./node_modules/mocha/bin/mocha --timeout=30000 ./tests/e2e.test.js",
    "smoke-test": "node ./node_modules/mocha/bin/mocha --timeout=30000 ./tests/smoke.test.js",
    "start-jenkins-server": "java -jar jenkins.war -httpPort=7000 --enable-future-java",
    "tests": "e2e-test && smoke-test"
  },
```

### 1.3 Setup jenkins

- download jenkins.war and move to ./ folder.
- run comment to setup: `java -jar jenkins.war -httpPort=7000 --enable-future-java`

#### 1.3.1  Jenkins cli

[Jenkins cli](http://localhost:[port]/cli/)

#### 1.3.2. Restart jenkins service

#### 1.3.2.1 From URL

- Forces a restart without waiting for builds to complete.
[Jenkins restart](http://localhost:[port]/restart)

- Allows all running jobs to complete. New jobs will remain in the queue to run after the restart is complete.
[Jenkins safeRestart](http://localhost:[port]/safeRestart)

#### 1.3.2.2 From cmd/batch file

Config Jenkins to start/stop server in window

Environment Variables:
`JENKINS = C:\Program Files\Jenkins`
`%JENKINS%`

- Stop jenkins server: `jenkins stop`
- Start jenkins server: `jenkins start`

#### 1.3.2.3 From Ubuntu

`udo service jenkins status`
`udo service jenkins start`
`udo service jenkins stop`
`udo service jenkins restart`

#### 1.3.2.4 From CentOS

Start/stop jenkins in CentOS
`sudo systemctl restart jenkins`
`sudo systemctl status jenkins`
`sudo systemctl stop/start jenkins`
`sudo systemctl status jenkins`

#### 1.3.2.5 From Docker

Start/stop jenkins in Docker
`docker stop kenkins`
`docker start jenkins`

### 1.4 Fix Jenkins Console Log Encoding Issue on Windows

Problem: UTF-8 char encoding does not work on console (Linux)
Fix: `java -Dfile.encoding=UTF-8 <remain_command>`
Add parameter `-Dfile.encoding=UTF8` to file `C:\Program Files\Jenkins\jenkins.xml`

```xml
<arguments>-Xrs -Xmx256m  -Dfile.encoding=UTF8 -Dhudson.lifecycle=hudson.lifecycle.WindowsServiceLifecycle -jar "C:\Program Files\Jenkins\jenkins.war" --httpPort=<port> --webroot="%LocalAppData%\Jenkins\war"</arguments>
```

### 1.5 View jenkins info (ex: secret)

`%LocalAppData%\Jenkins\.jenkins`

1.6 Build

Form Dashboard > New Item
Enter an item name: Puppeteer
Chose Freestyle project > OK
In General tab
Description: Automated testing with Puppeteer and Jenkins
Select Advanced > Click Use custom workspace
In Directory: type Project folder directory
Build > Add build step > Execute Window batch command > npm run smoke-test
Apply

Parameterized Build:
Config > General > check "This project is parameterized" > Add parameter > Choice parameter
Name: script
Choices:
smoke-test
e2e-test
tests
Description: Build test with choice

In Build > Shell in Window
`npm run %script%`

In Build > Shell in Mac/Linux
`npm run $script`

## 2. Start project
