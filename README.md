### Environment requirement
> NodeJS: `v16`
>
> NPM: `v8`

## Installation

With yarn:

```bash
$ yarn install
```

With NPM:

```bash
$ npm install
```

### Configuration

-- config in file src/envs/${env}.json

if run in local, env is "lcl"

change api url, chat server url, firebase, facebook,... to your configuration

### Run the App in development mode

Once you have your setup ready, run:
With yarn:

    $ yarn dev

With npm:

    $ npm run dev

### Build and deploy
With yarn:

    $ yarn build:${env}
    $ yarn start:${env}

With npm:

    $ npm run build:${env}
    $ npm run start:${env}
