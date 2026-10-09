# Soroban diagnostic helpers and real authorization-entry decoding

Prepared October 8, 2026 for same-day Stellar Wave application.

## Implemented utility

JavaScript/TypeScript API includes diagnostic search, an RPC client, heuristic source linting, resource/TTL estimates and Rust test templates. Authorization entries are decoded with Stellar SDK; malformed inputs fail closed and actual invocation trees replace placeholder signer data.

## Reproduce and evidence

Node 22+; npm ci and npm test. Fourteen JavaScript tests and three reference-contract tests passed October 8. Source linting is regex-based.

## Supported scope

Structural isValid does not verify signatures, nonce, expiration or acceptance. Catalog flags are cleared pending error-specific evidence. The historical sandbox address is a reference fixture, not proof of every diagnostic.

## Maintainers and application

Maintainers xteesamz and EthTobi were owner-confirmed across these project families; contact through GitHub, available anytime. Follow CONTRIBUTING.md and SECURITY.md (or organization defaults). Review the preparation PR and its CI before using its final revision in the application. Engineering issues and draft complexity do not establish Wave enrollment. No application has been submitted by this work.

## October 8 sandbox lookup

Stellar Expert returned the historical sandbox record with deployed WASM hash ba3d7ff61edbf57db778868df3474ba855b990b3d2e42125ce58ec1c26cd4741, matching the README hash. See sandbox-lookup-2026-10-08.json. This establishes indexed deployment metadata, not named-error reproduction or source/build correspondence.
