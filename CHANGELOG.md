# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.2.3](https://github.com/DevAndDeliver/nest-logging-transport/compare/v1.2.2...v1.2.3) (2024-03-23)


### Bug Fixes

* include only src into dist ([767853b](https://github.com/DevAndDeliver/nest-logging-transport/commit/767853b62fb1254eb5cf4b317d939bcecf11ba42))

### [1.2.2](https://github.com/DevAndDeliver/nest-logging-transport/compare/v1.2.1...v1.2.2) (2024-03-23)


### Continuous Integration

* add dependabot config ([#8](https://github.com/DevAndDeliver/nest-logging-transport/issues/8)) ([b086fa8](https://github.com/DevAndDeliver/nest-logging-transport/commit/b086fa8545d06f98d857abbb951d45317b46a199))
* add more node versions to test on ([1d48de1](https://github.com/DevAndDeliver/nest-logging-transport/commit/1d48de1450d2219e06d4a35f6e4c6c8109a268d1))


### Build Configuration

* **deps:** bump [@babel/traverse](https://github.com/babel/babel/tree/HEAD/packages/babel-traverse) from 7.20.13 to 7.24.1. ([ce259bf](https://github.com/DevAndDeliver/nest-logging-transport/commit/ce259bf01beeddc43f53102c2bbdb6b2e65a64ca))
* **deps:** bump github/codeql-action from 1 to 3 ([#10](https://github.com/DevAndDeliver/nest-logging-transport/issues/10)) ([98a4cd3](https://github.com/DevAndDeliver/nest-logging-transport/commit/98a4cd3eed8258f6724e23a14180245064489b86))
* **deps:** bump json5 from 2.2.1 to 2.2.3 ([#3](https://github.com/DevAndDeliver/nest-logging-transport/issues/3)) ([e35c46d](https://github.com/DevAndDeliver/nest-logging-transport/commit/e35c46d656fb25f164fb3324e31be54d7ee12985))
* **deps:** bump semver from 5.7.1 to 5.7.2 ([0584431](https://github.com/DevAndDeliver/nest-logging-transport/commit/05844315a7c32e9d14380f38e9043d60422e907c))
* **deps:** bumps https://github.com/actions/checkout from 2 to 4. ([bbb68f7](https://github.com/DevAndDeliver/nest-logging-transport/commit/bbb68f731b63e159c07d4ce6fa880128a8323a9f))
* update dev dependencies ([99d57b0](https://github.com/DevAndDeliver/nest-logging-transport/commit/99d57b0e4ab893e88d937af4572a35b53abd7779))

### [1.2.1](https://github.com/DevAndDeliver/nest-logging-transport/compare/v1.2.0...v1.2.1) (2022-10-19)


### Bug Fixes

* change lifecycle event for releasing package version ([eebd0f6](https://github.com/DevAndDeliver/nest-logging-transport/commit/eebd0f60c357a2f01ac5e46e4c470c0103a01b22))
* remove LAST_RELEASE generation script ([f38fbda](https://github.com/DevAndDeliver/nest-logging-transport/commit/f38fbdac2ab9873083a8f434388423c46cbc360a))


### Tests

* delete one e2e test case, use new timers syntax ([2fa8147](https://github.com/DevAndDeliver/nest-logging-transport/commit/2fa81477a588332a711db597c27c2a17bfb46ff7))


### Documentation

* fix typo in readme ([cab04ad](https://github.com/DevAndDeliver/nest-logging-transport/commit/cab04adbdae25355d34d46e7c8e02b1d31fa01be))


### Continuous Integration

* change used node version from 16 to 18 ([63af6ce](https://github.com/DevAndDeliver/nest-logging-transport/commit/63af6ce4ba1f1f00c8feeaed1ba6eabc11c586a5))


### Build Configuration

* add eslintignore file to npmignore ([6b12c01](https://github.com/DevAndDeliver/nest-logging-transport/commit/6b12c01ec00744a15e4b5c5184ab2ad52c5a4aac))
* upgrade dependencies ([a032bfd](https://github.com/DevAndDeliver/nest-logging-transport/commit/a032bfd4c5ebe4d9f1e87b69118e539a9819079a))

## [1.2.0](https://github.com/DevAndDeliver/nest-logging-transport/compare/v1.1.0...v1.2.0) (2022-04-15)


### Features

* add JSON transport ([84404ba](https://github.com/DevAndDeliver/nest-logging-transport/commit/84404ba7d8dc2cdff8600a1210601df534f29e34))


### Build Configuration

* add script for addling LAST_RELEASE changelog ([7a07b7b](https://github.com/DevAndDeliver/nest-logging-transport/commit/7a07b7bbbaf3de02ceeae8e952916b7c71a54278))
* upgrade dependencies ([81e32e4](https://github.com/DevAndDeliver/nest-logging-transport/commit/81e32e48bc4764149dc4b2dcf54187e18604dc9d))


### Continuous Integration

* use LAST_RELEASE file for getting release description ([b26540e](https://github.com/DevAndDeliver/nest-logging-transport/commit/b26540e0e6be41830e1ee87f929d254ff02cc418))

## [1.1.0](https://github.com/DevAndDeliver/nest-logging-transport/compare/v1.0.0...v1.1.0) (2022-04-05)


### Features

* allow to specify logger app name ([a248786](https://github.com/DevAndDeliver/nest-logging-transport/commit/a248786669e3f8082ceefb5f36e06a082407501e))


### Tests

* add test for range error when padding is less than 0 ([d6e0ff8](https://github.com/DevAndDeliver/nest-logging-transport/commit/d6e0ff835a336417665ed6d6e06c625a40bcb5c3))


### Build Configuration

* upgrade dependencies ([92b77a7](https://github.com/DevAndDeliver/nest-logging-transport/commit/92b77a7f4817d3ef81fc023b3556e8a0d657bb45))

## [1.0.0](https://github.com/DevAndDeliver/nest-logging-transport/compare/v0.0.8...v1.0.0) (2022-03-23)


### Documentation

* add missing information about not publishing package manually ([c26f478](https://github.com/DevAndDeliver/nest-logging-transport/commit/c26f478ec2dc431dab5e3139e01c06ad51c167bf))


### Continuous Integration

* change node version used on ci pipeline ([b3f0977](https://github.com/DevAndDeliver/nest-logging-transport/commit/b3f0977aee9b50c50471271a22c495128717db1a))

### [0.0.9](https://github.com/DevAndDeliver/nest-logging-transport/compare/v0.0.8...v0.0.9) (2022-03-23)


### Documentation

* add missing information about not publishing package manually ([c26f478](https://github.com/DevAndDeliver/nest-logging-transport/commit/c26f478ec2dc431dab5e3139e01c06ad51c167bf))


### Continuous Integration

* change node version used on ci pipeline ([b3f0977](https://github.com/DevAndDeliver/nest-logging-transport/commit/b3f0977aee9b50c50471271a22c495128717db1a))

### [0.0.8](https://github.com/DevAndDeliver/nest-logging-transport/compare/v0.0.7...v0.0.8) (2022-03-23)


### Build Configuration

* upgrade dependencies ([bfb8311](https://github.com/DevAndDeliver/nest-logging-transport/commit/bfb831151b37d25283f135422757431b07b94b69))


### Tests

* add unit tests for log utils ([484be36](https://github.com/DevAndDeliver/nest-logging-transport/commit/484be3629723f14d691b920bd9d5adcc81722030))


### Continuous Integration

* add e2e tests to test pipeline ([d0e6168](https://github.com/DevAndDeliver/nest-logging-transport/commit/d0e6168eefd43a7ed2cbd0741792cc85be559f89))


### Documentation

* add basic readme ([707d8e7](https://github.com/DevAndDeliver/nest-logging-transport/commit/707d8e731aae4e0418ac721486317fecbcb9e056))
* add informations about releases to README ([902e240](https://github.com/DevAndDeliver/nest-logging-transport/commit/902e2401d8be13052a6b69bc258d879cadf296cf))

### [0.0.7](https://github.com/DevAndDeliver/nest-logging-transport/compare/v0.0.6...v0.0.7) (2021-10-07)

### [0.0.6](https://github.com/DevAndDeliver/nest-logging-transport/compare/v0.0.5...v0.0.6) (2021-09-13)


### Continuous Integration

* add codeql-analysis ([8a62dc5](https://github.com/DevAndDeliver/nest-logging-transport/commit/8a62dc59a3f30aff9af8f6daf3e13084f3e298f9))

### [0.0.5](https://github.com/DevAndDeliver/nest-logging-transport/compare/v0.0.4...v0.0.5) (2021-09-09)


### Bug Fixes

* fix conditional log parsing ([c5be240](https://github.com/DevAndDeliver/nest-logging-transport/commit/c5be240839a4538f946a5a990005adcd07f9e8c5))
* fix parsing errors ([f5d35ff](https://github.com/DevAndDeliver/nest-logging-transport/commit/f5d35ff46c3561f5a24966d0a74344beabf87bba))
* remove force exit ([8e1a438](https://github.com/DevAndDeliver/nest-logging-transport/commit/8e1a43892c800515cce7b4d8745b02d867b0d660))


### Tests

* add more tests for errors ([2b1af72](https://github.com/DevAndDeliver/nest-logging-transport/commit/2b1af72c6df00b99a4f7111b2f2899c5210c974b))
* create e2e tests for error logging ([c5474c8](https://github.com/DevAndDeliver/nest-logging-transport/commit/c5474c8959e2f03f91934be88a165a7a647bbda1))
* start creating tests ([c6ec013](https://github.com/DevAndDeliver/nest-logging-transport/commit/c6ec01346d1ef7504f1d98f5749a7eaabe47ad04))


### Code Refactoring

* rewrite logger logic ([3642e3e](https://github.com/DevAndDeliver/nest-logging-transport/commit/3642e3e73d653a88cee9275fe8b936619279153c))


### Build Configuration

* upgrade dependencies, fix typo ([cf5fe77](https://github.com/DevAndDeliver/nest-logging-transport/commit/cf5fe7775b63870b4a4a15edf977efbaf192d060))
* upgrade dev dependencies ([4f0a406](https://github.com/DevAndDeliver/nest-logging-transport/commit/4f0a406a8fff0857000b14a6af9e25a628cad657))
* upgrade dev dependencies ([ea7c23e](https://github.com/DevAndDeliver/nest-logging-transport/commit/ea7c23ea927b442a643a629454224c33e7b9574d))

### [0.0.4](https://github.com/DevAndDeliver/nest-logging-transport/compare/v0.0.3...v0.0.4) (2021-08-20)


### Continuous Integration

* unify release and publish workflows ([de084f0](https://github.com/DevAndDeliver/nest-logging-transport/commit/de084f0bbf3118b4e5e0721a844387a40d8d8cf9))

### [0.0.3](https://github.com/DevAndDeliver/nest-logging-transport/compare/v0.0.2...v0.0.3) (2021-08-20)


### Bug Fixes

* add missing checkout action to release ([955fcc7](https://github.com/DevAndDeliver/nest-logging-transport/commit/955fcc70d34fddddcd768d331d91bbe10b5e64c8))

### [0.0.2](https://github.com/DevAndDeliver/nest-logging-transport/compare/v0.0.1...v0.0.2) (2021-08-20)


### Continuous Integration

* add release step ([1ec3ac2](https://github.com/DevAndDeliver/nest-logging-transport/commit/1ec3ac21de73f04deeff732c05131c9dc76a4de7))

### 0.0.1 (2021-08-20)


### Features

* add error logging, improve formatting and colors ([1eba81c](https://github.com/DevAndDeliver/nest-logging-transport/commit/1eba81c6f7afc6e9580066b1559143ce2119b51f))
* create basic logger implementation ([170e198](https://github.com/DevAndDeliver/nest-logging-transport/commit/170e198b844448f4c61232993c7accb32ae057cf))
* initialize logger ([000cd9c](https://github.com/DevAndDeliver/nest-logging-transport/commit/000cd9c0aa7e4a6cad262ebddf014a1150aca846))


### Code Refactoring

* make events without nulls not configurable ([76a3db6](https://github.com/DevAndDeliver/nest-logging-transport/commit/76a3db6e2d69ce0ef23cce5a568aaa8881f51999))


### Continuous Integration

* add github workflow ([56972b9](https://github.com/DevAndDeliver/nest-logging-transport/commit/56972b9941f6cb9cc91398ced470ad015e7b9cdc))
* test on push ([b048795](https://github.com/DevAndDeliver/nest-logging-transport/commit/b048795148453153476f4797267faeb1deed2f4e))


### Build Configuration

* add versionrc file ([6878801](https://github.com/DevAndDeliver/nest-logging-transport/commit/6878801fbf6f7267c6496b9ade1242782645c1d1))
