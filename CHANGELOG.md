# Changelog

## 1.0.0-alpha.8 (2026-02-08)

Full Changelog: [v1.0.0-alpha.7...v1.0.0-alpha.8](https://github.com/warpdotdev/oz-sdk-typescript/compare/v1.0.0-alpha.7...v1.0.0-alpha.8)

### Features

* **api:** manual updates ([51bba74](https://github.com/warpdotdev/oz-sdk-typescript/commit/51bba74cf406ac231d328f5d084788a9902e478f))

## 1.0.0-alpha.7 (2026-02-08)

Full Changelog: [v1.0.0-alpha.6...v1.0.0-alpha.7](https://github.com/warpdotdev/oz-sdk-typescript/compare/v1.0.0-alpha.6...v1.0.0-alpha.7)

### Chores

* update SDK settings ([f6cb6f7](https://github.com/warpdotdev/oz-sdk-typescript/commit/f6cb6f7409f4b6779e9f334fd5cb72551416b6ae))
* update SDK settings ([e5a472e](https://github.com/warpdotdev/oz-sdk-typescript/commit/e5a472e4b825951c067f0c083946fc712a59a29b))

## 1.0.0-alpha.6 (2026-02-08)

Full Changelog: [v1.0.0-alpha.5...v1.0.0-alpha.6](https://github.com/warpdotdev/warp-sdk-typescript/compare/v1.0.0-alpha.5...v1.0.0-alpha.6)

### Features

* **api:** modify openapi trigger ([834d9e0](https://github.com/warpdotdev/warp-sdk-typescript/commit/834d9e0849eb843db5cffdc10e5ce3c7732c37ad))

## 1.0.0-alpha.5 (2026-02-06)

Full Changelog: [v1.0.0-alpha.4...v1.0.0-alpha.5](https://github.com/warpdotdev/warp-sdk-typescript/compare/v1.0.0-alpha.4...v1.0.0-alpha.5)

### Features

* **api:** new run source types ([642de7a](https://github.com/warpdotdev/warp-sdk-typescript/commit/642de7a4cfcfa291c86a99ec5d63f0044858ab99))

## 1.0.0-alpha.4 (2026-02-06)

Full Changelog: [v1.0.0-alpha.3...v1.0.0-alpha.4](https://github.com/warpdotdev/warp-sdk-typescript/compare/v1.0.0-alpha.3...v1.0.0-alpha.4)

### Features

* **api:** add computer_use_enabled param ([240bfbc](https://github.com/warpdotdev/warp-sdk-typescript/commit/240bfbc553994ba01d28eff9b4936842ebf9d46a))


### Chores

* **internal:** upgrade pnpm ([48a300d](https://github.com/warpdotdev/warp-sdk-typescript/commit/48a300d8f63d7adc4a5152231cc9fd73f01f8db8))

## 1.0.0-alpha.3 (2026-02-05)

Full Changelog: [v1.0.0-alpha.2...v1.0.0-alpha.3](https://github.com/warpdotdev/warp-sdk-typescript/compare/v1.0.0-alpha.2...v1.0.0-alpha.3)

### Features

* **api:** add schedules to runs ([b467e93](https://github.com/warpdotdev/warp-sdk-typescript/commit/b467e93299c88a90a64fd1f690a5eea685484d35))
* **api:** update artifacts ([d3c1c08](https://github.com/warpdotdev/warp-sdk-typescript/commit/d3c1c088c52fafe7c272dc8a48aaff4c8a8bf0b6))


### Bug Fixes

* **client:** avoid removing abort listener too early ([16356a2](https://github.com/warpdotdev/warp-sdk-typescript/commit/16356a2120585d1d854a38d754c9ddc9e90d1627))


### Chores

* **client:** restructure abort controller binding ([28b7bd9](https://github.com/warpdotdev/warp-sdk-typescript/commit/28b7bd90695af32ada4ff67873c55559389db53e))

## 1.0.0-alpha.2 (2026-02-04)

Full Changelog: [v1.0.0-alpha.1...v1.0.0-alpha.2](https://github.com/warpdotdev/warp-sdk-typescript/compare/v1.0.0-alpha.1...v1.0.0-alpha.2)

### Features

* **api:** add addnl filters to runs endpoint ([b9e8309](https://github.com/warpdotdev/warp-sdk-typescript/commit/b9e8309221253b555c3d280c0bee086b578fcc23))
* **api:** add models for agent skill, user profile ([d7275a8](https://github.com/warpdotdev/warp-sdk-typescript/commit/d7275a8224054c4f81a8aaeebfbe5c1dcfc4e3fd))

## 1.0.0-alpha.1 (2026-02-02)

Full Changelog: [v1.0.0-alpha.0...v1.0.0-alpha.1](https://github.com/warpdotdev/warp-sdk-typescript/compare/v1.0.0-alpha.0...v1.0.0-alpha.1)

### Features

* **api:** add artifacts, worker_host, and new source types ([434a92f](https://github.com/warpdotdev/warp-sdk-typescript/commit/434a92fd401576e6dde3002a5cab3f62ba0cdc43))
* **api:** add schedules, agent list, skill-spec ([67e885e](https://github.com/warpdotdev/warp-sdk-typescript/commit/67e885ed59827c9869f0b52a5ae035a65f0a9863))


### Bug Fixes

* **client:** avoid memory leak with abort signals ([d92ea11](https://github.com/warpdotdev/warp-sdk-typescript/commit/d92ea115927df34abc928d557c61a799d0883ae9))


### Chores

* **ci:** upgrade `actions/github-script` ([2589365](https://github.com/warpdotdev/warp-sdk-typescript/commit/2589365a42e2080e3b3b7cd2c938caed5b03f67b))
* **client:** do not parse responses with empty content-length ([4b9dd9a](https://github.com/warpdotdev/warp-sdk-typescript/commit/4b9dd9a0b5c44e35eed40f7940c7d2832944d1ad))

## 1.0.0-alpha.0 (2026-01-21)

Full Changelog: [v0.3.0...v1.0.0-alpha.0](https://github.com/warpdotdev/warp-sdk-typescript/compare/v0.3.0...v1.0.0-alpha.0)

### ⚠ BREAKING CHANGES

* **api:** catch up openapi, rename tasks -> runs

### Features

* **api:** catch up openapi, rename tasks -&gt; runs ([ba37afd](https://github.com/warpdotdev/warp-sdk-typescript/commit/ba37afdd4058e549d5f91d849c4ded22909ba2ec))
* **api:** created at filter in list view ([7594f38](https://github.com/warpdotdev/warp-sdk-typescript/commit/7594f384c04394aa1088c3c132579da450f60e23))


### Chores

* break long lines in snippets into multiline ([98aa96c](https://github.com/warpdotdev/warp-sdk-typescript/commit/98aa96ceed31e121df6b97593289bbc663178a8c))
* **internal:** update `actions/checkout` version ([a7cc203](https://github.com/warpdotdev/warp-sdk-typescript/commit/a7cc2030b6b76b88a3b0824d0bb0329779b0e5f2))
* **internal:** update lock file ([7bfcb75](https://github.com/warpdotdev/warp-sdk-typescript/commit/7bfcb758c3bd90a63d48b03c95ee362eb43aa7a8))
* **internal:** upgrade babel, qs, js-yaml ([6f26eb0](https://github.com/warpdotdev/warp-sdk-typescript/commit/6f26eb04ad4dc02fdfd2d686d8f559345ce9dbfa))
* **internal:** upgrade brace-expansion and @babel/helpers ([d446259](https://github.com/warpdotdev/warp-sdk-typescript/commit/d4462597cd87304f04d0c2a8452fdba579939e4b))

## 0.3.0 (2026-01-05)

Full Changelog: [v0.2.0...v0.3.0](https://github.com/warpdotdev/warp-sdk-typescript/compare/v0.2.0...v0.3.0)

### Features

* **api:** fix array query parameter formatting ([2d9b185](https://github.com/warpdotdev/warp-sdk-typescript/commit/2d9b18571e9964a5b50a228757880e50fd35530e))

## 0.2.0 (2025-12-17)

Full Changelog: [v0.1.0...v0.2.0](https://github.com/warpdotdev/warp-sdk-typescript/compare/v0.1.0...v0.2.0)

### Features

* **api:** manual updates ([8dade21](https://github.com/warpdotdev/warp-sdk-typescript/commit/8dade211b6dd9b977eb6d5b095a6d121a567d028))


### Documentation

* add environment and config usage documentation ([7314503](https://github.com/warpdotdev/warp-sdk-typescript/commit/7314503e1f9db4d4c4d55c5b860fae7998fd1b5d))

## 0.1.0 (2025-12-15)

Full Changelog: [v0.0.1...v0.1.0](https://github.com/warpdotdev/warp-sdk-typescript/compare/v0.0.1...v0.1.0)

### Features

* **api:** manual updates ([540303c](https://github.com/warpdotdev/warp-sdk-typescript/commit/540303c2ba99574bb60154d7bd0571275cb4f2c6))
* **api:** manual updates ([caf8aea](https://github.com/warpdotdev/warp-sdk-typescript/commit/caf8aea70db2910cf39047dfa607fd8504919bbb))


### Chores

* update SDK settings ([8096174](https://github.com/warpdotdev/warp-sdk-typescript/commit/809617480b9653a93e15ab5b0bec1c2f4164b82e))
* update SDK settings ([23f76a7](https://github.com/warpdotdev/warp-sdk-typescript/commit/23f76a7cc7763be919d488512c055c665ba119cb))
